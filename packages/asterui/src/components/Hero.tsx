import React from 'react'

export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface HeroContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface HeroOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

function HeroRoot({
  children,
  className = '',
  ...rest
}: HeroProps) {
  const classes = ['hero', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

function HeroContent({
  children,
  className = '',
  ...rest
}: HeroContentProps) {
  const classes = ['hero-content', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

function HeroOverlay({
  children,
  className = '',
  ...rest
}: HeroOverlayProps) {
  const classes = ['hero-overlay', 'bg-opacity-60', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

export const Hero = Object.assign(HeroRoot, {
  Content: HeroContent,
  Overlay: HeroOverlay,
})
