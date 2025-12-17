import React, { forwardRef } from 'react'

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

export type BadgeType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'

export type BadgeVariant = 'solid' | 'outline' | 'dash' | 'soft' | 'ghost'

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

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

  // Visual
  type?: BadgeType
  size?: BadgeSize
  variant?: BadgeVariant
  color?: string
  dot?: boolean
  /** @deprecated Use variant="outline" instead */
  outline?: boolean

  // Testing
  'data-testid'?: string

  // Content
  children?: React.ReactNode
}

const typeClasses: Record<BadgeType, string> = {
  default: '',
  primary: 'd-badge-primary',
  secondary: 'd-badge-secondary',
  accent: 'd-badge-accent',
  neutral: 'd-badge-neutral',
  info: 'd-badge-info',
  success: 'd-badge-success',
  warning: 'd-badge-warning',
  error: 'd-badge-error',
}

const sizeClasses: Record<BadgeSize, string> = {
  xs: 'd-badge-xs',
  sm: 'd-badge-sm',
  md: 'd-badge-md',
  lg: 'd-badge-lg',
  xl: 'd-badge-xl',
}

const variantClasses: Record<BadgeVariant, string> = {
  solid: '',
  outline: 'd-badge-outline',
  dash: 'd-badge-dash',
  soft: 'd-badge-soft',
  ghost: 'd-badge-ghost',
}

const statusTypeMap: Record<BadgeStatus, BadgeType> = {
  success: 'success',
  processing: 'info',
  error: 'error',
  warning: 'warning',
  default: 'neutral',
}

// Get position classes for indicator
const getPositionClasses = (pos: BadgePosition): string => {
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

const BadgeInner = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      count,
      showZero = false,
      overflowCount = 99,
      position = 'top-end',
      offset,
      status,
      text,
      type = 'error',
      size = 'md',
      variant = 'solid',
      color,
      dot = false,
      outline = false,
      className = '',
      'data-testid': testId,
      ...rest
    },
    ref
  ) => {
    // Resolve variant (support deprecated outline prop)
    const resolvedVariant = outline ? 'outline' : variant

    // Calculate display count with overflow
    const getDisplayCount = () => {
      if (count === undefined) return null
      if (count > overflowCount) return `${overflowCount}+`
      return count
    }

    const shouldShowBadge = (count !== undefined && (count > 0 || showZero)) || dot

    // Custom color style
    const colorStyle = color ? { backgroundColor: color } : undefined

    // Status badge mode (standalone with status indicator)
    if (status && !children) {
      const statusType = statusTypeMap[status]
      return (
        <span
          ref={ref}
          role="status"
          aria-label={text || status}
          className={`inline-flex items-center gap-2 ${className}`}
          data-testid={testId}
          data-status={status}
          {...rest}
        >
          <span
            className={[
              'd-badge d-badge-xs w-2 h-2 p-0',
              typeClasses[statusType],
              status === 'processing' && 'animate-pulse',
            ]
              .filter(Boolean)
              .join(' ')}
            data-testid={testId ? `${testId}-dot` : undefined}
          />
          {text && <span className="text-sm">{text}</span>}
        </span>
      )
    }

    // Notification badge mode (wrapping children)
    if (children) {
      const offsetStyle = offset
        ? { transform: `translate(${offset[0]}px, ${offset[1]}px)`, ...colorStyle }
        : colorStyle

      const displayCount = getDisplayCount()
      const ariaLabel =
        dot ? 'New notification' : displayCount !== null ? `${displayCount} notifications` : undefined

      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className={`d-indicator inline-block ${className}`}
          data-testid={testId}
          {...rest}
        >
          {shouldShowBadge && (
            <span
              role="status"
              aria-label={ariaLabel}
              className={[
                'd-indicator-item d-badge',
                getPositionClasses(position),
                !color && typeClasses[type],
                dot ? 'd-badge-xs p-0 w-2 h-2' : sizeClasses[size],
                variantClasses[resolvedVariant],
              ]
                .filter(Boolean)
                .join(' ')}
              style={offsetStyle}
              data-testid={testId ? `${testId}-indicator` : undefined}
              data-count={count}
              data-dot={dot || undefined}
            >
              {!dot && displayCount}
            </span>
          )}
          {children}
        </div>
      )
    }

    // Standalone badge mode (like a label)
    const badgeClasses = [
      'd-badge',
      !color && typeClasses[type],
      sizeClasses[size],
      variantClasses[resolvedVariant],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const displayContent = getDisplayCount()

    return (
      <span
        ref={ref}
        className={badgeClasses}
        style={colorStyle}
        data-testid={testId}
        {...rest}
      >
        {displayContent}
      </span>
    )
  }
)

BadgeInner.displayName = 'Badge'

// Badge.Ribbon compound component
export interface BadgeRibbonProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  placement?: 'start' | 'end'
  color?: string
  type?: BadgeType
  'data-testid'?: string
  children: React.ReactNode
}

const BadgeRibbon = forwardRef<HTMLDivElement, BadgeRibbonProps>(
  (
    {
      children,
      text,
      placement = 'end',
      color,
      type = 'primary',
      className = '',
      'data-testid': testId,
      ...rest
    },
    ref
  ) => {
    const ribbonTypeClasses: Record<BadgeType, string> = {
      default: 'bg-base-300 text-base-content',
      primary: 'bg-primary text-primary-content',
      secondary: 'bg-secondary text-secondary-content',
      accent: 'bg-accent text-accent-content',
      neutral: 'bg-neutral text-neutral-content',
      info: 'bg-info text-info-content',
      success: 'bg-success text-success-content',
      warning: 'bg-warning text-warning-content',
      error: 'bg-error text-error-content',
    }

    const ribbonClasses = [
      'absolute',
      placement === 'start' ? '-left-1 top-2' : '-right-1 top-2',
      'px-2 py-0.5',
      'text-xs font-semibold',
      !color && ribbonTypeClasses[type],
      'shadow-sm',
      placement === 'start' ? 'rounded-r' : 'rounded-l',
    ]
      .filter(Boolean)
      .join(' ')

    const colorStyle = color ? { backgroundColor: color } : undefined

    return (
      <div
        ref={ref}
        className={`relative inline-block overflow-visible ${className}`}
        data-testid={testId}
        {...rest}
      >
        {children}
        <div
          className={ribbonClasses}
          style={colorStyle}
          data-testid={testId ? `${testId}-ribbon` : undefined}
        >
          {text}
        </div>
      </div>
    )
  }
)

BadgeRibbon.displayName = 'Badge.Ribbon'

// Compound component type
type BadgeComponent = typeof BadgeInner & {
  Ribbon: typeof BadgeRibbon
}

export const Badge = BadgeInner as BadgeComponent
Badge.Ribbon = BadgeRibbon
