import { useMutation } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { sendFeedback } from "entities/help/api";

import styles from "./styles.module.css";

export const SendFeedback = () => {
  const form = useForm<{ message: string }>();
  const mutation = useMutation({
    mutationFn: sendFeedback,
  });

  const onSubmit: SubmitHandler<{ message: string }> = (data) => {
    mutation.mutate(data.message, {
      onSuccess: () => {},
    });
  };

  return (
    <form className={styles.wrapper} onSubmit={form.handleSubmit(onSubmit)}>
      <p style={{ marginTop: 24, fontSize: 14 }}>
        Если вы столкнулись с проблемой или у Вас есть предложения по улучшению приложения, напишите
        нам!
      </p>
      <Controller
        name="message"
        control={form.control}
        rules={{ required: { message: "Обязательное поле", value: true } }}
        render={({ field }) => (
          <textarea
            className={styles.textArea}
            rows={6}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <button className={styles.btnSend}>Отправить</button>
    </form>
  );
};
