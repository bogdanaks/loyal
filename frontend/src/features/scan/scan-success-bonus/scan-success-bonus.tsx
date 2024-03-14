import { useQueryClient } from "@tanstack/react-query"
import Big from "big.js"
import { useState } from "react"

import { UserRow } from "entities/user/ui"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "shared/ui/dialog"

import { ScanSuccessPayment, SuccessPaymentData } from "./scan-success-payment"
import { ScanSuccessResult } from "./scan-success-result"

interface Props {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  userAsClient: UserAsClient
  loyalProgram: LoyalProgram
}

export const ScanSuccessBonus = ({ isOpen, onOpenChange, userAsClient, loyalProgram }: Props) => {
  const [balance, setBalance] = useState(userAsClient.client?.balance ?? 0)
  const [successPayment, setSuccessPayment] = useState<null | SuccessPaymentData>(null)
  const queryClient = useQueryClient()

  const handleClose = () => {
    setSuccessPayment(null)
    onOpenChange(false)
  }

  const handleSetSuccess = async (data: SuccessPaymentData) => {
    setSuccessPayment(data)
    setBalance((prevState) =>
      Big(prevState)
        .minus(data.point_amount ?? 0)
        .plus(data.bonus_points)
        .toNumber()
    )
    await queryClient.invalidateQueries({
      queryKey: ["client", data.client_id.toString()],
      refetchType: "all",
    })
    await queryClient.invalidateQueries({
      queryKey: ["client-purchases", data.client_id.toString()],
      refetchType: "all",
    })
    await queryClient.invalidateQueries({
      queryKey: ["clients"],
      refetchType: "all",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full h-full flex flex-col overflow-y-auto sm:h-fit">
        <DialogHeader>
          <DialogTitle>Назначение баллов</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col items-center">
          <div className="flex flex-row w-full">
            <UserRow user={userAsClient} />
            <div className="flex flex-col ml-auto">
              <span className="text-3xl text-slate-700">{balance}</span>
              <span className="text-sm text-slate-700 text-right">баллов</span>
            </div>
          </div>
          {!userAsClient?.client && !successPayment && (
            <div className="flex flex-col bg-green-200 rounded-3xl p-4 mt-2 w-full">
              <p>Новый клиент!</p>
              {loyalProgram.reg_bonus > 0 && (
                <span>
                  Дополнительно <b>{loyalProgram.reg_bonus}</b> баллов за регистрацию.
                </span>
              )}
            </div>
          )}
        </div>
        {!successPayment ? (
          <ScanSuccessPayment
            client={userAsClient}
            loyalProgram={loyalProgram}
            onSuccess={handleSetSuccess}
          />
        ) : (
          <ScanSuccessResult data={successPayment} onClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  )
}
