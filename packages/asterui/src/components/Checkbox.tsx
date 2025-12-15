import React, { forwardRef, createContext, useContext } from 'react'

export interface CheckboxSwapConfig {
  /** Content shown when checked */
  on: React.ReactNode
  /** Content shown when unchecked */
  off: React.ReactNode
  /** Animation effect for the swap transition */
  effect?: 'rotate' | 'flip'
}

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  children?: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'info' | 'error'
  indeterminate?: boolean
  /** Swap mode: toggle between two visual states instead of showing a checkbox */
  swap?: CheckboxSwapConfig
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
  /** Layout direction for options */
  direction?: 'horizontal' | 'vertical'
  /** HTML name attribute for all checkboxes in the group (for form submission) */
  name?: string
  className?: string
  'data-testid'?: string
}

interface CheckboxGroupContextValue {
  value?: (string | number)[]
  onChange?: (checkedValue: string | number, checked: boolean) => void
  disabled?: boolean
  name?: string
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null)

function CheckboxGroup({
  children,
  value,
  defaultValue,
  onChange,
  disabled = false,
  options,
  direction = 'vertical',
  name,
  className = '',
  'data-testid': testId
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
    name,
  }

  // If options are provided, render checkboxes automatically
  if (options) {
    const directionClasses = direction === 'horizontal' ? 'flex flex-row flex-wrap gap-4' : 'flex flex-col gap-2'
    return (
      <CheckboxGroupContext.Provider value={contextValue}>
        <div className={`${directionClasses} ${className}`.trim()} data-testid={testId}>
          {options.map((option) => {
            if (typeof option === 'string' || typeof option === 'number') {
              const optionTestId = testId ? `${testId}-option-${option}` : undefined
              return (
                <label key={option} className="flex items-center cursor-pointer gap-2">
                  <CheckboxRoot value={option} data-testid={optionTestId} />
                  <span>{option}</span>
                </label>
              )
            } else {
              const optionTestId = testId ? `${testId}-option-${option.value}` : undefined
              return (
                <label key={option.value} className="flex items-center cursor-pointer gap-2">
                  <CheckboxRoot value={option.value} disabled={option.disabled} data-testid={optionTestId} />
                  <span>{option.label}</span>
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
      swap,
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

    // Get name from group context or props
    const inputName = groupContext?.name ?? props.name

    // aria-checked should be "mixed" for indeterminate state
    const ariaChecked = indeterminate ? 'mixed' : undefined

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

    // Swap mode: render as a swap toggle instead of checkbox
    if (swap) {
      const swapClasses = [
        'swap',
        swap.effect === 'rotate' && 'swap-rotate',
        swap.effect === 'flip' && 'swap-flip',
        className,
      ]
        .filter(Boolean)
        .join(' ')

      return (
        <label className={swapClasses}>
          <input
            ref={ref}
            type="checkbox"
            name={inputName}
            checked={isChecked}
            onChange={handleChange}
            disabled={isDisabled}
            aria-checked={ariaChecked}
            data-state={dataState}
            {...props}
          />
          <div className="swap-on">{swap.on}</div>
          <div className="swap-off">{swap.off}</div>
        </label>
      )
    }

    // If children provided, wrap in label
    if (children) {
      return (
        <label className={`flex items-center cursor-pointer gap-2 ${className}`.trim()}>
          <input
            ref={checkboxRef}
            type="checkbox"
            className={checkboxClasses}
            name={inputName}
            value={value}
            checked={isChecked}
            onChange={handleChange}
            disabled={isDisabled}
            aria-checked={ariaChecked}
            data-state={dataState}
            {...props}
          />
          <span>{children}</span>
        </label>
      )
    }

    // Bare checkbox input (no children, no swap)
    return (
      <input
        ref={checkboxRef}
        type="checkbox"
        className={`${checkboxClasses} ${className}`.trim()}
        name={inputName}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        disabled={isDisabled}
        aria-checked={ariaChecked}
        data-state={dataState}
        {...props}
      />
    )
  }
)

CheckboxRoot.displayName = 'Checkbox'

export const Checkbox = Object.assign(CheckboxRoot, {
  Group: CheckboxGroup,
})
