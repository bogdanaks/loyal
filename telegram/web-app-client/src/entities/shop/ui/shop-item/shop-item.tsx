import { Link } from "react-router-dom";

import CaretRightIcon from "shared/assets/icons/caret-right.svg?react";
import GiftIcon from "shared/assets/icons/gift.svg?react";

import { ShopBonusBadge } from "..";
import styles from "./styles.module.css";

interface Props {
  id: number;
}

export const ShopItem = ({ id }: Props) => {
  return (
    <Link to={`/shops/${id}`}>
      <div className={styles.wrapper}>
        <div className={styles.icon}>
          <img src="/shop.jpg" width={80} height={80} />
        </div>
        <div className={styles.info}>
          <span className={styles.infoTitle}>BRAVOS</span>
          <span className={styles.infoCategory}>Сеть кофеин</span>
          <ShopBonusBadge icon={<GiftIcon />} text="от 5%" />
        </div>
        <button className={styles.moreBtn}>
          <CaretRightIcon />
        </button>
      </div>
    </Link>
  );
};
