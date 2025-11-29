import React, { useState, useEffect } from 'react'

export interface FloatButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Button content (icon or text) */
  children?: React.ReactNode
  /** Button type/color */
  type?: 'default' | 'primary' | 'secondary' | 'accent'
  /** Button shape */
  shape?: 'circle' | 'square'
  /** Position on screen */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  /** Distance from edge in pixels */
  offset?: number
  /** Tooltip text */
  tooltip?: string
  /** Tooltip placement */
  tooltipPlacement?: 'left' | 'right' | 'top' | 'bottom'
}

export interface BackTopProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'> {
  /** Scroll threshold to show button (pixels) */
  visibilityHeight?: number
  /** Scroll target (default: window) */
  target?: () => HTMLElement | Window
  /** Click handler (called before scrolling) */
  onClick?: () => void
  /** Custom content */
  children?: React.ReactNode
  /** Position on screen */
  position?: 'bottom-right' | 'bottom-left'
  /** Distance from edge in pixels */
  offset?: number
}

const tooltipPlacementClasses = {
  left: 'tooltip-left',
  right: 'tooltip-right',
  top: 'tooltip-top',
  bottom: 'tooltip-bottom',
}

export const FloatButton: React.FC<FloatButtonProps> & { BackTop: React.FC<BackTopProps> } = ({
  children,
  onClick,
  type = 'default',
  shape = 'circle',
  position = 'bottom-right',
  offset = 24,
  className = '',
  tooltip,
  tooltipPlacement = 'left',
  ...rest
}) => {
  const typeClasses = {
    default: 'btn-neutral',
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
  }

  const buttonClasses = [
    'btn',
    'btn-lg',
    'shadow-lg',
    shape === 'circle' ? 'btn-circle' : 'btn-square',
    typeClasses[type],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const style: React.CSSProperties = {
    position: 'fixed',
    zIndex: 1000,
    ...(position.includes('bottom') ? { bottom: offset } : { top: offset }),
    ...(position.includes('right') ? { right: offset } : { left: offset }),
  }

  const button = (
    <button className={buttonClasses} onClick={onClick} style={style} {...rest}>
      {children || (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      )}
    </button>
  )

  if (tooltip) {
    return (
      <div className={`tooltip ${tooltipPlacementClasses[tooltipPlacement]}`} data-tip={tooltip} style={style}>
        <button className={buttonClasses} onClick={onClick} style={{ position: 'static' }} {...rest}>
          {children || (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </button>
      </div>
    )
  }

  return button
}

const BackTop: React.FC<BackTopProps> = ({
  visibilityHeight = 400,
  target,
  onClick,
  children,
  position = 'bottom-right',
  offset = 24,
  className = '',
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
    'btn',
    'btn-lg',
    'btn-circle',
    'btn-neutral',
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
  }

  return (
    <button className={buttonClasses} onClick={handleClick} style={style} {...rest}>
      {children || (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      )}
    </button>
  )
}

FloatButton.BackTop = BackTop
