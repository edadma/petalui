import React from 'react'

// DaisyUI classes
const dMockupWindow = 'd-mockup-window'

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
    <div className={`${dMockupWindow} border border-base-300 ${className}`}>
      <div className={`border-t border-base-300 ${contentClassName}`}>
        {children}
      </div>
    </div>
  )
}
