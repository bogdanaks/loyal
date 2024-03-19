import { Image } from "expo-image"
import { StyleSheet, Text, View } from "react-native"

import { config } from "shared/config"
import { phoneMask } from "shared/config/masks"
import { theme } from "shared/config/theme"
import { MaskedText } from "shared/ui/masked-text"

interface Props {
  user: User
}

export const UserRow = ({ user }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={`${config.apiDomain}/static/users/${user.photo}`}
        contentFit="cover"
        transition={100}
      />
      <View style={styles.info}>
        <Text style={styles.name}>
          {user.first_name} {user.last_name}
        </Text>
        <MaskedText mask={phoneMask} style={styles.phone}>
          {user.phone}
        </MaskedText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  info: {
    flexDirection: "column",
    marginLeft: 8,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  phone: {
    fontSize: 14,
    color: theme.accentForeground,
  },
})
