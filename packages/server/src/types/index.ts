export interface AnalysisResponse {
  word: {
    text: string;
    transcription: string;
    translation: string;
  };
  example: {
    id: string;
    adaptedSentence: string;
    translation: string;
  };
}
