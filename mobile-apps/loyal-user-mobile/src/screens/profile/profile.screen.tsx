import { StackScreenProps, createStackNavigator } from "@react-navigation/stack"
import { Text, View, StyleSheet, Image, Pressable } from "react-native"
import { CaretRightIcon, ChatIcon, QuestionIcon } from "shared/assets/icons"
import { ScreenContainer } from "widgets/ui/screen-container"
import { ProfileDetailScreen } from "./profile-detail.screen"
import { FeedbackScreen } from "./feedback.screen"
import { AboutAppNavigator } from "./about-app/about-app.navigator"

type ProfileStackParamList = {
  MyProfile: undefined
  ProfileDetail: undefined
  Feedback: undefined
  AboutApp: undefined
  Settings: undefined
}

const Stack = createStackNavigator<ProfileStackParamList>()

const ProfileScreenView = ({ navigation }: StackScreenProps<ProfileStackParamList>) => {
  const handlePress = (screen: keyof ProfileStackParamList) => {
    navigation.push(screen)
  }

  return (
    <ScreenContainer>
      <Pressable onPress={() => handlePress("ProfileDetail")} style={styles.radius}>
        <View style={styles.user}>
          <Image
            style={styles.userImg}
            source={require("/Users/user/Desktop/my/loyal/mobile-apps/loyal-user-mobile/assets/im.jpg")}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Богдан Аксёнов</Text>
          <CaretRightIcon style={{ marginLeft: "auto" }} width={14} height={14} />
        </View>
      </Pressable>
      <View style={styles.btns}>
        <Pressable onPress={() => handlePress("Feedback")} style={styles.radius}>
          <View style={styles.btn}>
            <ChatIcon width={25} height={25} />
            <Text>Обратная связь</Text>
            <CaretRightIcon style={{ marginLeft: "auto" }} width={14} height={14} />
          </View>
        </Pressable>
        <Pressable onPress={() => handlePress("AboutApp")} style={styles.radius}>
          <View style={styles.btn}>
            <QuestionIcon width={25} height={25} />
            <Text>О приложении</Text>
            <CaretRightIcon style={{ marginLeft: "auto" }} width={14} height={14} />
          </View>
        </Pressable>
      </View>
    </ScreenContainer>
  )
}

export const ProfileScreen = () => {
  return (
    <Stack.Navigator initialRouteName="MyProfile">
      <Stack.Screen
        name="MyProfile"
        component={ProfileScreenView}
        options={{ headerShown: true, headerTitle: "Профиль" }}
      />
      <Stack.Screen
        name="ProfileDetail"
        component={ProfileDetailScreen}
        options={{ headerShown: true, headerTitle: "Профиль" }}
      />
      <Stack.Screen
        name="AboutApp"
        component={AboutAppNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{ headerShown: true, headerTitle: "Обратная связь" }}
      />
      {/* <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: true, headerTitle: "Настройки" }}
      /> */}
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  radius: {
    borderRadius: 10,
  },
  user: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    gap: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  btns: {
    flex: 1,
    padding: 10,
    flexDirection: "column",
    gap: 16,
    marginTop: 10,
  },
  btn: {
    width: "auto",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    gap: 4,
    justifyContent: "flex-start",
    flexDirection: "row",
  },
})
