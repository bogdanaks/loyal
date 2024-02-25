import { Scaning } from "features/scan/scaning"

import { QrBox } from "shared/ui/qr-box/qr-box"

import { Layout } from "widgets/ui"
import { Container } from "widgets/ui/container"

export const ScanPage = () => {
  return (
    <Layout>
      <Container title="Сканирование" className="max-w-[600px] h-full flex-col">
        <div className=" flex flex-col w-full h-full items-center justify-center">
          <QrBox />
        </div>
        <Scaning />
      </Container>
    </Layout>
  )
}
