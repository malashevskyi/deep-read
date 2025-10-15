import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDictionaryExampleDto } from '../../dictionary-examples/dto/create-dictionary-example.dto';

export function TextProperty() {
  return applyDecorators(
    ApiProperty({
      example: 'ubiquitous',
      description: 'The word or phrase to save to the dictionary.',
    }),
  );
}

export function TranscriptionProperty() {
  return applyDecorators(
    ApiProperty({
      example: '[juːˈbɪkwɪtəs]',
      description: 'Phonetic transcription of the word.',
    }),
  );
}

export function AudioRecordsProperty() {
  return applyDecorators(
    ApiProperty({
      type: [String],
      example: [
        'https://storage.googleapis.com/leeearning.appspot.com/audio/ubiquitous.mp3?GoogleAccessId=leeearning%40appspot.gserviceaccount.com&Expires=1762796673&Signature=YDnp5WvRO4vymJm%2BuSKlrSiq5ZNrJqFysikd3OmPtMC1qE6qeryraxMS3rmARhy4iVV5KM31bijb09YSDSV2H7CqWIgx....',
      ],
    }),
  );
}

export function PronounceVideoLinksProperty() {
  return applyDecorators(
    ApiProperty({
      type: [String],
      example: ['https://somewebsite.com/ubiquitous.mp3'],
      description:
        'Links to videos demonstrating the pronunciation of the word or phrase.',
    }),
  );
}

export function TranslationProperty() {
  return applyDecorators(
    ApiProperty({
      example: 'всюдисущий, повсюдний',
      description:
        'Translation of the word or phrase, aggregated from all translations in all examples for this word or phrase.',
    }),
  );
}

export function ExampleProperty() {
  return applyDecorators(
    ApiProperty({
      type: () => CreateDictionaryExampleDto,
      description: 'An example sentence or usage for the dictionary entry.',
    }),
  );
}

export function ExamplesProperty() {
  return applyDecorators(
    ApiProperty({
      type: () => CreateDictionaryExampleDto,
      description:
        'An array of example sentences or usages for the dictionary entry.',
      isArray: true,
    }),
  );
}
