import { useMutation } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";

import { checkLoginCode } from "entities/auth/api";
import { useAuthStore } from "entities/auth/model/store";

import styles from "./styles.module.css";

interface FormState {
  otp: string;
}

export const WriteCode = ({ phone, code }: { phone: string; code?: string }) => {
  const form = useForm<FormState>();
  const navigate = useNavigate();
  const setIsAuth = useAuthStore((state) => state.setIsAuth);

  const mutation = useMutation({
    mutationFn: checkLoginCode,
  });

  const onSubmit: SubmitHandler<FormState> = (data) => {
    mutation.mutate(
      { otp: data.otp, phone },
      {
        onSuccess: () => {
          setIsAuth(true);
          navigate("/profile");
        },
        onError: (err) => {
          console.log("Err", err);
        },
      }
    );
  };

  return (
    <div>
      <h1 className={styles.title}>Введите код</h1>
      <p className={styles.help}>Мы отправили код - {code} в смс на номер</p>
      <span className={styles.number}>+7-988-688-53-54</span>
      <form className={styles.blockCode}>
        <Controller
          name="otp"
          control={form.control}
          render={({ field }) => (
            <OTPInput
              value={field.value}
              onChange={(otp) => {
                field.onChange(otp);
                if (otp.length === 4) {
                  form.handleSubmit(onSubmit)();
                }
              }}
              inputType="number"
              numInputs={4}
              containerStyle={{ gap: 8 }}
              shouldAutoFocus
              renderInput={(props) => (
                <input {...props} className={styles.codeNum} type="number" pattern="[0-9]*" />
              )}
            />
          )}
        />
      </form>
      <div className={styles.sendAgain}>
        <span>Отправить код повторно через</span>
        <b>00:59</b>
      </div>
      {/* <div className={styles.sendAgain}>
        <b>Отправить код повторно</b>
      </div> */}
    </div>
  );
};
