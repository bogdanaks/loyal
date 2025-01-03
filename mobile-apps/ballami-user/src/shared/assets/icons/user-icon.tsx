import * as React from "react"
import Svg, { SvgProps, Path, G } from "react-native-svg"
export const UserIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 72 72" {...props}>
    <G fill="#D0CFCE">
      <Path d="M58 61s0-3-1-7c-1.21-4.846-4-8-10-8H25c-6 0-8.79 3.154-10 8-1 4-1 7-1 7h44zM26 26c0 3.725.54 7.809 2 10 1.861 2.793 5.018 4 8 4 3.096 0 6.137-1.207 8-4 1.46-2.191 2-6.275 2-10 0-2.793-1-12-10-12s-10 7.344-10 12z" />
    </G>
    <G fill="none" stroke="#000" strokeLinejoin="round" strokeWidth={2}>
      <Path
        strokeLinecap="round"
        d="M58 60s0-2-1-6c-1.21-4.846-4-8-10-8H25c-6 0-8.79 3.154-10 8-1 4-1 6-1 6"
      />
      <Path d="M26 26c0 3.725.54 7.809 2 10 1.861 2.793 5.018 4 8 4 3.096 0 6.137-1.207 8-4 1.46-2.191 2-6.275 2-10 0-2.793-1-12-10-12s-10 7.344-10 12z" />
    </G>
  </Svg>
)
