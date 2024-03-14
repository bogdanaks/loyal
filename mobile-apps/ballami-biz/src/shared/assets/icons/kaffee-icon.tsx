import * as React from "react"
import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg"

export const KaffeeIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 50 50" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path fill="#D0CFCE" d="M49 1H1v47h48V1Z" />
      <Path
        fill="#D0CFCE"
        stroke="#9B9B9A"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M33 15h10l-2 5h-6l-2-5Z"
      />
      <Path
        stroke="#9B9B9A"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M32.5 22.5 29 19h-4v-4h8m-2 11h-6v-7m18.5 3.5L47 19h1m-3 7h3m-3 7h3m-3 7h3m-23-7h5m-5 7h5"
      />
      <Path
        fill="#A57939"
        fillRule="evenodd"
        d="M31 27a7 7 0 1 1 14 0v21H31V27Z"
        clipRule="evenodd"
      />
      <Path fill="#3F3F3F" d="M22 28H6v14h16V28Z" />
      <Path fill="#6A462F" d="M43 28h-4v18h4V28Zm-6 0h-4v18h4V28Z" />
      <Path fill="#6A462F" fillRule="evenodd" d="M33 27a5 5 0 0 1 10 0H33Z" clipRule="evenodd" />
      <Path stroke="#9B9B9A" strokeWidth={2} d="M43 15h5" />
      <Path stroke="#EA5A47" strokeWidth={4} d="M6 25V15m8 10V15m8 10V15" />
      <Path stroke="#fff" strokeWidth={4} d="M18 25V15m-8 10V15" />
      <Path stroke="#D22F27" strokeWidth={4} d="M6 27v-2m8 2v-2m8 2v-2" />
      <Path stroke="#D0CFCE" strokeWidth={4} d="M18 27v-2m-8 2v-2" />
      <Path stroke="#000" strokeLinecap="round" strokeWidth={2} d="M7 42h14" />
      <Path
        fill="#000"
        d="M4 15v-1a1 1 0 0 0-1 1h1Zm20 0h1a1 1 0 0 0-1-1v1ZM9 26a1 1 0 1 0-2 0h2Zm4 0a1 1 0 1 0-2 0h2Zm4 0a1 1 0 1 0-2 0h2Zm4 0a1 1 0 1 0-2 0h2ZM4 16h20v-2H4v2Zm1 10V15H3v11h2Zm1 1a1 1 0 0 1-1-1H3a3 3 0 0 0 3 3v-2Zm1-1a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3H7Zm3 1a1 1 0 0 1-1-1H7a3 3 0 0 0 3 3v-2Zm1-1a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3h-2Zm3 1a1 1 0 0 1-1-1h-2a3 3 0 0 0 3 3v-2Zm1-1a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3h-2Zm3 1a1 1 0 0 1-1-1h-2a3 3 0 0 0 3 3v-2Zm1-1a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3h-2Zm3 1a1 1 0 0 1-1-1h-2a3 3 0 0 0 3 3v-2Zm1-1a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3h-2Zm0-11v11h2V15h-2Z"
      />
      <Path stroke="#000" strokeLinecap="round" strokeWidth={2} d="M24 47V31M4 47V31" />
      <Path
        fill="#000"
        d="M38 21a6 6 0 0 0-6 6h-2a8 8 0 0 1 8-8v2Zm6 6a6 6 0 0 0-6-6v-2a8 8 0 0 1 8 8h-2Zm0 20.005V27h2v20.005h-2ZM32 27v20.007h-2V27h2Z"
      />
      <Path stroke="#000" strokeLinejoin="round" strokeWidth={2} d="M49 1H1v47h48V1Z" />
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M39.03 4h-4v7h4m-4-3.5h3m8-3.5h-4v7h4m-4-3.5h3m-27 3.5-3-7-3 7m1-1.68h4m7-1.82h-3V11 4h4m6.17 3.5h-3V11 4h4M5 4v7m.02-2.461L9.02 4M6.986 6.357l2.397 4.647"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h50v49H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
