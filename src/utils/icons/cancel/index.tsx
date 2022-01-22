import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgArrowLeft(props: any) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20.969 10.667L10.667 20.969M10.667 10.667l10.302 10.302"
        stroke="#FF5454"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgArrowLeft;
