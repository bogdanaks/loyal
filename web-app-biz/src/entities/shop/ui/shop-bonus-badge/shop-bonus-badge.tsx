import styles from "./styles.module.css";

export const ShopBonusBadge = () => {
  return (
    <div className={styles.infoBonus}>
      <button className={styles.badge}>от 10%</button>
      <button className={styles.badge}>110</button>
    </div>
  );
};
