import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useGlobalSearchParams } from "expo-router"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import * as z from "zod"

import { getShopStatuses, updateShop } from "entities/shop/api"
import { useShopStore } from "entities/shop/model/store"

import { CheckIcon } from "shared/assets/icons/check-icon"
import { ChevronRightIcon } from "shared/assets/icons/chevron-right-icon"
import { theme } from "shared/config/theme"
import { showError, showSuccess } from "shared/libs/toast-utils"
import { Button } from "shared/ui/button"
import { InputField } from "shared/ui/form-fields"

const typeScheme: z.ZodType<ShopType> = z.object({
  id: z.number(),
  title: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})

const formSchema = z.object({
  title: z
    .string({ required_error: "Обязательное поле." })
    .min(3, { message: "Минимум 3 символа." })
    .max(25, { message: "Максимум 25 символов." }),
  type: typeScheme,
  status_id: z.number({
    required_error: "Обязательное поле.",
    invalid_type_error: "Обязательное поле.",
  }),
  short_description: z.string().max(100, { message: "Максимум 100 символов." }),
  description: z.string().max(500, { message: "Максимум 500 символов." }),
})
type FormFields = z.infer<typeof formSchema>

export const BusinessSettingsData = () => {
  const shop = useShopStore((state) => state.shop)
  const queryClient = useQueryClient()
  const params = useGlobalSearchParams<{ shopType: string }>()

  const { data: shopStatuses } = useQuery({
    queryKey: ["shop-statuses"],
    queryFn: getShopStatuses,
    retry: 1,
  })

  const { mutate, isPending } = useMutation<
    BaseResponse<Shop>,
    ResponseError,
    Partial<Shop>,
    unknown
  >({
    mutationFn: updateShop,
  })

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: shop?.title ?? "",
      type: shop?.type,
      status_id: shop?.status_id,
      short_description: shop?.short_description ?? "",
      description: shop?.description ?? "",
    },
  })

  const onSubmit = (data: FormFields) => {
    mutate(data, {
      onSuccess: () => {
        showSuccess()
        queryClient.invalidateQueries({ queryKey: ["my-shop"] })
      },
      onError: () => {
        showError()
      },
    })
  }

  useEffect(() => {
    if (params.shopType) {
      form.setValue("type", JSON.parse(params.shopType))
    }
  }, [params])

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
        flexGrow: 1,
      }}
    >
      <Controller
        control={form.control}
        name="title"
        render={({ field, fieldState: { error } }) => (
          <InputField
            label="Название"
            value={field.value}
            keyboardType="default"
            onChangeText={field.onChange}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="type"
        render={({ field, fieldState: { error } }) => (
          <View>
            <Text style={{ fontSize: 14, color: theme.mutedForeground, marginBottom: 4 }}>
              Тип бизнеса
            </Text>
            <Link href={`/my-business-modal?select=${field.value.id}`} asChild>
              <Pressable>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: theme.radius,
                    borderColor: theme.input,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    paddingHorizontal: 16,
                  }}
                >
                  <Text>
                    {field.value?.title ?? (
                      <Text style={{ color: theme.mutedForeground }}>Выбор типа бизнеса</Text>
                    )}
                  </Text>
                  <ChevronRightIcon color={theme.slate600} />
                </View>
              </Pressable>
            </Link>
            {error && (
              <Text style={{ marginTop: 4, color: theme.destructive, fontSize: 14 }}>
                {error?.message}
              </Text>
            )}
          </View>
        )}
      />
      <Controller
        control={form.control}
        name="status_id"
        render={({ field, fieldState: { error } }) => (
          <View>
            <Text style={{ fontSize: 14, color: theme.mutedForeground, marginBottom: 4 }}>
              Текущий статус
            </Text>
            <View style={styles.selectView}>
              {shopStatuses?.data.map((shopStatus, index) => (
                <Pressable
                  key={shopStatus.id}
                  style={[styles.selectBtn, { borderTopWidth: index === 0 ? 0 : 1 }]}
                  onPress={() => field.onChange(shopStatus.id)}
                >
                  <Text
                    style={{
                      color:
                        field.value === shopStatus.id
                          ? theme.accentForeground
                          : theme.mutedForeground,
                    }}
                  >
                    {shopStatus.title}
                  </Text>
                  <CheckIcon opacity={field.value === shopStatus.id ? 1 : 0} />
                </Pressable>
              ))}
            </View>
            {error && (
              <Text style={{ marginTop: 4, color: theme.destructive, fontSize: 14 }}>
                {error?.message}
              </Text>
            )}
          </View>
        )}
      />
      <Controller
        control={form.control}
        name="short_description"
        render={({ field, fieldState: { error } }) => (
          <InputField
            label="Короткое описание"
            value={field.value}
            style={{ height: 80 }}
            keyboardType="default"
            multiline={true}
            numberOfLines={2}
            onChangeText={field.onChange}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="description"
        render={({ field, fieldState: { error } }) => (
          <InputField
            label="Полное описание"
            value={field.value}
            style={{ height: 140 }}
            keyboardType="default"
            multiline={true}
            numberOfLines={6}
            onChangeText={field.onChange}
            error={error?.message}
          />
        )}
      />
      <Button
        onPress={() => form.handleSubmit(onSubmit)()}
        disabled={isPending}
        style={{ marginTop: 24 }}
      >
        Сохранить
      </Button>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  selectView: {
    flexDirection: "column",
    backgroundColor: theme.primaryForeground,
    borderRadius: theme.radius,
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  selectBtn: {
    width: "100%",
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopColor: theme.border,
    borderTopWidth: 1,
  },
})
