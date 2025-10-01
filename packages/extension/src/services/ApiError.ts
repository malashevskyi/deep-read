import { AxiosError, isAxiosError } from "axios";
import { safeGetNumber, safeGetString } from "../types/utils";
import { captureError } from "../utils/sentry";

export class ApiError extends Error {
  statusCode: number;
  errorCode: string;
  originalError: unknown;

  private constructor(
    message: string,
    statusCode: number,
    errorCode: string,
    originalError?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.originalError = originalError;
  }

  static fromAxiosError(error: AxiosError): ApiError {
    const statusCode = error.response?.status ?? 500;
    const data = error.response?.data;

    captureError(error, {
      context: "ApiError.fromAxiosError",
      statusCode,
      data,
    });

    const message =
      safeGetString(data, "message") ??
      error.message ??
      "Something went wrong with the request";
    const errorCode = safeGetString(data, "errorCode") ?? "axios_error";

    return new ApiError(message, statusCode, errorCode, error);
  }

  static fromUnknown(error: unknown): ApiError {
    if (error instanceof ApiError) return error;
    if (isAxiosError(error)) {
      return ApiError.fromAxiosError(error);
    }
    let statusCode = safeGetNumber(error, "statusCode") ?? 500;
    let errorCode = safeGetString(error, "errorCode") ?? "unknown_error";

    captureError(error, {
      context: "ApiError.fromUnknown",
      statusCode,
      errorCode,
    });

    return new ApiError(
      error instanceof Error ? error.message : "Unknown error",
      statusCode,
      errorCode,
      error,
    );
  }
}
