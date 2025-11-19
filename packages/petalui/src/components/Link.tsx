import React, { forwardRef } from 'react'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  hover?: boolean
  className?: string
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, color, hover = false, className = '', ...props }, ref) => {
    const colorClasses = {
      neutral: 'link-neutral',
      primary: 'link-primary',
      secondary: 'link-secondary',
      accent: 'link-accent',
      info: 'link-info',
      success: 'link-success',
      warning: 'link-warning',
      error: 'link-error',
    }

    const classes = ['link', hover && 'link-hover', color && colorClasses[color], className]
      .filter(Boolean)
      .join(' ')

    return (
      <a ref={ref} className={classes} {...props}>
        {children}
      </a>
    )
  }
)

Link.displayName = 'Link'
