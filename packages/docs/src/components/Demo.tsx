import React from 'react'

interface DemoProps {
  children: React.ReactNode
  className?: string
}

/**
 * Demo component for displaying interactive component examples
 * Use with client:load or client:visible for hydration
 */
export function Demo({ children, className = '' }: DemoProps) {
  return (
    <div className={`component-preview ${className}`}>
      {children}
    </div>
  )
}

export default Demo
