import React, { useState, useRef, useEffect, forwardRef, useId, useCallback } from 'react'
import { useConfig } from '../providers/ConfigProvider'

// DaisyUI classes
const dBtn = 'd-btn'
const dBtnSm = 'd-btn-sm'
const dBtnPrimary = 'd-btn-primary'
const dBtnSecondary = 'd-btn-secondary'
const dBtnAccent = 'd-btn-accent'
const dBtnSuccess = 'd-btn-success'
const dBtnWarning = 'd-btn-warning'
const dBtnError = 'd-btn-error'
const dBtnInfo = 'd-btn-info'
const dBtnGhost = 'd-btn-ghost'
const dLoading = 'd-loading'
const dLoadingSpinner = 'd-loading-spinner'
const dLoadingXs = 'd-loading-xs'

export interface PopconfirmProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  children: React.ReactElement
  title: React.ReactNode
  description?: React.ReactNode
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
  okText?: string
  cancelText?: string
  okType?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info'
  cancelType?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'ghost'
  placement?: 'top' | 'bottom' | 'left' | 'right'
  disabled?: boolean
  icon?: React.ReactNode
  showCancel?: boolean
  /** Test ID prefix for child elements */
  'data-testid'?: string
}

export const Popconfirm = forwardRef<HTMLDivElement, PopconfirmProps>(function Popconfirm(
  {
    children,
    title,
    description,
    onConfirm,
    onCancel,
    okText,
    cancelText,
    okType = 'primary',
    cancelType = 'ghost',
    placement = 'top',
    disabled = false,
    icon,
    showCancel = true,
    'data-testid': testId,
    className,
    ...rest
  },
  ref
) {
  const { locale } = useConfig()
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  // Resolve locale strings
  const resolvedOkText = okText ?? locale.Popconfirm?.okText ?? 'OK'
  const resolvedCancelText = cancelText ?? locale.Popconfirm?.cancelText ?? 'Cancel'

  // Helper for test IDs
  const getTestId = (suffix: string) => (testId ? `${testId}-${suffix}` : undefined)
  const popupRef = useRef<HTMLDivElement>(null)
  const confirmButtonRef = useRef<HTMLButtonElement>(null)

  // Handle ESC key to close
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
      onCancel?.()
    }
  }, [onCancel])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
      // Focus the confirm button when dialog opens
      setTimeout(() => confirmButtonRef.current?.focus(), 0)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen, handleKeyDown])

  const handleTriggerClick = (e: React.MouseEvent) => {
    if (disabled) return
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const handleConfirm = async () => {
    if (onConfirm) {
      setLoading(true)
      try {
        await onConfirm()
        setIsOpen(false)
      } finally {
        setLoading(false)
      }
    } else {
      setIsOpen(false)
    }
  }

  const handleCancel = () => {
    onCancel?.()
    setIsOpen(false)
  }

  const getPopupContainerClasses = () => {
    const positions = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-3',
      left: 'right-full top-1/2 -translate-y-1/2 mr-3',
      right: 'left-full top-1/2 -translate-y-1/2 ml-3',
    }

    return `absolute z-50 ${positions[placement]}`
  }

  const getPopupClasses = () => {
    return 'bg-base-100 rounded-lg p-4 min-w-[200px] max-w-[300px] shadow-lg'
  }

  const getArrowClasses = () => {
    const base = 'absolute w-2.5 h-2.5 bg-base-100 rotate-45 shadow-lg'

    const positions = {
      top: 'bottom-[-5px] left-1/2 -translate-x-1/2',
      bottom: 'top-[-5px] left-1/2 -translate-x-1/2',
      left: 'right-[-5px] top-1/2 -translate-y-1/2',
      right: 'left-[-5px] top-1/2 -translate-y-1/2',
    }

    return `${base} ${positions[placement]}`
  }

  const buttonClasses = {
    primary: dBtnPrimary,
    secondary: dBtnSecondary,
    accent: dBtnAccent,
    success: dBtnSuccess,
    warning: dBtnWarning,
    error: dBtnError,
    info: dBtnInfo,
    ghost: dBtnGhost,
  } as const

  const getButtonClass = (type: keyof typeof buttonClasses) => {
    return buttonClasses[type]
  }

  const defaultIcon = (
    <svg
      className="w-5 h-5 text-warning"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  )

  return (
    <div ref={ref || containerRef} className={`relative inline-block ${className || ''}`} data-state={isOpen ? 'open' : 'closed'} data-testid={testId} {...rest}>
      {React.cloneElement(children, {
        onClick: (e: React.MouseEvent) => {
          handleTriggerClick(e)
          const originalOnClick = (children.props as any)?.onClick
          if (originalOnClick) {
            originalOnClick(e)
          }
        },
      } as any)}

      {isOpen && (
        <div className={getPopupContainerClasses()} data-testid={getTestId('popup')}>
          <div
            ref={popupRef}
            className={getPopupClasses()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
          >
            <div className="flex gap-3 relative z-10">
              <div className="flex-shrink-0 mt-0.5" aria-hidden="true">
                {icon !== undefined ? icon : defaultIcon}
              </div>
              <div className="flex-1">
                <div id={titleId} className="font-semibold text-base-content mb-1" data-testid={getTestId('title')}>{title}</div>
                {description && (
                  <div id={descriptionId} className="text-sm text-base-content/70 mb-3" data-testid={getTestId('description')}>{description}</div>
                )}
                <div className="flex justify-end gap-2 mt-3">
                  {showCancel && (
                    <button
                      type="button"
                      className={`${dBtn} ${dBtnSm} ${getButtonClass(cancelType)}`}
                      onClick={handleCancel}
                      disabled={loading}
                      data-testid={getTestId('cancel-button')}
                    >
                      {resolvedCancelText}
                    </button>
                  )}
                  <button
                    ref={confirmButtonRef}
                    type="button"
                    className={`${dBtn} ${dBtnSm} ${getButtonClass(okType)}`}
                    onClick={handleConfirm}
                    disabled={loading}
                    data-testid={getTestId('ok-button')}
                  >
                    {loading && <span className={`${dLoading} ${dLoadingSpinner} ${dLoadingXs}`} aria-hidden="true"></span>}
                    {resolvedOkText}
                  </button>
                </div>
              </div>
            </div>
            <div className={getArrowClasses()} />
          </div>
        </div>
      )}
    </div>
  )
})
