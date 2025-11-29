import React from 'react'

export interface ProgressProps extends React.ProgressHTMLAttributes<HTMLProgressElement> {
  type?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
}

const typeClasses = {
  neutral: 'progress-neutral',
  primary: 'progress-primary',
  secondary: 'progress-secondary',
  accent: 'progress-accent',
  info: 'progress-info',
  success: 'progress-success',
  warning: 'progress-warning',
  error: 'progress-error',
} as const

export function Progress({ value, max = 100, type, className = '', ...rest }: ProgressProps) {
  const classes = [
    'progress',
    type && typeClasses[type],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <progress className={classes} value={value} max={max} {...rest} />
}
