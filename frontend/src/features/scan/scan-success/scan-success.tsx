import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { getShopClient } from "entities/shop/api"
import { UserRow } from "entities/user/ui"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "shared/ui/dialog"

import { ScanSuccessPayment, SuccessPaymentData } from "./scan-success-payment"
import { ScanSuccessResult } from "./scan-success-result"

interface Props {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  client: UserAsClient
  loyalProgram: LoyalProgram
}

export const ScanSuccess = ({ isOpen, onOpenChange, client, loyalProgram }: Props) => {
  const { data, refetch } = useQuery({
    queryKey: [],
    queryFn: () => getShopClient(client.id),
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    enabled: !!client,
  })

  const balance = data?.data?.balance ?? 0
  const [successPayment, setSuccessPayment] = useState<null | SuccessPaymentData>(null)

  const handleClose = () => {
    setSuccessPayment(null)
    onOpenChange(false)
  }

  const handleSetSuccess = (data: SuccessPaymentData) => {
    refetch()
    setSuccessPayment(data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full h-full flex flex-col overflow-y-auto sm:h-fit">
        <DialogHeader>
          <DialogTitle>Назначение баллов</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col items-center">
          <div className="flex flex-row w-full">
            <UserRow user={client} />
            <div className="flex flex-col ml-auto">
              <span className="text-3xl text-slate-700">{balance}</span>
              <span className="text-sm text-slate-700 text-right">баллов</span>
            </div>
          </div>
          {!client?.client && !successPayment && (
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
            client={client}
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
