import React from 'react'

// DaisyUI classes
const dKbd = 'd-kbd'
const dKbdXs = 'd-kbd-xs'
const dKbdSm = 'd-kbd-sm'
const dKbdMd = 'd-kbd-md'
const dKbdLg = 'd-kbd-lg'
const dKbdXl = 'd-kbd-xl'

export type KbdSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /** Size of the kbd */
  size?: KbdSize
  /** Key content */
  children?: React.ReactNode
  /** Test ID for testing */
  'data-testid'?: string
}

const sizeClasses: Record<KbdSize, string> = {
  xs: dKbdXs,
  sm: dKbdSm,
  md: dKbdMd,
  lg: dKbdLg,
  xl: dKbdXl,
}

export const Kbd: React.FC<KbdProps> = ({
  size,
  children,
  className = '',
  ...rest
}) => {
  const classes = [dKbd, size ? sizeClasses[size] : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <kbd className={classes} {...rest}>
      {children}
    </kbd>
  )
}
