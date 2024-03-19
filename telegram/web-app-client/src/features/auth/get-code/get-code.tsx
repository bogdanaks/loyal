import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";

import { getLoginCode } from "entities/auth/api";

import styles from "./styles.module.css";

interface Props {
  onSuccess: (phone: string, code?: string) => void;
}

interface FormState {
  phone: string;
}

export const AuthGetCode = ({ onSuccess }: Props) => {
  const form = useForm<FormState>();
  const [isValid, setIsValid] = useState(false);
  const [isLoginFromTg, setIsLoginFromTg] = useState(false);
  const [tgPhone, setTgPhone] = useState("");

  const mutation = useMutation({
    mutationFn: getLoginCode,
  });

  console.log("user", Telegram.WebApp.initDataUnsafe);

  const handleTgLogin = () => {
    Telegram.WebApp.requestContact((toggle) => {
      console.log("toggle", toggle);
      setIsLoginFromTg(toggle);
      console.log("Telegram.WebApp.initDataUnsafe", Telegram.WebApp);
      // setTgPhone(Telegram.WebApp.initDataUnsafe.user.)
    });
  };

  const onSubmit: SubmitHandler<FormState> = ({ phone }) => {
    console.log("phone", phone);
    mutation.mutate(phone, {
      onError: (err) => {
        console.log("Err", err);
      },
      onSuccess: ({ data }) => {
        onSuccess(phone, data);
      },
    });
  };

  return (
    <>
      <h1 className={styles.title}>Вход</h1>
      <p className={styles.help}>
        Введите номер телефона, мы отправим вам код авторизации для входа
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="phone"
          control={form.control}
          render={({ field }) => (
            <IMaskInput
              className={styles.input}
              mask="+7 (000) 000-00-00"
              value={field.value}
              unmask={true}
              inputMode="numeric"
              onAccept={(value) => {
                setIsValid(false);
                field.onChange(value);
              }}
              onComplete={() => setIsValid(true)}
              placeholder="+7 (000) 000-00-00"
            />
          )}
        />
        <button type="button" className={styles.btnTg} onClick={handleTgLogin}>
          Войти через телеграм
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className={classNames(styles.btnCode, { [styles.inactive]: !isValid })}
        >
          Получить код
        </button>
      </form>
      <span className={styles.info}>
        Нажимая кнопку “Получить код”, вы принимаете условия <b>Политики конфиденциальности</b>
      </span>
    </>
  );
};
