import React from 'react'

// DaisyUI classes
const dStatus = 'd-status'
const dStatusNeutral = 'd-status-neutral'
const dStatusPrimary = 'd-status-primary'
const dStatusSecondary = 'd-status-secondary'
const dStatusAccent = 'd-status-accent'
const dStatusInfo = 'd-status-info'
const dStatusSuccess = 'd-status-success'
const dStatusWarning = 'd-status-warning'
const dStatusError = 'd-status-error'
const dStatusXs = 'd-status-xs'
const dStatusSm = 'd-status-sm'
const dStatusMd = 'd-status-md'
const dStatusLg = 'd-status-lg'
const dStatusXl = 'd-status-xl'

export type StatusType = 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
export type StatusSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface StatusProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Status color type */
  type?: StatusType
  /** Status size */
  size?: StatusSize
  /** Ping animation effect */
  ping?: boolean
  /** Bounce animation effect */
  bounce?: boolean
  /** Accessibility label */
  label?: string
  /** Test ID for testing */
  'data-testid'?: string
}

const typeClasses: Record<StatusType, string> = {
  neutral: dStatusNeutral,
  primary: dStatusPrimary,
  secondary: dStatusSecondary,
  accent: dStatusAccent,
  info: dStatusInfo,
  success: dStatusSuccess,
  warning: dStatusWarning,
  error: dStatusError,
}

const sizeClasses: Record<StatusSize, string> = {
  xs: dStatusXs,
  sm: dStatusSm,
  md: dStatusMd,
  lg: dStatusLg,
  xl: dStatusXl,
}

export const Status: React.FC<StatusProps> = ({
  type = 'neutral',
  size = 'md',
  ping = false,
  bounce = false,
  label,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const baseClasses = `${dStatus} ${typeClasses[type]} ${sizeClasses[size]} ${bounce ? 'animate-bounce' : ''} ${className}`.trim()

  if (ping) {
    return (
      <div className="inline-grid *:[grid-area:1/1]" aria-label={label} data-testid={testId} {...rest}>
        <div className={`${baseClasses} animate-ping`} />
        <div className={baseClasses} />
      </div>
    )
  }

  return <div className={baseClasses} aria-label={label} data-testid={testId} {...rest} />
}
