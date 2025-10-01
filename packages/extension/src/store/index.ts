import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { analyzeText as fetchAnalysis, generateAudio } from "../services/api";
import type { ApiError } from "../services/ApiError";
import { produce } from "immer";
import type { AnalysisResponse } from "../types/schemas";

export interface SidebarState {
  isVisible: boolean;
  selectedText: string;
  context: string;
}

export interface AnalysisState {
  isLoadingText: boolean;
  isLoadingAudio: boolean;
  data: AnalysisResponse | null;
  audioUrl: string | null;
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
    context: "",
  },
  analysis: {
    isLoadingText: false,
    isLoadingAudio: false,
    data: null,
    audioUrl: null,
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
      if (get().analysis.isLoadingText || get().analysis.isLoadingAudio) return;

      set(
        produce((state: AppState) => {
          state.sidebar.isVisible = true;
          state.sidebar.selectedText = selectedText;
          state.sidebar.context = context;
          state.analysis.isLoadingText = true;
          state.analysis.isLoadingAudio = true;
          state.analysis.audioUrl = null;
          state.analysis.data = null;
          state.analysis.error = null;
        }),
      );

      const { data, error: analysisError } = await fetchAnalysis({
        text: selectedText,
        context,
      });

      set(
        produce((state: AppState) => {
          state.analysis.isLoadingText = false;
          if (analysisError) {
            state.analysis.error = analysisError;
          } else if (data) {
            state.analysis.data = data;
          }
        }),
      );

      const { data: audioData, error: audioError } = await generateAudio(
        selectedText,
      );
      set(
        produce((state: AppState) => {
          state.analysis.isLoadingAudio = false;
          if (audioError) {
            state.analysis.error = audioError;
          } else if (audioData) {
            state.analysis.audioUrl = audioData.audioUrl;
          }
        }),
      );
    },
  })),
);
