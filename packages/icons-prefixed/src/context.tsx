import { useContext } from 'react'
import { IconSizeContext } from '@aster-ui/prefixed'
import type { IconSize } from './types'

export { IconSizeContext }

export function useIconSize(): IconSize | undefined {
  return useContext(IconSizeContext)
}
