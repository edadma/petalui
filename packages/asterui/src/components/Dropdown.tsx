import React, { createContext, useContext, useId, useRef, useState, useCallback, useEffect } from 'react'

interface DropdownContextValue {
  position?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
  menuId: string
  triggerId: string
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  focusedIndex: number
  setFocusedIndex: (index: number) => void
  registerItem: (index: number, ref: HTMLElement | null, disabled: boolean) => void
  itemCount: number
  setItemCount: (count: number) => void
  disabled: boolean
  arrow: boolean
}

const DropdownContext = createContext<DropdownContextValue | undefined>(undefined)

function useDropdownContext() {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('Dropdown compound components must be used within Dropdown')
  }
  return context
}

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hover?: boolean
  position?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Disable the dropdown */
  disabled?: boolean
  /** Show arrow pointing to trigger */
  arrow?: boolean
}

export interface DropdownTriggerProps {
  children: React.ReactNode
  className?: string
}

export interface DropdownMenuProps {
  children: React.ReactNode
  className?: string
}

export interface DropdownItemProps {
  children: React.ReactNode
  onClick?: () => void
  active?: boolean
  disabled?: boolean
  danger?: boolean
  className?: string
  _index?: number // Internal prop passed by DropdownMenu
}

export interface DropdownDividerProps {
  className?: string
}

function DropdownRoot({
  children,
  hover = false,
  position = 'bottom',
  align = 'start',
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  arrow = false,
  className = '',
  ...rest
}: DropdownProps) {
  const menuId = useId()
  const triggerId = useId()
  const [internalOpen, setInternalOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [itemCount, setItemCount] = useState(0)
  const itemRefs = useRef<Map<number, { ref: HTMLElement | null; disabled: boolean }>>(new Map())
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Use controlled or uncontrolled open state
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen

  const setIsOpen = useCallback((open: boolean) => {
    if (disabled) return
    if (!isControlled) {
      setInternalOpen(open)
    }
    onOpenChange?.(open)
  }, [disabled, isControlled, onOpenChange])

  const registerItem = useCallback((index: number, ref: HTMLElement | null, disabled: boolean) => {
    if (ref) {
      itemRefs.current.set(index, { ref, disabled })
    } else {
      itemRefs.current.delete(index)
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const positionClasses: Record<string, string> = {
    top: 'dropdown-top',
    bottom: 'dropdown-bottom',
    left: 'dropdown-left',
    right: 'dropdown-right',
  }

  const alignClasses: Record<string, string> = {
    start: '',
    center: 'dropdown-center',
    end: 'dropdown-end',
  }

  const dropdownClasses = [
    'dropdown',
    positionClasses[position],
    alignClasses[align],
    hover && 'dropdown-hover',
    isOpen && 'dropdown-open',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <DropdownContext.Provider
      value={{
        position,
        align,
        menuId,
        triggerId,
        isOpen,
        setIsOpen,
        focusedIndex,
        setFocusedIndex,
        registerItem,
        itemCount,
        setItemCount,
        disabled,
        arrow,
      }}
    >
      <div ref={dropdownRef} className={dropdownClasses} data-state={isOpen ? 'open' : 'closed'} aria-disabled={disabled || undefined} {...rest}>{children}</div>
    </DropdownContext.Provider>
  )
}

function DropdownTrigger({ children, className = '' }: DropdownTriggerProps) {
  const { menuId, triggerId, isOpen, setIsOpen, setFocusedIndex, itemCount, disabled } = useDropdownContext()

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        event.preventDefault()
        setIsOpen(true)
        setFocusedIndex(0)
        break
      case 'ArrowUp':
        event.preventDefault()
        setIsOpen(true)
        setFocusedIndex(itemCount - 1)
        break
      case 'Escape':
        event.preventDefault()
        setIsOpen(false)
        setFocusedIndex(-1)
        break
    }
  }

  const handleClick = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setFocusedIndex(0)
    }
  }

  return (
    <button
      id={triggerId}
      type="button"
      tabIndex={disabled ? -1 : 0}
      className={`btn ${className}`}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={menuId}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </button>
  )
}

function DropdownMenu({ children, className = '' }: DropdownMenuProps) {
  const { menuId, triggerId, isOpen, setIsOpen, focusedIndex, setFocusedIndex, setItemCount, arrow, position } = useDropdownContext()
  const menuRef = useRef<HTMLUListElement>(null)

  // Count children and set item count
  const childArray = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && (child.type === DropdownItem)
  )

  useEffect(() => {
    setItemCount(childArray.length)
  }, [childArray.length, setItemCount])

  // Focus management
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && menuRef.current) {
      const items = menuRef.current.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])')
      const item = items[focusedIndex] as HTMLElement
      item?.focus()
    }
  }, [isOpen, focusedIndex])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const enabledItems = childArray.filter(
      (child) => React.isValidElement(child) && !(child.props as DropdownItemProps).disabled
    )
    const enabledCount = enabledItems.length

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setFocusedIndex((focusedIndex + 1) % enabledCount)
        break
      case 'ArrowUp':
        event.preventDefault()
        setFocusedIndex((focusedIndex - 1 + enabledCount) % enabledCount)
        break
      case 'Home':
        event.preventDefault()
        setFocusedIndex(0)
        break
      case 'End':
        event.preventDefault()
        setFocusedIndex(enabledCount - 1)
        break
      case 'Escape':
        event.preventDefault()
        setIsOpen(false)
        setFocusedIndex(-1)
        // Return focus to trigger
        document.getElementById(triggerId)?.focus()
        break
      case 'Tab':
        setIsOpen(false)
        setFocusedIndex(-1)
        break
    }
  }

  const menuClasses = [
    'dropdown-content',
    'menu',
    'bg-base-100',
    'rounded-box',
    'z-50',
    'shadow',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Clone children to pass index
  const childrenWithIndex = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && child.type === DropdownItem) {
      return React.cloneElement(child as React.ReactElement<any>, { _index: index })
    }
    return child
  })

  // Arrow position classes based on menu position
  const arrowPositionClasses: Record<string, string> = {
    top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-base-100 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-base-100 border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-0 top-1/2 -translate-y-1/2 translate-x-full border-l-base-100 border-t-transparent border-b-transparent border-r-transparent',
    right: 'left-0 top-1/2 -translate-y-1/2 -translate-x-full border-r-base-100 border-t-transparent border-b-transparent border-l-transparent',
  }

  const arrowElement = arrow ? (
    <span
      className={`absolute w-0 h-0 border-8 border-solid ${arrowPositionClasses[position || 'bottom']}`}
      aria-hidden="true"
    />
  ) : null

  return (
    <ul
      ref={menuRef}
      id={menuId}
      role="menu"
      aria-labelledby={triggerId}
      tabIndex={-1}
      className={`${menuClasses} ${arrow ? 'relative' : ''}`}
      onKeyDown={handleKeyDown}
    >
      {arrowElement}
      {childrenWithIndex}
    </ul>
  )
}

function DropdownItem({
  children,
  onClick,
  active = false,
  disabled = false,
  danger = false,
  className = '',
}: DropdownItemProps) {
  const { setIsOpen, setFocusedIndex, triggerId } = useDropdownContext()
  const itemClasses = [active && 'active', disabled && 'disabled', className].filter(Boolean).join(' ')

  const handleClick = () => {
    if (!disabled) {
      onClick?.()
      setIsOpen(false)
      setFocusedIndex(-1)
      document.getElementById(triggerId)?.focus()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
      event.preventDefault()
      handleClick()
    }
  }

  return (
    <li className={itemClasses} role="none">
      <a
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        className={danger ? 'text-error' : ''}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {children}
      </a>
    </li>
  )
}

function DropdownDivider({ className = '' }: DropdownDividerProps) {
  const classes = ['border-base-content/10', className].filter(Boolean).join(' ')
  return (
    <li role="separator" className="my-1">
      <hr className={classes} />
    </li>
  )
}

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Menu: DropdownMenu,
  Item: DropdownItem,
  Divider: DropdownDivider,
})
