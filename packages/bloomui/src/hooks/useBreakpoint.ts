import { useState, useEffect } from 'react'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const breakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']

function getBreakpoint(width: number): Breakpoint {
  if (width >= breakpoints['2xl']) return '2xl'
  if (width >= breakpoints.xl) return 'xl'
  if (width >= breakpoints.lg) return 'lg'
  if (width >= breakpoints.md) return 'md'
  if (width >= breakpoints.sm) return 'sm'
  return 'xs'
}

function compareBreakpoints(a: Breakpoint, b: Breakpoint): number {
  return breakpointOrder.indexOf(a) - breakpointOrder.indexOf(b)
}

export interface UseBreakpointReturn {
  breakpoint: Breakpoint
  width: number
  isAbove: (bp: Breakpoint) => boolean
  isBelow: (bp: Breakpoint) => boolean
  isAt: (bp: Breakpoint) => boolean
  isBetween: (min: Breakpoint, max: Breakpoint) => boolean
}

export function useBreakpoint(): UseBreakpointReturn {
  const [width, setWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const breakpoint = getBreakpoint(width)

  return {
    breakpoint,
    width,
    isAbove: (bp: Breakpoint) => compareBreakpoints(breakpoint, bp) >= 0,
    isBelow: (bp: Breakpoint) => compareBreakpoints(breakpoint, bp) < 0,
    isAt: (bp: Breakpoint) => breakpoint === bp,
    isBetween: (min: Breakpoint, max: Breakpoint) =>
      compareBreakpoints(breakpoint, min) >= 0 && compareBreakpoints(breakpoint, max) <= 0,
  }
}
