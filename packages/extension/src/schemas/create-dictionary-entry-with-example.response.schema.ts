/**
 * ⚠️ auto-generated file - do not edit manually
 * 
 * This file was automatically copied from packages/server
 * using the sync-schemas-with-extension.js script.
 * 
 * To modify this schema, edit the source file in packages/server
 * and run: pnpm run sync:schemas
*/

import { z } from 'zod';
import { dictionaryEntryTypeSchema } from './dictionary-entry.schema';

export const createDictionaryEntryWithExampleResponseSchema =
  dictionaryEntryTypeSchema.pick({ text: true });

export type CreateDictionaryEntryWithExampleResponse = z.infer<typeof createDictionaryEntryWithExampleResponseSchema>;
