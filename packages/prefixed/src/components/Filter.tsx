import React, { useState, useId } from 'react'

export interface FilterOption {
  label: string
  value: string
  disabled?: boolean
}

export interface FilterProps {
  /** Filter options */
  options: (string | FilterOption)[]
  /** Controlled value */
  value?: string
  /** Default value for uncontrolled mode */
  defaultValue?: string
  /** Change handler */
  onChange?: (value: string | undefined) => void
  /** Radio group name (auto-generated if not provided) */
  name?: string
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Show reset button */
  showReset?: boolean
  /** Reset button label */
  resetLabel?: React.ReactNode
  /** Additional CSS classes for container */
  className?: string
}

const sizeClasses: Record<string, string> = {
  xs: 'd-btn-xs',
  sm: 'd-btn-sm',
  md: '',
  lg: 'd-btn-lg',
}

export const Filter: React.FC<FilterProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  name,
  size = 'md',
  showReset = true,
  resetLabel = '×',
  className = '',
}) => {
  const autoId = useId()
  const groupName = name || `filter-${autoId}`

  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue)
  const currentValue = value !== undefined ? value : internalValue
  const isControlled = value !== undefined

  const normalizedOptions: FilterOption[] = options.map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  )

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const handleReset = () => {
    if (!isControlled) {
      setInternalValue(undefined)
    }
    onChange?.(undefined)
  }

  const buttonClasses = ['d-btn', sizeClasses[size]].filter(Boolean).join(' ')
  const resetClasses = ['d-btn', 'd-btn-square', sizeClasses[size]].filter(Boolean).join(' ')

  return (
    <form className={`d-filter ${className}`.trim()} onReset={handleReset}>
      {showReset && (
        <input
          className={resetClasses}
          type="reset"
          value={typeof resetLabel === 'string' ? resetLabel : undefined}
          aria-label="Reset filter"
        />
      )}
      {normalizedOptions.map((option) => (
        <input
          key={option.value}
          className={buttonClasses}
          type="radio"
          name={groupName}
          value={option.value}
          aria-label={option.label}
          checked={currentValue === option.value}
          onChange={() => handleChange(option.value)}
          disabled={option.disabled}
        />
      ))}
    </form>
  )
}
