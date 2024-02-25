import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { getShopStatuses, getShopTypes, updateShop } from "entities/shop/api"
import { useShopStore } from "entities/shop/model/store"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui/form"
import { Input } from "shared/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "shared/ui/select"
import { TelegramButton } from "shared/ui/telegram-button"
import { Textarea } from "shared/ui/textarea"

const formSchema = z.object({
  title: z
    .string({ required_error: "Обязательное поле." })
    .min(3, { message: "Минимум 3 символа." })
    .max(25, { message: "Максимум 25 символов." }),
  type_id: z.number({
    required_error: "Обязательное поле.",
    invalid_type_error: "Обязательное поле.",
  }),
  status_id: z.number({
    required_error: "Обязательное поле.",
    invalid_type_error: "Обязательное поле.",
  }),
  short_description: z.string().max(40, { message: "Максимум 40 символов." }),
  description: z.string().max(100, { message: "Максимум 100 символов." }),
})

type FormFields = z.infer<typeof formSchema>

interface Props {
  shop: Shop
}

export const BusinessSettingsData = ({ shop }: Props) => {
  const setShop = useShopStore((state) => state.setShop)

  const { data: shopStatuses } = useQuery({
    queryKey: ["shop-statuses"],
    queryFn: getShopStatuses,
    retry: 1,
  })
  const { data: shopTypes } = useQuery({
    queryKey: ["shop-types"],
    queryFn: getShopTypes,
    retry: 1,
  })
  const { mutate } = useMutation<BaseResponse<Shop>, ResponseError, Partial<Shop>, unknown>({
    mutationFn: updateShop,
  })

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: shop.title ?? "",
      type_id: shop.type_id,
      status_id: shop.status_id,
      short_description: shop.short_description ?? "",
      description: shop.description ?? "",
    },
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

  return (
    <Form {...form}>
      <form className="flex flex-col w-full gap-3 h-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="Название" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тип бизнеса</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(val) => field.onChange(Number(val))}
                  defaultValue={field?.value?.toString()}
                  value={field?.value?.toString()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={field.value?.toString()} />
                  </SelectTrigger>
                  <SelectContent>
                    {shopTypes?.data.map((type) => (
                      <SelectItem key={type.id} value={type.id.toString()}>
                        {type.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Текущий статус</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(val) => field.onChange(Number(val))}
                  defaultValue={field?.value?.toString()}
                  value={field?.value?.toString()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={field.value?.toString()} />
                  </SelectTrigger>
                  <SelectContent>
                    {shopStatuses?.data.map((status) => (
                      <SelectItem key={status.id.toString()} value={status.id.toString()}>
                        {status.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="short_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Короткое описание</FormLabel>
              <FormControl>
                <Textarea placeholder="Короткое описание" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Полное описание</FormLabel>
              <FormControl>
                <Textarea placeholder="Полное описание" {...field} />
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
