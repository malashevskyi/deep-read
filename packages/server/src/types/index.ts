export interface AnalysisResponse {
  word: {
    text: string;
    transcription: string;
  };
  example: {
    id: string;
    adaptedSentence: string;
    translation: string;
  };
}
