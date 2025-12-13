import React from 'react'
import { IconProps, IconSize, sizeMap } from './types'
import { useIconSize } from './context'

type HeroIconComponent = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string
    titleId?: string
  } & React.RefAttributes<SVGSVGElement>
>

export function createIcon(HeroIcon: HeroIconComponent, displayName: string) {
  const Icon = ({ size, className, style, ...props }: IconProps) => {
    const contextSize = useIconSize()
    const resolvedSize = size ?? contextSize ?? 'md'
    const pixelSize = typeof resolvedSize === 'number' ? resolvedSize : sizeMap[resolvedSize as IconSize]

    return (
      <HeroIcon
        className={className}
        style={{
          width: pixelSize,
          height: pixelSize,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    )
  }

  Icon.displayName = displayName
  return Icon
}
