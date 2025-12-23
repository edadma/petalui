import React from 'react'

// DaisyUI classes
const dNavbar = 'navbar'
const dNavbarStart = 'navbar-start'
const dNavbarCenter = 'navbar-center'
const dNavbarEnd = 'navbar-end'

export type NavbarColor = 'base' | 'neutral' | 'primary' | 'secondary' | 'accent'
export type NavbarShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl'
export type NavbarRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface NavbarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  children?: React.ReactNode
  /** Content for the start section of the navbar (typically logo/brand) */
  start?: React.ReactNode
  /** Content for the center section of the navbar */
  center?: React.ReactNode
  /** Content for the end section of the navbar (typically actions/menu) */
  end?: React.ReactNode
  /** Background color variant */
  color?: NavbarColor
  /** Make navbar sticky at the top */
  sticky?: boolean
  /** Shadow depth */
  shadow?: NavbarShadow
  /** Border radius */
  rounded?: NavbarRounded
  /** Test ID for testing */
  'data-testid'?: string
}

const colorClasses: Record<NavbarColor, string> = {
  base: 'bg-base-100',
  neutral: 'bg-neutral text-neutral-content',
  primary: 'bg-primary text-primary-content',
  secondary: 'bg-secondary text-secondary-content',
  accent: 'bg-accent text-accent-content',
}

const shadowClasses: Record<NavbarShadow, string> = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
}

const roundedClasses: Record<NavbarRounded, string> = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
}

export const Navbar: React.FC<NavbarProps> = ({
  children,
  start,
  center,
  end,
  color = 'base',
  sticky = false,
  shadow = 'none',
  rounded = 'none',
  className = '',
  ...rest
}) => {
  const navbarClasses = [
    dNavbar,
    colorClasses[color],
    sticky && 'sticky top-0 z-50',
    shadowClasses[shadow],
    roundedClasses[rounded],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (children) {
    return <nav className={navbarClasses} {...rest}>{children}</nav>
  }

  return (
    <nav className={navbarClasses} {...rest}>
      {start && <div className={dNavbarStart}>{start}</div>}
      {center && <div className={dNavbarCenter}>{center}</div>}
      {end && <div className={dNavbarEnd}>{end}</div>}
    </nav>
  )
}
