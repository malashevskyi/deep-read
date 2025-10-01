import axios from "axios";
import type { AnalysisResponse } from "../types";
import { ApiError } from "./ApiError";
import { AnalysisResponseSchema } from "../types/schemas";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const deepReadAPI = axios.create({
  baseURL: API_BASE_URL,
});

deepReadAPI.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(ApiError.fromAxiosError(error)),
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
