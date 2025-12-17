import React, { forwardRef, createContext, useContext } from 'react'

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  className?: string
  children?: React.ReactNode
}

export interface RadioGroupChangeEvent {
  target: {
    value: string | number
    name?: string
  }
}

export interface RadioGroupProps {
  children: React.ReactNode
  value?: string | number
  defaultValue?: string | number
  onChange?: (e: RadioGroupChangeEvent) => void
  name?: string
  className?: string
}

interface RadioGroupContextValue {
  value?: string | number
  onChange?: (value: string | number) => void
  name?: string
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

function RadioGroup({ children, value, defaultValue, onChange, name, className = '' }: RadioGroupProps) {
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
      <div role="radiogroup" className={className}>{children}</div>
    </RadioGroupContext.Provider>
  )
}

const RadioRoot = forwardRef<HTMLInputElement, RadioProps>(
  ({ size, color, className = '', value, checked, onChange, name: nameProp, children, ...props }, ref) => {
    const groupContext = useContext(RadioGroupContext)

    const sizeClasses = {
      xs: 'd-radio-xs',
      sm: 'd-radio-sm',
      md: 'd-radio-md',
      lg: 'd-radio-lg',
      xl: 'd-radio-xl',
    }

    const colorClasses = {
      neutral: 'd-radio-neutral',
      primary: 'd-radio-primary',
      secondary: 'd-radio-secondary',
      accent: 'd-radio-accent',
      info: 'd-radio-info',
      success: 'd-radio-success',
      warning: 'd-radio-warning',
      error: 'd-radio-error',
    }

    const radioClasses = ['d-radio', size && sizeClasses[size], color && colorClasses[color]]
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
