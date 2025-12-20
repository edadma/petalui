import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'

// DaisyUI classes
const dModal = 'modal'
const dModalBox = 'modal-box'
const dKbd = 'kbd'
const dKbdXs = 'kbd-xs'

// Types
export interface CommandItemConfig {
  key: string
  label: React.ReactNode
  group?: string
  keywords?: string[]
  disabled?: boolean
  onSelect?: () => void
  icon?: React.ReactNode
}

export interface CommandProps extends Omit<React.HTMLAttributes<HTMLDialogElement>, 'children'> {
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
  items?: CommandItemConfig[]
  filter?: (value: string, search: string, keywords?: string[]) => boolean
  loop?: boolean
  shortcut?: string[]
  placeholder?: string
  emptyMessage?: React.ReactNode
}

interface CommandContextValue {
  searchValue: string
  setSearchValue: (value: string) => void
  highlightedIndex: number
  setHighlightedIndex: (index: number) => void
  registerItem: (id: string, value: string, keywords: string[], disabled: boolean) => void
  unregisterItem: (id: string) => void
  filteredItems: FilteredItem[]
  selectItem: (id: string) => void
  loop: boolean
  baseId: string
  currentPage: string
  setPage: (pageId: string) => void
  goBack: () => void
  pageStack: string[]
}

interface FilteredItem {
  id: string
  value: string
  keywords: string[]
  disabled: boolean
}

interface ItemRegistration {
  id: string
  value: string
  keywords: string[]
  disabled: boolean
  onSelect?: () => void
}

const CommandContext = createContext<CommandContextValue | null>(null)

function useCommandContext() {
  const context = useContext(CommandContext)
  if (!context) {
    throw new Error('Command compound components must be used within a Command')
  }
  return context
}

// Default filter function
const defaultFilter = (value: string, search: string, keywords: string[] = []): boolean => {
  const searchLower = search.toLowerCase()
  const valueLower = value.toLowerCase()
  if (valueLower.includes(searchLower)) return true
  return keywords.some((k) => k.toLowerCase().includes(searchLower))
}

// Root Command component
const CommandRoot = forwardRef<HTMLDialogElement, CommandProps>(
  (
    {
      children,
      open: controlledOpen,
      onOpenChange,
      defaultOpen = false,
      items,
      filter = defaultFilter,
      loop = true,
      shortcut = ['k'],
      placeholder = 'Type a command or search...',
      emptyMessage = 'No results found.',
      className = '',
      ...rest
    },
    ref
  ) => {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const previousActiveElement = useRef<HTMLElement | null>(null)
    const baseId = useId()

    // Controlled/uncontrolled open state
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const isControlled = controlledOpen !== undefined
    const isOpen = isControlled ? controlledOpen : internalOpen

    const setIsOpen = useCallback(
      (newOpen: boolean) => {
        if (!isControlled) {
          setInternalOpen(newOpen)
        }
        onOpenChange?.(newOpen)
      },
      [isControlled, onOpenChange]
    )

    // State
    const [searchValue, setSearchValue] = useState('')
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const [registeredItems, setRegisteredItems] = useState<Map<string, ItemRegistration>>(new Map())
    const [pageStack, setPageStack] = useState<string[]>(['root'])
    const currentPage = pageStack[pageStack.length - 1]

    // Page navigation
    const setPage = useCallback((pageId: string) => {
      setPageStack((prev) => [...prev, pageId])
      setSearchValue('')
      setHighlightedIndex(0)
    }, [])

    const goBack = useCallback(() => {
      if (pageStack.length > 1) {
        setPageStack((prev) => prev.slice(0, -1))
        setSearchValue('')
        setHighlightedIndex(0)
      }
    }, [pageStack.length])

    // Item registration for compound components
    const registerItem = useCallback(
      (id: string, value: string, keywords: string[], disabled: boolean, onSelect?: () => void) => {
        setRegisteredItems((prev) => {
          const next = new Map(prev)
          next.set(id, { id, value, keywords, disabled, onSelect })
          return next
        })
      },
      []
    )

    const unregisterItem = useCallback((id: string) => {
      setRegisteredItems((prev) => {
        const next = new Map(prev)
        next.delete(id)
        return next
      })
    }, [])

    // Compute filtered items
    const filteredItems = useMemo((): FilteredItem[] => {
      // Use data-driven items if provided
      if (items) {
        return items
          .filter((item) => {
            if (!searchValue) return true
            const label = typeof item.label === 'string' ? item.label : ''
            return filter(label, searchValue, item.keywords)
          })
          .map((item) => ({
            id: item.key,
            value: typeof item.label === 'string' ? item.label : item.key,
            keywords: item.keywords || [],
            disabled: item.disabled || false,
          }))
      }

      // Use registered compound items
      const itemsArray = Array.from(registeredItems.values())
      return itemsArray.filter((item) => {
        if (!searchValue) return true
        return filter(item.value, searchValue, item.keywords)
      })
    }, [items, registeredItems, searchValue, filter])

    // Get enabled items for navigation
    const enabledItems = useMemo(
      () => filteredItems.filter((item) => !item.disabled),
      [filteredItems]
    )

    // Select item
    const selectItem = useCallback(
      (id: string) => {
        if (items) {
          const item = items.find((i) => i.key === id)
          if (item && !item.disabled) {
            item.onSelect?.()
            setIsOpen(false)
          }
        } else {
          const reg = registeredItems.get(id)
          if (reg && !reg.disabled) {
            reg.onSelect?.()
            setIsOpen(false)
          }
        }
      },
      [items, registeredItems, setIsOpen]
    )

    // Reset state when opening
    useEffect(() => {
      if (isOpen) {
        setSearchValue('')
        setHighlightedIndex(0)
        setPageStack(['root'])
      }
    }, [isOpen])

    // Handle dialog open/close
    useEffect(() => {
      const dialog = dialogRef.current
      if (!dialog) return

      if (isOpen) {
        if (!dialog.open) {
          previousActiveElement.current = document.activeElement as HTMLElement
          dialog.showModal()
          setTimeout(() => inputRef.current?.focus(), 0)
        }
      } else {
        if (dialog.open) {
          dialog.close()
          previousActiveElement.current?.focus()
        }
      }
    }, [isOpen])

    // Handle dialog close event
    useEffect(() => {
      const dialog = dialogRef.current
      if (!dialog) return

      const onDialogClose = () => {
        setIsOpen(false)
      }

      dialog.addEventListener('close', onDialogClose)
      return () => dialog.removeEventListener('close', onDialogClose)
    }, [setIsOpen])

    // Global keyboard shortcut
    useEffect(() => {
      const handleGlobalKeyDown = (e: KeyboardEvent) => {
        const key = shortcut[0]?.toLowerCase()
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === key) {
          e.preventDefault()
          setIsOpen(!isOpen)
        }
      }

      document.addEventListener('keydown', handleGlobalKeyDown)
      return () => document.removeEventListener('keydown', handleGlobalKeyDown)
    }, [shortcut, isOpen, setIsOpen])

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        switch (e.key) {
          case 'ArrowDown': {
            e.preventDefault()
            if (enabledItems.length === 0) return
            setHighlightedIndex((prev) => {
              const next = prev + 1
              if (next >= enabledItems.length) {
                return loop ? 0 : prev
              }
              return next
            })
            break
          }
          case 'ArrowUp': {
            e.preventDefault()
            if (enabledItems.length === 0) return
            setHighlightedIndex((prev) => {
              const next = prev - 1
              if (next < 0) {
                return loop ? enabledItems.length - 1 : 0
              }
              return next
            })
            break
          }
          case 'Enter': {
            e.preventDefault()
            const item = enabledItems[highlightedIndex]
            if (item) {
              selectItem(item.id)
            }
            break
          }
          case 'Escape': {
            e.preventDefault()
            if (pageStack.length > 1) {
              goBack()
            } else {
              setIsOpen(false)
            }
            break
          }
          case 'Backspace': {
            if (searchValue === '' && pageStack.length > 1) {
              e.preventDefault()
              goBack()
            }
            break
          }
        }
      },
      [enabledItems, highlightedIndex, loop, selectItem, pageStack, goBack, searchValue, setIsOpen]
    )

    // Scroll highlighted item into view
    useEffect(() => {
      if (highlightedIndex >= 0 && listRef.current) {
        const items = listRef.current.querySelectorAll('[data-command-item]')
        const highlightedEl = items[highlightedIndex] as HTMLElement
        highlightedEl?.scrollIntoView({ block: 'nearest' })
      }
    }, [highlightedIndex])

    // Handle mask click
    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === dialogRef.current) {
        setIsOpen(false)
      }
    }

    const contextValue: CommandContextValue = {
      searchValue,
      setSearchValue,
      highlightedIndex,
      setHighlightedIndex,
      registerItem: (id, value, keywords, disabled) => registerItem(id, value, keywords, disabled),
      unregisterItem,
      filteredItems,
      selectItem,
      loop,
      baseId,
      currentPage,
      setPage,
      goBack,
      pageStack,
    }

    // Render data-driven items
    const renderDataDrivenItems = () => {
      if (!items) return null

      // Group items
      const groups = new Map<string, CommandItemConfig[]>()
      const ungrouped: CommandItemConfig[] = []

      filteredItems.forEach((fi) => {
        const item = items.find((i) => i.key === fi.id)
        if (!item) return
        if (item.group) {
          const group = groups.get(item.group) || []
          group.push(item)
          groups.set(item.group, group)
        } else {
          ungrouped.push(item)
        }
      })

      let globalIndex = 0

      return (
        <>
          {Array.from(groups.entries()).map(([groupName, groupItems]) => (
            <div key={groupName} role="group" aria-label={groupName}>
              <div className="px-3 py-2 text-xs font-semibold text-base-content/60 uppercase tracking-wider">
                {groupName}
              </div>
              {groupItems.map((item) => {
                const itemIndex = globalIndex++
                const isHighlighted = itemIndex === highlightedIndex
                return (
                  <div
                    key={item.key}
                    role="option"
                    aria-selected={isHighlighted}
                    aria-disabled={item.disabled}
                    data-command-item
                    data-highlighted={isHighlighted}
                    className={[
                      'px-3 py-2 cursor-pointer flex items-center gap-3',
                      isHighlighted && 'bg-primary text-primary-content',
                      !isHighlighted && 'hover:bg-base-200',
                      item.disabled && 'opacity-50 cursor-not-allowed',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => !item.disabled && selectItem(item.key)}
                    onMouseEnter={() => !item.disabled && setHighlightedIndex(itemIndex)}
                  >
                    {item.icon && <span className="w-5 h-5">{item.icon}</span>}
                    <span>{item.label}</span>
                  </div>
                )
              })}
            </div>
          ))}
          {ungrouped.length > 0 && (
            <div role="group">
              {ungrouped.map((item) => {
                const itemIndex = globalIndex++
                const isHighlighted = itemIndex === highlightedIndex
                return (
                  <div
                    key={item.key}
                    role="option"
                    aria-selected={isHighlighted}
                    aria-disabled={item.disabled}
                    data-command-item
                    data-highlighted={isHighlighted}
                    className={[
                      'px-3 py-2 cursor-pointer flex items-center gap-3',
                      isHighlighted && 'bg-primary text-primary-content',
                      !isHighlighted && 'hover:bg-base-200',
                      item.disabled && 'opacity-50 cursor-not-allowed',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => !item.disabled && selectItem(item.key)}
                    onMouseEnter={() => !item.disabled && setHighlightedIndex(itemIndex)}
                  >
                    {item.icon && <span className="w-5 h-5">{item.icon}</span>}
                    <span>{item.label}</span>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )
    }

    return (
      <dialog
        ref={(node) => {
          ;(dialogRef as React.MutableRefObject<HTMLDialogElement | null>).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        className={`${dModal} ${className}`}
        onClick={handleBackdropClick}
        {...rest}
      >
        <div
          className={`${dModalBox} p-0 max-w-lg w-full overflow-hidden`}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <CommandContext.Provider value={contextValue}>
            {/* Breadcrumb for nested pages */}
            {pageStack.length > 1 && (
              <div className="px-3 py-2 border-b border-base-content/10 flex items-center gap-2 text-sm">
                <button
                  onClick={goBack}
                  className="hover:bg-base-200 rounded p-1"
                  aria-label="Go back"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-base-content/60">{currentPage}</span>
              </div>
            )}

            {/* Search input */}
            <div className="px-3 py-3 border-b border-base-content/10">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-base-content/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-base-content/50"
                  placeholder={placeholder}
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value)
                    setHighlightedIndex(0)
                  }}
                  onKeyDown={handleKeyDown}
                  role="combobox"
                  aria-expanded="true"
                  aria-controls={`${baseId}-listbox`}
                  aria-activedescendant={
                    enabledItems[highlightedIndex]
                      ? `${baseId}-item-${enabledItems[highlightedIndex].id}`
                      : undefined
                  }
                />
              </div>
            </div>

            {/* List */}
            <div
              ref={listRef}
              className="max-h-80 overflow-y-auto py-2"
              role="listbox"
              id={`${baseId}-listbox`}
            >
              {items ? (
                filteredItems.length > 0 ? (
                  renderDataDrivenItems()
                ) : (
                  <div className="px-3 py-8 text-center text-base-content/60">{emptyMessage}</div>
                )
              ) : (
                children
              )}
            </div>

            {/* Footer with shortcut hint */}
            <div className="px-3 py-2 border-t border-base-content/10 flex items-center justify-between text-xs text-base-content/50">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className={`${dKbd} ${dKbdXs}`}>↑↓</kbd> navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className={`${dKbd} ${dKbdXs}`}>↵</kbd> select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className={`${dKbd} ${dKbdXs}`}>esc</kbd> close
                </span>
              </div>
            </div>
          </CommandContext.Provider>
        </div>
      </dialog>
    )
  }
)

CommandRoot.displayName = 'Command'

// Command.Input - for compound pattern customization
interface CommandInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: string
  onValueChange?: (value: string) => void
}

function CommandInput({ placeholder, value, onValueChange, ...rest }: CommandInputProps) {
  const { searchValue, setSearchValue } = useCommandContext()
  const controlledValue = value !== undefined ? value : searchValue
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (onValueChange) {
      onValueChange(newValue)
    } else {
      setSearchValue(newValue)
    }
  }

  return (
    <input
      type="text"
      className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-base-content/50"
      placeholder={placeholder}
      value={controlledValue}
      onChange={handleChange}
      {...rest}
    />
  )
}

// Command.List
interface CommandListProps {
  children: React.ReactNode
}

function CommandList({ children }: CommandListProps) {
  const { baseId, currentPage } = useCommandContext()

  // Filter children to only show items for current page
  const filteredChildren = React.Children.toArray(children).filter((child) => {
    if (!React.isValidElement(child)) return false
    // Show Command.Page only if it matches currentPage
    if (child.type === CommandPage) {
      return (child.props as CommandPageProps).id === currentPage
    }
    // Show groups/items only on root page
    return currentPage === 'root'
  })

  return (
    <div role="listbox" id={`${baseId}-listbox`} className="py-2">
      {filteredChildren}
    </div>
  )
}

// Command.Group
interface CommandGroupProps {
  heading?: React.ReactNode
  children: React.ReactNode
}

function CommandGroup({ heading, children }: CommandGroupProps) {
  const { searchValue, filteredItems } = useCommandContext()

  // Check if any children match the filter
  const childArray = React.Children.toArray(children)
  const hasVisibleChildren = childArray.some((child) => {
    if (!React.isValidElement(child)) return false
    const childProps = child.props as CommandItemProps
    const childValue = childProps.value || ''
    if (!searchValue) return true
    return filteredItems.some((fi) => fi.value === childValue || fi.id === childProps.value)
  })

  if (searchValue && !hasVisibleChildren) {
    return null
  }

  return (
    <div role="group" aria-label={typeof heading === 'string' ? heading : undefined}>
      {heading && (
        <div className="px-3 py-2 text-xs font-semibold text-base-content/60 uppercase tracking-wider">
          {heading}
        </div>
      )}
      {children}
    </div>
  )
}

// Command.Item
interface CommandItemProps {
  children: React.ReactNode
  value?: string
  onSelect?: () => void
  disabled?: boolean
  keywords?: string[]
  icon?: React.ReactNode
}

function CommandItem({
  children,
  value,
  onSelect,
  disabled = false,
  keywords = [],
  icon,
}: CommandItemProps) {
  const {
    registerItem,
    unregisterItem,
    filteredItems,
    highlightedIndex,
    setHighlightedIndex,
    baseId,
  } = useCommandContext()

  const itemId = useId()
  const itemValue = value || (typeof children === 'string' ? children : '')

  // Register item
  useEffect(() => {
    registerItem(itemId, itemValue, keywords, disabled)
    return () => unregisterItem(itemId)
  }, [itemId, itemValue, keywords, disabled, registerItem, unregisterItem])

  // Store onSelect in a ref so we can access it from selectItem
  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect

  // Check if this item is visible after filtering
  const isVisible = filteredItems.some((fi) => fi.id === itemId)
  if (!isVisible) return null

  // Find index in filtered items
  const enabledItems = filteredItems.filter((fi) => !fi.disabled)
  const itemIndex = enabledItems.findIndex((fi) => fi.id === itemId)
  const isHighlighted = itemIndex === highlightedIndex

  const handleClick = () => {
    if (!disabled && onSelect) {
      onSelect()
    }
  }

  return (
    <div
      id={`${baseId}-item-${itemId}`}
      role="option"
      aria-selected={isHighlighted}
      aria-disabled={disabled}
      data-command-item
      data-highlighted={isHighlighted}
      className={[
        'px-3 py-2 cursor-pointer flex items-center gap-3',
        isHighlighted && 'bg-primary text-primary-content',
        !isHighlighted && 'hover:bg-base-200',
        disabled && 'opacity-50 cursor-not-allowed',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={handleClick}
      onMouseEnter={() => !disabled && setHighlightedIndex(itemIndex)}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      <span>{children}</span>
    </div>
  )
}

// Command.Empty
interface CommandEmptyProps {
  children?: React.ReactNode
}

function CommandEmpty({ children = 'No results found.' }: CommandEmptyProps) {
  const { filteredItems, searchValue } = useCommandContext()

  if (filteredItems.length > 0 || !searchValue) {
    return null
  }

  return <div className="px-3 py-8 text-center text-base-content/60">{children}</div>
}

// Command.Page - for nested navigation
interface CommandPageProps {
  id: string
  children: React.ReactNode
}

function CommandPage({ id, children }: CommandPageProps) {
  const { currentPage } = useCommandContext()

  if (currentPage !== id) {
    return null
  }

  return <>{children}</>
}

// Command.Separator
function CommandSeparator() {
  return <div className="my-2 border-t border-base-content/10" role="separator" />
}

// Export compound component
export const Command = Object.assign(CommandRoot, {
  Input: CommandInput,
  List: CommandList,
  Group: CommandGroup,
  Item: CommandItem,
  Empty: CommandEmpty,
  Page: CommandPage,
  Separator: CommandSeparator,
})

export default Command
