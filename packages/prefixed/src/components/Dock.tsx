import React, { forwardRef } from 'react'

export interface DockItemConfig {
  /** Icon element */
  icon: React.ReactNode
  /** Label text */
  label?: string
  /** Whether this item is active */
  active?: boolean
  /** Whether this item is disabled */
  disabled?: boolean
  /** Click handler for this item */
  onClick?: () => void
}

export interface DockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Dock items configuration */
  items?: DockItemConfig[]
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Controlled active index */
  activeIndex?: number
  /** Callback when an item is clicked */
  onChange?: (index: number) => void
  /** Children (alternative to items prop) */
  children?: React.ReactNode
  /** Additional CSS classes */
  className?: string
}

export interface DockItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether this item is active */
  active?: boolean
  /** Children (icon and optional label) */
  children: React.ReactNode
  /** Additional CSS classes */
  className?: string
}

const DockItem = forwardRef<HTMLButtonElement, DockItemProps>(
  ({ active, children, className = '', ...props }, ref) => {
    const classes = [active && 'd-dock-active', className].filter(Boolean).join(' ')

    return (
      <button ref={ref} className={classes || undefined} {...props}>
        {children}
      </button>
    )
  }
)

DockItem.displayName = 'Dock.Item'

const DockRoot = forwardRef<HTMLDivElement, DockProps>(
  ({ items, size, activeIndex, onChange, children, className = '', ...props }, ref) => {
    const sizeClasses = {
      xs: 'd-dock-xs',
      sm: 'd-dock-sm',
      md: 'd-dock-md',
      lg: 'd-dock-lg',
      xl: 'd-dock-xl',
    }

    const classes = ['d-dock', size && sizeClasses[size], className].filter(Boolean).join(' ')

    // If items array is provided, render from config
    if (items) {
      return (
        <div ref={ref} className={classes} {...props}>
          {items.map((item, index) => {
            const isActive = activeIndex !== undefined ? activeIndex === index : item.active

            return (
              <button
                key={index}
                className={isActive ? 'd-dock-active' : undefined}
                disabled={item.disabled}
                onClick={() => {
                  item.onClick?.()
                  onChange?.(index)
                }}
              >
                {item.icon}
                {item.label && <span className="d-dock-label">{item.label}</span>}
              </button>
            )
          })}
        </div>
      )
    }

    // Otherwise render children
    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    )
  }
)

DockRoot.displayName = 'Dock'

export const Dock = Object.assign(DockRoot, {
  Item: DockItem,
})
