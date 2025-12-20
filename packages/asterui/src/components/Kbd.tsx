import React from 'react'

// DaisyUI classes
const dKbd = 'kbd'
const dKbdXs = 'kbd-xs'
const dKbdSm = 'kbd-sm'
const dKbdMd = 'kbd-md'
const dKbdLg = 'kbd-lg'
const dKbdXl = 'kbd-xl'

export type KbdSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /** Size of the kbd */
  size?: KbdSize
  /** Key content */
  children?: React.ReactNode
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
