import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { DictionaryEntry } from '../../dictionary-entries/entities/dictionary-entry.entity.js';

export function IdProperty() {
  return applyDecorators(
    ApiProperty({
      example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      description: 'The unique identifier for the dictionary example.',
    }),
  );
}

export function ExampleProperty() {
  return applyDecorators(
    ApiProperty({
      example: 'The internet has become ubiquitous in modern life.',
      description: 'The full example sentence in English.',
    }),
  );
}

export function TranslationProperty() {
  return applyDecorators(
    ApiProperty({
      example: 'Інтернет став повсюдним у сучасному житті.',
      description: 'The Ukrainian translation of the example sentence.',
    }),
  );
}

export function AccentProperty() {
  return applyDecorators(
    ApiProperty({
      example: 'ubiquitous',
      description: 'The specific word/phrase that is selected.',
    }),
  );
}

export function AccentTranslationProperty() {
  return applyDecorators(
    ApiProperty({
      example: 'повсюдний',
      description: 'The Ukrainian translation of the accent.',
    }),
  );
}

export function AccentTranscriptionProperty() {
  return applyDecorators(
    ApiProperty({
      example: '[juːˈbɪkwɪtəs]',
      description: 'Phonetic transcription of the accent.',
    }),
  );
}

export function DictionaryEntryIdProperty() {
  return applyDecorators(
    ApiProperty({
      example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      description:
        'The ID of the dictionary entry to which this example belongs.',
    }),
  );
}

export function DictionaryEntriesProperty() {
  return applyDecorators(
    ApiProperty({
      type: () => [DictionaryEntry],
      example: [
        {
          id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
          text: 'ubiquitous',
          transcription: '[juːˈbɪkwɪtəs]',
          pronounceVideoLinks: ['https://somewebsite.com/ubiquitous.mp3'],
          translation: 'всюдисущий, повсюдний',
          audioRecords: [
            'https://storage.googleapis.com/leeearning.appspot.com/audio/ubiquitous.mp3?GoogleAccessId=leeearning%40appspot.gserviceaccount.com&Expires=1762796673&Signature=YDnp5WvRO4vymJm%2BuSKlrSiq5ZNrJqFysikd3OmPtMC1qE6qeryraxMS3rmARhy4iVV5KM31bijb09YSDSV2H7CqWIgx....',
          ],
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
          examples: [],
        },
      ],
      description: 'The dictionary entries associated with this example.',
    }),
  );
}

export function CreatedAtProperty() {
  return applyDecorators(
    ApiProperty({
      example: '2024-01-01T00:00:00.000Z',
      description: 'The timestamp when the dictionary example was created.',
    }),
  );
}

export function UpdatedAtProperty() {
  return applyDecorators(
    ApiProperty({
      example: '2024-01-02T00:00:00.000Z',
      description:
        'The timestamp when the dictionary example was last updated.',
    }),
  );
}
