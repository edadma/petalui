import React, { forwardRef, useState } from 'react'

// DaisyUI classes
const dCollapse = 'd-collapse'
const dCollapseArrow = 'd-collapse-arrow'
const dCollapsePlus = 'd-collapse-plus'
const dCollapseOpen = 'd-collapse-open'
const dCollapseClose = 'd-collapse-close'
const dCollapseArrowEnd = 'd-collapse-arrow-end'
const dCollapseTitle = 'd-collapse-title'
const dCollapseContent = 'd-collapse-content'

export type CollapseSize = 'sm' | 'md' | 'lg'
export type CollapseIconPosition = 'start' | 'end'
export type CollapseCollapsible = 'header' | 'icon' | 'disabled'

export interface CollapseItemType {
  /** Unique key for the panel */
  key: string | number
  /** Panel header/label */
  label: React.ReactNode
  /** Panel content */
  children: React.ReactNode
  /** Extra element in the corner */
  extra?: React.ReactNode
  /** Whether to show the arrow icon */
  showArrow?: boolean
  /** Collapsible mode for this panel */
  collapsible?: CollapseCollapsible
  /** Custom class name for this panel */
  className?: string
}

export interface CollapseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Collapse items */
  items?: CollapseItemType[]
  /** Currently active panel keys (controlled) */
  activeKey?: string | number | (string | number)[]
  /** Default active panel keys (uncontrolled) */
  defaultActiveKey?: string | number | (string | number)[]
  /** Accordion mode - only one panel open at a time */
  accordion?: boolean
  /** Show border around panels */
  bordered?: boolean
  /** Ghost mode - transparent background */
  ghost?: boolean
  /** Size variant */
  size?: CollapseSize
  /** Icon type */
  icon?: 'arrow' | 'plus' | 'none'
  /** Icon placement */
  expandIconPlacement?: CollapseIconPosition
  /** Callback when panels change */
  onChange?: (activeKey: (string | number)[]) => void
  /** Test ID */
  'data-testid'?: string
}

const sizeClasses: Record<CollapseSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

const CollapsePanel = forwardRef<
  HTMLDivElement,
  {
    item: CollapseItemType
    isOpen: boolean
    onToggle: () => void
    icon: 'arrow' | 'plus' | 'none'
    expandIconPlacement: CollapseIconPosition
    bordered: boolean
    ghost: boolean
    size: CollapseSize
    testId?: string
  }
>(({ item, isOpen, onToggle, icon, expandIconPlacement, bordered, ghost, size, testId }, ref) => {
  const isDisabled = item.collapsible === 'disabled'

  const iconClasses = {
    arrow: dCollapseArrow,
    plus: dCollapsePlus,
    none: '',
  }

  const panelClasses = [
    dCollapse,
    iconClasses[icon],
    isOpen ? dCollapseOpen : dCollapseClose,
    !ghost && 'bg-base-200',
    ghost && 'bg-transparent',
    bordered && 'border border-base-300',
    expandIconPlacement === 'end' && icon !== 'none' && dCollapseArrowEnd,
    sizeClasses[size],
    isDisabled && 'opacity-50 cursor-not-allowed',
    item.className,
  ]
    .filter(Boolean)
    .join(' ')

  const handleClick = () => {
    if (!isDisabled) {
      onToggle()
    }
  }

  return (
    <div
      ref={ref}
      className={panelClasses}
      data-testid={testId ? `${testId}-panel-${item.key}` : undefined}
      data-state={isOpen ? 'open' : 'closed'}
    >
      <div
        className={`${dCollapseTitle} font-medium flex items-center justify-between cursor-pointer`}
        onClick={handleClick}
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
        aria-expanded={isOpen}
        aria-disabled={isDisabled}
      >
        <span>{item.label}</span>
        {item.extra && <span className="ml-auto mr-6">{item.extra}</span>}
      </div>
      <div className={dCollapseContent}>
        {item.children}
      </div>
    </div>
  )
})

CollapsePanel.displayName = 'CollapsePanel'

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  (
    {
      items = [],
      activeKey,
      defaultActiveKey,
      accordion = false,
      bordered = true,
      ghost = false,
      size = 'md',
      icon = 'arrow',
      expandIconPlacement = 'start',
      onChange,
      className = '',
      'data-testid': testId = 'collapse',
      ...rest
    },
    ref
  ) => {
    // Normalize keys to array
    const normalizeKeys = (keys: string | number | (string | number)[] | undefined): (string | number)[] => {
      if (keys === undefined) return []
      if (Array.isArray(keys)) return keys
      return [keys]
    }

    const [internalActiveKeys, setInternalActiveKeys] = useState<(string | number)[]>(
      () => normalizeKeys(defaultActiveKey)
    )

    const isControlled = activeKey !== undefined
    const currentActiveKeys = isControlled ? normalizeKeys(activeKey) : internalActiveKeys

    const handleToggle = (key: string | number) => {
      let newActiveKeys: (string | number)[]

      if (accordion) {
        // In accordion mode, only one can be open
        newActiveKeys = currentActiveKeys.includes(key) ? [] : [key]
      } else {
        // Toggle the key
        if (currentActiveKeys.includes(key)) {
          newActiveKeys = currentActiveKeys.filter((k) => k !== key)
        } else {
          newActiveKeys = [...currentActiveKeys, key]
        }
      }

      if (!isControlled) {
        setInternalActiveKeys(newActiveKeys)
      }
      onChange?.(newActiveKeys)
    }

    const containerClasses = [
      'flex flex-col',
      bordered && !ghost && 'divide-y divide-base-300',
      bordered && 'border border-base-300 rounded-lg overflow-hidden',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div
        ref={ref}
        className={containerClasses}
        data-testid={testId}
        {...rest}
      >
        {items.map((item) => (
          <CollapsePanel
            key={item.key}
            item={item}
            isOpen={currentActiveKeys.includes(item.key)}
            onToggle={() => handleToggle(item.key)}
            icon={item.showArrow === false ? 'none' : icon}
            expandIconPlacement={expandIconPlacement}
            bordered={false}
            ghost={ghost}
            size={size}
            testId={testId}
          />
        ))}
      </div>
    )
  }
)

Collapse.displayName = 'Collapse'
