import { Link } from "expo-router"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useAuthStore } from "entities/auth/model/store"

import { ExitIcon } from "shared/assets/icons/exit-icon"
import { InfoIcon } from "shared/assets/icons/info-icon"
import { KaffeeIcon } from "shared/assets/icons/kaffee-icon"
import { QuestionIcon } from "shared/assets/icons/question-icon"
import { TicketIcon } from "shared/assets/icons/ticket-icon"
import { UserCogIcon } from "shared/assets/icons/user-cog-icon"
import { removeAuthToken } from "shared/config/storage"
import { theme } from "shared/config/theme"

export default function AccountPage() {
  const { top } = useSafeAreaInsets()
  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  const handleExit = async () => {
    await removeAuthToken()
    setIsAuth(false)
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: top,
        paddingBottom: 4,
      }}
    >
      <View
        style={{
          alignItems: "flex-start",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          marginTop: 24,
        }}
      >
        <Text style={{ fontSize: 20 }}>
          Ваш тариф: <Text style={{ fontWeight: "500" }}>Старт</Text>
        </Text>
        <Text style={{ fontSize: 16 }}>
          Действителен до{" "}
          <Text style={{ fontWeight: "500", color: theme.primary }}>05.01.2023</Text>
        </Text>
      </View>

      <View style={{ flexDirection: "column", gap: 10, marginTop: 24, width: "100%" }}>
        <Link href="/my-business" asChild>
          <Pressable>
            <View style={styles.categoryBlock}>
              <View style={styles.categoryBlockInfo}>
                <Text style={styles.categoryBlockTitle}>Мой бизнес</Text>
                <Text style={styles.categoryBlockDesc}>Необходимая информация о вашем бизнесе</Text>
              </View>
              <View style={styles.categoryBlockIcon}>
                <KaffeeIcon width={100} height={100} />
              </View>
            </View>
          </Pressable>
        </Link>
        <Link href="/loyal-program" asChild>
          <Pressable>
            <View style={styles.categoryBlock}>
              <View style={styles.categoryBlockInfo}>
                <Text style={styles.categoryBlockTitle}>Программа лояльности</Text>
                <Text style={styles.categoryBlockDesc}>Выбор и настройка программы лояльности</Text>
              </View>
              <View style={styles.categoryBlockIcon}>
                <TicketIcon width={100} height={100} />
              </View>
            </View>
          </Pressable>
        </Link>
      </View>

      <View style={{ width: "100%", marginTop: "auto", gap: 10 }}>
        <Link href="/account-settings" asChild>
          <Pressable>
            <View style={styles.button}>
              <UserCogIcon color={theme.slate600} />
              <Text style={{ marginLeft: 4 }}>Настройки аккаунта</Text>
            </View>
          </Pressable>
        </Link>
        <Link href="/help" asChild>
          <Pressable>
            <View style={styles.button}>
              <InfoIcon color={theme.slate600} />
              <Text style={{ marginLeft: 4 }}>Помощь</Text>
            </View>
          </Pressable>
        </Link>
        <Link href="/about" asChild>
          <Pressable>
            <View style={styles.button}>
              <QuestionIcon color={theme.slate600} />
              <Text style={{ marginLeft: 4 }}>О приложении</Text>
            </View>
          </Pressable>
        </Link>
        <Pressable style={[styles.button, { backgroundColor: "transparent" }]} onPress={handleExit}>
          <ExitIcon color={theme.destructive} />
          <Text style={{ color: theme.destructive, marginLeft: 4 }}>Выйти</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.radius,
    paddingHorizontal: 16,
    backgroundColor: theme.primaryForeground,
  },
  categoryBlock: {
    backgroundColor: theme.accent,
    borderRadius: theme.radius,
    padding: 20,
    gap: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  categoryBlockInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "100%",
    maxWidth: "60%",
  },
  categoryBlockTitle: {
    fontSize: 24,
    fontWeight: "500",
  },
  categoryBlockDesc: {
    fontSize: 14,
    marginTop: 4,
    color: theme.mutedForeground,
  },
  categoryBlockIcon: {
    maxWidth: "40%",
  },
})
