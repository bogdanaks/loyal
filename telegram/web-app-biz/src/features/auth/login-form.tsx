import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

import { LoginData, loginBiz } from "entities/auth/api";
import { useAuthStore } from "entities/auth/model/store";

import { saveAuthToken } from "shared/libs/ls";
import { InputField } from "shared/ui";
import { Button } from "shared/ui/button";

const formSchema = z.object({
  email: z
    .string({ required_error: "Обязательное поле." })
    .email({ message: "Некорректный email" }),
  password: z
    .string({ required_error: "Обязательное поле." })
    .min(6, { message: "Минимум 6 символов" })
    .max(100),
});

export const LoginForm = () => {
  const [searchParams] = useSearchParams();
  const form = useForm<LoginData>({
    resolver: zodResolver(formSchema),
  });
  const { mutate, isError, error } = useMutation<
    BaseResponse<string>,
    ServerError,
    LoginData,
    unknown
  >({
    mutationFn: loginBiz,
  });
  const navigate = useNavigate();
  const setIsAuth = useAuthStore((state) => state.setIsAuth);

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    mutate(data, {
      onSuccess: ({ data }) => {
        saveAuthToken(data);
        setIsAuth(true);
        if (searchParams.get("next")) {
          return navigate(searchParams.get("next")!);
        }
        navigate("/account");
      },
      onError: () => {
        toast.error("Ошибка. Обратитесь в поддержку");
      },
    });
  };

  useEffect(() => {
    Telegram.WebApp.MainButton.setParams({
      text: "Войти",
      is_visible: true,
      is_active: true,
      text_color: "#fcfcfc",
      color: "#4c38ff",
    });

    Telegram.WebApp.MainButton.onClick(() => form.handleSubmit(onSubmit)());

    return () => {
      Telegram.WebApp.MainButton.hide();
    };
  }, []);

  return (
    <form className="w-full gap-5 flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={form.control}
        rules={{ required: { message: "Обязательное поле", value: true } }}
        render={({ field, fieldState: { error } }) => (
          <InputField
            placeholder="example@mail.ru"
            value={field.value}
            onChange={field.onChange}
            label="E-mail"
            error={error?.message}
            required
            type="email"
            autoComplete="email"
          />
        )}
      />
      <Controller
        name="password"
        control={form.control}
        rules={{ required: { message: "Обязательное поле", value: true } }}
        render={({ field, fieldState: { error } }) => (
          <InputField
            value={field.value}
            onChange={field.onChange}
            label="Пароль"
            type="password"
            error={error?.message}
            required
          />
        )}
      />
      {isError && <p className="text-red-500">{error.message}</p>}
      {!Telegram.WebApp.initData && <Button type="submit">Войти</Button>}
    </form>
  );
};
