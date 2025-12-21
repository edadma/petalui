import { useEffect, useState, useMemo } from 'react'
import { useHasThemeProvider, useThemeContext, type ThemeColors } from '../components/ThemeProvider'

export type { ThemeColors }

// Common dark themes in DaisyUI
const DARK_THEMES = new Set([
  'dark', 'synthwave', 'halloween', 'forest', 'black', 'luxury', 'dracula',
  'business', 'night', 'coffee', 'dim', 'sunset'
])

export interface UseThemeReturn {
  /** The theme setting (what user selected). Only available with ThemeProvider. */
  theme: string | undefined
  /** The actual applied theme. Only available with ThemeProvider. */
  resolvedTheme: string | undefined
  /** Whether dark mode is active */
  isDark: boolean
  /** Set the theme. Only available with ThemeProvider. */
  setTheme: ((theme: string) => void) | undefined
  /** Computed theme colors as hex values */
  colors: ThemeColors
  /** The system preference. Only available with ThemeProvider. */
  systemTheme: 'light' | 'dark' | undefined
}

// Convert any CSS color to hex
function colorToHex(color: string): string {
  if (typeof document === 'undefined') return '#000000'
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 1
  const ctx = canvas.getContext('2d')
  if (!ctx) return '#000000'
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

function getThemeColors(): ThemeColors {
  if (typeof document === 'undefined') {
    return {
      background: '#ffffff',
      foreground: '#000000',
      primary: '#6366f1',
      primaryContent: '#ffffff',
      secondary: '#f000b8',
      accent: '#37cdbe',
      info: '#3abff8',
      success: '#36d399',
      warning: '#fbbd23',
      error: '#f87272',
    }
  }

  const style = getComputedStyle(document.documentElement)
  const getColor = (varName: string, fallback: string): string => {
    const value = style.getPropertyValue(varName).trim()
    return value ? colorToHex(value) : fallback
  }

  return {
    background: getColor('--color-base-100', '#ffffff'),
    foreground: getColor('--color-base-content', '#000000'),
    primary: getColor('--color-primary', '#6366f1'),
    primaryContent: getColor('--color-primary-content', '#ffffff'),
    secondary: getColor('--color-secondary', '#f000b8'),
    accent: getColor('--color-accent', '#37cdbe'),
    info: getColor('--color-info', '#3abff8'),
    success: getColor('--color-success', '#36d399'),
    warning: getColor('--color-warning', '#fbbd23'),
    error: getColor('--color-error', '#f87272'),
  }
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getCurrentTheme(): string | null {
  if (typeof document === 'undefined') return null
  return document.documentElement.getAttribute('data-theme')
}

/**
 * Hook to detect current theme and get computed colors.
 *
 * When used within a ThemeProvider, returns full theme control including
 * setTheme, theme selection, and resolved theme.
 *
 * When used standalone (without ThemeProvider), provides read-only access
 * to isDark and colors based on the current data-theme attribute and
 * system preference.
 *
 * @example
 * // With ThemeProvider (full control)
 * const { theme, setTheme, resolvedTheme, isDark, colors } = useTheme()
 * setTheme('dark')
 * setTheme('system')
 *
 * @example
 * // Without ThemeProvider (read-only)
 * const { isDark, colors } = useTheme()
 * // colors.primary, colors.foreground, etc.
 */
export function useTheme(): UseThemeReturn {
  const hasProvider = useHasThemeProvider()

  // If we have a provider, use its context
  if (hasProvider) {
    // This is safe because hasProvider is stable after initial render
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const context = useThemeContext()
    return {
      theme: context.theme,
      resolvedTheme: context.resolvedTheme,
      isDark: context.isDark,
      setTheme: context.setTheme,
      colors: context.colors,
      systemTheme: context.systemTheme,
    }
  }

  // Standalone mode - no provider
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useThemeStandalone()
}

/**
 * Standalone theme detection (no ThemeProvider)
 */
function useThemeStandalone(): UseThemeReturn {
  const [state, setState] = useState<{ isDark: boolean; colors: ThemeColors }>(() => ({
    isDark: false,
    colors: getThemeColors(),
  }))

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = getCurrentTheme()
      const systemTheme = getSystemTheme()

      // Determine if dark based on data-theme or system preference
      let isDark = false
      if (currentTheme) {
        isDark = DARK_THEMES.has(currentTheme)
      } else {
        isDark = systemTheme === 'dark'
      }

      // Double RAF ensures CSS has fully recalculated
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setState({
            isDark,
            colors: getThemeColors(),
          })
        })
      })
    }

    updateTheme()

    // Watch for theme changes via attribute mutation
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class']
    })

    // Watch for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', updateTheme)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', updateTheme)
    }
  }, [])

  return useMemo(() => ({
    theme: undefined,
    resolvedTheme: undefined,
    isDark: state.isDark,
    setTheme: undefined,
    colors: state.colors,
    systemTheme: undefined,
  }), [state.isDark, state.colors])
}

export default useTheme
