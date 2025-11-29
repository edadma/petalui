import React from 'react'

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  center?: boolean
  horizontal?: boolean
  vertical?: boolean
}

export interface FooterTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

function FooterRoot({ children, className = '', center = false, horizontal = false, vertical = false, ...rest }: FooterProps) {
  const classes = [
    'footer',
    center && 'footer-center',
    horizontal && 'footer-horizontal',
    vertical && 'footer-vertical',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <footer className={classes} {...rest}>{children}</footer>
}

function FooterTitle({ children, className = '', ...rest }: FooterTitleProps) {
  return <h6 className={`footer-title ${className}`} {...rest}>{children}</h6>
}

export const Footer = Object.assign(FooterRoot, {
  Title: FooterTitle,
})
