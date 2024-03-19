import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import React, { useEffect, useRef } from "react"
import { StyleSheet, Text, View } from "react-native"

import { theme } from "shared/config/theme"
import { formatByTz } from "shared/libs/tz"

interface Props {
  isOpen: boolean
  onClose: () => void
  shopClient: ShopClient
}

const DAYS = {
  monday: "Понедельник",
  tuesday: "Вторник",
  wednesday: "Среда",
  thursday: "Четверг",
  friday: "Пятница",
  saturday: "Суббота",
  sunday: "Воскресенье",
}

export const ShopWorkingHoursSheet = ({ isOpen, onClose, shopClient }: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.present()
    } else {
      bottomSheetRef.current?.close()
    }
  }, [isOpen])

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      onDismiss={onClose}
      enablePanDownToClose
      enableDynamicSizing
      index={1}
      snapPoints={[300, 400]}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={{ fontWeight: "600", fontSize: 17, marginBottom: 30 }}>Режим работы</Text>
        </View>
        <View style={styles.days}>
          {Object.entries(DAYS).map(([weekday, dayName], index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                height: 44,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 17,
                  color: theme.accentForeground,
                }}
              >
                {dayName}
              </Text>
              <View style={styles.times}>
                {shopClient.shop.working_hours[weekday as keyof WorkingHours].is_day_off ? (
                  <Text style={{ fontWeight: "400", fontSize: 17, color: theme.destructive }}>
                    Выходной
                  </Text>
                ) : (
                  <View>
                    <Text style={{ fontWeight: "400", fontSize: 17 }}>
                      {formatByTz(
                        shopClient.shop.working_hours[weekday as keyof WorkingHours].opening_time,
                        shopClient.shop.timezone
                      )}{" "}
                      -{" "}
                      {formatByTz(
                        shopClient.shop.working_hours[weekday as keyof WorkingHours].closing_time,
                        shopClient.shop.timezone
                      )}
                    </Text>
                    {!!shopClient.shop.working_hours[weekday as keyof WorkingHours].breaks
                      .length && (
                      <View style={styles.breaks}>
                        <Text
                          style={{ fontWeight: "400", fontSize: 14, color: theme.mutedForeground }}
                        >
                          Перерыв
                        </Text>
                        {shopClient.shop.working_hours[weekday as keyof WorkingHours].breaks.map(
                          (breakDay, index) => (
                            <Text
                              style={{
                                fontWeight: "400",
                                fontSize: 14,
                                color: theme.mutedForeground,
                              }}
                              key={index}
                            >
                              {formatByTz(breakDay.from_time, shopClient.shop.timezone)} -{" "}
                              {formatByTz(breakDay.to_time, shopClient.shop.timezone)}
                            </Text>
                          )
                        )}
                      </View>
                    )}
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 0,
    alignItems: "center",
    height: "auto",
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  days: {
    flexDirection: "column",
    gap: 6,
  },
  times: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  breaks: {
    flexDirection: "column",
    alignItems: "center",
  },
})
