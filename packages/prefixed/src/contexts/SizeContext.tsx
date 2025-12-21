import React, { createContext, useContext } from 'react'

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const SizeContext = createContext<Size | undefined>(undefined)

export interface SizeProviderProps {
  /** Size to provide to child components */
  size: Size
  /** Child components */
  children: React.ReactNode
}

/**
 * Provides size context to child components.
 *
 * Used by Button, CopyButton, and other sized components to transmit
 * their size to child icons, allowing icons to automatically match
 * the parent component's size.
 */
export function SizeProvider({ size, children }: SizeProviderProps) {
  return (
    <SizeContext.Provider value={size}>
      {children}
    </SizeContext.Provider>
  )
}

/**
 * Hook to access the current size context.
 * Returns undefined if not within a SizeProvider.
 */
export function useSize(): Size | undefined {
  return useContext(SizeContext)
}
