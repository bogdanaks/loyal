import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export const ChatIcon = (props: SvgProps) => (
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
    <Path d="M7.9 20A9 9 0 1 0 4 16.1L2 22ZM8 12h.01M12 12h.01M16 12h.01" />
  </Svg>
)
