import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Imask from "imask"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import * as z from "zod"

import { updateShop } from "entities/shop/api"
import { useShopStore } from "entities/shop/model/store"

import { phoneMask } from "shared/config/masks"
import { showError, showSuccess } from "shared/libs/toast-utils"
import { Button } from "shared/ui/button"
import { InputField, InputImaskField } from "shared/ui/form-fields"

const formSchema = z.object({
  phone: z.string().min(10, { message: "Неверный формат" }).optional(),
  address: z.string().max(100, { message: "Максимум 100 символов." }).optional(),
})
type FormFields = z.infer<typeof formSchema>

export const BusinessSettingsContacts = () => {
  const shop = useShopStore((state) => state.shop)
  const queryClient = useQueryClient()

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: shop?.phone ?? "",
      address: shop?.address ?? "",
    },
  })

  const { mutate, isPending } = useMutation<
    BaseResponse<Shop>,
    ResponseError,
    Partial<Shop>,
    unknown
  >({
    mutationFn: updateShop,
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
    if (shop?.phone) {
      const mask = Imask.createMask(phoneMask)
      mask.resolve(String(shop.phone))
      form.setValue("phone", mask.unmaskedValue)
    }
  }, [shop])

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
        name="phone"
        render={({ field, fieldState: { error } }) => (
          <InputImaskField
            label="Номер телефона"
            placeholder="+7 (000) 000-00-00"
            value={field.value}
            inputMode="tel"
            keyboardType="phone-pad"
            onChangeText={(_, um) => {
              field.onChange(um)
            }}
            error={error?.message}
            opts={phoneMask}
          />
        )}
      />
      <Controller
        control={form.control}
        name="address"
        render={({ field, fieldState: { error } }) => (
          <InputField
            label="Адрес"
            value={field.value}
            keyboardType="default"
            onChangeText={field.onChange}
            error={error?.message}
          />
        )}
      />
      <Button
        onPress={() => form.handleSubmit(onSubmit)()}
        disabled={isPending}
        style={{ marginTop: "auto" }}
      >
        Сохранить
      </Button>
    </KeyboardAwareScrollView>
  )
}
