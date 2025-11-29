import React from 'react'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  type?: 'info' | 'success' | 'warning' | 'error'
  outline?: boolean
  dash?: boolean
  soft?: boolean
  vertical?: boolean
}

export const Alert: React.FC<AlertProps> = ({
  children,
  className = '',
  type,
  outline = false,
  dash = false,
  soft = false,
  vertical = false,
  ...rest
}) => {
  const typeClasses = {
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
    error: 'alert-error',
  }

  const classes = [
    'alert',
    type && typeClasses[type],
    outline && 'alert-outline',
    dash && 'alert-dash',
    soft && 'alert-soft',
    vertical && 'alert-vertical',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div role="alert" className={classes} {...rest}>
      {children}
    </div>
  )
}
