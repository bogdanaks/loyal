import { useQueryClient } from "@tanstack/react-query"
import { QrCode } from "lucide-react"
import { toast } from "sonner"

import { checkQrCode } from "entities/shop/api"

import { Button } from "shared/ui/button"

interface Props {
  onSuccess: (client: UserAsClient) => void
}

export const ScanningByQr = ({ onSuccess }: Props) => {
  const isTg = !!Telegram.WebApp.initData?.length
  const queryClient = useQueryClient()

  const fetchClient = async (code: string) => {
    try {
      const res = await queryClient.fetchQuery({
        queryKey: [],
        queryFn: () => checkQrCode(code),
      })
      onSuccess(res.data)
    } catch (error) {
      console.log(error)
      toast.error("Ошибка сканирования: Клиент не найден")
    }
  }

  const handleScan = () => {
    Telegram.WebApp.showScanQrPopup({ text: "Сканировать QR" }, (result) => {
      if (result) {
        fetchClient(result)
      }
      return true
    })
  }

  if (!isTg) {
    return null
  }

  return (
    <Button type="button" className="flex w-[85%] rounded-3xl mt-10" onClick={handleScan}>
      <QrCode className="mr-4" />
      Cканировать QR код
    </Button>
  )
}
