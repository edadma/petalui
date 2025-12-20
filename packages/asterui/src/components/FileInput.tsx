import React, { forwardRef } from 'react'
import { useConfig } from './ConfigProvider'

// DaisyUI classes
const dFileInput = 'file-input'
const dFileInputXs = 'file-input-xs'
const dFileInputSm = 'file-input-sm'
const dFileInputMd = 'file-input-md'
const dFileInputLg = 'file-input-lg'
const dFileInputXl = 'file-input-xl'
const dFileInputNeutral = 'file-input-neutral'
const dFileInputPrimary = 'file-input-primary'
const dFileInputSecondary = 'file-input-secondary'
const dFileInputAccent = 'file-input-accent'
const dFileInputInfo = 'file-input-info'
const dFileInputSuccess = 'file-input-success'
const dFileInputWarning = 'file-input-warning'
const dFileInputError = 'file-input-error'
const dFileInputGhost = 'file-input-ghost'

export interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  ghost?: boolean
  bordered?: boolean
  className?: string
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ size, color, ghost = false, bordered = true, className = '', ...props }, ref) => {
    const { componentSize } = useConfig()
    const effectiveSize = size ?? componentSize ?? 'md'

    const sizeClasses = {
      xs: dFileInputXs,
      sm: dFileInputSm,
      md: dFileInputMd,
      lg: dFileInputLg,
      xl: dFileInputXl,
    }

    const colorClasses = {
      neutral: dFileInputNeutral,
      primary: dFileInputPrimary,
      secondary: dFileInputSecondary,
      accent: dFileInputAccent,
      info: dFileInputInfo,
      success: dFileInputSuccess,
      warning: dFileInputWarning,
      error: dFileInputError,
    }

    const fileInputClasses = [
      dFileInput,
      'w-full',
      // In DaisyUI 5, borders are on by default. Use ghost to remove them.
      !bordered && dFileInputGhost,
      ghost && dFileInputGhost,
      effectiveSize && sizeClasses[effectiveSize],
      color && colorClasses[color],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return <input ref={ref} type="file" className={fileInputClasses} {...props} />
  }
)

FileInput.displayName = 'FileInput'
