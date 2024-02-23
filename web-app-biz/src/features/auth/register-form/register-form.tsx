import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

import { RegisterData, registerBiz } from "entities/auth/api";
import { useAuthStore } from "entities/auth/model/store";

import { disabledButtonParams } from "shared/config/tg-buttons";
import { saveAuthToken } from "shared/libs/ls";

import { RegisterFormStep1 } from "./register-form-step-1";
import { RegisterFormStep2 } from "./register-form-step-2";

const formSchema = z.object({
  biz_type: z.number({ required_error: "Обязательное поле." }),
  biz_name: z
    .string({ required_error: "Обязательное поле." })
    .min(3, { message: "Минимум 3 символа" })
    .max(25, { message: "Максимум 25 символов" }),
  name: z
    .string({ required_error: "Обязательное поле." })
    .min(3, { message: "Минимум 3 символа" })
    .max(25),
  phone: z
    .string({ required_error: "Обязательное поле." })
    .min(10, { message: "Обязательное поле." }),
  email: z
    .string({ required_error: "Обязательное поле." })
    .email({ message: "Некорректный email" }),
  password: z
    .string({ required_error: "Обязательное поле." })
    .min(6, { message: "Минимум 6 символов" })
    .max(100),
});

export const RegisterForm = () => {
  const [once, setOnce] = useState(false);
  const [stepForm, setStepForm] = useState(1);
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<RegisterData>({
    resolver: zodResolver(formSchema),
  });
  const mutation = useMutation({
    mutationFn: registerBiz,
    retry: false,
  });
  const navigate = useNavigate();
  const setIsAuth = useAuthStore((state) => state.setIsAuth);

  const onSubmit: SubmitHandler<RegisterData> = (data) => {
    mutation.mutate(data, {
      onSuccess: ({ data }) => {
        saveAuthToken(data);
        setIsAuth(true);
        navigate("/account");
      },
      onError: () => {
        toast.error("Ошибка. Обратитесь в поддержку");
      },
    });
  };

  const handleStep2 = useCallback(() => {
    Telegram.WebApp.MainButton.offClick(handleStep2);
    setStepForm(2);
  }, []);

  const submitterForm = useCallback(() => {
    form.handleSubmit(onSubmit)();
  }, []);

  useEffect(() => {
    if (stepForm === 2 && !once) {
      setOnce(true);
      Telegram.WebApp.MainButton.onClick(submitterForm);
    }
  }, [stepForm, once]);

  useEffect(() => {
    Telegram.WebApp.MainButton.setParams(disabledButtonParams("Зарегистрироваться"));
    Telegram.WebApp.MainButton.onClick(handleStep2);

    return () => {
      Telegram.WebApp.MainButton.offClick(handleStep2);
      Telegram.WebApp.MainButton.offClick(handleStep2);
      Telegram.WebApp.MainButton.hide();
    };
  }, []);

  return (
    <form
      className="w-full gap-5 flex flex-col"
      onSubmit={form.handleSubmit(onSubmit)}
      ref={formRef}
    >
      <div className="bg-background flex items-start justify-center w-full py-5">
        <h1 className="text-left text-4xl w-full font-medium">Регистрация</h1>
      </div>
      {stepForm === 1 && <RegisterFormStep1 form={form} />}
      {stepForm === 2 && <RegisterFormStep2 form={form} />}
    </form>
  );
};
