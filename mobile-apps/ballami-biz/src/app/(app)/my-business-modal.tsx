import { useQuery } from "@tanstack/react-query"
import { Stack, router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"

import { getShopTypes } from "entities/shop/api"

import { CheckIcon } from "shared/assets/icons/check-icon"
import { theme } from "shared/config/theme"

export default function MyBusinessModal() {
  const [selectType, setSelectType] = useState<number | null>(null)
  const { select } = useLocalSearchParams()

  const { data: shopTypes } = useQuery({
    queryKey: ["shop-types"],
    queryFn: getShopTypes,
    retry: 1,
  })

  const handlePressType = (type: ShopType) => {
    router.setParams({ shopType: JSON.stringify(type) })
    setSelectType(type.id)
  }

  useEffect(() => {
    if (select) {
      setSelectType(Number(select))
    }
  }, [select])

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <Stack.Screen
        options={{
          title: "Тип бизнеса",
          headerTitleStyle: { color: theme.accentForeground },
          headerBackTitleVisible: false,
          headerBackVisible: true,
        }}
      />
      <View style={styles.selectView}>
        {shopTypes?.data.map((shopType, index) => (
          <Pressable
            key={shopType.id}
            style={[styles.selectBtn, { borderTopWidth: index === 0 ? 0 : 1 }]}
            onPress={() => handlePressType(shopType)}
          >
            <Text
              style={{
                color: selectType === shopType.id ? theme.accentForeground : theme.mutedForeground,
              }}
            >
              {shopType.title}
            </Text>
            <CheckIcon opacity={selectType === shopType.id ? 1 : 0} />
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  selectView: {
    flexDirection: "column",
    backgroundColor: theme.primaryForeground,
    borderRadius: theme.radius,
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  selectBtn: {
    width: "100%",
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopColor: theme.border,
    borderTopWidth: 1,
  },
})
