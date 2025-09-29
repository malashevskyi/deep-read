import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as Sentry from '@sentry/node';
import { AppError, AppErrorCode } from '@/errors/api.errors';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    Sentry.captureException(exception);

    await Sentry.flush(2000);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = AppErrorCode.UNKNOWN_ERROR;

    if (exception instanceof AppError) {
      status = exception.statusCode;
      errorCode = exception.errorCode;
      this.logger.warn(
        `Handled known application error: ${errorCode} for path: ${request.url}`,
      );
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      this.logger.error(
        `Caught an unhandled HttpException for path: ${request.url}`,
        exception.stack,
      );
    } else {
      this.logger.error(
        `Caught a generic unhandled exception for path: ${request.url}`,
        (exception as Error).stack,
      );
    }

    response.status(status).json({
      statusCode: status,
      errorCode: errorCode,
    });
  }
}
