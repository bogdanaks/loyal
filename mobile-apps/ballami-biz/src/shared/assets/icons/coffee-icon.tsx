import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export const CoffeeIcon = (props: SvgProps) => (
  <Svg
    width={14}
    height={14}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4ZM6 2v2M10 2v2M14 2v2" />
  </Svg>
)
