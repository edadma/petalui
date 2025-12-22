import React, { createContext, useContext, useId, useRef, useState, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react'

// DaisyUI classes
const dDropdown = 'd-dropdown'
const dDropdownTop = 'd-dropdown-top'
const dDropdownBottom = 'd-dropdown-bottom'
const dDropdownLeft = 'd-dropdown-left'
const dDropdownRight = 'd-dropdown-right'
const dDropdownCenter = 'd-dropdown-center'
const dDropdownEnd = 'd-dropdown-end'
const dDropdownHover = 'd-dropdown-hover'
const dDropdownOpen = 'd-dropdown-open'
const dDropdownContent = 'd-dropdown-content'
const dMenu = 'd-menu'

// Types for data-driven items prop
export type DropdownTriggerType = 'click' | 'hover' | 'contextMenu'

export interface DropdownMenuItem {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
  danger?: boolean
  onClick?: () => void
  children?: DropdownMenuItem[] // For submenus
}

export interface DropdownMenuDivider {
  type: 'divider'
  key?: string
}

export type DropdownMenuItemType = DropdownMenuItem | DropdownMenuDivider

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
  closeDropdown: () => void
  getTestId: (suffix: string) => string | undefined
}

const DropdownContext = createContext<DropdownContextValue | undefined>(undefined)

function useDropdownContext() {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('Dropdown compound components must be used within Dropdown')
  }
  return context
}

export interface DropdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Trigger element and dropdown content (compound pattern) */
  children?: React.ReactNode
  /** Menu items (data-driven pattern) */
  items?: DropdownMenuItemType[]
  /** Trigger mode(s) for dropdown */
  trigger?: DropdownTriggerType[]
  position?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean, info?: { source: 'trigger' | 'menu' }) => void
  /** Disable the dropdown */
  disabled?: boolean
  /** Show arrow pointing to trigger */
  arrow?: boolean | { pointAtCenter?: boolean }
  /** Delay before showing dropdown on hover (seconds) */
  mouseEnterDelay?: number
  /** Delay before hiding dropdown on mouse leave (seconds) */
  mouseLeaveDelay?: number
  /** Container for the dropdown menu */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  /** Destroy dropdown when hidden */
  destroyOnHidden?: boolean
  /** Customize popup content */
  popupRender?: (menu: React.ReactNode) => React.ReactNode
  /** Test ID prefix for child elements */
  'data-testid'?: string
}

export interface DropdownTriggerProps {
  children: React.ReactNode
  className?: string
}

export interface DropdownMenuProps {
  children?: React.ReactNode
  className?: string
}

export interface DropdownItemProps {
  children?: React.ReactNode
  /** Icon to display before label */
  icon?: React.ReactNode
  /** Item label (alternative to children) */
  label?: React.ReactNode
  onClick?: () => void
  active?: boolean
  disabled?: boolean
  danger?: boolean
  className?: string
  /** @internal */
  _index?: number
  /** @internal */
  _key?: string
}

export interface DropdownSubMenuProps {
  children: React.ReactNode
  /** Submenu title/label */
  title: React.ReactNode
  /** Icon to display before title */
  icon?: React.ReactNode
  disabled?: boolean
  className?: string
  /** @internal */
  _key?: string
}

export interface DropdownDividerProps {
  className?: string
}

const DropdownRoot = forwardRef<HTMLDivElement, DropdownProps>(function DropdownRoot(
  {
    children,
    items,
    trigger = ['click'],
    position = 'bottom',
    align = 'start',
    open: controlledOpen,
    onOpenChange,
    disabled = false,
    arrow = false,
    mouseEnterDelay = 0.15,
    mouseLeaveDelay = 0.1,
    getPopupContainer,
    destroyOnHidden = false,
    popupRender,
    'data-testid': testId,
    className = '',
    ...rest
  },
  ref
) {
  const menuId = useId()
  const triggerId = useId()
  const [internalOpen, setInternalOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [itemCount, setItemCount] = useState(0)
  const [shouldRender, setShouldRender] = useState(!destroyOnHidden)
  const itemRefs = useRef<Map<number, { ref: HTMLElement | null; disabled: boolean }>>(new Map())
  const dropdownRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const triggers = trigger

  // Forward ref
  useImperativeHandle(ref, () => dropdownRef.current!, [])

  // Helper for test IDs
  const getTestId = (suffix: string) => (testId ? `${testId}-${suffix}` : undefined)

  // Use controlled or uncontrolled open state
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen

  const setIsOpen = useCallback((open: boolean, source: 'trigger' | 'menu' = 'trigger') => {
    if (disabled) return
    if (!isControlled) {
      setInternalOpen(open)
    }
    if (open) {
      setShouldRender(true)
    }
    onOpenChange?.(open, { source })
  }, [disabled, isControlled, onOpenChange])

  const closeDropdown = useCallback(() => {
    setIsOpen(false, 'menu')
    setFocusedIndex(-1)
    document.getElementById(triggerId)?.focus()
  }, [setIsOpen, triggerId])

  const registerItem = useCallback((index: number, ref: HTMLElement | null, itemDisabled: boolean) => {
    if (ref) {
      itemRefs.current.set(index, { ref, disabled: itemDisabled })
    } else {
      itemRefs.current.delete(index)
    }
  }, [])

  // Handle destroyOnHidden
  useEffect(() => {
    if (destroyOnHidden && !isOpen) {
      const timeout = setTimeout(() => setShouldRender(false), 300)
      return () => clearTimeout(timeout)
    }
  }, [isOpen, destroyOnHidden])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false, 'trigger')
        setFocusedIndex(-1)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  // Hover handlers with delay
  const handleMouseEnter = useCallback(() => {
    if (!triggers.includes('hover')) return
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(true, 'trigger')
    }, mouseEnterDelay * 1000)
  }, [triggers, mouseEnterDelay, setIsOpen])

  const handleMouseLeave = useCallback(() => {
    if (!triggers.includes('hover')) return
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false, 'trigger')
      setFocusedIndex(-1)
    }, mouseLeaveDelay * 1000)
  }, [triggers, mouseLeaveDelay, setIsOpen])

  // Context menu handler
  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    if (!triggers.includes('contextMenu')) return
    event.preventDefault()
    setIsOpen(true, 'trigger')
  }, [triggers, setIsOpen])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const positionClasses: Record<string, string> = {
    top: dDropdownTop,
    bottom: dDropdownBottom,
    left: dDropdownLeft,
    right: dDropdownRight,
  }

  const alignClasses: Record<string, string> = {
    start: '',
    center: dDropdownCenter,
    end: dDropdownEnd,
  }

  const showArrow = typeof arrow === 'boolean' ? arrow : !!arrow

  const dropdownClasses = [
    dDropdown,
    positionClasses[position],
    alignClasses[align],
    triggers.includes('hover') && dDropdownHover,
    isOpen && dDropdownOpen,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Render items from data-driven prop
  const renderItems = () => {
    if (!items) return null
    return items.map((item, index) => {
      if ('type' in item && item.type === 'divider') {
        return <DropdownDivider key={item.key || `divider-${index}`} />
      }
      const menuItem = item as DropdownMenuItem
      if (menuItem.children && menuItem.children.length > 0) {
        return (
          <DropdownSubMenu
            key={menuItem.key}
            title={menuItem.label}
            icon={menuItem.icon}
            disabled={menuItem.disabled}
          >
            {menuItem.children.map((child) => (
              <DropdownItem
                key={child.key}
                icon={child.icon}
                disabled={child.disabled}
                danger={child.danger}
                onClick={child.onClick}
              >
                {child.label}
              </DropdownItem>
            ))}
          </DropdownSubMenu>
        )
      }
      return (
        <DropdownItem
          key={menuItem.key}
          icon={menuItem.icon}
          disabled={menuItem.disabled}
          danger={menuItem.danger}
          onClick={menuItem.onClick}
        >
          {menuItem.label}
        </DropdownItem>
      )
    })
  }

  // Determine content - either compound children or items-generated menu
  const menuContent = items ? (
    (shouldRender || !destroyOnHidden) && (
      <DropdownMenu>{renderItems()}</DropdownMenu>
    )
  ) : null

  const content = items ? (
    <>
      {React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === DropdownTrigger
      )}
      {popupRender ? popupRender(menuContent) : menuContent}
    </>
  ) : (
    children
  )

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
        arrow: showArrow,
        closeDropdown,
        getTestId,
      }}
    >
      <div
        ref={dropdownRef}
        className={dropdownClasses}
        data-state={isOpen ? 'open' : 'closed'}
        data-testid={testId}
        aria-disabled={disabled || undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onContextMenu={handleContextMenu}
        {...rest}
      >
        {content}
      </div>
    </DropdownContext.Provider>
  )
})

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

  // Clone the child element to add event handlers and ARIA attributes
  const child = React.Children.only(children) as React.ReactElement<
    React.HTMLAttributes<HTMLElement> & {
      onClick?: (e: React.MouseEvent) => void
      onKeyDown?: (e: React.KeyboardEvent) => void
      className?: string
    }
  >

  const childProps = child.props

  return React.cloneElement(child, {
    id: triggerId,
    tabIndex: disabled ? -1 : 0,
    'aria-haspopup': 'menu' as const,
    'aria-expanded': isOpen,
    'aria-controls': menuId,
    onClick: (e: React.MouseEvent) => {
      handleClick()
      childProps.onClick?.(e)
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      handleKeyDown(e)
      childProps.onKeyDown?.(e)
    },
    className: `${childProps.className || ''} ${className}`.trim(),
  })
}

function DropdownMenu({ children, className = '' }: DropdownMenuProps) {
  const { menuId, triggerId, isOpen, setIsOpen, focusedIndex, setFocusedIndex, setItemCount, arrow, position, getTestId } = useDropdownContext()
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
    dDropdownContent,
    dMenu,
    'bg-base-100',
    'rounded-box',
    'z-50',
    'shadow',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Clone children to pass index and extract key
  const childrenWithIndex = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const childKey = child.key != null ? String(child.key) : undefined
      if (child.type === DropdownItem) {
        return React.cloneElement(child as React.ReactElement<any>, { _index: index, _key: childKey })
      }
      if (child.type === DropdownSubMenu) {
        return React.cloneElement(child as React.ReactElement<any>, { _key: childKey })
      }
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
      data-testid={getTestId('menu')}
      onKeyDown={handleKeyDown}
    >
      {arrowElement}
      {childrenWithIndex}
    </ul>
  )
}

function DropdownItem({
  children,
  icon,
  label,
  onClick,
  active = false,
  disabled = false,
  danger = false,
  className = '',
  _key,
}: DropdownItemProps) {
  const { closeDropdown, getTestId } = useDropdownContext()
  const itemClasses = [active && 'active', disabled && 'disabled', className].filter(Boolean).join(' ')

  const handleClick = () => {
    if (!disabled) {
      onClick?.()
      closeDropdown()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
      event.preventDefault()
      handleClick()
    }
  }

  const content = label || children

  return (
    <li className={itemClasses} role="none" data-key={_key} data-testid={_key ? getTestId(`item-${_key}`) : undefined}>
      <a
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        className={danger ? 'text-error' : ''}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
        {content}
      </a>
    </li>
  )
}

function DropdownSubMenu({
  children,
  title,
  icon,
  disabled = false,
  className = '',
  _key,
}: DropdownSubMenuProps) {
  const [isSubOpen, setIsSubOpen] = useState(false)
  const subMenuRef = useRef<HTMLLIElement>(null)
  const summaryRef = useRef<HTMLElement>(null)
  const subMenuListRef = useRef<HTMLUListElement>(null)
  const subMenuId = useId()

  const handleMouseEnter = () => {
    if (!disabled) setIsSubOpen(true)
  }

  const handleMouseLeave = () => {
    setIsSubOpen(false)
  }

  // Focus first item in submenu
  const focusFirstItem = () => {
    setTimeout(() => {
      const firstItem = subMenuListRef.current?.querySelector('[role="menuitem"]:not([aria-disabled="true"])') as HTMLElement
      firstItem?.focus()
    }, 0)
  }

  // Keyboard handler for summary (submenu trigger)
  const handleSummaryKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return

    switch (event.key) {
      case 'ArrowRight':
      case 'Enter':
      case ' ':
        event.preventDefault()
        event.stopPropagation()
        setIsSubOpen(true)
        focusFirstItem()
        break
      case 'ArrowLeft':
      case 'Escape':
        event.preventDefault()
        event.stopPropagation()
        setIsSubOpen(false)
        break
    }
  }

  // Keyboard handler for submenu items
  const handleSubMenuKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
      case 'Escape':
        event.preventDefault()
        event.stopPropagation()
        setIsSubOpen(false)
        summaryRef.current?.focus()
        break
      case 'ArrowDown':
        event.preventDefault()
        event.stopPropagation()
        const items = subMenuListRef.current?.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])')
        if (items) {
          const currentIndex = Array.from(items).findIndex(item => item === document.activeElement)
          const nextIndex = (currentIndex + 1) % items.length
          ;(items[nextIndex] as HTMLElement)?.focus()
        }
        break
      case 'ArrowUp':
        event.preventDefault()
        event.stopPropagation()
        const itemsUp = subMenuListRef.current?.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])')
        if (itemsUp) {
          const currentIndexUp = Array.from(itemsUp).findIndex(item => item === document.activeElement)
          const prevIndex = (currentIndexUp - 1 + itemsUp.length) % itemsUp.length
          ;(itemsUp[prevIndex] as HTMLElement)?.focus()
        }
        break
    }
  }

  const itemClasses = [disabled && 'disabled', className].filter(Boolean).join(' ')

  return (
    <li
      ref={subMenuRef}
      className={itemClasses}
      role="none"
      data-key={_key}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <details open={isSubOpen}>
        <summary
          ref={summaryRef}
          role="menuitem"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled || undefined}
          aria-haspopup="menu"
          aria-expanded={isSubOpen}
          aria-controls={subMenuId}
          onKeyDown={handleSummaryKeyDown}
        >
          {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
          {title}
        </summary>
        <ul
          ref={subMenuListRef}
          id={subMenuId}
          className={`${dMenu} bg-base-100 rounded-box z-50 shadow`}
          role="menu"
          aria-label={typeof title === 'string' ? title : undefined}
          onKeyDown={handleSubMenuKeyDown}
        >
          {children}
        </ul>
      </details>
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
  SubMenu: DropdownSubMenu,
  Divider: DropdownDivider,
})
