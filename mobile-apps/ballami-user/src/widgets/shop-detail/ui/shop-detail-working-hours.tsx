import { useState } from "react"
import { Pressable, Text, View, useWindowDimensions } from "react-native"

import { ShopWorkingHoursSheet } from "entities/shop/ui"

import { InfoIcon } from "shared/assets/icons/info-icon"
import { theme } from "shared/config/theme"
import { formatByTz } from "shared/libs/tz"

interface Props {
  shopClient: ShopClient
}

const day = new Date().getDay()
const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
const currentDay = weekday[day] as keyof WorkingHours

export const ShopDetailWorkingHours = ({ shopClient }: Props) => {
  const { width } = useWindowDimensions()
  const [isOpenWorkingHours, setIsOpenWorkingHours] = useState(false)

  return (
    <View style={{ marginTop: width / 3.5, width: "100%" }}>
      <Pressable
        style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
        onPress={() => setIsOpenWorkingHours(true)}
      >
        <Text style={{ fontSize: 15, fontWeight: "400" }}>Режим работы</Text>
        <InfoIcon width={20} height={20} color={theme.accentForeground} />
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {!shopClient.shop.working_hours[currentDay].is_day_off ? (
          <>
            <Text style={{ fontSize: 50 }}>
              {formatByTz(
                shopClient.shop.working_hours[currentDay].opening_time,
                shopClient.shop.timezone
              )}
            </Text>
            <View
              style={{
                height: 4,
                width: "10%",
                backgroundColor: theme.accentForeground,
                borderRadius: 10,
              }}
            />
            <Text style={{ fontSize: 50 }}>
              {formatByTz(
                shopClient.shop.working_hours[currentDay].closing_time,
                shopClient.shop.timezone
              )}
            </Text>
          </>
        ) : (
          <View style={{ alignItems: "center", justifyContent: "center", width: "100%" }}>
            <Text style={{ fontSize: 50, color: theme.destructive }}>Выходной</Text>
          </View>
        )}
      </View>
      <ShopWorkingHoursSheet
        isOpen={isOpenWorkingHours}
        onClose={() => setIsOpenWorkingHours(false)}
        shopClient={shopClient}
      />
    </View>
  )
}
