import React, { useState } from 'react'

export interface TagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  closable?: boolean
  closeIcon?: React.ReactNode
  onClose?: () => void
  color?: string
  icon?: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg'
  children?: React.ReactNode
}

export interface CheckableTagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onChange'> {
  checked?: boolean
  onChange?: (checked: boolean) => void
  icon?: React.ReactNode
  children?: React.ReactNode
}

export const Tag: React.FC<TagProps> = ({
  closable = false,
  closeIcon,
  onClose,
  color,
  icon,
  size = 'md',
  children,
  className = '',
  ...rest
}) => {
  const [visible, setVisible] = useState(true)

  const handleClose = () => {
    setVisible(false)
    onClose?.()
  }

  if (!visible) return null

  // Map color to daisyUI badge classes
  const getColorClass = () => {
    if (!color) return ''

    const colorMap: Record<string, string> = {
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

    // Check if it's a preset color
    if (colorMap[color]) {
      return colorMap[color]
    }

    // Assume it's a custom hex/color
    return ''
  }

  const sizeClasses = {
    xs: 'badge-xs text-xs',
    sm: 'badge-sm text-sm',
    md: 'badge-md',
    lg: 'badge-lg text-lg',
  }

  const tagClasses = [
    'badge gap-1 inline-flex items-center',
    getColorClass(),
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const customColorStyle = color && !getColorClass() ? { backgroundColor: color, borderColor: color } : undefined

  return (
    <span className={tagClasses} style={customColorStyle} {...rest}>
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
      {closable && (
        <button
          type="button"
          onClick={handleClose}
          className="btn btn-ghost btn-xs p-0 min-h-0 h-auto hover:bg-transparent"
          aria-label="Close"
        >
          {closeIcon || (
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
    </span>
  )
}

export const CheckableTag: React.FC<CheckableTagProps> = ({
  checked = false,
  onChange,
  icon,
  children,
  className = '',
  ...rest
}) => {
  const handleClick = () => {
    onChange?.(!checked)
  }

  const tagClasses = [
    'badge badge-md gap-1 cursor-pointer transition-colors',
    checked ? 'badge-primary' : 'badge-outline hover:badge-primary hover:badge-outline',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={tagClasses} onClick={handleClick} role="checkbox" aria-checked={checked} {...rest}>
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </span>
  )
}
