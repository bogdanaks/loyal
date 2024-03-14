import { Text, View } from "react-native"

import { EmptyIcon } from "shared/assets/icons/empty-icon"
import { theme } from "shared/config/theme"

export const NoData = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <EmptyIcon />
      <Text style={{ marginTop: 10, color: theme.mutedForeground }}>Пусто</Text>
    </View>
  )
}
