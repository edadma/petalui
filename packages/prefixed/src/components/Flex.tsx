import React from 'react'

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  wrap?: boolean | 'wrap' | 'nowrap' | 'wrap-reverse'
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
  flex?: '1' | 'auto' | 'initial' | 'none'
  inline?: boolean
  minHeight?: 'screen' | 'full' | 'fit' | 'min' | 'max'
  minWidth?: 'full' | 'fit' | 'min' | 'max'
  children?: React.ReactNode
}

export const Flex: React.FC<FlexProps> = ({
  direction,
  justify,
  align,
  wrap,
  gap,
  flex,
  inline = false,
  minHeight,
  minWidth,
  className = '',
  style,
  children,
  ...rest
}) => {
  const isNumericGap = typeof gap === 'number'

  const classes = [
    inline ? 'inline-flex' : 'flex',
    direction === 'row' && 'flex-row',
    direction === 'column' && 'flex-col',
    direction === 'row-reverse' && 'flex-row-reverse',
    direction === 'column-reverse' && 'flex-col-reverse',
    justify === 'start' && 'justify-start',
    justify === 'end' && 'justify-end',
    justify === 'center' && 'justify-center',
    justify === 'between' && 'justify-between',
    justify === 'around' && 'justify-around',
    justify === 'evenly' && 'justify-evenly',
    align === 'start' && 'items-start',
    align === 'end' && 'items-end',
    align === 'center' && 'items-center',
    align === 'baseline' && 'items-baseline',
    align === 'stretch' && 'items-stretch',
    wrap === true && 'flex-wrap',
    wrap === 'wrap' && 'flex-wrap',
    wrap === 'nowrap' && 'flex-nowrap',
    wrap === 'wrap-reverse' && 'flex-wrap-reverse',
    !isNumericGap && gap === 'xs' && 'gap-1',
    !isNumericGap && gap === 'sm' && 'gap-2',
    !isNumericGap && gap === 'md' && 'gap-4',
    !isNumericGap && gap === 'lg' && 'gap-6',
    !isNumericGap && gap === 'xl' && 'gap-8',
    flex === '1' && 'flex-1',
    flex === 'auto' && 'flex-auto',
    flex === 'initial' && 'flex-initial',
    flex === 'none' && 'flex-none',
    minHeight === 'screen' && 'min-h-screen',
    minHeight === 'full' && 'min-h-full',
    minHeight === 'fit' && 'min-h-fit',
    minHeight === 'min' && 'min-h-min',
    minHeight === 'max' && 'min-h-max',
    minWidth === 'full' && 'min-w-full',
    minWidth === 'fit' && 'min-w-fit',
    minWidth === 'min' && 'min-w-min',
    minWidth === 'max' && 'min-w-max',
    className,
  ].filter(Boolean).join(' ')

  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(isNumericGap ? { gap: `${gap}px` } : {}),
  }

  return (
    <div className={classes} style={combinedStyle} {...rest}>
      {children}
    </div>
  )
}
