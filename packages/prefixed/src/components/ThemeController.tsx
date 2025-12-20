import React, { useState, useEffect, useId } from 'react'
import { useConfig } from './ConfigProvider'

// DaisyUI classes
const dSwap = 'd-swap'
const dSwapRotate = 'd-swap-rotate'
const dSwapOff = 'd-swap-off'
const dSwapOn = 'd-swap-on'
const dDropdown = 'd-dropdown'
const dDropdownEnd = 'd-dropdown-end'
const dDropdownContent = 'd-dropdown-content'
const dBtn = 'd-btn'
const dBtnSm = 'd-btn-sm'
const dBtnBlock = 'd-btn-block'
const dBtnGhost = 'd-btn-ghost'
const dToggle = 'd-toggle'
const dToggleXs = 'd-toggle-xs'
const dToggleSm = 'd-toggle-sm'
const dToggleMd = 'd-toggle-md'
const dToggleLg = 'd-toggle-lg'
const dToggleXl = 'd-toggle-xl'

export interface ThemeControllerSwapProps {
  lightTheme?: string
  darkTheme?: string
  onChange?: (theme: string) => void
  className?: string
}

export interface ThemeControllerDropdownProps {
  themes: string[]
  defaultTheme?: string
  onChange?: (theme: string) => void
  className?: string
}

export interface ThemeControllerToggleProps {
  lightTheme?: string
  darkTheme?: string
  onChange?: (theme: string) => void
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

// Get current theme from document
function getCurrentTheme(): string | null {
  return document.documentElement.getAttribute('data-theme')
}

// Set theme on document
function setTheme(theme: string) {
  document.documentElement.setAttribute('data-theme', theme)
}

function ThemeControllerSwap({
  lightTheme = 'light',
  darkTheme = 'dark',
  onChange,
  className = '',
}: ThemeControllerSwapProps) {
  const [isDark, setIsDark] = useState(() => {
    const current = getCurrentTheme()
    return current === darkTheme
  })

  // Sync with external theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current = getCurrentTheme()
      setIsDark(current === darkTheme)
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [darkTheme])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    const theme = checked ? darkTheme : lightTheme
    setTheme(theme)
    onChange?.(theme)
  }

  return (
    <label className={`${dSwap} ${dSwapRotate} ${className}`}>
      <input
        type="checkbox"
        checked={isDark}
        onChange={handleChange}
      />
      {/* sun icon */}
      <svg
        className={`${dSwapOff} h-8 w-8 fill-current`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
      </svg>
      {/* moon icon */}
      <svg
        className={`${dSwapOn} h-8 w-8 fill-current`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
      </svg>
    </label>
  )
}

function ThemeControllerDropdown({
  themes,
  defaultTheme,
  onChange,
  className = '',
}: ThemeControllerDropdownProps) {
  const radioName = useId()
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const current = getCurrentTheme()
    if (current && themes.includes(current)) return current
    return defaultTheme || themes[0] || 'light'
  })

  // Sync with external theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current = getCurrentTheme()
      if (current && themes.includes(current)) {
        setSelectedTheme(current)
      }
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [themes])

  const handleChange = (theme: string) => {
    setSelectedTheme(theme)
    setTheme(theme)
    onChange?.(theme)
  }

  return (
    <div className={`${dDropdown} ${dDropdownEnd} ${className}`}>
      <div tabIndex={0} role="button" className={dBtn}>
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className={`${dDropdownContent} bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl max-h-96 overflow-y-auto`}
      >
        {themes.map((theme) => (
          <li key={theme}>
            <input
              type="radio"
              name={radioName}
              className={`${dBtn} ${dBtnSm} ${dBtnBlock} ${dBtnGhost} justify-start`}
              aria-label={theme}
              value={theme}
              checked={selectedTheme === theme}
              onChange={() => handleChange(theme)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

const sizeClasses: Record<string, string> = {
  xs: dToggleXs,
  sm: dToggleSm,
  md: dToggleMd,
  lg: dToggleLg,
  xl: dToggleXl,
}

function ThemeControllerToggle({
  lightTheme = 'light',
  darkTheme = 'dark',
  onChange,
  size,
  className = '',
}: ThemeControllerToggleProps) {
  const { componentSize } = useConfig()
  const effectiveSize = size ?? componentSize ?? 'md'

  const [isDark, setIsDark] = useState(() => {
    const current = getCurrentTheme()
    return current === darkTheme
  })

  // Sync with external theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current = getCurrentTheme()
      setIsDark(current === darkTheme)
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [darkTheme])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    const theme = checked ? darkTheme : lightTheme
    setTheme(theme)
    onChange?.(theme)
  }

  return (
    <input
      type="checkbox"
      className={`${dToggle} ${sizeClasses[effectiveSize]} ${className}`}
      checked={isDark}
      onChange={handleChange}
      aria-label="Toggle theme"
    />
  )
}

export const ThemeController = Object.assign(
  {},
  {
    Swap: ThemeControllerSwap,
    Dropdown: ThemeControllerDropdown,
    Toggle: ThemeControllerToggle,
  }
)
