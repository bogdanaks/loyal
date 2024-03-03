import React, { ComponentProps } from "react"
import { Text, View } from "react-native"

import { useMyTheme } from "shared/hooks/use-my-theme"

import { Input } from "../input"

interface Props extends ComponentProps<typeof Input> {
  error?: string
  label?: string
}

export const InputField = ({ error, label, style, ...props }: Props) => {
  const { colors } = useMyTheme()
  return (
    <View style={{ width: "100%" }}>
      {label && (
        <Text style={{ fontSize: 14, color: colors.mutedForeground, marginBottom: 4 }}>
          {label}
        </Text>
      )}
      <Input style={[style, error ? { borderColor: "red" } : {}]} {...props} />
      {error && <Text style={{ marginTop: 4, color: "red", fontSize: 14 }}>{error}</Text>}
    </View>
  )
}
