import React from 'react'

// DaisyUI classes
const dAlert = 'alert'
const dAlertInfo = 'alert-info'
const dAlertSuccess = 'alert-success'
const dAlertWarning = 'alert-warning'
const dAlertError = 'alert-error'
const dAlertOutline = 'alert-outline'
const dAlertDash = 'alert-dash'
const dAlertSoft = 'alert-soft'
const dAlertVertical = 'alert-vertical'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  type?: 'info' | 'success' | 'warning' | 'error'
  outline?: boolean
  dash?: boolean
  soft?: boolean
  vertical?: boolean
  /** Test ID for testing */
  'data-testid'?: string
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
    info: dAlertInfo,
    success: dAlertSuccess,
    warning: dAlertWarning,
    error: dAlertError,
  }

  const classes = [
    dAlert,
    type && typeClasses[type],
    outline && dAlertOutline,
    dash && dAlertDash,
    soft && dAlertSoft,
    vertical && dAlertVertical,
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
