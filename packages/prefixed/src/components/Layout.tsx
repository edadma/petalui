import React, { createContext, useContext, useState, useCallback, useEffect, forwardRef } from 'react'

export type SiderTheme = 'light' | 'dark'
export type SiderCollapsedType = 'clickTrigger' | 'responsive'

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /** Whether contains Sider (auto-detected if not specified) */
  hasSider?: boolean
  /** Test ID for testing */
  'data-testid'?: string
}

export interface LayoutHeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  /** Test ID for testing */
  'data-testid'?: string
}

export interface LayoutFooterProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  /** Test ID for testing */
  'data-testid'?: string
}

export interface LayoutContentProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  /** Test ID for testing */
  'data-testid'?: string
}

export interface LayoutSiderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  children: React.ReactNode
  /** Width of the sider */
  width?: number | string
  /** Width when collapsed */
  collapsedWidth?: number | string
  /** Controlled collapsed state */
  collapsed?: boolean
  /** Initial collapsed state (uncontrolled) */
  defaultCollapsed?: boolean
  /** Whether can be collapsed */
  collapsible?: boolean
  /** Callback when collapse state changes */
  onCollapse?: (collapsed: boolean, type: SiderCollapsedType) => void
  /** Custom trigger element (null to hide) */
  trigger?: React.ReactNode | null
  /** Responsive breakpoint for auto-collapse */
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Callback when breakpoint is crossed */
  onBreakpoint?: (broken: boolean) => void
  /** Reverse direction of arrow (for right-side sider) */
  reverseArrow?: boolean
  /** Color theme of the sider */
  theme?: SiderTheme
  /** Style for zero-width trigger */
  zeroWidthTriggerStyle?: React.CSSProperties
  /** Test ID for testing */
  'data-testid'?: string
}

interface SiderContextValue {
  collapsed: boolean
  collapsedWidth: number | string
  width: number | string
}

const SiderContext = createContext<SiderContextValue | null>(null)

export function useSiderContext() {
  return useContext(SiderContext)
}

const LayoutRoot = forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, hasSider: hasSiderProp, className = '', 'data-testid': testId, ...rest }, ref) => {
    // Check if any child is a Sider to determine flex direction
    const childArray = React.Children.toArray(children)
    const hasSiderDetected = childArray.some(
      (child) => React.isValidElement(child) && (child.type as any).displayName === 'LayoutSider'
    )
    const hasSider = hasSiderProp ?? hasSiderDetected

    const layoutClasses = [
      'flex',
      'min-h-0',
      hasSider ? 'flex-row' : 'flex-col',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    // If we have a Sider, auto-add flex-1 to non-Sider Layout children
    const processedChildren = hasSider
      ? childArray.map((child) => {
          if (
            React.isValidElement(child) &&
            (child.type === LayoutRoot || (child.type as any).displayName === 'LayoutRoot') &&
            (child.type as any).displayName !== 'LayoutSider'
          ) {
            // Clone the Layout child and add flex-1 if not already present
            const existingClassName = (child.props as any).className || ''
            if (!existingClassName.includes('flex-1')) {
              return React.cloneElement(child as React.ReactElement<any>, {
                className: `flex-1 ${existingClassName}`.trim(),
              })
            }
          }
          return child
        })
      : children

    return (
      <div ref={ref} className={layoutClasses} data-testid={testId} {...rest}>
        {processedChildren}
      </div>
    )
  }
)

LayoutRoot.displayName = 'LayoutRoot'

const LayoutHeader = forwardRef<HTMLElement, LayoutHeaderProps>(
  ({ children, className = '', 'data-testid': testId, ...rest }, ref) => {
    const headerClasses = [
      'flex',
      'items-center',
      'px-6',
      'h-16',
      'bg-base-300',
      'flex-shrink-0',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <header ref={ref} className={headerClasses} data-testid={testId} {...rest}>
        {children}
      </header>
    )
  }
)

LayoutHeader.displayName = 'LayoutHeader'

const LayoutFooter = forwardRef<HTMLElement, LayoutFooterProps>(
  ({ children, className = '', 'data-testid': testId, ...rest }, ref) => {
    const footerClasses = [
      'px-6',
      'py-4',
      'text-center',
      'bg-base-300',
      'flex-shrink-0',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <footer ref={ref} className={footerClasses} data-testid={testId} {...rest}>
        {children}
      </footer>
    )
  }
)

LayoutFooter.displayName = 'LayoutFooter'

const LayoutContent = forwardRef<HTMLElement, LayoutContentProps>(
  ({ children, className = '', 'data-testid': testId, ...rest }, ref) => {
    // flex-1 by default so Content fills available space
    const contentClasses = ['flex-1', 'min-h-0', 'overflow-auto', className].filter(Boolean).join(' ')

    return (
      <main ref={ref} className={contentClasses} data-testid={testId} {...rest}>
        {children}
      </main>
    )
  }
)

LayoutContent.displayName = 'LayoutContent'

const BREAKPOINT_MAP: Record<string, string> = {
  sm: '(max-width: 639px)',
  md: '(max-width: 767px)',
  lg: '(max-width: 1023px)',
  xl: '(max-width: 1279px)',
  '2xl': '(max-width: 1535px)',
}

const LayoutSider = forwardRef<HTMLElement, LayoutSiderProps>(
  (
    {
      children,
      width = 200,
      collapsedWidth = 80,
      collapsed: controlledCollapsed,
      defaultCollapsed = false,
      collapsible = false,
      onCollapse,
      trigger,
      breakpoint,
      onBreakpoint,
      reverseArrow = false,
      theme = 'dark',
      zeroWidthTriggerStyle,
      className = '',
      style,
      'data-testid': testId,
      ...rest
    },
    ref
  ) => {
    const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed)
    const [broken, setBroken] = useState(false)

    const collapsed = controlledCollapsed ?? internalCollapsed

    // Handle responsive breakpoint
    useEffect(() => {
      if (!breakpoint) return

      const mediaQuery = window.matchMedia(BREAKPOINT_MAP[breakpoint])

      const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
        const isBroken = e.matches
        setBroken(isBroken)
        onBreakpoint?.(isBroken)

        // Auto-collapse when breakpoint is crossed
        if (controlledCollapsed === undefined) {
          setInternalCollapsed(isBroken)
        }
        if (isBroken !== broken) {
          onCollapse?.(isBroken, 'responsive')
        }
      }

      // Check initial state
      handleChange(mediaQuery)

      // Listen for changes
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }, [breakpoint, onBreakpoint, controlledCollapsed, onCollapse, broken])

    const handleCollapse = useCallback(() => {
      const newCollapsed = !collapsed
      if (controlledCollapsed === undefined) {
        setInternalCollapsed(newCollapsed)
      }
      onCollapse?.(newCollapsed, 'clickTrigger')
    }, [collapsed, controlledCollapsed, onCollapse])

    const currentWidth = collapsed ? collapsedWidth : width
    const isZeroWidth = currentWidth === 0 || currentWidth === '0' || currentWidth === '0px'

    const themeClasses: Record<SiderTheme, string> = {
      light: 'bg-base-100',
      dark: 'bg-base-200',
    }

    const siderClasses = [
      'flex',
      'flex-col',
      themeClasses[theme],
      'flex-shrink-0',
      'transition-all',
      'duration-200',
      'relative',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    // Determine arrow rotation based on collapsed state and reverseArrow prop
    const getArrowRotation = () => {
      if (reverseArrow) {
        return collapsed ? '' : 'rotate-180'
      }
      return collapsed ? 'rotate-180' : ''
    }

    const defaultTrigger = collapsible && trigger !== null && (
      <button
        onClick={handleCollapse}
        className="flex items-center justify-center h-10 w-full bg-base-300 hover:bg-base-content/10 transition-colors"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        data-testid={testId ? `${testId}-trigger` : undefined}
      >
        <svg
          className={`w-4 h-4 transition-transform ${getArrowRotation()}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    )

    // Zero-width trigger (floating button when sider is collapsed to 0)
    const zeroWidthTrigger = collapsible && isZeroWidth && collapsed && (
      <button
        onClick={handleCollapse}
        className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-full w-6 h-12 flex items-center justify-center bg-base-300 hover:bg-base-content/10 transition-colors rounded-r z-10"
        aria-label="Expand sidebar"
        style={zeroWidthTriggerStyle}
        data-testid={testId ? `${testId}-zero-trigger` : undefined}
      >
        <svg
          className={`w-3 h-3 ${reverseArrow ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    )

    return (
      <SiderContext.Provider value={{ collapsed, collapsedWidth, width }}>
        <aside
          ref={ref}
          className={siderClasses}
          style={{
            width: typeof currentWidth === 'number' ? `${currentWidth}px` : currentWidth,
            ...style,
          }}
          data-collapsed={collapsed}
          data-theme={theme}
          data-testid={testId}
          aria-expanded={!collapsed}
          {...rest}
        >
          <div className="flex-1 overflow-auto">{children}</div>
          {!isZeroWidth && trigger !== null && (trigger ?? defaultTrigger)}
          {zeroWidthTrigger}
        </aside>
      </SiderContext.Provider>
    )
  }
)

LayoutSider.displayName = 'LayoutSider'

export const Layout = Object.assign(LayoutRoot, {
  Header: LayoutHeader,
  Footer: LayoutFooter,
  Content: LayoutContent,
  Sider: LayoutSider,
})
