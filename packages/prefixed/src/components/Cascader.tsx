import React, { useState, useRef, useEffect, useCallback, useId, forwardRef, useMemo } from 'react'

export interface CascaderOption {
  value: string
  label: React.ReactNode
  disabled?: boolean
  children?: CascaderOption[]
  isLeaf?: boolean
}

export type CascaderColor = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
export type CascaderSize = 'xs' | 'sm' | 'md' | 'lg'

export interface CascaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Hierarchical options data */
  options: CascaderOption[]
  /** Controlled selected value path */
  value?: string[]
  /** Default selected value path (uncontrolled) */
  defaultValue?: string[]
  /** Callback when selection changes */
  onChange?: (value: string[], selectedOptions: CascaderOption[]) => void
  /** Placeholder text */
  placeholder?: string
  /** Disable the cascader */
  disabled?: boolean
  /** Show clear button */
  allowClear?: boolean
  /** How to expand sub-menus */
  expandTrigger?: 'click' | 'hover'
  /** Allow selection of any level, not just leaf nodes */
  changeOnSelect?: boolean
  /** Custom display render function */
  displayRender?: (labels: React.ReactNode[], selectedOptions: CascaderOption[]) => React.ReactNode
  /** Input size */
  size?: CascaderSize
  /** Focus ring color */
  color?: CascaderColor
  /** Validation status */
  status?: 'error' | 'warning'
  /** Enable search/filter functionality */
  showSearch?: boolean | {
    filter?: (inputValue: string, path: CascaderOption[]) => boolean
    render?: (inputValue: string, path: CascaderOption[]) => React.ReactNode
    matchInputWidth?: boolean
  }
  /** Content when no results found */
  notFoundContent?: React.ReactNode
  /** Async data loading function */
  loadData?: (selectedOptions: CascaderOption[]) => Promise<void>
  /** Custom field names for data mapping */
  fieldNames?: {
    label?: string
    value?: string
    children?: string
  }
  /** Controlled open state */
  open?: boolean
  /** Callback when dropdown visibility changes */
  onDropdownVisibleChange?: (open: boolean) => void
  /** Class name for dropdown */
  popupClassName?: string
  /** Custom dropdown render wrapper */
  dropdownRender?: (menu: React.ReactNode) => React.ReactNode
  /** Multiple selection mode */
  multiple?: boolean
  /** Max tags to show in multiple mode */
  maxTagCount?: number | 'responsive'
  /** Accessible label */
  'aria-label'?: string
  /** Test ID for the component */
  'data-testid'?: string
}

// Helper to get nested value using field names
function getFieldValue<T>(option: Record<string, unknown>, field: string, fallback: string): T {
  return (option[field] ?? option[fallback]) as T
}

export const Cascader = forwardRef<HTMLDivElement, CascaderProps>(({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = 'Please select',
  disabled = false,
  allowClear = true,
  expandTrigger = 'click',
  changeOnSelect = false,
  displayRender,
  size = 'md',
  color,
  status,
  showSearch = false,
  notFoundContent = 'No results found',
  loadData,
  fieldNames,
  open: controlledOpen,
  onDropdownVisibleChange,
  popupClassName = '',
  dropdownRender,
  multiple = false,
  maxTagCount,
  className = '',
  'aria-label': ariaLabel,
  'data-testid': testId,
  ...rest
}, ref) => {
  const baseTestId = testId ?? 'cascader'
  const isControlledOpen = controlledOpen !== undefined
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = isControlledOpen ? controlledOpen : internalOpen

  const setIsOpen = useCallback((open: boolean) => {
    if (!isControlledOpen) {
      setInternalOpen(open)
    }
    onDropdownVisibleChange?.(open)
  }, [isControlledOpen, onDropdownVisibleChange])

  const [selectedPath, setSelectedPath] = useState<string[]>(value ?? defaultValue ?? [])
  const [selectedPaths, setSelectedPaths] = useState<string[][]>(
    value ? [value] : defaultValue ? [defaultValue] : []
  )
  const [hoveredPath, setHoveredPath] = useState<string[]>([])
  const [focusedIndex, setFocusedIndex] = useState<{ column: number; row: number }>({ column: 0, row: 0 })
  const [searchValue, setSearchValue] = useState('')
  const [loadingKeys, setLoadingKeys] = useState<Set<string>>(new Set())

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const baseId = useId()
  const inputId = `${baseId}-input`
  const listboxId = `${baseId}-listbox`

  // Field name mapping
  const labelField = fieldNames?.label ?? 'label'
  const valueField = fieldNames?.value ?? 'value'
  const childrenField = fieldNames?.children ?? 'children'

  // Normalize options with field names
  const normalizeOption = useCallback((opt: Record<string, unknown>): CascaderOption => ({
    value: getFieldValue<string>(opt, valueField, 'value'),
    label: getFieldValue<React.ReactNode>(opt, labelField, 'label'),
    disabled: opt.disabled as boolean | undefined,
    isLeaf: opt.isLeaf as boolean | undefined,
    children: opt[childrenField]
      ? (opt[childrenField] as Record<string, unknown>[]).map(normalizeOption)
      : undefined,
  }), [labelField, valueField, childrenField])

  const normalizedOptions = useMemo(() =>
    options.map(opt => normalizeOption(opt as unknown as Record<string, unknown>)),
    [options, normalizeOption]
  )

  // Sync with controlled value
  useEffect(() => {
    if (value !== undefined) {
      setSelectedPath(value)
      if (multiple) {
        setSelectedPaths([value])
      }
    }
  }, [value, multiple])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setHoveredPath([])
        setSearchValue('')
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  // Get options at each level based on path
  const getOptionsAtLevel = useCallback((level: number, path: string[]): CascaderOption[] => {
    if (level === 0) return normalizedOptions

    let currentOptions = normalizedOptions
    for (let i = 0; i < level; i++) {
      const selected = currentOptions.find(opt => opt.value === path[i])
      if (!selected?.children) return []
      currentOptions = selected.children
    }
    return currentOptions
  }, [normalizedOptions])

  // Get selected options objects from path
  const getSelectedOptions = useCallback((path: string[]): CascaderOption[] => {
    const result: CascaderOption[] = []
    let currentOptions = normalizedOptions

    for (const val of path) {
      const found = currentOptions.find(opt => opt.value === val)
      if (!found) break
      result.push(found)
      currentOptions = found.children || []
    }

    return result
  }, [normalizedOptions])

  // Get all paths for search
  const getAllPaths = useCallback((): { path: CascaderOption[]; values: string[] }[] => {
    const paths: { path: CascaderOption[]; values: string[] }[] = []

    const traverse = (opts: CascaderOption[], currentPath: CascaderOption[], currentValues: string[]) => {
      for (const opt of opts) {
        const newPath = [...currentPath, opt]
        const newValues = [...currentValues, opt.value]

        if (!opt.children || opt.children.length === 0) {
          paths.push({ path: newPath, values: newValues })
        } else {
          if (changeOnSelect) {
            paths.push({ path: newPath, values: newValues })
          }
          traverse(opt.children, newPath, newValues)
        }
      }
    }

    traverse(normalizedOptions, [], [])
    return paths
  }, [normalizedOptions, changeOnSelect])

  // Filter paths for search
  const filteredPaths = useMemo(() => {
    if (!showSearch || !searchValue.trim()) return null

    const allPaths = getAllPaths()
    const searchLower = searchValue.toLowerCase()

    const filterFn = typeof showSearch === 'object' && showSearch.filter
      ? showSearch.filter
      : (inputValue: string, path: CascaderOption[]) =>
          path.some(opt =>
            String(opt.label).toLowerCase().includes(inputValue.toLowerCase())
          )

    return allPaths.filter(({ path }) => filterFn(searchLower, path))
  }, [showSearch, searchValue, getAllPaths])

  // Determine which path to use for displaying columns
  const activePath = isOpen ? (hoveredPath.length > 0 ? hoveredPath : selectedPath) : selectedPath

  // Build columns to display (only when not searching)
  const columns: CascaderOption[][] = useMemo(() => {
    if (filteredPaths) return []

    const cols: CascaderOption[][] = []
    cols.push(normalizedOptions)

    for (let i = 0; i < activePath.length; i++) {
      const nextOptions = getOptionsAtLevel(i + 1, activePath)
      if (nextOptions.length > 0) {
        cols.push(nextOptions)
      }
    }
    return cols
  }, [filteredPaths, normalizedOptions, activePath, getOptionsAtLevel])

  const handleOptionClick = async (option: CascaderOption, level: number) => {
    if (option.disabled) return

    const newPath = [...activePath.slice(0, level), option.value]
    const selectedOpts = getSelectedOptions(newPath)

    // Handle async loading
    if (loadData && !option.children && !option.isLeaf) {
      const key = option.value
      if (!loadingKeys.has(key)) {
        setLoadingKeys(prev => new Set(prev).add(key))
        try {
          await loadData(selectedOpts)
        } finally {
          setLoadingKeys(prev => {
            const next = new Set(prev)
            next.delete(key)
            return next
          })
        }
      }
      setHoveredPath(newPath)
      return
    }

    if (option.children && option.children.length > 0) {
      // Has children - expand
      setHoveredPath(newPath)

      if (changeOnSelect) {
        // In changeOnSelect mode, also select this node
        setSelectedPath(newPath)
        onChange?.(newPath, selectedOpts)
      }
    } else {
      // Leaf node - select and close
      if (multiple) {
        const pathStr = newPath.join('/')
        const isSelected = selectedPaths.some(p => p.join('/') === pathStr)
        let newPaths: string[][]
        if (isSelected) {
          newPaths = selectedPaths.filter(p => p.join('/') !== pathStr)
        } else {
          newPaths = [...selectedPaths, newPath]
        }
        setSelectedPaths(newPaths)
        // Don't close in multiple mode
      } else {
        setSelectedPath(newPath)
        setIsOpen(false)
        setHoveredPath([])
        setSearchValue('')
        onChange?.(newPath, selectedOpts)
      }
    }
  }

  const handleSearchResultClick = (values: string[], path: CascaderOption[]) => {
    if (multiple) {
      const pathStr = values.join('/')
      const isSelected = selectedPaths.some(p => p.join('/') === pathStr)
      let newPaths: string[][]
      if (isSelected) {
        newPaths = selectedPaths.filter(p => p.join('/') !== pathStr)
      } else {
        newPaths = [...selectedPaths, values]
      }
      setSelectedPaths(newPaths)
    } else {
      setSelectedPath(values)
      setIsOpen(false)
      setSearchValue('')
      onChange?.(values, path)
    }
  }

  const handleOptionHover = (option: CascaderOption, level: number) => {
    if (expandTrigger !== 'hover' || option.disabled) return

    const newPath = [...activePath.slice(0, level), option.value]
    setHoveredPath(newPath)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (multiple) {
      setSelectedPaths([])
      onChange?.([], [])
    } else {
      setSelectedPath([])
      onChange?.([], [])
    }
  }

  const handleRemoveTag = (pathToRemove: string[], e: React.MouseEvent) => {
    e.stopPropagation()
    const pathStr = pathToRemove.join('/')
    const newPaths = selectedPaths.filter(p => p.join('/') !== pathStr)
    setSelectedPaths(newPaths)
    if (newPaths.length > 0) {
      onChange?.(newPaths[newPaths.length - 1], getSelectedOptions(newPaths[newPaths.length - 1]))
    } else {
      onChange?.([], [])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else if (filteredPaths && filteredPaths.length > 0) {
          const { values, path } = filteredPaths[focusedIndex.row] || {}
          if (values) {
            handleSearchResultClick(values, path)
          }
        } else {
          const currentColumn = columns[focusedIndex.column]
          if (currentColumn) {
            const option = currentColumn[focusedIndex.row]
            if (option) {
              handleOptionClick(option, focusedIndex.column)
            }
          }
        }
        break
      case ' ':
        if (!showSearch) {
          e.preventDefault()
          setIsOpen(!isOpen)
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setHoveredPath([])
        setSearchValue('')
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else if (filteredPaths) {
          setFocusedIndex(prev => ({
            ...prev,
            row: Math.min(prev.row + 1, filteredPaths.length - 1)
          }))
        } else {
          const currentColumn = columns[focusedIndex.column]
          if (currentColumn) {
            setFocusedIndex(prev => ({
              ...prev,
              row: Math.min(prev.row + 1, currentColumn.length - 1)
            }))
          }
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (filteredPaths) {
          setFocusedIndex(prev => ({
            ...prev,
            row: Math.max(prev.row - 1, 0)
          }))
        } else {
          setFocusedIndex(prev => ({
            ...prev,
            row: Math.max(prev.row - 1, 0)
          }))
        }
        break
      case 'ArrowRight':
        e.preventDefault()
        if (!filteredPaths && focusedIndex.column < columns.length - 1) {
          setFocusedIndex(prev => ({
            column: prev.column + 1,
            row: 0
          }))
        }
        break
      case 'ArrowLeft':
        e.preventDefault()
        if (!filteredPaths && focusedIndex.column > 0) {
          setFocusedIndex(prev => ({
            column: prev.column - 1,
            row: 0
          }))
        }
        break
      case 'Home':
        e.preventDefault()
        setFocusedIndex(prev => ({ ...prev, row: 0 }))
        break
      case 'End':
        e.preventDefault()
        if (filteredPaths) {
          setFocusedIndex(prev => ({ ...prev, row: filteredPaths.length - 1 }))
        } else {
          const currentColumn = columns[focusedIndex.column]
          if (currentColumn) {
            setFocusedIndex(prev => ({ ...prev, row: currentColumn.length - 1 }))
          }
        }
        break
    }
  }

  // Reset focus when dropdown opens/closes
  useEffect(() => {
    if (isOpen) {
      setFocusedIndex({ column: 0, row: 0 })
    }
  }, [isOpen])

  // Display value
  const selectedOptions = getSelectedOptions(selectedPath)
  const labels = selectedOptions.map(opt => opt.label)
  const displayValue = displayRender
    ? displayRender(labels, selectedOptions)
    : labels.join(' / ')

  // Size classes
  const sizeClasses: Record<CascaderSize, string> = {
    xs: 'd-input-xs text-xs min-h-6',
    sm: 'd-input-sm text-sm min-h-8',
    md: 'd-input-md min-h-10',
    lg: 'd-input-lg text-lg min-h-12',
  }

  const dropdownSizeClasses: Record<CascaderSize, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  // Color and status classes
  const colorClasses: Record<CascaderColor, string> = {
    primary: 'border-primary focus:border-primary',
    secondary: 'border-secondary focus:border-secondary',
    accent: 'border-accent focus:border-accent',
    info: 'border-info focus:border-info',
    success: 'border-success focus:border-success',
    warning: 'border-warning focus:border-warning',
    error: 'border-error focus:border-error',
  }

  const getColorClass = () => {
    if (status === 'error') return 'd-input-error'
    if (status === 'warning') return 'd-input-warning'
    if (color && isOpen) return colorClasses[color]
    if (isOpen) return 'd-input-primary'
    return ''
  }

  const getOptionId = (colIndex: number, optIndex: number) =>
    `${baseId}-option-${colIndex}-${optIndex}`

  const getSearchOptionId = (index: number) =>
    `${baseId}-search-option-${index}`

  // Render tags for multiple mode
  const renderTags = () => {
    const paths = selectedPaths
    const displayPaths = maxTagCount === 'responsive' || typeof maxTagCount === 'number'
      ? paths.slice(0, typeof maxTagCount === 'number' ? maxTagCount : 3)
      : paths
    const hiddenCount = paths.length - displayPaths.length

    return (
      <div className="flex flex-wrap gap-1 flex-1">
        {displayPaths.map((path) => {
          const opts = getSelectedOptions(path)
          const label = opts.map(o => o.label).join(' / ')
          return (
            <span
              key={path.join('/')}
              className="d-badge d-badge-sm gap-1"
            >
              {label}
              <button
                type="button"
                className="d-btn d-btn-ghost d-btn-xs d-btn-circle w-3 h-3 min-h-0"
                onClick={(e) => handleRemoveTag(path, e)}
                aria-label={`Remove ${label}`}
              >
                <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          )
        })}
        {hiddenCount > 0 && (
          <span className="d-badge d-badge-sm">+{hiddenCount}</span>
        )}
      </div>
    )
  }

  // Render search results
  const renderSearchResults = () => {
    if (!filteredPaths) return null

    if (filteredPaths.length === 0) {
      return (
        <div className="p-4 text-center text-base-content/50">
          {notFoundContent}
        </div>
      )
    }

    const renderFn = typeof showSearch === 'object' && showSearch.render
      ? showSearch.render
      : null

    return (
      <ul role="listbox" className="max-h-[200px] overflow-y-auto py-1">
        {filteredPaths.map(({ path, values }, index) => {
          const isSelected = multiple
            ? selectedPaths.some(p => p.join('/') === values.join('/'))
            : selectedPath.join('/') === values.join('/')
          const isFocused = focusedIndex.row === index

          return (
            <li
              key={values.join('/')}
              id={getSearchOptionId(index)}
              role="option"
              aria-selected={isSelected}
              data-testid={`${baseTestId}-search-option-${values.join('-')}`}
              data-state={isSelected ? 'selected' : undefined}
              className={`px-3 py-2 cursor-pointer ${
                isSelected
                  ? 'bg-primary text-primary-content'
                  : isFocused
                  ? 'bg-base-200'
                  : 'hover:bg-base-200'
              }`}
              onClick={() => handleSearchResultClick(values, path)}
            >
              {renderFn
                ? renderFn(searchValue, path)
                : path.map(opt => opt.label).join(' / ')
              }
            </li>
          )
        })}
      </ul>
    )
  }

  // Render dropdown content
  const renderDropdownContent = () => {
    const content = filteredPaths ? renderSearchResults() : (
      <div className="flex">
        {columns.map((columnOptions, colIndex) => (
          <ul
            key={colIndex}
            role="listbox"
            aria-label={`Level ${colIndex + 1} options`}
            className={`min-w-[120px] max-h-[200px] overflow-y-auto py-1 ${
              colIndex > 0 ? 'border-l border-base-300' : ''
            }`}
          >
            {columnOptions.map((option, optIndex) => {
              const isSelected = selectedPath[colIndex] === option.value
              const isHovered = activePath[colIndex] === option.value
              const hasChildren = option.children && option.children.length > 0
              const isLoading = loadingKeys.has(option.value)
              const isFocused = focusedIndex.column === colIndex && focusedIndex.row === optIndex
              const optionId = getOptionId(colIndex, optIndex)

              return (
                <li
                  key={option.value}
                  id={optionId}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled}
                  data-testid={`${baseTestId}-option-${option.value}`}
                  data-state={isSelected ? 'selected' : isHovered ? 'hovered' : undefined}
                  data-value={option.value}
                  className={`px-3 py-2 cursor-pointer flex items-center justify-between gap-2 ${
                    option.disabled
                      ? 'text-base-content/30 cursor-not-allowed'
                      : isSelected
                      ? 'bg-primary text-primary-content'
                      : isFocused
                      ? 'bg-base-200'
                      : isHovered
                      ? 'bg-base-200'
                      : 'hover:bg-base-200'
                  }`}
                  onClick={() => handleOptionClick(option, colIndex)}
                  onMouseEnter={() => handleOptionHover(option, colIndex)}
                >
                  <span>{option.label}</span>
                  {isLoading ? (
                    <span className="d-loading d-loading-spinner d-loading-xs" />
                  ) : hasChildren ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  ) : null}
                </li>
              )
            })}
          </ul>
        ))}
      </div>
    )

    return dropdownRender ? dropdownRender(content) : content
  }

  // Get active descendant ID
  const getActiveDescendant = () => {
    if (!isOpen) return undefined
    if (filteredPaths) {
      return getSearchOptionId(focusedIndex.row)
    }
    return getOptionId(focusedIndex.column, focusedIndex.row)
  }

  const hasValue = multiple ? selectedPaths.length > 0 : selectedPath.length > 0

  return (
    <div
      ref={(node) => {
        containerRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      className={`relative inline-block w-full ${className}`}
      data-testid={baseTestId}
      data-state={isOpen ? 'open' : 'closed'}
      {...rest}
    >
      {/* Input/Trigger */}
      <div
        id={inputId}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-activedescendant={getActiveDescendant()}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className={`d-input w-full flex items-center justify-between cursor-pointer gap-1 ${sizeClasses[size]} ${
          disabled ? 'd-input-disabled cursor-not-allowed' : ''
        } ${getColorClass()}`}
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen)
            if (showSearch && !isOpen) {
              setTimeout(() => inputRef.current?.focus(), 0)
            }
          }
        }}
        onKeyDown={handleKeyDown}
      >
        {multiple && selectedPaths.length > 0 ? (
          renderTags()
        ) : showSearch && isOpen ? (
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent outline-none min-w-[50px]"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder={hasValue ? String(displayValue) : placeholder}
            aria-label="Search options"
          />
        ) : (
          <span className={`flex-1 truncate ${!hasValue ? 'text-base-content/50' : ''}`}>
            {hasValue ? displayValue : placeholder}
          </span>
        )}
        <div className="flex items-center gap-1 shrink-0">
          {allowClear && hasValue && !disabled && (
            <button
              type="button"
              className="d-btn d-btn-ghost d-btn-xs d-btn-circle"
              onClick={handleClear}
              aria-label="Clear selection"
              data-testid={`${baseTestId}-clear`}
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
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          id={listboxId}
          className={`absolute z-50 mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg ${dropdownSizeClasses[size]} ${popupClassName}`}
          data-testid={`${baseTestId}-dropdown`}
        >
          {renderDropdownContent()}
        </div>
      )}
    </div>
  )
})

Cascader.displayName = 'Cascader'
