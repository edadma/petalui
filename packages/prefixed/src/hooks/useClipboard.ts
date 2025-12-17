import { useState, useCallback } from 'react'

export interface UseClipboardReturn {
  copy: (text: string) => Promise<boolean>
  copied: boolean
  error: Error | null
  reset: () => void
}

/**
 * Hook for copying text to clipboard with success/error state.
 *
 * @param timeout - Duration in ms to show copied state (default: 2000)
 * @returns Object with copy function and state
 *
 * @example
 * const { copy, copied } = useClipboard()
 *
 * <Button onClick={() => copy('Hello!')}>
 *   {copied ? 'Copied!' : 'Copy'}
 * </Button>
 */
export function useClipboard(timeout = 2000): UseClipboardReturn {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const copy = useCallback(async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setError(null)

      setTimeout(() => setCopied(false), timeout)
      return true
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to copy'))
      setCopied(false)
      return false
    }
  }, [timeout])

  const reset = useCallback(() => {
    setCopied(false)
    setError(null)
  }, [])

  return { copy, copied, error, reset }
}
