import { Scaning } from "features/scan/scaning"

import { QrBox } from "shared/ui/qr-box/qr-box"

import { Container } from "widgets/ui/container"

export const ScanPage = () => {
  return (
    <Container title="Сканирование" className="max-w-[600px] h-full flex-col py-10">
      <div className=" flex flex-col w-full h-full items-center justify-center">
        <QrBox />
      </div>
      <Scaning />
    </Container>
  )
}
