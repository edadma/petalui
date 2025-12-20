import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { useConfig } from './ConfigProvider'

// DaisyUI classes
const dInput = 'input'
const dInputXs = 'input-xs'
const dInputSm = 'input-sm'
const dInputMd = 'input-md'
const dInputLg = 'input-lg'
const dInputXl = 'input-xl'
const dInputDisabled = 'input-disabled'
const dBtn = 'btn'
const dBtnXs = 'btn-xs'
const dBtnSm = 'btn-sm'
const dBtnGhost = 'btn-ghost'

export interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value' | 'defaultValue'> {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  precision?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  onChange?: (value: number | null) => void
  formatter?: (value: number | undefined) => string
  parser?: (displayValue: string) => number
  className?: string
  controls?: boolean
  block?: boolean
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      min = -Infinity,
      max = Infinity,
      step = 1,
      precision,
      size,
      disabled = false,
      onChange,
      formatter,
      parser,
      className = '',
      controls = true,
      block = false,
      ...props
    },
    ref
  ) => {
    const { componentSize } = useConfig()
    const effectiveSize = size ?? componentSize ?? 'md'

    const [internalValue, setInternalValue] = useState<number | null>(defaultValue ?? null)
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => inputRef.current!)

    const value = controlledValue !== undefined ? controlledValue : internalValue

    const formatValue = (num: number | null): string => {
      if (num === null) return ''
      let formatted = num
      if (precision !== undefined) {
        formatted = Number(num.toFixed(precision))
      }
      return formatter ? formatter(formatted) : String(formatted)
    }

    const parseValue = (str: string): number | null => {
      if (!str) return null
      const parsed = parser ? parser(str) : parseFloat(str)
      if (isNaN(parsed)) return null
      return parsed
    }

    const clampValue = (num: number): number => {
      let clamped = Math.max(min, Math.min(max, num))
      if (precision !== undefined) {
        clamped = Number(clamped.toFixed(precision))
      }
      return clamped
    }

    const updateValue = (newValue: number | null) => {
      if (newValue === null) {
        if (controlledValue === undefined) {
          setInternalValue(null)
        }
        onChange?.(null)
        return
      }

      const clamped = clampValue(newValue)
      if (controlledValue === undefined) {
        setInternalValue(clamped)
      }
      onChange?.(clamped)
    }

    const handleIncrement = () => {
      if (disabled) return
      const currentValue = value ?? 0
      updateValue(currentValue + step)
    }

    const handleDecrement = () => {
      if (disabled) return
      const currentValue = value ?? 0
      updateValue(currentValue - step)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseValue(e.target.value)
      if (parsed !== null) {
        updateValue(parsed)
      } else if (e.target.value === '') {
        updateValue(null)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        handleIncrement()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        handleDecrement()
      }
    }

    const handleBlur = () => {
      // Ensure value is within bounds on blur
      if (value !== null && (value < min || value > max)) {
        updateValue(clampValue(value))
      }
    }

    const sizeClasses = {
      xs: dInputXs,
      sm: dInputSm,
      md: dInputMd,
      lg: dInputLg,
      xl: dInputXl,
    }

    const inputClasses = [
      dInput,
      'w-full',
      effectiveSize && sizeClasses[effectiveSize],
      disabled && dInputDisabled,
      controls && 'pr-8',
    ]
      .filter(Boolean)
      .join(' ')

    const buttonSize = effectiveSize === 'xs' || effectiveSize === 'sm' ? dBtnXs : dBtnSm

    return (
      <div className={`relative ${block ? 'w-full' : 'inline-block'} group ${className}`}>
        <input
          ref={inputRef}
          type="text"
          inputMode="decimal"
          role="spinbutton"
          aria-valuemin={min !== -Infinity ? min : undefined}
          aria-valuemax={max !== Infinity ? max : undefined}
          aria-valuenow={value ?? undefined}
          className={inputClasses}
          value={formatValue(value)}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={disabled}
          {...props}
        />
        {controls && (
          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              aria-label="Increase value"
              className={`${dBtn} ${buttonSize} ${dBtnGhost} px-1 min-h-0 h-3.5`}
              onClick={handleIncrement}
              disabled={disabled || (value !== null && value >= max)}
              tabIndex={-1}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Decrease value"
              className={`${dBtn} ${buttonSize} ${dBtnGhost} px-1 min-h-0 h-3.5`}
              onClick={handleDecrement}
              disabled={disabled || (value !== null && value <= min)}
              tabIndex={-1}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    )
  }
)

InputNumber.displayName = 'InputNumber'

export default InputNumber
