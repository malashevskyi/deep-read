export interface AnalysisResponse {
  word: {
    text: string;
    transcription: string;
    audioUrl: string;
    storagePath: string;
  };
  example: {
    id: string;
    adaptedSentence: string;
    translation: string;
  };
}
