import { Check, X } from "lucide-react"

import styles from "./styles.module.css"

interface Props {
  onClose: () => void
  onAccept: () => void
}

export const Header = ({ onAccept, onClose }: Props) => {
  return (
    <div className={styles.header}>
      <button onClick={onClose} type="button">
        <X />
      </button>
      <button onClick={onAccept} type="button">
        <Check />
      </button>
    </div>
  )
}
