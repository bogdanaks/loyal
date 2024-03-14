import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export const ChevronRightIcon = (props: SvgProps) => (
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
    <Path d="m9 18 6-6-6-6" />
  </Svg>
)
