import styles from "./styles.module.css";

export const ShopWorkTimeDrawer = () => {
  return (
    <div className={styles.wrapper}>
      <h3>Режим работы</h3>
      <ul className={styles.list}>
        <li className={styles.item}>
          <span>Понедельник</span>
          <span>9:00 - 22:00</span>
        </li>
        <li className={styles.item}>
          <span>Вторник</span>
          <span>9:00 - 22:00</span>
        </li>
        <li className={styles.item}>
          <span>Среда</span>
          <span>9:00 - 22:00</span>
        </li>
        <li className={styles.item}>
          <span>Четверг</span>
          <span>9:00 - 22:00</span>
        </li>
        <li className={styles.item}>
          <span>Пятница</span>
          <span>9:00 - 22:00</span>
        </li>
        <li className={styles.item}>
          <span>Суббота</span>
          <span>9:00 - 22:00</span>
        </li>
        <li className={styles.item}>
          <span>Воскресенье</span>
          <span>9:00 - 22:00</span>
        </li>
      </ul>
    </div>
  );
};
