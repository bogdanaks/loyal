import { useState } from "react"

import { useShopStore } from "entities/shop/model/store"

import { ScanSuccess } from "./scan-success/scan-success"
import { ScanningByPhone } from "./scanning-by-phone"
import { ScanningByQr } from "./scanning-by-qr"

export const Scaning = () => {
  const shop = useShopStore((state) => state.shop)
  const [client, setClient] = useState<UserAsClient | null>(null)

  const handleCloseSuccess = () => {
    setClient(null)
  }

  if (!shop) {
    return null
  }

  return (
    <div className="flex flex-col w-full items-center justify-center mt-10 gap-4">
      <ScanningByQr onSuccess={(client) => setClient(client)} />
      <ScanningByPhone onSuccess={(client) => setClient(client)} />
      {client && (
        <ScanSuccess
          isOpen={!!client}
          onOpenChange={handleCloseSuccess}
          client={client}
          loyalProgram={shop.loyal_program}
        />
      )}
    </div>
  )
}
