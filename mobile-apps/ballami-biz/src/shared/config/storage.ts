import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store"
import { Platform } from "react-native"

export const saveAuthToken = async (value: string) => {
  if (Platform.OS === "web") {
    window.localStorage.setItem("authTokenUser", value)
    return
  }
  await setItemAsync("authTokenUser", value)
}

export const getAuthToken = async () => {
  if (Platform.OS === "web") {
    return window.localStorage.getItem("authTokenUser")
  }
  return await getItemAsync("authTokenUser")
}

export const removeAuthToken = async () => {
  if (Platform.OS === "web") {
    window.localStorage.removeItem("authTokenUser")
    return
  }
  await deleteItemAsync("authTokenUser")
}

export const expoSecureStorage = {
  setItem: async (key: string, value: string) => await setItemAsync(key, value),
  getItem: async (key: string) => (await getItemAsync(key)) as Promise<string> | null,
  removeItem: async (key: string) => await deleteItemAsync(key),
}
