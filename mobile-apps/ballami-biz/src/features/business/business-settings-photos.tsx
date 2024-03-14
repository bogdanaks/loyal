import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Image } from "expo-image"
import * as ImagePicker from "expo-image-picker"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import * as z from "zod"

import { deleteShopPhoto, uploadShopAvatar, uploadShopBanner } from "entities/shop/api"
import { useShopStore } from "entities/shop/model/store"

import { PhotoIcon } from "shared/assets/icons/photo-icon"
import { config } from "shared/config"
import { theme } from "shared/config/theme"
import { showError, showSuccess } from "shared/libs/toast-utils"

const formSchema = z.object({
  photo: z.any(),
  banners: z.any(),
})

type FormFields = z.infer<typeof formSchema>

export const BusinessSettingsPhotos = () => {
  const { bottom } = useSafeAreaInsets()
  const shop = useShopStore((state) => state.shop)
  const queryClient = useQueryClient()
  const { width } = useWindowDimensions()
  const imageWidth = width - 96
  const imageHeight = imageWidth / 1.78

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      banners: shop?.banners ?? {},
    },
  })
  const { mutate: mutateUploadAvatar } = useMutation<
    BaseResponse<Shop>,
    ResponseError,
    FormData,
    unknown
  >({
    mutationFn: uploadShopAvatar,
  })
  const { mutate: mutateUploadBanner } = useMutation<
    BaseResponse<Shop>,
    ResponseError,
    FormData,
    unknown
  >({
    mutationFn: uploadShopBanner,
  })
  const { mutate: mutateDelete } = useMutation<BaseResponse<Shop>, ResponseError, string, unknown>({
    mutationFn: deleteShopPhoto,
    retry: false,
  })

  useEffect(() => {
    if (shop) {
      if (shop?.photo) {
        form.setValue("photo", `${config.apiDomain}/static/shops/${shop.id}/${shop.photo}`)
      }
      if (Object.keys(shop?.banners).length) {
        form.setValue(`banners`, {})
        for (const [index, banner] of Object.entries(shop.banners)) {
          form.setValue(`banners.${index}`, `${config.apiDomain}/static/shops/${shop.id}/${banner}`)
        }
      }
    }
  }, [shop])

  const handleChooseBanner = async (index: number) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [16, 9],
      quality: 1,
    })

    if (!result.canceled) {
      // form.setValue(`banners.${index}`, result.assets[0].uri)

      const newPhoto = result.assets[0]
      if (newPhoto.uri && newPhoto.mimeType) {
        const formData = new FormData()
        const query = new URLSearchParams({
          index: String(index),
          name: newPhoto.fileName ?? "null",
        })

        formData.append("banner", {
          uri: newPhoto.uri,
          name: query.toString(),
          type: newPhoto.mimeType,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
        mutateUploadBanner(formData, {
          onSuccess: () => {
            showSuccess()
            queryClient.invalidateQueries({ queryKey: ["my-shop"] })
          },
          onError: () => {
            showError()
          },
        })
      }
    }
  }

  const handleChooseAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      // form.setValue("photo", result.assets[0].uri)

      const newPhoto = result.assets[0]
      if (newPhoto.uri && newPhoto.mimeType) {
        const formData = new FormData()

        formData.append("shopAvatar", {
          uri: newPhoto.uri,
          name: "null",
          type: newPhoto.mimeType,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
        mutateUploadAvatar(formData, {
          onSuccess: () => {
            showSuccess()
            queryClient.invalidateQueries({ queryKey: ["my-shop"] })
          },
          onError: () => {
            showError()
          },
        })
      }
    }
  }

  const onDelete = (id: string) => {
    mutateDelete(id, {
      onSuccess: () => {
        showSuccess("Успешно удалено!")
        queryClient.invalidateQueries({ queryKey: ["my-shop"] })
      },
      onError: () => {
        showError()
      },
    })
  }

  const watchAvatar = form.watch("photo")
  const watchBanners = form.watch("banners")

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 16, paddingBottom: bottom, gap: 16 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Controller
        control={form.control}
        name="photo"
        render={() => (
          <View>
            <Text style={{ fontSize: 14, color: theme.mutedForeground, marginBottom: 4 }}>
              Фото
            </Text>
            <Pressable onPress={handleChooseAvatar} style={styles.avatarBlock}>
              {watchAvatar ? (
                <Image style={styles.avatarImg} source={watchAvatar} />
              ) : (
                <View style={styles.emptyAvatar}>
                  <PhotoIcon />
                </View>
              )}
            </Pressable>
          </View>
        )}
      />
      <Controller
        control={form.control}
        name="banners"
        render={() => {
          return (
            <View>
              <Text style={{ fontSize: 14, color: theme.mutedForeground, marginBottom: 4 }}>
                Баннеры
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: 8,
                }}
              >
                <View>
                  <Pressable
                    style={{ width: imageWidth, height: imageHeight }}
                    onPress={() => handleChooseBanner(0)}
                  >
                    {watchBanners?.[0] ? (
                      <Image style={styles.bannerImg} source={watchBanners[0]} />
                    ) : (
                      <View style={styles.emptyBanner}>
                        <PhotoIcon />
                      </View>
                    )}
                  </Pressable>
                  {watchBanners[0] && (
                    <Pressable
                      style={{ marginTop: 6, alignItems: "center", justifyContent: "center" }}
                      onPress={() => onDelete(watchBanners[0])}
                    >
                      <Text style={{ color: theme.destructive }}>Удалить</Text>
                    </Pressable>
                  )}
                </View>
                <View>
                  <Pressable
                    style={{ width: imageWidth, height: imageHeight }}
                    onPress={() => handleChooseBanner(1)}
                  >
                    {watchBanners?.[1] ? (
                      <Image style={styles.bannerImg} source={watchBanners[1]} />
                    ) : (
                      <View style={styles.emptyBanner}>
                        <PhotoIcon />
                      </View>
                    )}
                  </Pressable>
                  {watchBanners[1] && (
                    <Pressable
                      style={{ marginTop: 6, alignItems: "center", justifyContent: "center" }}
                      onPress={() => onDelete(watchBanners[1])}
                    >
                      <Text style={{ color: theme.destructive }}>Удалить</Text>
                    </Pressable>
                  )}
                </View>
                <View>
                  <Pressable
                    style={{ width: imageWidth, height: imageHeight }}
                    onPress={() => handleChooseBanner(2)}
                  >
                    {watchBanners?.[2] ? (
                      <Image style={styles.bannerImg} source={watchBanners[2]} />
                    ) : (
                      <View style={styles.emptyBanner}>
                        <PhotoIcon />
                      </View>
                    )}
                  </Pressable>
                  {watchBanners[2] && (
                    <Pressable
                      style={{ marginTop: 6, alignItems: "center", justifyContent: "center" }}
                      onPress={() => onDelete(watchBanners[2])}
                    >
                      <Text style={{ color: theme.destructive }}>Удалить</Text>
                    </Pressable>
                  )}
                </View>
                <View>
                  <Pressable
                    style={{ width: imageWidth, height: imageHeight }}
                    onPress={() => handleChooseBanner(3)}
                  >
                    {watchBanners?.[3] ? (
                      <Image style={styles.bannerImg} source={watchBanners[3]} />
                    ) : (
                      <View style={styles.emptyBanner}>
                        <PhotoIcon />
                      </View>
                    )}
                  </Pressable>
                  {watchBanners[3] && (
                    <Pressable
                      style={{ marginTop: 6, alignItems: "center", justifyContent: "center" }}
                      onPress={() => onDelete(watchBanners[3])}
                    >
                      <Text style={{ color: theme.destructive }}>Удалить</Text>
                    </Pressable>
                  )}
                </View>
              </ScrollView>
            </View>
          )
        }}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  avatarBlock: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  avatarImg: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  emptyAvatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  banner: {
    borderRadius: theme.radius,
  },
  bannerImg: {
    width: "100%",
    height: "100%",
    borderRadius: theme.radius,
  },
  emptyBanner: {
    width: "100%",
    height: "100%",
    borderRadius: theme.radius,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.border,
  },
})
