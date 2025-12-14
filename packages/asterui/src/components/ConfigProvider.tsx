import React, { createContext, useContext, useMemo } from 'react'
import type { Locale } from '../locale'
import enUS from '../locale/en-US'

export type ComponentSize = 'small' | 'middle' | 'large'
export type Direction = 'ltr' | 'rtl'

export interface ConfigContextValue {
  /** Current locale */
  locale: Locale
  /** Component size */
  componentSize?: ComponentSize
  /** Layout direction */
  direction?: Direction
  /** Prefix for CSS classes */
  prefixCls?: string
  /** Default container for portals (modals, dropdowns, etc.) */
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement
}

export interface ConfigProviderProps {
  /** Locale configuration */
  locale?: Locale
  /** Component size for all child components */
  componentSize?: ComponentSize
  /** Layout direction (ltr or rtl) */
  direction?: Direction
  /** Prefix for CSS classes */
  prefixCls?: string
  /** Default container for portals */
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement
  /** Child components */
  children?: React.ReactNode
}

const defaultConfig: ConfigContextValue = {
  locale: enUS,
  componentSize: 'middle',
  direction: 'ltr',
}

const ConfigContext = createContext<ConfigContextValue>(defaultConfig)

/**
 * Hook to access the current configuration
 */
export function useConfig(): ConfigContextValue {
  return useContext(ConfigContext)
}

/**
 * Hook to access the current locale
 */
export function useLocale(): Locale {
  const { locale } = useContext(ConfigContext)
  return locale
}

/**
 * Hook to get locale strings for a specific component
 */
export function useComponentLocale<K extends keyof Locale>(
  componentName: K
): NonNullable<Locale[K]> {
  const locale = useLocale()
  return (locale[componentName] ?? enUS[componentName] ?? {}) as NonNullable<Locale[K]>
}

/**
 * ConfigProvider component for global configuration
 *
 * Provides locale, component size, direction, and other settings to all child components.
 *
 * @example
 * ```tsx
 * import { ConfigProvider, zhCN } from 'asterui'
 *
 * <ConfigProvider locale={zhCN} componentSize="small">
 *   <App />
 * </ConfigProvider>
 * ```
 */
export const ConfigProvider: React.FC<ConfigProviderProps> = ({
  locale,
  componentSize,
  direction,
  prefixCls,
  getPopupContainer,
  children,
}) => {
  // Get parent config if nested
  const parentConfig = useContext(ConfigContext)

  const config = useMemo<ConfigContextValue>(
    () => ({
      locale: locale ?? parentConfig.locale,
      componentSize: componentSize ?? parentConfig.componentSize,
      direction: direction ?? parentConfig.direction,
      prefixCls: prefixCls ?? parentConfig.prefixCls,
      getPopupContainer: getPopupContainer ?? parentConfig.getPopupContainer,
    }),
    [locale, componentSize, direction, prefixCls, getPopupContainer, parentConfig]
  )

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}

// Also export the context for advanced use cases
export { ConfigContext }
