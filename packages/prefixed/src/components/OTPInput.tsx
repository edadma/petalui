import React, { useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react'
import { useConfig } from './ConfigProvider'

// DaisyUI classes
const dInput = 'd-input'
const dInputXs = 'd-input-xs'
const dInputSm = 'd-input-sm'
const dInputLg = 'd-input-lg'
const dInputError = 'd-input-error'
const dInputDisabled = 'd-input-disabled'

export interface OTPInputProps {
  /** Number of input fields */
  length?: number
  /** Current value */
  value?: string
  /** Callback when value changes */
  onChange?: (value: string) => void
  /** Callback when all fields are filled */
  onComplete?: (value: string) => void
  /** Input size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Input type - number only or alphanumeric */
  type?: 'number' | 'text'
  /** Mask input (show dots instead of characters) */
  mask?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Error state */
  error?: boolean
  /** Auto focus first input on mount */
  autoFocus?: boolean
  /** Placeholder character */
  placeholder?: string
  /** Additional CSS classes */
  className?: string
}

export interface OTPInputRef {
  focus: () => void
  clear: () => void
}

export const OTPInput = forwardRef<OTPInputRef, OTPInputProps>(
  (
    {
      length = 6,
      value = '',
      onChange,
      onComplete,
      size,
      type = 'number',
      mask = false,
      disabled = false,
      error = false,
      autoFocus = false,
      placeholder = '',
      className = '',
    },
    ref
  ) => {
    const { componentSize } = useConfig()
    const effectiveSize = size ?? componentSize ?? 'md'
    const [otp, setOtp] = useState<string[]>(() => {
      const initial = value.split('').slice(0, length)
      return [...initial, ...Array(length - initial.length).fill('')]
    })

    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const sizeClasses = {
      xs: `${dInputXs} w-8 h-8 text-sm`,
      sm: `${dInputSm} w-10 h-10 text-base`,
      md: 'w-12 h-12 text-lg',
      lg: `${dInputLg} w-14 h-14 text-xl`,
      xl: 'w-16 h-16 text-2xl',
    }

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRefs.current[0]?.focus()
      },
      clear: () => {
        setOtp(Array(length).fill(''))
        inputRefs.current[0]?.focus()
      },
    }))

    useEffect(() => {
      if (autoFocus) {
        inputRefs.current[0]?.focus()
      }
    }, [autoFocus])

    useEffect(() => {
      const newOtp = value.split('').slice(0, length)
      setOtp([...newOtp, ...Array(length - newOtp.length).fill('')])
    }, [value, length])

    const handleChange = useCallback(
      (index: number, char: string) => {
        if (disabled) return

        // Validate input
        if (type === 'number' && !/^\d*$/.test(char)) return
        if (type === 'text' && !/^[a-zA-Z0-9]*$/.test(char)) return

        const newOtp = [...otp]

        // Handle paste of multiple characters
        if (char.length > 1) {
          const chars = char.slice(0, length - index).split('')
          chars.forEach((c, i) => {
            if (index + i < length) {
              newOtp[index + i] = c
            }
          })
          setOtp(newOtp)

          const newValue = newOtp.join('')
          onChange?.(newValue)

          // Focus appropriate field
          const nextIndex = Math.min(index + chars.length, length - 1)
          inputRefs.current[nextIndex]?.focus()

          if (newValue.length === length) {
            onComplete?.(newValue)
          }
          return
        }

        // Single character
        newOtp[index] = char
        setOtp(newOtp)

        const newValue = newOtp.join('')
        onChange?.(newValue)

        // Move to next input
        if (char && index < length - 1) {
          inputRefs.current[index + 1]?.focus()
        }

        if (newValue.length === length && !newValue.includes('')) {
          onComplete?.(newValue)
        }
      },
      [otp, length, type, disabled, onChange, onComplete]
    )

    const handleKeyDown = useCallback(
      (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return

        if (e.key === 'Backspace') {
          e.preventDefault()
          const newOtp = [...otp]

          if (otp[index]) {
            // Clear current field
            newOtp[index] = ''
            setOtp(newOtp)
            onChange?.(newOtp.join(''))
          } else if (index > 0) {
            // Move to previous field and clear it
            newOtp[index - 1] = ''
            setOtp(newOtp)
            onChange?.(newOtp.join(''))
            inputRefs.current[index - 1]?.focus()
          }
        } else if (e.key === 'ArrowLeft' && index > 0) {
          e.preventDefault()
          inputRefs.current[index - 1]?.focus()
        } else if (e.key === 'ArrowRight' && index < length - 1) {
          e.preventDefault()
          inputRefs.current[index + 1]?.focus()
        }
      },
      [otp, length, disabled, onChange]
    )

    const handlePaste = useCallback(
      (e: React.ClipboardEvent) => {
        e.preventDefault()
        if (disabled) return

        const pastedData = e.clipboardData.getData('text')
        const filteredData =
          type === 'number'
            ? pastedData.replace(/\D/g, '')
            : pastedData.replace(/[^a-zA-Z0-9]/g, '')

        if (filteredData) {
          handleChange(0, filteredData)
        }
      },
      [type, disabled, handleChange]
    )

    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select()
    }, [])

    return (
      <div className={`flex gap-2 ${className}`}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el
            }}
            type={mask ? 'password' : type === 'number' ? 'tel' : 'text'}
            inputMode={type === 'number' ? 'numeric' : 'text'}
            maxLength={1}
            value={digit}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={handleFocus}
            className={`
              ${dInput} text-center font-mono
              ${sizeClasses[effectiveSize]}
              ${error ? dInputError : ''}
              ${disabled ? `${dInputDisabled} opacity-50` : ''}
            `}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>
    )
  }
)

OTPInput.displayName = 'OTPInput'
