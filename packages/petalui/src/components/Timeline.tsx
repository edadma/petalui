import React from 'react'

export interface TimelineProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode
  vertical?: boolean
  horizontal?: boolean
  compact?: boolean
  snapIcon?: boolean
}

export interface TimelineItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  start?: React.ReactNode
  end?: React.ReactNode
  icon?: React.ReactNode
  startBox?: boolean
  endBox?: boolean
  // Internal props injected by Timeline container
  _index?: number
  _compact?: boolean
  _vertical?: boolean
}

function TimelineRoot({
  children,
  className = '',
  vertical = false,
  horizontal = false,
  compact = false,
  snapIcon = false,
  ...rest
}: TimelineProps) {
  const classes = [
    'timeline',
    vertical && 'timeline-vertical',
    horizontal && 'timeline-horizontal',
    compact && 'timeline-compact',
    snapIcon && 'timeline-snap-icon',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Inject index and layout props into each Timeline.Item
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        _index: index,
        _compact: compact,
        _vertical: vertical,
      } as any)
    }
    return child
  })

  return <ul className={classes} {...rest}>{childrenWithProps}</ul>
}

function TimelineItem({
  start,
  end,
  icon,
  startBox = false,
  endBox = false,
  className = '',
  _index = 0,
  _compact = false,
  _vertical = false,
  ...rest
}: TimelineItemProps) {
  const startClasses = ['timeline-start', startBox && 'timeline-box'].filter(Boolean).join(' ')
  const endClasses = ['timeline-end', endBox && 'timeline-box'].filter(Boolean).join(' ')

  // Determine if this is an even item (for alternating horizontal layout)
  const isEven = _index % 2 === 0

  // Render connectors and content based on layout
  if (_compact) {
    // Compact layout: connector, icon, end content, connector
    return (
      <li className={className} {...rest}>
        <hr />
        {icon && <div className="timeline-middle">{icon}</div>}
        {end && <div className={endClasses}>{end}</div>}
        {_index !== undefined && <hr />}
      </li>
    )
  } else if (_vertical) {
    // Vertical layout: connector, start, icon, end, connector
    return (
      <li className={className} {...rest}>
        <hr />
        {start && <div className={startClasses}>{start}</div>}
        {icon && <div className="timeline-middle">{icon}</div>}
        {end && <div className={endClasses}>{end}</div>}
        <hr />
      </li>
    )
  } else {
    // Horizontal alternating layout
    if (isEven) {
      // Even items: start, icon, end, connector
      return (
        <li className={className} {...rest}>
          {start && <div className={startClasses}>{start}</div>}
          {icon && <div className="timeline-middle">{icon}</div>}
          {end && <div className={endClasses}>{end}</div>}
          <hr />
        </li>
      )
    } else {
      // Odd items: connector, icon, start, end
      return (
        <li className={className} {...rest}>
          <hr />
          {icon && <div className="timeline-middle">{icon}</div>}
          {start && <div className={startClasses}>{start}</div>}
          {end && <div className={endClasses}>{end}</div>}
        </li>
      )
    }
  }
}

export const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
})
