import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { IMaskInput } from "react-imask"
import { toast } from "sonner"
import { useDebounceValue } from "usehooks-ts"
import * as z from "zod"

import { getAddressSuggestion } from "entities/dadata/api"
import { updateShop } from "entities/shop/api"
import { useShopStore } from "entities/shop/model/store"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui/form"
import { Input } from "shared/ui/input"
import { TelegramButton } from "shared/ui/telegram-button"

const formSchema = z.object({
  phone: z.string().min(10, { message: "Неверный формат" }).optional(),
  address: z.string().max(100, { message: "Максимум 100 символов." }).optional(),
})

type FormFields = z.infer<typeof formSchema>

interface Props {
  shop: Shop
}

export const BusinessSettingsContacts = ({ shop }: Props) => {
  const [isVisibleSuggestion, setIsVisibleSuggestion] = useState(false)
  const setShop = useShopStore((state) => state.setShop)

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: shop?.phone ?? "",
      address: shop?.address ?? "",
    },
  })

  const watchAddress = form.watch("address")
  const [debouncedValue] = useDebounceValue<string>(watchAddress ?? "", 1000)
  const { data, refetch } = useQuery({
    queryKey: ["address-suggest", debouncedValue],
    queryFn: () => getAddressSuggestion(debouncedValue ?? ""),
    enabled: !!debouncedValue,
  })
  const { mutate } = useMutation<BaseResponse<Shop>, ResponseError, Partial<Shop>, unknown>({
    mutationFn: updateShop,
  })

  const onSubmit = (data: FormFields) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Успешно сохранено!")
        setShop({ ...shop, ...data })
      },
      onError: () => {
        toast.error("Ошибка. Обратитесь в поддержку")
      },
    })
  }

  useEffect(() => {
    if (debouncedValue?.length) {
      refetch()
    }
  }, [debouncedValue])

  return (
    <Form {...form}>
      <form className="flex flex-col w-full gap-3 h-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <IMaskInput
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  mask="+7 (000) 000-00-00"
                  value={field.value}
                  unmask={true}
                  name="phone"
                  inputMode="numeric"
                  onAccept={(value) => {
                    field.onChange(value)
                  }}
                  placeholder="+7 (000) 000-00-00"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Адрес</FormLabel>
              <FormControl>
                <div className="flex flex-col relative">
                  <Input
                    placeholder="Адрес"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value)
                      setIsVisibleSuggestion(true)
                      if (!e.target.value) {
                        setIsVisibleSuggestion(false)
                      }
                    }}
                  />
                  {data &&
                    data.suggestions.length &&
                    watchAddress?.length &&
                    isVisibleSuggestion && (
                      <ul className="rounded-md border bg-popover text-popover-foreground shadow-md p-1">
                        {data.suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="w-full rounded-sm text-sm hover:bg-accent hover:text-accent-foreground py-1.5 px-2 cursor-pointer"
                            onClick={() => {
                              field.onChange(suggestion.value)
                              setIsVisibleSuggestion(false)
                            }}
                          >
                            {suggestion.value}
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <TelegramButton
          type="submit"
          className="w-fit mt-auto"
          text="Сохранить"
          onClick={() => form.handleSubmit(onSubmit)()}
        >
          Сохранить
        </TelegramButton>
      </form>
    </Form>
  )
}
