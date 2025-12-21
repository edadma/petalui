import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'

// Common dark themes in DaisyUI
const DARK_THEMES = new Set([
  'dark', 'synthwave', 'halloween', 'forest', 'black', 'luxury', 'dracula',
  'business', 'night', 'coffee', 'dim', 'sunset'
])

export interface ThemeProviderProps {
  children: React.ReactNode
  /** Default theme. Use "system" to follow browser preference. */
  defaultTheme?: string
  /** localStorage key for persisting theme. Set to false to disable persistence. */
  storageKey?: string | false
  /** Light theme to use when system preference is light */
  lightTheme?: string
  /** Dark theme to use when system preference is dark */
  darkTheme?: string
  /** Custom function to determine if a theme is dark */
  isDarkTheme?: (theme: string) => boolean
}

export interface ThemeColors {
  background: string
  foreground: string
  primary: string
  primaryContent: string
  secondary: string
  accent: string
  info: string
  success: string
  warning: string
  error: string
}

export interface ThemeContextValue {
  /** The theme setting (what user selected: "system", "light", "dark", etc.) */
  theme: string
  /** The actual applied theme after resolving "system" */
  resolvedTheme: string
  /** Whether the resolved theme is dark */
  isDark: boolean
  /** Set the theme */
  setTheme: (theme: string) => void
  /** Computed theme colors as hex values (for canvas/non-CSS contexts) */
  colors: ThemeColors
  /** The system preference ("light" or "dark") */
  systemTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

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

function getStoredTheme(key: string | false): string | null {
  if (!key || typeof window === 'undefined') return null
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function storeTheme(key: string | false, theme: string): void {
  if (!key || typeof window === 'undefined') return
  try {
    localStorage.setItem(key, theme)
  } catch {
    // Ignore storage errors
  }
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'asterui-theme',
  lightTheme = 'light',
  darkTheme = 'dark',
  isDarkTheme,
}: ThemeProviderProps) {
  // Initialize theme from storage or default
  const [theme, setThemeState] = useState<string>(() => {
    const stored = getStoredTheme(storageKey)
    return stored || defaultTheme
  })

  // Track system preference
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme)

  // Resolve the actual theme
  const resolvedTheme = useMemo(() => {
    if (theme === 'system') {
      return systemTheme === 'dark' ? darkTheme : lightTheme
    }
    return theme
  }, [theme, systemTheme, lightTheme, darkTheme])

  // Determine if dark
  const isDark = useMemo(() => {
    if (isDarkTheme) return isDarkTheme(resolvedTheme)
    return DARK_THEMES.has(resolvedTheme)
  }, [resolvedTheme, isDarkTheme])

  // Track colors (updated after theme applies)
  const [colors, setColors] = useState<ThemeColors>(getThemeColors)

  // Set theme function
  const setTheme = useCallback((newTheme: string) => {
    setThemeState(newTheme)
    storeTheme(storageKey, newTheme)
  }, [storageKey])

  // Apply theme to document
  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-theme', resolvedTheme)

    // Double RAF ensures CSS has fully recalculated after attribute change
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setColors(getThemeColors())
      })
    })
  }, [resolvedTheme])

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Listen for storage changes (cross-tab sync)
  useEffect(() => {
    if (!storageKey || typeof window === 'undefined') return

    const handleStorage = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        setThemeState(e.newValue)
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [storageKey])

  const value = useMemo<ThemeContextValue>(() => ({
    theme,
    resolvedTheme,
    isDark,
    setTheme,
    colors,
    systemTheme,
  }), [theme, resolvedTheme, isDark, setTheme, colors, systemTheme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Hook to access theme context.
 * Must be used within a ThemeProvider.
 */
export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return context
}

/**
 * Check if ThemeProvider is present in the tree.
 */
export function useHasThemeProvider(): boolean {
  return useContext(ThemeContext) !== undefined
}
