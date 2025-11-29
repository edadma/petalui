import React, { useState, useRef, useEffect } from 'react'

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
}

export const Popconfirm: React.FC<PopconfirmProps> = ({
  children,
  title,
  description,
  onConfirm,
  onCancel,
  okText = 'OK',
  cancelText = 'Cancel',
  okType = 'primary',
  cancelType = 'ghost',
  placement = 'top',
  disabled = false,
  icon,
  showCancel = true,
  className,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

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
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

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
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
    info: 'btn-info',
    ghost: 'btn-ghost',
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
    <div ref={containerRef} className={`relative inline-block ${className || ''}`} data-state={isOpen ? 'open' : 'closed'} {...rest}>
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
        <div className={getPopupContainerClasses()}>
          <div ref={popupRef} className={getPopupClasses()}>
            <div className="flex gap-3 relative z-10">
              <div className="flex-shrink-0 mt-0.5">
                {icon !== undefined ? icon : defaultIcon}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-base-content mb-1">{title}</div>
                {description && (
                  <div className="text-sm text-base-content/70 mb-3">{description}</div>
                )}
                <div className="flex justify-end gap-2 mt-3">
                  {showCancel && (
                    <button
                      className={`btn btn-sm ${getButtonClass(cancelType)}`}
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      {cancelText}
                    </button>
                  )}
                  <button
                    className={`btn btn-sm ${getButtonClass(okType)}`}
                    onClick={handleConfirm}
                    disabled={loading}
                  >
                    {loading && <span className="loading loading-spinner loading-xs"></span>}
                    {okText}
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
}
