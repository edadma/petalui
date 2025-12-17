import React from 'react'

export interface ProgressProps extends React.ProgressHTMLAttributes<HTMLProgressElement> {
  type?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
}

const typeClasses = {
  neutral: 'd-progress-neutral',
  primary: 'd-progress-primary',
  secondary: 'd-progress-secondary',
  accent: 'd-progress-accent',
  info: 'd-progress-info',
  success: 'd-progress-success',
  warning: 'd-progress-warning',
  error: 'd-progress-error',
} as const

export function Progress({ value, max = 100, type, className = '', ...rest }: ProgressProps) {
  const classes = [
    'd-progress',
    type && typeClasses[type],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <progress className={classes} value={value} max={max} {...rest} />
}
