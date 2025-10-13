import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "sonner";
import type { ZodError } from "zod";
import {
  createDictionaryEntryWithExampleResponseSchema,
  type CreateDictionaryEntryWithExampleResponse,
} from "../schemas/create-dictionary-entry-with-example.response.schema";
import { deepReadAPI } from "../services/api";
import { ApiError } from "../services/ApiError";
import { useAppStore } from "../store";
import {
  createDictionaryEntryWithExampleBodySchema,
  type CreateDictionaryEntryWithExampleBody,
} from "../schemas/create-dictionary-entry-with-example.body.schema";

export function useSaveToDictionary() {
  const queryClient = useQueryClient();
  const showHistory = useAppStore((state) => state.showHistory);

  const mutation = useMutation<
    CreateDictionaryEntryWithExampleResponse,
    AxiosError | ZodError,
    { endpoint: string; body: unknown }
  >({
    mutationFn: async ({ endpoint, body }) => {
      const res = await deepReadAPI.post(endpoint, body);
      return createDictionaryEntryWithExampleResponseSchema.parse(res.data);
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

  // TODO: figure out do we need this or not
  // const saveWord = (args: CreateDictionaryEntry): void => {
  //   try {
  //     mutation.mutate({
  //       endpoint: "/dictionary",
  //       body: CreateDictionaryEntrySchema.parse(args),
  //     });
  //   } catch (error) {
  //     ApiError.fromUnknown(error, "Failed to save the word.").notify();
  //   }
  // };

  const saveWordWithExample = (
    args: CreateDictionaryEntryWithExampleBody,
  ): void => {
    try {
      mutation.mutate({
        endpoint: "/dictionary/with-example",
        body: createDictionaryEntryWithExampleBodySchema.parse(args),
      });
    } catch (error) {
      ApiError.fromUnknown(
        error,
        "Failed to save the word with example.",
      ).notify();
    }
  };

  return {
    // saveWord,
    saveWordWithExample,
    isSaving: mutation.isPending,
  };
}
