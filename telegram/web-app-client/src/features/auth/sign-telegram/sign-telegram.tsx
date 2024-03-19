import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerTelegram } from "entities/auth/api";
import { useAuthStore } from "entities/auth/model/store";

import { saveAuthToken } from "shared/libs/ls";

import { SignTelegramButton } from "./sign-telegram-button";
import { SignTelegramWriteUserData } from "./sign-telegram-write-user-data";

type Steps = "sign-tg" | "write-data";

export const SignTelegram = () => {
  const [step, setStep] = useState<Steps>("sign-tg");
  const navigate = useNavigate();
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const mutation = useMutation({
    mutationFn: registerTelegram,
    retry: false,
  });

  const handleSubmit = (data: { name: string; birthday: string }) => {
    const tgUser = Telegram.WebApp.initDataUnsafe.user;
    if (!tgUser) {
      return;
    }

    mutation.mutate(
      {
        tg_user_id: tgUser.id,
        tg_username: tgUser.username,
        first_name: data.name,
        last_name: tgUser.last_name,
        birthday: data.birthday,
        initData: Telegram.WebApp.initData,
      },
      {
        onSuccess: ({ data }) => {
          saveAuthToken(data);
          setIsAuth(true);
          navigate("/profile");
        },
        onError: (err) => {
          console.log("save error", err);
        },
      }
    );
  };

  return (
    <>
      {step === "sign-tg" && <SignTelegramButton onSuccess={() => setStep("write-data")} />}
      {step === "write-data" && <SignTelegramWriteUserData onSuccess={handleSubmit} />}
    </>
  );
};
