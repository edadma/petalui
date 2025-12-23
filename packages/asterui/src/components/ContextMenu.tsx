import React, { useState, useRef, useEffect, useCallback, createContext, useContext } from 'react'
import { createPortal } from 'react-dom'
import { useConfig } from '../providers/ConfigProvider'

// DaisyUI classes
const dMenu = 'menu'
const dDivider = 'divider'

export interface ContextMenuItem {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
  danger?: boolean
  divider?: boolean
  children?: ContextMenuItem[]
}

export interface ContextMenuProps {
  /** Element that triggers the context menu on right-click */
  children: React.ReactNode
  /** Menu items (data-driven pattern) */
  items?: ContextMenuItem[]
  /** Callback when an item is selected */
  onSelect?: (key: string) => void
  /** Whether the context menu is disabled */
  disabled?: boolean
  /** Additional CSS classes for the menu */
  className?: string
}

export interface ContextMenuItemProps {
  /** Item content */
  children: React.ReactNode
  /** Icon to display before label */
  icon?: React.ReactNode
  /** Whether the item is disabled */
  disabled?: boolean
  /** Show as danger/destructive action */
  danger?: boolean
  /** Additional CSS classes */
  className?: string
  /** @internal */
  _key?: string
}

export interface ContextMenuDividerProps {
  /** Additional CSS classes */
  className?: string
}

export interface ContextMenuSubMenuProps {
  /** Submenu label */
  label: React.ReactNode
  /** Icon to display before label */
  icon?: React.ReactNode
  /** Whether the submenu is disabled */
  disabled?: boolean
  /** Submenu items */
  children: React.ReactNode
  /** Additional CSS classes */
  className?: string
  /** @internal */
  _key?: string
}

interface ContextMenuContextValue {
  onSelect: (key: string) => void
  onClose: () => void
}

interface MenuPosition {
  x: number
  y: number
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null)

const useContextMenuContext = () => {
  const context = useContext(ContextMenuContext)
  if (!context) {
    throw new Error('ContextMenu compound components must be used within a ContextMenu')
  }
  return context
}

// Compound pattern components
const ContextMenuItemComponent: React.FC<ContextMenuItemProps> = ({
  children,
  icon,
  disabled = false,
  danger = false,
  className = '',
  _key,
}) => {
  const { onSelect, onClose } = useContextMenuContext()

  const handleClick = () => {
    if (disabled || !_key) return
    onSelect(_key)
    onClose()
  }

  return (
    <li className={className} role="none">
      <button
        onClick={handleClick}
        disabled={disabled}
        role="menuitem"
        aria-disabled={disabled}
        className={`
          flex items-center gap-2 w-full px-4 py-2 text-left text-sm
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-base-200'}
          ${danger ? 'text-error hover:bg-error/10' : ''}
        `}
      >
        {icon && <span className="w-4 h-4" aria-hidden="true">{icon}</span>}
        <span className="flex-1">{children}</span>
      </button>
    </li>
  )
}

const ContextMenuDividerComponent: React.FC<ContextMenuDividerProps> = ({ className = '' }) => {
  return <li className={`${dDivider} my-1 ${className}`} role="separator"></li>
}

const ContextMenuSubMenuComponent: React.FC<ContextMenuSubMenuProps> = ({
  label,
  icon,
  disabled = false,
  children,
  className = '',
  _key: _unusedKey,
}) => {
  const [showSubmenu, setShowSubmenu] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (disabled) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setShowSubmenu(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShowSubmenu(false), 100)
  }

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      role="none"
    >
      <button
        disabled={disabled}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={showSubmenu}
        aria-disabled={disabled}
        className={`
          flex items-center gap-2 w-full px-4 py-2 text-left text-sm
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-base-200'}
        `}
      >
        {icon && <span className="w-4 h-4" aria-hidden="true">{icon}</span>}
        <span className="flex-1">{label}</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {showSubmenu && (
        <ul
          className={`${dMenu} bg-base-100 rounded-box shadow-lg border border-base-300 absolute left-full top-0 min-w-[160px] z-50 p-1`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role="menu"
        >
          {children}
        </ul>
      )}
    </li>
  )
}

// Data-driven pattern internal component
const MenuItem: React.FC<{
  item: ContextMenuItem
  onSelect: (key: string) => void
  onClose: () => void
}> = ({ item, onSelect, onClose }) => {
  const [showSubmenu, setShowSubmenu] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  if (item.divider) {
    return <li className={`${dDivider} my-1`} role="separator"></li>
  }

  const handleClick = () => {
    if (item.disabled) return
    if (item.children && item.children.length > 0) return
    onSelect(item.key)
    onClose()
  }

  const hasSubmenu = item.children && item.children.length > 0

  const handleMouseEnter = () => {
    if (!hasSubmenu) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setShowSubmenu(true)
  }

  const handleMouseLeave = () => {
    if (!hasSubmenu) return
    timeoutRef.current = setTimeout(() => setShowSubmenu(false), 100)
  }

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
      role="none"
    >
      <button
        onClick={handleClick}
        disabled={item.disabled}
        role="menuitem"
        aria-haspopup={hasSubmenu ? 'menu' : undefined}
        aria-expanded={hasSubmenu ? showSubmenu : undefined}
        aria-disabled={item.disabled}
        className={`
          flex items-center gap-2 w-full px-4 py-2 text-left text-sm
          ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-base-200'}
          ${item.danger ? 'text-error hover:bg-error/10' : ''}
        `}
      >
        {item.icon && <span className="w-4 h-4" aria-hidden="true">{item.icon}</span>}
        <span className="flex-1">{item.label}</span>
        {hasSubmenu && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>
      {hasSubmenu && showSubmenu && (
        <ul
          className={`${dMenu} bg-base-100 rounded-box shadow-lg border border-base-300 absolute left-full top-0 min-w-[160px] z-50 p-1`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role="menu"
        >
          {item.children!.map((child) => (
            <MenuItem key={child.key} item={child} onSelect={onSelect} onClose={onClose} />
          ))}
        </ul>
      )}
    </li>
  )
}

const ContextMenuRoot: React.FC<ContextMenuProps> = ({
  children,
  items,
  onSelect,
  disabled = false,
  className = '',
}) => {
  const { getPopupContainer } = useConfig()
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState<MenuPosition>({ x: 0, y: 0 })
  const menuRef = useRef<HTMLUListElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return
      e.preventDefault()
      e.stopPropagation()

      // Calculate position, ensuring menu stays within viewport
      let x = e.clientX
      let y = e.clientY

      // We'll adjust after render when we know menu dimensions
      setPosition({ x, y })
      setVisible(true)
    },
    [disabled]
  )

  const handleClose = useCallback(() => {
    setVisible(false)
  }, [])

  const handleSelect = useCallback(
    (key: string) => {
      onSelect?.(key)
    },
    [onSelect]
  )

  // Adjust position after menu renders to keep it in viewport
  useEffect(() => {
    if (visible && menuRef.current) {
      const menu = menuRef.current
      const rect = menu.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let { x, y } = position

      if (x + rect.width > viewportWidth) {
        x = viewportWidth - rect.width - 8
      }
      if (y + rect.height > viewportHeight) {
        y = viewportHeight - rect.height - 8
      }

      if (x !== position.x || y !== position.y) {
        setPosition({ x, y })
      }
    }
  }, [visible, position])

  // Close on click outside or escape
  useEffect(() => {
    if (!visible) return

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        handleClose()
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    const handleScroll = () => {
      handleClose()
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    document.addEventListener('scroll', handleScroll, true)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('scroll', handleScroll, true)
    }
  }, [visible, handleClose])

  // Clone children to extract keys
  const cloneChildrenWithKeys = (children: React.ReactNode): React.ReactNode => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const childKey = child.key != null ? String(child.key) : undefined
        if (child.type === ContextMenuItemComponent || child.type === ContextMenuSubMenuComponent) {
          return React.cloneElement(child as React.ReactElement<any>, { _key: childKey })
        }
      }
      return child
    })
  }

  // Determine if using data-driven or compound pattern
  // Find menu content children (not the trigger element)
  const childArray = React.Children.toArray(children)
  const triggerChild = childArray[0]
  const menuChildren = cloneChildrenWithKeys(childArray.slice(1))
  const useDataDriven = items && items.length > 0

  const contextValue: ContextMenuContextValue = {
    onSelect: handleSelect,
    onClose: handleClose,
  }

  return (
    <>
      <div ref={triggerRef} onContextMenu={handleContextMenu} className="inline-block">
        {triggerChild}
      </div>
      {visible &&
        createPortal(
          <ContextMenuContext.Provider value={contextValue}>
            <ul
              ref={menuRef}
              className={`${dMenu} bg-base-100 rounded-box shadow-lg border border-base-300 min-w-[160px] p-1 fixed z-[9999] ${className}`}
              style={{ left: position.x, top: position.y }}
              role="menu"
              aria-label="Context menu"
            >
              {useDataDriven
                ? items!.map((item) => (
                    <MenuItem key={item.key} item={item} onSelect={handleSelect} onClose={handleClose} />
                  ))
                : menuChildren}
            </ul>
          </ContextMenuContext.Provider>,
          getPopupContainer ? getPopupContainer(document.body) : document.body
        )}
    </>
  )
}

// Assign compound components
export const ContextMenu = Object.assign(ContextMenuRoot, {
  Item: ContextMenuItemComponent,
  Divider: ContextMenuDividerComponent,
  SubMenu: ContextMenuSubMenuComponent,
})
