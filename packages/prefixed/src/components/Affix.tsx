import React, { useState, useEffect, useRef } from 'react'

export interface AffixProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Content to make sticky */
  children: React.ReactNode
  /** Offset from top when fixed (pixels) */
  offsetTop?: number
  /** Offset from bottom when fixed (pixels) */
  offsetBottom?: number
  /** Scroll target (default: window) */
  target?: () => HTMLElement | Window
  /** Callback when affix state changes */
  onChange?: (affixed: boolean) => void
}

export const Affix: React.FC<AffixProps> = ({
  children,
  offsetTop,
  offsetBottom,
  target,
  onChange,
  className = '',
  ...rest
}) => {
  const [affixed, setAffixed] = useState(false)
  const [placeholderStyle, setPlaceholderStyle] = useState<React.CSSProperties>({})
  const [affixStyle, setAffixStyle] = useState<React.CSSProperties>({})
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // For custom targets, use CSS sticky positioning
  const hasCustomTarget = !!target

  useEffect(() => {
    // For custom targets, use CSS sticky - no JS needed for positioning
    if (hasCustomTarget) {
      return
    }

    const scrollTarget = window

    const handleScroll = () => {
      if (!wrapperRef.current || !contentRef.current) return

      const rect = wrapperRef.current.getBoundingClientRect()
      const contentRect = contentRef.current.getBoundingClientRect()

      let shouldAffix = false
      let newAffixStyle: React.CSSProperties = {}

      if (offsetTop !== undefined) {
        // Affix to top
        shouldAffix = rect.top < offsetTop
        if (shouldAffix) {
          newAffixStyle = {
            position: 'fixed',
            top: offsetTop,
            width: rect.width,
            zIndex: 100,
          }
        }
      } else if (offsetBottom !== undefined) {
        // Affix to bottom
        const viewportHeight = window.innerHeight
        shouldAffix = rect.bottom > viewportHeight - offsetBottom
        if (shouldAffix) {
          newAffixStyle = {
            position: 'fixed',
            bottom: offsetBottom,
            width: rect.width,
            zIndex: 100,
          }
        }
      }

      if (shouldAffix !== affixed) {
        setAffixed(shouldAffix)
        onChange?.(shouldAffix)
      }

      if (shouldAffix) {
        setPlaceholderStyle({
          width: contentRect.width,
          height: contentRect.height,
        })
        setAffixStyle(newAffixStyle)
      } else {
        setPlaceholderStyle({})
        setAffixStyle({})
      }
    }

    scrollTarget.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    handleScroll()

    return () => {
      scrollTarget.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [hasCustomTarget, offsetTop, offsetBottom, affixed, onChange])

  // For custom scroll containers, use CSS sticky
  if (hasCustomTarget) {
    const stickyStyle: React.CSSProperties = {
      position: 'sticky',
      top: offsetTop,
      bottom: offsetBottom,
      zIndex: 100,
    }

    return (
      <div className={className} style={stickyStyle} {...rest}>
        {children}
      </div>
    )
  }

  // For window scrolling, use fixed positioning with JS
  return (
    <div ref={wrapperRef} className={className} data-state={affixed ? 'affixed' : 'normal'} {...rest}>
      {affixed && <div style={placeholderStyle} />}
      <div ref={contentRef} style={affixStyle}>
        {children}
      </div>
    </div>
  )
}
