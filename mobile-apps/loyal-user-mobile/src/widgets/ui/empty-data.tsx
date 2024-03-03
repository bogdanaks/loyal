import { Text, View } from "react-native"

import { EmptyIcon } from "shared/assets/icons"
import { useMyTheme } from "shared/hooks/use-my-theme"

export const EmptyData = () => {
  const { colors } = useMyTheme()
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <EmptyIcon />
      <Text style={{ marginTop: 10, color: colors.mutedForeground }}>Пусто</Text>
    </View>
  )
}
