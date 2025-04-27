import { create } from 'zustand'

interface SidebarMenuStore {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
}

export const useSidebarMenuStore = create<SidebarMenuStore>((set) => ({
  selectedMenu: 'dashboard', // default
  setSelectedMenu: (menu) => set({ selectedMenu: menu }),
}));
