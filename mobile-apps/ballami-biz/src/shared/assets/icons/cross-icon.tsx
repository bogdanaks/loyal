import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export const CrossIcon = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M18 6 6 18M6 6l12 12" />
  </Svg>
)
