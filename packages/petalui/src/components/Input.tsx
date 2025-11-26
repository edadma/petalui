import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'datetime-local' | 'week' | 'month' | 'tel' | 'url' | 'search' | 'time'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  ghost?: boolean
  bordered?: boolean
  className?: string
  /** Input mask pattern. Use # for digits, A for letters, * for alphanumeric */
  mask?: string
  /** Placeholder character shown in mask (default: _) */
  maskPlaceholder?: string
}

// Helper to apply mask to raw value
function applyMask(raw: string, mask: string, placeholder: string): string {
  let result = ''
  let rawIndex = 0

  for (let i = 0; i < mask.length && rawIndex <= raw.length; i++) {
    const maskChar = mask[i]
    if (maskChar === '#' || maskChar === 'A' || maskChar === '*') {
      if (rawIndex < raw.length) {
        result += raw[rawIndex]
        rawIndex++
      } else {
        result += placeholder
      }
    } else {
      result += maskChar
    }
  }

  return result
}

// Extract raw value from masked input
function extractRaw(value: string, mask: string): string {
  let raw = ''
  for (let i = 0; i < value.length && i < mask.length; i++) {
    const maskChar = mask[i]
    if ((maskChar === '#' || maskChar === 'A' || maskChar === '*') && value[i] !== '_') {
      raw += value[i]
    }
  }
  return raw
}

// Check if character is valid for mask position
function isValidChar(char: string, maskChar: string): boolean {
  if (maskChar === '#') return /\d/.test(char)
  if (maskChar === 'A') return /[a-zA-Z]/.test(char)
  if (maskChar === '*') return /[a-zA-Z0-9]/.test(char)
  return false
}

// Find next input position in mask
function findNextInputPosition(mask: string, fromIndex: number): number {
  for (let i = fromIndex; i < mask.length; i++) {
    if (mask[i] === '#' || mask[i] === 'A' || mask[i] === '*') {
      return i
    }
  }
  return mask.length
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      size,
      color,
      ghost = false,
      bordered = true,
      className = '',
      mask,
      maskPlaceholder = '_',
      value,
      defaultValue,
      onChange,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      xs: 'input-xs',
      sm: 'input-sm',
      md: 'input-md',
      lg: 'input-lg',
      xl: 'input-xl',
    }

    const colorClasses = {
      neutral: 'input-neutral',
      primary: 'input-primary',
      secondary: 'input-secondary',
      accent: 'input-accent',
      info: 'input-info',
      success: 'input-success',
      warning: 'input-warning',
      error: 'input-error',
    }

    const inputClasses = [
      'input',
      'w-full',
      bordered ? 'input-bordered' : 'border-0',
      ghost && 'input-ghost',
      size && sizeClasses[size],
      color && colorClasses[color],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    // Mask handling
    const innerRef = useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || innerRef

    const getInitialRaw = useCallback(() => {
      if (!mask) return ''
      const initial = (value ?? defaultValue ?? '') as string
      return extractRaw(initial, mask)
    }, [mask, value, defaultValue])

    const [rawValue, setRawValue] = useState(getInitialRaw)
    const [cursorPos, setCursorPos] = useState<number | null>(null)

    // Sync with controlled value
    useEffect(() => {
      if (mask && value !== undefined) {
        setRawValue(extractRaw(value as string, mask))
      }
    }, [mask, value])

    // Set cursor position after render
    useEffect(() => {
      if (cursorPos !== null && inputRef.current) {
        inputRef.current.setSelectionRange(cursorPos, cursorPos)
        setCursorPos(null)
      }
    }, [cursorPos, inputRef])

    const handleMaskedChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!mask) {
          onChange?.(e)
          return
        }

        const input = e.target
        const inputValue = input.value

        // Extract what the user is trying to type
        const newRaw = extractRaw(inputValue, mask)

        // Filter to only valid characters
        let filteredRaw = ''
        let rawIdx = 0
        for (let i = 0; i < mask.length && rawIdx < newRaw.length; i++) {
          const maskChar = mask[i]
          if (maskChar === '#' || maskChar === 'A' || maskChar === '*') {
            if (isValidChar(newRaw[rawIdx], maskChar)) {
              filteredRaw += newRaw[rawIdx]
            }
            rawIdx++
          }
        }

        setRawValue(filteredRaw)

        // Calculate new cursor position
        const maskedValue = applyMask(filteredRaw, mask, maskPlaceholder)
        let newCursor = findNextInputPosition(mask, 0)
        let charsPlaced = 0
        for (let i = 0; i < mask.length; i++) {
          const maskChar = mask[i]
          if (maskChar === '#' || maskChar === 'A' || maskChar === '*') {
            if (charsPlaced < filteredRaw.length) {
              charsPlaced++
              newCursor = i + 1
            }
          }
        }
        // Skip to next input position if we're on a literal
        newCursor = findNextInputPosition(mask, newCursor)
        if (newCursor > mask.length) newCursor = mask.length

        setCursorPos(newCursor)

        // Create synthetic event with masked value
        const syntheticEvent = {
          ...e,
          target: { ...input, value: maskedValue },
          currentTarget: { ...input, value: maskedValue },
        } as React.ChangeEvent<HTMLInputElement>

        onChange?.(syntheticEvent)
      },
      [mask, maskPlaceholder, onChange]
    )

    const handleMaskedKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!mask) {
          onKeyDown?.(e)
          return
        }

        if (e.key === 'Backspace') {
          e.preventDefault()
          const newRaw = rawValue.slice(0, -1)
          setRawValue(newRaw)

          // Calculate cursor position
          let newCursor = 0
          let charsPlaced = 0
          for (let i = 0; i < mask.length; i++) {
            const maskChar = mask[i]
            if (maskChar === '#' || maskChar === 'A' || maskChar === '*') {
              if (charsPlaced < newRaw.length) {
                charsPlaced++
                newCursor = i + 1
              } else {
                newCursor = i
                break
              }
            }
          }
          setCursorPos(newCursor)

          const maskedValue = applyMask(newRaw, mask, maskPlaceholder)
          const input = e.currentTarget
          const syntheticEvent = {
            target: { ...input, value: maskedValue },
            currentTarget: { ...input, value: maskedValue },
          } as unknown as React.ChangeEvent<HTMLInputElement>

          onChange?.(syntheticEvent)
        }

        onKeyDown?.(e)
      },
      [mask, maskPlaceholder, rawValue, onChange, onKeyDown]
    )

    // If no mask, render simple input
    if (!mask) {
      return (
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          {...props}
        />
      )
    }

    // Render masked input
    const maskedValue = applyMask(rawValue, mask, maskPlaceholder)

    return (
      <input
        ref={inputRef}
        type="text"
        className={inputClasses}
        value={maskedValue}
        onChange={handleMaskedChange}
        onKeyDown={handleMaskedKeyDown}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
