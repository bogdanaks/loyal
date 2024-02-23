import { PiCheckBold, PiXBold } from "react-icons/pi";

import styles from "./styles.module.css";

interface Props {
  onClose: () => void;
  onAccept: () => void;
}

export const Header = ({ onAccept, onClose }: Props) => {
  return (
    <div className={styles.header}>
      <button onClick={onClose} type="button">
        <PiXBold />
      </button>
      <button onClick={onAccept} type="button">
        <PiCheckBold />
      </button>
    </div>
  );
};
