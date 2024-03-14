import { FlashList } from "@shopify/flash-list"
import { useQuery } from "@tanstack/react-query"
import { Link } from "expo-router"
import { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { getShopClients } from "entities/shop/api"
import { UserRow } from "entities/user/ui"

import { theme } from "shared/config/theme"
import { Input } from "shared/ui/input"

import { NoData } from "widgets/ui/no-data"

export const ClientsList = () => {
  const insets = useSafeAreaInsets()
  const { data, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: getShopClients,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })
  const [searchText, setSearchText] = useState("")
  const [clients, setClients] = useState<ShopClient[]>([])

  useEffect(() => {
    if (!data) {
      return
    }

    setClients(data.data)
  }, [data])

  const handleSearchChange = (search: string) => {
    const filtered = data?.data.filter((client) => {
      if (client.user.first_name.toLowerCase().includes(search.toLowerCase())) {
        return client
      }

      if ((client.user.last_name ?? "").toLowerCase().includes(search.toLowerCase())) {
        return client
      }

      return client.user.phone.toLowerCase().includes(search.toLowerCase())
    })
    setClients(filtered ?? [])
    setSearchText(search)
  }

  if (isLoading) {
    return <Text>Loading..</Text>
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        padding: 16,
        paddingBottom: 0,
        flexGrow: 1,
        marginTop: insets.top,
      }}
    >
      <Input
        style={styles.search}
        placeholder="Поиск"
        value={searchText}
        onChangeText={handleSearchChange}
      />
      {!clients.length && <NoData />}
      <FlashList
        renderItem={({ item, index }) => {
          return (
            <Link href={`clients/${item.id}`} asChild>
              <Pressable>
                <View style={{ paddingVertical: 10, paddingTop: index === 0 ? 24 : 10 }}>
                  <UserRow user={item.user} />
                </View>
              </Pressable>
            </Link>
          )
        }}
        estimatedItemSize={50}
        data={clients}
      />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  search: {
    borderRadius: 20,
    backgroundColor: theme.muted,
    borderWidth: 0,
    height: 40,
    marginBottom: 4,
  },
})
