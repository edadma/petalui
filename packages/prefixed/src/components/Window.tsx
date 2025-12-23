import React from 'react'

// DaisyUI classes
const dMockupWindow = 'd-mockup-window'

export interface WindowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  contentClassName?: string
  /** Test ID for testing */
  'data-testid'?: string
}

export const Window: React.FC<WindowProps> = ({
  children,
  className = '',
  contentClassName = '',
  'data-testid': testId,
  ...rest
}) => {
  return (
    <div className={`${dMockupWindow} border border-base-300 ${className}`} data-testid={testId} {...rest}>
      <div className={`border-t border-base-300 ${contentClassName}`}>
        {children}
      </div>
    </div>
  )
}
