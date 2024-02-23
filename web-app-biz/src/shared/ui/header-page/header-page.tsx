import { useNavigate } from "react-router-dom";

import CaretIcon from "shared/assets/icons/caret-right.svg?react";
import MoreIcon from "shared/assets/icons/more.svg?react";

import { DropdownMenu, DropdownMenuTrigger } from "../dropdown-menu";
import styles from "./styles.module.css";

interface Props {
  withBack?: boolean;
  title?: string;
  moreMenu?: React.ReactNode;
}

export const HeaderPage = ({ title, moreMenu, withBack = false }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      {withBack && (
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <CaretIcon width={28} height={28} />
        </button>
      )}
      {title && <h2 className={styles.title}>{title}</h2>}
      {moreMenu && (
        <DropdownMenu>
          <DropdownMenuTrigger className="absolute right-0">
            <MoreIcon width={28} height={28} />
          </DropdownMenuTrigger>
          {moreMenu}
        </DropdownMenu>
      )}
    </div>
  );
};
