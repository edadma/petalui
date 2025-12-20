import React, { forwardRef } from 'react'

// DaisyUI classes
const dCard = 'd-card'
const dCardXs = 'd-card-xs'
const dCardSm = 'd-card-sm'
const dCardMd = 'd-card-md'
const dCardLg = 'd-card-lg'
const dCardXl = 'd-card-xl'
const dCardBorder = 'd-card-border'
const dCardDash = 'd-card-dash'
const dCardSide = 'd-card-side'
const dCardBody = 'd-card-body'
const dCardTitle = 'd-card-title'
const dCardActions = 'd-card-actions'
const dSkeleton = 'd-skeleton'
const dTab = 'd-tab'
const dTabActive = 'd-tab-active'
const dTabDisabled = 'd-tab-disabled'
const dTabs = 'd-tabs'

export type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type CardVariant = 'default' | 'border' | 'dash' | 'borderless'

export interface CardTabItem {
  key: string
  label: React.ReactNode
  disabled?: boolean
}

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  children?: React.ReactNode
  title?: React.ReactNode
  /** Content in the top-right corner of the card header */
  extra?: React.ReactNode
  cover?: React.ReactNode
  actions?: React.ReactNode
  size?: CardSize
  /** @deprecated Use variant instead */
  bordered?: boolean
  /** Card style variant */
  variant?: CardVariant
  /** Inner card style (nested cards) */
  type?: 'inner'
  side?: boolean
  imageFull?: boolean
  actionsJustify?: 'start' | 'center' | 'end'
  loading?: boolean
  hoverable?: boolean
  // Meta props for avatar + description layout
  avatar?: React.ReactNode
  description?: React.ReactNode
  // Tab support
  tabList?: CardTabItem[]
  activeTabKey?: string
  defaultActiveTabKey?: string
  onTabChange?: (key: string) => void
  tabBarExtraContent?: React.ReactNode
  /** Additional classes for the card-body element */
  bodyClassName?: string
  'data-testid'?: string
}

export interface CardMetaProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Avatar or icon element */
  avatar?: React.ReactNode
  /** Title content */
  title?: React.ReactNode
  /** Description content */
  description?: React.ReactNode
  'data-testid'?: string
}

export interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hoverable?: boolean
  'data-testid'?: string
}

const sizeClasses: Record<CardSize, string> = {
  xs: dCardXs,
  sm: dCardSm,
  md: dCardMd,
  lg: dCardLg,
  xl: dCardXl,
}

const variantClasses: Record<CardVariant, string> = {
  default: 'shadow-sm',
  border: dCardBorder,
  dash: dCardDash,
  borderless: '',
}

const justifyClasses: Record<string, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
}

const CardGrid = forwardRef<HTMLDivElement, CardGridProps>(
  ({ children, hoverable = false, className = '', 'data-testid': testId, ...rest }, ref) => {
    const classes = [
      'p-6 border border-base-content/10',
      hoverable && 'cursor-pointer hover:shadow-md transition-shadow',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={ref} className={classes} data-testid={testId} {...rest}>
        {children}
      </div>
    )
  }
)

CardGrid.displayName = 'Card.Grid'

const CardMeta = forwardRef<HTMLDivElement, CardMetaProps>(
  ({ avatar, title, description, className = '', 'data-testid': testId, ...rest }, ref) => {
    return (
      <div ref={ref} className={`flex gap-4 ${className}`} data-testid={testId} {...rest}>
        {avatar && <div className="flex-shrink-0">{avatar}</div>}
        <div className="flex-1 min-w-0">
          {title && <div className="font-medium">{title}</div>}
          {description && <div className="text-sm opacity-70 mt-1">{description}</div>}
        </div>
      </div>
    )
  }
)

CardMeta.displayName = 'Card.Meta'

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      title,
      extra,
      cover,
      actions,
      className = '',
      size,
      bordered,
      variant,
      type,
      side = false,
      imageFull = false,
      actionsJustify = 'end',
      loading = false,
      hoverable = false,
      avatar,
      description,
      tabList,
      activeTabKey,
      defaultActiveTabKey,
      onTabChange,
      tabBarExtraContent,
      bodyClassName,
      'data-testid': testId,
      ...rest
    },
    ref
  ) => {
    const baseTestId = testId ?? 'card'

    // Handle activeTabKey state
    const [internalActiveKey, setInternalActiveKey] = React.useState(
      defaultActiveTabKey ?? tabList?.[0]?.key
    )
    const currentTabKey = activeTabKey ?? internalActiveKey

    const handleTabChange = (key: string) => {
      if (activeTabKey === undefined) {
        setInternalActiveKey(key)
      }
      onTabChange?.(key)
    }

    // Resolve variant from bordered prop for backwards compatibility
    const resolvedVariant = variant ?? (bordered === false ? 'borderless' : 'default')

    const classes = [
      dCard,
      'bg-base-100',
      size && sizeClasses[size],
      // Don't add variant styling when imageFull is used (it breaks the overlay effect)
      !imageFull && variantClasses[resolvedVariant],
      side && dCardSide,
      imageFull && 'image-full shadow-sm',
      hoverable && 'transition-shadow hover:shadow-lg cursor-pointer',
      type === 'inner' && 'bg-base-200',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    // Render loading skeleton
    if (loading) {
      return (
        <div
          ref={ref}
          className={classes}
          data-testid={baseTestId}
          data-loading="true"
          {...rest}
        >
          {cover && (
            <figure>
              <div className={`${dSkeleton} h-48 w-full rounded-none`} />
            </figure>
          )}
          <div className={dCardBody}>
            {(avatar || title) && (
              <div className="flex gap-4 mb-4">
                {avatar && <div className={`${dSkeleton} w-12 h-12 rounded-full flex-shrink-0`} />}
                <div className="flex-1 space-y-2">
                  <div className={`${dSkeleton} h-6 w-2/3`} />
                  {description && <div className={`${dSkeleton} h-4 w-full`} />}
                </div>
              </div>
            )}
            {!avatar && !title && (
              <>
                <div className={`${dSkeleton} h-6 w-2/3 mb-4`} />
                <div className="space-y-2">
                  <div className={`${dSkeleton} h-4 w-full`} />
                  <div className={`${dSkeleton} h-4 w-5/6`} />
                  <div className={`${dSkeleton} h-4 w-4/6`} />
                </div>
              </>
            )}
            {actions && (
              <div className={`${dCardActions} ${justifyClasses[actionsJustify]} mt-4`}>
                <div className={`${dSkeleton} h-10 w-20`} />
                <div className={`${dSkeleton} h-10 w-20`} />
              </div>
            )}
          </div>
        </div>
      )
    }

    // Render with avatar + title + description layout (meta style)
    const hasMetaLayout = avatar || (title && description)

    // Header with title and extra
    const renderHeader = () => {
      if (!title && !extra) return null

      if (extra) {
        return (
          <div
            className="flex justify-between items-start gap-4"
            data-testid={`${baseTestId}-header`}
          >
            {title && <h2 className={dCardTitle}>{title}</h2>}
            <div className="flex-shrink-0" data-testid={`${baseTestId}-extra`}>
              {extra}
            </div>
          </div>
        )
      }

      return title ? <h2 className={dCardTitle}>{title}</h2> : null
    }

    // Render tabs
    const renderTabs = () => {
      if (!tabList || tabList.length === 0) return null

      return (
        <div
          className="border-b border-base-300 px-4"
          data-testid={`${baseTestId}-tabs`}
        >
          <div className="flex items-center justify-between">
            <div role="tablist" className={dTabs}>
              {tabList.map((tab) => (
                <button
                  key={tab.key}
                  role="tab"
                  className={[
                    dTab,
                    currentTabKey === tab.key && dTabActive,
                    tab.disabled && dTabDisabled,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => !tab.disabled && handleTabChange(tab.key)}
                  disabled={tab.disabled}
                  aria-selected={currentTabKey === tab.key}
                  data-testid={`${baseTestId}-tab-${tab.key}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {tabBarExtraContent && (
              <div data-testid={`${baseTestId}-tab-extra`}>{tabBarExtraContent}</div>
            )}
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={classes}
        data-testid={baseTestId}
        {...rest}
      >
        {cover && (
          <figure data-testid={`${baseTestId}-cover`}>{cover}</figure>
        )}
        {renderTabs()}
        <div className={`${dCardBody} ${bodyClassName || ''}`} data-testid={`${baseTestId}-body`}>
          {hasMetaLayout ? (
            <>
              <div className="flex gap-4">
                {avatar && <div className="flex-shrink-0">{avatar}</div>}
                <div className="flex-1 min-w-0">
                  {renderHeader()}
                  {description && <p className="text-sm opacity-70 mt-1">{description}</p>}
                </div>
              </div>
              {children}
            </>
          ) : (
            <>
              {renderHeader()}
              {children}
            </>
          )}
          {actions && (
            <div
              className={`${dCardActions} ${justifyClasses[actionsJustify]}`}
              data-testid={`${baseTestId}-actions`}
            >
              {actions}
            </div>
          )}
        </div>
      </div>
    )
  }
)

CardRoot.displayName = 'Card'

export const Card = Object.assign(CardRoot, {
  Grid: CardGrid,
  Meta: CardMeta,
})

export default Card
