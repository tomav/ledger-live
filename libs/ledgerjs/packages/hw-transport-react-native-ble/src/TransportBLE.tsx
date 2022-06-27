import { AppState, NativeModules } from "react-native";
import Transport, {
  DescriptorEvent,
  Device,
  Observer,
  Subscription,
} from "@ledgerhq/hw-transport";
import {
  PairingFailed,
  TransportError,
  BluetoothRequired,
  CantOpenDevice,
} from "@ledgerhq/errors";
import { log } from "@ledgerhq/logs";
import { type EventSubscription } from "react-native/Libraries/vendor/emitter/EventEmitter";
import EventEmitter from "./EventEmitter";

const NativeBle = NativeModules.HwTransportReactNativeBle;

let instances: Array<Ble> = [];
type RunnerEvent = any; // Can't depend on live-common for this, TODO get it from types package

class Ble extends Transport {
  static id = "TransportBle";
  static scanObserver: Observer<DescriptorEvent<unknown>>;
  static stateObserver: Observer<{ type: string }>;
  static queueObserver: Observer<RunnerEvent>;

  appStateSubscription: EventSubscription;
  appState: "background" | "active" | "inactive" | "" = "";
  id: string;

  static log(...m: string[]): void {
    const tag = "ble-verbose";
    // console.log(tag, ...m);
    log(tag, JSON.stringify([...m]));
  }

  constructor(deviceId: string) {
    super();
    this.id = deviceId;
    this.listenToAppStateChanges(); // TODO cleanup chores, keep track of instances
    Ble.log(`BleTransport(${String(this.id)}) new instance`);
  }

  private listenToAppStateChanges = () => {
    this.appStateSubscription = AppState.addEventListener("change", (state) => {
      if (this.appState !== state) {
        Ble.log("appstate change detected", state);
        this.appState = state;
        NativeBle.onAppStateChange(state === "active");
      }
    });
  };

  exchange = async (apdu: Buffer): Promise<Buffer> => {
    Ble.log("apdu", `=> ${apdu.toString("hex")}`);
    try {
      const response = await NativeBle.exchange(apdu.toString("hex"));
      Ble.log("apdu", `<= ${response}`);
      return Buffer.from(`${response}`, "hex");
    } catch (error) {
      Ble.log("error");
      throw Ble.remapError(error);
    }
  };

  static observeState = (
    observer: Observer<{ type: string }>
  ): Subscription => {
    Ble.stateObserver = observer;
    NativeBle.observeBluetooth();

    return {
      unsubscribe: () => {
        observer.complete;
      },
    };
  };

  // TODO this seems to be going to leak since we never stop listening
  static listener = EventEmitter?.addListener("BleTransport", (rawEvent) => {
    const { event, type, data } = JSON.parse(rawEvent);
    if (event === "new-device") {
      console.log("BIMBIM new device ", data);
      Ble.scanObserver?.next({
        type: "add",
        descriptor: {
          id: data.uuid,
          name: data.name,
          rssi: data.rssi,
          serviceUUIDs: [data.service],
        },
      });
    } else if (event === "status") {
      if (Ble.stateObserver) {
        Ble.stateObserver.next({
          type,
        });
      }
    } else if (event === "task") {
      if (Ble.queueObserver) {
        if (type === "runCompleted") {
          // we've completed a queue, complete the subject
          Ble.queueObserver.complete();
        } else if (type === "runError") {
          Ble.queueObserver.next({
            type: "runError",
            appOp: {}, //Fixme?
            error: Ble.remapError(data.code),
          });
          Ble.queueObserver.complete();
        } else {
          const progress = Math.round((data?.progress || 0) * 100) / 100;
          Ble.queueObserver.next({
            type,
            appOp: { name: data.name, type: data.type },
            progress: type === "runProgress" ? progress || 0 : undefined,
          });
        }
      }
    }
  });

  static listen = (
    observer: Observer<DescriptorEvent<unknown>>
  ): Subscription => {
    Ble.scanObserver = observer;
    NativeBle.listen()
      .then(() => {
        Ble.log("Start scanning devices");
      })
      .catch((error) => {
        Ble.log("Bluetooth is not available! :ohgod:");
        observer.error(Ble.remapError(error));
      });

    return { unsubscribe: Ble.stop };
  };

  private static stop = async (): Promise<void> => {
    await NativeBle.stop();
    Ble.log("Stop scanning devices");
  };

  // @ts-ignore
  static open = async (deviceOrId: Device | string): Promise<Ble> => {
    const uuid = typeof deviceOrId === "string" ? deviceOrId : deviceOrId.id;

    if (await Ble.isConnected()) {
      Ble.log("disconnect first");
      await Ble.disconnect();
    }

    try {
      const _uuid = await NativeBle.connect(uuid, "no_longer_used");
      Ble.log(`connected to (${_uuid})`);
      return new Ble(_uuid);
    } catch (error) {
      Ble.log("failed to connect to device");
      if (Ble.queueObserver) {
        Ble.queueObserver.next({
          type: "runError",
          appOp: {}, //Fixme?
          error: Ble.remapError(error, { uuid }),
        });
        Ble.queueObserver.complete();
      } else {
        throw Ble.remapError(error, { uuid });
      }
      Ble.disconnect();
    }
  };

  close = async (): Promise<void> => {
    return new Promise<void>((resolve) => {
      Ble.disconnect().then((_) => resolve());
    });
  };

  static disconnect = async (): Promise<boolean> => {
    Ble.log("disconnecting, and removing listeners");
    instances.forEach((instance) => instance.appStateSubscription?.remove());
    instances = [];

    await NativeBle.disconnect();
    Ble.log("completing observer if needed");
    Ble.queueObserver?.complete();
    Ble.log("disconnected");
    return true;
  };

  static isConnected = (): Promise<boolean> => {
    Ble.log("checking connection");
    return NativeBle.isConnected();
  };

  private static remapError = (error: any, extras?: unknown) => {
    const mappedErrors = {
      "pairing-failed": PairingFailed,
      "bluetooth-required": BluetoothRequired,
      "cant-open-device": CantOpenDevice,
    };

    if (error?.code in mappedErrors)
      return new mappedErrors[error?.code](extras);
    return new TransportError(error?.code, error);
  };

  /// Long running tasks below, buckle up.
  static runner = (url: string): void => {
    Ble.log(`request to launch runner for url ${url}`);
    NativeBle.runner(url);
  };

  static queue = (observer: Observer<any>, token: string): void => {
    Ble.log("request to launch queue", token);
    Ble.queueObserver = observer;
    NativeBle.queue(token);
    // Regarding ↑ there's a bug in this rn version that breaks the mapping
    // between a number on the JS side and Swift. To preserve my sanity, we
    // are using string in the meantime since it's not a big deal.
  };
}

export default Ble;
