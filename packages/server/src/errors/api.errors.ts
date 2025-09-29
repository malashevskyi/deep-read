export enum AppErrorCode {
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  VALIDATION_FAILED = 'VALIDATION_FAILED',
}

/**
 * The base class for all custom application errors.
 * It ensures that every error has a structure that our global exception
 * filter can understand and handle consistently.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: AppErrorCode;
  public readonly internalMessage: string;

  /**
   * @param errorCode The code for the frontend to identify the error.
   * @param statusCode The HTTP status code for the response.
   * @param internalMessage A detailed message for logging, not shown to the user.
   */
  constructor(
    errorCode: AppErrorCode,
    statusCode: number,
    internalMessage: string,
  ) {
    super(`Application Error: ${errorCode}`);

    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.internalMessage = internalMessage;
  }
}
