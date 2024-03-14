import { ScanByNumber, ScanByQr } from "features/scan"
import { View } from "react-native"

import { useScanStore } from "./model/store"
import { ScanClient } from "./ui/scan-client"

export const Scan = () => {
  const setUserAsClient = useScanStore((state) => state.setUserAsClient)
  const setBalance = useScanStore((state) => state.setBalance)

  const handleSuccessFinded = (client: UserAsClient) => {
    setUserAsClient(client)
    setBalance(client?.client?.balance ?? 0)
  }

  return (
    <View style={{ flex: 1 }}>
      <ScanByQr onSuccess={handleSuccessFinded} />
      <View style={{ marginTop: "auto", flexDirection: "column", gap: 12 }}>
        <ScanByNumber onSuccess={handleSuccessFinded} />
        <ScanClient />
      </View>
    </View>
  )
}
