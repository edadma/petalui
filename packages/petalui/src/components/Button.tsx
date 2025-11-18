import React from 'react'

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral' | 'ghost' | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  outline?: boolean
  active?: boolean
  loading?: boolean
  shape?: 'square' | 'circle' | 'wide' | 'block'
  noAnimation?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  size = 'md',
  outline = false,
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
    active && 'btn-active',
    shape && shapeClasses[shape],
    noAnimation && 'no-animation',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} {...props}>
      {loading && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  )
}
