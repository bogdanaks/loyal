import * as React from "react"
import Svg, { Circle, G, Path, SvgProps } from "react-native-svg"

interface Props extends SvgProps {
  outlineColor?: string
  backgroundFill?: string
}

export const QrIcon = ({ backgroundFill = "#fff", outlineColor = "#000", ...props }: Props) => (
  <Svg viewBox="0 0 72 72" {...props}>
    <Path d="M20 20h4v4h-4zM20 48h4v4h-4zM48 20h4v4h-4z" />
    <G stroke={outlineColor} strokeLinejoin="round" strokeWidth={2}>
      <Path fill={backgroundFill} d="M12 12h48v48H12z" />
      <Path fill="#3F3F3F" d="M20 20h4v4h-4zM20 48h4v4h-4zM48 20h4v4h-4z" />
    </G>
    <Circle cx={18} cy={40} r={1} />
    <Circle cx={16} cy={38} r={1} />
    <Circle cx={20} cy={38} r={1} />
    <Circle cx={34} cy={46} r={1} />
    <Circle cx={40} cy={38} r={1} />
    <Circle cx={40} cy={28} r={1} />
    <Circle cx={32} cy={16} r={1} />
    <Circle cx={46} cy={32} r={1} />
    <Circle cx={52} cy={32} r={1} />
    <Circle cx={52} cy={44} r={1} />
    <Circle cx={54} cy={48} r={1} />
    <Circle cx={56} cy={56} r={1} />
    <Circle cx={32} cy={56} r={1} />
    <Circle cx={44} cy={56} r={1} />
    <Circle cx={46} cy={54} r={1} />
    <Circle cx={44} cy={52} r={1} />
    <Circle cx={16} cy={32} r={1} />
    <Circle cx={40} cy={54} r={1} />
    <Path
      fill="none"
      stroke={outlineColor}
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 12h48v48H12z"
    />
    <Path
      fill="none"
      stroke={outlineColor}
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 16h12v12H16z"
    />
    <Path
      fill="none"
      stroke={outlineColor}
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 20h4v4h-4zM16 44h12v12H16z"
    />
    <Path
      fill="none"
      stroke={outlineColor}
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 48h4v4h-4zM44 16h12v12H44z"
    />
    <Path
      fill="none"
      stroke={outlineColor}
      strokeLinejoin="round"
      strokeWidth={2}
      d="M48 20h4v4h-4z"
    />
    <Path
      fill="none"
      stroke={outlineColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 36v-2h8M20 34v-2M24 34v6M24 38h2M38 32v-2M56 34h-2M42 42h2v-2M28 32h2M34 32h6M38 16v4h-2v8M36 26h-4v2M36 20h-4"
    />
    <Path
      fill="none"
      stroke={outlineColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M36 22h-2v-4M28 36h8M30 36v4h-2M34 36v2M32 44v-2h6v6h4v-2h8v10"
    />
    <Path
      fill="none"
      stroke={outlineColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M36 40v4h6m4-4h-4v8h2M48 34v4h2v4h-2v4M50 38v-2h2M52 50h-4v2M32 52h2v2h2v-4M56 32v6h-2M44 36v-2M56 42v2M54 52h2M40 22v2"
    />
  </Svg>
)
