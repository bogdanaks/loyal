import * as React from "react"
import Svg, { SvgProps, Path, G, Circle } from "react-native-svg"
export const QrIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#4C38FF"
      d="M8 6.667H6.667V8H8V6.667ZM8 16H6.667v1.333H8V16Zm9.333-9.333H16V8h1.333V6.667Z"
    />
    <Path stroke="#4C38FF" strokeLinejoin="round" d="M20 4H4v16h16V4Z" />
    <Path
      fill="#3F3F3F"
      stroke="#4C38FF"
      strokeLinejoin="round"
      d="M8 6.667H6.667V8H8V6.667ZM8 16H6.667v1.333H8V16Zm9.333-9.333H16V8h1.333V6.667Z"
    />
    <Path
      fill="#4C38FF"
      d="M6 13.667A.333.333 0 1 0 6 13a.333.333 0 0 0 0 .667ZM5.333 13a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667Zm1.333 0a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667Zm4.667 2.667a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667Zm2-2.667a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667Zm0-3.333a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667Zm-2.667-4a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667ZM15.333 11a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667Zm2 0a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667Zm0 4a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667ZM18 16.333a.333.333 0 1 0 0-.666.333.333 0 0 0 0 .666ZM18.666 19a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667Zm-8 0a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667Zm4 0a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667Zm.667-.667a.333.333 0 1 0 0-.666.333.333 0 0 0 0 .666Zm-.667-.666a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667ZM5.333 11a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667Zm8 7.333a.333.333 0 1 0 0-.666.333.333 0 0 0 0 .666Z"
    />
    <Path stroke="#4C38FF" strokeLinejoin="round" strokeWidth={0.7} d="M20 4H4v16h16V4Z" />
    <Path stroke="#4C38FF" strokeLinejoin="round" strokeWidth={0.7} d="M9.333 5.333h-4v4h4v-4Z" />
    <Path
      stroke="#4C38FF"
      strokeLinejoin="round"
      strokeWidth={0.7}
      d="M8 6.667H6.667V8H8V6.667Zm1.333 8h-4v4h4v-4Z"
    />
    <Path
      stroke="#4C38FF"
      strokeLinejoin="round"
      strokeWidth={0.7}
      d="M8 16H6.667v1.333H8V16ZM18.667 5.333h-4v4h4v-4Z"
    />
    <Path
      stroke="#4C38FF"
      strokeLinejoin="round"
      strokeWidth={0.7}
      d="M17.333 6.667H16V8h1.333V6.667Z"
    />
    <Path
      stroke="#4C38FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.7}
      d="M6 12v-.667h2.667m-2 0v-.666M8 11.333v2m0-.666h.667m4-2V10m6 1.333H18M14 14h.667v-.667m-5.334-2.666H10m1.333 0h2m-.666-5.334v1.334H12v2.666m0-.666h-1.333v.666M12 6.667h-1.333"
    />
    <Path
      stroke="#4C38FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.7}
      d="M12 7.333h-.667V6m-2 6H12m-2 0v1.333h-.667m2-1.333v.667m-.666 2V14h2v2H14v-.667h2.667v3.334"
    />
    <Path
      stroke="#4C38FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.7}
      d="M12 13.333v1.334h2m1.333-1.334H14V16h.667M16 11.333v1.334h.667V14H16v1.333m.667-2.666V12h.667m-.001 4.667H16v.666m-5.333 0h.667V18H12v-1.333m6.667-6v2H18M14.667 12v-.667m4 2.667v.667M18 17.333h.667m-5.334-10V8"
    />
  </Svg>
)
