import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { analyzeText } from "../services/api";
import axios from "axios";

export interface AppState {
  isSidebarVisible: boolean;
  isLoading: boolean;
  selectedText: string;
  explanation: string | null;
  error: string | null;
}

export interface AppActions {
  analyzeText: (text: string) => Promise<void>;
  closeSidebar: () => void;
}

export const useAppStore = create<AppState & AppActions>()(
  immer((set, get) => ({
    isSidebarVisible: false,
    isLoading: false,
    selectedText: "",
    explanation: null,
    error: null,

    closeSidebar: () =>
      set({
        isSidebarVisible: false,
        isLoading: false,
        selectedText: "",
        explanation: null,
        error: null,
      }),

    analyzeText: async (text: string) => {
      if (get().isLoading) return;

      set((state) => {
        state.isSidebarVisible = true;
        state.isLoading = true;
        state.selectedText = text;
        state.explanation = null;
        state.error = null;
      });

      try {
        const result = await analyzeText(text);
        set((state) => {
          state.explanation = result;
        });
      } catch (err) {
        const errorMessage = axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : "An unknown error occurred.";
        set((state) => {
          state.error = errorMessage;
        });
      } finally {
        set((state) => {
          state.isLoading = false;
        });
      }
    },
  })),
);
