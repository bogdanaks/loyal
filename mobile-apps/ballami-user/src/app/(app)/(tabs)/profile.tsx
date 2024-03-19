import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Image } from "expo-image"
import * as ImagePicker from "expo-image-picker"
import { Link } from "expo-router"
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useAuthStore } from "entities/auth/model/store"

import { uploadUserPhoto } from "entities/user/api"
import { useUserStore } from "entities/user/model/store"

import { CaretRightIcon } from "shared/assets/icons/caret-right"
import { ChatIcon } from "shared/assets/icons/chat-icon"
import { EditIcon } from "shared/assets/icons/edit-icon"
import { ExitIcon } from "shared/assets/icons/exit-icon"
import { InfoIcon } from "shared/assets/icons/info-icon"
import { config } from "shared/config"
import { removeAuthToken } from "shared/config/storage"
import { theme } from "shared/config/theme"
import { showError, showSuccess } from "shared/libs/toast-utils"
import { UploadImage } from "shared/ui/upload-image"

const windowWidth = Dimensions.get("window").width

export default function ProfilePage() {
  const setIsAuth = useAuthStore((state) => state.setIsAuth)
  const user = useUserStore((state) => state.user)
  const { top } = useSafeAreaInsets()
  const queryClient = useQueryClient()

  const mutationPhoto = useMutation({
    mutationFn: uploadUserPhoto,
  })

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
      const newPhoto = result.assets[0]
      if (newPhoto.uri && newPhoto.mimeType) {
        const formData = new FormData()

        formData.append("photo", {
          uri: newPhoto.uri,
          name: user.photo ?? "null",
          type: newPhoto.mimeType,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
        mutationPhoto.mutate(formData, {
          onSuccess: () => {
            showSuccess()
            queryClient.invalidateQueries({ queryKey: ["user-me"], type: "all" })
          },
          onError: () => {
            showError()
          },
        })
      }
    }
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={[styles.photoBlock, { paddingTop: top }]}>
        <Link href="/profile-detail" asChild>
          <Pressable style={{ marginLeft: "auto" }}>
            <EditIcon width={24} height={24} />
          </Pressable>
        </Link>
        <Pressable
          onPress={handleChoosePhoto}
          style={{ width: 100, height: 100, borderRadius: 100 }}
        >
          {user?.photo ? (
            <Image
              style={styles.userImg}
              source={{
                height: 100,
                width: 100,
                uri: `${config.apiDomain}/static/users/${user?.photo}`,
              }}
              contentFit="cover"
              cachePolicy="disk"
            />
          ) : (
            <UploadImage />
          )}
        </Pressable>
        <Text style={{ fontSize: 28, fontWeight: "500", marginTop: 18 }}>
          {user?.first_name} {user?.last_name}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.btns}>
          <Link href="/feedback" asChild>
            <Pressable style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
              <View style={[styles.btn, { borderTopLeftRadius: 10, borderTopRightRadius: 10 }]}>
                <ChatIcon width={20} height={20} color={theme.slate600} />
                <Text style={{ marginLeft: 4 }}>Обратная связь</Text>
                <CaretRightIcon style={{ marginLeft: "auto" }} width={14} height={14} />
              </View>
            </Pressable>
          </Link>
          <Link href="/about" asChild>
            <Pressable style={styles.radius}>
              <View style={styles.btn}>
                <InfoIcon width={20} height={20} color={theme.slate600} />
                <Text style={{ marginLeft: 4 }}>О приложении</Text>
                <CaretRightIcon style={{ marginLeft: "auto" }} width={14} height={14} />
              </View>
            </Pressable>
          </Link>
          <Pressable onPress={handleExit} style={styles.radius}>
            <View style={[styles.btn, { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]}>
              <ExitIcon width={20} height={20} color={theme.destructive} />
              <Text style={{ color: theme.destructive, marginLeft: 4 }}>Выйти</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  photoBlock: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
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
    backgroundColor: theme.background,
    borderRadius: theme.radius,
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
    padding: 10,
    alignItems: "center",
    gap: 4,
    justifyContent: "flex-start",
    flexDirection: "row",
  },
})
