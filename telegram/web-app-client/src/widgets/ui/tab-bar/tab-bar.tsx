import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";

import QrIcon from "shared/assets/icons/qr-code.svg?react";
import ShopIcon from "shared/assets/icons/shop-bag.svg?react";
import UsersIcon from "shared/assets/icons/users.svg?react";

import styles from "./styles.module.css";

export const TabBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className={styles.wrapper}>
      <li
        className={classNames(styles.tab, { [styles.active]: pathname.includes("shops") })}
        onClick={() => navigate("/shops")}
      >
        <span className={styles.tabIcon}>
          <ShopIcon width={24} height={24} />
        </span>
        <span className={styles.tabTitle}>Мои заведения</span>
      </li>
      <li
        className={classNames(styles.tab, { [styles.active]: pathname.includes("qr") })}
        onClick={() => navigate("/qr")}
      >
        <span className={styles.tabIcon}>
          <QrIcon width={24} height={24} />
        </span>
        <span className={styles.tabTitle}>QR-код</span>
      </li>
      <li
        className={classNames(styles.tab, { [styles.active]: pathname.includes("profile") })}
        onClick={() => navigate("/profile")}
      >
        <span className={styles.tabIcon}>
          <UsersIcon width={24} height={24} />
        </span>
        <span className={styles.tabTitle}>Профиль</span>
      </li>
    </nav>
  );
};
