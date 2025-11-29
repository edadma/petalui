import React from 'react'

export type BadgePosition =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'middle-start'
  | 'middle-center'
  | 'middle-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'

export type BadgeStatus = 'success' | 'processing' | 'error' | 'default' | 'warning'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  // Count mode
  count?: number
  showZero?: boolean
  overflowCount?: number

  // Positioning (when wrapping children)
  position?: BadgePosition
  offset?: [number, number]

  // Status mode
  status?: BadgeStatus
  text?: string

  // Ribbon mode
  ribbon?: string
  ribbonPlacement?: 'start' | 'end'

  // Visual
  type?: 'default' | 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  dot?: boolean
  outline?: boolean

  // Content
  children?: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  count,
  showZero = false,
  overflowCount = 99,
  position = 'top-end',
  offset,
  status,
  text,
  ribbon,
  ribbonPlacement = 'end',
  type = 'error',
  size = 'md',
  dot = false,
  outline = false,
  className = '',
  ...rest
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

  const statusTypeMap: Record<BadgeStatus, typeof type> = {
    success: 'success',
    processing: 'info',
    error: 'error',
    warning: 'warning',
    default: 'neutral',
  }

  // Get position classes for indicator
  const getPositionClasses = (pos: BadgePosition) => {
    const [vertical, horizontal] = pos.split('-')
    const classes: string[] = []

    switch (vertical) {
      case 'top':
        classes.push('indicator-top')
        break
      case 'middle':
        classes.push('indicator-middle')
        break
      case 'bottom':
        classes.push('indicator-bottom')
        break
    }

    switch (horizontal) {
      case 'start':
        classes.push('indicator-start')
        break
      case 'center':
        classes.push('indicator-center')
        break
      case 'end':
        classes.push('indicator-end')
        break
    }

    return classes.join(' ')
  }

  // Calculate display count with overflow
  const getDisplayCount = () => {
    if (count === undefined) return null
    if (count > overflowCount) return `${overflowCount}+`
    return count
  }

  const shouldShowBadge = count !== undefined && (count > 0 || showZero) || dot

  // Status badge mode (standalone with status indicator)
  if (status && !children) {
    const statusType = statusTypeMap[status]
    return (
      <span className={`inline-flex items-center gap-2 ${className}`} {...rest}>
        <span
          className={[
            'badge badge-xs w-2 h-2 p-0',
            typeClasses[statusType],
            status === 'processing' && 'animate-pulse',
          ]
            .filter(Boolean)
            .join(' ')}
        />
        {text && <span className="text-sm">{text}</span>}
      </span>
    )
  }

  // Ribbon mode
  if (ribbon && children) {
    const ribbonClasses = [
      'absolute',
      ribbonPlacement === 'start' ? '-left-1 top-2' : '-right-1 top-2',
      'px-2 py-0.5',
      'text-xs font-semibold text-white',
      'bg-primary',
      'shadow-sm',
      ribbonPlacement === 'start' ? 'rounded-r' : 'rounded-l',
    ].join(' ')

    return (
      <div className={`relative inline-block ${className}`} {...rest}>
        {children}
        <div className={ribbonClasses}>{ribbon}</div>
      </div>
    )
  }

  // Notification badge mode (wrapping children)
  if (children) {
    const offsetStyle =
      offset
        ? {
            transform: `translate(${offset[0]}px, ${offset[1]}px)`,
          }
        : undefined

    return (
      <div className={`indicator inline-block ${className}`} {...rest}>
        {shouldShowBadge && (
          <span
            className={[
              'indicator-item badge',
              getPositionClasses(position),
              typeClasses[type],
              dot ? 'badge-xs p-0 w-2 h-2' : sizeClasses[size],
              outline && 'badge-outline',
            ]
              .filter(Boolean)
              .join(' ')}
            style={offsetStyle}
          >
            {!dot && getDisplayCount()}
          </span>
        )}
        {children}
      </div>
    )
  }

  // Standalone badge mode (like a label)
  const badgeClasses = [
    'badge',
    typeClasses[type],
    sizeClasses[size],
    outline && 'badge-outline',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const displayContent = getDisplayCount()

  return <span className={badgeClasses} {...rest}>{displayContent}</span>
}
