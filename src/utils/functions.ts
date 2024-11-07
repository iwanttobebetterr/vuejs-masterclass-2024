import type { CustomAppError } from '@/types/Error'

export const isAppError = (error: unknown): error is CustomAppError => {
  return error instanceof Error && 'errorCode' in error
}
