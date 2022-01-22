import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

function SvgSend(props: any) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={0.75}
        y={0.75}
        width={30.5}
        height={30.5}
        rx={13.25}
        stroke="#D7FDFF"
        strokeWidth={1.5}
      />
      <Path
        clipRule="evenodd"
        d="M16.408 10.097a.6.6 0 00-1.064 0L9.697 20.926a.6.6 0 00.692.855l5.327-1.47a.6.6 0 01.32 0l5.327 1.47a.6.6 0 00.691-.855l-5.646-10.829z"
        stroke="#fff"
        strokeWidth={2}
      />
    </Svg>
  );
}

export default SvgSend;
