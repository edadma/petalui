import React, { useState, useEffect } from 'react'

export interface ThemeControllerSwapProps {
  lightTheme?: string
  darkTheme?: string
  initialTheme?: string
  onChange?: (theme: string) => void
  className?: string
}

export interface ThemeControllerDropdownProps {
  themes: string[]
  initialTheme?: string
  onChange?: (theme: string) => void
  className?: string
}

function ThemeControllerSwap({
  lightTheme = 'light',
  darkTheme = 'dark',
  initialTheme,
  onChange,
  className = '',
}: ThemeControllerSwapProps) {
  const [isDark, setIsDark] = useState(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    if (initialTheme) {
      return initialTheme === darkTheme
    }
    if (currentTheme) {
      return currentTheme === darkTheme
    }
    // Detect system theme preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true
    }
    return false
  })

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    if (initialTheme) {
      setIsDark(initialTheme === darkTheme)
      document.documentElement.setAttribute('data-theme', initialTheme)
    } else if (currentTheme) {
      setIsDark(currentTheme === darkTheme)
    } else {
      // Apply system theme preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const theme = prefersDark ? darkTheme : lightTheme
      setIsDark(prefersDark)
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [initialTheme, darkTheme, lightTheme])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setIsDark(checked)
    const newTheme = checked ? darkTheme : lightTheme
    document.documentElement.setAttribute('data-theme', newTheme)
    onChange?.(newTheme)
  }

  return (
    <label className={`swap swap-rotate ${className}`}>
      <input
        type="checkbox"
        className="theme-controller"
        value={darkTheme}
        checked={isDark}
        onChange={handleChange}
      />
      {/* sun icon */}
      <svg
        className="swap-off h-8 w-8 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
      </svg>
      {/* moon icon */}
      <svg
        className="swap-on h-8 w-8 fill-current"
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
  initialTheme,
  onChange,
  className = '',
}: ThemeControllerDropdownProps) {
  const [selectedTheme, setSelectedTheme] = useState(() => {
    if (initialTheme) return initialTheme
    const currentTheme = document.documentElement.getAttribute('data-theme')
    if (currentTheme && themes.includes(currentTheme)) return currentTheme
    // Detect system theme preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return themes.find(t => t === 'dark') || themes[0] || 'light'
    }
    return themes.find(t => t === 'light') || themes[0] || 'light'
  })

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    if (initialTheme) {
      setSelectedTheme(initialTheme)
      document.documentElement.setAttribute('data-theme', initialTheme)
    } else if (currentTheme && themes.includes(currentTheme)) {
      setSelectedTheme(currentTheme)
    } else if (!currentTheme && themes.length > 0) {
      // Apply system theme preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const theme = prefersDark
        ? themes.find(t => t === 'dark') || themes[0]
        : themes.find(t => t === 'light') || themes[0]
      setSelectedTheme(theme)
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [initialTheme, themes])

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme)
    document.documentElement.setAttribute('data-theme', theme)
    onChange?.(theme)
  }

  return (
    <div className={`dropdown dropdown-end ${className}`}>
      <div tabIndex={0} role="button" className="btn">
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
        className="dropdown-content bg-base-300 rounded-box z-[1] w-28 p-2 shadow-2xl max-h-96 overflow-y-auto"
      >
        {themes.map((theme) => (
          <li key={theme}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label={theme}
              value={theme}
              checked={selectedTheme === theme}
              onChange={() => handleThemeChange(theme)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export const ThemeController = Object.assign(
  {},
  {
    Swap: ThemeControllerSwap,
    Dropdown: ThemeControllerDropdown,
  }
)
