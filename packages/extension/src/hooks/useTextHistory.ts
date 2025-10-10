import { useQuery } from "@tanstack/react-query";
import { deepReadAPI } from "../services/api";
import { WordHistorySchema, type WordHistoryResponse } from "../types/schemas";
import { ApiError } from "../services/ApiError";
import type { AxiosError } from "axios";
import type { ZodError } from "zod";
import { useAppStore } from "../store";
import { useEffect } from "react";

export function useWordHistory(): {
  historyData: WordHistoryResponse | null;
  isLoadingHistory: boolean;
} {
  const viewMode = useAppStore((state) => state.sidebar.viewMode);
  const normalizedText = useAppStore((state) => state.analysis.normalizedText);

  const query = useQuery<WordHistoryResponse | null, AxiosError | ZodError>({
    queryKey: ["wordHistory", normalizedText, viewMode],
    queryFn: async () => {
      const res = await deepReadAPI.get(`/dictionary/${normalizedText}`);
      if (res.data) {
        return WordHistorySchema.parse(res.data);
      }
      return null;
    },
    enabled: !!normalizedText,
    retry: 1,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (query.error) {
      ApiError.fromUnknown(
        query.error,
        "Failed to fetch word history.",
      ).notify();
    }
  }, [query.error]);

  return {
    historyData: query.data ?? null,
    isLoadingHistory: query.isLoading,
  };
}
