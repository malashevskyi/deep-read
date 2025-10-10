import { create } from "zustand";

export interface SidebarState {
  isVisible: boolean;
  selectedText: string;
  context: string;
  viewMode: "new" | "history";
}

export interface AnalysisState {
  normalizedText: string;
}

export interface AppState {
  sidebar: SidebarState;
  analysis: AnalysisState;
}

export interface AppActions {
  openSidebar: (selectedText: string, context: string) => void;
  closeSidebar: () => void;
  setViewMode: (mode: "new" | "history") => void;
  showHistory: () => void;
  showNew: () => void;
  setNormalizedText: (text: string) => void;
}

const initialState: AppState = {
  sidebar: {
    isVisible: false,
    selectedText: "",
    context: "",
    viewMode: "new",
  },
  analysis: {
    normalizedText: "",
  },
};

export const useAppStore = create<AppState & AppActions>((set) => ({
  ...initialState,

  openSidebar: (selectedText, context) =>
    set(() => ({
      sidebar: {
        isVisible: true,
        selectedText,
        context,
        viewMode: "new",
      },
    })),

  closeSidebar: () => set(initialState),

  setViewMode: (viewMode) =>
    set((state) => ({
      sidebar: { ...state.sidebar, viewMode },
    })),

  showHistory: () =>
    set((state) => ({
      sidebar: { ...state.sidebar, viewMode: "history" },
    })),

  setNormalizedText: (text) => {
    set((state) => ({
      analysis: { ...state.analysis, normalizedText: text },
    }));
  },

  showNew: () =>
    set((state) => ({
      sidebar: { ...state.sidebar, viewMode: "new" },
    })),
}));
