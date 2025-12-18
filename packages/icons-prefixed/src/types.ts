import type { SVGProps } from 'react'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
}

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /** Size token or pixel value */
  size?: IconSize | number
}
