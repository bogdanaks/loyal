import { Pressable, Text, View, useWindowDimensions } from "react-native"

import { InfoIcon } from "shared/assets/icons"

interface Props {
  onOpenSheet: () => void
}

export const ShopDetailWorkingHours = ({ onOpenSheet }: Props) => {
  const { width } = useWindowDimensions()
  return (
    <View style={{ marginTop: width / 3.5, width: "100%" }}>
      <Pressable
        style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
        onPress={onOpenSheet}
      >
        <Text style={{ fontSize: 15, fontWeight: "400" }}>Режим работы</Text>
        <InfoIcon width={20} height={20} color="#000" />
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 50 }}>9:00</Text>
        <View style={{ height: 4, width: "10%", backgroundColor: "#000", borderRadius: 10 }} />
        <Text style={{ fontSize: 50 }}>22:00</Text>
      </View>
    </View>
  )
}
