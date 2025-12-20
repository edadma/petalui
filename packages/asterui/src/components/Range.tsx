import React, { useState } from 'react'
import { useConfig } from './ConfigProvider'

// DaisyUI classes
const dRange = 'range'
const dRangeXs = 'range-xs'
const dRangeSm = 'range-sm'
const dRangeMd = 'range-md'
const dRangeLg = 'range-lg'
const dRangeXl = 'range-xl'
const dRangePrimary = 'range-primary'
const dRangeSecondary = 'range-secondary'
const dRangeAccent = 'range-accent'
const dRangeSuccess = 'range-success'
const dRangeWarning = 'range-warning'
const dRangeInfo = 'range-info'
const dRangeError = 'range-error'

export interface RangeProps {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error'
  disabled?: boolean
  showValue?: boolean
  showSteps?: boolean
  className?: string
}

export const Range: React.FC<RangeProps> = ({
  value,
  defaultValue = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  size,
  color,
  disabled = false,
  showValue = false,
  showSteps = false,
  className = '',
}) => {
  const { componentSize } = useConfig()
  const effectiveSize = size ?? componentSize ?? 'md'
  const [internalValue, setInternalValue] = useState(defaultValue)
  const currentValue = value !== undefined ? value : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const sizeClasses = {
    xs: dRangeXs,
    sm: dRangeSm,
    md: dRangeMd,
    lg: dRangeLg,
    xl: dRangeXl,
  } as const

  const colorClasses = {
    primary: dRangePrimary,
    secondary: dRangeSecondary,
    accent: dRangeAccent,
    success: dRangeSuccess,
    warning: dRangeWarning,
    info: dRangeInfo,
    error: dRangeError,
  } as const

  const sizeClass = sizeClasses[effectiveSize]
  const colorClass = color ? colorClasses[color] : ''

  // Calculate steps for visual markers
  const steps = showSteps
    ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step)
    : []

  return (
    <div className={className}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={handleChange}
        disabled={disabled}
        className={`${dRange} ${sizeClass} ${colorClass}`}
      />
      {showSteps && steps.length > 0 && (
        <div className="w-full flex justify-between text-xs px-2 mt-2">
          {steps.map((stepValue) => (
            <span key={stepValue} className="text-base-content/60">
              |
            </span>
          ))}
        </div>
      )}
      {showValue && (
        <div className="text-center mt-2 text-sm font-medium text-base-content">
          {currentValue}
        </div>
      )}
    </div>
  )
}
