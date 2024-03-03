import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import React, { useRef } from "react"
import { StyleSheet, Text, View } from "react-native"

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ShopWorkingHoursSheet = ({ isOpen, onClose }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onClose={onClose}
      enablePanDownToClose
      enableDynamicSizing
      index={!isOpen ? -1 : 1}
      snapPoints={[400]}
    >
      <BottomSheetView style={styles.contentContainer}>
        <BottomSheetView
          style={{
            flex: 1,
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingBottom: 40,
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 17, marginBottom: 30 }}>Режим работы</Text>
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
      </BottomSheetView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
})
