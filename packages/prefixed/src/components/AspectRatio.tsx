import React, { forwardRef } from 'react'

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Aspect ratio as width / height */
  ratio?: number
  children?: React.ReactNode
  /** Test ID for testing */
  'data-testid'?: string
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(function AspectRatio(
  { ratio = 1, children, className = '', style, ...rest },
  ref
) {
  const classes = ['relative w-full', className]
    .filter(Boolean)
    .join(' ')
  const mergedStyle: React.CSSProperties = {
    ...style,
    aspectRatio: ratio,
  }

  return (
    <div ref={ref} className={classes} style={mergedStyle} {...rest}>
      {children}
    </div>
  )
})

AspectRatio.displayName = 'AspectRatio'
