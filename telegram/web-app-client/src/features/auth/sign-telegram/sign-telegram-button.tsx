import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { loginTelegram } from "entities/auth/api";
import { useAuthStore } from "entities/auth/model/store";

import { saveAuthToken } from "shared/libs/ls";

import styles from "./styles.module.css";

interface Props {
  onSuccess: () => void;
}

export const SignTelegramButton = ({ onSuccess }: Props) => {
  const navigate = useNavigate();
  const setIsAuth = useAuthStore((state) => state.setIsAuth);

  const mutation = useMutation({
    mutationFn: loginTelegram,
  });

  const handleTgLogin = async () => {
    mutation.mutate(Telegram.WebApp.initData, {
      onSuccess: ({ data }) => {
        saveAuthToken(data);
        setIsAuth(true);
        navigate("/profile");
      },
      onError: () => {
        Telegram.WebApp.requestContact((toggle) => {
          if (toggle) {
            onSuccess();
          }
        });
      },
    });
  };

  return (
    <>
      <span className={styles.help}>Войдите через телеграм для интеграции с нашим сервисом</span>
      <button type="button" className={styles.btnTg} onClick={handleTgLogin}>
        Войти через телеграм
      </button>
    </>
  );
};
