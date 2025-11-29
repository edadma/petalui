import React, { forwardRef, createContext, useContext } from 'react'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  children?: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'info' | 'error'
  indeterminate?: boolean
  className?: string
}

export interface CheckboxOptionType {
  label: React.ReactNode
  value: string | number
  disabled?: boolean
}

export interface CheckboxGroupProps {
  children?: React.ReactNode
  value?: (string | number)[]
  defaultValue?: (string | number)[]
  onChange?: (values: (string | number)[]) => void
  disabled?: boolean
  options?: (string | number | CheckboxOptionType)[]
  className?: string
}

interface CheckboxGroupContextValue {
  value?: (string | number)[]
  onChange?: (checkedValue: string | number, checked: boolean) => void
  disabled?: boolean
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null)

function CheckboxGroup({
  children,
  value,
  defaultValue,
  onChange,
  disabled = false,
  options,
  className = ''
}: CheckboxGroupProps) {
  const [internalValue, setInternalValue] = React.useState<(string | number)[]>(defaultValue || [])
  const currentValue = value !== undefined ? value : internalValue

  const handleChange = (checkedValue: string | number, checked: boolean) => {
    const newValue = checked
      ? [...currentValue, checkedValue]
      : currentValue.filter((v) => v !== checkedValue)

    if (value === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const contextValue: CheckboxGroupContextValue = {
    value: currentValue,
    onChange: handleChange,
    disabled,
  }

  // If options are provided, render checkboxes automatically
  if (options) {
    return (
      <CheckboxGroupContext.Provider value={contextValue}>
        <div className={className}>
          {options.map((option) => {
            if (typeof option === 'string' || typeof option === 'number') {
              return (
                <label key={option} className="label cursor-pointer justify-start gap-2">
                  <CheckboxRoot value={option} />
                  <span className="label-text">{option}</span>
                </label>
              )
            } else {
              return (
                <label key={option.value} className="label cursor-pointer justify-start gap-2">
                  <CheckboxRoot value={option.value} disabled={option.disabled} />
                  <span className="label-text">{option.label}</span>
                </label>
              )
            }
          })}
        </div>
      </CheckboxGroupContext.Provider>
    )
  }

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div className={className}>{children}</div>
    </CheckboxGroupContext.Provider>
  )
}

const CheckboxRoot = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      children,
      size,
      color,
      indeterminate = false,
      className = '',
      value,
      checked,
      onChange,
      disabled: disabledProp,
      ...props
    },
    ref
  ) => {
    const groupContext = useContext(CheckboxGroupContext)

    const sizeClasses = {
      xs: 'checkbox-xs',
      sm: 'checkbox-sm',
      md: 'checkbox-md',
      lg: 'checkbox-lg',
      xl: 'checkbox-xl',
    }

    const colorClasses = {
      primary: 'checkbox-primary',
      secondary: 'checkbox-secondary',
      accent: 'checkbox-accent',
      neutral: 'checkbox-neutral',
      success: 'checkbox-success',
      warning: 'checkbox-warning',
      info: 'checkbox-info',
      error: 'checkbox-error',
    }

    const checkboxClasses = [
      'checkbox',
      size && sizeClasses[size],
      color && colorClasses[color],
    ]
      .filter(Boolean)
      .join(' ')

    // If in a group, use group's value to determine checked state
    const isChecked = groupContext && value !== undefined && (typeof value === 'string' || typeof value === 'number')
      ? groupContext.value?.includes(value) ?? false
      : checked

    const isDisabled = groupContext?.disabled || disabledProp

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (groupContext && value !== undefined && (typeof value === 'string' || typeof value === 'number')) {
        groupContext.onChange?.(value, e.target.checked)
      }
      onChange?.(e)
    }

    // Handle indeterminate state
    const checkboxRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        if (node) {
          node.indeterminate = indeterminate
        }
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [indeterminate, ref]
    )

    const dataState = indeterminate ? 'indeterminate' : isChecked ? 'checked' : 'unchecked'

    const checkboxInput = (
      <input
        ref={checkboxRef}
        type="checkbox"
        className={checkboxClasses}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        disabled={isDisabled}
        data-state={dataState}
        {...props}
      />
    )

    // If children provided, wrap in label
    if (children) {
      return (
        <label className={`label cursor-pointer justify-start gap-2 ${className}`}>
          {checkboxInput}
          <span className="label-text">{children}</span>
        </label>
      )
    }

    return checkboxInput
  }
)

CheckboxRoot.displayName = 'Checkbox'

export const Checkbox = Object.assign(CheckboxRoot, {
  Group: CheckboxGroup,
})
