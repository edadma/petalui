import React, { useState, useRef, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'

export interface MentionOption {
  value: string
  label?: string
  avatar?: string
  disabled?: boolean
}

export interface MentionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect' | 'defaultValue' | 'prefix'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onSelect?: (option: MentionOption, prefix: string) => void
  onSearch?: (text: string, prefix: string) => void
  options?: MentionOption[]
  loading?: boolean
  prefix?: string | string[]
  split?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  rows?: number
  autoSize?: boolean | { minRows?: number; maxRows?: number }
  notFoundContent?: React.ReactNode
  filterOption?: boolean | ((input: string, option: MentionOption) => boolean)
  dropdownClassName?: string
}

export const Mention: React.FC<MentionProps> = ({
  value,
  defaultValue = '',
  onChange,
  onSelect,
  onSearch,
  options = [],
  loading = false,
  prefix = '@',
  split = ' ',
  placeholder,
  disabled = false,
  readOnly = false,
  rows = 3,
  autoSize = false,
  notFoundContent = 'No matches found',
  filterOption = true,
  className = '',
  dropdownClassName = '',
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const currentValue = value !== undefined ? value : internalValue

  const [isOpen, setIsOpen] = useState(false)
  const [activePrefix, setActivePrefix] = useState<string | null>(null)
  const [searchText, setSearchText] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [mentionStart, setMentionStart] = useState<number | null>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)

  const prefixes = Array.isArray(prefix) ? prefix : [prefix]

  // Filter options based on search text
  const filteredOptions = useCallback(() => {
    if (!filterOption) return options

    const filterFn =
      typeof filterOption === 'function'
        ? filterOption
        : (input: string, option: MentionOption) => {
            const label = option.label || option.value
            return label.toLowerCase().includes(input.toLowerCase())
          }

    return options.filter((opt) => filterFn(searchText, opt))
  }, [options, searchText, filterOption])

  const filtered = filteredOptions()

  // Update textarea height for autoSize
  const updateHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea || !autoSize) return

    textarea.style.height = 'auto'
    const scrollHeight = textarea.scrollHeight

    if (typeof autoSize === 'object') {
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20
      const minHeight = autoSize.minRows ? autoSize.minRows * lineHeight : 0
      const maxHeight = autoSize.maxRows ? autoSize.maxRows * lineHeight : Infinity

      textarea.style.height = `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`
    } else {
      textarea.style.height = `${scrollHeight}px`
    }
  }, [autoSize])

  useEffect(() => {
    updateHeight()
  }, [currentValue, updateHeight])

  // Calculate dropdown position
  const updateDropdownPosition = useCallback(() => {
    const textarea = textareaRef.current
    const measure = measureRef.current
    if (!textarea || !measure || mentionStart === null) return

    // Get text before cursor to measure position
    const textBeforeCursor = currentValue.substring(0, mentionStart)

    // Create a temporary element to measure text position
    measure.textContent = textBeforeCursor

    const textareaRect = textarea.getBoundingClientRect()
    const measureRect = measure.getBoundingClientRect()

    // Calculate position relative to viewport
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20

    setDropdownPosition({
      top: textareaRect.top + window.scrollY + lineHeight + 4,
      left: textareaRect.left + window.scrollX + Math.min(measureRect.width % textareaRect.width, textareaRect.width - 200),
    })
  }, [currentValue, mentionStart])

  useEffect(() => {
    if (isOpen) {
      updateDropdownPosition()
    }
  }, [isOpen, updateDropdownPosition, searchText])

  // Handle text change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    const cursorPos = e.target.selectionStart

    if (value === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)

    // Check if we should open the mention dropdown
    checkForMention(newValue, cursorPos)
  }

  const checkForMention = (text: string, cursorPos: number) => {
    // Look backwards from cursor for a prefix
    let foundPrefix: string | null = null
    let foundStart: number | null = null

    for (const p of prefixes) {
      // Find the last occurrence of prefix before cursor
      const beforeCursor = text.substring(0, cursorPos)
      const lastPrefixIndex = beforeCursor.lastIndexOf(p)

      if (lastPrefixIndex !== -1) {
        // Check if prefix is at start or preceded by whitespace/split
        const charBefore = lastPrefixIndex > 0 ? text[lastPrefixIndex - 1] : split
        if (charBefore === split || charBefore === '\n' || lastPrefixIndex === 0) {
          // Check if there's no space between prefix and cursor
          const textAfterPrefix = text.substring(lastPrefixIndex + p.length, cursorPos)
          if (!textAfterPrefix.includes(split) && !textAfterPrefix.includes('\n')) {
            foundPrefix = p
            foundStart = lastPrefixIndex
            break
          }
        }
      }
    }

    if (foundPrefix !== null && foundStart !== null) {
      const search = text.substring(foundStart + foundPrefix.length, cursorPos)
      setActivePrefix(foundPrefix)
      setSearchText(search)
      setMentionStart(foundStart)
      setIsOpen(true)
      setActiveIndex(0)
      onSearch?.(search, foundPrefix)
    } else {
      setIsOpen(false)
      setActivePrefix(null)
      setSearchText('')
      setMentionStart(null)
    }
  }

  // Handle option selection
  const selectOption = (option: MentionOption) => {
    if (option.disabled || mentionStart === null || activePrefix === null) return

    const textarea = textareaRef.current
    if (!textarea) return

    const beforeMention = currentValue.substring(0, mentionStart)
    const afterCursor = currentValue.substring(textarea.selectionStart)

    const mentionText = `${activePrefix}${option.value}${split}`
    const newValue = beforeMention + mentionText + afterCursor

    if (value === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
    onSelect?.(option, activePrefix)

    setIsOpen(false)
    setActivePrefix(null)
    setSearchText('')
    setMentionStart(null)

    // Set cursor position after mention
    setTimeout(() => {
      const newCursorPos = beforeMention.length + mentionText.length
      textarea.focus()
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex((prev) => (prev + 1) % Math.max(filtered.length, 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex((prev) => (prev - 1 + filtered.length) % Math.max(filtered.length, 1))
        break
      case 'Enter':
        if (filtered[activeIndex]) {
          e.preventDefault()
          selectOption(filtered[activeIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        break
      case 'Tab':
        if (filtered[activeIndex]) {
          e.preventDefault()
          selectOption(filtered[activeIndex])
        }
        break
    }
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        textareaRef.current &&
        !textareaRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Scroll active item into view
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const activeItem = dropdownRef.current.querySelector('[data-active="true"]')
      activeItem?.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex, isOpen])

  const dropdown = isOpen && (
    <div
      ref={dropdownRef}
      className={`fixed z-50 bg-base-100 border border-base-300 rounded-lg shadow-lg
        min-w-48 max-h-60 overflow-auto ${dropdownClassName}`}
      style={{
        top: dropdownPosition.top,
        left: dropdownPosition.left,
      }}
    >
      {loading ? (
        <div className="p-3 text-center text-base-content/60">
          <span className="loading loading-spinner loading-sm"></span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-3 text-center text-base-content/60 text-sm">
          {notFoundContent}
        </div>
      ) : (
        <ul className="menu menu-sm p-1">
          {filtered.map((option, index) => (
            <li key={option.value}>
              <button
                type="button"
                data-active={index === activeIndex}
                className={`flex items-center gap-2 ${
                  index === activeIndex ? 'active' : ''
                } ${option.disabled ? 'disabled opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => selectOption(option)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {option.avatar && (
                  <div className="avatar">
                    <div className="w-6 h-6 rounded-full">
                      <img src={option.avatar} alt="" />
                    </div>
                  </div>
                )}
                <span>{option.label || option.value}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  return (
    <div className={`relative ${className}`} data-state={isOpen ? 'open' : 'closed'} {...rest}>
      {/* Hidden measure element for cursor position */}
      <div
        ref={measureRef}
        className="invisible absolute whitespace-pre-wrap break-words"
        style={{
          font: textareaRef.current ? getComputedStyle(textareaRef.current).font : undefined,
          width: textareaRef.current?.clientWidth,
          padding: textareaRef.current ? getComputedStyle(textareaRef.current).padding : undefined,
        }}
        aria-hidden="true"
      />

      <textarea
        ref={textareaRef}
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        rows={typeof autoSize === 'object' ? autoSize.minRows || rows : autoSize ? 1 : rows}
        className="textarea textarea-bordered w-full resize-none"
      />

      {createPortal(dropdown, document.body)}
    </div>
  )
}
