import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export const EditIcon = (props: SvgProps) => (
  <Svg width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5Z"
    />
  </Svg>
)
