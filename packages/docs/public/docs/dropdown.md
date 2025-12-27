# Dropdown

**Import:** `import { Dropdown } from 'asterui'`

Supports both compound pattern and data-driven `menu` prop.

**Simplified API:** When using a Button or any interactive element as the only child (or with `menu` prop), you can omit the `Dropdown.Trigger` wrapper. The element will automatically be treated as the trigger.

## Examples

### Basic Dropdown

Simple dropdown menu with items using compound pattern.

```tsx
import React from 'react'
import { Dropdown, Button } from 'asterui'

const App: React.FC = () => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button color="primary">Actions</Button>
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

### Data-Driven (menu prop)

Define menu items via the menu prop instead of compound components.

```tsx
import React from 'react'
import { Dropdown, Button } from 'asterui'
import type { DropdownMenuItemType } from 'asterui'
import { PencilIcon, DocumentDuplicateIcon, TrashIcon } from '@aster-ui/icons'

const App: React.FC = () => {
  const menuItems: DropdownMenuItemType[] = [
    { key: 'edit', label: 'Edit', icon: <PencilIcon size="sm" /> },
    { key: 'duplicate', label: 'Duplicate', icon: <DocumentDuplicateIcon size="sm" /> },
    { type: 'divider' },
    { key: 'delete', label: 'Delete', danger: true, icon: <TrashIcon size="sm" /> },
  ]

  return (
    <Dropdown menu={{ items: menuItems }}>
      <Dropdown.Trigger>
        <Button color="primary">Data-Driven</Button>
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
import { PencilIcon, DocumentDuplicateIcon, TrashIcon } from '@aster-ui/icons'

const App: React.FC = () => (
  <Dropdown trigger={['contextMenu']}>
    <Dropdown.Trigger>
      <div className="p-8 border-2 border-dashed border-base-300 rounded-lg text-center cursor-context-menu">
        <Typography.Text type="secondary">Right-click here</Typography.Text>
      </div>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item icon={<PencilIcon size="sm" />}>Edit</Dropdown.Item>
      <Dropdown.Item icon={<DocumentDuplicateIcon size="sm" />}>Copy</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item icon={<TrashIcon size="sm" />} danger>Delete</Dropdown.Item>
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
import { PencilIcon, FolderIcon, Cog6ToothIcon } from '@aster-ui/icons'

const App: React.FC = () => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button>With Submenu</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item icon={<PencilIcon size="sm" />}>Edit</Dropdown.Item>
      <Dropdown.SubMenu title="More Options" icon={<FolderIcon size="sm" />}>
        <Dropdown.Item>Option A</Dropdown.Item>
        <Dropdown.Item>Option B</Dropdown.Item>
        <Dropdown.Item>Option C</Dropdown.Item>
      </Dropdown.SubMenu>
      <Dropdown.SubMenu title="Settings" icon={<Cog6ToothIcon size="sm" />}>
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

### Compact Button with Dropdown

Combine a button with a dropdown using Join for a compact split-button appearance. The Button is automatically treated as the trigger without needing Dropdown.Trigger wrapper. Opens on hover automatically.

```tsx
import React from 'react'
import { Dropdown, Button, Join } from 'asterui'
import type { DropdownMenuItemType } from 'asterui'
import { UserIcon } from '@aster-ui/icons'

const App: React.FC = () => {
  const menuItems: DropdownMenuItemType[] = [
    { key: 'profile', label: 'Profile' },
    { key: 'settings', label: 'Settings' },
    { type: 'divider' },
    { key: 'logout', label: 'Sign out', danger: true },
  ]

  return (
    <Join>
      <Button color="primary">Actions</Button>
      <Dropdown menu={{ items: menuItems }} placement="bottomRight">
        <Button color="primary" icon={<UserIcon />} />
      </Dropdown>
    </Join>
  )
}

export default App
```

### Compact Icon Dropdown

Icon-only dropdown button joined with another button using the simplified API (no Dropdown.Trigger wrapper needed). Opens on hover for quick access.

```tsx
import React from 'react'
import { Dropdown, Button, Join } from 'asterui'
import { EllipsisVerticalIcon } from '@aster-ui/icons'

const App: React.FC = () => (
  <Join>
    <Button>Save</Button>
    <Dropdown placement="bottomRight">
      <Button icon={<EllipsisVerticalIcon />} />
      <Dropdown.Menu>
        <Dropdown.Item>Save and Close</Dropdown.Item>
        <Dropdown.Item>Save as Draft</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Discard</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Join>
)

export default App
```

### Placement

Dropdown menu can be positioned in different directions.

```tsx
import React from 'react'
import { Dropdown, Button, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="horizontal" size="sm" wrap>
    <Dropdown placement="top">
      <Dropdown.Trigger>
        <Button>Top</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown placement="bottom">
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
| `menu` | Menu configuration (data-driven pattern) | `DropdownMenuConfig` | - |
| `trigger` | Trigger mode(s) for dropdown | `('click' \| 'hover' \| 'contextMenu')[]` | `['hover']` |
| `placement` | Placement of dropdown menu | `'top' \| 'topLeft' \| 'topRight' \| 'bottom' \| 'bottomLeft' \| 'bottomRight' \| 'left' \| 'right'` | `'bottomLeft'` |
| `open` | Controlled open state | `boolean` | - |
| `onOpenChange` | Callback when open state changes | `(open: boolean, info?: { source }) => void` | - |
| `disabled` | Disable the dropdown | `boolean` | `false` |
| `arrow` | Show arrow pointing to trigger | `boolean \| { pointAtCenter?: boolean }` | `false` |
| `autoAdjustOverflow` | Whether to adjust dropdown placement automatically when dropdown is off screen | `boolean` | `true` |
| `mouseEnterDelay` | Delay before showing on hover (seconds) | `number` | `0.15` |
| `mouseLeaveDelay` | Delay before hiding on mouse leave (seconds) | `number` | `0.1` |
| `destroyOnHidden` | Destroy dropdown when hidden | `boolean` | `false` |
| `popupRender` | Customize popup content | `(menu: ReactNode) => ReactNode` | - |
| `data-testid` | Test ID prefix for child elements | `string` | - |
| `className` | Additional CSS classes | `string` | - |

### DropdownMenuConfig

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `items` | Menu items array | `DropdownMenuItemType[]` | - |
| `onClick` | Click handler for menu items | `(info: { key: string; keyPath: string[] }) => void` | - |

### Dropdown.Item

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `key` | Unique key for the item (React key prop) | `string` | - |
| `children` | Item content | `React.ReactNode` | - |
| `label` | Item label (alternative to children) | `React.ReactNode` | - |
| `icon` | Icon to display before label | `React.ReactNode` | - |
| `onClick` | Click handler | `() => void` | - |
| `active` | Active/selected state | `boolean` | `false` |
| `disabled` | Disable the item | `boolean` | `false` |
| `danger` | Danger/destructive styling | `boolean` | `false` |
| `className` | Additional CSS classes | `string` | - |

### Dropdown.SubMenu

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `key` | Unique key for the submenu (React key prop) | `string` | - |
| `children` | Submenu items | `React.ReactNode` | - |
| `title` | Submenu title/label | `React.ReactNode` | - |
| `icon` | Icon to display before title | `React.ReactNode` | - |
| `disabled` | Disable the submenu | `boolean` | `false` |

### DropdownMenuItemType (for menu.items)

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
