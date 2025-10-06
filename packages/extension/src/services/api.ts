import axios, { AxiosError } from "axios";
import { ApiError } from "./ApiError";
import {
  AnalysisResponseSchema,
  GenerateAudioSchema,
  SaveToDictionarySchema,
  type AnalysisResponse,
  type GenerateAudioResponse,
  type SaveToDictionaryResponse,
} from "../types/schemas";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const deepReadAPI = axios.create({
  baseURL: API_BASE_URL,
});

deepReadAPI.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => Promise.reject(ApiError.fromAxiosError(error)),
);

export interface AnalysisPayload {
  text: string;
  context: string;
}

export interface DeepReadApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

/**
 * Calls the DeepRead API to get a full analysis of the selected text within its context.
 * @param payload - An object containing the selected text and its surrounding context.
 * @returns A promise that resolves to an object with data or error.
 */
export async function analyzeText(
  payload: AnalysisPayload,
): Promise<DeepReadApiResponse<AnalysisResponse>> {
  try {
    const response = await deepReadAPI.post<AnalysisResponse>(
      "/ai/analyze",
      payload,
    );
    const parsed = AnalysisResponseSchema.parse(response.data);

    return { data: parsed, error: null };
  } catch (error) {
    return { data: null, error: ApiError.fromUnknown(error) };
  }
}

/**
 * Calls the DeepRead API to generate audio from the given text.
 * @param text - The text to generate audio for.
 * @returns A promise that resolves to an object with data or error.
 */
export async function generateAudio(
  text: string,
): Promise<DeepReadApiResponse<GenerateAudioResponse>> {
  try {
    const response = await deepReadAPI.post<GenerateAudioResponse>(
      "/tts/generate-audio",
      { text },
    );
    const parsed = GenerateAudioSchema.parse(response.data);

    return { data: parsed, error: null };
  } catch (error) {
    return { data: null, error: ApiError.fromUnknown(error) };
  }
}

/**
 * Saves a word/phrase to the user's dictionary.
 * @param payload - The data for the new dictionary entry.
 * @returns A promise that resolves to the created dictionary entry (або `void`).
 */
export async function saveToDictionary(
  text: string,
  transcription: string,
): Promise<DeepReadApiResponse<SaveToDictionaryResponse>> {
  try {
    const response = await deepReadAPI.post("/dictionary", {
      text,
      transcription,
    });
    const parsed = SaveToDictionarySchema.parse(response.data);

    return { data: parsed, error: null };
  } catch (error) {
    return {
      data: null,
      error: ApiError.fromUnknown(error) as unknown as ApiError,
    };
  }
}
