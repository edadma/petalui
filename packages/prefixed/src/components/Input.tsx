import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'datetime-local' | 'week' | 'month' | 'tel' | 'url' | 'search' | 'time'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  /** Validation status */
  status?: 'error' | 'warning'
  ghost?: boolean
  bordered?: boolean
  className?: string
  /** Input mask pattern. Use # for digits, A for letters, * for alphanumeric */
  mask?: string
  /** Placeholder character shown in mask (default: _) */
  maskPlaceholder?: string
  /** Show clear button when input has value */
  allowClear?: boolean | { clearIcon?: React.ReactNode }
  /** Callback when clear button is clicked */
  onClear?: () => void
  /** Prefix icon or element (inside input) */
  prefix?: React.ReactNode
  /** Suffix icon or element (inside input) */
  suffix?: React.ReactNode
  /** Text/element before input (outside, using DaisyUI label) */
  addonBefore?: React.ReactNode
  /** Text/element after input (outside, using DaisyUI label) */
  addonAfter?: React.ReactNode
  /** Floating label text (uses DaisyUI floating-label) */
  floatingLabel?: string
  /** ID for error message element (for aria-describedby) */
  errorId?: string
  /** Render as unstyled input (for use inside styled wrappers) */
  unstyled?: boolean
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
function extractRaw(value: string, mask: string, placeholder: string): string {
  let raw = ''
  for (let i = 0; i < value.length && i < mask.length; i++) {
    const maskChar = mask[i]
    if ((maskChar === '#' || maskChar === 'A' || maskChar === '*') && value[i] !== placeholder) {
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

// Clear icon component
const ClearIcon: React.FC<{ onClick: () => void; className?: string }> = ({ onClick, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity ${className || ''}`}
    aria-label="Clear input"
    tabIndex={-1}
  >
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
)

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      size,
      color,
      status,
      ghost = false,
      bordered = true,
      className = '',
      mask,
      maskPlaceholder = '_',
      allowClear,
      onClear,
      prefix,
      suffix,
      addonBefore,
      addonAfter,
      floatingLabel,
      errorId,
      unstyled = false,
      value,
      defaultValue,
      onChange,
      onKeyDown,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      xs: 'd-input-xs',
      sm: 'd-input-sm',
      md: 'd-input-md',
      lg: 'd-input-lg',
      xl: 'd-input-xl',
    }

    const colorClasses = {
      neutral: 'd-input-neutral',
      primary: 'd-input-primary',
      secondary: 'd-input-secondary',
      accent: 'd-input-accent',
      info: 'd-input-info',
      success: 'd-input-success',
      warning: 'd-input-warning',
      error: 'd-input-error',
    }

    const statusClasses = {
      error: 'd-input-error',
      warning: 'd-input-warning',
    }

    // Status takes precedence over color for validation feedback
    const effectiveColorClass = status ? statusClasses[status] : (color ? colorClasses[color] : '')

    // When wrapped with external addons OR unstyled prop, the wrapper has the input styling
    // Inner input should be unstyled (grow to fill space)
    const hasExternalAddons = addonBefore || addonAfter
    const shouldBeUnstyled = hasExternalAddons || unstyled

    const inputClasses = shouldBeUnstyled
      ? ['grow', 'bg-transparent', 'border-0', 'outline-none', 'focus:outline-none', className].filter(Boolean).join(' ')
      : [
          'd-input',
          !bordered && 'border-0',
          ghost && 'd-input-ghost',
          size && sizeClasses[size],
          effectiveColorClass,
          className,
        ].filter(Boolean).join(' ')

    // Mask handling
    const innerRef = useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || innerRef

    const getInitialRaw = useCallback(() => {
      if (!mask) return ''
      const initial = (value ?? defaultValue ?? '') as string
      return extractRaw(initial, mask, maskPlaceholder)
    }, [mask, value, defaultValue, maskPlaceholder])

    const [rawValue, setRawValue] = useState(getInitialRaw)
    const [cursorPos, setCursorPos] = useState<number | null>(null)

    // Sync with controlled value
    useEffect(() => {
      if (mask && value !== undefined) {
        setRawValue(extractRaw(value as string, mask, maskPlaceholder))
      }
    }, [mask, value, maskPlaceholder])

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
        const newRaw = extractRaw(inputValue, mask, maskPlaceholder)

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

    // Track internal value for allowClear visibility
    const [internalValue, setInternalValue] = useState((value ?? defaultValue ?? '') as string)

    // Sync internal value with controlled value
    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value as string)
      }
    }, [value])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value)
      onChange?.(e)
    }, [onChange])

    const handleClear = useCallback(() => {
      setInternalValue('')
      setRawValue('')
      onClear?.()
      // Create synthetic event for onChange
      if (onChange && inputRef.current) {
        const syntheticEvent = {
          target: { ...inputRef.current, value: '' },
          currentTarget: { ...inputRef.current, value: '' },
        } as React.ChangeEvent<HTMLInputElement>
        onChange(syntheticEvent)
      }
    }, [onClear, onChange, inputRef])

    // Determine if we should show clear button
    const currentValue = mask ? rawValue : internalValue
    const showClear = allowClear && currentValue && !disabled

    // Get custom clear icon if provided
    const clearIcon = typeof allowClear === 'object' && allowClear.clearIcon
      ? allowClear.clearIcon
      : null

    // Accessibility attributes
    const ariaProps: Record<string, string | boolean | undefined> = {}
    if (status === 'error') {
      ariaProps['aria-invalid'] = true
    }
    if (errorId) {
      ariaProps['aria-describedby'] = errorId
    }
    if (required) {
      ariaProps['aria-required'] = true
    }

    // If we have prefix, suffix, or allowClear, wrap in a container
    const hasInternalAddons = prefix || suffix || allowClear

    // Size class for floating label
    const floatingSizeClasses = {
      xs: 'd-input-xs',
      sm: 'd-input-sm',
      md: 'd-input-md',
      lg: 'd-input-lg',
      xl: 'd-input-xl',
    }

    // Build the masked value if needed
    const maskedValue = mask ? applyMask(rawValue, mask, maskPlaceholder) : undefined

    // Build the core input element
    const buildInput = (extraClasses?: string) => (
      <input
        ref={inputRef}
        type={mask ? 'text' : type}
        className={[
          inputClasses,
          hasInternalAddons && 'w-full',
          prefix && 'pl-10',
          (suffix || showClear) && 'pr-10',
          extraClasses,
        ].filter(Boolean).join(' ')}
        value={maskedValue ?? (value !== undefined ? value : (hasInternalAddons ? internalValue : value))}
        defaultValue={value === undefined && !mask ? defaultValue : undefined}
        onChange={mask ? handleMaskedChange : (hasInternalAddons ? handleChange : onChange)}
        onKeyDown={mask ? handleMaskedKeyDown : onKeyDown}
        disabled={disabled}
        required={required}
        {...ariaProps}
        {...props}
      />
    )

    // Build input with internal addons (prefix icon, suffix icon, clear button)
    const buildInputWithInternalAddons = (extraClasses?: string) => {
      if (!hasInternalAddons) {
        return buildInput(extraClasses)
      }

      return (
        <div className={`relative flex items-center ${extraClasses || ''}`}>
          {prefix && (
            <span className="absolute left-3 flex items-center text-base-content/70 pointer-events-none z-10">
              {prefix}
            </span>
          )}
          {buildInput()}
          {(suffix || showClear) && (
            <span className="absolute right-3 flex items-center gap-1 z-10">
              {showClear && (clearIcon || <ClearIcon onClick={handleClear} />)}
              {suffix && <span className="text-base-content/70">{suffix}</span>}
            </span>
          )}
        </div>
      )
    }

    // Wrap with floating label if specified
    const wrapWithFloatingLabel = (input: React.ReactNode) => {
      if (!floatingLabel) return input

      const floatingClasses = [
        'd-floating-label',
        size && floatingSizeClasses[size],
      ].filter(Boolean).join(' ')

      return (
        <label className={floatingClasses}>
          {input}
          <span>{floatingLabel}</span>
        </label>
      )
    }

    // Wrap with external addons (addonBefore/addonAfter) using DaisyUI input wrapper pattern
    const wrapWithExternalAddons = (input: React.ReactNode) => {
      if (!hasExternalAddons) return input

      const addonClasses = [
        'd-input',
        'flex',
        'items-center',
        'gap-2',
        size && sizeClasses[size],
        effectiveColorClass,
      ].filter(Boolean).join(' ')

      return (
        <label className={addonClasses}>
          {addonBefore && <span className="text-base-content/70">{addonBefore}</span>}
          {input}
          {addonAfter && <span className="text-base-content/70">{addonAfter}</span>}
        </label>
      )
    }

    // Build the final element
    const inputElement = buildInputWithInternalAddons(
      floatingLabel ? 'd-input w-full' : undefined
    )

    // Apply wrappers
    return wrapWithExternalAddons(wrapWithFloatingLabel(
      floatingLabel ? (
        // For floating label, use raw input (label wrapper provides styling)
        <input
          ref={inputRef}
          type={mask ? 'text' : type}
          className="d-input w-full"
          value={maskedValue ?? (value !== undefined ? value : internalValue)}
          defaultValue={value === undefined && !mask ? defaultValue : undefined}
          onChange={mask ? handleMaskedChange : handleChange}
          onKeyDown={mask ? handleMaskedKeyDown : onKeyDown}
          disabled={disabled}
          required={required}
          {...ariaProps}
          {...props}
        />
      ) : inputElement
    ))
  }
)

Input.displayName = 'Input'
