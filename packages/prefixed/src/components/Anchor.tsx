import React, { useState, useEffect, useCallback, createContext, useContext, useRef } from 'react'

export interface AnchorLinkItem {
  /** Target element id (without #) */
  href: string
  /** Link title */
  title: React.ReactNode
  /** Nested links */
  children?: AnchorLinkItem[]
}

export interface AnchorProps {
  /** Anchor links (alternative to Anchor.Link children) */
  items?: AnchorLinkItem[]
  /** Layout direction */
  direction?: 'horizontal' | 'vertical'
  /** Offset from top when calculating scroll position */
  offsetTop?: number
  /** Bounding distance of anchor area */
  bounds?: number
  /** Target scroll container (default: window) */
  getContainer?: () => HTMLElement | Window
  /** Customize the anchor highlight */
  getCurrentAnchor?: (activeLink: string) => string
  /** Callback when active link changes */
  onChange?: (activeLink: string) => void
  /** Callback when link is clicked */
  onClick?: (e: React.MouseEvent, link: { href: string; title: React.ReactNode }) => void
  /** Currently active link (controlled) */
  activeLink?: string
  /** Whether to fix the anchor when scrolling */
  affix?: boolean
  /** Pixels to offset from top when affix is true */
  affixOffsetTop?: number
  /** Replace history instead of push */
  replace?: boolean
  /** Custom class name */
  className?: string
  /** Anchor.Link children */
  children?: React.ReactNode
}

export interface AnchorLinkProps {
  /** Target element id (without #) */
  href: string
  /** Link title */
  title: React.ReactNode
  /** Nested links */
  children?: React.ReactNode
  /** Custom class name */
  className?: string
}

interface AnchorContextValue {
  activeLink: string
  direction: 'horizontal' | 'vertical'
  offsetTop: number
  registerLink: (href: string) => void
  unregisterLink: (href: string) => void
  handleClick: (e: React.MouseEvent, href: string, title: React.ReactNode) => void
}

const AnchorContext = createContext<AnchorContextValue | null>(null)

const useAnchorContext = () => {
  const context = useContext(AnchorContext)
  if (!context) {
    throw new Error('Anchor.Link must be used within an Anchor')
  }
  return context
}

const AnchorLink: React.FC<AnchorLinkProps> = ({
  href,
  title,
  children,
  className = '',
}) => {
  const { activeLink, direction, registerLink, unregisterLink, handleClick } = useAnchorContext()

  useEffect(() => {
    registerLink(href)
    return () => unregisterLink(href)
  }, [href, registerLink, unregisterLink])

  const isActive = activeLink === href
  const isVertical = direction === 'vertical'

  return (
    <div className={isVertical ? '' : 'inline-block'}>
      <a
        href={`#${href}`}
        onClick={(e) => handleClick(e, href, title)}
        className={`
          block text-sm transition-colors
          ${isVertical ? 'py-1 pl-3 border-l-2' : 'px-3 py-1 border-b-2'}
          ${isActive
            ? 'text-primary border-primary font-medium'
            : 'text-base-content/70 border-transparent hover:text-base-content hover:border-base-content/30'
          }
          ${className}
        `.trim()}
      >
        {title}
      </a>
      {children && (
        <div className={isVertical ? 'pl-3' : 'inline-flex'}>
          {children}
        </div>
      )}
    </div>
  )
}

const AnchorComponent: React.FC<AnchorProps> = ({
  items,
  direction = 'vertical',
  offsetTop = 0,
  bounds = 5,
  getContainer,
  getCurrentAnchor,
  onChange,
  onClick,
  activeLink: controlledActiveLink,
  affix = false,
  affixOffsetTop = 0,
  replace = false,
  className = '',
  children,
}) => {
  const [internalActiveLink, setInternalActiveLink] = useState('')
  const [links, setLinks] = useState<string[]>([])
  const [isAffixed, setIsAffixed] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)

  const isControlled = controlledActiveLink !== undefined
  const rawActiveLink = isControlled ? controlledActiveLink : internalActiveLink
  const activeLink = getCurrentAnchor ? getCurrentAnchor(rawActiveLink) : rawActiveLink

  const registerLink = useCallback((href: string) => {
    setLinks((prev) => (prev.includes(href) ? prev : [...prev, href]))
  }, [])

  const unregisterLink = useCallback((href: string) => {
    setLinks((prev) => prev.filter((link) => link !== href))
  }, [])

  const scrollToTarget = useCallback((href: string) => {
    const target = document.getElementById(href)
    if (target) {
      const container = getContainer?.() ?? window
      const targetTop = target.getBoundingClientRect().top
      const containerTop = container === window
        ? 0
        : (container as HTMLElement).getBoundingClientRect().top
      const scrollTop = container === window
        ? window.scrollY
        : (container as HTMLElement).scrollTop

      const top = targetTop - containerTop + scrollTop - offsetTop

      if (container === window) {
        window.scrollTo({ top, behavior: 'smooth' })
      } else {
        (container as HTMLElement).scrollTo({ top, behavior: 'smooth' })
      }

      // Update URL hash
      if (replace) {
        window.history.replaceState(null, '', `#${href}`)
      } else {
        window.history.pushState(null, '', `#${href}`)
      }
    }
  }, [getContainer, offsetTop, replace])

  const handleClick = useCallback((
    e: React.MouseEvent,
    href: string,
    title: React.ReactNode
  ) => {
    e.preventDefault()
    onClick?.(e, { href, title })
    scrollToTarget(href)

    if (!isControlled) {
      setInternalActiveLink(href)
    }
    onChange?.(href)
  }, [onClick, scrollToTarget, isControlled, onChange])

  // Affix logic
  useEffect(() => {
    if (!affix || !anchorRef.current) return

    const container = getContainer?.() ?? window

    const handleScroll = () => {
      if (!anchorRef.current || !placeholderRef.current) return

      const placeholderRect = placeholderRef.current.getBoundingClientRect()
      const containerTop = container === window
        ? 0
        : (container as HTMLElement).getBoundingClientRect().top

      const shouldAffix = placeholderRect.top - containerTop <= affixOffsetTop

      if (shouldAffix !== isAffixed) {
        setIsAffixed(shouldAffix)
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => container.removeEventListener('scroll', handleScroll)
  }, [affix, affixOffsetTop, getContainer, isAffixed])

  // Scroll spy
  useEffect(() => {
    if (links.length === 0) return

    const container = getContainer?.() ?? window

    const handleScroll = () => {
      let currentActive = ''
      const containerEl = container === window ? document.documentElement : container as HTMLElement
      const containerTop = container === window
        ? 0
        : containerEl.getBoundingClientRect().top

      // Check if scrolled to near the bottom
      const scrollTop = container === window ? window.scrollY : containerEl.scrollTop
      const scrollHeight = containerEl.scrollHeight
      const clientHeight = container === window ? window.innerHeight : containerEl.clientHeight
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 10

      // If near bottom, use the last link
      if (isNearBottom && links.length > 0) {
        currentActive = links[links.length - 1]
      } else {
        // Find the last element that has scrolled past the top (standard scroll spy behavior)
        for (const href of links) {
          const element = document.getElementById(href)
          if (element) {
            const rect = element.getBoundingClientRect()
            const distance = rect.top - containerTop - offsetTop

            // If element's top is within bounds of the threshold, it's the current section
            if (distance <= bounds) {
              currentActive = href
            }
          }
        }

        // If nothing matched, use the first link
        if (!currentActive && links.length > 0) {
          currentActive = links[0]
        }
      }

      if (currentActive && currentActive !== rawActiveLink) {
        if (!isControlled) {
          setInternalActiveLink(currentActive)
        }
        onChange?.(currentActive)
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => container.removeEventListener('scroll', handleScroll)
  }, [links, getContainer, offsetTop, bounds, rawActiveLink, isControlled, onChange])

  const contextValue: AnchorContextValue = {
    activeLink,
    direction,
    offsetTop,
    registerLink,
    unregisterLink,
    handleClick,
  }

  const renderItems = (linkItems: AnchorLinkItem[]): React.ReactNode => {
    return linkItems.map((item) => (
      <AnchorLink key={item.href} href={item.href} title={item.title}>
        {item.children && renderItems(item.children)}
      </AnchorLink>
    ))
  }

  const anchorContent = (
    <nav
      ref={anchorRef}
      className={`
        ${direction === 'horizontal' ? 'flex items-center' : 'flex flex-col'}
        ${isAffixed ? 'fixed bg-base-100 shadow-sm z-10' : ''}
        ${className}
      `.trim()}
      style={isAffixed ? { top: affixOffsetTop } : undefined}
    >
      {items ? renderItems(items) : children}
    </nav>
  )

  if (affix) {
    return (
      <AnchorContext.Provider value={contextValue}>
        <div ref={placeholderRef} style={isAffixed && anchorRef.current ? { height: anchorRef.current.offsetHeight } : undefined}>
          {anchorContent}
        </div>
      </AnchorContext.Provider>
    )
  }

  return (
    <AnchorContext.Provider value={contextValue}>
      {anchorContent}
    </AnchorContext.Provider>
  )
}

export const Anchor = Object.assign(AnchorComponent, {
  Link: AnchorLink,
})
