import * as React from "react"
import Svg, { Path, Rect, SvgProps } from "react-native-svg"

export const PhoneIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.25}
    {...props}
  >
    <Rect width={14} height={20} x={5} y={2} rx={2} ry={2} />
    <Path d="M12 18h.01" />
  </Svg>
)
