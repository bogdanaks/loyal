import * as React from "react"
import Svg, { SvgProps, Path, Circle } from "react-native-svg"
export const InfoIcon = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.875}
    viewBox="0 0 24 24"
    {...props}
  >
    <Circle cx={12} cy={12} r={10} />
    <Path d="M12 16v-4M12 8h.01" />
  </Svg>
)
