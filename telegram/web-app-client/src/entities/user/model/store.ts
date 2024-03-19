import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  me: Partial<User> | null;
  setMe: (user: Partial<User>) => void;
  nonce: number;
  incrementNonce: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      me: null,
      nonce: 0,
      setMe: (user: Partial<User>) => set({ me: { ...user } }),
      incrementNonce: () => set((state) => ({ nonce: state.nonce + 1 })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
