import { useEffect } from "react";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

type Props = {
  sourceBase64Data: string;
  targetDimensions: { width: number; height: number };
  onResult: (res: {
    width: number;
    height: number;
    base64Image: string;
  }) => void;
};

const ImageResizer: React.FC<Props> = props => {
  const { sourceBase64Data, targetDimensions, onResult } = props;

  useEffect(() => {
    manipulateAsync(
      sourceBase64Data,
      [
        {
          resize: targetDimensions,
        },
      ],
      { base64: true, compress: 1, format: SaveFormat.PNG },
    ).then(({ base64, height, width }) => {
      const fullBase64 = `data:image/png;base64, ${base64}`;
      onResult({ base64Image: fullBase64, height, width });
    });
  }, [sourceBase64Data]);

  return null;
};

export default ImageResizer;
