import React, { forwardRef } from 'react'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'info' | 'error'
  indeterminate?: boolean
  className?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size,
      color,
      indeterminate = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      xs: 'checkbox-xs',
      sm: 'checkbox-sm',
      md: 'checkbox-md',
      lg: 'checkbox-lg',
      xl: 'checkbox-xl',
    }

    const colorClasses = {
      primary: 'checkbox-primary',
      secondary: 'checkbox-secondary',
      accent: 'checkbox-accent',
      neutral: 'checkbox-neutral',
      success: 'checkbox-success',
      warning: 'checkbox-warning',
      info: 'checkbox-info',
      error: 'checkbox-error',
    }

    const checkboxClasses = [
      'checkbox',
      size && sizeClasses[size],
      color && colorClasses[color],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    // Handle indeterminate state
    const checkboxRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        if (node) {
          node.indeterminate = indeterminate
        }
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [indeterminate, ref]
    )

    return <input ref={checkboxRef} type="checkbox" className={checkboxClasses} {...props} />
  }
)

Checkbox.displayName = 'Checkbox'
