import { useLocalSearchParams } from "expo-router"
import { View } from "react-native"

import { ClientDetail } from "widgets/clients"

export default function ClientDetailPage() {
  const { id } = useLocalSearchParams()

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        padding: 16,
      }}
    >
      <ClientDetail id={Number(id)} />
    </View>
  )
}
