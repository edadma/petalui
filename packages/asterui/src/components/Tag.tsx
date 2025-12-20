import React, { useState, forwardRef } from 'react'

// DaisyUI classes
const dBadge = 'badge'
const dBadgePrimary = 'badge-primary'
const dBadgeSecondary = 'badge-secondary'
const dBadgeAccent = 'badge-accent'
const dBadgeNeutral = 'badge-neutral'
const dBadgeInfo = 'badge-info'
const dBadgeSuccess = 'badge-success'
const dBadgeWarning = 'badge-warning'
const dBadgeError = 'badge-error'
const dBadgeGhost = 'badge-ghost'
const dBadgeXs = 'badge-xs'
const dBadgeSm = 'badge-sm'
const dBadgeMd = 'badge-md'
const dBadgeLg = 'badge-lg'
const dBadgeXl = 'badge-xl'
const dBadgeOutline = 'badge-outline'
const dBadgeSoft = 'badge-soft'
const dBadgeDash = 'badge-dash'
const dBtn = 'btn'
const dBtnGhost = 'btn-ghost'
const dBtnXs = 'btn-xs'

export type TagSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type TagColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'ghost'

export type TagVariant = 'filled' | 'outlined' | 'soft' | 'dash'

export interface TagProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  closable?: boolean
  closeIcon?: React.ReactNode
  onClose?: () => void
  color?: TagColor | string
  icon?: React.ReactNode
  size?: TagSize
  variant?: TagVariant
  visible?: boolean
  disabled?: boolean
  href?: string
  target?: string
  children?: React.ReactNode
  'data-testid'?: string
  'aria-label'?: string
}

export interface CheckableTagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onChange' | 'color'> {
  checked?: boolean
  onChange?: (checked: boolean) => void
  icon?: React.ReactNode
  size?: TagSize
  color?: TagColor
  disabled?: boolean
  children?: React.ReactNode
  'data-testid'?: string
}

const colorClasses: Record<string, string> = {
  primary: dBadgePrimary,
  secondary: dBadgeSecondary,
  accent: dBadgeAccent,
  neutral: dBadgeNeutral,
  info: dBadgeInfo,
  success: dBadgeSuccess,
  warning: dBadgeWarning,
  error: dBadgeError,
  ghost: dBadgeGhost,
}

const sizeClasses: Record<TagSize, string> = {
  xs: `${dBadgeXs} text-xs`,
  sm: `${dBadgeSm} text-sm`,
  md: dBadgeMd,
  lg: `${dBadgeLg} text-lg`,
  xl: `${dBadgeXl} text-xl`,
}

const variantClasses: Record<TagVariant, string> = {
  filled: '',
  outlined: dBadgeOutline,
  soft: dBadgeSoft,
  dash: dBadgeDash,
}

const TagLiveRegion: React.FC = () => (
  <div
    id="tag-live-region"
    role="status"
    aria-live="polite"
    aria-atomic="true"
    className="sr-only"
    style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}
  />
)

const announceTagRemoval = (label: string) => {
  const region = document.getElementById('tag-live-region')
  if (region) {
    region.textContent = `${label} removed`
    setTimeout(() => {
      region.textContent = ''
    }, 1000)
  }
}

export const Tag = forwardRef<HTMLElement, TagProps>(
  (
    {
      closable = false,
      closeIcon,
      onClose,
      color,
      icon,
      size = 'md',
      variant = 'filled',
      visible: controlledVisible,
      disabled = false,
      href,
      target,
      children,
      className = '',
      'data-testid': testId,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) => {
    const [internalVisible, setInternalVisible] = useState(true)
    const isControlled = controlledVisible !== undefined
    const visible = isControlled ? controlledVisible : internalVisible
    const baseTestId = testId ?? 'tag'
    const tagLabel = ariaLabel ?? (typeof children === 'string' ? children : 'tag')

    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      if (disabled) return
      if (!isControlled) {
        setInternalVisible(false)
      }
      announceTagRemoval(tagLabel)
      onClose?.()
    }

    const handleCloseKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClose(e as unknown as React.MouseEvent)
      }
    }

    if (!visible) return null

    const colorClass = color && colorClasses[color] ? colorClasses[color] : ''
    const customColorStyle =
      color && !colorClasses[color] ? { backgroundColor: color, borderColor: color } : undefined

    const tagClasses = [
      `${dBadge} gap-1 inline-flex items-center`,
      colorClass,
      sizeClasses[size],
      variantClasses[variant],
      disabled && 'opacity-50 cursor-not-allowed',
      href && !disabled && 'cursor-pointer hover:opacity-80',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const content = (
      <>
        {icon && <span className="inline-flex">{icon}</span>}
        {children}
        {closable && (
          <button
            type="button"
            onClick={handleClose}
            onKeyDown={handleCloseKeyDown}
            disabled={disabled}
            className={`${dBtn} ${dBtnGhost} ${dBtnXs} p-0 min-h-0 h-auto hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1 rounded`}
            aria-label={`Remove ${tagLabel}`}
            data-testid={`${baseTestId}-close`}
          >
            {closeIcon || (
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        )}
      </>
    )

    if (href && !disabled) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          className={tagClasses}
          style={customColorStyle}
          data-testid={baseTestId}
          data-disabled={disabled || undefined}
          {...rest}
        >
          {content}
        </a>
      )
    }

    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={tagClasses}
        style={customColorStyle}
        data-testid={baseTestId}
        data-disabled={disabled || undefined}
        aria-disabled={disabled || undefined}
        {...rest}
      >
        {content}
      </span>
    )
  }
)

Tag.displayName = 'Tag'

const checkedColorClasses: Record<TagColor, string> = {
  primary: dBadgePrimary,
  secondary: dBadgeSecondary,
  accent: dBadgeAccent,
  neutral: dBadgeNeutral,
  info: dBadgeInfo,
  success: dBadgeSuccess,
  warning: dBadgeWarning,
  error: dBadgeError,
  ghost: dBadgeGhost,
}

const uncheckedColorClasses: Record<TagColor, string> = {
  primary: `${dBadgeOutline} hover:${dBadgePrimary} hover:${dBadgeOutline}`,
  secondary: `${dBadgeOutline} hover:${dBadgeSecondary} hover:${dBadgeOutline}`,
  accent: `${dBadgeOutline} hover:${dBadgeAccent} hover:${dBadgeOutline}`,
  neutral: `${dBadgeOutline} hover:${dBadgeNeutral} hover:${dBadgeOutline}`,
  info: `${dBadgeOutline} hover:${dBadgeInfo} hover:${dBadgeOutline}`,
  success: `${dBadgeOutline} hover:${dBadgeSuccess} hover:${dBadgeOutline}`,
  warning: `${dBadgeOutline} hover:${dBadgeWarning} hover:${dBadgeOutline}`,
  error: `${dBadgeOutline} hover:${dBadgeError} hover:${dBadgeOutline}`,
  ghost: `${dBadgeOutline} hover:${dBadgeGhost} hover:${dBadgeOutline}`,
}

export const CheckableTag = forwardRef<HTMLSpanElement, CheckableTagProps>(
  (
    {
      checked = false,
      onChange,
      icon,
      size = 'md',
      color = 'primary',
      disabled = false,
      children,
      className = '',
      'data-testid': testId,
      ...rest
    },
    ref
  ) => {
    const baseTestId = testId ?? 'checkable-tag'

    const handleClick = () => {
      if (disabled) return
      onChange?.(!checked)
    }

    const tagClasses = [
      `${dBadge} gap-1 cursor-pointer transition-colors`,
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2',
      sizeClasses[size],
      checked ? checkedColorClasses[color] : uncheckedColorClasses[color],
      disabled && 'opacity-50 cursor-not-allowed',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <span
        ref={ref}
        className={tagClasses}
        onClick={handleClick}
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
        data-testid={baseTestId}
        data-state={checked ? 'checked' : 'unchecked'}
        data-disabled={disabled || undefined}
        {...rest}
      >
        {icon && <span className="inline-flex">{icon}</span>}
        {children}
      </span>
    )
  }
)

CheckableTag.displayName = 'CheckableTag'

export { TagLiveRegion }
