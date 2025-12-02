# Responsive Utilities

Components and hooks for building responsive layouts based on screen size.

**Import:** `import { Show, Hide, useBreakpoint } from '@edadma/bloomui'`

## Breakpoints

BloomUI uses Tailwind CSS breakpoints:

| Breakpoint | Min Width |
|------------|-----------|
| `xs` | 0px |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

## Examples

### Show Above Breakpoint

Show content only at medium screens and above.

```tsx
import React from 'react'
import { Show, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Show above="md">
    <Button type="primary">Visible on md and larger</Button>
  </Show>
)

export default App
```

### Hide Below Breakpoint

Hide content on small screens.

```tsx
import React from 'react'
import { Hide, Navbar } from '@edadma/bloomui'

const App: React.FC = () => (
  <Hide below="md">
    <Navbar>Desktop Navigation</Navbar>
  </Hide>
)

export default App
```

### Show At Specific Breakpoints

Show content only at specific breakpoints.

```tsx
import React from 'react'
import { Show, Alert } from '@edadma/bloomui'

const App: React.FC = () => (
  <>
    <Show at="xs">
      <Alert type="info">Mobile view only</Alert>
    </Show>
    <Show at={['md', 'lg']}>
      <Alert type="success">Tablet or small desktop</Alert>
    </Show>
  </>
)

export default App
```

### Show Between Breakpoints

Show content within a range of breakpoints.

```tsx
import React from 'react'
import { Show, Card } from '@edadma/bloomui'

const App: React.FC = () => (
  <Show between={['sm', 'lg']}>
    <Card title="Responsive Content">
      Visible on sm, md, and lg screens only
    </Card>
  </Show>
)

export default App
```

### Responsive Layout

Build different layouts for mobile and desktop.

```tsx
import React from 'react'
import { Show, Hide, Button, Flex } from '@edadma/bloomui'

const App: React.FC = () => (
  <Flex justify="between" align="center" className="p-4 bg-base-200">
    <div className="font-bold">Logo</div>

    {/* Desktop navigation */}
    <Show above="md">
      <Flex gap="md">
        <Button type="ghost">Home</Button>
        <Button type="ghost">About</Button>
        <Button type="ghost">Contact</Button>
      </Flex>
    </Show>

    {/* Mobile menu button */}
    <Hide above="md">
      <Button type="ghost">Menu</Button>
    </Hide>
  </Flex>
)

export default App
```

### useBreakpoint Hook

Access breakpoint info programmatically.

```tsx
import React from 'react'
import { useBreakpoint, Card, Typography } from '@edadma/bloomui'

const { Text } = Typography

const App: React.FC = () => {
  const { breakpoint, width, isAbove, isBelow } = useBreakpoint()

  return (
    <Card title="Current Breakpoint">
      <Text>Breakpoint: {breakpoint}</Text>
      <Text>Width: {width}px</Text>
      <Text>Is desktop: {isAbove('lg') ? 'Yes' : 'No'}</Text>
      <Text>Is mobile: {isBelow('md') ? 'Yes' : 'No'}</Text>
    </Card>
  )
}

export default App
```

## API

### Show / Hide Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Content to show/hide | `ReactNode` | `-` |
| `above` | Show/hide at this breakpoint and above | `Breakpoint` | `-` |
| `below` | Show/hide below this breakpoint | `Breakpoint` | `-` |
| `at` | Show/hide at exactly this breakpoint (or array) | `Breakpoint \| Breakpoint[]` | `-` |
| `between` | Show/hide between two breakpoints (inclusive) | `[Breakpoint, Breakpoint]` | `-` |

### useBreakpoint Return Value

| Property | Description | Type |
|----------|-------------|------|
| `breakpoint` | Current active breakpoint | `Breakpoint` |
| `width` | Current window width in pixels | `number` |
| `isAbove(bp)` | Returns true if current breakpoint >= bp | `(bp: Breakpoint) => boolean` |
| `isBelow(bp)` | Returns true if current breakpoint < bp | `(bp: Breakpoint) => boolean` |
| `isAt(bp)` | Returns true if current breakpoint === bp | `(bp: Breakpoint) => boolean` |
| `isBetween(min, max)` | Returns true if between min and max (inclusive) | `(min: Breakpoint, max: Breakpoint) => boolean` |

### Breakpoint Type

```tsx
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
```

## Notes

- `Show` and `Hide` use JavaScript to detect the breakpoint, not CSS media queries
- Only one condition prop (`above`, `below`, `at`, or `between`) should be used at a time
- The hook updates on window resize to track the current breakpoint
- Server-side rendering defaults to 1024px width (lg breakpoint)
