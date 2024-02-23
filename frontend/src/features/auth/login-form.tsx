import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

import { accountLogin } from "entities/auth/api"
import { useAuthStore } from "entities/auth/model/store"

import { saveAuthToken } from "shared/libs/ls"
import { Button } from "shared/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "shared/ui/form"
import { Input } from "shared/ui/input"

const formSchema = z.object({
  email: z
    .string({ required_error: "Обязательное поле." })
    .email({ message: "Некорректный email." }),
  password: z
    .string({ required_error: "Обязательное поле." })
    .min(6, { message: "Минимум 6 символов." })
    .max(100, { message: "Максимум 100 символов." }),
})

type FormFields = z.infer<typeof formSchema>
export const LoginForm = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  })
  const { mutate } = useMutation<BaseResponse<string>, ResponseError, LoginData, unknown>({
    mutationFn: accountLogin,
  })
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  const onSubmit = (data: FormFields) => {
    mutate(data, {
      onSuccess: ({ data }) => {
        saveAuthToken(data)
        setIsAuth(true)
        if (searchParams.get("next")) {
          return navigate(searchParams.get("next")!)
        }
        navigate("/dashboard")
      },
      onError: (error) => {
        if (error?.payload?.message === "Incorrect data") {
          toast.error("Неверные данные. Повторите попытку")
          return
        }
        toast.error("Ошибка. Обратитесь в поддержку")
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Почта</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input placeholder="••••••" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full mt-4" type="submit">
          Войти
        </Button>
      </form>
    </Form>
  )
}
