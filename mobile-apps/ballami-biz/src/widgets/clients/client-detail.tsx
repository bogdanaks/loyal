import { useQuery } from "@tanstack/react-query"
import { Image } from "expo-image"
import { Stack } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from "react-native-popup-menu"

import { getShopClient, getShopClientPurchases } from "entities/shop/api"

import { MoreIcon } from "shared/assets/icons/more-icon"
import { config } from "shared/config"
import { phoneMask } from "shared/config/masks"
import { theme } from "shared/config/theme"
import { MaskedText } from "shared/ui/masked-text"

import { Loader } from "widgets/ui/loader"

interface Props {
  id: number
}

export const ClientDetail = ({ id }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["client", id],
    queryFn: () => getShopClient(id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    enabled: !!id,
  })

  const { data: purchasesCount, isLoading: isLoadingPurchasesCount } = useQuery({
    queryKey: ["client-purchases", id],
    queryFn: () => getShopClientPurchases(id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    enabled: !!id,
  })

  if (isLoading || isLoadingPurchasesCount || !data || !purchasesCount) {
    return <Loader />
  }

  return (
    <View style={styles.headerBlock}>
      <Stack.Screen
        options={{
          title: `${data.data.user.first_name} ${data.data.user.last_name}`,
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
                  <MenuOption onSelect={() => alert(`Not called`)}>
                    <Text style={{ color: theme.destructive }}>Заблокировать</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            )
          },
        }}
      />

      <View style={styles.info}>
        <Text style={styles.name}>
          {data.data.user.first_name} {data.data.user.last_name}
        </Text>
        <MaskedText mask={phoneMask}>{data.data.user.phone}</MaskedText>
        <View style={styles.statInfo}>
          <View>
            <Text style={styles.statCount}>59</Text>
            <Text>баллов</Text>
          </View>
          <View>
            <Text style={styles.statCount}>14</Text>
            <Text>покупок</Text>
          </View>
        </View>
      </View>
      <Image
        style={styles.image}
        source={`${config.apiDomain}/static/users/${data.data.user.photo}`}
        contentFit="cover"
        transition={100}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headerBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    flexDirection: "column",
  },
  name: {
    fontSize: 24,
    fontWeight: "500",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: "flex-start",
  },
  statInfo: {
    flexDirection: "row",
    gap: 24,
    marginTop: 16,
  },
  statCount: {
    fontSize: 24,
    fontWeight: "600",
    color: theme.primary,
  },
})
