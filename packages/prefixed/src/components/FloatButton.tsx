import React, { useState, useEffect, createContext, useContext } from 'react'

// DaisyUI classes
const dBtn = 'd-btn'
const dBtnLg = 'd-btn-lg'
const dBtnCircle = 'd-btn-circle'
const dBtnSquare = 'd-btn-square'
const dBtnNeutral = 'd-btn-neutral'
const dBtnPrimary = 'd-btn-primary'
const dTooltip = 'd-tooltip'
const dTooltipLeft = 'd-tooltip-left'
const dTooltipRight = 'd-tooltip-right'
const dTooltipTop = 'd-tooltip-top'
const dTooltipBottom = 'd-tooltip-bottom'
const dIndicator = 'd-indicator'
const dIndicatorItem = 'd-indicator-item'
const dBadge = 'd-badge'
const dBadgeSecondary = 'd-badge-secondary'
const dFab = 'd-fab'
const dFabFlower = 'd-fab-flower'
const dFabMainAction = 'd-fab-main-action'
const dFabClose = 'd-fab-close'

// Default icons
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const ArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
)

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export interface FloatButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Icon to display */
  icon?: React.ReactNode
  /** Description text below icon */
  description?: React.ReactNode
  /** Button type/color */
  type?: 'default' | 'primary'
  /** Button shape */
  shape?: 'circle' | 'square'
  /** Tooltip text */
  tooltip?: string
  /** Tooltip placement */
  tooltipPlacement?: 'left' | 'right' | 'top' | 'bottom'
  /** Badge content */
  badge?: number | React.ReactNode
  /** Link URL (renders as anchor) */
  href?: string
  /** Link target */
  target?: string
  /** @deprecated Use icon prop instead */
  children?: React.ReactNode
}

export interface FloatButtonGroupProps {
  /** Child FloatButton components */
  children: React.ReactNode
  /** Arrange buttons in a quarter-circle (radial) layout */
  flower?: boolean
  /** Button shape for children */
  shape?: 'circle' | 'square'
  /** Main trigger button icon */
  icon?: React.ReactNode
  /** Main action button that replaces trigger when open (fab-main-action) */
  mainAction?: React.ReactNode
  /** Click handler for main action button */
  onMainAction?: () => void
  /** Show close button when open (fab-close) */
  showClose?: boolean
  /** Button type/color */
  type?: 'default' | 'primary'
  /** Position on screen */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  /** Distance from edge */
  offset?: number
  /** Additional CSS classes */
  className?: string
  /** Custom styles */
  style?: React.CSSProperties
}

export interface BackTopProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'> {
  /** Scroll threshold to show button (pixels) */
  visibilityHeight?: number
  /** Scroll target (default: window) */
  target?: () => HTMLElement | Window
  /** Click handler (called before scrolling) */
  onClick?: () => void
  /** Custom icon */
  icon?: React.ReactNode
  /** Duration of scroll animation in ms */
  duration?: number
  /** Position on screen */
  position?: 'bottom-right' | 'bottom-left'
  /** Distance from edge in pixels */
  offset?: number
  /** @deprecated Use icon prop instead */
  children?: React.ReactNode
}

// Context for group
interface FloatButtonGroupContextValue {
  inGroup: boolean
  shape?: 'circle' | 'square'
}

const FloatButtonGroupContext = createContext<FloatButtonGroupContextValue>({ inGroup: false })

const tooltipPlacementClasses: Record<string, string> = {
  left: dTooltipLeft,
  right: dTooltipRight,
  top: dTooltipTop,
  bottom: dTooltipBottom,
}

const typeClasses: Record<string, string> = {
  default: dBtnNeutral,
  primary: dBtnPrimary,
}

const shapeClasses: Record<string, string> = {
  circle: dBtnCircle,
  square: dBtnSquare,
}

interface FloatButtonComponent extends React.FC<FloatButtonProps> {
  Group: React.FC<FloatButtonGroupProps>
  BackTop: React.FC<BackTopProps>
}

const FloatButtonBase: React.FC<FloatButtonProps & { style?: React.CSSProperties }> = ({
  icon,
  description,
  onClick,
  type = 'default',
  shape = 'circle',
  className = '',
  tooltip,
  tooltipPlacement = 'left',
  badge,
  href,
  target,
  children,
  style,
  ...rest
}) => {
  const groupContext = useContext(FloatButtonGroupContext)
  const effectiveShape = groupContext.inGroup ? (groupContext.shape || shape) : shape

  const buttonClasses = [
    dBtn,
    dBtnLg,
    'shadow-lg',
    shapeClasses[effectiveShape],
    typeClasses[type],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = icon || children || <PlusIcon />

  const buttonContent = (
    <>
      {description ? (
        <div className="flex flex-col items-center">
          {content}
          <span className="text-xs mt-1">{description}</span>
        </div>
      ) : (
        content
      )}
    </>
  )

  // When inside a group, render simple button without wrapper divs
  // DaisyUI's fab CSS requires direct button children
  if (groupContext.inGroup) {
    return href ? (
      <a
        href={href}
        target={target}
        className={buttonClasses}
        title={tooltip}
        onClick={onClick as any}
        {...(rest as any)}
      >
        {buttonContent}
      </a>
    ) : (
      <button className={buttonClasses} title={tooltip} onClick={onClick} {...rest}>
        {buttonContent}
      </button>
    )
  }

  const buttonElement = href ? (
    <a
      href={href}
      target={target}
      className={buttonClasses}
      style={style}
      onClick={onClick as any}
      {...(rest as any)}
    >
      {buttonContent}
    </a>
  ) : (
    <button className={buttonClasses} onClick={onClick} style={style} {...rest}>
      {buttonContent}
    </button>
  )

  const withBadge = badge !== undefined ? (
    <div className={dIndicator} style={style}>
      <span className={`${dIndicatorItem} ${dBadge} ${dBadgeSecondary}`}>
        {badge}
      </span>
      {href ? (
        <a href={href} target={target} className={buttonClasses} onClick={onClick as any} {...(rest as any)}>
          {buttonContent}
        </a>
      ) : (
        <button className={buttonClasses} onClick={onClick} {...rest}>
          {buttonContent}
        </button>
      )}
    </div>
  ) : buttonElement

  if (tooltip) {
    return (
      <div className={`${dTooltip} ${tooltipPlacementClasses[tooltipPlacement]}`} data-tip={tooltip} style={style}>
        {badge !== undefined ? (
          <div className={dIndicator}>
            <span className={`${dIndicatorItem} ${dBadge} ${dBadgeSecondary}`}>{badge}</span>
            {href ? (
              <a href={href} target={target} className={buttonClasses} onClick={onClick as any} {...(rest as any)}>
                {buttonContent}
              </a>
            ) : (
              <button className={buttonClasses} onClick={onClick} {...rest}>
                {buttonContent}
              </button>
            )}
          </div>
        ) : href ? (
          <a href={href} target={target} className={buttonClasses} onClick={onClick as any} {...(rest as any)}>
            {buttonContent}
          </a>
        ) : (
          <button className={buttonClasses} onClick={onClick} {...rest}>
            {buttonContent}
          </button>
        )}
      </div>
    )
  }

  return withBadge
}

export const FloatButton: FloatButtonComponent = (props) => {
  const {
    style: propStyle,
    ...rest
  } = props

  const groupContext = useContext(FloatButtonGroupContext)

  // If in group, don't apply fixed positioning
  if (groupContext.inGroup) {
    return <FloatButtonBase {...rest} />
  }

  // Standalone button with fixed positioning
  const style: React.CSSProperties = {
    position: 'fixed',
    zIndex: 1000,
    bottom: 24,
    right: 24,
    ...propStyle,
  }

  return <FloatButtonBase {...rest} style={style} />
}

const FloatButtonGroup: React.FC<FloatButtonGroupProps> = ({
  children,
  flower = false,
  shape = 'circle',
  icon,
  mainAction,
  onMainAction,
  showClose = false,
  type = 'default',
  position = 'bottom-right',
  offset = 24,
  className = '',
  style: propStyle,
}) => {
  const fabClasses = [
    dFab,
    flower ? dFabFlower : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const triggerButtonClasses = [
    dBtn,
    dBtnLg,
    'shadow-lg',
    shapeClasses[shape],
    typeClasses[type],
  ]
    .filter(Boolean)
    .join(' ')

  const containerStyle: React.CSSProperties = {
    ...(position.includes('bottom') ? { bottom: offset } : { top: offset }),
    ...(position.includes('right') ? { right: offset } : { left: offset }),
    ...propStyle,
  }

  return (
    <div className={fabClasses} style={containerStyle}>
      {/* Trigger button - shown when closed */}
      <div
        tabIndex={0}
        role="button"
        className={triggerButtonClasses}
      >
        {icon || <PlusIcon />}
      </div>

      {/* Main action button - shown when open (replaces trigger in flower mode) */}
      {mainAction && (
        <button
          className={`${triggerButtonClasses} ${dFabMainAction}`}
          onClick={onMainAction}
        >
          {mainAction}
        </button>
      )}

      {/* Close button - shown when open */}
      {showClose && (
        <button className={`${triggerButtonClasses} ${dFabClose}`}>
          <CloseIcon />
        </button>
      )}

      <FloatButtonGroupContext.Provider value={{ inGroup: true, shape }}>
        {children}
      </FloatButtonGroupContext.Provider>
    </div>
  )
}

const BackTop: React.FC<BackTopProps> = ({
  visibilityHeight = 400,
  target,
  onClick,
  icon,
  duration = 450,
  position = 'bottom-right',
  offset = 24,
  className = '',
  children,
  style: propStyle,
  ...rest
}) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const scrollTarget = target ? target() : window

    const handleScroll = () => {
      const scrollTop =
        scrollTarget instanceof Window
          ? window.scrollY
          : (scrollTarget as HTMLElement).scrollTop

      setVisible(scrollTop >= visibilityHeight)
    }

    scrollTarget.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => scrollTarget.removeEventListener('scroll', handleScroll)
  }, [target, visibilityHeight])

  const handleClick = () => {
    onClick?.()
    const scrollTarget = target ? target() : window
    if (scrollTarget instanceof Window) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      (scrollTarget as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (!visible) return null

  const buttonClasses = [
    dBtn,
    dBtnLg,
    dBtnCircle,
    dBtnNeutral,
    'shadow-lg',
    'transition-opacity',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const style: React.CSSProperties = {
    position: 'fixed',
    zIndex: 1000,
    bottom: offset,
    ...(position.includes('right') ? { right: offset } : { left: offset }),
    ...propStyle,
  }

  return (
    <button className={buttonClasses} onClick={handleClick} style={style} {...rest}>
      {icon || children || <ArrowUpIcon />}
    </button>
  )
}

FloatButton.Group = FloatButtonGroup
FloatButton.BackTop = BackTop
