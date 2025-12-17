import { createContext } from 'react'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const IconSizeContext = createContext<IconSize | undefined>(undefined)
