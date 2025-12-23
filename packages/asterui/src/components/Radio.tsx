import React, { forwardRef, createContext, useContext } from 'react'
import { useConfig } from '../providers/ConfigProvider'

// DaisyUI classes
const dRadio = 'radio'
const dRadioXs = 'radio-xs'
const dRadioSm = 'radio-sm'
const dRadioMd = 'radio-md'
const dRadioLg = 'radio-lg'
const dRadioXl = 'radio-xl'
const dRadioNeutral = 'radio-neutral'
const dRadioPrimary = 'radio-primary'
const dRadioSecondary = 'radio-secondary'
const dRadioAccent = 'radio-accent'
const dRadioInfo = 'radio-info'
const dRadioSuccess = 'radio-success'
const dRadioWarning = 'radio-warning'
const dRadioError = 'radio-error'

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  className?: string
  children?: React.ReactNode
  /** Test ID for testing */
  'data-testid'?: string
}

export interface RadioGroupChangeEvent {
  target: {
    value: string | number
    name?: string
  }
}

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  children: React.ReactNode
  value?: string | number
  defaultValue?: string | number
  onChange?: (e: RadioGroupChangeEvent) => void
  name?: string
  /** Test ID for testing */
  'data-testid'?: string
}

interface RadioGroupContextValue {
  value?: string | number
  onChange?: (value: string | number) => void
  name?: string
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

function RadioGroup({ children, value, defaultValue, onChange, name, className = '', 'data-testid': testId, ...rest }: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const currentValue = value !== undefined ? value : internalValue

  const handleChange = (newValue: string | number) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onChange?.({ target: { value: newValue, name } })
  }

  return (
    <RadioGroupContext.Provider value={{ value: currentValue, onChange: handleChange, name }}>
      <div role="radiogroup" className={className} data-testid={testId} {...rest}>{children}</div>
    </RadioGroupContext.Provider>
  )
}

const RadioRoot = forwardRef<HTMLInputElement, RadioProps>(
  ({ size, color, className = '', value, checked, onChange, name: nameProp, children, ...props }, ref) => {
    const { componentSize } = useConfig()
    const effectiveSize = size ?? componentSize ?? 'md'
    const groupContext = useContext(RadioGroupContext)

    const sizeClasses = {
      xs: dRadioXs,
      sm: dRadioSm,
      md: dRadioMd,
      lg: dRadioLg,
      xl: dRadioXl,
    }

    const colorClasses = {
      neutral: dRadioNeutral,
      primary: dRadioPrimary,
      secondary: dRadioSecondary,
      accent: dRadioAccent,
      info: dRadioInfo,
      success: dRadioSuccess,
      warning: dRadioWarning,
      error: dRadioError,
    }

    const radioClasses = [dRadio, effectiveSize && sizeClasses[effectiveSize], color && colorClasses[color]]
      .filter(Boolean)
      .join(' ')

    // If in a group, use group's value and onChange
    const isChecked = groupContext ? groupContext.value === value : checked
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (groupContext && value !== undefined) {
        const normalizedValue = typeof value === 'string' || typeof value === 'number' ? value : String(value)
        groupContext.onChange?.(normalizedValue)
      }
      onChange?.(e)
    }
    const name = groupContext?.name || nameProp

    const dataState = isChecked ? 'checked' : 'unchecked'

    const input = (
      <input
        ref={ref}
        type="radio"
        className={radioClasses}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        name={name}
        data-state={dataState}
        {...props}
      />
    )

    // If children are provided, wrap in a label
    if (children) {
      return (
        <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
          <span className="flex-shrink-0">{input}</span>
          <span>{children}</span>
        </label>
      )
    }

    return input
  }
)

RadioRoot.displayName = 'Radio'

export const Radio = Object.assign(RadioRoot, {
  Group: RadioGroup,
})
