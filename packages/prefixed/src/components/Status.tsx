import React from 'react'

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
  neutral: 'd-status-neutral',
  primary: 'd-status-primary',
  secondary: 'd-status-secondary',
  accent: 'd-status-accent',
  info: 'd-status-info',
  success: 'd-status-success',
  warning: 'd-status-warning',
  error: 'd-status-error',
}

const sizeClasses: Record<StatusSize, string> = {
  xs: 'd-status-xs',
  sm: 'd-status-sm',
  md: 'd-status-md',
  lg: 'd-status-lg',
  xl: 'd-status-xl',
}

export const Status: React.FC<StatusProps> = ({
  type = 'neutral',
  size = 'md',
  ping = false,
  bounce = false,
  label,
  className = '',
}) => {
  const baseClasses = `d-status ${typeClasses[type]} ${sizeClasses[size]} ${bounce ? 'animate-bounce' : ''} ${className}`.trim()

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
