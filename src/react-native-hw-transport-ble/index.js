// @flow

import Config from "react-native-config";
import BleTransport from "@ledgerhq/react-native-hw-transport-ble";
import makeMock from "./makeMock";
import createAPDUMock from "../logic/createAPDUMock";

const names = {};

const transport = Config.MOCK
  ? makeMock({
      createTransportDeviceMock: (id, name) => {
        names[id] = name;
        const apduMock = createAPDUMock({
          setDeviceName: name => {
            names[id] = name;
            return Promise.resolve();
          },
          getDeviceName: () => Promise.resolve(names[id] || id),
          getAddress: () =>
            Promise.resolve({
              publicKey: "00000000000000000000",
              address: "11111111111111111111111111111",
              chainCode:
                "0000000000000000000000000000000000000000000000000000000000000000",
            }),
        });
        return {
          id,
          name: names[id] || id,
          apduMock,
        };
      },
    })
  : BleTransport;

export default transport;
