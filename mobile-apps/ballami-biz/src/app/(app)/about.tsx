import { Image } from "expo-image"
import { Link, Stack } from "expo-router"
import { Pressable, StyleSheet, Text, View } from "react-native"

import { theme } from "shared/config/theme"

export default function AboutPage() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
      }}
    >
      <Stack.Screen
        options={{
          title: "О приложении",
          headerTitleStyle: { color: theme.accentForeground },
          headerBackTitleVisible: false,
        }}
      />
      <View style={styles.container}>
        <View style={styles.versionBlock}>
          <Image
            style={styles.logo}
            source={require("../../../assets/favicon.png")}
            contentFit="cover"
            transition={100}
          />
          <Text style={styles.version}>Версия 1.0.0</Text>
        </View>
        <View style={styles.btns}>
          <Link href="/user-agreement" asChild>
            <Pressable>
              <View style={styles.btn}>
                <Text style={{ color: theme.primary }}>Пользовательское соглашение</Text>
              </View>
            </Pressable>
          </Link>
          <Link href="/privacy-policy" asChild>
            <Pressable>
              <View style={styles.btn}>
                <Text style={{ color: theme.primary }}>Политика конфиденциальности</Text>
              </View>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  versionBlock: {
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  version: {
    marginTop: 20,
    fontSize: 14,
    opacity: 0.6,
  },
  logo: {
    width: 60,
    height: 60,
  },
  btns: {
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
  btn: {
    padding: 10,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius,
    height: 40,
    width: "100%",
  },
})
