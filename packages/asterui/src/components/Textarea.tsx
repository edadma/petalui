import React, { forwardRef } from 'react'
import { useConfig } from './ConfigProvider'

// DaisyUI classes
const dTextarea = 'textarea'
const dTextareaBordered = 'textarea-bordered'
const dTextareaGhost = 'textarea-ghost'
const dTextareaXs = 'textarea-xs'
const dTextareaSm = 'textarea-sm'
const dTextareaMd = 'textarea-md'
const dTextareaLg = 'textarea-lg'
const dTextareaXl = 'textarea-xl'
const dTextareaNeutral = 'textarea-neutral'
const dTextareaPrimary = 'textarea-primary'
const dTextareaSecondary = 'textarea-secondary'
const dTextareaAccent = 'textarea-accent'
const dTextareaInfo = 'textarea-info'
const dTextareaSuccess = 'textarea-success'
const dTextareaWarning = 'textarea-warning'
const dTextareaError = 'textarea-error'

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
    const { componentSize } = useConfig()
    const effectiveSize = size ?? componentSize ?? 'md'

    const sizeClasses = {
      xs: dTextareaXs,
      sm: dTextareaSm,
      md: dTextareaMd,
      lg: dTextareaLg,
      xl: dTextareaXl,
    }

    const colorClasses = {
      neutral: dTextareaNeutral,
      primary: dTextareaPrimary,
      secondary: dTextareaSecondary,
      accent: dTextareaAccent,
      info: dTextareaInfo,
      success: dTextareaSuccess,
      warning: dTextareaWarning,
      error: dTextareaError,
    }

    const textareaClasses = [
      dTextarea,
      'w-full',
      bordered && dTextareaBordered,
      ghost && dTextareaGhost,
      effectiveSize && sizeClasses[effectiveSize],
      color && colorClasses[color],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return <textarea ref={ref} className={textareaClasses} {...props} />
  }
)

Textarea.displayName = 'Textarea'
