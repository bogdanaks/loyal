import Big from "big.js"

import { Button } from "shared/ui/button"

import { SuccessPaymentData } from "./scan-success-payment"

interface Props {
  data: SuccessPaymentData
  onClose: () => void
}

export const ScanSuccessResult = ({ data, onClose }: Props) => {
  return (
    <div>
      <div>
        <div className="bg-primary-disabled p-2 rounded-xl mb-4 border-slate-300 border-2 flex flex-row items-center gap-2">
          <span>Сумма к оплате:</span>
          <span>
            <b className="text-2xl">
              {Big(data.check_amount)
                .minus(data.point_amount ?? 0)
                .toString()}
            </b>
          </span>
          <span>руб.</span>
        </div>
        <div className="flex flex-col rounded-xl border-slate-300 border-2 bg-primary-disabled p-2">
          {data.point_amount && (
            <span className="flex flex-row items-center gap-2">
              Списано баллов: <b className="text-2xl">{data.point_amount}</b>
            </span>
          )}
          <span className="flex flex-row items-center gap-2">
            Начислено баллов: <b className="text-2xl">{data.bonus_points}</b>
          </span>
        </div>
      </div>
      <Button type="button" className="rounded-xl mt-4" onClick={onClose}>
        Закрыть
      </Button>
    </div>
  )
}
