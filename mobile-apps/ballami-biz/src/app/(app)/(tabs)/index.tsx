import { SafeAreaView } from "react-native-safe-area-context"

import { Scan } from "widgets/scan"

export default function QrScanPage() {
  return (
    <SafeAreaView
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        paddingHorizontal: 16,
      }}
    >
      <Scan />
    </SafeAreaView>
  )
}
