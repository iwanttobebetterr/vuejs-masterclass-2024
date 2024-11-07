import type { CustomAppError, ExtendedPostgrestError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<CustomAppError | ExtendedPostgrestError | null>(null)
  const isCustomError = ref(false)

  const setError = ({
    error,
    errorCode,
  }: {
    error: string | PostgrestError | Error
    errorCode?: number
  }) => {
    if (typeof error === 'string') {
      isCustomError.value = true
      activeError.value = Error(error)
      activeError.value.customCode = errorCode || 500
      return
    }

    if (error instanceof Error) {
      activeError.value = error
      activeError.value.customCode = errorCode || 500
      return
    }

    activeError.value = error
    activeError.value.statusCode = errorCode || 500
  }

  const clearError = () => {
    activeError.value = null
    isCustomError.value = false
  }

  return {
    activeError,
    setError,
    clearError,
    isCustomError,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot))
}
