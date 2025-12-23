import React from 'react'

// DaisyUI classes
const dProgress = 'd-progress'
const dProgressNeutral = 'd-progress-neutral'
const dProgressPrimary = 'd-progress-primary'
const dProgressSecondary = 'd-progress-secondary'
const dProgressAccent = 'd-progress-accent'
const dProgressInfo = 'd-progress-info'
const dProgressSuccess = 'd-progress-success'
const dProgressWarning = 'd-progress-warning'
const dProgressError = 'd-progress-error'

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
