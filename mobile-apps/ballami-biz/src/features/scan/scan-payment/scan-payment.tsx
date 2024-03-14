import { useShopStore } from "entities/shop/model/store"

import { ScanPaymentBonus } from "./ui/scan-payment-bonus/scan-payment-bonus"
import { ScanPaymentDiscount } from "./ui/scan-payment-discount/scan-payment-discount"

interface Props {
  userAsClient: UserAsClient
}

export const ScanPayment = ({ userAsClient }: Props) => {
  const shop = useShopStore((state) => state.shop)

  if (!shop) {
    return null
  }

  if (shop.loyal_program.loyal_type.title === "Бонусная") {
    return <ScanPaymentBonus shop={shop} userAsClient={userAsClient} />
  }

  if (shop.loyal_program.loyal_type.title === "Дисконтная") {
    return <ScanPaymentDiscount shop={shop} userAsClient={userAsClient} />
  }
}
