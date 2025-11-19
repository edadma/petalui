import React from 'react'

export interface BreadcrumbsProps {
  children: React.ReactNode
  className?: string
}

export interface BreadcrumbsItemProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
}

function BreadcrumbsRoot({ children, className = '' }: BreadcrumbsProps) {
  return (
    <div className={`breadcrumbs text-sm ${className}`}>
      <ul>{children}</ul>
    </div>
  )
}

function BreadcrumbsItem({ children, href, onClick, className = '' }: BreadcrumbsItemProps) {
  if (href || onClick) {
    return (
      <li className={className}>
        <a href={href} onClick={onClick}>
          {children}
        </a>
      </li>
    )
  }

  return <li className={className}>{children}</li>
}

export const Breadcrumbs = Object.assign(BreadcrumbsRoot, {
  Item: BreadcrumbsItem,
})
