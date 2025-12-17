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
    info: 'd-alert-info',
    success: 'd-alert-success',
    warning: 'd-alert-warning',
    error: 'd-alert-error',
  }

  const classes = [
    'd-alert',
    type && typeClasses[type],
    outline && 'd-alert-outline',
    dash && 'd-alert-dash',
    soft && 'd-alert-soft',
    vertical && 'd-alert-vertical',
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
