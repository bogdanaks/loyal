import { useQuery } from "@tanstack/react-query"
import { QrCode } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { checkQrCode } from "entities/shop/api"

import { Button } from "shared/ui/button"

interface Props {
  onSuccess: (client: UserAsClient) => void
}

export const ScanningByQr = ({ onSuccess }: Props) => {
  const isTg = !!Telegram.WebApp.initData?.length
  const [scanResult, setScanResult] = useState<string | null>(null)
  const { error, data, refetch } = useQuery({
    queryKey: ["check-qr"],
    queryFn: () => checkQrCode(scanResult ?? ""),
    retry: false,
    enabled: !!scanResult,
  })

  const handleScan = () => {
    Telegram.WebApp.showScanQrPopup({ text: "Сканировать QR" }, (result) => {
      setScanResult(result)
      if (data) {
        refetch()
      }
      return true
    })
  }

  useEffect(() => {
    if (error) {
      toast.error("Ошибка сканирования: Клиент не найден")
    }
  }, [error])

  useEffect(() => {
    if (data) {
      onSuccess(data.data)
    }
  }, [data])

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
