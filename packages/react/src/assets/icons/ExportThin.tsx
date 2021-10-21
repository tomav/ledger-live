import * as React from "react";
type Props = {
  size?: number | string;
  color?: string;
};

function ExportThin({ size = 16, color = "currentColor" }: Props): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.12012 20.4H20.8801V13.68H20.4001V19.92H3.60012V13.68H3.12012V20.4ZM7.65612 7.94398L7.99212 8.27998L9.86412 6.40798L11.7601 4.51198V16.56H12.2401V4.51198L14.1361 6.40798L16.0081 8.27998L16.3441 7.94398L12.0001 3.59998L7.65612 7.94398Z"
        fill={color}
      />
    </svg>
  );
}

export default ExportThin;