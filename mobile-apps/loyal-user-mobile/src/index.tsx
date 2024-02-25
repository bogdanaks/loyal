import { StyleSheet, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { TabBar } from "widgets/ui/tab-bar/tab-bar"

export default function AppIndex() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <TabBar />
      </View>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})
