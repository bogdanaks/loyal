import styles from "./styles.module.css";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const ShopsGroup = ({ title, children }: Props) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <span className={styles.groupName}>{title}</span>
      <ul className={styles.list}>{children}</ul>
    </div>
  );
};
