import React, { useState, useId } from 'react'
import { useConfig } from './ConfigProvider'

// DaisyUI classes
const dFilter = 'd-filter'
const dBtn = 'd-btn'
const dBtnXs = 'd-btn-xs'
const dBtnSm = 'd-btn-sm'
const dBtnLg = 'd-btn-lg'
const dBtnXl = 'd-btn-xl'
const dBtnSquare = 'd-btn-square'

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
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Show reset button */
  showReset?: boolean
  /** Reset button label */
  resetLabel?: React.ReactNode
  /** Additional CSS classes for container */
  className?: string
}

const sizeClasses: Record<string, string> = {
  xs: dBtnXs,
  sm: dBtnSm,
  md: '',
  lg: dBtnLg,
  xl: dBtnXl,
}

export const Filter: React.FC<FilterProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  name,
  size,
  showReset = true,
  resetLabel = '×',
  className = '',
}) => {
  const { componentSize } = useConfig()
  const effectiveSize = size ?? componentSize ?? 'md'

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

  const buttonClasses = [dBtn, sizeClasses[effectiveSize]].filter(Boolean).join(' ')
  const resetClasses = [dBtn, dBtnSquare, sizeClasses[effectiveSize]].filter(Boolean).join(' ')

  return (
    <form className={`${dFilter} ${className}`.trim()} onReset={handleReset}>
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
