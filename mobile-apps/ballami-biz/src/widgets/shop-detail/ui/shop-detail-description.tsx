import { Text, View } from "react-native"

import { theme } from "shared/config/theme"

interface Props {
  shopClient: ShopClient
}

export const ShopDetailDescription = ({ shopClient }: Props) => {
  return (
    <View
      style={{
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        marginTop: 16,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "500" }}>Описание</Text>
      <Text
        style={{
          fontSize: 13,
          fontWeight: "400",
          marginTop: 10,
          color: theme.mutedForeground,
        }}
      >
        {shopClient.shop.description}
      </Text>
    </View>
  )
}
