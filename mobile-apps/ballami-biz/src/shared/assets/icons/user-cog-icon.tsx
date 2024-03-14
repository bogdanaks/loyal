import * as React from "react"
import Svg, { Circle, Path, SvgProps } from "react-native-svg"

export const UserCogIcon = (props: SvgProps) => (
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
    <Path d="M2 21a8 8 0 0 1 10.434-7.62" />
    <Circle cx={10} cy={8} r={5} />
    <Circle cx={18} cy={18} r={3} />
    <Path d="m19.5 14.3-.4.9M16.9 20.8l-.4.9M21.7 19.5l-.9-.4M15.2 16.9l-.9-.4M21.7 16.5l-.9.4M15.2 19.1l-.9.4M19.5 21.7l-.4-.9M16.9 15.2l-.4-.9" />
  </Svg>
)
