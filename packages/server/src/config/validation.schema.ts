import { z } from 'zod';

export const validationSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),

  // POSTGRES_USER: z.string(),
  // POSTGRES_PASSWORD: z.string(),
  // POSTGRES_DB: z.string(),

  OPENAI_API_KEY: z.string(),
  OPENAI_PROJECT_ID: z.string().startsWith('proj_'),
  SENTRY_DSN: z.string().optional().default(''),

  FIREBASE_SERVICE_ACCOUNT_KEY_JSON: z.string(),
  FIREBASE_STORAGE_BUCKET: z.string(),
  PROJECT_NAME: z.string(),
  GOOGLE_CREDENTIALS_JSON: z.string(),
});

export type EnvVariables = z.infer<typeof validationSchema>;
