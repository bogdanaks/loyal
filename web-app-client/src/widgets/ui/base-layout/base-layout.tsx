import { Outlet } from "react-router-dom";

import { TabBar } from "../tab-bar/tab-bar";
import styles from "./styles.module.css";

export const BaseLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Outlet />
      <TabBar />
    </div>
  );
};
