import { useState } from "react"
import { View } from "react-native"

import { Segment } from "shared/ui/segment"

import { useScanStore } from "widgets/scan/model/store"

import { ScanPaymentMinus } from "./scan-payment-minus"
import { ScanPaymentPlus } from "./scan-payment-plus"
import { ScanPaymentResult } from "./scan-payment-result"

type ViewType = "minus" | "plus"

interface Props {
  shop: Shop
  userAsClient: UserAsClient
}

export const ScanPaymentBonus = ({ shop, userAsClient }: Props) => {
  const [viewType, setViewType] = useState<ViewType>("plus")
  const successPaymentData = useScanStore((state) => state.successPaymentData)

  if (successPaymentData) {
    return <ScanPaymentResult successData={successPaymentData} />
  }

  return (
    <View style={{ flex: 1 }}>
      <Segment value={viewType} onChange={setViewType}>
        <Segment.Item value="minus">Списание</Segment.Item>
        <Segment.Item value="plus">Начисление</Segment.Item>
      </Segment>
      {viewType === "plus" ? (
        <ScanPaymentPlus shop={shop} userAsClient={userAsClient} />
      ) : (
        <ScanPaymentMinus shop={shop} userAsClient={userAsClient} />
      )}
    </View>
  )
}
