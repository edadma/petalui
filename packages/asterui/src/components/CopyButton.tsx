import React from 'react'
import { useClipboard } from '../hooks/useClipboard'

export interface CopyButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onError'> {
  /** Text to copy to clipboard */
  text: string
  /** Duration in ms to show copied state */
  timeout?: number
  /** Button color */
  color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral'
  /** Button style variant */
  variant?: 'solid' | 'outline' | 'dash' | 'soft' | 'ghost' | 'link'
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Button shape */
  shape?: 'square' | 'circle'
  /** Custom icon for default state */
  icon?: React.ReactNode
  /** Custom icon for copied state */
  copiedIcon?: React.ReactNode
  /** Custom content for default state (overrides icon) */
  children?: React.ReactNode
  /** Custom content for copied state */
  copiedChildren?: React.ReactNode
  /** Callback when copy succeeds */
  onCopy?: () => void
  /** Callback when copy fails */
  onError?: (error: Error) => void
  /** Show tooltip with copy status */
  showTooltip?: boolean
  /** Tooltip text for default state */
  tooltipText?: string
  /** Tooltip text for copied state */
  copiedTooltipText?: string
}

const CopyIcon: React.FC = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
)

const CheckIcon: React.FC = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
)

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  timeout = 2000,
  color,
  variant,
  size = 'md',
  shape,
  icon,
  copiedIcon,
  children,
  copiedChildren,
  onCopy,
  onError,
  showTooltip = false,
  tooltipText = 'Copy',
  copiedTooltipText = 'Copied!',
  className = '',
  disabled,
  onClick,
  ...rest
}) => {
  const { copy, copied } = useClipboard(timeout)

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    if (disabled) return

    const success = await copy(text)
    if (success) {
      onCopy?.()
    } else {
      onError?.(new Error('Failed to copy to clipboard'))
    }
  }

  const colorClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    info: 'btn-info',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
    neutral: 'btn-neutral',
  }

  const variantClasses = {
    solid: '',
    outline: 'btn-outline',
    dash: 'btn-dash',
    soft: 'btn-soft',
    ghost: 'btn-ghost',
    link: 'btn-link',
  }

  const sizeClasses = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
    xl: 'btn-xl',
  }

  const shapeClasses = {
    square: 'btn-square',
    circle: 'btn-circle',
  }

  const classes = [
    'btn',
    color && colorClasses[color],
    copied && 'btn-success',
    variant && variantClasses[variant],
    sizeClasses[size],
    shape && shapeClasses[shape],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const defaultIcon = icon ?? <CopyIcon />
  const successIcon = copiedIcon ?? <CheckIcon />

  const content = copied
    ? (copiedChildren ?? successIcon)
    : (children ?? defaultIcon)

  const button = (
    <button
      type="button"
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      aria-label={copied ? copiedTooltipText : tooltipText}
      {...rest}
    >
      {content}
    </button>
  )

  if (showTooltip) {
    return (
      <div className="tooltip" data-tip={copied ? copiedTooltipText : tooltipText}>
        {button}
      </div>
    )
  }

  return button
}

CopyButton.displayName = 'CopyButton'
