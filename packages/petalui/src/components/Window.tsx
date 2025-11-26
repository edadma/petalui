import React from 'react'

export interface WindowProps {
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

export const Window: React.FC<WindowProps> = ({
  children,
  className = '',
  contentClassName = '',
}) => {
  return (
    <div className={`mockup-window border border-base-300 ${className}`}>
      <div className={`border-t border-base-300 ${contentClassName}`}>
        {children}
      </div>
    </div>
  )
}
