import styles from "./styles.module.css"

export const ShopBigAvatar = ({ src }: { src: string }) => {
  return (
    <div className={styles.avatar}>
      <div className={styles.border}>
        <div className={styles.avatarInner}>
          <img src={src} width={160} height={160} />
        </div>
      </div>
    </div>
  )
}
