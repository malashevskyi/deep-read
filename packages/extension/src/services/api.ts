import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const deepReadAPI = axios.create({
  baseURL: API_BASE_URL,
});

interface AnalyzeResponse {
  explanation: string;
}

/**
 * Calls the DeepRead API to get an AI-powered explanation for the given text.
 * @param text The text to analyze.
 * @returns A promise that resolves to the explanation string.
 */
export async function analyzeText(text: string): Promise<string> {
  const response = await deepReadAPI.post<AnalyzeResponse>("/ai/analyze", {
    text,
  });
  return response.data.explanation;
}
