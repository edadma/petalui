import React, { ReactNode } from 'react'
import { useBreakpoint, Breakpoint } from '../hooks/useBreakpoint'

export interface ShowProps {
  children: ReactNode
  above?: Breakpoint
  below?: Breakpoint
  at?: Breakpoint | Breakpoint[]
  between?: [Breakpoint, Breakpoint]
}

export function Show({ children, above, below, at, between }: ShowProps): React.ReactElement | null {
  const { isAbove, isBelow, isAt, isBetween } = useBreakpoint()

  let shouldShow = false

  if (above !== undefined) {
    shouldShow = isAbove(above)
  } else if (below !== undefined) {
    shouldShow = isBelow(below)
  } else if (at !== undefined) {
    if (Array.isArray(at)) {
      shouldShow = at.some((bp) => isAt(bp))
    } else {
      shouldShow = isAt(at)
    }
  } else if (between !== undefined) {
    shouldShow = isBetween(between[0], between[1])
  } else {
    shouldShow = true
  }

  return shouldShow ? <>{children}</> : null
}

export interface HideProps {
  children: ReactNode
  above?: Breakpoint
  below?: Breakpoint
  at?: Breakpoint | Breakpoint[]
  between?: [Breakpoint, Breakpoint]
}

export function Hide({ children, above, below, at, between }: HideProps): React.ReactElement | null {
  const { isAbove, isBelow, isAt, isBetween } = useBreakpoint()

  let shouldHide = false

  if (above !== undefined) {
    shouldHide = isAbove(above)
  } else if (below !== undefined) {
    shouldHide = isBelow(below)
  } else if (at !== undefined) {
    if (Array.isArray(at)) {
      shouldHide = at.some((bp) => isAt(bp))
    } else {
      shouldHide = isAt(at)
    }
  } else if (between !== undefined) {
    shouldHide = isBetween(between[0], between[1])
  }

  return shouldHide ? null : <>{children}</>
}
