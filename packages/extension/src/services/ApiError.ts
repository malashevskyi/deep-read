import { AxiosError, isAxiosError } from "axios";

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
    const data = error.response?.data as any;

    return new ApiError(
      data?.message ?? error.message,
      statusCode,
      data?.errorCode ?? "axios_error",
      error,
    );
  }

  static fromUnknown(error: unknown): ApiError {
    if (error instanceof ApiError) return error;
    if (isAxiosError(error)) {
      return ApiError.fromAxiosError(error);
    }
    let statusCode = 500;
    let errorCode = "unknown_error";
    if (typeof error === "object" && error !== null) {
      if ("statusCode" in error && typeof error.statusCode === "number") {
        statusCode = error.statusCode;
      }
      if ("errorCode" in error && typeof error.errorCode === "string") {
        errorCode = error.errorCode;
      }
    }
    return new ApiError(
      error instanceof Error ? error.message : "Unknown error",
      statusCode,
      errorCode,
      error,
    );
  }
}
