import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";

import { activeButtonParams } from "shared/config/tg-buttons";
import { BirthdayField } from "shared/ui";
import { InputField } from "shared/ui/input-field";

import styles from "./styles.module.css";

export interface WriteTgData {
  user_id: string;
  name: string;
  birthday: string;
}

interface Props {
  onSuccess: (data: FormState) => void;
}

interface FormState {
  name: string;
  birthday: string;
}

const formSchema = z.object({
  name: z.string({ required_error: "Обязательное поле." }).min(3).max(25),
  birthday: z.string({ required_error: "Обязательное поле." }).min(3).max(25),
});

export const SignTelegramWriteUserData = ({ onSuccess }: Props) => {
  const form = useForm<FormState>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: Telegram.WebApp.initDataUnsafe.user?.first_name,
    },
  });

  const onSubmit: SubmitHandler<FormState> = (data) => {
    onSuccess(data);
  };

  const submitter = () => form.handleSubmit(onSubmit)();

  useEffect(() => {
    Telegram.WebApp.MainButton.setParams(activeButtonParams("Войти"));
    Telegram.WebApp.MainButton.onClick(submitter);

    return () => {
      Telegram.WebApp.MainButton.offClick(submitter);
      Telegram.WebApp.MainButton.hide();
    };
  }, []);

  return (
    <>
      <form className="mt-10 w-full flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={form.control}
          rules={{ required: { message: "Обязательное поле", value: true } }}
          render={({ field, fieldState: { error } }) => (
            <InputField
              placeholder="Богдан"
              value={field.value}
              onChange={field.onChange}
              label="Имя"
              error={error?.message}
            />
          )}
        />
        <Controller
          name="birthday"
          control={form.control}
          rules={{ required: { message: "Обязательное поле", value: true } }}
          render={({ field, fieldState: { error } }) => (
            <BirthdayField
              label="Дата рождения"
              value={field.value}
              onChange={field.onChange}
              error={error?.message}
            />
          )}
        />
      </form>
      <span className={styles.info}>
        Нажимая кнопку “Войти”, вы принимаете условия{" "}
        <b>
          <Link className={styles.link} to="/privacy-policy">
            Политики конфиденциальности
          </Link>
        </b>
      </span>
    </>
  );
};
