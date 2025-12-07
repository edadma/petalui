import React, { useState } from 'react'

export type TabsVariant = 'box' | 'border' | 'lift'
export type TabsSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type TabsPosition = 'top' | 'bottom'

export interface TabItem {
  key: string
  label: React.ReactNode
  children?: React.ReactNode
  disabled?: boolean
  icon?: React.ReactNode
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Tab panels (compound pattern) */
  children?: React.ReactNode
  /** Tab items (data-driven pattern) */
  items?: TabItem[]
  /** Current active tab key (controlled) */
  activeKey?: string
  /** Default active tab key (uncontrolled) */
  defaultActiveKey?: string
  /** Callback when tab changes */
  onChange?: (key: string) => void
  /** Visual style variant */
  variant?: TabsVariant
  /** Tab size */
  size?: TabsSize
  /** Tab position relative to content */
  position?: TabsPosition
}

export interface TabPanelProps {
  /** Tab button label */
  tab: React.ReactNode
  /** Unique identifier for the tab */
  tabKey: string
  /** Disable the tab */
  disabled?: boolean
  /** Tab panel content */
  children?: React.ReactNode
  /** Tab icon */
  icon?: React.ReactNode
}

const variantClasses: Record<TabsVariant, string> = {
  box: 'tabs-box',
  border: 'tabs-border',
  lift: 'tabs-lift',
}

const sizeClasses: Record<TabsSize, string> = {
  xs: 'tabs-xs',
  sm: 'tabs-sm',
  md: 'tabs-md',
  lg: 'tabs-lg',
  xl: 'tabs-xl',
}

function TabsRoot({
  children,
  items,
  activeKey,
  defaultActiveKey,
  onChange,
  variant,
  size,
  position = 'top',
  className = '',
  ...rest
}: TabsProps) {
  // Get panels from children (compound pattern)
  const panels = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<TabPanelProps> =>
      React.isValidElement(child) && child.type === TabPanel
  )

  // Convert items to panel-like structure if using data-driven pattern
  const effectivePanels = items && items.length > 0
    ? items.map(item => ({
        tabKey: item.key,
        tab: item.label,
        children: item.children,
        disabled: item.disabled,
        icon: item.icon,
      }))
    : panels.map(p => p.props)

  const [internalActiveKey, setInternalActiveKey] = useState(
    defaultActiveKey || effectivePanels[0]?.tabKey || ''
  )
  const currentActiveKey = activeKey !== undefined ? activeKey : internalActiveKey

  const handleTabClick = (key: string) => {
    if (activeKey === undefined) {
      setInternalActiveKey(key)
    }
    onChange?.(key)
  }

  const classes = [
    'tabs',
    variant && variantClasses[variant],
    size && sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const activePanel = effectivePanels.find((panel) => panel.tabKey === currentActiveKey)

  const tabList = (
    <div role="tablist" className={classes}>
      {effectivePanels.map((panel) => {
        const isActive = currentActiveKey === panel.tabKey
        const tabClasses = [
          'tab',
          isActive && 'tab-active',
          panel.disabled && 'tab-disabled',
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <button
            key={panel.tabKey}
            role="tab"
            className={tabClasses}
            onClick={() => !panel.disabled && handleTabClick(panel.tabKey)}
            disabled={panel.disabled}
            data-state={isActive ? 'active' : 'inactive'}
            aria-selected={isActive}
          >
            {panel.icon && <span className="mr-1">{panel.icon}</span>}
            {panel.tab}
          </button>
        )
      })}
    </div>
  )

  const content = activePanel && (
    <div className={position === 'top' ? 'mt-4' : 'mb-4'} role="tabpanel">
      {activePanel.children}
    </div>
  )

  return (
    <div {...rest}>
      {position === 'top' ? (
        <>
          {tabList}
          {content}
        </>
      ) : (
        <>
          {content}
          {tabList}
        </>
      )}
    </div>
  )
}

function TabPanel({ children }: TabPanelProps) {
  // This component is only used for type checking and is not rendered directly
  // The actual rendering is done in TabsRoot
  return <>{children}</>
}

export const Tabs = Object.assign(TabsRoot, {
  Panel: TabPanel,
})
