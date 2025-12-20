import React from 'react'

// DaisyUI classes
const dDivider = 'd-divider'
const dDividerHorizontal = 'd-divider-horizontal'
const dDividerStart = 'd-divider-start'
const dDividerEnd = 'd-divider-end'
const dDividerNeutral = 'd-divider-neutral'
const dDividerPrimary = 'd-divider-primary'
const dDividerSecondary = 'd-divider-secondary'
const dDividerAccent = 'd-divider-accent'
const dDividerSuccess = 'd-divider-success'
const dDividerWarning = 'd-divider-warning'
const dDividerInfo = 'd-divider-info'
const dDividerError = 'd-divider-error'

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
  position?: 'start' | 'center' | 'end'
  type?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error'
}

export function Divider({
  children,
  orientation = 'horizontal',
  position = 'center',
  type,
  className = '',
  ...rest
}: DividerProps) {
  const positionClasses: Record<string, string> = {
    start: dDividerStart,
    center: '',
    end: dDividerEnd,
  }

  const typeClasses: Record<string, string> = {
    neutral: dDividerNeutral,
    primary: dDividerPrimary,
    secondary: dDividerSecondary,
    accent: dDividerAccent,
    success: dDividerSuccess,
    warning: dDividerWarning,
    info: dDividerInfo,
    error: dDividerError,
  }

  const classes = [
    dDivider,
    orientation === 'vertical' && dDividerHorizontal,
    positionClasses[position],
    type && typeClasses[type],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes} {...rest}>{children}</div>
}
