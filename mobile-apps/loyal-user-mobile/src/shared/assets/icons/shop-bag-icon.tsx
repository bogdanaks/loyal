import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export const ShopBagIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path fill="#6E76FF" d="M12 20.32h8.334L18.667 6.698H5.334L3.667 20.32H12Z" />
    <Path
      stroke="#212125"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M12 20.32H3.667L5.334 7h.856m2.392 0H12m0 13.32h8.333L18.667 7h-.857m-2.392 0H12M7.35 9.22V7.015a4.68 4.68 0 0 1 9.36 0v2.207"
    />
  </Svg>
)
