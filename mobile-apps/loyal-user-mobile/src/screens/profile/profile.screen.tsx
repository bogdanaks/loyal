import { StackScreenProps, createStackNavigator } from "@react-navigation/stack"
import { useMutation } from "@tanstack/react-query"
import { Asset } from "expo-asset"
import { Image } from "expo-image"
import * as ImagePicker from "expo-image-picker"
import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { Dimensions } from "react-native"
import Toast from "react-native-toast-message"

import { AppStackScreenList } from "app/export-type"

import { useAuthStore } from "entities/auth/model/store"

import { uploadUserPhoto } from "entities/user/api"
import { useUserStore } from "entities/user/model/store"

import { CaretRightIcon, ChatIcon, EditIcon, ExitIcon, QuestionIcon } from "shared/assets/icons"
import { config } from "shared/config"
import { useMyTheme } from "shared/hooks/use-my-theme"
import { removeAuthToken } from "shared/libs/storage"

import { ScreenContainer } from "widgets/ui/screen-container"

import { AboutAppNavigator } from "./about-app/about-app.navigator"
import { FeedbackScreen } from "./feedback.screen"
import { ProfileDetailScreen } from "./profile-detail.screen"

const windowWidth = Dimensions.get("window").width
const Stack = createStackNavigator<AppStackScreenList>()

const ProfileScreenView = ({ navigation }: StackScreenProps<AppStackScreenList>) => {
  const { colors } = useMyTheme()
  const setIsAuth = useAuthStore((state) => state.setIsAuth)
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const [stockPhoto, setStockPhoto] = useState<Asset | null>(null)
  const [photo, setPhoto] = useState(user?.photo)
  const [isReadyPhoto, setIsReadyPhoto] = useState(false)

  const mutationPhoto = useMutation({
    mutationFn: uploadUserPhoto,
  })

  useEffect(() => {
    if (!user?.photo) {
      // eslint-disable-next-line no-extra-semi
      ;(async () => {
        const image = Asset.fromModule(
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require("/Users/user/Desktop/my/loyal/mobile-apps/loyal-user-mobile/assets/im.jpg")
        )
        await image.downloadAsync()
        setStockPhoto(image)
      })()
    } else {
      setPhoto(`${config.apiDomain}/static/${user.photo}`)
    }
    setIsReadyPhoto(true)
  }, [user])

  const handlePress = (screen: keyof AppStackScreenList) => {
    navigation.push(screen)
  }

  const handleExit = async () => {
    await removeAuthToken()
    setIsAuth(false)
  }

  const handleChoosePhoto = async () => {
    if (!user) {
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setPhoto(result.assets[0].uri)

      const newPhoto = result.assets[0]
      if (newPhoto.uri && newPhoto.mimeType) {
        const formData = new FormData()

        formData.append("photo", {
          uri: newPhoto.uri,
          name: user.id.toString(),
          type: newPhoto.mimeType,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
        mutationPhoto.mutate(formData, {
          onSuccess: () => {
            Toast.show({
              type: "success",
              text1: "Успешно сохранено!",
            })
            setUser({ ...user, photo: `${user.id}.webp` })
          },
          onError: () => {
            Toast.show({
              type: "error",
              text1: "Ошибка! Обратитесь в поддержку.",
            })
          },
        })
      }
    }
  }

  return (
    <ScreenContainer style={{ backgroundColor: colors.muted }}>
      <StatusBar style="dark" animated={true} backgroundColor={colors.muted} />
      <View style={styles.photoBlock}>
        <Pressable style={{ marginLeft: "auto" }} onPress={() => navigation.push("ProfileDetail")}>
          <EditIcon width={24} height={24} />
        </Pressable>
        <Pressable onPress={handleChoosePhoto}>
          {isReadyPhoto && (
            <Image
              style={styles.userImg}
              source={{
                height: 100,
                width: 100,
                uri: photo ?? stockPhoto?.uri,
              }}
              contentFit="cover"
              cachePolicy="disk"
            />
          )}
        </Pressable>
        <Text style={{ fontSize: 28, fontWeight: "500", marginTop: 18 }}>
          {user?.first_name} {user?.last_name}
        </Text>
      </View>
      <View style={{ backgroundColor: "#fff", flex: 1, height: "100%" }}>
        <View style={styles.btns}>
          <Pressable
            onPress={() => handlePress("Feedback")}
            style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
          >
            <View style={[styles.btn, { borderTopLeftRadius: 10, borderTopRightRadius: 10 }]}>
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
          <Pressable onPress={handleExit} style={styles.radius}>
            <View style={[styles.btn, { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]}>
              <ExitIcon width={25} height={25} />
              <Text>Выйти</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  photoBlock: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 80,
    backgroundColor: "#f1f5f9",
  },
  radius: {
    borderRadius: 10,
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  btns: {
    flex: 1,
    flexDirection: "column",
    position: "absolute",
    top: -30,
    width: windowWidth - 32,
    marginHorizontal: 16,
    padding: 4,
    shadowColor: "#929292",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
  btn: {
    width: "auto",
    height: 50,
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "center",
    gap: 4,
    justifyContent: "flex-start",
    flexDirection: "row",
  },
})

export const ProfileScreen = () => {
  return (
    <Stack.Navigator initialRouteName="MyProfile">
      <Stack.Screen
        name="MyProfile"
        component={ProfileScreenView}
        options={{ headerShown: false, headerTitle: "Профиль" }}
      />
      <Stack.Screen
        name="ProfileDetail"
        component={ProfileDetailScreen}
        options={{ headerShown: true, headerTitle: "Настройки" }}
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
    </Stack.Navigator>
  )
}
