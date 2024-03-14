import { ComponentProps } from "react"
import { Text, View } from "react-native"

import { theme } from "shared/config/theme"

import { Input } from "../input"

interface Props extends ComponentProps<typeof Input> {
  error?: string
  label?: string
}

export const InputField = ({ error, label, style, ...props }: Props) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "column",
      }}
    >
      {label && (
        <Text style={{ fontSize: 14, color: theme.mutedForeground, marginBottom: 4 }}>{label}</Text>
      )}
      <Input style={[style, error ? { borderColor: theme.destructive } : {}]} {...props} />
      {error && (
        <Text style={{ marginTop: 4, color: theme.destructive, fontSize: 14 }}>{error}</Text>
      )}
    </View>
  )
}
