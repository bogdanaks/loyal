import { DetailedHTMLProps, HTMLAttributes } from "react";

import { cn } from "shared/libs/utils";

import styles from "./styles.module.css";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  children: React.ReactNode;
}

export const TitlePage = ({ children, className, ...props }: Props) => {
  return (
    <h1 className={cn(styles.title, className)} {...props}>
      {children}
    </h1>
  );
};
