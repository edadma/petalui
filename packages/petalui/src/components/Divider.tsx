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
    start: 'divider-start',
    center: '',
    end: 'divider-end',
  }

  const typeClasses: Record<string, string> = {
    neutral: 'divider-neutral',
    primary: 'divider-primary',
    secondary: 'divider-secondary',
    accent: 'divider-accent',
    success: 'divider-success',
    warning: 'divider-warning',
    info: 'divider-info',
    error: 'divider-error',
  }

  const classes = [
    'divider',
    orientation === 'vertical' && 'divider-vertical',
    positionClasses[position],
    type && typeClasses[type],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes} {...rest}>{children}</div>
}
