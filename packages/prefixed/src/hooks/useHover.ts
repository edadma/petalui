import { useState, useRef, useEffect, type RefObject } from 'react'

export interface UseHoverReturn<T extends HTMLElement> {
  ref: RefObject<T | null>
  isHovered: boolean
}

/**
 * Hook that tracks hover state of an element.
 *
 * @returns Object with ref and isHovered state
 *
 * @example
 * const { ref, isHovered } = useHover<HTMLDivElement>()
 *
 * <div ref={ref} className={isHovered ? 'bg-blue-500' : 'bg-gray-500'}>
 *   Hover me!
 * </div>
 */
export function useHover<T extends HTMLElement = HTMLElement>(): UseHoverReturn<T> {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    node.addEventListener('mouseenter', handleMouseEnter)
    node.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter)
      node.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return { ref, isHovered }
}
