import styles from "./styles.module.css";

export const ShopBigAvatar = () => {
  return (
    <div className={styles.avatar}>
      <div className={styles.border}>
        <div className={styles.avatarInner}>
          <img src="/empty.png" width={160} height={160} />
        </div>
      </div>
    </div>
  );
};
