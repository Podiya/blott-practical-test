import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgArrowLeft(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.386 6.806a1 1 0 01-.025 1.414L7.478 11H19a1 1 0 110 2H7.478l2.883 2.78a1 1 0 11-1.388 1.44l-4.667-4.5a1 1 0 010-1.44l4.667-4.5a1 1 0 011.413.026z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgArrowLeft;
