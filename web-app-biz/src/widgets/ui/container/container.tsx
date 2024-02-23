import { HTMLAttributes } from "react";

import { cn } from "shared/libs/utils";
import { HeaderPage } from "shared/ui";

import styles from "./styles.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  header?: React.ComponentProps<typeof HeaderPage>;
}

export const Container = ({ children, className, header, ...props }: Props) => {
  return (
    <div
      className={cn(styles.container, { "pt-0": header, "pt-5": !header }, className)}
      {...props}
    >
      {header && <HeaderPage {...header} />}
      {children}
    </div>
  );
};
