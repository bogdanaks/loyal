import { StyleSheet, View } from "react-native"
import { NavigationTabBar } from "widgets/ui/navigation-tab-bar/navigation-tab-bar"

export const AppScreen = () => {
  return (
    <View style={styles.container}>
      <NavigationTabBar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})
