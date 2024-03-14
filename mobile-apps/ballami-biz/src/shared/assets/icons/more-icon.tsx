import * as React from "react"
import Svg, { Circle, SvgProps } from "react-native-svg"

export const MoreIcon = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2.1}
    viewBox="0 0 24 24"
    {...props}
  >
    <Circle cx={12} cy={12} r={1} />
    <Circle cx={12} cy={5} r={1} />
    <Circle cx={12} cy={19} r={1} />
  </Svg>
)
