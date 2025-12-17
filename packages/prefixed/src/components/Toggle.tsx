import React, { forwardRef } from 'react'

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'info' | 'error'
  className?: string
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      size,
      color,
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      xs: 'd-toggle-xs',
      sm: 'd-toggle-sm',
      md: 'd-toggle-md',
      lg: 'd-toggle-lg',
      xl: 'd-toggle-xl',
    }

    const colorClasses = {
      primary: 'd-toggle-primary',
      secondary: 'd-toggle-secondary',
      accent: 'd-toggle-accent',
      neutral: 'd-toggle-neutral',
      success: 'd-toggle-success',
      warning: 'd-toggle-warning',
      info: 'd-toggle-info',
      error: 'd-toggle-error',
    }

    const toggleClasses = [
      'd-toggle',
      size && sizeClasses[size],
      color && colorClasses[color],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const dataState = props.checked ? 'checked' : 'unchecked'
    return <input ref={ref} type="checkbox" className={toggleClasses} data-state={dataState} {...props} />
  }
)

Toggle.displayName = 'Toggle'
