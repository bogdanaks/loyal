import { IMaskInput } from "react-imask";

import styles from "./styles.module.css";

interface Props {
  error?: string;
  value?: string;
  label: string;
  onChange: (value: string) => void;
}

export const BirthdayField = ({ label, error, value, onChange }: Props) => {
  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>
      <IMaskInput
        mask={Date}
        unmask={true}
        inputMode="numeric"
        placeholder="31.12.1998"
        value={value}
        onAccept={onChange}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
