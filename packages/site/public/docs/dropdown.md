# Dropdown

**Import:** `import { Dropdown } from 'asterui'`

Supports both compound pattern and data-driven `items` prop.

## Examples

### Basic Dropdown

Simple dropdown menu with items using compound pattern.

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

### Data-Driven (items prop)

Define menu items via the items prop instead of compound components.

```tsx
import React from 'react'
import { Dropdown, Button } from 'asterui'
import type { DropdownMenuItemType } from 'asterui'
import { PencilIcon, DocumentDuplicateIcon, TrashIcon } from '@heroicons/react/24/outline'

const App: React.FC = () => {
  const items: DropdownMenuItemType[] = [
    { key: 'edit', label: 'Edit', icon: <PencilIcon className="w-4 h-4" /> },
    { key: 'duplicate', label: 'Duplicate', icon: <DocumentDuplicateIcon className="w-4 h-4" /> },
    { type: 'divider' },
    { key: 'delete', label: 'Delete', danger: true, icon: <TrashIcon className="w-4 h-4" /> },
  ]

  return (
    <Dropdown items={items}>
      <Dropdown.Trigger>
        <Button type="primary">Data-Driven</Button>
      </Dropdown.Trigger>
    </Dropdown>
  )
}

export default App
```

### Trigger Modes

Control how the dropdown opens: click, hover, or both.

```tsx
import React from 'react'
import { Dropdown, Button, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="horizontal" size="sm" wrap>
    <Dropdown trigger={['click']}>
      <Dropdown.Trigger>
        <Button>Click</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown trigger={['hover']}>
      <Dropdown.Trigger>
        <Button>Hover</Button>
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

### Context Menu

Open dropdown on right-click using contextMenu trigger.

```tsx
import React from 'react'
import { Dropdown, Typography } from 'asterui'
import { PencilIcon, DocumentDuplicateIcon, TrashIcon } from '@heroicons/react/24/outline'

const App: React.FC = () => (
  <Dropdown trigger={['contextMenu']}>
    <Dropdown.Trigger>
      <div className="p-8 border-2 border-dashed border-base-300 rounded-lg text-center cursor-context-menu">
        <Typography.Text type="secondary">Right-click here</Typography.Text>
      </div>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item icon={<PencilIcon className="w-4 h-4" />}>Edit</Dropdown.Item>
      <Dropdown.Item icon={<DocumentDuplicateIcon className="w-4 h-4" />}>Copy</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item icon={<TrashIcon className="w-4 h-4" />} danger>Delete</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default App
```

### With Submenu

Nested submenus for hierarchical options.

```tsx
import React from 'react'
import { Dropdown, Button } from 'asterui'
import { PencilIcon, FolderIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

const App: React.FC = () => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button>With Submenu</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item icon={<PencilIcon className="w-4 h-4" />}>Edit</Dropdown.Item>
      <Dropdown.SubMenu title="More Options" icon={<FolderIcon className="w-4 h-4" />}>
        <Dropdown.Item>Option A</Dropdown.Item>
        <Dropdown.Item>Option B</Dropdown.Item>
        <Dropdown.Item>Option C</Dropdown.Item>
      </Dropdown.SubMenu>
      <Dropdown.SubMenu title="Settings" icon={<Cog6ToothIcon className="w-4 h-4" />}>
        <Dropdown.Item>Preferences</Dropdown.Item>
        <Dropdown.Item>Account</Dropdown.Item>
      </Dropdown.SubMenu>
      <Dropdown.Divider />
      <Dropdown.Item danger>Delete</Dropdown.Item>
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
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown position="bottom">
      <Dropdown.Trigger>
        <Button>Bottom</Button>
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

## API

### Dropdown

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Trigger element and dropdown content (compound pattern) | `React.ReactNode` | - |
| `items` | Menu items (data-driven pattern) | `DropdownMenuItemType[]` | - |
| `trigger` | Trigger mode(s) for dropdown | `('click' \| 'hover' \| 'contextMenu')[]` | `['click']` |
| `position` | Dropdown menu position | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` |
| `align` | Dropdown menu alignment | `'start' \| 'center' \| 'end'` | `'start'` |
| `open` | Controlled open state | `boolean` | - |
| `onOpenChange` | Callback when open state changes | `(open: boolean, info?: { source }) => void` | - |
| `disabled` | Disable the dropdown | `boolean` | `false` |
| `arrow` | Show arrow pointing to trigger | `boolean \| { pointAtCenter?: boolean }` | `false` |
| `mouseEnterDelay` | Delay before showing on hover (seconds) | `number` | `0.15` |
| `mouseLeaveDelay` | Delay before hiding on mouse leave (seconds) | `number` | `0.1` |
| `destroyOnHidden` | Destroy dropdown when hidden | `boolean` | `false` |
| `className` | Additional CSS classes | `string` | - |

### Dropdown.Item

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Item content | `React.ReactNode` | - |
| `label` | Item label (alternative to children) | `React.ReactNode` | - |
| `icon` | Icon to display before label | `React.ReactNode` | - |
| `itemKey` | Unique key for the item | `string` | - |
| `onClick` | Click handler | `() => void` | - |
| `active` | Active/selected state | `boolean` | `false` |
| `disabled` | Disable the item | `boolean` | `false` |
| `danger` | Danger/destructive styling | `boolean` | `false` |
| `className` | Additional CSS classes | `string` | - |

### Dropdown.SubMenu

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Submenu items | `React.ReactNode` | - |
| `title` | Submenu title/label | `React.ReactNode` | - |
| `icon` | Icon to display before title | `React.ReactNode` | - |
| `itemKey` | Unique key for the submenu | `string` | - |
| `disabled` | Disable the submenu | `boolean` | `false` |

### DropdownMenuItem (for items prop)

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `key` | Unique key for the item | `string` | - |
| `label` | Item label content | `React.ReactNode` | - |
| `icon` | Icon to display before label | `React.ReactNode` | - |
| `disabled` | Disable the item | `boolean` | `false` |
| `danger` | Danger/destructive styling | `boolean` | `false` |
| `onClick` | Click handler | `() => void` | - |
| `children` | Submenu items | `DropdownMenuItem[]` | - |

### Dropdown.Divider

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `className` | Additional CSS classes | `string` | - |
