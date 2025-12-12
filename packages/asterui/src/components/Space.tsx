import React from 'react'

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
  wrap?: boolean
  split?: React.ReactNode
  children: React.ReactNode
}

const gapClasses = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
} as const

const alignClasses = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
} as const

const justifyClasses = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const

export const Space: React.FC<SpaceProps> = ({
  direction = 'horizontal',
  size = 'md',
  align,
  justify,
  wrap = false,
  split,
  className = '',
  style,
  children,
  ...rest
}) => {
  const isNumericSize = typeof size === 'number'
  const gapClass = isNumericSize ? '' : gapClasses[size]
  const effectiveAlign = align ?? (direction === 'vertical' ? 'start' : undefined)
  const alignClass = effectiveAlign ? alignClasses[effectiveAlign] : ''
  const justifyClass = justify ? justifyClasses[justify] : ''
  const wrapClass = wrap ? 'flex-wrap' : ''
  const directionClass = direction === 'horizontal' ? 'flex-row' : 'flex-col'

  const classes = [
    'flex',
    directionClass,
    gapClass,
    alignClass,
    justifyClass,
    wrapClass,
    className
  ].filter(Boolean).join(' ')

  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(isNumericSize ? { gap: `${size}px` } : {}),
  }

  // If split is provided, interleave separator between children
  const renderChildren = () => {
    if (!split) return children

    const childArray = React.Children.toArray(children).filter(Boolean)
    if (childArray.length <= 1) return children

    const result: React.ReactNode[] = []
    childArray.forEach((child, index) => {
      result.push(child)
      if (index < childArray.length - 1) {
        result.push(
          <span key={`split-${index}`} className="flex-shrink-0">
            {split}
          </span>
        )
      }
    })
    return result
  }

  return <div className={classes} style={combinedStyle} {...rest}>{renderChildren()}</div>
}
