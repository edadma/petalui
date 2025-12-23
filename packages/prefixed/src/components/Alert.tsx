import React from 'react'

// DaisyUI classes
const dAlert = 'd-alert'
const dAlertInfo = 'd-alert-info'
const dAlertSuccess = 'd-alert-success'
const dAlertWarning = 'd-alert-warning'
const dAlertError = 'd-alert-error'
const dAlertOutline = 'd-alert-outline'
const dAlertDash = 'd-alert-dash'
const dAlertSoft = 'd-alert-soft'
const dAlertVertical = 'd-alert-vertical'

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
