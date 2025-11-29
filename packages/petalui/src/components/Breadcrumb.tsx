import React from 'react'

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface BreadcrumbItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'onClick'> {
  children: React.ReactNode
  href?: string
  onClick?: () => void
}

function BreadcrumbRoot({ children, className = '', ...rest }: BreadcrumbProps) {
  return (
    <div className={`breadcrumbs text-sm ${className}`} {...rest}>
      <ul>{children}</ul>
    </div>
  )
}

function BreadcrumbItem({ children, href, onClick, className = '', ...rest }: BreadcrumbItemProps) {
  if (href || onClick) {
    return (
      <li className={className} {...rest}>
        <a href={href} onClick={onClick}>
          {children}
        </a>
      </li>
    )
  }

  return <li className={className} {...rest}>{children}</li>
}

export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Item: BreadcrumbItem,
})
