import React, { forwardRef } from 'react'

export interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  ghost?: boolean
  bordered?: boolean
  className?: string
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ size, color, ghost = false, bordered = true, className = '', ...props }, ref) => {
    const sizeClasses = {
      xs: 'd-file-input-xs',
      sm: 'd-file-input-sm',
      md: 'd-file-input-md',
      lg: 'd-file-input-lg',
      xl: 'd-file-input-xl',
    }

    const colorClasses = {
      neutral: 'd-file-input-neutral',
      primary: 'd-file-input-primary',
      secondary: 'd-file-input-secondary',
      accent: 'd-file-input-accent',
      info: 'd-file-input-info',
      success: 'd-file-input-success',
      warning: 'd-file-input-warning',
      error: 'd-file-input-error',
    }

    const fileInputClasses = [
      'd-file-input',
      'w-full',
      // In DaisyUI 5, borders are on by default. Use ghost to remove them.
      !bordered && 'd-file-input-ghost',
      ghost && 'd-file-input-ghost',
      size && sizeClasses[size],
      color && colorClasses[color],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return <input ref={ref} type="file" className={fileInputClasses} {...props} />
  }
)

FileInput.displayName = 'FileInput'
