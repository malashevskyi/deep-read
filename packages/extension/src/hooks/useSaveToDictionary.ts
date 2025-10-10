import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deepReadAPI } from "../services/api";
import { toast } from "sonner";
import { ApiError } from "../services/ApiError";
import {
  CreateDictionaryEntrySchema,
  CreateDictionaryEntryWithExampleSchema,
  SaveToDictionaryResponseSchema,
  type CreateDictionaryEntry,
  type CreateDictionaryEntryWithExample,
  type SaveToDictionaryResponse,
} from "../types/schemas";
import type { ZodError } from "zod";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { useAppStore } from "../store";

export function useSaveToDictionary() {
  const queryClient = useQueryClient();
  const showHistory = useAppStore((state) => state.showHistory);

  const mutation = useMutation<
    SaveToDictionaryResponse,
    AxiosError | ZodError,
    { endpoint: string; body: unknown }
  >({
    mutationFn: async ({ endpoint, body }) => {
      const res = await deepReadAPI.post(endpoint, body);
      return SaveToDictionaryResponseSchema.parse(res.data);
    },
    onSuccess: (res) => {
      toast.success(`"${res.text}" has been saved.`);

      queryClient.invalidateQueries({ queryKey: ["wordHistory", res.text] });
      showHistory();
    },
  });

  const saveError = mutation.error
    ? ApiError.fromUnknown(mutation.error)
    : null;

  useEffect(() => {
    if (saveError) toast.error(`Failed to save: ${saveError.message}`);
  }, [saveError]);

  const saveWord = (args: CreateDictionaryEntry): void => {
    try {
      mutation.mutate({
        endpoint: "/dictionary",
        body: CreateDictionaryEntrySchema.parse(args),
      });
    } catch (error) {
      ApiError.fromUnknown(error, "Failed to save the word.").notify();
    }
  };

  const saveWordWithExample = (
    args: CreateDictionaryEntryWithExample,
  ): void => {
    try {
      mutation.mutate({
        endpoint: "/dictionary/with-example",
        body: CreateDictionaryEntryWithExampleSchema.parse(args),
      });
    } catch (error) {
      ApiError.fromUnknown(
        error,
        "Failed to save the word with example.",
      ).notify();
    }
  };

  return {
    saveWord,
    saveWordWithExample,
    isSaving: mutation.isPending,
  };
}
