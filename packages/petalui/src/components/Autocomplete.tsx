import React, { useState, useRef, useEffect } from 'react'

export interface AutocompleteOption {
  value: string
  label: string
}

export interface AutocompleteProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  options: AutocompleteOption[] | string[]
  placeholder?: string
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  allowCustomValue?: boolean
  filterOption?: (option: AutocompleteOption, inputValue: string) => boolean
  notFoundContent?: React.ReactNode
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  value,
  defaultValue = '',
  onChange,
  options: rawOptions,
  placeholder = 'Type to search...',
  disabled = false,
  size = 'md',
  className = '',
  allowCustomValue = true,
  filterOption,
  notFoundContent = 'No results found',
  ...rest
}) => {
  // Normalize options to AutocompleteOption[]
  const options: AutocompleteOption[] = rawOptions.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  )

  const [inputValue, setInputValue] = useState(defaultValue)
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value
    setInputValue(newInputValue)
    setIsOpen(true)
    setHighlightedIndex(0)

    if (allowCustomValue) {
      onChange?.(newInputValue)
    }
  }

  const handleOptionClick = (option: AutocompleteOption) => {
    setInputValue(option.label)
    setIsOpen(false)
    setHighlightedIndex(-1)

    onChange?.(option.value)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true)
      setHighlightedIndex(0)
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0))
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionClick(filteredOptions[highlightedIndex])
        } else if (!allowCustomValue && filteredOptions.length > 0) {
          handleOptionClick(filteredOptions[0])
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
    if (filteredOptions.length > 0) {
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

  const sizeClass = {
    xs: 'input-xs',
    sm: 'input-sm',
    md: 'input-md',
    lg: 'input-lg',
  }[size]

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const highlightedElement = dropdownRef.current.children[highlightedIndex] as HTMLElement
      highlightedElement?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIndex])

  return (
    <div className={`relative ${className}`} data-state={isOpen ? 'open' : 'closed'} {...rest}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`input input-bordered w-full ${sizeClass}`}
      />

      {isOpen && !disabled && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={option.value}
                onMouseDown={(e) => {
                  e.preventDefault()
                  handleOptionClick(option)
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`px-4 py-2 cursor-pointer transition-colors ${
                  index === highlightedIndex
                    ? 'bg-primary text-primary-content'
                    : 'hover:bg-base-200'
                }`}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-base-content/60 text-center">{notFoundContent}</div>
          )}
        </div>
      )}
    </div>
  )
}
