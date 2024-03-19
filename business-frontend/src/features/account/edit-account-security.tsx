import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { updatePassword } from "entities/account/api"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui/form"
import { Input } from "shared/ui/input"
import { TelegramButton } from "shared/ui/telegram-button"

const formSchema = z
  .object({
    old_password: z
      .string({ required_error: "Обязательное поле." })
      .min(6, { message: "Минимум 6 символов." })
      .max(100, { message: "Максимум 100 символов." }),
    new_password: z
      .string({ required_error: "Обязательное поле." })
      .min(6, { message: "Минимум 6 символов." })
      .max(100, { message: "Максимум 100 символов." }),
    new_password_repeate: z
      .string({ required_error: "Обязательное поле." })
      .min(6, { message: "Минимум 6 символов." })
      .max(100, { message: "Максимум 100 символов." }),
  })
  .refine((data) => data.new_password === data.new_password_repeate, {
    message: "Пароль не совпадает",
    path: ["new_password_repeate"],
  })
type FormFields = z.infer<typeof formSchema>

export const EditAccountSecurity = () => {
  const { mutate } = useMutation<BaseResponse<string>, ResponseError, UpdatePasswordData, unknown>({
    mutationFn: updatePassword,
  })

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      new_password_repeate: "",
    },
  })

  const onSubmit = (data: FormFields) => {
    mutate(data, {
      onSuccess: () => {
        form.reset({
          new_password: "",
          new_password_repeate: "",
          old_password: "",
        })
        toast.success("Сохранено")
      },
      onError: (error) => {
        console.log("err", error)
        if (error.status === 400) {
          toast.error(error.payload.message)
          return
        }
        toast.error("Ошибка. Обратитесь в поддержку")
      },
    })
  }

  return (
    <Form {...form}>
      <form className="flex flex-col w-full gap-3 h-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="old_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Старый пароль</FormLabel>
              <FormControl>
                <Input placeholder="Старый пароль" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Новый пароль</FormLabel>
              <FormControl>
                <Input placeholder="Новый пароль" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="new_password_repeate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Повторите новый пароль</FormLabel>
              <FormControl>
                <Input placeholder="Повторите новый пароль" type="password" {...field} />
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
