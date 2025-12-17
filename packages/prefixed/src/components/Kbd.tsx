import React from 'react'

export type KbdSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /** Size of the kbd */
  size?: KbdSize
  /** Key content */
  children?: React.ReactNode
}

const sizeClasses: Record<KbdSize, string> = {
  xs: 'd-kbd-xs',
  sm: 'd-kbd-sm',
  md: 'd-kbd-md',
  lg: 'd-kbd-lg',
  xl: 'd-kbd-xl',
}

export const Kbd: React.FC<KbdProps> = ({
  size,
  children,
  className = '',
  ...rest
}) => {
  const classes = ['d-kbd', size ? sizeClasses[size] : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <kbd className={classes} {...rest}>
      {children}
    </kbd>
  )
}
