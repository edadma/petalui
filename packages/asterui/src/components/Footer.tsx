import React from 'react'

// DaisyUI classes
const dFooter = 'footer'
const dFooterCenter = 'footer-center'
const dFooterHorizontal = 'footer-horizontal'
const dFooterVertical = 'footer-vertical'
const dFooterTitle = 'footer-title'

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  center?: boolean
  horizontal?: boolean
  vertical?: boolean
  /** Test ID for testing */
  'data-testid'?: string
}

export interface FooterTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

function FooterRoot({ children, className = '', center = false, horizontal = false, vertical = false, ...rest }: FooterProps) {
  const classes = [
    dFooter,
    center && dFooterCenter,
    horizontal && dFooterHorizontal,
    vertical && dFooterVertical,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <footer className={classes} {...rest}>{children}</footer>
}

function FooterTitle({ children, className = '', ...rest }: FooterTitleProps) {
  return <h6 className={`${dFooterTitle} ${className}`} {...rest}>{children}</h6>
}

export const Footer = Object.assign(FooterRoot, {
  Title: FooterTitle,
})
