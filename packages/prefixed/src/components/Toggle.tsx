import React, { forwardRef } from 'react'
import { useConfig } from './ConfigProvider'

// DaisyUI classes
const dToggle = 'd-toggle'
const dToggleXs = 'd-toggle-xs'
const dToggleSm = 'd-toggle-sm'
const dToggleMd = 'd-toggle-md'
const dToggleLg = 'd-toggle-lg'
const dToggleXl = 'd-toggle-xl'
const dTogglePrimary = 'd-toggle-primary'
const dToggleSecondary = 'd-toggle-secondary'
const dToggleAccent = 'd-toggle-accent'
const dToggleNeutral = 'd-toggle-neutral'
const dToggleSuccess = 'd-toggle-success'
const dToggleWarning = 'd-toggle-warning'
const dToggleInfo = 'd-toggle-info'
const dToggleError = 'd-toggle-error'

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
    const { componentSize } = useConfig()
    const effectiveSize = size ?? componentSize ?? 'md'

    const sizeClasses = {
      xs: dToggleXs,
      sm: dToggleSm,
      md: dToggleMd,
      lg: dToggleLg,
      xl: dToggleXl,
    }

    const colorClasses = {
      primary: dTogglePrimary,
      secondary: dToggleSecondary,
      accent: dToggleAccent,
      neutral: dToggleNeutral,
      success: dToggleSuccess,
      warning: dToggleWarning,
      info: dToggleInfo,
      error: dToggleError,
    }

    const toggleClasses = [
      dToggle,
      effectiveSize && sizeClasses[effectiveSize],
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
