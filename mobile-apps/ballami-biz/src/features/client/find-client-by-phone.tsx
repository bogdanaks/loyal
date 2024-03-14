import { FlashList } from "@shopify/flash-list"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"

import { checkPhone, getShopClients } from "entities/shop/api"
import { UserRow } from "entities/user/ui"

import { phoneMask } from "shared/config/masks"
import { theme } from "shared/config/theme"
import { InputImask } from "shared/ui/input-imask"

import { Loader } from "widgets/ui/loader"
import { NoData } from "widgets/ui/no-data"

interface Props {
  onSuccess: (client: UserAsClient) => void
}

export const FindClientByPhone = ({ onSuccess }: Props) => {
  const queryClient = useQueryClient()

  const { data, isLoading: isLoadingClients } = useQuery({
    queryKey: ["clients"],
    queryFn: getShopClients,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })
  const [isLoadingSearch, setIsLoadingSearch] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [clients, setClients] = useState<UserAsClient[]>([])

  useEffect(() => {
    if (!data) {
      return
    }

    const users = data.data.map(({ user, ...client }) => ({ ...user, client })) as UserAsClient[]
    setClients(users)
  }, [data])

  const handleSearchChange = async (_: string, unmasked: string) => {
    const filtered = data?.data
      .filter((client) => {
        return client.user.phone.toLowerCase().includes(unmasked.toLowerCase())
      })
      .map(({ user, ...client }) => ({ ...user, client })) as UserAsClient[]
    setClients(filtered ?? [])
    setSearchText(unmasked)

    if (!filtered?.length && unmasked?.length === 11) {
      await handleSearchByNumber(unmasked)
    }
  }

  const handleSearchByNumber = async (phone: string) => {
    try {
      setIsLoadingSearch(true)
      const res = await queryClient.fetchQuery({
        queryKey: [],
        queryFn: () => checkPhone(phone),
      })
      setClients([res.data])
    } catch (error) {
      //
    }
    setIsLoadingSearch(false)
  }

  const handleSuccess = (client: UserAsClient) => {
    setSearchText("")
    setClients([])
    onSuccess(client)
  }

  if (isLoadingClients) {
    return <Loader />
  }

  return (
    <KeyboardAwareScrollView>
      <InputImask
        opts={phoneMask}
        value={searchText}
        keyboardType="phone-pad"
        onChangeText={handleSearchChange}
        placeholder="+7 (000) 000-00-00"
        style={styles.search}
        autoFocus
      />
      {!clients.length && <NoData />}
      {isLoadingSearch && <Loader />}
      <FlashList
        renderItem={({ item, index }) => {
          return (
            <Pressable onPress={() => handleSuccess(item)}>
              <View style={{ paddingVertical: 10, paddingTop: index === 0 ? 24 : 10 }}>
                <UserRow user={item} />
              </View>
            </Pressable>
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
