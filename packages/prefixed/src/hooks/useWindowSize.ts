import { useState, useEffect } from 'react'

export interface WindowSize {
  width: number
  height: number
}

/**
 * Hook that tracks window dimensions.
 * Updates on window resize.
 *
 * @returns Object with current width and height
 *
 * @example
 * const { width, height } = useWindowSize()
 *
 * return (
 *   <div>
 *     Window: {width} x {height}
 *     {width < 768 && <MobileNav />}
 *   </div>
 * )
 */
export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>(() => {
    if (typeof window === 'undefined') {
      return { width: 0, height: 0 }
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
