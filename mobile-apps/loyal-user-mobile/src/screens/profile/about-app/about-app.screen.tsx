import { StackScreenProps } from "@react-navigation/stack"
import { Image } from "expo-image"
import { StatusBar } from "expo-status-bar"
import { Pressable, StyleSheet, Text, View } from "react-native"

import { useMyTheme } from "shared/hooks/use-my-theme"

import { ScreenContainer } from "widgets/ui/screen-container"

import { AboutStackParamList } from "./about-app.navigator"

export const AboutAppScreen = ({ navigation }: StackScreenProps<AboutStackParamList>) => {
  const { colors } = useMyTheme()

  const handlePress = (value: keyof AboutStackParamList) => {
    navigation.navigate(value)
  }

  return (
    <ScreenContainer>
      <StatusBar style="dark" animated={true} backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.versionBlock}>
          <Image
            style={styles.logo}
            source={require("/Users/user/Desktop/my/loyal/mobile-apps/loyal-user-mobile/assets/favicon.png")}
            contentFit="cover"
            cachePolicy="disk"
          />
          <Text style={styles.version}>Версия 1.0.0</Text>
        </View>
        <View style={styles.btns}>
          <Pressable style={styles.btn} onPress={() => handlePress("UserAgreement")}>
            <Text style={{ color: colors.primary }}>Пользовательское соглашение</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={() => handlePress("PrivacyPolicy")}>
            <View>
              <Text style={{ color: colors.primary }}>Политика конфиденциальности</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ScreenContainer>
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
    borderRadius: 10,
    height: 50,
    width: "100%",
  },
})
