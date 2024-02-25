import { StyleSheet, Text, View } from "react-native"
import QRCode from "react-native-qrcode-svg"

export const QrScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ваш QR код для начисления балов</Text>
      <QRCode value="492-451" size={260} />
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
  title: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
})
