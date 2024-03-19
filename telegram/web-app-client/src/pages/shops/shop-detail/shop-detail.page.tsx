import { PiInfoLight } from "react-icons/pi";
import { Drawer } from "vaul";

// import CartIcon from "shared/assets/icons/cart.svg?react";
import { ShopBigAvatar, ShopBonusBadge, ShopWorkTimeDrawer } from "entities/shop/ui";

import GiftIcon from "shared/assets/icons/gift.svg?react";

import styles from "./styles.module.css";

export const ShopDetailPage = () => {
  return (
    <Drawer.Root>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.headerTitleBlock}>
            <h1 className={styles.headerTitle}>BRAVOS</h1>
            <ShopBonusBadge icon={<GiftIcon />} text="10%" />
          </div>
          <div className={styles.bonusBlock}>
            <h2>500</h2>
            <span>Баллов</span>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.avatar}>
            <ShopBigAvatar />
          </div>
          <span className={styles.category}>[Сеть кофеин]</span>
          <div className={styles.workTimeBlock}>
            <div className={styles.workHint}>
              <span>Режим работы</span>
              <Drawer.Trigger>
                <button className={styles.infoBtn}>
                  <PiInfoLight />
                </button>
              </Drawer.Trigger>
            </div>
            <div className={styles.workTime}>
              <span className={styles.workTimeTime}>9:00</span>
              <span className={styles.workTimeDelimiter} />
              <span className={styles.workTimeTime}>22:00</span>
            </div>
          </div>
          <div className={styles.photosCarousel}>
            <div className={styles.photoCarouselItem} />
            <div className={styles.photoCarouselItem} />
            <div className={styles.photoCarouselItem} />
          </div>
          <div className={styles.desc}>
            <h2>Описание</h2>
            <p>
              BRAVOS – первая рязанская компания с собственной кофейной обжаркой. Мы закупаем
              зелёный кофе из разных стран и регионов планеты и обжариваем его в непосредственной
              близости от Вас. Это позволяет достичь максимальной свежести кофе, что делает его
              несомненно вкуснее!
            </p>
            <button type="button">еще</button>
          </div>
          <div className={styles.banner}></div>

          <Drawer.Portal>
            <Drawer.Content className={styles.drawerContent}>
              <div className={styles.divider} />
              <ShopWorkTimeDrawer />
            </Drawer.Content>
            <Drawer.Overlay className={styles.drawerOverlay} />
          </Drawer.Portal>
        </div>
      </div>
    </Drawer.Root>
  );
};
