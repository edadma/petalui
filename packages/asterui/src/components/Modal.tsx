import React, { useEffect, useRef, useId, forwardRef, useImperativeHandle } from 'react'
import { createRoot } from 'react-dom/client'
import { useConfig } from './ConfigProvider'

// DaisyUI classes
const dModal = 'modal'
const dModalTop = 'modal-top'
const dModalMiddle = 'modal-middle'
const dModalBottom = 'modal-bottom'
const dModalStart = 'modal-start'
const dModalEnd = 'modal-end'
const dModalBox = 'modal-box'
const dModalAction = 'modal-action'
const dModalBackdrop = 'modal-backdrop'
const dBtn = 'btn'
const dBtnPrimary = 'btn-primary'
const dBtnError = 'btn-error'
const dAlert = 'alert'
const dAlertInfo = 'alert-info'
const dAlertSuccess = 'alert-success'
const dAlertWarning = 'alert-warning'
const dAlertError = 'alert-error'

export type ModalPosition = 'top' | 'middle' | 'bottom'
export type ModalAlign = 'start' | 'end'
export type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type ResponsivePosition = Partial<Record<Breakpoint, ModalPosition>>

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
  /** Modal position - can be a single value or responsive object */
  position?: ModalPosition | ResponsivePosition
  align?: ModalAlign
  /** Width of the modal box */
  width?: number | string
  /** Center the modal vertically */
  centered?: boolean
  /** Callback when modal is closed */
  onClose?: () => void
  /** Callback after modal close animation completes */
  afterClose?: () => void
  /** Where to place initial focus: 'ok', 'cancel', or 'close' button */
  initialFocus?: 'ok' | 'cancel' | 'close'
  /** Use alertdialog role for urgent messages */
  alertDialog?: boolean
  /** Show loading spinner on OK button */
  confirmLoading?: boolean
  /** Props for the OK button */
  okButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  /** Props for the Cancel button */
  cancelButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  /** Custom close icon */
  closeIcon?: React.ReactNode
  /** CSS z-index for the modal */
  zIndex?: number
  /** Destroy child components when modal is closed */
  destroyOnClose?: boolean
  /** Test ID prefix for child elements */
  'data-testid'?: string
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

const Modal = forwardRef<HTMLDialogElement, ModalProps>(function Modal(
  {
    children,
    title,
    footer,
    open = false,
    onOk,
    onCancel,
    okText,
    cancelText,
    maskClosable = true,
    closable = true,
    position,
    align,
    width,
    centered,
    onClose,
    afterClose,
    initialFocus,
    alertDialog = false,
    confirmLoading,
    okButtonProps,
    cancelButtonProps,
    closeIcon,
    zIndex,
    destroyOnClose = false,
    'data-testid': testId,
    className = '',
    style,
    ...rest
  },
  ref
) {
  const { locale } = useConfig()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const okButtonRef = useRef<HTMLButtonElement>(null)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const [internalLoading, setInternalLoading] = React.useState(false)
  const [shouldRender, setShouldRender] = React.useState(open || !destroyOnClose)
  const titleId = useId()
  const contentId = useId()

  // Use external confirmLoading if provided, otherwise internal state
  const loading = confirmLoading ?? internalLoading

  // Resolve locale strings
  const resolvedOkText = okText ?? locale.Modal?.okText ?? 'OK'
  const resolvedCancelText = cancelText ?? locale.Modal?.cancelText ?? 'Cancel'

  // Forward ref
  useImperativeHandle(ref, () => dialogRef.current!, [])

  // Handle close - use onClose if provided, otherwise onCancel
  const closeHandler = onClose || onCancel

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      setShouldRender(true)
      if (!dialog.open) {
        // Save currently focused element for restoration
        previousActiveElement.current = document.activeElement as HTMLElement
        dialog.showModal()

        // Handle custom initial focus placement
        if (initialFocus) {
          setTimeout(() => {
            switch (initialFocus) {
              case 'ok':
                okButtonRef.current?.focus()
                break
              case 'cancel':
                cancelButtonRef.current?.focus()
                break
              case 'close':
                closeButtonRef.current?.focus()
                break
            }
          }, 0)
        }
      }
    } else {
      if (dialog.open) {
        dialog.close()
        // Restore focus to previously focused element
        previousActiveElement.current?.focus()
        // Call afterClose after animation
        if (afterClose) {
          setTimeout(afterClose, 300)
        }
        // Handle destroyOnClose
        if (destroyOnClose) {
          setTimeout(() => setShouldRender(false), 300)
        }
      }
    }
  }, [open, initialFocus, afterClose, destroyOnClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const onDialogClose = () => {
      closeHandler?.()
    }

    dialog.addEventListener('close', onDialogClose)
    return () => {
      dialog.removeEventListener('close', onDialogClose)
    }
  }, [closeHandler])

  // Static class mappings for positions (no interpolation per qa.md)
  const positionClasses: Record<ModalPosition, string> = {
    top: dModalTop,
    middle: dModalMiddle,
    bottom: dModalBottom,
  }

  // Responsive position class mappings for each breakpoint
  const responsivePositionClasses: Record<Breakpoint, Record<ModalPosition, string>> = {
    base: {
      top: dModalTop,
      middle: dModalMiddle,
      bottom: dModalBottom,
    },
    sm: {
      top: 'sm:modal-top',
      middle: 'sm:modal-middle',
      bottom: 'sm:modal-bottom',
    },
    md: {
      top: 'md:modal-top',
      middle: 'md:modal-middle',
      bottom: 'md:modal-bottom',
    },
    lg: {
      top: 'lg:modal-top',
      middle: 'lg:modal-middle',
      bottom: 'lg:modal-bottom',
    },
    xl: {
      top: 'xl:modal-top',
      middle: 'xl:modal-middle',
      bottom: 'xl:modal-bottom',
    },
    '2xl': {
      top: '2xl:modal-top',
      middle: '2xl:modal-middle',
      bottom: '2xl:modal-bottom',
    },
  }

  const alignClasses: Record<ModalAlign, string> = {
    start: dModalStart,
    end: dModalEnd,
  }

  // Build position classes - handle both simple and responsive values
  const getPositionClasses = (): string[] => {
    // centered is an alias for position="middle"
    if (centered) {
      return [positionClasses.middle]
    }

    if (!position) {
      return []
    }

    // Simple string position
    if (typeof position === 'string') {
      return [positionClasses[position]]
    }

    // Responsive object position
    const classes: string[] = []
    for (const [breakpoint, pos] of Object.entries(position) as [Breakpoint, ModalPosition][]) {
      if (pos) {
        classes.push(responsivePositionClasses[breakpoint][pos])
      }
    }
    return classes
  }

  const classes = [dModal, ...getPositionClasses(), align && alignClasses[align], className]
    .filter(Boolean)
    .join(' ')

  const handleOk = async () => {
    if (onOk) {
      if (confirmLoading === undefined) {
        setInternalLoading(true)
      }
      try {
        await onOk()
        if (confirmLoading === undefined) {
          setInternalLoading(false)
        }
      } catch (error) {
        if (confirmLoading === undefined) {
          setInternalLoading(false)
        }
        throw error
      }
    }
  }

  const handleBackdropClick = () => {
    if (maskClosable && closeHandler) {
      closeHandler()
    }
  }

  // Calculate modal-box style for custom width
  const modalBoxStyle: React.CSSProperties = width
    ? { width: typeof width === 'number' ? `${width}px` : width, maxWidth: '90vw' }
    : {}

  // Calculate dialog style for zIndex
  const dialogStyle: React.CSSProperties = {
    ...style,
    ...(zIndex !== undefined ? { zIndex } : {}),
  }

  // Render default footer if no custom footer provided and either onOk or onCancel exists
  const shouldRenderDefaultFooter = !footer && (onOk || onCancel)
  const shouldRenderCustomFooter = footer !== null && footer !== undefined

  // Helper for test IDs
  const getTestId = (suffix: string) => (testId ? `${testId}-${suffix}` : undefined)

  if (!shouldRender) {
    return null
  }

  return (
    <dialog
      ref={dialogRef}
      role={alertDialog ? 'alertdialog' : 'dialog'}
      aria-modal="true"
      className={classes}
      style={dialogStyle}
      data-state={open ? 'open' : 'closed'}
      data-testid={testId}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={contentId}
      {...rest}
    >
      <div className={dModalBox} style={modalBoxStyle}>
        {title && (
          <h3 id={titleId} className="text-lg font-bold mb-4" data-testid={getTestId('title')}>
            {title}
          </h3>
        )}
        <div id={contentId} className="py-4" data-testid={getTestId('content')}>
          {children}
        </div>
        {shouldRenderDefaultFooter && (
          <div className={dModalAction}>
            {onCancel && (
              <button
                ref={cancelButtonRef}
                className={dBtn}
                onClick={onCancel}
                data-testid={getTestId('cancel-button')}
                {...cancelButtonProps}
              >
                {resolvedCancelText}
              </button>
            )}
            {onOk && (
              <button
                ref={okButtonRef}
                className={`${dBtn} ${dBtnPrimary} ${loading ? 'loading' : ''}`}
                onClick={handleOk}
                disabled={loading || okButtonProps?.disabled}
                aria-busy={loading || undefined}
                data-testid={getTestId('ok-button')}
                {...okButtonProps}
              >
                {resolvedOkText}
              </button>
            )}
          </div>
        )}
        {shouldRenderCustomFooter && <div className={dModalAction}>{footer}</div>}
      </div>
      {closable && maskClosable && (
        <form method="dialog" className={dModalBackdrop} data-testid={getTestId('backdrop')}>
          <button ref={closeButtonRef} onClick={handleBackdropClick} data-testid={getTestId('close-button')}>
            {closeIcon || <span className="sr-only">Close modal</span>}
          </button>
        </form>
      )}
    </dialog>
  )
})

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
    const { locale } = useConfig()
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
          return dAlertSuccess
        case 'warning':
          return dAlertWarning
        case 'error':
          return dAlertError
        case 'info':
        default:
          return dAlertInfo
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
              aria-hidden="true"
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
              aria-hidden="true"
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
              aria-hidden="true"
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
              aria-hidden="true"
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

    // Use alertdialog role for warning/error types
    const isAlert = config.type === 'warning' || config.type === 'error'

    // Resolve locale strings
    const resolvedOkText = config.okText ?? locale.Modal?.okText ?? 'OK'
    const resolvedCancelText = config.cancelText ?? locale.Modal?.cancelText ?? 'Cancel'

    return (
      <Modal
        open={open}
        onOk={config.showCancel ? undefined : handleOk}
        onCancel={handleCancel}
        alertDialog={isAlert}
        title={
          config.type ? (
            <div className={`${dAlert} ${getAlertClass()}`}>
              {getIcon()}
              <div>{config.title && <h3 className="font-bold">{config.title}</h3>}</div>
            </div>
          ) : (
            config.title
          )
        }
        okText={resolvedOkText}
        cancelText={resolvedCancelText}
        footer={
          config.showCancel ? (
            <>
              <button className={dBtn} onClick={handleCancel}>
                {resolvedCancelText}
              </button>
              <button
                className={`${dBtn} ${config.type === 'error' ? dBtnError : dBtnPrimary} ${loading ? 'loading' : ''}`}
                onClick={handleOk}
                disabled={loading}
              >
                {resolvedOkText}
              </button>
            </>
          ) : (
            <button
              className={`${dBtn} ${config.type === 'error' ? dBtnError : dBtnPrimary} ${loading ? 'loading' : ''}`}
              onClick={handleOk}
              disabled={loading}
            >
              {resolvedOkText}
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

const ModalWithStatics = Modal as typeof Modal & {
  confirm: typeof confirm
  info: typeof info
  success: typeof success
  warning: typeof warning
  error: typeof error
}

ModalWithStatics.confirm = confirm
ModalWithStatics.info = info
ModalWithStatics.success = success
ModalWithStatics.warning = warning
ModalWithStatics.error = error

export { ModalWithStatics as Modal }
