import Big from "big.js"
import { useMemo } from "react"
import { Text, View } from "react-native"

import { Button } from "shared/ui/button"

import { SuccessPaymentData, useScanStore } from "widgets/scan/model/store"

interface Props {
  successData: SuccessPaymentData
}

export const ScanPaymentResult = ({ successData }: Props) => {
  const setUserAsClient = useScanStore((state) => state.setUserAsClient)
  const setSuccessPaymentData = useScanStore((state) => state.setSuccessPaymentData)

  const sumAmount = useMemo(() => {
    return Big(successData.check_amount)
      .minus(successData.point_amount ?? 0)
      .toString()
  }, [successData])

  const handleClose = () => {
    setSuccessPaymentData(null)
    setUserAsClient(null)
  }

  return (
    <View style={{ flex: 1, flexDirection: "column", gap: 24 }}>
      <View>
        <Text style={{ fontSize: 18 }}>Сумма к оплате</Text>
        <Text style={{ fontSize: 22, fontWeight: "500" }}>{sumAmount} руб.</Text>
      </View>
      {successData?.point_amount && (
        <View>
          <Text style={{ fontSize: 18 }}>Списано баллов</Text>
          <Text style={{ fontSize: 22, fontWeight: "500" }}>{successData.point_amount}</Text>
        </View>
      )}
      <View>
        <Text style={{ fontSize: 18 }}>Начислено баллов</Text>
        <Text style={{ fontSize: 22, fontWeight: "500" }}>{successData.bonus_points}</Text>
      </View>
      <Button onPress={handleClose} style={{ marginTop: "auto" }}>
        Закрыть
      </Button>
    </View>
  )
}
