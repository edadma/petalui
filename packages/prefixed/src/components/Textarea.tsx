import React, { forwardRef } from 'react'

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  ghost?: boolean
  bordered?: boolean
  className?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size,
      color,
      ghost = false,
      bordered = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      xs: 'd-textarea-xs',
      sm: 'd-textarea-sm',
      md: 'd-textarea-md',
      lg: 'd-textarea-lg',
      xl: 'd-textarea-xl',
    }

    const colorClasses = {
      neutral: 'd-textarea-neutral',
      primary: 'd-textarea-primary',
      secondary: 'd-textarea-secondary',
      accent: 'd-textarea-accent',
      info: 'd-textarea-info',
      success: 'd-textarea-success',
      warning: 'd-textarea-warning',
      error: 'd-textarea-error',
    }

    const textareaClasses = [
      'd-textarea',
      'w-full',
      bordered && 'textarea-bordered',
      ghost && 'd-textarea-ghost',
      size && sizeClasses[size],
      color && colorClasses[color],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return <textarea ref={ref} className={textareaClasses} {...props} />
  }
)

Textarea.displayName = 'Textarea'
