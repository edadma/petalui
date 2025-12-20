import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { createPortal } from 'react-dom'

// DaisyUI classes
const dBtn = 'd-btn'
const dBtnGhost = 'd-btn-ghost'
const dBtnSm = 'd-btn-sm'
const dBtnPrimary = 'd-btn-primary'
const dBtnXs = 'd-btn-xs'
const dBtnCircle = 'd-btn-circle'

export type TourPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom'
  | 'center'

export type TourType = 'default' | 'primary'

export interface TourArrowConfig {
  pointAtCenter?: boolean
}

export interface TourMaskConfig {
  style?: React.CSSProperties
  color?: string
}

export interface TourButtonProps {
  children?: React.ReactNode
  onClick?: () => void
}

export interface TourStepProps {
  /** Target element ref or function returning element */
  target?: React.RefObject<HTMLElement | null> | (() => HTMLElement | null) | null
  /** Step title */
  title: React.ReactNode
  /** Step description */
  description?: React.ReactNode
  /** Cover image or content above title */
  cover?: React.ReactNode
  /** Placement of popover relative to target */
  placement?: TourPlacement
  /** Whether to show arrow (overrides Tour setting) */
  arrow?: boolean | TourArrowConfig
  /** Custom close icon for this step */
  closeIcon?: React.ReactNode
  /** Show mask overlay (overrides Tour setting) */
  mask?: boolean | TourMaskConfig
  /** Type affects styling (overrides Tour setting) */
  type?: TourType
  /** Scroll into view options (overrides Tour setting) */
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions
  /** Next button props */
  nextButtonProps?: TourButtonProps
  /** Previous button props */
  prevButtonProps?: TourButtonProps
  /** Custom class for this step's popover */
  className?: string
  /** Custom style for this step's popover */
  style?: React.CSSProperties
  /** Called when this step becomes active */
  onClose?: () => void
}

export type TourSemanticName = 'root' | 'mask' | 'popover' | 'header' | 'content' | 'footer' | 'indicator' | 'close'

export interface TourActionInfo {
  current: number
  total: number
}

export interface TourRef {
  /** Go to a specific step */
  goTo: (step: number) => void
  /** Go to the next step */
  next: () => void
  /** Go to the previous step */
  prev: () => void
  /** Close the tour */
  close: () => void
}

export interface TourProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Whether tour is visible */
  open?: boolean
  /** Callback when tour closes */
  onClose?: () => void
  /** Callback when tour finishes (last step completed) */
  onFinish?: () => void
  /** Tour steps */
  steps: TourStepProps[]
  /** Current step (controlled) */
  current?: number
  /** Callback when step changes */
  onChange?: (current: number) => void
  /** Whether to show arrow on popover */
  arrow?: boolean | TourArrowConfig
  /** Custom close icon */
  closeIcon?: React.ReactNode
  /** Show mask overlay */
  mask?: boolean | TourMaskConfig
  /** Disable interaction on highlighted area */
  disabledInteraction?: boolean
  /** Type affects styling */
  type?: TourType
  /** Gap between highlight and target */
  gap?: { offset?: number | [number, number]; radius?: number }
  /** Text for prev button */
  prevButtonText?: React.ReactNode
  /** Text for next button */
  nextButtonText?: React.ReactNode
  /** Text for finish button */
  finishButtonText?: React.ReactNode
  /** Text for skip button */
  skipButtonText?: React.ReactNode
  /** Show skip button */
  showSkip?: boolean
  /** Show step indicators */
  showIndicators?: boolean
  /** Close on mask click */
  closeOnMaskClick?: boolean
  /** Close on escape key */
  closeOnEscape?: boolean
  /** Scroll target into view */
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions
  /** Z-index for tour overlay */
  zIndex?: number
  /** Custom indicator renderer */
  indicatorsRender?: (current: number, total: number) => React.ReactNode
  /** Custom action buttons renderer */
  actionsRender?: (originNode: React.ReactNode, info: TourActionInfo) => React.ReactNode
  /** Rendering container for tour */
  getPopupContainer?: (node: HTMLElement) => HTMLElement
  /** Semantic class names */
  classNames?: Partial<Record<TourSemanticName, string>>
  /** Semantic styles */
  styles?: Partial<Record<TourSemanticName, React.CSSProperties>>
  /** Test ID for testing */
  'data-testid'?: string
}

const getTargetElement = (
  target: TourStepProps['target']
): HTMLElement | null => {
  if (!target) return null
  if (typeof target === 'function') return target()
  return target.current
}

const getPopoverPosition = (
  targetRect: DOMRect | null,
  placement: TourPlacement,
  popoverRect: DOMRect,
  gap: number,
  arrow: boolean | TourArrowConfig
): { top: number; left: number } => {
  if (!targetRect || placement === 'center') {
    return {
      top: window.innerHeight / 2 - popoverRect.height / 2,
      left: window.innerWidth / 2 - popoverRect.width / 2,
    }
  }

  const scrollY = window.scrollY
  const scrollX = window.scrollX
  const pointAtCenter = typeof arrow === 'object' && arrow.pointAtCenter

  const positions: Record<TourPlacement, { top: number; left: number }> = {
    top: {
      top: targetRect.top + scrollY - popoverRect.height - gap,
      left: pointAtCenter
        ? targetRect.left + scrollX + targetRect.width / 2 - popoverRect.width / 2
        : targetRect.left + scrollX + targetRect.width / 2 - popoverRect.width / 2,
    },
    topLeft: {
      top: targetRect.top + scrollY - popoverRect.height - gap,
      left: targetRect.left + scrollX,
    },
    topRight: {
      top: targetRect.top + scrollY - popoverRect.height - gap,
      left: targetRect.right + scrollX - popoverRect.width,
    },
    bottom: {
      top: targetRect.bottom + scrollY + gap,
      left: targetRect.left + scrollX + targetRect.width / 2 - popoverRect.width / 2,
    },
    bottomLeft: {
      top: targetRect.bottom + scrollY + gap,
      left: targetRect.left + scrollX,
    },
    bottomRight: {
      top: targetRect.bottom + scrollY + gap,
      left: targetRect.right + scrollX - popoverRect.width,
    },
    left: {
      top: targetRect.top + scrollY + targetRect.height / 2 - popoverRect.height / 2,
      left: targetRect.left + scrollX - popoverRect.width - gap,
    },
    leftTop: {
      top: targetRect.top + scrollY,
      left: targetRect.left + scrollX - popoverRect.width - gap,
    },
    leftBottom: {
      top: targetRect.bottom + scrollY - popoverRect.height,
      left: targetRect.left + scrollX - popoverRect.width - gap,
    },
    right: {
      top: targetRect.top + scrollY + targetRect.height / 2 - popoverRect.height / 2,
      left: targetRect.right + scrollX + gap,
    },
    rightTop: {
      top: targetRect.top + scrollY,
      left: targetRect.right + scrollX + gap,
    },
    rightBottom: {
      top: targetRect.bottom + scrollY - popoverRect.height,
      left: targetRect.right + scrollX + gap,
    },
    center: {
      top: window.innerHeight / 2 - popoverRect.height / 2,
      left: window.innerWidth / 2 - popoverRect.width / 2,
    },
  }

  return positions[placement]
}

const getArrowPosition = (
  placement: TourPlacement
): { position: string; transform: string } => {
  const arrowPositions: Record<TourPlacement, { position: string; transform: string }> = {
    top: { position: 'bottom-0 left-1/2', transform: 'translate(-50%, 50%) rotate(45deg)' },
    topLeft: { position: 'bottom-0 left-4', transform: 'translate(0, 50%) rotate(45deg)' },
    topRight: { position: 'bottom-0 right-4', transform: 'translate(0, 50%) rotate(45deg)' },
    bottom: { position: 'top-0 left-1/2', transform: 'translate(-50%, -50%) rotate(45deg)' },
    bottomLeft: { position: 'top-0 left-4', transform: 'translate(0, -50%) rotate(45deg)' },
    bottomRight: { position: 'top-0 right-4', transform: 'translate(0, -50%) rotate(45deg)' },
    left: { position: 'right-0 top-1/2', transform: 'translate(50%, -50%) rotate(45deg)' },
    leftTop: { position: 'right-0 top-4', transform: 'translate(50%, 0) rotate(45deg)' },
    leftBottom: { position: 'right-0 bottom-4', transform: 'translate(50%, 0) rotate(45deg)' },
    right: { position: 'left-0 top-1/2', transform: 'translate(-50%, -50%) rotate(45deg)' },
    rightTop: { position: 'left-0 top-4', transform: 'translate(-50%, 0) rotate(45deg)' },
    rightBottom: { position: 'left-0 bottom-4', transform: 'translate(-50%, 0) rotate(45deg)' },
    center: { position: 'hidden', transform: '' },
  }
  return arrowPositions[placement]
}

const defaultCloseIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export const Tour = forwardRef<TourRef, TourProps>(
  (
    {
      open = false,
      onClose,
      onFinish,
      steps,
      current: controlledCurrent,
      onChange,
      arrow = true,
      closeIcon,
      mask = true,
      disabledInteraction = false,
      type = 'default',
      gap = { offset: 6, radius: 2 },
      prevButtonText = 'Previous',
      nextButtonText = 'Next',
      finishButtonText = 'Finish',
      skipButtonText = 'Skip',
      showSkip = true,
      showIndicators = true,
      closeOnMaskClick = true,
      closeOnEscape = true,
      scrollIntoViewOptions = true,
      zIndex = 1001,
      indicatorsRender,
      actionsRender,
      getPopupContainer,
      classNames = {},
      styles = {},
      className,
      style,
      'data-testid': testId,
      ...rest
    },
    ref
  ) => {
    const [internalCurrent, setInternalCurrent] = useState(0)
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 })
    const popoverRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const liveRegionRef = useRef<HTMLDivElement>(null)

    const baseTestId = testId ?? 'tour'
    const getTestId = (suffix: string) => `${baseTestId}-${suffix}`

    const isControlled = controlledCurrent !== undefined
    const currentStep = isControlled ? controlledCurrent : internalCurrent
    const step = steps[currentStep]

    // Resolve gap values
    const gapOffset = gap.offset ?? 6
    const gapRadius = gap.radius ?? 2
    const gapOffsetValue = Array.isArray(gapOffset) ? gapOffset[0] : gapOffset

    // Resolve per-step overrides
    const resolvedArrow = step?.arrow ?? arrow
    const resolvedMask = step?.mask ?? mask
    const resolvedType = step?.type ?? type
    const resolvedScrollOptions = step?.scrollIntoViewOptions ?? scrollIntoViewOptions
    const resolvedCloseIcon = step?.closeIcon ?? closeIcon

    const showArrow = resolvedArrow !== false && step?.placement !== 'center'

    // Mask color
    const maskColor =
      typeof resolvedMask === 'object' && resolvedMask.color
        ? resolvedMask.color
        : 'rgba(0, 0, 0, 0.5)'
    const maskStyle =
      typeof resolvedMask === 'object' && resolvedMask.style ? resolvedMask.style : {}

    const updatePosition = useCallback(() => {
      if (!step) return

      const target = getTargetElement(step.target)
      const rect = target?.getBoundingClientRect() ?? null
      setTargetRect(rect)

      if (popoverRef.current) {
        const popoverRect = popoverRef.current.getBoundingClientRect()
        const placement = step.placement ?? 'bottom'
        const pos = getPopoverPosition(
          rect,
          placement,
          popoverRect,
          gapOffsetValue + gapRadius,
          resolvedArrow
        )
        setPopoverPosition(pos)
      }
    }, [step, gapOffsetValue, gapRadius, resolvedArrow])

    const goToStep = useCallback(
      (stepIndex: number) => {
        if (stepIndex < 0 || stepIndex >= steps.length) return

        // Call onClose for current step
        steps[currentStep]?.onClose?.()

        if (!isControlled) {
          setInternalCurrent(stepIndex)
        }
        onChange?.(stepIndex)

        // Announce step change
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = `Step ${stepIndex + 1} of ${steps.length}: ${
            typeof steps[stepIndex]?.title === 'string' ? steps[stepIndex]?.title : ''
          }`
        }
      },
      [steps, currentStep, isControlled, onChange]
    )

    const handleClose = useCallback(() => {
      onClose?.()
    }, [onClose])

    const handlePrev = useCallback(() => {
      step?.prevButtonProps?.onClick?.()
      goToStep(currentStep - 1)
    }, [currentStep, goToStep, step])

    const handleNext = useCallback(() => {
      step?.nextButtonProps?.onClick?.()
      if (currentStep === steps.length - 1) {
        onFinish?.()
        onClose?.()
      } else {
        goToStep(currentStep + 1)
      }
    }, [currentStep, steps.length, goToStep, onFinish, onClose, step])

    const handleSkip = useCallback(() => {
      onClose?.()
    }, [onClose])

    const handleMaskClick = useCallback(() => {
      if (closeOnMaskClick) {
        onClose?.()
      }
    }, [closeOnMaskClick, onClose])

    // Expose imperative methods
    useImperativeHandle(
      ref,
      () => ({
        goTo: goToStep,
        next: handleNext,
        prev: handlePrev,
        close: handleClose,
      }),
      [goToStep, handleNext, handlePrev, handleClose]
    )

    // Reset to first step when opening
    useEffect(() => {
      if (open && !isControlled) {
        setInternalCurrent(0)
      }
    }, [open, isControlled])

    // Update position on step change or open
    useEffect(() => {
      if (!open) return

      updatePosition()

      // Scroll target into view
      if (resolvedScrollOptions && step?.target) {
        const target = getTargetElement(step.target)
        if (target) {
          const scrollOptions: ScrollIntoViewOptions =
            typeof resolvedScrollOptions === 'object'
              ? resolvedScrollOptions
              : { behavior: 'smooth', block: 'center' }
          target.scrollIntoView(scrollOptions)
        }
      }

      // Announce first step
      if (currentStep === 0 && liveRegionRef.current) {
        liveRegionRef.current.textContent = `Tour started. Step 1 of ${steps.length}: ${
          typeof step?.title === 'string' ? step?.title : ''
        }`
      }
    }, [open, currentStep, step, resolvedScrollOptions, updatePosition, steps.length])

    // Update position on resize/scroll
    useEffect(() => {
      if (!open) return

      const handleUpdate = () => updatePosition()
      window.addEventListener('resize', handleUpdate)
      window.addEventListener('scroll', handleUpdate, true)

      // Initial position after popover renders
      requestAnimationFrame(updatePosition)

      return () => {
        window.removeEventListener('resize', handleUpdate)
        window.removeEventListener('scroll', handleUpdate, true)
      }
    }, [open, updatePosition])

    // Keyboard handling
    useEffect(() => {
      if (!open) return

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && closeOnEscape) {
          onClose?.()
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault()
          handleNext()
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault()
          handlePrev()
        } else if (e.key === 'Tab') {
          // Focus trap within popover
          if (popoverRef.current) {
            const focusableElements = popoverRef.current.querySelectorAll<HTMLElement>(
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
          }
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, closeOnEscape, onClose, handleNext, handlePrev])

    // Focus management - focus first button when tour opens
    useEffect(() => {
      if (open && popoverRef.current) {
        requestAnimationFrame(() => {
          const firstButton = popoverRef.current?.querySelector<HTMLElement>('button')
          firstButton?.focus()
        })
      }
    }, [open, currentStep])

    if (!open || !step) return null

    const isFirstStep = currentStep === 0
    const isLastStep = currentStep === steps.length - 1
    const placement = step.placement ?? 'bottom'
    const arrowPos = getArrowPosition(placement)

    // Default indicators
    const defaultIndicators =
      showIndicators && steps.length > 1 ? (
        <div
          className={`flex gap-1 mb-4 ${classNames.indicator ?? ''}`}
          style={styles.indicator}
          data-testid={getTestId('indicators')}
        >
          {steps.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep
                  ? 'bg-primary'
                  : 'bg-base-300 hover:bg-base-content/30'
              }`}
              onClick={() => goToStep(index)}
              aria-label={`Go to step ${index + 1}`}
              aria-current={index === currentStep ? 'step' : undefined}
              data-testid={getTestId(`indicator-${index}`)}
            />
          ))}
        </div>
      ) : null

    const indicators = indicatorsRender
      ? indicatorsRender(currentStep, steps.length)
      : defaultIndicators

    // Default action buttons
    const defaultActions = (
      <div
        className={`flex items-center justify-between gap-2 ${classNames.footer ?? ''}`}
        style={styles.footer}
        data-testid={getTestId('footer')}
      >
        <div>
          {showSkip && !isLastStep && (
            <button
              className={`${dBtn} ${dBtnGhost} ${dBtnSm}`}
              onClick={handleSkip}
              data-testid={getTestId('skip')}
            >
              {skipButtonText}
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {!isFirstStep && (
            <button
              className={`${dBtn} ${dBtnGhost} ${dBtnSm}`}
              onClick={handlePrev}
              data-testid={getTestId('prev')}
            >
              {step.prevButtonProps?.children ?? prevButtonText}
            </button>
          )}
          <button
            className={`${dBtn} ${dBtnSm} ${resolvedType === 'primary' ? dBtnPrimary : ''}`}
            onClick={handleNext}
            data-testid={getTestId('next')}
          >
            {step.nextButtonProps?.children ?? (isLastStep ? finishButtonText : nextButtonText)}
          </button>
        </div>
      </div>
    )

    const actions = actionsRender
      ? actionsRender(defaultActions, { current: currentStep, total: steps.length })
      : defaultActions

    const content = (
      <div
        ref={containerRef}
        className={`fixed inset-0 ${classNames.root ?? ''} ${className ?? ''}`}
        style={{ zIndex, ...styles.root, ...style }}
        data-testid={baseTestId}
        data-state={open ? 'open' : 'closed'}
        role="dialog"
        aria-modal="true"
        aria-label={`Tour step ${currentStep + 1} of ${steps.length}`}
        {...rest}
      >
        {/* Live region for screen reader announcements */}
        <div
          ref={liveRegionRef}
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        />

        {/* Mask overlay with spotlight cutout */}
        {resolvedMask && (
          <svg
            className={`absolute inset-0 w-full h-full ${
              disabledInteraction ? 'pointer-events-auto' : 'pointer-events-auto'
            } ${classNames.mask ?? ''}`}
            style={{ zIndex, ...maskStyle, ...styles.mask }}
            onClick={handleMaskClick}
            data-testid={getTestId('mask')}
            aria-hidden="true"
          >
            <defs>
              <mask id={`tour-mask-${baseTestId}`}>
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                {targetRect && (
                  <rect
                    x={targetRect.left - gapRadius}
                    y={targetRect.top - gapRadius}
                    width={targetRect.width + gapRadius * 2}
                    height={targetRect.height + gapRadius * 2}
                    rx={gapRadius}
                    fill="black"
                  />
                )}
              </mask>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill={maskColor}
              mask={`url(#tour-mask-${baseTestId})`}
            />
          </svg>
        )}

        {/* Interaction blocker for highlighted area */}
        {disabledInteraction && targetRect && (
          <div
            className="absolute pointer-events-auto"
            style={{
              left: targetRect.left - gapRadius,
              top: targetRect.top - gapRadius,
              width: targetRect.width + gapRadius * 2,
              height: targetRect.height + gapRadius * 2,
              zIndex: zIndex + 1,
            }}
            data-testid={getTestId('blocker')}
          />
        )}

        {/* Popover */}
        <div
          ref={popoverRef}
          className={`absolute bg-base-100 rounded-lg shadow-xl border border-base-300 max-w-sm ${
            classNames.popover ?? ''
          } ${step.className ?? ''}`}
          style={{
            top: popoverPosition.top,
            left: popoverPosition.left,
            zIndex: zIndex + 2,
            ...styles.popover,
            ...step.style,
          }}
          onClick={(e) => e.stopPropagation()}
          data-testid={getTestId('popover')}
          data-placement={placement}
        >
          {/* Arrow */}
          {showArrow && (
            <div
              className={`absolute w-3 h-3 bg-base-100 border-base-300 ${arrowPos.position}`}
              style={{
                transform: arrowPos.transform,
                borderWidth: '1px',
                borderTopColor: 'transparent',
                borderLeftColor: 'transparent',
              }}
              data-testid={getTestId('arrow')}
            />
          )}

          {/* Close button */}
          {resolvedCloseIcon !== false && (
            <button
              className={`absolute top-2 right-2 ${dBtn} ${dBtnGhost} ${dBtnXs} ${dBtnCircle} ${
                classNames.close ?? ''
              }`}
              style={styles.close}
              onClick={handleClose}
              aria-label="Close tour"
              data-testid={getTestId('close')}
            >
              {resolvedCloseIcon ?? defaultCloseIcon}
            </button>
          )}

          {/* Cover */}
          {step.cover && (
            <div className="rounded-t-lg overflow-hidden" data-testid={getTestId('cover')}>
              {step.cover}
            </div>
          )}

          {/* Content */}
          <div
            className={`p-4 ${classNames.content ?? ''}`}
            style={styles.content}
            data-testid={getTestId('content')}
          >
            <div
              className={`${classNames.header ?? ''}`}
              style={styles.header}
              data-testid={getTestId('header')}
            >
              <h3 className="font-semibold text-lg mb-1 pr-6">{step.title}</h3>
              {step.description && (
                <p className="text-base-content/70 text-sm mb-4">{step.description}</p>
              )}
            </div>

            {/* Indicators */}
            {indicators}

            {/* Navigation */}
            {actions}
          </div>
        </div>
      </div>
    )

    // Get container for portal
    const container = getPopupContainer
      ? getPopupContainer(document.body)
      : document.body

    return createPortal(content, container)
  }
)

Tour.displayName = 'Tour'
