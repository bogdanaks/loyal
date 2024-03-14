import { useQueryClient } from "@tanstack/react-query"
import { Constants } from "expo-barcode-scanner"
import { BarCodeScanningResult, Camera, CameraType } from "expo-camera"
import { useEffect, useState } from "react"
import { StyleSheet, View, useWindowDimensions } from "react-native"

import { checkQrCode } from "entities/shop/api"

import { QrIcon } from "shared/assets/icons/qr-icon"
import { theme } from "shared/config/theme"

import { Loader } from "widgets/ui/loader"

interface Props {
  onSuccess: (client: UserAsClient) => void
}

export const ScanByQr = ({ onSuccess }: Props) => {
  const queryClient = useQueryClient()

  const { width } = useWindowDimensions()
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [isLoadingSearch, setIsLoadingSearch] = useState(false)

  const handleSearchByQr = async (qr: string) => {
    try {
      setIsLoadingSearch(true)
      const res = await queryClient.fetchQuery({
        queryKey: [],
        queryFn: () => checkQrCode(qr),
      })
      onSuccess(res.data)
    } catch (error) {
      //
    }
    setIsLoadingSearch(false)
  }

  const handleQrScan = async (scanningResult: BarCodeScanningResult) => {
    if (!isLoadingSearch) {
      await handleSearchByQr(scanningResult.data)
    }
  }

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission()
    }
  }, [permission])

  return (
    <View style={{ marginTop: "auto", alignItems: "center" }}>
      <Camera
        style={[styles.camera, { width: width - 64, height: width - 64 }]}
        type={CameraType.back}
        barCodeScannerSettings={{
          barCodeTypes: [Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={handleQrScan}
        focusDepth={0.7}
      >
        {isLoadingSearch && <Loader size={100} />}
        {!isLoadingSearch && (
          <QrIcon width="75%" height="75%" opacity={0.2} backgroundFill="transparent" />
        )}
      </Camera>
    </View>
  )
}

const styles = StyleSheet.create({
  camera: {
    borderRadius: theme.radius,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
})
