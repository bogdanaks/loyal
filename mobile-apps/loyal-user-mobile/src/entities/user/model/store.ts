import { Platform } from "react-native"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { expoSecureStorage } from "shared/libs/storage"

interface UserState {
  user: User | null
  setUser: (user: User) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => (Platform.OS === "web" ? localStorage : expoSecureStorage)),
    }
  )
)
