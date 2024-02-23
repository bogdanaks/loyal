import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getMyLoyalProgram } from "entities/loyal/api";
import { checkQrCode } from "entities/shop/api";

import { QrBox } from "shared/ui";
import { Button } from "shared/ui/button";

import { QrScanSuccess } from "./qr-scan-success";

export const QrScan = () => {
  const [scanResult, setScanResult] = useState<string | null>("100018");
  const { error, isLoading, data, refetch } = useQuery({
    queryKey: ["check-qr", scanResult],
    queryFn: () => checkQrCode(scanResult ?? ""),
    retry: false,
    enabled: !!scanResult,
  });
  const { data: loyalProgram, isLoading: isLoadingLoyalProgram } = useQuery({
    queryKey: ["loyal-program"],
    queryFn: getMyLoyalProgram,
  });

  const handleScan = () => {
    Telegram.WebApp.showScanQrPopup({ text: "Сканировать QR" }, (result) => {
      setScanResult(result);
      if (data) {
        refetch();
      }
      return true;
    });
  };

  const handleCloseSuccess = () => {
    setScanResult(null);
  };

  if (isLoadingLoyalProgram) {
    return <div className="flex flex-col items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <QrBox />
      {!isLoading && (
        <Button
          type="button"
          onClick={handleScan}
          className="flex w-[85%] rounded-3xl mt-auto mb-10"
        >
          Cканировать QR код
        </Button>
      )}
      {error && <p>Ошибка сканирования: Клиент не найден</p>}
      {data?.data && loyalProgram?.data && (
        <QrScanSuccess
          isOpen={!!scanResult}
          onOpenChange={handleCloseSuccess}
          client={data.data}
          loyalProgram={loyalProgram.data}
        />
      )}
    </div>
  );
};
