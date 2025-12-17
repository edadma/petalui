import React from 'react'

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
    start: 'd-divider-start',
    center: '',
    end: 'd-divider-end',
  }

  const typeClasses: Record<string, string> = {
    neutral: 'd-divider-neutral',
    primary: 'd-divider-primary',
    secondary: 'd-divider-secondary',
    accent: 'd-divider-accent',
    success: 'd-divider-success',
    warning: 'd-divider-warning',
    info: 'd-divider-info',
    error: 'd-divider-error',
  }

  const classes = [
    'd-divider',
    orientation === 'vertical' && 'd-divider-horizontal',
    positionClasses[position],
    type && typeClasses[type],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes} {...rest}>{children}</div>
}
