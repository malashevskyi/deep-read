import { useQuery } from "@tanstack/react-query";
import { deepReadAPI } from "../services/api";
import {
  GenerateAudioSchema,
  type GenerateAudioResponse,
} from "../types/schemas";
import type { ZodError } from "zod";
import type { AxiosError } from "axios";
import { ApiError } from "../services/ApiError";

export function useAudioGeneration(text: string | undefined) {
  const query = useQuery<GenerateAudioResponse, AxiosError | ZodError>({
    queryKey: ["audio", text],
    queryFn: async () => {
      const res = await deepReadAPI.post<GenerateAudioResponse>(
        "/tts/generate-audio",
        {
          text,
        },
      );
      return GenerateAudioSchema.parse(res.data);
    },
    enabled: !!text,
    retry: 1,
    staleTime: Infinity,
  });

  return {
    audioUrl: query.data?.audioUrl,
    audioError: query.error ? ApiError.fromUnknown(query.error) : null,
    isLoadingAudio: query.isLoading,
  };
}
