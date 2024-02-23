import { QrScan } from "features/qr-scanner/qr-scan";

import { TitlePage } from "shared/ui";

import { Container } from "widgets/ui";

export const QrScannerPage = () => {
  return (
    <Container>
      <TitlePage style={{ justifyContent: "center" }}>Сканнер QR-кода</TitlePage>
      <QrScan />
    </Container>
  );
};
