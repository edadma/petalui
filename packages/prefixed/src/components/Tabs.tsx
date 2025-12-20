import React, { useState } from 'react'

// DaisyUI classes
const dTabs = 'd-tabs'
const dTabsBox = 'd-tabs-box'
const dTabsBorder = 'd-tabs-border'
const dTabsLift = 'd-tabs-lift'
const dTabsXs = 'd-tabs-xs'
const dTabsSm = 'd-tabs-sm'
const dTabsMd = 'd-tabs-md'
const dTabsLg = 'd-tabs-lg'
const dTabsXl = 'd-tabs-xl'
const dTab = 'd-tab'
const dTabActive = 'd-tab-active'
const dTabDisabled = 'd-tab-disabled'

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
  /** Disable the tab */
  disabled?: boolean
  /** Tab panel content */
  children?: React.ReactNode
  /** Tab icon */
  icon?: React.ReactNode
}

const variantClasses: Record<TabsVariant, string> = {
  box: dTabsBox,
  border: dTabsBorder,
  lift: dTabsLift,
}

const sizeClasses: Record<TabsSize, string> = {
  xs: dTabsXs,
  sm: dTabsSm,
  md: dTabsMd,
  lg: dTabsLg,
  xl: dTabsXl,
}

interface InternalPanelProps extends TabPanelProps {
  _key: string
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
  // Get panels from children (compound pattern), extracting key from React element
  const panels = React.Children.toArray(children)
    .filter((child): child is React.ReactElement<TabPanelProps> =>
      React.isValidElement(child) && child.type === TabPanel
    )
    .map((child) => ({
      ...child.props,
      _key: child.key != null ? String(child.key) : '',
    }))

  // Convert items to panel-like structure if using data-driven pattern
  const effectivePanels: InternalPanelProps[] = items && items.length > 0
    ? items.map(item => ({
        _key: item.key,
        tab: item.label,
        children: item.children,
        disabled: item.disabled,
        icon: item.icon,
      }))
    : panels

  const [internalActiveKey, setInternalActiveKey] = useState(
    defaultActiveKey || effectivePanels[0]?._key || ''
  )
  const currentActiveKey = activeKey !== undefined ? activeKey : internalActiveKey

  const handleTabClick = (key: string) => {
    if (activeKey === undefined) {
      setInternalActiveKey(key)
    }
    onChange?.(key)
  }

  const classes = [
    dTabs,
    variant && variantClasses[variant],
    size && sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const activePanel = effectivePanels.find((panel) => panel._key === currentActiveKey)

  const tabList = (
    <div role="tablist" className={classes}>
      {effectivePanels.map((panel) => {
        const isActive = currentActiveKey === panel._key
        const tabClasses = [
          dTab,
          isActive && dTabActive,
          panel.disabled && dTabDisabled,
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <button
            key={panel._key}
            role="tab"
            className={tabClasses}
            onClick={() => !panel.disabled && handleTabClick(panel._key)}
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
