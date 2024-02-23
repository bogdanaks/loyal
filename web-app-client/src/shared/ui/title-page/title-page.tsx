import { DetailedHTMLProps, HTMLAttributes } from "react";

import styles from "./styles.module.css";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  children: React.ReactNode;
}

export const TitlePage = ({ children, ...props }: Props) => {
  return (
    <h1 className={styles.title} {...props}>
      {children}
    </h1>
  );
};
