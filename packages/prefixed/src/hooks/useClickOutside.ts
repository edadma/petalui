import { useEffect, useRef, type RefObject } from 'react'

/**
 * Hook that detects clicks outside of a referenced element.
 * Useful for closing dropdowns, modals, or menus.
 *
 * @param handler - Callback when click outside is detected
 * @param enabled - Whether the listener is active (default: true)
 * @returns Ref to attach to the element
 *
 * @example
 * const ref = useClickOutside(() => setIsOpen(false))
 *
 * <div ref={ref}>
 *   <Dropdown>...</Dropdown>
 * </div>
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled = true
): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!enabled) return

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current
      if (!el || el.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [handler, enabled])

  return ref
}
