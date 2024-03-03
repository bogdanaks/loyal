import React from "react"

interface Theme {
  colors: {
    background: string
    primary: string
    primaryForeground: string
    muted: string
    mutedForeground: string
    input: string
  }
}

export const MyThemeContext = React.createContext<Theme>({
  colors: {
    background: "",
    primary: "",
    primaryForeground: "",
    muted: "",
    mutedForeground: "",
    input: "",
  },
})

MyThemeContext.displayName = "MyThemeContext"

export const useMyTheme = () => {
  const theme = React.useContext(MyThemeContext)
  return theme
}
