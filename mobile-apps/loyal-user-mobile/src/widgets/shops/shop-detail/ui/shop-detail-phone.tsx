import { Text, View } from "react-native"

import { useMyTheme } from "shared/hooks/use-my-theme"

interface Props {
  shopClient: ShopClient
}

export const ShopDetailPhone = ({ shopClient }: Props) => {
  const { colors } = useMyTheme()

  if (!shopClient.shop.phone) {
    return null
  }

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
      <Text style={{ fontSize: 16, fontWeight: "500" }}>Номер телефона</Text>
      <Text
        style={{
          fontSize: 13,
          fontWeight: "400",
          marginTop: 10,
          color: colors.mutedForeground,
        }}
      >
        +7{shopClient.shop.phone}
      </Text>
    </View>
  )
}
