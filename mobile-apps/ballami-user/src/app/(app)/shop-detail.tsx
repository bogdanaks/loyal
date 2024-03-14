import { Stack, useLocalSearchParams } from "expo-router"

import { ShopDetail } from "widgets/shop-detail/shop-detail"

export default function ShopDetailPage() {
  const { shop } = useLocalSearchParams()

  return (
    <>
      <ShopDetail shopClient={JSON.parse(shop as string) as unknown as ShopClient} />
      <Stack.Screen
        options={{
          headerTitle: "",
          headerBackTitleVisible: false,
          headerTransparent: true,
        }}
      />
    </>
  )
}
