import React, { useState, useRef, useEffect, useId } from 'react'
import { useConfig } from './ConfigProvider'

// DaisyUI classes
const dDropdown = 'dropdown'
const dDropdownBottom = 'dropdown-bottom'
const dDropdownOpen = 'dropdown-open'
const dDropdownContent = 'dropdown-content'
const dMenu = 'menu'
const dInput = 'input'
const dInputXs = 'input-xs'
const dInputSm = 'input-sm'
const dInputMd = 'input-md'
const dInputLg = 'input-lg'
const dInputXl = 'input-xl'
const dInputNeutral = 'input-neutral'
const dInputPrimary = 'input-primary'
const dInputSecondary = 'input-secondary'
const dInputAccent = 'input-accent'
const dInputInfo = 'input-info'
const dInputSuccess = 'input-success'
const dInputWarning = 'input-warning'
const dInputError = 'input-error'

export interface AutocompleteOption {
  value: string
  label: string
  disabled?: boolean
}

export interface AutocompleteProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onSelect?: (value: string, option: AutocompleteOption) => void
  onSearch?: (value: string) => void
  options: AutocompleteOption[] | string[]
  placeholder?: string
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  /** Validation status */
  status?: 'error' | 'warning'
  allowCustomValue?: boolean
  filterOption?: (option: AutocompleteOption, inputValue: string) => boolean
  notFoundContent?: React.ReactNode
  /** Show clear button when input has value */
  allowClear?: boolean | { clearIcon?: React.ReactNode }
  /** Callback when clear button is clicked */
  onClear?: () => void
  /** Controlled open state */
  open?: boolean
  /** Default open state */
  defaultOpen?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Activate first option by default */
  defaultActiveFirstOption?: boolean
}

// Clear icon component
const ClearIcon: React.FC<{ onClick: (e: React.MouseEvent) => void; className?: string }> = ({ onClick, className }) => (
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

export const Autocomplete: React.FC<AutocompleteProps> = ({
  value,
  defaultValue = '',
  onChange,
  onSelect,
  onSearch,
  options: rawOptions,
  placeholder = 'Type to search...',
  disabled = false,
  size,
  color,
  status,
  className = '',
  allowCustomValue = true,
  filterOption,
  notFoundContent = 'No results found',
  allowClear,
  onClear,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  defaultActiveFirstOption = true,
  ...rest
}) => {
  const { componentSize } = useConfig()
  const effectiveSize = size ?? componentSize ?? 'md'
  // Generate unique IDs for ARIA
  const baseId = useId()
  const inputId = `${baseId}-input`
  const listboxId = `${baseId}-listbox`

  // Normalize options to AutocompleteOption[]
  const options: AutocompleteOption[] = rawOptions.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  )

  const [inputValue, setInputValue] = useState(defaultValue)
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)

  // Determine if open state is controlled
  const isOpenControlled = controlledOpen !== undefined
  const isOpen = isOpenControlled ? controlledOpen : internalOpen

  const setIsOpen = (newOpen: boolean) => {
    if (!isOpenControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  // Update input value when controlled value changes
  useEffect(() => {
    if (value !== undefined) {
      const selectedOption = options.find((opt) => opt.value === value)
      setInputValue(selectedOption?.label || value)
    }
  }, [value, options])

  // Filter options based on input
  const defaultFilter = (option: AutocompleteOption, input: string) =>
    option.label.toLowerCase().includes(input.toLowerCase())

  const filteredOptions = options.filter((option) =>
    filterOption ? filterOption(option, inputValue) : defaultFilter(option, inputValue)
  )

  // Get only enabled options for keyboard navigation
  const enabledOptions = filteredOptions.filter(opt => !opt.disabled)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value
    setInputValue(newInputValue)
    setIsOpen(true)

    if (defaultActiveFirstOption && enabledOptions.length > 0) {
      setHighlightedIndex(0)
    } else {
      setHighlightedIndex(-1)
    }

    onSearch?.(newInputValue)

    if (allowCustomValue) {
      onChange?.(newInputValue)
    }
  }

  const handleOptionClick = (option: AutocompleteOption) => {
    if (option.disabled) return

    setInputValue(option.label)
    setIsOpen(false)
    setHighlightedIndex(-1)

    onChange?.(option.value)
    onSelect?.(option.value, option)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true)
      if (defaultActiveFirstOption && enabledOptions.length > 0) {
        setHighlightedIndex(0)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex((prev) => {
          // Find next enabled option
          for (let i = prev + 1; i < filteredOptions.length; i++) {
            if (!filteredOptions[i].disabled) return i
          }
          return prev
        })
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((prev) => {
          // Find previous enabled option
          for (let i = prev - 1; i >= 0; i--) {
            if (!filteredOptions[i].disabled) return i
          }
          return prev
        })
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex] && !filteredOptions[highlightedIndex].disabled) {
          handleOptionClick(filteredOptions[highlightedIndex])
        } else if (!allowCustomValue && enabledOptions.length > 0) {
          handleOptionClick(enabledOptions[0])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setHighlightedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleFocus = () => {
    setIsOpen(true)
    if (defaultActiveFirstOption && enabledOptions.length > 0) {
      setHighlightedIndex(0)
    }
  }

  const handleBlur = (e: React.FocusEvent) => {
    // Don't close if clicking inside dropdown
    if (dropdownRef.current && dropdownRef.current.contains(e.relatedTarget as Node)) {
      return
    }
    setTimeout(() => setIsOpen(false), 200)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setInputValue('')
    onChange?.('')
    onClear?.()
    inputRef.current?.focus()
  }

  const sizeClasses = {
    xs: dInputXs,
    sm: dInputSm,
    md: dInputMd,
    lg: dInputLg,
    xl: dInputXl,
  }

  const colorClasses = {
    neutral: dInputNeutral,
    primary: dInputPrimary,
    secondary: dInputSecondary,
    accent: dInputAccent,
    info: dInputInfo,
    success: dInputSuccess,
    warning: dInputWarning,
    error: dInputError,
  }

  const statusClasses = {
    error: dInputError,
    warning: dInputWarning,
  }

  // Status takes precedence over color for validation feedback
  const effectiveColorClass = status ? statusClasses[status] : (color ? colorClasses[color] : '')

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const highlightedElement = dropdownRef.current.children[highlightedIndex] as HTMLElement
      highlightedElement?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIndex])

  // Determine if we should show clear button
  const showClear = allowClear && inputValue && !disabled

  // Get custom clear icon if provided
  const clearIcon = typeof allowClear === 'object' && allowClear.clearIcon
    ? allowClear.clearIcon
    : null

  // Get option ID for ARIA
  const getOptionId = (index: number) => `${baseId}-option-${index}`

  const inputClasses = [
    `${dInput} w-full`,
    sizeClasses[effectiveSize],
    effectiveColorClass,
    showClear && 'pr-10',
  ].filter(Boolean).join(' ')

  return (
    <div
      className={`${dDropdown} ${dDropdownBottom} w-full ${isOpen && !disabled ? dDropdownOpen : ''} ${className}`}
      data-state={isOpen ? 'open' : 'closed'}
      {...rest}
    >
      <div className="relative w-full">
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={highlightedIndex >= 0 ? getOptionId(highlightedIndex) : undefined}
          aria-invalid={status === 'error' ? true : undefined}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
        />
        {showClear && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
            {clearIcon || <ClearIcon onClick={handleClear} />}
          </span>
        )}
      </div>

      {isOpen && !disabled && (
        <ul
          ref={dropdownRef}
          id={listboxId}
          role="listbox"
          aria-label="Suggestions"
          tabIndex={-1}
          className={`${dDropdownContent} ${dMenu} bg-base-100 rounded-box z-50 w-full shadow-lg border border-base-300 max-h-60 overflow-auto flex-nowrap`}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li key={option.value}>
                <a
                  id={getOptionId(index)}
                  role="option"
                  aria-selected={highlightedIndex === index}
                  aria-disabled={option.disabled}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleOptionClick(option)
                  }}
                  onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
                  className={[
                    index === highlightedIndex && !option.disabled && 'active',
                    option.disabled && 'disabled text-base-content/40 cursor-not-allowed',
                  ].filter(Boolean).join(' ')}
                >
                  {option.label}
                </a>
              </li>
            ))
          ) : (
            <li className="disabled">
              <span className="text-base-content/60 text-center cursor-default">{notFoundContent}</span>
            </li>
          )}
        </ul>
      )}
    </div>
  )
}
