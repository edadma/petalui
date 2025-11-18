import React from 'react'

export interface BadgeProps {
  children?: React.ReactNode
  count?: number
  showZero?: boolean
  type?: 'default' | 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  outline?: boolean
  dot?: boolean
  circular?: boolean
  content?: React.ReactNode
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  count,
  showZero = false,
  type = 'error',
  size = 'md',
  outline = false,
  dot = false,
  circular = false,
  content,
  className = '',
}) => {
  const typeClasses = {
    default: '',
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    accent: 'badge-accent',
    neutral: 'badge-neutral',
    info: 'badge-info',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    ghost: 'badge-ghost',
  }

  const sizeClasses = {
    xs: 'badge-xs',
    sm: 'badge-sm',
    md: 'badge-md',
    lg: 'badge-lg',
  }

  const shouldShowBadge = count !== undefined && (count > 0 || showZero) || dot

  // If wrapping children (notification badge mode)
  if (children) {
    return (
      <div className="indicator inline-block">
        {shouldShowBadge && (
          <span
            className={[
              'indicator-item badge',
              typeClasses[type],
              dot ? 'badge-xs p-0 w-2 h-2' : sizeClasses[size],
              outline && 'badge-outline',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {!dot && count}
          </span>
        )}
        {children}
      </div>
    )
  }

  // Standalone badge mode (like a label/tag)
  const badgeClasses = [
    'badge',
    typeClasses[type],
    sizeClasses[size],
    outline && 'badge-outline',
    circular && 'w-3 h-3 p-0',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const displayContent = content !== undefined ? content : count !== undefined ? count : ''

  return <span className={badgeClasses}>{displayContent}</span>
}
