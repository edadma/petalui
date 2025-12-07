# Navbar

Navigation bar component with flexible layout for headers and app bars.

**Import:** `import { Navbar } from 'asterui'`

## Examples

### Basic Navbar

Simple navbar with title and navigation buttons.

```tsx
import React from 'react'
import { Navbar, Button, Typography, Flex } from 'asterui'

const App: React.FC = () => (
  <Navbar
    start={<Typography.Text strong className="text-xl">AsterUI</Typography.Text>}
    end={
      <Flex gap="sm">
        <Button type="ghost">Home</Button>
        <Button type="ghost">About</Button>
        <Button type="primary">Sign In</Button>
      </Flex>
    }
  />
)

export default App
```

### With Dropdown Menu

Navbar with a dropdown menu for additional options.

```tsx
import React from 'react'
import { Navbar, Button, Dropdown, Typography, Flex } from 'asterui'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const App: React.FC = () => (
  <Navbar
    start={<Typography.Text strong className="text-xl">AsterUI</Typography.Text>}
    end={
      <Flex gap="sm">
        <Button type="ghost">Home</Button>
        <Dropdown>
          <Dropdown.Trigger>
            <Button type="ghost">
              Products
              <ChevronDownIcon className="w-4 h-4 ml-1" />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Product 1</Dropdown.Item>
            <Dropdown.Item>Product 2</Dropdown.Item>
            <Dropdown.Item>Product 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button type="ghost">About</Button>
        <Button type="primary">Sign In</Button>
      </Flex>
    }
  />
)

export default App
```

### With Menu Icon

Navbar with a hamburger menu dropdown.

```tsx
import React from 'react'
import { Navbar, Button, Dropdown, Typography } from 'asterui'

const App: React.FC = () => (
  <Navbar
    start={
      <Dropdown>
        <Dropdown.Trigger>
          <Button type="ghost" shape="circle">☰</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Home</Dropdown.Item>
          <Dropdown.Item>Products</Dropdown.Item>
          <Dropdown.Item>About</Dropdown.Item>
          <Dropdown.Item>Contact</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    }
    center={<Typography.Text strong className="text-xl">AsterUI</Typography.Text>}
    end={<Button type="primary">Sign In</Button>}
  />
)

export default App
```

### Color Variants

Navbar with different background color variants.

```tsx
import React from 'react'
import { Navbar, Button, Typography, Flex } from 'asterui'

const App: React.FC = () => (
  <Flex direction="column" gap="md">
    <Navbar
      color="neutral"
      start={<Typography.Text strong className="text-xl">Neutral</Typography.Text>}
      end={<Button type="ghost">Action</Button>}
    />
    <Navbar
      color="primary"
      start={<Typography.Text strong className="text-xl">Primary</Typography.Text>}
      end={<Button type="ghost">Action</Button>}
    />
    <Navbar
      color="secondary"
      start={<Typography.Text strong className="text-xl">Secondary</Typography.Text>}
      end={<Button type="ghost">Action</Button>}
    />
  </Flex>
)

export default App
```

### With Shadow

Navbar with shadow for elevated appearance.

```tsx
import React from 'react'
import { Navbar, Button, Typography, Flex } from 'asterui'

const App: React.FC = () => (
  <Navbar
    shadow="md"
    start={<Typography.Text strong className="text-xl">AsterUI</Typography.Text>}
    end={
      <Flex gap="sm">
        <Button type="ghost">Home</Button>
        <Button type="primary">Sign In</Button>
      </Flex>
    }
  />
)

export default App
```

### Rounded Corners

Navbar with rounded corners for a softer look.

```tsx
import React from 'react'
import { Navbar, Button, Typography, Flex } from 'asterui'

const App: React.FC = () => (
  <Navbar
    color="neutral"
    rounded="lg"
    start={<Typography.Text strong className="text-xl">AsterUI</Typography.Text>}
    end={
      <Flex gap="sm">
        <Button type="ghost">Home</Button>
        <Button type="primary">Sign In</Button>
      </Flex>
    }
  />
)

export default App
```

## API

### Navbar

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `start` | Content for the start section of the navbar (typically logo/brand) | `React.ReactNode` | `-` |
| `center` | Content for the center section of the navbar | `React.ReactNode` | `-` |
| `end` | Content for the end section of the navbar (typically actions/menu) | `React.ReactNode` | `-` |
| `children` | Custom content that replaces the three-section layout | `React.ReactNode` | `-` |
| `color` | Background color variant | `'base' \| 'neutral' \| 'primary' \| 'secondary' \| 'accent'` | `'base'` |
| `sticky` | Make navbar sticky at the top | `boolean` | `false` |
| `shadow` | Shadow depth | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'none'` |
| `rounded` | Border radius | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'none'` |
| `className` | Additional CSS classes | `string` | `-` |
