import React from 'react'

export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  overlay?: boolean
  contentClassName?: string
}

export function Hero({
  children,
  overlay = false,
  contentClassName = '',
  className = '',
  ...rest
}: HeroProps) {
  const heroClasses = ['d-hero', className].filter(Boolean).join(' ')
  const contentClasses = ['d-hero-content', contentClassName].filter(Boolean).join(' ')

  return (
    <div className={heroClasses} {...rest}>
      {overlay && <div className="d-hero-overlay bg-opacity-60" />}
      <div className={contentClasses}>{children}</div>
    </div>
  )
}

Hero.displayName = 'Hero'

export default Hero
