import React, { createContext, useContext, useState, useCallback, useId } from 'react'

export type MenuMode = 'vertical' | 'horizontal' | 'inline'

export interface MenuProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'> {
  children: React.ReactNode
  mode?: MenuMode
  selectedKeys?: string[]
  defaultSelectedKeys?: string[]
  openKeys?: string[]
  defaultOpenKeys?: string[]
  onSelect?: (key: string) => void
  onOpenChange?: (openKeys: string[]) => void
}

export interface MenuItemProps extends Omit<React.HTMLAttributes<HTMLAnchorElement>, 'onClick'> {
  children: React.ReactNode
  itemKey?: string
  icon?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
  /** @deprecated Use itemKey and selectedKeys instead */
  active?: boolean
}

export interface MenuSubMenuProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
  itemKey: string
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export interface MenuTitleProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
}

export interface MenuDividerProps extends React.HTMLAttributes<HTMLLIElement> {}

interface MenuContextValue {
  mode: MenuMode
  selectedKeys: string[]
  openKeys: string[]
  onSelect: (key: string) => void
  onToggleOpen: (key: string) => void
}

const MenuContext = createContext<MenuContextValue | null>(null)

function useMenuContext() {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('Menu components must be used within a Menu')
  }
  return context
}

function MenuRoot({
  children,
  mode = 'vertical',
  selectedKeys: controlledSelectedKeys,
  defaultSelectedKeys = [],
  openKeys: controlledOpenKeys,
  defaultOpenKeys = [],
  onSelect,
  onOpenChange,
  className = '',
  ...rest
}: MenuProps) {
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(defaultSelectedKeys)
  const [internalOpenKeys, setInternalOpenKeys] = useState<string[]>(defaultOpenKeys)

  const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys
  const openKeys = controlledOpenKeys ?? internalOpenKeys

  const handleSelect = useCallback(
    (key: string) => {
      if (controlledSelectedKeys === undefined) {
        setInternalSelectedKeys([key])
      }
      onSelect?.(key)
    },
    [controlledSelectedKeys, onSelect]
  )

  const handleToggleOpen = useCallback(
    (key: string) => {
      const newOpenKeys = openKeys.includes(key)
        ? openKeys.filter((k) => k !== key)
        : [...openKeys, key]

      if (controlledOpenKeys === undefined) {
        setInternalOpenKeys(newOpenKeys)
      }
      onOpenChange?.(newOpenKeys)
    },
    [openKeys, controlledOpenKeys, onOpenChange]
  )

  const modeClasses: Record<MenuMode, string> = {
    vertical: '',
    horizontal: 'menu-horizontal',
    inline: '',
  }

  const menuClasses = ['menu', modeClasses[mode], className].filter(Boolean).join(' ')

  return (
    <MenuContext.Provider
      value={{
        mode,
        selectedKeys,
        openKeys,
        onSelect: handleSelect,
        onToggleOpen: handleToggleOpen,
      }}
    >
      <ul className={menuClasses} {...rest}>{children}</ul>
    </MenuContext.Provider>
  )
}

function MenuItem({
  children,
  itemKey,
  icon,
  disabled = false,
  onClick,
  active,
  className = '',
  ...rest
}: MenuItemProps) {
  const context = useContext(MenuContext)

  // Support both old active prop and new key-based selection
  const isSelected = itemKey && context ? context.selectedKeys.includes(itemKey) : active

  const handleClick = () => {
    if (disabled) return
    if (itemKey && context) {
      context.onSelect(itemKey)
    }
    onClick?.()
  }

  const itemClasses = [
    isSelected && 'active bg-primary text-primary-content',
    disabled && 'disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <li>
      <a
        className={itemClasses}
        onClick={handleClick}
        aria-disabled={disabled}
        role="menuitem"
        data-state={isSelected ? 'active' : 'inactive'}
        {...rest}
      >
        {icon && <span className="menu-icon">{icon}</span>}
        {children}
      </a>
    </li>
  )
}

function MenuSubMenu({
  children,
  itemKey,
  label,
  icon,
  disabled = false,
  className = '',
  ...rest
}: MenuSubMenuProps) {
  const context = useMenuContext()
  const isOpen = context.openKeys.includes(itemKey)
  const submenuId = useId()

  const handleToggle = () => {
    if (disabled) return
    context.onToggleOpen(itemKey)
  }

  const submenuClasses = [disabled && 'disabled', className].filter(Boolean).join(' ')

  // For inline mode, use collapsible details/summary
  if (context.mode === 'inline') {
    return (
      <li className={submenuClasses} data-state={isOpen ? 'open' : 'closed'} {...rest}>
        <details open={isOpen}>
          <summary
            onClick={(e) => {
              e.preventDefault()
              handleToggle()
            }}
            aria-expanded={isOpen}
            aria-controls={submenuId}
            aria-disabled={disabled}
          >
            {icon && <span className="menu-icon">{icon}</span>}
            {label}
          </summary>
          <ul id={submenuId} role="menu">
            {children}
          </ul>
        </details>
      </li>
    )
  }

  // For vertical/horizontal, use nested menu (dropdown style)
  return (
    <li className={submenuClasses} data-state={isOpen ? 'open' : 'closed'} {...rest}>
      <details open={isOpen}>
        <summary
          onClick={(e) => {
            e.preventDefault()
            handleToggle()
          }}
          aria-expanded={isOpen}
          aria-controls={submenuId}
          aria-disabled={disabled}
        >
          {icon && <span className="menu-icon">{icon}</span>}
          {label}
        </summary>
        <ul id={submenuId} role="menu">
          {children}
        </ul>
      </details>
    </li>
  )
}

function MenuTitle({ children, className = '', ...rest }: MenuTitleProps) {
  const titleClasses = ['menu-title', className].filter(Boolean).join(' ')

  return <li className={titleClasses} {...rest}>{children}</li>
}

function MenuDivider({ className = '', ...rest }: MenuDividerProps) {
  const dividerClasses = ['border-t border-base-300 my-1', className].filter(Boolean).join(' ')

  return <li className={dividerClasses} role="separator" {...rest} />
}

export const Menu = Object.assign(MenuRoot, {
  Item: MenuItem,
  SubMenu: MenuSubMenu,
  Title: MenuTitle,
  Divider: MenuDivider,
})
