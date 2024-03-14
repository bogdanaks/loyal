import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import React, { useEffect, useRef } from "react"
import { StyleSheet, Text, View } from "react-native"

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ShopWorkingHoursSheet = ({ isOpen, onClose }: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.present()
    } else {
      bottomSheetRef.current?.close()
    }
  }, [isOpen])

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      onDismiss={onClose}
      enablePanDownToClose
      enableDynamicSizing
      index={1}
      snapPoints={[300, 400]}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={{ fontWeight: "600", fontSize: 17, marginBottom: 30 }}>Режим работы</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            height: 44,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "400", fontSize: 17 }}>Понедельник</Text>
          <Text style={{ fontWeight: "400", fontSize: 17 }}>9:00 - 22:00</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            height: 44,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "400", fontSize: 17 }}>Вторник</Text>
          <Text style={{ fontWeight: "400", fontSize: 17 }}>9:00 - 22:00</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            height: 44,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "400", fontSize: 17 }}>Среда</Text>
          <Text style={{ fontWeight: "400", fontSize: 17 }}>9:00 - 22:00</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            height: 44,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "400", fontSize: 17 }}>Четверг</Text>
          <Text style={{ fontWeight: "400", fontSize: 17 }}>9:00 - 22:00</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            height: 44,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "400", fontSize: 17 }}>Пятница</Text>
          <Text style={{ fontWeight: "400", fontSize: 17 }}>9:00 - 22:00</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            height: 44,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "400", fontSize: 17 }}>Суббота</Text>
          <Text style={{ fontWeight: "400", fontSize: 17 }}>9:00 - 22:00</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            height: 44,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "400", fontSize: 17 }}>Воскресенье</Text>
          <Text style={{ fontWeight: "400", fontSize: 17, color: "red" }}>Выходной</Text>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 0,
    alignItems: "center",
    height: "auto",
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
})
