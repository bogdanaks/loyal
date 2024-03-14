import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { ScanPayment } from "features/scan"
import { useEffect, useRef } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useShopStore } from "entities/shop/model/store"
import { UserRow } from "entities/user/ui"

import { theme } from "shared/config/theme"

import { useScanStore } from "../model/store"

export const ScanClient = () => {
  const shop = useShopStore((state) => state.shop)
  const userAsClient = useScanStore((state) => state.userAsClient)
  const balance = useScanStore((state) => state.balance)
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const tabHeight = useBottomTabBarHeight()
  const { top, bottom } = useSafeAreaInsets()

  useEffect(() => {
    if (userAsClient) {
      bottomSheetRef.current?.present()
    } else {
      bottomSheetRef.current?.close()
    }
  }, [userAsClient])

  if (!userAsClient || !shop) {
    return null
  }

  const loyalTypeTitle = shop.loyal_program.loyal_type.title

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={userAsClient ? 1 : 0}
      snapPoints={["100%"]}
      style={[styles.sheetModalContainer, { paddingTop: top }]}
      enableDynamicSizing
      enableOverDrag={false}
      enablePanDownToClose={false}
      enableHandlePanningGesture={false}
      enableContentPanningGesture={false}
      handleComponent={null}
    >
      <BottomSheetView style={{ flex: 1, paddingBottom: tabHeight + 14 }}>
        <View style={styles.header}>
          <Pressable style={styles.headerBack} onPress={() => bottomSheetRef.current?.close()}>
            <Text style={{ color: theme.primary }}>Закрыть</Text>
          </Pressable>
          <Text style={styles.headerTitle}>
            {loyalTypeTitle === "Бонусная" ? "Назначение баллов" : "Бонусная скидка"}
          </Text>
        </View>
        <View style={styles.userHeader}>
          <UserRow user={userAsClient} />
          {loyalTypeTitle === "Бонусная" && (
            <View style={styles.userHeaderPoints}>
              <Text style={{ fontSize: 30, fontWeight: "500" }}>{balance}</Text>
              <Text style={{ textAlign: "right" }}>баллов</Text>
            </View>
          )}
        </View>
        {!userAsClient?.client && (
          <View style={styles.newClientBlock}>
            <Text style={{ fontSize: 17 }}>Новый клиент!</Text>
            {shop.loyal_program.reg_bonus > 0 && (
              <Text>
                Дополнительно{" "}
                <Text style={{ fontWeight: "500" }}>{shop.loyal_program.reg_bonus}</Text>{" "}
                {loyalTypeTitle === "Бонусная" ? "баллов" : "бонусов"} за регистрацию.
              </Text>
            )}
          </View>
        )}
        <ScanPayment userAsClient={userAsClient} />
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({
  sheetModalContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  newClientBlock: {
    borderRadius: theme.radius,
    padding: 16,
    backgroundColor: theme.green200,
    marginBottom: 16,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    position: "relative",
  },
  headerBack: {
    position: "absolute",
    left: 0,
  },
  headerTitle: {
    fontWeight: "600",
    fontSize: 17,
  },
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  userHeaderPoints: {
    flexDirection: "column",
  },
})
