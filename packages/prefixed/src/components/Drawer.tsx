import React, {
  useEffect,
  useRef,
  useId,
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
  createContext,
  useContext,
} from 'react'
import { createPortal } from 'react-dom'
import { Skeleton } from './Skeleton'

// DaisyUI classes
const dBtn = 'd-btn'
const dBtnGhost = 'd-btn-ghost'
const dBtnSm = 'd-btn-sm'
const dBtnSquare = 'd-btn-square'

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left'
export type DrawerSize = 'default' | 'large' | number

export interface DrawerPushConfig {
  /** Distance to push parent drawer (default: 180) */
  distance?: number
}

export interface DrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Drawer content */
  children: React.ReactNode
  /** Whether the drawer is visible */
  open?: boolean
  /** Callback when drawer is closed */
  onClose?: (e?: React.MouseEvent | React.KeyboardEvent) => void
  /** Callback after open/close animation completes */
  afterOpenChange?: (open: boolean) => void
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
  /** Style for drawer header */
  headerStyle?: React.CSSProperties
  /** Style for drawer body/content area */
  bodyStyle?: React.CSSProperties
  /** Style for drawer footer */
  footerStyle?: React.CSSProperties
  /** Style for drawer wrapper (includes mask) */
  rootStyle?: React.CSSProperties
  /** Style for mask/backdrop */
  maskStyle?: React.CSSProperties
  /** z-index of drawer */
  zIndex?: number
  /** Destroy content when closed */
  destroyOnClose?: boolean
  /** Pre-render drawer content (keep in DOM even when closed) */
  forceRender?: boolean
  /** Where to place initial focus */
  initialFocus?: 'close' | 'content'
  /** Show loading skeleton */
  loading?: boolean
  /** Custom container for portal (false to disable portal) */
  getContainer?: HTMLElement | (() => HTMLElement) | false
  /** Nested drawer push behavior */
  push?: boolean | DrawerPushConfig
  /** Test ID for testing */
  'data-testid'?: string
}

export interface DrawerRef {
  /** The drawer panel element */
  nativeElement: HTMLDivElement | null
}

// Context for nested drawer push behavior
interface DrawerContextValue {
  push: boolean | DrawerPushConfig
  pushDistance: number
}

const DrawerContext = createContext<DrawerContextValue | null>(null)

function useDrawerContext() {
  return useContext(DrawerContext)
}

/**
 * Drawer - A panel that slides in from the edge of the screen.
 * Use for forms, details, or task panels.
 * For responsive sidebar navigation, use ResponsiveDrawer instead.
 */
export const Drawer = forwardRef<DrawerRef, DrawerProps>(
  (
    {
      children,
      open = false,
      onClose,
      afterOpenChange,
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
      headerStyle,
      bodyStyle,
      footerStyle,
      rootStyle,
      maskStyle,
      zIndex = 1000,
      destroyOnClose = false,
      forceRender = false,
      initialFocus = 'close',
      loading = false,
      getContainer,
      push = { distance: 180 },
      'data-testid': testId,
      ...rest
    },
    ref
  ) => {
    const drawerRef = useRef<HTMLDivElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const previousActiveElement = useRef<HTMLElement | null>(null)
    const titleId = useId()
    const contentId = useId()
    const [mounted, setMounted] = useState(false)
    const [shouldRender, setShouldRender] = useState(open || forceRender)
    const [isAnimating, setIsAnimating] = useState(false)

    // Get parent drawer context for nested push behavior
    const parentDrawer = useDrawerContext()

    // Expose ref
    useImperativeHandle(ref, () => ({
      nativeElement: drawerRef.current,
    }))

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

    // Calculate push distance for nested drawers
    const getPushDistance = (): number => {
      if (!push) return 0
      if (typeof push === 'boolean') return push ? 180 : 0
      return push.distance ?? 180
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
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (keyboard && e.key === 'Escape' && onClose) {
          e.preventDefault()
          onClose()
        }
      },
      [keyboard, onClose]
    )

    // Handle animation end
    const handleTransitionEnd = useCallback(() => {
      setIsAnimating(false)
      afterOpenChange?.(open)

      if (!open && destroyOnClose) {
        setShouldRender(false)
      }
    }, [open, afterOpenChange, destroyOnClose])

    // Open/close effects
    useEffect(() => {
      if (typeof document === 'undefined') return

      if (open) {
        setShouldRender(true)
        setIsAnimating(true)
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
        setIsAnimating(true)
        // Restore focus to previously focused element if it's still in the DOM
        const prevElement = previousActiveElement.current
        if (prevElement && document.body.contains(prevElement)) {
          prevElement.focus()
        }
      }
    }, [open, handleKeyDown, trapFocus, initialFocus])

    const handleMaskClick = (e: React.MouseEvent) => {
      if (maskClosable && onClose) {
        onClose(e)
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
      // Apply push offset from child drawer
      const pushOffset = parentDrawer && open ? parentDrawer.pushDistance : 0

      if (isOpen) {
        if (pushOffset === 0) return 'translate(0, 0)'
        switch (placement) {
          case 'right':
            return `translateX(-${pushOffset}px)`
          case 'left':
            return `translateX(${pushOffset}px)`
          case 'top':
            return `translateY(${pushOffset}px)`
          case 'bottom':
            return `translateY(-${pushOffset}px)`
        }
      }

      switch (placement) {
        case 'top':
          return 'translateY(-100%)'
        case 'right':
          return 'translateX(100%)'
        case 'bottom':
          return 'translateY(100%)'
        case 'left':
          return 'translateX(-100%)'
      }
    }

    const dimension = getDimension()

    // Get container element
    const getContainerElement = (): HTMLElement | null => {
      if (getContainer === false) return null
      if (typeof getContainer === 'function') return getContainer()
      if (getContainer) return getContainer
      return typeof document !== 'undefined' ? document.body : null
    }

    // Generate test IDs
    const getTestId = (suffix: string) => (testId ? `${testId}-${suffix}` : undefined)

    const drawerContent = (
      <DrawerContext.Provider value={{ push, pushDistance: getPushDistance() }}>
        <div
          className={`fixed inset-0 ${open ? '' : 'pointer-events-none'} ${rootClassName}`}
          style={{ zIndex, ...rootStyle }}
          role="presentation"
          data-state={open ? 'open' : 'closed'}
          data-testid={testId}
          {...rest}
        >
          {/* Backdrop/Mask */}
          {mask && (
            <div
              className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                open ? 'opacity-50' : 'opacity-0'
              }`}
              style={maskStyle}
              onClick={handleMaskClick}
              aria-hidden="true"
              data-testid={getTestId('mask')}
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
            onTransitionEnd={handleTransitionEnd}
            data-testid={getTestId('panel')}
          >
            {/* Header */}
            {(title || closable || extra) && (
              <div
                className="flex items-center justify-between px-6 py-4 border-b border-base-300"
                style={headerStyle}
                data-testid={getTestId('header')}
              >
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
                      className={`${dBtn} ${dBtnGhost} ${dBtnSm} ${dBtnSquare}`}
                      onClick={onClose}
                      aria-label="Close drawer"
                      data-testid={getTestId('close')}
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
              style={bodyStyle}
              data-testid={getTestId('body')}
            >
              {loading ? (
                <div className="space-y-4" data-testid={getTestId('skeleton')}>
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-32 w-full" />
                </div>
              ) : (
                children
              )}
            </div>

            {/* Footer */}
            {footer && (
              <div
                className="px-6 py-4 border-t border-base-300"
                style={footerStyle}
                data-testid={getTestId('footer')}
              >
                {footer}
              </div>
            )}
          </div>
        </div>
      </DrawerContext.Provider>
    )

    // Don't render during SSR or when not needed
    if (!mounted) return null
    if (!shouldRender && !open && !forceRender) return null

    // Render without portal if getContainer is false
    const container = getContainerElement()
    if (container === null) return drawerContent

    return createPortal(drawerContent, container)
  }
)

Drawer.displayName = 'Drawer'
