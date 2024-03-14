import { ComponentProps } from "react"
import { Text, View } from "react-native"

import { theme } from "shared/config/theme"

import { InputImask } from "../input-imask"

interface Props extends ComponentProps<typeof InputImask> {
  error?: string
  label?: string
}

export const InputImaskField = ({ error, label, style, ...props }: Props) => {
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
      <InputImask style={[style, error ? { borderColor: theme.destructive } : {}]} {...props} />
      {error && (
        <Text style={{ marginTop: 4, color: theme.destructive, fontSize: 14 }}>{error}</Text>
      )}
    </View>
  )
}
