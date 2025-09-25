import { APIError } from 'openai';

export function isAPIError(error: unknown): error is APIError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'headers' in error &&
    typeof (error as { status?: unknown }).status === 'number'
  );
}
