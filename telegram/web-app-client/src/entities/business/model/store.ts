import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BusinessState {
  account: BusinessAccount | null;
  setAccount: (account: BusinessAccount) => void;
}

export const useBusinessStore = create<BusinessState>()(
  persist(
    (set) => ({
      account: null,
      setAccount: (account: BusinessAccount) => set({ account }),
    }),
    {
      name: "biz-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
