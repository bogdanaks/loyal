import { Platform } from "react-native"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { expoSecureStorage } from "shared/libs/storage"

interface AuthState {
  isAuth: boolean
  setIsAuth: (toggle: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuth: false,
      setIsAuth: (toggle) => set({ isAuth: toggle }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => (Platform.OS === "web" ? localStorage : expoSecureStorage)),
    }
  )
)
