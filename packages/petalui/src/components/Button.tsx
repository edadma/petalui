import React from 'react'

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral' | 'ghost' | 'link'
  htmlType?: 'button' | 'submit' | 'reset'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  outline?: boolean
  dash?: boolean
  soft?: boolean
  active?: boolean
  loading?: boolean
  shape?: 'square' | 'circle' | 'wide' | 'block'
  noAnimation?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  htmlType = 'button',
  size = 'md',
  outline = false,
  dash = false,
  soft = false,
  active = false,
  loading = false,
  shape,
  noAnimation = false,
  className = '',
  ...props
}) => {
  const typeClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    info: 'btn-info',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
    neutral: 'btn-neutral',
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
    wide: 'btn-wide',
    block: 'btn-block',
  }

  const classes = [
    'btn',
    type && typeClasses[type],
    sizeClasses[size],
    outline && 'btn-outline',
    dash && 'btn-dash',
    soft && 'btn-soft',
    active && 'btn-active',
    shape && shapeClasses[shape],
    noAnimation && 'no-animation',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={htmlType}
      className={classes}
      aria-busy={loading ? 'true' : undefined}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <span className="loading loading-spinner" aria-hidden="true"></span>}
      {children}
    </button>
  )
}
