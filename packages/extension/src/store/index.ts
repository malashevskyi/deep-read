import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { analyzeText as fetchAnalysis } from "../services/api";
import type { AnalysisResponse } from "../types";
import type { ApiError } from "../services/ApiError";
import { produce } from "immer";

export interface SidebarState {
  isVisible: boolean;
  selectedText: string;
}

export interface AnalysisState {
  isLoading: boolean;
  data: AnalysisResponse | null;
  error: ApiError | null;
}

export interface AppState {
  sidebar: SidebarState;
  analysis: AnalysisState;
}

export interface AppActions {
  startAnalysis: (selectedText: string, context: string) => Promise<void>;
  closeSidebar: () => void;
}

const initialState: AppState = {
  sidebar: {
    isVisible: false,
    selectedText: "",
  },
  analysis: {
    isLoading: false,
    data: null,
    error: null,
  },
};

export const useAppStore = create<AppState & AppActions>()(
  immer((set, get) => ({
    ...initialState,

    closeSidebar: () =>
      set(
        produce((state: AppState) => {
          state.sidebar = initialState.sidebar;
          state.analysis = initialState.analysis;
        }),
      ),

    startAnalysis: async (selectedText: string, context: string) => {
      if (get().analysis.isLoading) return;
      set(
        produce((state: AppState) => {
          state.sidebar.isVisible = true;
          state.sidebar.selectedText = selectedText;
          state.analysis.isLoading = true;
          state.analysis.data = null;
          state.analysis.error = null;
        }),
      );

      const { data, error } = await fetchAnalysis({
        text: selectedText,
        context,
      });

      set(
        produce((state: AppState) => {
          state.analysis.isLoading = false;
          if (error) {
            state.analysis.error = error;
          } else if (data) {
            state.analysis.data = data;
          }
        }),
      );
    },
  })),
);
