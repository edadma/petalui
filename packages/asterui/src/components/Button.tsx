import React from 'react'
import { SizeProvider } from '../contexts/SizeContext'
import { useConfig } from './ConfigProvider'

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
const dBtnActive = 'btn-active'
const dBtnSquare = 'btn-square'
const dBtnCircle = 'btn-circle'
const dBtnWide = 'btn-wide'
const dBtnBlock = 'btn-block'
const dLoading = 'loading'
const dLoadingSpinner = 'loading-spinner'

type BaseButtonProps = {
  /** Button color */
  color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral'
  /** Button style variant */
  variant?: 'solid' | 'outline' | 'dash' | 'soft' | 'ghost' | 'link'
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Active/pressed visual state */
  active?: boolean
  /** Show loading spinner and disable button */
  loading?: boolean
  /** Button shape */
  shape?: 'square' | 'circle' | 'wide' | 'block' | 'round'
  /** Disable click animation */
  noAnimation?: boolean
  /** Icon element to display */
  icon?: React.ReactNode
  /** Position of the icon */
  iconPosition?: 'start' | 'end'
  /** Applies error/danger styling (shorthand for color="error") */
  danger?: boolean
  /** Toggle button pressed state (sets aria-pressed) */
  pressed?: boolean
}

type ButtonAsButton = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
    href?: undefined
    htmlType?: 'button' | 'submit' | 'reset'
  }

type ButtonAsAnchor = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> & {
    href: string
    htmlType?: undefined
    /** Disable the link button */
    disabled?: boolean
  }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor

export const Button: React.FC<ButtonProps> = ({
  children,
  color,
  variant,
  size,
  active = false,
  loading = false,
  shape,
  noAnimation = false,
  icon,
  iconPosition = 'start',
  danger = false,
  pressed,
  className = '',
  ...props
}) => {
  const { componentSize } = useConfig()
  const effectiveSize = size ?? componentSize ?? 'md'
  // danger prop is a shorthand for color="error"
  const effectiveColor = danger ? 'error' : color

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
    solid: '', // default, no extra class needed
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
    wide: dBtnWide,
    block: dBtnBlock,
    round: 'rounded-full',
  }

  const classes = [
    dBtn,
    effectiveColor && colorClasses[effectiveColor],
    variant && variantClasses[variant],
    sizeClasses[effectiveSize],
    active && dBtnActive,
    shape && shapeClasses[shape],
    noAnimation && 'no-animation',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Determine icon spacing based on whether there's text content and button size
  const hasChildren = children !== undefined && children !== null && children !== ''
  const spacingBySize = {
    xs: iconPosition === 'start' ? 'mr-1' : 'ml-1',
    sm: iconPosition === 'start' ? 'mr-1' : 'ml-1',
    md: iconPosition === 'start' ? 'mr-1.5' : 'ml-1.5',
    lg: iconPosition === 'start' ? 'mr-2' : 'ml-2',
    xl: iconPosition === 'start' ? 'mr-2' : 'ml-2',
  }
  const iconSpacing = hasChildren ? spacingBySize[effectiveSize] : ''

  const iconElement = icon && (
    <SizeProvider size={effectiveSize}>
      <span className={`inline-flex items-center ${iconSpacing}`} aria-hidden="true">
        {icon}
      </span>
    </SizeProvider>
  )

  const content = (
    <>
      {loading && <span className={`${dLoading} ${dLoadingSpinner}`} aria-hidden="true"></span>}
      {!loading && icon && iconPosition === 'start' && iconElement}
      {children}
      {!loading && icon && iconPosition === 'end' && iconElement}
    </>
  )

  if ('href' in props && props.href !== undefined) {
    const { href, disabled, onKeyDown, onClick, ...anchorProps } = props as ButtonAsAnchor & {
      onKeyDown?: React.KeyboardEventHandler<HTMLAnchorElement>
      onClick?: React.MouseEventHandler<HTMLAnchorElement>
    }
    const isDisabled = disabled || loading

    // Handle Space key for anchor buttons (links only respond to Enter natively)
    const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (event.key === ' ' && !isDisabled) {
        event.preventDefault()
        event.currentTarget.click()
      }
      onKeyDown?.(event)
    }

    // Prevent click when disabled
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (isDisabled) {
        event.preventDefault()
        return
      }
      onClick?.(event)
    }

    return (
      <a
        href={isDisabled ? undefined : href}
        role="button"
        className={classes}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        aria-pressed={pressed}
        tabIndex={isDisabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        {...anchorProps}
      >
        {content}
      </a>
    )
  }

  const { htmlType, ...buttonProps } = props as Omit<ButtonAsButton, keyof BaseButtonProps>
  const buttonType: 'button' | 'submit' | 'reset' = htmlType ?? 'button'
  return (
    <button
      type={buttonType}
      className={classes}
      aria-busy={loading || undefined}
      aria-pressed={pressed}
      disabled={loading || buttonProps.disabled}
      {...buttonProps}
    >
      {content}
    </button>
  )
}
