import { QrCode } from "lucide-react"

import styles from "./styles.module.css"

export const QrBox = () => {
  return (
    <div className={styles.box}>
      <QrCode size={80} style={{ strokeWidth: 3 }} />
    </div>
  )
}
