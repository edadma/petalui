import React, { forwardRef } from 'react'

// DaisyUI classes
const dDrawer = 'd-drawer'
const dDrawerEnd = 'd-drawer-end'
const dDrawerToggle = 'd-drawer-toggle'
const dDrawerContent = 'd-drawer-content'
const dDrawerSide = 'd-drawer-side'
const dDrawerOverlay = 'd-drawer-overlay'

export type ResponsiveDrawerBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface ResponsiveDrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Main content area */
  children: React.ReactNode
  /** Sidebar content */
  sidebar: React.ReactNode
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Position sidebar on the right side */
  end?: boolean
  /** Width of the sidebar */
  width?: number | string
  /** Breakpoint at which sidebar becomes always visible (e.g., 'lg' for lg:drawer-open) */
  responsive?: ResponsiveDrawerBreakpoint
  /** Additional classes for sidebar container */
  sidebarClassName?: string
  /** Additional classes for content area */
  contentClassName?: string
  /** Additional classes for the overlay */
  overlayClassName?: string
  /** Unique ID for the drawer (auto-generated if not provided) */
  id?: string
  /** Test ID for testing */
  'data-testid'?: string
}

/**
 * ResponsiveDrawer - A responsive sidebar layout using DaisyUI's drawer.
 * Use for navigation sidebars that toggle on mobile but can be always visible on larger screens.
 * For overlay panel drawers (forms, details), use the Drawer component instead.
 */
export const ResponsiveDrawer = forwardRef<HTMLDivElement, ResponsiveDrawerProps>(
  (
    {
      children,
      sidebar,
      open = false,
      onOpenChange,
      end = false,
      width = 320,
      responsive,
      className = '',
      sidebarClassName = '',
      contentClassName = '',
      overlayClassName = '',
      id,
      'data-testid': testId,
      ...rest
    },
    ref
  ) => {
    const autoId = React.useId()
    const drawerId = id || autoId

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
      onOpenChange?.(e.target.checked)
    }

    // Build responsive class if specified
    const responsiveClasses: Record<ResponsiveDrawerBreakpoint, string> = {
      sm: 'sm:drawer-open',
      md: 'md:drawer-open',
      lg: 'lg:drawer-open',
      xl: 'xl:drawer-open',
      '2xl': '2xl:drawer-open',
    }

    const drawerClasses = [
      dDrawer,
      end && dDrawerEnd,
      responsive && responsiveClasses[responsive],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const sidebarClasses = ['bg-base-200 min-h-full p-4', sidebarClassName]
      .filter(Boolean)
      .join(' ')

    const contentClasses = [dDrawerContent, contentClassName]
      .filter(Boolean)
      .join(' ')

    const overlayClasses = [dDrawerOverlay, overlayClassName]
      .filter(Boolean)
      .join(' ')

    // Calculate width style
    const widthStyle = typeof width === 'number' ? `${width}px` : width

    return (
      <div
        ref={ref}
        className={drawerClasses}
        data-state={open ? 'open' : 'closed'}
        data-testid={testId}
        {...rest}
      >
        <input
          id={drawerId}
          type="checkbox"
          className={dDrawerToggle}
          checked={open}
          onChange={handleToggle}
          aria-label={end ? 'Toggle right sidebar' : 'Toggle sidebar'}
        />
        <div className={contentClasses}>{children}</div>
        <div className={dDrawerSide} style={{ '--drawer-width': widthStyle } as React.CSSProperties}>
          <label
            htmlFor={drawerId}
            aria-label="Close sidebar"
            className={overlayClasses}
          />
          <div className={sidebarClasses} style={{ width: widthStyle }}>
            {sidebar}
          </div>
        </div>
      </div>
    )
  }
)

ResponsiveDrawer.displayName = 'ResponsiveDrawer'
