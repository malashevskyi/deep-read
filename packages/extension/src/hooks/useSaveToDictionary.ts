import { useMutation } from "@tanstack/react-query";
import { deepReadAPI } from "../services/api";
import { toast } from "sonner";
import { ApiError } from "../services/ApiError";
import {
  SaveToDictionarySchema,
  type SaveToDictionaryResponse,
} from "../types/schemas";
import type { ZodError } from "zod";
import type { AxiosError } from "axios";
import { useEffect } from "react";

export function useSaveToDictionary(): {
  saveWord: (args: { text: string; transcription: string }) => void;
  isSaving: boolean;
} {
  const mutation = useMutation<
    SaveToDictionaryResponse,
    AxiosError | ZodError,
    { text: string; transcription: string }
  >({
    mutationFn: async ({
      text,
      transcription,
    }: {
      text: string;
      transcription: string;
    }) => {
      const res = await deepReadAPI.post("/dictionary", {
        text,
        transcription,
      });
      return SaveToDictionarySchema.parse(res.data);
    },
    onSuccess: (res) => toast.success(`"${res.text}" has been saved.`),
  });

  const saveError = mutation.error
    ? ApiError.fromUnknown(mutation.error)
    : null;

  useEffect(() => {
    if (saveError) toast.error(`Failed to save: ${saveError.message}`);
  }, [saveError]);

  return {
    saveWord: mutation.mutate,
    isSaving: mutation.isPending,
  };
}
