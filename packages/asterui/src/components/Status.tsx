import React from 'react'

// DaisyUI classes
const dStatus = 'status'
const dStatusNeutral = 'status-neutral'
const dStatusPrimary = 'status-primary'
const dStatusSecondary = 'status-secondary'
const dStatusAccent = 'status-accent'
const dStatusInfo = 'status-info'
const dStatusSuccess = 'status-success'
const dStatusWarning = 'status-warning'
const dStatusError = 'status-error'
const dStatusXs = 'status-xs'
const dStatusSm = 'status-sm'
const dStatusMd = 'status-md'
const dStatusLg = 'status-lg'
const dStatusXl = 'status-xl'

export type StatusType = 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
export type StatusSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface StatusProps {
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
  /** Additional CSS classes */
  className?: string
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
}) => {
  const baseClasses = `${dStatus} ${typeClasses[type]} ${sizeClasses[size]} ${bounce ? 'animate-bounce' : ''} ${className}`.trim()

  if (ping) {
    return (
      <div className="inline-grid *:[grid-area:1/1]" aria-label={label}>
        <div className={`${baseClasses} animate-ping`} />
        <div className={baseClasses} />
      </div>
    )
  }

  return <div className={baseClasses} aria-label={label} />
}
