# Dropdown

**Import:** `import { Dropdown } from 'asterui'`

## Examples

### Basic Dropdown

Simple dropdown menu with items.

```tsx
import React from 'react'
import { Dropdown, Button } from 'asterui'

const App: React.FC = () => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button type="primary">Actions</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item>Edit</Dropdown.Item>
      <Dropdown.Item>Duplicate</Dropdown.Item>
      <Dropdown.Item>Delete</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default App
```

### Position

Dropdown menu can be positioned in different directions.

```tsx
import React from 'react'
import { Dropdown, Button, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="horizontal" size="sm" wrap>
    <Dropdown position="top">
      <Dropdown.Trigger>
        <Button>Top</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
        <Dropdown.Item>Option 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown position="bottom">
      <Dropdown.Trigger>
        <Button>Bottom</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
        <Dropdown.Item>Option 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown position="left">
      <Dropdown.Trigger>
        <Button>Left</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
        <Dropdown.Item>Option 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown position="right">
      <Dropdown.Trigger>
        <Button>Right</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
        <Dropdown.Item>Option 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Space>
)

export default App
```

### Alignment

Align the dropdown menu to start, center, or end.

```tsx
import React from 'react'
import { Dropdown, Button, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="horizontal" size="sm" wrap>
    <Dropdown align="start">
      <Dropdown.Trigger>
        <Button>Start</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown align="center">
      <Dropdown.Trigger>
        <Button>Center</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown align="end">
      <Dropdown.Trigger>
        <Button>End</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Space>
)

export default App
```

### Hover to Open

Dropdown opens on hover instead of click.

```tsx
import React from 'react'
import { Dropdown, Button } from 'asterui'

const App: React.FC = () => (
  <Dropdown hover>
    <Dropdown.Trigger>
      <Button type="secondary">Hover Me</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Profile</Dropdown.Item>
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default App
```

### With Icons

Menu items with icons for better visual context.

```tsx
import React from 'react'
import { Dropdown, Button } from 'asterui'
import { PencilIcon, DocumentDuplicateIcon, TrashIcon } from '@heroicons/react/24/outline'

const App: React.FC = () => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button type="primary">Options</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item>
        <PencilIcon className="w-4 h-4 mr-2" />
        Edit
      </Dropdown.Item>
      <Dropdown.Item>
        <DocumentDuplicateIcon className="w-4 h-4 mr-2" />
        Duplicate
      </Dropdown.Item>
      <Dropdown.Item>
        <TrashIcon className="w-4 h-4 mr-2" />
        Delete
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default App
```

### With Divider

Separate menu sections with dividers.

```tsx
import React from 'react'
import { Dropdown, Button } from 'asterui'

const App: React.FC = () => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button>Account</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item>Profile</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>Help</Dropdown.Item>
      <Dropdown.Item danger>Sign out</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default App
```

### Item States

Items can be active, disabled, or styled as danger.

```tsx
import React from 'react'
import { Dropdown, Button } from 'asterui'

const App: React.FC = () => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button>States</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item active>Active Item</Dropdown.Item>
      <Dropdown.Item>Normal Item</Dropdown.Item>
      <Dropdown.Item disabled>Disabled Item</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item danger>Delete Account</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default App
```

### Controlled Mode

Control the dropdown open state externally.

```tsx
import React, { useState } from 'react'
import { Dropdown, Button, Space } from 'asterui'

const App: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <Space direction="horizontal" size="sm">
      <Button onClick={() => setOpen(!open)}>
        Toggle: {open ? 'Open' : 'Closed'}
      </Button>
      <Dropdown open={open} onOpenChange={setOpen}>
        <Dropdown.Trigger>
          <Button type="primary">Controlled</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Option 1</Dropdown.Item>
          <Dropdown.Item>Option 2</Dropdown.Item>
          <Dropdown.Item>Option 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Space>
  )
}

export default App
```

### Disabled Dropdown

Disable the entire dropdown.

```tsx
import React from 'react'
import { Dropdown, Button } from 'asterui'

const App: React.FC = () => (
  <Dropdown disabled>
    <Dropdown.Trigger>
      <Button>Disabled</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item>Option 1</Dropdown.Item>
      <Dropdown.Item>Option 2</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default App
```

### With Arrow

Show an arrow pointing to the trigger.

```tsx
import React from 'react'
import { Dropdown, Button, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="horizontal" size="sm" wrap>
    <Dropdown arrow position="bottom">
      <Dropdown.Trigger>
        <Button>Bottom Arrow</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown arrow position="top">
      <Dropdown.Trigger>
        <Button>Top Arrow</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Space>
)

export default App
```

## API

### Dropdown

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Trigger element and dropdown content | `React.ReactNode` | - |
| `position` | Dropdown menu position | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` |
| `align` | Dropdown menu alignment | `'start' \| 'center' \| 'end'` | `'start'` |
| `hover` | Open on hover instead of click | `boolean` | `false` |
| `open` | Controlled open state | `boolean` | - |
| `onOpenChange` | Callback when open state changes | `(open: boolean) => void` | - |
| `disabled` | Disable the dropdown | `boolean` | `false` |
| `arrow` | Show arrow pointing to trigger | `boolean` | `false` |
| `className` | Additional CSS classes | `string` | - |

### Dropdown.Trigger

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Trigger content (typically a Button) | `React.ReactNode` | - |
| `className` | Additional CSS classes | `string` | - |

### Dropdown.Menu

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Menu items | `React.ReactNode` | - |
| `className` | Additional CSS classes | `string` | - |

### Dropdown.Item

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Item content | `React.ReactNode` | - |
| `onClick` | Click handler | `() => void` | - |
| `active` | Active/selected state | `boolean` | `false` |
| `disabled` | Disable the item | `boolean` | `false` |
| `danger` | Danger/destructive styling | `boolean` | `false` |
| `className` | Additional CSS classes | `string` | - |

### Dropdown.Divider

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `className` | Additional CSS classes | `string` | - |
