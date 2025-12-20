import React from 'react'

// DaisyUI classes
const dDivider = 'divider'
const dDividerHorizontal = 'divider-horizontal'
const dDividerStart = 'divider-start'
const dDividerEnd = 'divider-end'
const dDividerNeutral = 'divider-neutral'
const dDividerPrimary = 'divider-primary'
const dDividerSecondary = 'divider-secondary'
const dDividerAccent = 'divider-accent'
const dDividerSuccess = 'divider-success'
const dDividerWarning = 'divider-warning'
const dDividerInfo = 'divider-info'
const dDividerError = 'divider-error'

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
