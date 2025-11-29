import React from 'react'

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  direction?: 'vertical' | 'horizontal'
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  wrap?: boolean
}

export const Stack: React.FC<StackProps> = ({
  children,
  direction = 'vertical',
  spacing = 4,
  align,
  justify,
  wrap = false,
  className = '',
  ...rest
}) => {
  const directionClasses = {
    vertical: 'flex-col',
    horizontal: 'flex-row',
  }

  const spacingClasses = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12',
    16: 'gap-16',
    20: 'gap-20',
    24: 'gap-24',
  }

  const alignClasses = align && {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }[align]

  const justifyClasses = justify && {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  }[justify]

  const classes = [
    'flex',
    directionClasses[direction],
    spacingClasses[spacing],
    alignClasses,
    justifyClasses,
    wrap && 'flex-wrap',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes} {...rest}>{children}</div>
}
