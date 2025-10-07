import { create } from "zustand";

export interface SidebarState {
  isVisible: boolean;
  selectedText: string;
  context: string;
}

export interface AppState {
  sidebar: SidebarState;
}

export interface AppActions {
  openSidebar: (selectedText: string, context: string) => void;
  closeSidebar: () => void;
}

const initialState: AppState = {
  sidebar: {
    isVisible: false,
    selectedText: "",
    context: "",
  },
};

export const useAppStore = create<AppState & AppActions>((set) => ({
  ...initialState,

  openSidebar: (selectedText, context) =>
    set({
      sidebar: {
        isVisible: true,
        selectedText,
        context,
      },
    }),

  closeSidebar: () => set(initialState),
}));
