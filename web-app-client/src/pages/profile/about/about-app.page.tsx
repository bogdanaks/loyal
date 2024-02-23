import { Link } from "react-router-dom";

import { config } from "shared/config";
import { HeaderPage } from "shared/ui";

import styles from "./styles.module.css";

export const AboutAppPage = () => {
  return (
    <div className="flex flex-col grow px-4 pt-2">
      <HeaderPage title="О приложении" withBack />
      <div className={styles.photo}>
        <img src="/empty.png" alt="Logo" width={100} height={100} />
      </div>
      <p className={styles.version}>Версия: {config.appVersion}</p>
      <ul className={styles.links}>
        <Link className={styles.link} to="/user-agreement">
          Пользовательское соглашение
        </Link>
        <Link className={styles.link} to="/privacy-policy">
          Политика конфиденциальности
        </Link>
      </ul>
    </div>
  );
};
