import React from 'react'

export interface MenuProps {
  children: React.ReactNode
  className?: string
}

export interface MenuItemProps {
  children: React.ReactNode
  onClick?: () => void
  active?: boolean
  className?: string
}

export interface MenuTitleProps {
  children: React.ReactNode
  className?: string
}

function MenuRoot({ children, className = '' }: MenuProps) {
  const menuClasses = ['menu', className].filter(Boolean).join(' ')

  return <ul className={menuClasses}>{children}</ul>
}

function MenuItem({ children, onClick, active = false, className = '' }: MenuItemProps) {
  return (
    <li className={className}>
      <a className={active ? 'active' : ''} onClick={onClick}>
        {children}
      </a>
    </li>
  )
}

function MenuTitle({ children, className = '' }: MenuTitleProps) {
  const titleClasses = ['menu-title', className].filter(Boolean).join(' ')

  return <li className={titleClasses}>{children}</li>
}

export const Menu = Object.assign(MenuRoot, {
  Item: MenuItem,
  Title: MenuTitle,
})
