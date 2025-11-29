import React, { useEffect, useRef, useId } from 'react'
import { createRoot } from 'react-dom/client'

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDialogElement>, 'title'> {
  children: React.ReactNode
  title?: React.ReactNode
  footer?: React.ReactNode
  open?: boolean
  onOk?: () => void | Promise<void>
  onCancel?: () => void
  okText?: string
  cancelText?: string
  maskClosable?: boolean
  closable?: boolean
  position?: 'top' | 'middle' | 'bottom'
  align?: 'start' | 'end'
}

export interface ModalFuncProps {
  title?: React.ReactNode
  content?: React.ReactNode
  onOk?: () => void | Promise<void>
  onCancel?: () => void
  okText?: string
  cancelText?: string
  type?: 'info' | 'success' | 'warning' | 'error'
}

export function Modal({
  children,
  title,
  footer,
  open = false,
  onOk,
  onCancel,
  okText = 'OK',
  cancelText = 'Cancel',
  maskClosable = true,
  closable = true,
  position,
  align,
  className = '',
  ...rest
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const [loading, setLoading] = React.useState(false)
  const titleId = useId()
  const contentId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      if (!dialog.open) {
        // Save currently focused element for restoration
        previousActiveElement.current = document.activeElement as HTMLElement
        dialog.showModal()
      }
    } else {
      if (dialog.open) {
        dialog.close()
        // Restore focus to previously focused element
        previousActiveElement.current?.focus()
      }
    }
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleClose = () => {
      onCancel?.()
    }

    dialog.addEventListener('close', handleClose)
    return () => {
      dialog.removeEventListener('close', handleClose)
    }
  }, [onCancel])

  const positionClasses = {
    top: 'modal-top',
    middle: 'modal-middle',
    bottom: 'modal-bottom',
  }

  const alignClasses = {
    start: 'modal-start',
    end: 'modal-end',
  }

  const classes = [
    'modal',
    position && positionClasses[position],
    align && alignClasses[align],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const handleOk = async () => {
    if (onOk) {
      setLoading(true)
      try {
        await onOk()
        setLoading(false)
      } catch (error) {
        setLoading(false)
        throw error
      }
    }
  }

  const handleBackdropClick = () => {
    if (maskClosable && onCancel) {
      onCancel()
    }
  }

  // Render default footer if no custom footer provided and either onOk or onCancel exists
  const shouldRenderDefaultFooter = !footer && (onOk || onCancel)
  const shouldRenderCustomFooter = footer !== null && footer !== undefined

  return (
    <dialog
      ref={dialogRef}
      className={classes}
      data-state={open ? 'open' : 'closed'}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={contentId}
      {...rest}
    >
      <div className="modal-box">
        {title && (
          <h3 id={titleId} className="text-lg font-bold mb-4">
            {title}
          </h3>
        )}
        <div id={contentId} className="py-4">
          {children}
        </div>
        {shouldRenderDefaultFooter && (
          <div className="modal-action">
            {onCancel && (
              <button className="btn" onClick={onCancel}>
                {cancelText}
              </button>
            )}
            {onOk && (
              <button
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
                onClick={handleOk}
                disabled={loading}
              >
                {okText}
              </button>
            )}
          </div>
        )}
        {shouldRenderCustomFooter && <div className="modal-action">{footer}</div>}
      </div>
      {closable && maskClosable && (
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleBackdropClick}>close</button>
        </form>
      )}
    </dialog>
  )
}

function createModal(config: ModalFuncProps & { showCancel?: boolean }) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const root = createRoot(div)

  const destroy = () => {
    root.unmount()
    if (div.parentNode) {
      div.parentNode.removeChild(div)
    }
  }

  const ModalContent = () => {
    const [open, setOpen] = React.useState(true)
    const [loading, setLoading] = React.useState(false)

    const handleClose = () => {
      setOpen(false)
      setTimeout(destroy, 300) // Wait for animation
    }

    const handleOk = async () => {
      if (config.onOk) {
        setLoading(true)
        try {
          await config.onOk()
          handleClose()
        } catch (error) {
          setLoading(false)
        }
      } else {
        handleClose()
      }
    }

    const handleCancel = () => {
      config.onCancel?.()
      handleClose()
    }

    const getAlertClass = () => {
      switch (config.type) {
        case 'success':
          return 'alert-success'
        case 'warning':
          return 'alert-warning'
        case 'error':
          return 'alert-error'
        case 'info':
        default:
          return 'alert-info'
      }
    }

    const getIcon = () => {
      switch (config.type) {
        case 'success':
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )
        case 'warning':
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          )
        case 'error':
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )
        case 'info':
        default:
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          )
      }
    }

    return (
      <Modal
        open={open}
        onOk={config.showCancel ? undefined : handleOk}
        onCancel={handleCancel}
        title={
          config.type ? (
            <div className={`alert ${getAlertClass()}`}>
              {getIcon()}
              <div>
                {config.title && <h3 className="font-bold">{config.title}</h3>}
              </div>
            </div>
          ) : (
            config.title
          )
        }
        okText={config.okText}
        cancelText={config.cancelText}
        footer={
          config.showCancel ? (
            <>
              <button className="btn" onClick={handleCancel}>
                {config.cancelText || 'Cancel'}
              </button>
              <button
                className={`btn ${config.type === 'error' ? 'btn-error' : 'btn-primary'} ${loading ? 'loading' : ''}`}
                onClick={handleOk}
                disabled={loading}
              >
                {config.okText || 'OK'}
              </button>
            </>
          ) : (
            <button
              className={`btn ${config.type === 'error' ? 'btn-error' : 'btn-primary'} ${loading ? 'loading' : ''}`}
              onClick={handleOk}
              disabled={loading}
            >
              {config.okText || 'OK'}
            </button>
          )
        }
      >
        {config.type && config.content && <div className="text-sm">{config.content}</div>}
        {!config.type && config.content}
      </Modal>
    )
  }

  root.render(<ModalContent />)

  return {
    destroy,
  }
}

function confirm(config: ModalFuncProps) {
  return createModal({ ...config, showCancel: true })
}

function info(config: ModalFuncProps) {
  return createModal({ ...config, type: 'info', showCancel: false })
}

function success(config: ModalFuncProps) {
  return createModal({ ...config, type: 'success', showCancel: false })
}

function warning(config: ModalFuncProps) {
  return createModal({ ...config, type: 'warning', showCancel: false })
}

function error(config: ModalFuncProps) {
  return createModal({ ...config, type: 'error', showCancel: false })
}

Modal.confirm = confirm
Modal.info = info
Modal.success = success
Modal.warning = warning
Modal.error = error
