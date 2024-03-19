import styles from "./styles.module.css";

interface Props {
  icon: React.ReactNode;
  text: string;
}

export const ShopBonusBadge = ({ icon, text }: Props) => {
  return (
    <div className={styles.infoBonus}>
      <span className={styles.icon}>{icon}</span>
      <button className={styles.badge}>{text}</button>
    </div>
  );
};
