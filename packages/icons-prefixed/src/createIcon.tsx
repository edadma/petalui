import React from 'react'
import { IconProps, IconSize, sizeMap } from './types'
import { useIconSize } from './context'

type IconRenderFn = (props: { size: number; className?: string; style?: React.CSSProperties }) => React.ReactElement

export function createIcon(render: IconRenderFn, displayName: string) {
  const Icon = ({ size, className, style, ...props }: IconProps) => {
    const contextSize = useIconSize()
    const resolvedSize = size ?? contextSize ?? 'md'
    const pixelSize = typeof resolvedSize === 'number' ? resolvedSize : sizeMap[resolvedSize as IconSize]

    return render({ size: pixelSize, className, style })
  }

  Icon.displayName = displayName
  return Icon
}
