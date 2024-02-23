import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";

import CaseIcon from "shared/assets/icons/case.svg?react";
import QrIcon from "shared/assets/icons/qr-code.svg?react";
import UsersIcon from "shared/assets/icons/users.svg?react";

import styles from "./styles.module.css";

export const TabBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className={styles.wrapper}>
      <li
        className={classNames(styles.tab, { [styles.active]: pathname.includes("clients") })}
        onClick={() => navigate("/clients")}
      >
        <span className={styles.tabIcon}>
          <UsersIcon width={24} height={24} />
        </span>
        <span className={styles.tabTitle}>Клиенты</span>
      </li>
      <li
        className={classNames(styles.tab, { [styles.active]: pathname.includes("qr-scanner") })}
        onClick={() => navigate("/qr-scanner")}
      >
        <span className={styles.tabIcon}>
          <QrIcon width={24} height={24} />
        </span>
        <span className={styles.tabTitle}>QR-код</span>
      </li>
      <li
        className={classNames(styles.tab, { [styles.active]: pathname.includes("account") })}
        onClick={() => navigate("/account")}
      >
        <span className={styles.tabIcon}>
          <CaseIcon width={24} height={24} />
        </span>
        <span className={styles.tabTitle}>Аккаунт</span>
      </li>
    </nav>
  );
};
