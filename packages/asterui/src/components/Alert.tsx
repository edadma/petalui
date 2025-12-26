import React, { useState } from 'react'

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

export interface ClosableType {
  onClose?: () => void
  closeIcon?: React.ReactNode
  afterClose?: () => void
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  type?: 'info' | 'success' | 'warning' | 'error'
  outline?: boolean
  dash?: boolean
  soft?: boolean
  vertical?: boolean
  closable?: boolean | ClosableType
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
  closable = false,
  ...rest
}) => {
  const [visible, setVisible] = useState(true)

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

  // Determine close config from props
  const isClosable = closable !== false
  const closableConfig = typeof closable === 'object' ? closable : {}
  const handleClose = closableConfig.onClose
  const afterClose = closableConfig.afterClose
  const closeIcon = closableConfig.closeIcon

  const handleCloseClick = () => {
    if (handleClose) {
      handleClose()
    }
    setVisible(false)
    if (afterClose) {
      afterClose()
    }
  }

  if (!visible) {
    return null
  }

  return (
    <div role="alert" className={classes} {...rest}>
      {children}
      {isClosable && (
        <button
          type="button"
          className="btn btn-sm btn-circle ml-auto opacity-70 hover:opacity-100"
          onClick={handleCloseClick}
          aria-label="Close"
        >
          {closeIcon || '✕'}
        </button>
      )}
    </div>
  )
}
