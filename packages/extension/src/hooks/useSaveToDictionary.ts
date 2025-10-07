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

export function useSaveToDictionary() {
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

  if (saveError) toast.error(`Failed to save: ${saveError.message}`);

  return {
    saveWord: mutation.mutate,
    isSaving: mutation.isPending,
    saveError,
  };
}
