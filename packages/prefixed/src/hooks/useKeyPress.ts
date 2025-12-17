import { useState, useEffect, useCallback } from 'react'

export interface UseKeyPressOptions {
  /** Target element (default: window) */
  target?: HTMLElement | Window | null
  /** Event type: 'keydown' | 'keyup' (default: 'keydown') */
  event?: 'keydown' | 'keyup'
  /** Prevent default browser behavior */
  preventDefault?: boolean
}

/**
 * Hook that detects when a specific key is pressed.
 *
 * @param targetKey - Key to detect (e.g., 'Enter', 'Escape', 'a')
 * @param options - Configuration options
 * @returns Whether the key is currently pressed
 *
 * @example
 * const enterPressed = useKeyPress('Enter')
 * const escapePressed = useKeyPress('Escape')
 *
 * useEffect(() => {
 *   if (escapePressed) closeModal()
 * }, [escapePressed])
 *
 * @example
 * // With callback for immediate action
 * useKeyPress('Escape', { preventDefault: true })
 */
export function useKeyPress(
  targetKey: string,
  options: UseKeyPressOptions = {}
): boolean {
  const { target, event = 'keydown', preventDefault = false } = options
  const [keyPressed, setKeyPressed] = useState(false)

  const downHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        if (preventDefault) e.preventDefault()
        setKeyPressed(true)
      }
    },
    [targetKey, preventDefault]
  )

  const upHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        setKeyPressed(false)
      }
    },
    [targetKey]
  )

  useEffect(() => {
    const targetElement = target ?? window

    if (event === 'keydown') {
      targetElement.addEventListener('keydown', downHandler as EventListener)
      targetElement.addEventListener('keyup', upHandler as EventListener)
    } else {
      targetElement.addEventListener('keyup', downHandler as EventListener)
    }

    return () => {
      targetElement.removeEventListener('keydown', downHandler as EventListener)
      targetElement.removeEventListener('keyup', upHandler as EventListener)
    }
  }, [target, event, downHandler, upHandler])

  return keyPressed
}

/**
 * Hook that calls a callback when a specific key is pressed.
 *
 * @param targetKey - Key to detect
 * @param callback - Function to call when key is pressed
 * @param options - Configuration options
 *
 * @example
 * useKeyPressCallback('Escape', () => closeModal())
 * useKeyPressCallback('Enter', () => submitForm(), { preventDefault: true })
 */
export function useKeyPressCallback(
  targetKey: string,
  callback: (event: KeyboardEvent) => void,
  options: UseKeyPressOptions = {}
): void {
  const { target, event = 'keydown', preventDefault = false } = options

  useEffect(() => {
    const targetElement = target ?? window

    const handler = (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        if (preventDefault) e.preventDefault()
        callback(e)
      }
    }

    targetElement.addEventListener(event, handler as EventListener)
    return () => targetElement.removeEventListener(event, handler as EventListener)
  }, [target, targetKey, callback, event, preventDefault])
}
