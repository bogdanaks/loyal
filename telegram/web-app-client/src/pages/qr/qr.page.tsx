import QRCode from "react-qr-code";

import { useUserStore } from "entities/user/model/store";

import { TitlePage } from "shared/ui";

import { Container } from "widgets/ui";

import styles from "./styles.module.css";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const meMock = { id: "test" };

export const QrPage = () => {
  const { width } = getWindowDimensions();
  // const me = useUserStore((store) => store.me);

  // if (!me?.id) {
  //   return null;
  // }

  return (
    <Container>
      <TitlePage style={{ justifyContent: "center", width: "100%" }}>Отсканируйте QR-код</TitlePage>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <QRCode
            value={meMock.id.toString()}
            bgColor="hsl(var(--primary-disabled))"
            size={width - 140}
            style={{ borderRadius: 10, overflow: "hidden" }}
          />
        </div>
      </div>
    </Container>
  );
};
