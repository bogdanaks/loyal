import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export const CheckIcon = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M20 6 9 17l-5-5" />
  </Svg>
)
