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
      xs: 'file-input-xs',
      sm: 'file-input-sm',
      md: 'file-input-md',
      lg: 'file-input-lg',
      xl: 'file-input-xl',
    }

    const colorClasses = {
      neutral: 'file-input-neutral',
      primary: 'file-input-primary',
      secondary: 'file-input-secondary',
      accent: 'file-input-accent',
      info: 'file-input-info',
      success: 'file-input-success',
      warning: 'file-input-warning',
      error: 'file-input-error',
    }

    const fileInputClasses = [
      'file-input',
      'w-full',
      // In DaisyUI 5, borders are on by default. Use ghost to remove them.
      !bordered && 'file-input-ghost',
      ghost && 'file-input-ghost',
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
