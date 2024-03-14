import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export const BedIcon = (props: SvgProps) => (
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
    <Path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
  </Svg>
)
