import { StyleSheet, Text, View } from "react-native"
import QRCode from "react-native-qrcode-svg"

import { useUserStore } from "entities/user/model/store"

export default function QrScanPage() {
  const user = useUserStore((state) => state.user)
  if (!user) {
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <QRCode value={user?.id.toString()} size={260} />
        <Text style={styles.title}>Ваш QR код</Text>
        <Text style={styles.desc}>для получения бонусов</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  block: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "500",
  },
  desc: {
    fontSize: 14,
  },
})
