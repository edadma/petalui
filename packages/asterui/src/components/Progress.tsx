import React from 'react'

// DaisyUI classes
const dProgress = 'progress'
const dProgressNeutral = 'progress-neutral'
const dProgressPrimary = 'progress-primary'
const dProgressSecondary = 'progress-secondary'
const dProgressAccent = 'progress-accent'
const dProgressInfo = 'progress-info'
const dProgressSuccess = 'progress-success'
const dProgressWarning = 'progress-warning'
const dProgressError = 'progress-error'

export interface ProgressProps extends React.ProgressHTMLAttributes<HTMLProgressElement> {
  type?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  /** Test ID for testing */
  'data-testid'?: string
}

const typeClasses = {
  neutral: dProgressNeutral,
  primary: dProgressPrimary,
  secondary: dProgressSecondary,
  accent: dProgressAccent,
  info: dProgressInfo,
  success: dProgressSuccess,
  warning: dProgressWarning,
  error: dProgressError,
} as const

export function Progress({ value, max = 100, type, className = '', ...rest }: ProgressProps) {
  const classes = [
    dProgress,
    type && typeClasses[type],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <progress className={classes} value={value} max={max} {...rest} />
}
