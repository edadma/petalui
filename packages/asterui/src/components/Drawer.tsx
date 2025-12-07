import React, { useEffect, useRef, useId, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left'
export type DrawerSize = 'default' | 'large' | number

export interface DrawerProps {
  /** Drawer content */
  children: React.ReactNode
  /** Whether the drawer is visible */
  open?: boolean
  /** Callback when drawer is closed */
  onClose?: () => void
  /** Drawer title */
  title?: React.ReactNode
  /** Direction drawer slides from */
  placement?: DrawerPlacement
  /** Preset size or custom width/height in pixels */
  size?: DrawerSize
  /** Custom width (overrides size for left/right placement) */
  width?: number | string
  /** Custom height (overrides size for top/bottom placement) */
  height?: number | string
  /** Whether to show close button */
  closable?: boolean
  /** Whether to show mask/backdrop */
  mask?: boolean
  /** Whether clicking mask closes drawer */
  maskClosable?: boolean
  /** Whether ESC closes drawer */
  keyboard?: boolean
  /** Footer content */
  footer?: React.ReactNode
  /** Extra content in header (right side) */
  extra?: React.ReactNode
  /** CSS class for drawer panel */
  className?: string
  /** CSS class for drawer wrapper */
  rootClassName?: string
  /** Style for drawer panel */
  style?: React.CSSProperties
  /** z-index of drawer */
  zIndex?: number
  /** Destroy content when closed */
  destroyOnClose?: boolean
  /** Where to place initial focus */
  initialFocus?: 'close' | 'content'
}

/**
 * Drawer - A panel that slides in from the edge of the screen.
 * Use for forms, details, or task panels.
 * For responsive sidebar navigation, use SidebarDrawer instead.
 */
export function Drawer({
  children,
  open = false,
  onClose,
  title,
  placement = 'right',
  size = 'default',
  width,
  height,
  closable = true,
  mask = true,
  maskClosable = true,
  keyboard = true,
  footer,
  extra,
  className = '',
  rootClassName = '',
  style,
  zIndex = 1000,
  destroyOnClose = false,
  initialFocus = 'close',
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const titleId = useId()
  const contentId = useId()
  const [mounted, setMounted] = useState(false)
  const [shouldRender, setShouldRender] = useState(open)

  // Handle SSR - only render portal after mounting in browser
  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate dimensions
  const getSizeValue = (): number => {
    if (typeof size === 'number') return size
    return size === 'large' ? 736 : 378
  }

  const getDimension = (): { width?: string; height?: string } => {
    const isHorizontal = placement === 'left' || placement === 'right'
    const sizeValue = getSizeValue()

    if (isHorizontal) {
      const w = width ?? sizeValue
      return { width: typeof w === 'number' ? `${w}px` : w }
    } else {
      const h = height ?? sizeValue
      return { height: typeof h === 'number' ? `${h}px` : h }
    }
  }

  // Focus trap
  const trapFocus = useCallback((e: KeyboardEvent) => {
    if (!drawerRef.current || e.key !== 'Tab' || typeof document === 'undefined') return

    const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault()
      lastElement?.focus()
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault()
      firstElement?.focus()
    }
  }, [])

  // Handle ESC key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (keyboard && e.key === 'Escape' && onClose) {
      e.preventDefault()
      onClose()
    }
  }, [keyboard, onClose])

  // Open/close effects
  useEffect(() => {
    if (typeof document === 'undefined') return

    if (open) {
      setShouldRender(true)
      previousActiveElement.current = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'

      // Set initial focus
      const focusTimeout = setTimeout(() => {
        if (initialFocus === 'close' && closeButtonRef.current) {
          closeButtonRef.current.focus()
        } else if (contentRef.current) {
          const firstFocusable = contentRef.current.querySelector<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          firstFocusable?.focus()
        }
      }, 0)

      // Add event listeners
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('keydown', trapFocus)

      return () => {
        clearTimeout(focusTimeout)
        document.body.style.overflow = ''
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('keydown', trapFocus)
      }
    } else {
      // Restore focus to previously focused element if it's still in the DOM
      const prevElement = previousActiveElement.current
      if (prevElement && document.body.contains(prevElement)) {
        prevElement.focus()
      }

      // Handle destroyOnClose
      if (destroyOnClose) {
        const timeout = setTimeout(() => setShouldRender(false), 300)
        return () => clearTimeout(timeout)
      }
    }
  }, [open, handleKeyDown, trapFocus, destroyOnClose, initialFocus])

  const handleMaskClick = () => {
    if (maskClosable && onClose) {
      onClose()
    }
  }

  // Position classes
  const placementClasses: Record<DrawerPlacement, string> = {
    top: 'inset-x-0 top-0',
    right: 'inset-y-0 right-0',
    bottom: 'inset-x-0 bottom-0',
    left: 'inset-y-0 left-0',
  }

  // Transform for animation
  const getTransform = (isOpen: boolean): string => {
    if (isOpen) return 'translate(0, 0)'
    switch (placement) {
      case 'top': return 'translateY(-100%)'
      case 'right': return 'translateX(100%)'
      case 'bottom': return 'translateY(100%)'
      case 'left': return 'translateX(-100%)'
    }
  }

  const dimension = getDimension()

  const drawerContent = (
    <div
      className={`fixed inset-0 ${open ? '' : 'pointer-events-none'} ${rootClassName}`}
      style={{ zIndex }}
      role="presentation"
      data-state={open ? 'open' : 'closed'}
    >
      {/* Backdrop/Mask */}
      {mask && (
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            open ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={handleMaskClick}
          aria-hidden="true"
        />
      )}

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={contentId}
        className={`fixed flex flex-col bg-base-100 shadow-xl transition-transform duration-300 ease-in-out ${placementClasses[placement]} ${className}`}
        style={{
          ...dimension,
          transform: getTransform(open),
          ...style,
        }}
      >
        {/* Header */}
        {(title || closable || extra) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-base-300">
            {title && (
              <h2 id={titleId} className="text-lg font-semibold">
                {title}
              </h2>
            )}
            <div className="flex items-center gap-2 ml-auto">
              {extra}
              {closable && (
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="btn btn-ghost btn-sm btn-square"
                  onClick={onClose}
                  aria-label="Close drawer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div
          ref={contentRef}
          id={contentId}
          className="flex-1 overflow-auto p-6"
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-base-300">
            {footer}
          </div>
        )}
      </div>
    </div>
  )

  // Don't render during SSR or when not needed
  if (!mounted || (!shouldRender && !open)) return null

  return createPortal(drawerContent, document.body)
}
