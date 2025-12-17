import React, { forwardRef } from 'react'

export type MaskShape =
  | 'squircle'
  | 'heart'
  | 'hexagon'
  | 'hexagon-2'
  | 'decagon'
  | 'pentagon'
  | 'diamond'
  | 'square'
  | 'circle'
  | 'star'
  | 'star-2'
  | 'triangle'
  | 'triangle-2'
  | 'triangle-3'
  | 'triangle-4'

export type MaskHalf = 'half-1' | 'half-2'

export interface MaskProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shape of the mask */
  shape: MaskShape
  /** Show only half of the mask */
  half?: MaskHalf
  /** Content to mask (typically an image) */
  children: React.ReactNode
  /** Additional CSS classes */
  className?: string
}

const shapeClasses: Record<MaskShape, string> = {
  squircle: 'd-mask-squircle',
  heart: 'd-mask-heart',
  hexagon: 'd-mask-hexagon',
  'hexagon-2': 'd-mask-hexagon-2',
  decagon: 'd-mask-decagon',
  pentagon: 'd-mask-pentagon',
  diamond: 'd-mask-diamond',
  square: 'mask-square',
  circle: 'd-mask-circle',
  star: 'd-mask-star',
  'star-2': 'd-mask-star-2',
  triangle: 'd-mask-triangle',
  'triangle-2': 'd-mask-triangle-2',
  'triangle-3': 'd-mask-triangle-3',
  'triangle-4': 'd-mask-triangle-4',
}

const halfClasses: Record<MaskHalf, string> = {
  'half-1': 'd-mask-half-1',
  'half-2': 'd-mask-half-2',
}

export const Mask = forwardRef<HTMLDivElement, MaskProps>(
  ({ shape, half, children, className = '', ...props }, ref) => {
    const classes = [
      'd-mask',
      shapeClasses[shape],
      half ? halfClasses[half] : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    )
  }
)

Mask.displayName = 'Mask'
