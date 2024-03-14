import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { FindClientByPhone } from "features/client"
import { useEffect, useRef, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { PhoneIcon } from "shared/assets/icons/phone-icon"
import { theme } from "shared/config/theme"
import { Button } from "shared/ui/button"

interface Props {
  onSuccess: (client: UserAsClient) => void
}

export const ScanByNumber = ({ onSuccess }: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const { top, bottom } = useSafeAreaInsets()
  const tabHeight = useBottomTabBarHeight()
  const [isOpen, setIsOpen] = useState(false)

  const handleSuccess = (client: UserAsClient) => {
    onSuccess(client)
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.present()
    } else {
      bottomSheetRef.current?.dismiss()
      bottomSheetRef.current?.close()
    }
  }, [isOpen])

  return (
    <View>
      <Button variant="outline" onPress={() => setIsOpen(true)}>
        <PhoneIcon width={24} height={24} />
        <Text style={{ marginLeft: 4 }}>Найти по номеру</Text>
      </Button>
      {isOpen && (
        <BottomSheetModal
          ref={bottomSheetRef}
          onDismiss={() => setIsOpen(false)}
          enableDynamicSizing
          index={isOpen ? 1 : 0}
          snapPoints={["100%"]}
          enableOverDrag={false}
          enablePanDownToClose={false}
          enableHandlePanningGesture={false}
          enableContentPanningGesture={false}
          handleComponent={null}
          style={[styles.sheetModalContainer, { paddingTop: top }]}
        >
          <BottomSheetView>
            <View style={styles.header}>
              <Pressable style={styles.headerBack} onPress={() => bottomSheetRef.current?.close()}>
                <Text style={{ color: theme.primary }}>Закрыть</Text>
              </Pressable>
              <Text style={styles.headerTitle}>Поиск по номеру</Text>
            </View>
            <FindClientByPhone onSuccess={handleSuccess} />
          </BottomSheetView>
        </BottomSheetModal>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  sheetModalContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    position: "relative",
  },
  headerBack: {
    position: "absolute",
    left: 0,
  },
  headerTitle: {
    fontWeight: "600",
    fontSize: 17,
  },
})
