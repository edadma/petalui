import React, { forwardRef } from 'react'

// DaisyUI classes
const dMask = 'd-mask'
const dMaskSquircle = 'd-mask-squircle'
const dMaskHeart = 'd-mask-heart'
const dMaskHexagon = 'd-mask-hexagon'
const dMaskHexagon2 = 'd-mask-hexagon-2'
const dMaskDecagon = 'd-mask-decagon'
const dMaskPentagon = 'd-mask-pentagon'
const dMaskDiamond = 'd-mask-diamond'
const dMaskSquare = 'd-mask-square'
const dMaskCircle = 'd-mask-circle'
const dMaskStar = 'd-mask-star'
const dMaskStar2 = 'd-mask-star-2'
const dMaskTriangle = 'd-mask-triangle'
const dMaskTriangle2 = 'd-mask-triangle-2'
const dMaskTriangle3 = 'd-mask-triangle-3'
const dMaskTriangle4 = 'd-mask-triangle-4'
const dMaskHalf1 = 'd-mask-half-1'
const dMaskHalf2 = 'd-mask-half-2'

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
  squircle: dMaskSquircle,
  heart: dMaskHeart,
  hexagon: dMaskHexagon,
  'hexagon-2': dMaskHexagon2,
  decagon: dMaskDecagon,
  pentagon: dMaskPentagon,
  diamond: dMaskDiamond,
  square: dMaskSquare,
  circle: dMaskCircle,
  star: dMaskStar,
  'star-2': dMaskStar2,
  triangle: dMaskTriangle,
  'triangle-2': dMaskTriangle2,
  'triangle-3': dMaskTriangle3,
  'triangle-4': dMaskTriangle4,
}

const halfClasses: Record<MaskHalf, string> = {
  'half-1': dMaskHalf1,
  'half-2': dMaskHalf2,
}

export const Mask = forwardRef<HTMLDivElement, MaskProps>(
  ({ shape, half, children, className = '', ...props }, ref) => {
    const classes = [
      dMask,
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
