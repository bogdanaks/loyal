import { Stack, router } from "expo-router"
import {
  BusinessSettingsContacts,
  BusinessSettingsData,
  BusinessSettingsPhotos,
  BusinessSettingsWorkingHours,
} from "features/business"
import { useState } from "react"
import { Text, View } from "react-native"
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from "react-native-popup-menu"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"

import { MoreIcon } from "shared/assets/icons/more-icon"
import { theme } from "shared/config/theme"

export default function MyBusinessPage() {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: "data", title: "Данные" },
    { key: "working_hours", title: "График работы" },
    { key: "photos", title: "Фотографии" },
    { key: "contacts", title: "Контактная информация" },
  ])

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Мой бизнес",
          headerTitleStyle: { color: theme.accentForeground },
          headerBackTitleVisible: false,
          headerBackVisible: true,
          headerRight: () => {
            return (
              <Menu renderer={renderers.Popover} rendererProps={{ placement: "bottom" }}>
                <MenuTrigger>
                  <MoreIcon color={theme.accentForeground} />
                </MenuTrigger>
                <MenuOptions
                  optionsContainerStyle={{
                    padding: 4,
                    backgroundColor: theme.background,
                    borderRadius: theme.radius,
                  }}
                >
                  <MenuOption onSelect={() => router.push("/preview-shop")}>
                    <Text style={{ color: theme.accentForeground }}>Предпросмотр магазина</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            )
          },
        }}
      />

      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          data: BusinessSettingsData,
          working_hours: BusinessSettingsWorkingHours,
          photos: BusinessSettingsPhotos,
          contacts: BusinessSettingsContacts,
        })}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: theme.primary }}
            style={{ backgroundColor: "#fff", paddingVertical: 0, height: 44 }}
            inactiveColor={theme.mutedForeground}
            activeColor="#000"
            scrollEnabled
            tabStyle={{ width: "auto" }}
            renderLabel={(propsLabel) => <Text>{propsLabel.route.title}</Text>}
            labelStyle={{ fontSize: 14, fontWeight: "500" }}
          />
        )}
      />
      {/* //   </KeyboardAwareScrollView> */}
      {/* // </KeyboardAvoidingView> */}
      {/* </KeyboardAwareScrollView> */}
    </View>
  )
}
