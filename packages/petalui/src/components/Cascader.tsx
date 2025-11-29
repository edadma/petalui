import React, { useState, useRef, useEffect, useCallback, useId } from 'react'

export interface CascaderOption {
  value: string | number
  label: React.ReactNode
  disabled?: boolean
  children?: CascaderOption[]
}

export interface CascaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: CascaderOption[]
  value?: (string | number)[]
  onChange?: (value: (string | number)[], selectedOptions: CascaderOption[]) => void
  placeholder?: string
  disabled?: boolean
  allowClear?: boolean
  expandTrigger?: 'click' | 'hover'
  displayRender?: (labels: React.ReactNode[], selectedOptions: CascaderOption[]) => React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export function Cascader({
  options,
  value,
  onChange,
  placeholder = 'Please select',
  disabled = false,
  allowClear = true,
  expandTrigger = 'click',
  displayRender,
  size = 'md',
  className = '',
  ...rest
}: CascaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPath, setSelectedPath] = useState<(string | number)[]>(value || [])
  const [hoveredPath, setHoveredPath] = useState<(string | number)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const inputId = useId()
  const listboxId = useId()

  // Sync with controlled value
  useEffect(() => {
    if (value !== undefined) {
      setSelectedPath(value)
    }
  }, [value])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setHoveredPath([])
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Get options at each level based on path
  const getOptionsAtLevel = useCallback((level: number, path: (string | number)[]): CascaderOption[] => {
    if (level === 0) return options

    let currentOptions = options
    for (let i = 0; i < level; i++) {
      const selected = currentOptions.find(opt => opt.value === path[i])
      if (!selected?.children) return []
      currentOptions = selected.children
    }
    return currentOptions
  }, [options])

  // Get selected options objects from path
  const getSelectedOptions = useCallback((path: (string | number)[]): CascaderOption[] => {
    const result: CascaderOption[] = []
    let currentOptions = options

    for (const val of path) {
      const found = currentOptions.find(opt => opt.value === val)
      if (!found) break
      result.push(found)
      currentOptions = found.children || []
    }

    return result
  }, [options])

  // Determine which path to use for displaying columns
  const activePath = isOpen ? (hoveredPath.length > 0 ? hoveredPath : selectedPath) : selectedPath

  // Build columns to display
  const columns: CascaderOption[][] = []
  columns.push(options)

  for (let i = 0; i < activePath.length; i++) {
    const nextOptions = getOptionsAtLevel(i + 1, activePath)
    if (nextOptions.length > 0) {
      columns.push(nextOptions)
    }
  }

  const handleOptionClick = (option: CascaderOption, level: number) => {
    if (option.disabled) return

    const newPath = [...activePath.slice(0, level), option.value]

    if (option.children && option.children.length > 0) {
      // Has children - just expand, don't select yet
      setHoveredPath(newPath)
    } else {
      // Leaf node - select and close
      setSelectedPath(newPath)
      setIsOpen(false)
      setHoveredPath([])
      onChange?.(newPath, getSelectedOptions(newPath))
    }
  }

  const handleOptionHover = (option: CascaderOption, level: number) => {
    if (expandTrigger !== 'hover' || option.disabled) return

    const newPath = [...activePath.slice(0, level), option.value]
    setHoveredPath(newPath)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedPath([])
    onChange?.([], [])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        setIsOpen(!isOpen)
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setHoveredPath([])
        break
    }
  }

  // Display value
  const selectedOptions = getSelectedOptions(selectedPath)
  const labels = selectedOptions.map(opt => opt.label)
  const displayValue = displayRender
    ? displayRender(labels, selectedOptions)
    : labels.join(' / ')

  // Size classes
  const sizeClasses = {
    xs: 'input-xs text-xs',
    sm: 'input-sm text-sm',
    md: 'input-md',
    lg: 'input-lg text-lg',
  }

  const dropdownSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  return (
    <div ref={containerRef} className={`relative inline-block w-full ${className}`} data-state={isOpen ? 'open' : 'closed'} {...rest}>
      {/* Input/Trigger */}
      <div
        id={inputId}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        tabIndex={disabled ? -1 : 0}
        className={`input input-bordered w-full flex items-center justify-between cursor-pointer ${sizeClasses[size]} ${
          disabled ? 'input-disabled cursor-not-allowed' : ''
        } ${isOpen ? 'border-primary' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
      >
        <span className={selectedPath.length === 0 ? 'text-base-content/50' : ''}>
          {selectedPath.length > 0 ? displayValue : placeholder}
        </span>
        <div className="flex items-center gap-1">
          {allowClear && selectedPath.length > 0 && !disabled && (
            <button
              type="button"
              className="btn btn-ghost btn-xs btn-circle"
              onClick={handleClear}
              aria-label="Clear selection"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          id={listboxId}
          className={`absolute z-50 mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg flex ${dropdownSizeClasses[size]}`}
        >
          {columns.map((columnOptions, colIndex) => (
            <ul
              key={colIndex}
              role="listbox"
              className={`min-w-[120px] max-h-[200px] overflow-y-auto py-1 ${
                colIndex > 0 ? 'border-l border-base-300' : ''
              }`}
            >
              {columnOptions.map((option) => {
                const isSelected = selectedPath[colIndex] === option.value
                const isHovered = activePath[colIndex] === option.value
                const hasChildren = option.children && option.children.length > 0

                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled}
                    className={`px-3 py-2 cursor-pointer flex items-center justify-between gap-2 ${
                      option.disabled
                        ? 'text-base-content/30 cursor-not-allowed'
                        : isSelected
                        ? 'bg-primary text-primary-content'
                        : isHovered
                        ? 'bg-base-200'
                        : 'hover:bg-base-200'
                    }`}
                    onClick={() => handleOptionClick(option, colIndex)}
                    onMouseEnter={() => handleOptionHover(option, colIndex)}
                  >
                    <span>{option.label}</span>
                    {hasChildren && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </li>
                )
              })}
            </ul>
          ))}
        </div>
      )}
    </div>
  )
}
