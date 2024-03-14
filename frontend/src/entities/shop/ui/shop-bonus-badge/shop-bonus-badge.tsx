import styles from "./styles.module.css"

interface Props {
  icon: React.ReactNode
  text: string
}

export const ShopBonusBadge = ({ icon, text }: Props) => {
  return (
    <div className={styles.infoBonus}>
      <button className={styles.icon}>{icon}</button>
      <button className={styles.badge}>{text}</button>
    </div>
  )
}
