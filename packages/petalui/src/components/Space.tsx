import React from 'react'

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  wrap?: boolean
  children: React.ReactNode
}

export const Space: React.FC<SpaceProps> = ({
  direction = 'vertical',
  size = 'md',
  align,
  wrap = false,
  className = '',
  children,
  ...rest
}) => {
  const getGapClass = () => {
    if (typeof size === 'number') {
      return `gap-[${size}px]`
    }

    const gapClasses = {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    }

    return gapClasses[size]
  }

  const getAlignClass = () => {
    if (!align) return ''
    const alignClasses = {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    }
    return alignClasses[align]
  }

  const gapClass = getGapClass()
  const alignClass = getAlignClass()
  const wrapClass = wrap ? 'flex-wrap' : ''
  const directionClass = direction === 'horizontal' ? 'flex-row' : 'flex-col'

  const classes = [
    'flex',
    directionClass,
    gapClass,
    alignClass,
    wrapClass,
    className
  ].filter(Boolean).join(' ')

  return <div className={classes} {...rest}>{children}</div>
}
