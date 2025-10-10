import { useQuery } from "@tanstack/react-query";
import { deepReadAPI } from "../services/api";
import {
  AnalysisResponseSchema,
  type AnalysisResponse,
} from "../types/schemas";
import { ApiError } from "../services/ApiError";
import type { AxiosError } from "axios";
import type { ZodError } from "zod";
import { useAppStore } from "../store";
import { useEffect } from "react";
import { toast } from "sonner";

export function useTextAnalysis(): {
  analysisData: AnalysisResponse | null;
  isLoadingText: boolean;
} {
  const text = useAppStore((state) => state.sidebar.selectedText);
  const context = useAppStore((state) => state.sidebar.context);

  const query = useQuery<AnalysisResponse, AxiosError | ZodError>({
    queryKey: ["analysis", text, context],
    queryFn: async () => {
      const res = await deepReadAPI.post("/ai/analyze", { text, context });
      return AnalysisResponseSchema.parse(res.data);
    },
    enabled: !!text && !!context,
    retry: false,
    staleTime: Infinity,
  });

  if (query.error) {
    ApiError.fromUnknown(
      query.error,
      "Failed to analyze the selected text.",
    ).notify();
  }

  return {
    analysisData: query.data ?? null,
    isLoadingText: query.isLoading,
  };
}
