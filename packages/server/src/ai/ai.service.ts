import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  analyzeText(text: string) {
    return {
      explanation: `This is a mock explanation for the word: "${text}".`,
    };
  }
}
