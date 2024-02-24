import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { IMaskInput } from "react-imask"
import { toast } from "sonner"
import * as z from "zod"

import { updateAccount } from "entities/account/api"
import { useAccountStore } from "entities/account/model/store"

import { Button } from "shared/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui/form"
import { Input } from "shared/ui/input"

const formSchema = z.object({
  name: z
    .string({ required_error: "Обязательное поле." })
    .min(3, { message: "Минимум 3 символа." })
    .max(25, { message: "Максимум 25 символов." }),
  phone: z.string({ required_error: "Обязательное поле." }).min(10, { message: "Неверный формат" }),
  email: z.string({ required_error: "Обязательное поле." }).email({ message: "Неверный формат." }),
})
type FormFields = z.infer<typeof formSchema>

interface Props {
  account: Account
}

export const EditAccountData = ({ account }: Props) => {
  const setAccount = useAccountStore((state) => state.setAccount)

  const { mutate } = useMutation({
    mutationFn: updateAccount,
  })

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: account?.email ?? "",
      name: account?.name ?? "",
      phone: account?.phone ?? "",
    },
  })

  const onSubmit = (data: FormFields) => {
    if (!account) {
      return
    }

    mutate(data, {
      onSuccess: () => {
        toast.success("Сохранено")
        setAccount({ ...account, name: data.name, phone: data.phone, email: data.email })
      },
      onError: () => {
        toast.error("Ошибка. Обратитесь в поддержку")
      },
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex bg-background flex-col w-full gap-3 h-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваше имя</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ваше имя" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <IMaskInput
                  className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Почта</FormLabel>
              <FormControl>
                <Input {...field} placeholder="example@mail.ru" type="email" autoComplete="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-fit mt-auto">
          Сохранить
        </Button>
      </form>
    </Form>
  )
}
