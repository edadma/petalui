import { useEffect, useState } from 'react'

export interface ThemeColors {
  /** Base background color (--b1 / base-100) */
  background: string
  /** Base content/text color (--bc / base-content) */
  foreground: string
  /** Primary color (--p / primary) */
  primary: string
  /** Primary content color (--pc / primary-content) */
  primaryContent: string
}

export interface UseThemeReturn {
  /** Whether dark mode is active */
  isDark: boolean
  /** Computed theme colors as hex values */
  colors: ThemeColors
}

// Convert any CSS color to hex
function colorToHex(color: string): string {
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
  const style = getComputedStyle(document.documentElement)

  // Get computed colors from CSS custom properties
  const background = style.getPropertyValue('--b1').trim()
  const foreground = style.getPropertyValue('--bc').trim()
  const primary = style.getPropertyValue('--p').trim()
  const primaryContent = style.getPropertyValue('--pc').trim()

  // DaisyUI uses oklch, convert to hex for canvas compatibility
  return {
    background: background ? colorToHex(`oklch(${background})`) : '#ffffff',
    foreground: foreground ? colorToHex(`oklch(${foreground})`) : '#000000',
    primary: primary ? colorToHex(`oklch(${primary})`) : '#6366f1',
    primaryContent: primaryContent ? colorToHex(`oklch(${primaryContent})`) : '#ffffff',
  }
}

/**
 * Hook to detect current theme and get computed colors
 *
 * Checks the `data-theme` attribute on the document root (for DaisyUI themes)
 * and falls back to system preference via `prefers-color-scheme`.
 *
 * Returns both the dark mode state and computed theme colors as hex values,
 * useful for canvas-based components that can't use CSS variables directly.
 *
 * Automatically updates when theme changes.
 */
export function useTheme(): UseThemeReturn {
  const [state, setState] = useState<UseThemeReturn>({
    isDark: false,
    colors: {
      background: '#ffffff',
      foreground: '#000000',
      primary: '#6366f1',
      primaryContent: '#ffffff',
    }
  })

  useEffect(() => {
    const checkTheme = () => {
      const html = document.documentElement
      const theme = html.getAttribute('data-theme')
      // Check for explicit dark theme or system preference
      const isDark = theme === 'dark' ||
        (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)

      // Small delay to ensure CSS variables are updated
      requestAnimationFrame(() => {
        setState({
          isDark,
          colors: getThemeColors()
        })
      })
    }

    checkTheme()

    // Watch for theme changes via attribute mutation
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class']
    })

    // Also watch for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', checkTheme)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', checkTheme)
    }
  }, [])

  return state
}

export default useTheme
