export abstract class TextToSpeechPort {
  abstract generateAudioBuffer(text: string, lang?: string): Promise<Buffer>;
}
