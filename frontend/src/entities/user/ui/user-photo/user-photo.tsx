// import { config } from "shared/config";
import styles from "./styles.module.css";

// import { useBusinessStore } from "entities/business/model/store";

export const UserPhoto = () => {
  // const account = useBusinessStore((store) => store.account);

  return (
    <div className={styles.photo}>
      <img
        src="/im.jpg"
        // src={me?.photo ? `${config.apiDomain}/static/${account?.photo}` : "/empty.png"}
        width={100}
        height={100}
        alt="Im"
      />
    </div>
  );
};
