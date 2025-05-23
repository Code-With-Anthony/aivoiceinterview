import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  name: string;
  email: string;
  authProvider?: string;
  role?: string;
};

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => {
        set({ user: null });
        // Clear the persisted storage
        localStorage.removeItem("user-storage");
        localStorage.removeItem("token");
      },

      hasHydrated: false,
      setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }),
    {
      name: "user-storage", // localStorage key
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
