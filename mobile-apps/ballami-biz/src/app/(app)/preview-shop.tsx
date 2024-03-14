import { Stack } from "expo-router"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useShopStore } from "entities/shop/model/store"

import { ShopDetail } from "widgets/shop-detail/shop-detail"

export default function PreviewShopPage() {
  const shop = useShopStore((state) => state.shop)
  const { bottom } = useSafeAreaInsets()

  return (
    <View style={{ flex: 1, flexDirection: "column", paddingBottom: bottom }}>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      {shop && (
        <ShopDetail
          shopClient={{
            shop,
            id: 1,
            balance: 100,
            is_active: true,
            updated_at: "",
            created_at: "",
            user_id: 1,
            user: { id: 1, email: "", phone: "", first_name: "", created_at: "", updated_at: "" },
          }}
        />
      )}
    </View>
  )
}
