import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { UserRow } from "entities/user/ui";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "shared/ui/dialog";

import {
  QrScanSuccessPayment,
  SuccessPaymentData,
} from "./qr-scan-success/qr-scan-success-payment";
import { QrScanSuccessResult } from "./qr-scan-success/qr-scan-success-result";

interface Props {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  client: UserAsClient;
  loyalProgram: LoyalProgram;
}

export const QrScanSuccess = ({ isOpen, onOpenChange, client, loyalProgram }: Props) => {
  const queryClient = useQueryClient();
  const balance = client?.client?.balance ?? 0;
  const [successPayment, setSuccessPayment] = useState<null | SuccessPaymentData>(null);

  const handleClose = () => {
    setSuccessPayment(null);
    onOpenChange(false);
  };

  const handleSetSuccess = (data: SuccessPaymentData) => {
    setSuccessPayment(data);
    queryClient.invalidateQueries({ queryKey: ["check-qr"] });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full h-full flex flex-col overflow-y-auto">
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
          {!client?.client && (
            <div className="flex flex-col bg-green-200 rounded-3xl p-4 mt-2">
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
          <QrScanSuccessPayment
            client={client}
            loyalProgram={loyalProgram}
            onSuccess={handleSetSuccess}
          />
        ) : (
          <QrScanSuccessResult data={successPayment} onClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};
