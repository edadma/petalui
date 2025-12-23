import React from 'react'

// DaisyUI classes
const dHero = 'hero'
const dHeroOverlay = 'hero-overlay'
const dHeroContent = 'hero-content'

export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  overlay?: boolean
  contentClassName?: string
  /** Test ID for testing */
  'data-testid'?: string
}

export function Hero({
  children,
  overlay = false,
  contentClassName = '',
  className = '',
  ...rest
}: HeroProps) {
  const heroClasses = [dHero, className].filter(Boolean).join(' ')
  const contentClasses = [dHeroContent, contentClassName].filter(Boolean).join(' ')

  return (
    <div className={heroClasses} {...rest}>
      {overlay && <div className={`${dHeroOverlay} bg-opacity-60`} />}
      <div className={contentClasses}>{children}</div>
    </div>
  )
}

Hero.displayName = 'Hero'

export default Hero
