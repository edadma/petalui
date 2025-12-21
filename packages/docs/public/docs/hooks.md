# Hooks

Utility hooks for common UI patterns and state management.

**Import:** `import { useDisclosure, useClipboard, useLocalStorage, ... } from 'asterui'`

## useDisclosure

Manages open/close state for modals, drawers, dropdowns, and other toggleable UI.

```tsx
import { useDisclosure, Modal, Button } from 'asterui'

const App: React.FC = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal open={isOpen} onClose={onClose} title="Example">
        Modal content here
      </Modal>
    </>
  )
}
```

### useDisclosure Return Value

| Property | Type | Description |
|----------|------|-------------|
| `isOpen` | `boolean` | Current open state |
| `onOpen` | `() => void` | Function to open |
| `onClose` | `() => void` | Function to close |
| `onToggle` | `() => void` | Function to toggle |
| `setIsOpen` | `(value: boolean) => void` | Direct state setter |

## useClipboard

Copy text to clipboard with success/error feedback.

```tsx
import { useClipboard, Button, Input } from 'asterui'

const App: React.FC = () => {
  const { copy, copied, error } = useClipboard({ timeout: 2000 })

  return (
    <div className="flex gap-2">
      <Input value="Text to copy" readOnly />
      <Button onClick={() => copy('Text to copy')}>
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  )
}
```

### useClipboard Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `timeout` | `number` | `2000` | Ms before `copied` resets to false |

### useClipboard Return Value

| Property | Type | Description |
|----------|------|-------------|
| `copy` | `(text: string) => Promise<void>` | Function to copy text |
| `copied` | `boolean` | True after successful copy (resets after timeout) |
| `error` | `Error \| null` | Error if copy failed |

## useLocalStorage

useState that persists to localStorage and syncs across browser tabs.

```tsx
import { useLocalStorage } from 'asterui'

const App: React.FC = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current: {theme}
    </button>
  )
}
```

### useLocalStorage Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `key` | `string` | localStorage key |
| `initialValue` | `T` | Default value if key doesn't exist |

### useLocalStorage Return Value

Returns `[value, setValue]` tuple like useState, plus syncs across tabs.

## useDebounce

Delays updating a value until after a specified delay. Useful for search inputs.

```tsx
import { useState } from 'react'
import { useDebounce, Input } from 'asterui'

const App: React.FC = () => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  // API call only triggers when debouncedSearch changes
  useEffect(() => {
    if (debouncedSearch) {
      fetchResults(debouncedSearch)
    }
  }, [debouncedSearch])

  return <Input value={search} onChange={(e) => setSearch(e.target.value)} />
}
```

### useDebounce Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `T` | Value to debounce |
| `delay` | `number` | Delay in milliseconds |

## useClickOutside

Detects clicks outside a referenced element. Useful for closing dropdowns/modals.

```tsx
import { useRef } from 'react'
import { useClickOutside, useDisclosure } from 'asterui'

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { isOpen, onClose, onToggle } = useDisclosure()

  useClickOutside(ref, onClose)

  return (
    <div>
      <button onClick={onToggle}>Toggle Dropdown</button>
      {isOpen && (
        <div ref={ref} className="dropdown-content">
          Dropdown content - click outside to close
        </div>
      )}
    </div>
  )
}
```

### useClickOutside Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ref` | `RefObject<HTMLElement>` | Ref to the element |
| `handler` | `(event: MouseEvent \| TouchEvent) => void` | Callback when clicking outside |

## usePrevious

Returns the value from the previous render. Useful for comparing changes.

```tsx
import { useState } from 'react'
import { usePrevious } from 'asterui'

const App: React.FC = () => {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

  return (
    <div>
      <p>Current: {count}, Previous: {prevCount ?? 'N/A'}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  )
}
```

### usePrevious Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `T` | Current value to track |

Returns `T | undefined` (undefined on first render).

## useHover

Tracks hover state of an element.

```tsx
import { useHover } from 'asterui'

const App: React.FC = () => {
  const { ref, isHovered } = useHover<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={isHovered ? 'bg-primary text-primary-content' : 'bg-base-200'}
    >
      {isHovered ? 'Hovering!' : 'Hover me'}
    </div>
  )
}
```

### useHover Return Value

| Property | Type | Description |
|----------|------|-------------|
| `ref` | `RefObject<T>` | Ref to attach to target element |
| `isHovered` | `boolean` | Whether element is being hovered |

## useKeyPress

Detects when a specific key is pressed.

```tsx
import { useKeyPress } from 'asterui'

const App: React.FC = () => {
  const escapePressed = useKeyPress('Escape')
  const enterPressed = useKeyPress('Enter')

  return (
    <div>
      <p>Escape: {escapePressed ? 'Pressed' : 'Released'}</p>
      <p>Enter: {enterPressed ? 'Pressed' : 'Released'}</p>
    </div>
  )
}
```

### useKeyPressCallback

Alternative that triggers a callback instead of returning state.

```tsx
import { useKeyPressCallback, useDisclosure } from 'asterui'

const App: React.FC = () => {
  const { isOpen, onClose } = useDisclosure(true)

  useKeyPressCallback('Escape', onClose)

  return isOpen ? <div>Press Escape to close</div> : null
}
```

### useKeyPress Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `target` | `HTMLElement \| Window` | `window` | Element to listen on |
| `event` | `'keydown' \| 'keyup'` | `'keydown'` | Event type |
| `preventDefault` | `boolean` | `false` | Prevent default browser behavior |

## useWindowSize

Tracks window dimensions, updating on resize.

```tsx
import { useWindowSize } from 'asterui'

const App: React.FC = () => {
  const { width, height } = useWindowSize()

  return (
    <div>
      Window: {width} x {height}
      {width < 768 && <p>Mobile view</p>}
    </div>
  )
}
```

### useWindowSize Return Value

| Property | Type | Description |
|----------|------|-------------|
| `width` | `number` | Current window width in pixels |
| `height` | `number` | Current window height in pixels |

## useBreakpoint

Detects current responsive breakpoint based on window width.

```tsx
import { useBreakpoint } from 'asterui'

const App: React.FC = () => {
  const { breakpoint, isAbove, isBelow } = useBreakpoint()

  return (
    <div>
      <p>Current breakpoint: {breakpoint}</p>
      {isBelow('md') && <MobileNav />}
      {isAbove('md') && <DesktopNav />}
    </div>
  )
}
```

### useBreakpoint Return Value

| Property | Type | Description |
|----------|------|-------------|
| `breakpoint` | `Breakpoint` | Current breakpoint: `xs`, `sm`, `md`, `lg`, `xl`, `2xl` |
| `width` | `number` | Current window width in pixels |
| `isAbove(bp)` | `(bp: Breakpoint) => boolean` | True if at or above breakpoint |
| `isBelow(bp)` | `(bp: Breakpoint) => boolean` | True if below breakpoint |
| `isAt(bp)` | `(bp: Breakpoint) => boolean` | True if exactly at breakpoint |
| `isBetween(min, max)` | `(min, max) => boolean` | True if between breakpoints |

## useTheme

Detects and controls the current theme with system preference support. Provides computed color values for canvas-based components.

### With ThemeProvider (Recommended)

Wrap your app with `ThemeProvider` to enable full theme control including system preference detection and localStorage persistence:

```tsx
// main.tsx
import { ThemeProvider } from 'asterui'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="system">
    <App />
  </ThemeProvider>
)
```

```tsx
// App.tsx
import { useTheme } from 'asterui'

const App: React.FC = () => {
  const { theme, setTheme, resolvedTheme, isDark, colors } = useTheme()

  return (
    <div>
      <p>Selected: {theme}</p>
      <p>Applied: {resolvedTheme}</p>
      <p>Mode: {isDark ? 'Dark' : 'Light'}</p>

      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  )
}
```

### ThemeProvider Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `defaultTheme` | `string` | `'system'` | Initial theme. Use `'system'` to follow browser preference. |
| `storageKey` | `string \| false` | `'asterui-theme'` | localStorage key for persistence. Set to `false` to disable. |
| `lightTheme` | `string` | `'light'` | Theme to use when system preference is light. |
| `darkTheme` | `string` | `'dark'` | Theme to use when system preference is dark. |
| `isDarkTheme` | `(theme: string) => boolean` | - | Custom function to determine if a theme is dark. |

### Standalone (Without ThemeProvider)

When used without a provider, `useTheme` provides read-only access to theme state:

```tsx
import { useTheme } from 'asterui'

const App: React.FC = () => {
  const { isDark, colors } = useTheme()

  return (
    <div style={{ background: colors.background, color: colors.foreground }}>
      Current theme: {isDark ? 'Dark' : 'Light'}
    </div>
  )
}
```

### useTheme Return Value

| Property | Type | Description |
|----------|------|-------------|
| `theme` | `string \| undefined` | Selected theme (e.g., `'system'`, `'light'`, `'dark'`). Only with ThemeProvider. |
| `resolvedTheme` | `string \| undefined` | Actual applied theme after resolving `'system'`. Only with ThemeProvider. |
| `isDark` | `boolean` | True if dark mode is active |
| `setTheme` | `(theme: string) => void \| undefined` | Function to change theme. Only with ThemeProvider. |
| `colors` | `ThemeColors` | Computed theme colors as hex values |
| `systemTheme` | `'light' \| 'dark' \| undefined` | System preference. Only with ThemeProvider. |

### ThemeColors

| Property | Type | Description |
|----------|------|-------------|
| `background` | `string` | Base background color as hex (DaisyUI base-100) |
| `foreground` | `string` | Base text color as hex (DaisyUI base-content) |
| `primary` | `string` | Primary color as hex |
| `primaryContent` | `string` | Primary content color as hex |
| `secondary` | `string` | Secondary color as hex |
| `accent` | `string` | Accent color as hex |
| `info` | `string` | Info color as hex |
| `success` | `string` | Success color as hex |
| `warning` | `string` | Warning color as hex |
| `error` | `string` | Error color as hex |
