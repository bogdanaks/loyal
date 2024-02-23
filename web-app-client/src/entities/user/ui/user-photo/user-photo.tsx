import { useUserStore } from "entities/user/model/store";

import { config } from "shared/config";

import styles from "./styles.module.css";

export const UserPhoto = () => {
  const me = useUserStore((store) => store.me);
  const nonce = useUserStore((store) => store.nonce);

  return (
    <div className={styles.photo}>
      <img
        src={me?.photo ? `${config.apiDomain}/static/${me?.photo}` : "/empty.png"}
        width={100}
        height={100}
        alt="Im"
        nonce={nonce.toString()}
      />
    </div>
  );
};
