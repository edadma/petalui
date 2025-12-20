import React, { forwardRef, useMemo } from 'react'
import { Loading } from './Loading'

// DaisyUI classes
const dTimeline = 'timeline'
const dTimelineVertical = 'timeline-vertical'
const dTimelineHorizontal = 'timeline-horizontal'
const dTimelineCompact = 'timeline-compact'
const dTimelineSnapIcon = 'timeline-snap-icon'
const dTimelineStart = 'timeline-start'
const dTimelineEnd = 'timeline-end'
const dTimelineMiddle = 'timeline-middle'
const dTimelineBox = 'timeline-box'

export type TimelineMode = 'start' | 'alternate' | 'end'
export type TimelineColor = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral'

export interface TimelineItemConfig {
  /** Unique key for the item */
  key?: React.Key
  /** Content at start position (left/top) */
  start?: React.ReactNode
  /** Content at end position (right/bottom) */
  end?: React.ReactNode
  /** Central icon or marker */
  icon?: React.ReactNode
  /** Wrap start content in timeline-box */
  startBox?: boolean
  /** Wrap end content in timeline-box */
  endBox?: boolean
  /** Color of the timeline dot/connector */
  color?: TimelineColor
  /** Show loading spinner instead of icon */
  loading?: boolean
  /** Additional CSS classes for this item */
  className?: string
}

export interface TimelineProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'> {
  /** Timeline items (compound pattern) */
  children?: React.ReactNode
  /** Timeline items (declarative API) */
  items?: TimelineItemConfig[]
  /** Vertical layout orientation */
  vertical?: boolean
  /** Horizontal layout (default) */
  horizontal?: boolean
  /** All items on one side */
  compact?: boolean
  /** Snap icon to start instead of center */
  snapIcon?: boolean
  /** Item distribution layout */
  mode?: TimelineMode
  /** Reverse item order */
  reverse?: boolean
  /** Show pending/loading indicator at end */
  pending?: React.ReactNode
  /** Custom icon for pending item */
  pendingIcon?: React.ReactNode
  /** Test ID for the component */
  'data-testid'?: string
  /** Accessible label for the timeline */
  'aria-label'?: string
}

// Public props for Timeline.Item (excludes internal props)
export interface TimelineItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'color'> {
  /** Content at start position (left/top) */
  start?: React.ReactNode
  /** Content at end position (right/bottom) */
  end?: React.ReactNode
  /** Central icon or marker */
  icon?: React.ReactNode
  /** Wrap start content in timeline-box */
  startBox?: boolean
  /** Wrap end content in timeline-box */
  endBox?: boolean
  /** Color of the timeline dot/connector */
  color?: TimelineColor
  /** Show loading spinner instead of icon */
  loading?: boolean
  /** Test ID for this item */
  'data-testid'?: string
}

// Internal props injected by Timeline container
interface TimelineItemInternalProps extends TimelineItemProps {
  _index?: number
  _total?: number
  _compact?: boolean
  _vertical?: boolean
  _mode?: TimelineMode
  _baseTestId?: string
}

const colorClasses: Record<TimelineColor, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  neutral: 'text-neutral',
}

const hrColorClasses: Record<TimelineColor, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  info: 'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  neutral: 'bg-neutral',
}

const TimelineItem = forwardRef<HTMLLIElement, TimelineItemInternalProps>(
  (
    {
      start,
      end,
      icon,
      startBox = false,
      endBox = false,
      color,
      loading = false,
      className = '',
      'data-testid': testId,
      _index = 0,
      _total = 1,
      _compact = false,
      _vertical = false,
      _mode = 'alternate',
      _baseTestId,
      ...rest
    },
    ref
  ) => {
    const itemTestId = testId ?? (_baseTestId ? `${_baseTestId}-item-${_index}` : undefined)

    const startClasses = [dTimelineStart, startBox && dTimelineBox].filter(Boolean).join(' ')
    const endClasses = [dTimelineEnd, endBox && dTimelineBox].filter(Boolean).join(' ')
    const middleClasses = [dTimelineMiddle, color && colorClasses[color]].filter(Boolean).join(' ')
    const hrClasses = color ? hrColorClasses[color] : undefined

    const isFirst = _index === 0
    const isLast = _index === _total - 1

    // Determine content placement based on mode
    const isEven = _index % 2 === 0
    const showOnStart = _mode === 'start' || (_mode === 'alternate' && !isEven)
    const showOnEnd = _mode === 'end' || (_mode === 'alternate' && isEven)

    // Render the icon or loading spinner
    const iconContent = loading ? (
      <Loading size="xs" />
    ) : (
      icon
    )

    // Render connectors and content based on layout
    if (_compact) {
      // Compact layout: connector, icon, end content, connector
      return (
        <li ref={ref} className={className} data-testid={itemTestId} {...rest}>
          {!isFirst && <hr className={hrClasses} />}
          {iconContent && <div className={middleClasses}>{iconContent}</div>}
          {end && <div className={endClasses}>{end}</div>}
          {!isLast && <hr className={hrClasses} />}
        </li>
      )
    } else if (_vertical) {
      // Vertical layout with mode support
      return (
        <li ref={ref} className={className} data-testid={itemTestId} {...rest}>
          {!isFirst && <hr className={hrClasses} />}
          {showOnStart && start && <div className={startClasses}>{start}</div>}
          {showOnEnd && !showOnStart && end && <div className={startClasses}>{end}</div>}
          {iconContent && <div className={middleClasses}>{iconContent}</div>}
          {showOnEnd && start && !showOnStart && <div className={endClasses}>{start}</div>}
          {(showOnStart || (!showOnStart && !showOnEnd)) && end && <div className={endClasses}>{end}</div>}
          {!showOnStart && showOnEnd && start && <div className={endClasses}>{start}</div>}
          {!isLast && <hr className={hrClasses} />}
        </li>
      )
    } else {
      // Horizontal alternating layout
      if (showOnEnd) {
        // Content on end side
        return (
          <li ref={ref} className={className} data-testid={itemTestId} {...rest}>
            {start && <div className={startClasses}>{start}</div>}
            {iconContent && <div className={middleClasses}>{iconContent}</div>}
            {end && <div className={endClasses}>{end}</div>}
            {!isLast && <hr className={hrClasses} />}
          </li>
        )
      } else {
        // Content on start side
        return (
          <li ref={ref} className={className} data-testid={itemTestId} {...rest}>
            {!isFirst && <hr className={hrClasses} />}
            {iconContent && <div className={middleClasses}>{iconContent}</div>}
            {start && <div className={startClasses}>{start}</div>}
            {end && <div className={endClasses}>{end}</div>}
          </li>
        )
      }
    }
  }
)

TimelineItem.displayName = 'Timeline.Item'

const TimelineRoot = forwardRef<HTMLUListElement, TimelineProps>(
  (
    {
      children,
      items,
      className = '',
      vertical = false,
      horizontal = false,
      compact = false,
      snapIcon = false,
      mode = 'alternate',
      reverse = false,
      pending,
      pendingIcon,
      'data-testid': testId = 'timeline',
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) => {
    const classes = [
      dTimeline,
      vertical && dTimelineVertical,
      horizontal && dTimelineHorizontal,
      compact && dTimelineCompact,
      snapIcon && dTimelineSnapIcon,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    // Build items from declarative API if provided
    const declarativeItems = useMemo(() => {
      if (!items) return null
      return items.map((item, index) => (
        <TimelineItem
          key={item.key ?? index}
          start={item.start}
          end={item.end}
          icon={item.icon}
          startBox={item.startBox}
          endBox={item.endBox}
          color={item.color}
          loading={item.loading}
          className={item.className}
        />
      ))
    }, [items])

    // Get children to render (either declarative or compound)
    const childrenToRender = declarativeItems ?? children

    // Convert to array and optionally reverse
    let childArray = React.Children.toArray(childrenToRender)
    if (reverse) {
      childArray = [...childArray].reverse()
    }

    // Add pending item if provided
    if (pending) {
      const pendingItem = (
        <TimelineItem
          key="__pending__"
          end={pending}
          endBox
          icon={pendingIcon}
          loading={!pendingIcon}
        />
      )
      childArray.push(pendingItem)
    }

    const total = childArray.length

    // Inject internal props into each Timeline.Item
    const childrenWithProps = childArray.map((child, index) => {
      if (React.isValidElement<TimelineItemInternalProps>(child)) {
        return React.cloneElement(child, {
          _index: index,
          _total: total,
          _compact: compact,
          _vertical: vertical,
          _mode: mode,
          _baseTestId: testId,
        })
      }
      return child
    })

    return (
      <ul
        ref={ref}
        className={classes}
        data-testid={testId}
        aria-label={ariaLabel}
        role="list"
        {...rest}
      >
        {childrenWithProps}
      </ul>
    )
  }
)

TimelineRoot.displayName = 'Timeline'

export const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
})
