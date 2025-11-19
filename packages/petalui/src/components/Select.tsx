import React, { forwardRef } from 'react'

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  ghost?: boolean
  bordered?: boolean
  className?: string
  children?: React.ReactNode
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size,
      color,
      ghost = false,
      bordered = true,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      xs: 'select-xs',
      sm: 'select-sm',
      md: 'select-md',
      lg: 'select-lg',
      xl: 'select-xl',
    }

    const colorClasses = {
      neutral: 'select-neutral',
      primary: 'select-primary',
      secondary: 'select-secondary',
      accent: 'select-accent',
      info: 'select-info',
      success: 'select-success',
      warning: 'select-warning',
      error: 'select-error',
    }

    const selectClasses = [
      'select',
      'w-full',
      bordered && 'select-bordered',
      ghost && 'select-ghost',
      size && sizeClasses[size],
      color && colorClasses[color],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <select ref={ref} className={selectClasses} {...props}>
        {children}
      </select>
    )
  }
)

Select.displayName = 'Select'
