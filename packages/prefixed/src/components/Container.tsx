import React from 'react'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Container content */
  children: React.ReactNode
  /** Max width size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  /** Center container horizontally */
  centered?: boolean
  /** Add horizontal padding */
  padding?: boolean
}

const sizeClasses: Record<string, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'xl',
  centered = true,
  padding = true,
  className = '',
  ...rest
}) => {
  const classes = [
    sizeClasses[size],
    centered && 'mx-auto',
    padding && 'px-4 sm:px-6 lg:px-8',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes} {...rest}>{children}</div>
}
