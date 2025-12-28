import React, { forwardRef } from 'react'
import { useConfig } from '../providers/ConfigProvider'

// DaisyUI classes
const dToggle = 'toggle'
const dToggleXs = 'toggle-xs'
const dToggleSm = 'toggle-sm'
const dToggleMd = 'toggle-md'
const dToggleLg = 'toggle-lg'
const dToggleXl = 'toggle-xl'
const dTogglePrimary = 'toggle-primary'
const dToggleSecondary = 'toggle-secondary'
const dToggleAccent = 'toggle-accent'
const dToggleNeutral = 'toggle-neutral'
const dToggleSuccess = 'toggle-success'
const dToggleWarning = 'toggle-warning'
const dToggleInfo = 'toggle-info'
const dToggleError = 'toggle-error'

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'info' | 'error'
  className?: string
  /** Test ID for testing */
  'data-testid'?: string
  /** Callback fired when the checked state changes */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      size,
      color,
      className = '',
      onChange,
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.checked, event)
    }

    const dataState = props.checked ? 'checked' : 'unchecked'
    return <input ref={ref} type="checkbox" className={toggleClasses} data-state={dataState} {...props} onChange={handleChange} />
  }
)

Toggle.displayName = 'Toggle'
