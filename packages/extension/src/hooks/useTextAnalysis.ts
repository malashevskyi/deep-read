import { useQuery } from "@tanstack/react-query";
import { deepReadAPI } from "../services/api";
import {
  AnalysisResponseSchema,
  type AnalysisResponse,
} from "../types/schemas";
import { ApiError } from "../services/ApiError";
import type { AxiosError } from "axios";
import type { ZodError } from "zod";

export function useTextAnalysis(text: string, context: string) {
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

  return {
    analysisData: query.data ?? null,
    analysisError: query.error ? ApiError.fromUnknown(query.error) : null,
    isLoadingText: query.isLoading,
  };
}
