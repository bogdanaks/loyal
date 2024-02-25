import { QrCode, Smartphone } from "lucide-react"

import { Button } from "shared/ui/button"

export const Scaning = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center mt-auto gap-4 mb-4">
      <Button type="button" className="flex w-[85%] rounded-3xl mt-10">
        <QrCode className="mr-4" />
        Cканировать QR код
      </Button>
      <Button type="button" variant="outline" className="flex w-[85%] rounded-3xl">
        <Smartphone className="mr-4" />
        Ввести номер
      </Button>
    </div>
  )
}
