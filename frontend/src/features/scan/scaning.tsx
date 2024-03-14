import { useState } from "react"

import { useShopStore } from "entities/shop/model/store"

import { ScanSuccessBonus } from "./scan-success-bonus/scan-success-bonus"
import { ScanSuccessDiscount } from "./scan-success-discount/scan-success-discount"
import { ScanningByPhone } from "./scanning-by-phone"
import { ScanningByQr } from "./scanning-by-qr"

export const Scaning = () => {
  const shop = useShopStore((state) => state.shop)
  const [client, setClient] = useState<UserAsClient | null>(null)

  const handleCloseSuccess = () => {
    setClient(null)
  }

  const handleSetClient = (client: UserAsClient) => {
    setClient(client)
  }

  if (!shop) {
    return null
  }

  return (
    <div className="flex flex-col w-full items-center justify-center mt-14 gap-4">
      <ScanningByQr onSuccess={handleSetClient} />
      <ScanningByPhone onSuccess={handleSetClient} />
      {client && shop.loyal_program.loyal_type.title === "Бонусная" && (
        <ScanSuccessBonus
          isOpen={!!client}
          onOpenChange={handleCloseSuccess}
          userAsClient={client}
          loyalProgram={shop.loyal_program}
        />
      )}
      {client && shop.loyal_program.loyal_type.title === "Дисконтная" && (
        <ScanSuccessDiscount
          isOpen={!!client}
          onOpenChange={handleCloseSuccess}
          userAsClient={client}
          loyalProgram={shop.loyal_program}
        />
      )}
    </div>
  )
}
