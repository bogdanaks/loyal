import { NavigationContainer } from "@react-navigation/native"
import { AuthScreen } from "processes/auth-screen"

import { MyThemeContext } from "shared/hooks/use-my-theme"

const MyTheme = {
  colors: {
    background: "#fff",
    primary: "#2563eb",
    primaryForeground: "#f8fafc",
    muted: "#f1f5f9",
    mutedForeground: "#64748b",
    input: "#e2e8f0",
  },
}

export default function AppIndex() {
  return (
    <MyThemeContext.Provider value={MyTheme}>
      <NavigationContainer>
        <AuthScreen />
      </NavigationContainer>
    </MyThemeContext.Provider>
  )
}
