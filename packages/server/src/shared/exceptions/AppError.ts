import { AppErrorCode } from './AppErrorCode.js';

/**
 * The base class for all custom application errors.
 * It ensures that every error has a structure that our global exception
 * filter can understand and handle consistently.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: AppErrorCode;
  public override readonly message: string;
  public readonly error: unknown;

  /**
   * @param errorCode The code for the frontend to identify the error.
   * @param statusCode The HTTP status code for the response.
   * @param message A detailed message for logging, not shown to the user.
   * @param error The original error object, if available.
   */
  constructor(
    errorCode: AppErrorCode,
    statusCode: number,
    message: string,
    error: unknown,
  ) {
    super(`Application Error: ${errorCode}`);

    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}
