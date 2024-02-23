import { Link } from "react-router-dom";

import { useUserStore } from "entities/user/model/store";
import { UserPhoto } from "entities/user/ui";

import CaretRightIcon from "shared/assets/icons/caret-right.svg?react";
import ChatIcon from "shared/assets/icons/chat.svg?react";
import EditIcon from "shared/assets/icons/edit.svg?react";
import QuestionIcon from "shared/assets/icons/question.svg?react";

import styles from "./styles.module.css";

export const ProfilePage = () => {
  const me = useUserStore((store) => store.me);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <UserPhoto />
        <h1>
          {me?.first_name} {me?.last_name}
        </h1>
        <Link to="/profile/edit" className={styles.edit}>
          <EditIcon />
        </Link>
      </div>
      <div className={styles.body}>
        <div className={styles.links}>
          <Link to="/feedback" className={styles.link}>
            <button className={styles.leftIcon}>
              <ChatIcon />
            </button>
            Обратная связь
            <button className={styles.moreBtn}>
              <CaretRightIcon style={{ fill: "rgba(60, 60, 67, 0.4)" }} />
            </button>
          </Link>
          <Link to="/about-app" className={styles.link}>
            <button className={styles.leftIcon}>
              <QuestionIcon />
            </button>
            О приложении
            <button className={styles.moreBtn}>
              <CaretRightIcon style={{ fill: "rgba(60, 60, 67, 0.4)" }} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
