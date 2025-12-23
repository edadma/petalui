import React from 'react'
import { useClipboard } from '../hooks/useClipboard'
import { SizeProvider, useSize } from '../contexts/SizeContext'
import { useConfig } from '../providers/ConfigProvider'

// DaisyUI classes
const dBtn = 'btn'
const dBtnPrimary = 'btn-primary'
const dBtnSecondary = 'btn-secondary'
const dBtnAccent = 'btn-accent'
const dBtnInfo = 'btn-info'
const dBtnSuccess = 'btn-success'
const dBtnWarning = 'btn-warning'
const dBtnError = 'btn-error'
const dBtnNeutral = 'btn-neutral'
const dBtnOutline = 'btn-outline'
const dBtnDash = 'btn-dash'
const dBtnSoft = 'btn-soft'
const dBtnGhost = 'btn-ghost'
const dBtnLink = 'btn-link'
const dBtnXs = 'btn-xs'
const dBtnSm = 'btn-sm'
const dBtnLg = 'btn-lg'
const dBtnXl = 'btn-xl'
const dBtnSquare = 'btn-square'
const dBtnCircle = 'btn-circle'
const dTooltip = 'tooltip'

const iconSizeClasses = {
  xs: 'w-3.5 h-3.5',
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6',
}

export type CopyButtonPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

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
  /** Absolute position within parent (parent must have position: relative) */
  position?: CopyButtonPosition
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
  /** Test ID for testing */
  'data-testid'?: string
}

const CopyIcon: React.FC = () => {
  const size = useSize() ?? 'md'
  return (
    <svg
      className={iconSizeClasses[size]}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  )
}

const CheckIcon: React.FC = () => {
  const size = useSize() ?? 'md'
  return (
    <svg
      className={iconSizeClasses[size]}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  )
}

const positionClasses: Record<CopyButtonPosition, string> = {
  'top-right': 'absolute top-2 right-2',
  'top-left': 'absolute top-2 left-2',
  'bottom-right': 'absolute bottom-2 right-2',
  'bottom-left': 'absolute bottom-2 left-2',
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  timeout = 2000,
  color,
  variant,
  size,
  shape,
  position,
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
  const { componentSize } = useConfig()
  const effectiveSize = size ?? componentSize ?? 'md'
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
    primary: dBtnPrimary,
    secondary: dBtnSecondary,
    accent: dBtnAccent,
    info: dBtnInfo,
    success: dBtnSuccess,
    warning: dBtnWarning,
    error: dBtnError,
    neutral: dBtnNeutral,
  }

  const variantClasses = {
    solid: '',
    outline: dBtnOutline,
    dash: dBtnDash,
    soft: dBtnSoft,
    ghost: dBtnGhost,
    link: dBtnLink,
  }

  const sizeClasses = {
    xs: dBtnXs,
    sm: dBtnSm,
    md: '',
    lg: dBtnLg,
    xl: dBtnXl,
  }

  const shapeClasses = {
    square: dBtnSquare,
    circle: dBtnCircle,
  }

  const classes = [
    dBtn,
    color && colorClasses[color],
    copied && dBtnSuccess,
    variant && variantClasses[variant],
    sizeClasses[effectiveSize],
    shape && shapeClasses[shape],
    // Only add position classes if not using tooltip (tooltip wrapper gets them instead)
    !showTooltip && position && positionClasses[position],
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
      data-state={copied ? 'copied' : 'idle'}
      {...rest}
    >
      <SizeProvider size={effectiveSize}>
        {content}
      </SizeProvider>
    </button>
  )

  if (showTooltip) {
    const tooltipClasses = [dTooltip, position && positionClasses[position]].filter(Boolean).join(' ')
    return (
      <div className={tooltipClasses} data-tip={copied ? copiedTooltipText : tooltipText}>
        {button}
      </div>
    )
  }

  return button
}

CopyButton.displayName = 'CopyButton'
