import React from 'react'

export type IndicatorPosition =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'middle-start'
  | 'middle-center'
  | 'middle-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'

export interface IndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: IndicatorPosition
  children: React.ReactNode
}

export const Indicator: React.FC<IndicatorProps> = ({
  position = 'top-end',
  children,
  className = '',
  ...rest
}) => {
  // Get position classes for indicator
  const getPositionClasses = (pos: IndicatorPosition) => {
    const [vertical, horizontal] = pos.split('-')
    const classes: string[] = []

    switch (vertical) {
      case 'top':
        classes.push('indicator-top')
        break
      case 'middle':
        classes.push('indicator-middle')
        break
      case 'bottom':
        classes.push('indicator-bottom')
        break
    }

    switch (horizontal) {
      case 'start':
        classes.push('indicator-start')
        break
      case 'center':
        classes.push('indicator-center')
        break
      case 'end':
        classes.push('indicator-end')
        break
    }

    return classes.join(' ')
  }

  const childrenArray = React.Children.toArray(children)
  const content = childrenArray[0]
  const indicatorElement = childrenArray[1]

  return (
    <div className={`indicator inline-block ${className}`} {...rest}>
      {indicatorElement && (
        <div className={`indicator-item ${getPositionClasses(position)}`}>
          {indicatorElement}
        </div>
      )}
      {content}
    </div>
  )
}
