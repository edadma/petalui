import React, { forwardRef } from 'react'
import { useConfig } from './ConfigProvider'

// DaisyUI classes
const dTextarea = 'd-textarea'
const dTextareaBordered = 'd-textarea-bordered'
const dTextareaGhost = 'd-textarea-ghost'
const dTextareaXs = 'd-textarea-xs'
const dTextareaSm = 'd-textarea-sm'
const dTextareaMd = 'd-textarea-md'
const dTextareaLg = 'd-textarea-lg'
const dTextareaXl = 'd-textarea-xl'
const dTextareaNeutral = 'd-textarea-neutral'
const dTextareaPrimary = 'd-textarea-primary'
const dTextareaSecondary = 'd-textarea-secondary'
const dTextareaAccent = 'd-textarea-accent'
const dTextareaInfo = 'd-textarea-info'
const dTextareaSuccess = 'd-textarea-success'
const dTextareaWarning = 'd-textarea-warning'
const dTextareaError = 'd-textarea-error'

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
