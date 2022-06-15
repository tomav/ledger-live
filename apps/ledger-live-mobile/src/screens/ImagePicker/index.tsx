import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, Image, Platform, ScrollView, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Button, Flex, Text } from "@ledgerhq/native-ui";
import styled from "styled-components/native";
import ImageProcessor from "./ImageProcessor";
import GalleryPicker from "./GalleryPicker";
import ImageCropper from "./ImageCropper";
import {
  downloadImageToFile,
  fitImageContain,
  ImageDimensions,
  loadImageSizeAsync,
} from "./imageUtils";
import ImageResizer from "./ImageResizer";

type RouteParams = {
  imageUrl?: string;
};

const PreviewImage = styled(Image).attrs({
  resizeMode: "contain",
})`
  width: 200px;
  height: 200px;
`;

type SrcImage = ImageDimensions & {
  uri: string;
};

type CroppedImage = ImageDimensions & {
  base64URI: string;
};

type ResultImage = ImageDimensions & {
  base64Data: string;
};

type RawResult = ImageDimensions & {
  hexData: string;
};

export default function ImagePicker() {
  const imageProcessorRef = useRef<ImageProcessor>(null);
  const [srcImage, setSrcImage] = useState<SrcImage | null>(null);
  const [croppedImage, setCroppedImage] = useState<CroppedImage | null>(null);
  const [
    croppedAndResizedImage,
    setCroppedAndResizedImage,
  ] = useState<CroppedImage | null>(null);
  const [resultImage, setResultImage] = useState<ResultImage | null>(null);
  const [rawResult, setRawResult] = useState<RawResult | null>(null);

  const { params = {} }: { params?: RouteParams } = useRoute();

  const { imageUrl: paramsImageURL } = params;

  /** SOURCE IMAGE HANDLING */

  useEffect(() => {
    if (paramsImageURL) {
      const loadImage = async () => {
        const [dims, uri] = await Promise.all([
          loadImageSizeAsync(paramsImageURL),
          Platform.OS === "android"
            ? downloadImageToFile(paramsImageURL)
            : paramsImageURL,
        ]);
        setSrcImage({ width: dims.width, height: dims.height, uri });
      };
      loadImage();
    }
  }, [paramsImageURL]);

  const handleGalleryPickerResult = useCallback(
    ({ width, height, imageURI }) => {
      setSrcImage({ width, height, uri: imageURI });
    },
    [setSrcImage],
  );

  /** CROP IMAGE HANDLING */

  const handleCropResult = useCallback(
    ({ width, height, base64Image }) => {
      setCroppedImage({ width, height, base64URI: base64Image });
    },
    [setCroppedImage],
  );

  /** RESIZED IMAGE HANDLING */

  const handleResizeResult = useCallback(
    ({ width, height, base64Image }) => {
      console.log({height, width, base64Image: base64Image.slice(0, 100)});
      setCroppedAndResizedImage({ width, height, base64URI: base64Image });
    },
    [setCroppedAndResizedImage],
  );

  /** RESULT IMAGE HANDLING */

  const handlePreviewResult = useCallback(
    data => {
      setResultImage(data);
    },
    [setResultImage],
  );

  const handleRawResult = useCallback(
    data => {
      setRawResult(data);
    },
    [setRawResult],
  );

  const requestRawResult = useCallback(() => {
    imageProcessorRef?.current?.requestRawResult();
  }, [imageProcessorRef]);

  const [contrast, setContrast] = useState(1);

  const boxToFitDimensions = {
    width: Dimensions.get("screen").width - 20,
    height: Dimensions.get("screen").height,
  };

  const sourceDimensions = fitImageContain(
    srcImage
      ? { height: srcImage.height, width: srcImage.width }
      : { height: 200, width: 200 },
    boxToFitDimensions,
  );

  const cropAspectRatio = {
    width: 1080,
    height: 1400,
  };

  const cropDimensions = fitImageContain(cropAspectRatio, boxToFitDimensions);

  const previewDimensions =
    resultImage &&
    fitImageContain(
      {
        width: resultImage.width,
        height: resultImage.height,
      },
      boxToFitDimensions,
    );

  return (
    <ScrollView>
      <Flex p="10px">
        {!paramsImageURL && (
          <GalleryPicker onResult={handleGalleryPickerResult} />
        )}
        {srcImage?.uri ? (
          <Flex mt={5}>
            <Text mt={5} variant="h3">
              Source image:
            </Text>
            <PreviewImage
              source={{ uri: srcImage?.uri }}
              style={{ ...sourceDimensions }}
            />
            <Flex height={5} />
            <Text mt={5} variant="h3">
              Cropping: (ratio: H{cropAspectRatio.height}, W
              {cropAspectRatio.width})
            </Text>
            <ImageCropper
              sourceUri={srcImage.uri}
              aspectRatio={cropAspectRatio}
              style={{ alignSelf: "center", ...sourceDimensions }}
              onResult={handleCropResult}
            />
          </Flex>
        ) : null}
        {croppedImage?.base64URI && (
          <ImageResizer
            targetDimensions={cropAspectRatio}
            sourceBase64Data={croppedImage?.base64URI}
            onResult={handleResizeResult}
          />
        )}
        {croppedAndResizedImage?.base64URI && (
          <>
            <Text mt={5} variant="h3">
              Image processing:
            </Text>
            <ImageProcessor
              ref={imageProcessorRef}
              srcImageBase64={croppedAndResizedImage?.base64URI}
              onPreviewResult={handlePreviewResult}
              onRawResult={handleRawResult}
              contrast={contrast}
            />
            <Flex flexDirection="row" pt={3}>
              {[1, 2, 5, 8].map((val, index) => (
                <Button
                  key={index}
                  onPress={() => setContrast(val)}
                  type="color"
                >
                  {index + 1}
                </Button>
              ))}
            </Flex>
          </>
        )}
        {resultImage?.base64Data && (
          <Flex>
            <Text mt={5} variant="h3">
              result:
            </Text>
            <Text>width: {resultImage?.width}</Text>
            <Text>height: {resultImage?.height}</Text>
            <PreviewImage
              source={{ uri: resultImage.base64Data }}
              style={{
                height: previewDimensions?.height,
                width: previewDimensions?.width,
              }}
            />
            <Button type="main" onPress={requestRawResult}>
              Request & display (shortened) hex data
            </Button>
            {rawResult?.hexData && (
              <>
                <Text>Raw result:</Text>
                <Text>width: {rawResult?.width}</Text>
                <Text>height: {rawResult?.height}</Text>
                <Text>{rawResult?.hexData.slice(0, 2000)}</Text>
              </>
            )}
          </Flex>
        )}
      </Flex>
    </ScrollView>
  );
}
