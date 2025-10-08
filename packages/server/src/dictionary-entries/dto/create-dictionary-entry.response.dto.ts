import { z } from 'zod';
import FindOrCreateDictionaryEntryResponseSchema from '../schemas/find-or-create-dictionary-entry.response.schema';

export type FindOrCreateDictionaryEntryResponseDto = z.infer<
  typeof FindOrCreateDictionaryEntryResponseSchema
>;
