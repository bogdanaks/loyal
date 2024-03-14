import { Text, View } from "react-native"

import { phoneMask } from "shared/config/masks"
import { theme } from "shared/config/theme"
import { MaskedText } from "shared/ui/masked-text"

interface Props {
  shopClient: ShopClient
}

export const ShopDetailPhone = ({ shopClient }: Props) => {
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
      <MaskedText
        mask={phoneMask}
        style={{
          fontSize: 13,
          fontWeight: "400",
          marginTop: 10,
          color: theme.mutedForeground,
        }}
      >
        {shopClient.shop.phone}
      </MaskedText>
    </View>
  )
}
