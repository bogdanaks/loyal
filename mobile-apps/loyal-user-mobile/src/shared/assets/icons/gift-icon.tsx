import * as React from "react"
import Svg, { SvgProps, Path, G, ClipPath, Defs } from "react-native-svg"
export const GiftIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <G stroke="#4C38FF" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#a)">
      <Path d="M13.334 8v6.667H2.667V8M14.666 4.667H1.333V8h13.333V4.667ZM8 14.667v-10M8 4.667H5a1.667 1.667 0 1 1 0-3.334c2.333 0 3 3.334 3 3.334ZM8 4.667h3a1.667 1.667 0 1 0 0-3.334c-2.333 0-3 3.334-3 3.334Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
