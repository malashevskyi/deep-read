import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { AppErrorCode } from '../shared/exceptions/AppErrorCode';
import { AppError } from '../shared/exceptions/AppError';

@Injectable()
export class ErrorService {
  private readonly logger = new Logger('ErrorService');

  /**
   * Logs an error and throws a standardized AppError.
   * This is the central point for handling known application errors.
   * @param errorCode The internal error code for this type of error.
   * @param message A descriptive message for logging.
   * @param originalError The original exception that was caught.
   * @param statusCode The HTTP status code to return.
   */
  handle(
    errorCode: AppErrorCode,
    message: string,
    originalError: unknown,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ): never {
    this.logger.error(
      message,
      originalError instanceof Error ? originalError.stack : originalError,
    );

    throw new AppError(errorCode, statusCode, message, originalError);
  }
}
