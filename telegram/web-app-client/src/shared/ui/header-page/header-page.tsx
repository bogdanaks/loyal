import { useNavigate } from "react-router-dom";

import CaretIcon from "shared/assets/icons/caret-right.svg?react";

import styles from "./styles.module.css";

interface Props {
  withBack?: boolean;
  title: string;
}

export const HeaderPage = ({ title, withBack = false }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      {withBack && (
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <CaretIcon width={28} height={28} />
        </button>
      )}
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};
