import type { ApiError } from '@app-types/api';

export function formatError(error: unknown): string {
  if (typeof error === 'string') return error;

  if (error !== null && typeof error === 'object') {
    const apiErr = error as Partial<ApiError>;
    if (typeof apiErr.error === 'string') return apiErr.error;

    const errObj = error as { message?: unknown };
    if (typeof errObj.message === 'string') return errObj.message;
  }

  return 'An unexpected error occurred. Please try again.';
}

export function isApiErrorWithStatus(error: unknown, status: number): boolean {
  if (error !== null && typeof error === 'object') {
    const apiErr = error as Partial<ApiError>;
    return apiErr.statusCode === status;
  }
  return false;
}
