# ContextMenu

Right-click context menu component for displaying contextual actions.

## Import

```tsx
import { ContextMenu } from 'asterui'
```

## Basic Usage

```tsx
<ContextMenu onSelect={(key) => notification.info({ message: `Selected: ${key}` })}>
  <div className="p-8 bg-base-200 rounded cursor-context-menu">
    Right-click here
  </div>
  <ContextMenu.Item itemKey="copy">Copy</ContextMenu.Item>
  <ContextMenu.Item itemKey="paste">Paste</ContextMenu.Item>
  <ContextMenu.Item itemKey="cut">Cut</ContextMenu.Item>
</ContextMenu>
```

## Data-Driven Pattern

```tsx
<ContextMenu
  items={[
    { key: 'cut', label: 'Cut' },
    { key: 'copy', label: 'Copy' },
    { key: 'paste', label: 'Paste' },
  ]}
  onSelect={(key) => notification.info({ message: `Selected: ${key}` })}
>
  <div className="p-8 bg-base-200 rounded cursor-context-menu">
    Right-click here
  </div>
</ContextMenu>
```

## With Icons

```tsx
<ContextMenu
  items={[
    { key: 'edit', label: 'Edit', icon: <EditIcon /> },
    { key: 'delete', label: 'Delete', icon: <TrashIcon />, danger: true },
  ]}
  onSelect={handleAction}
>
  <div>Right-click for options</div>
</ContextMenu>
```

## Disabled Items

```tsx
<ContextMenu
  items={[
    { key: 'copy', label: 'Copy' },
    { key: 'paste', label: 'Paste', disabled: true },
  ]}
  onSelect={handleAction}
>
  <div>Some options disabled</div>
</ContextMenu>
```

## With Dividers

```tsx
<ContextMenu
  items={[
    { key: 'cut', label: 'Cut' },
    { key: 'copy', label: 'Copy' },
    { key: 'divider1', divider: true },
    { key: 'delete', label: 'Delete', danger: true },
  ]}
  onSelect={handleAction}
>
  <div>Grouped options</div>
</ContextMenu>
```

## Nested Submenus

```tsx
<ContextMenu
  items={[
    { key: 'new', label: 'New', children: [
      { key: 'new-file', label: 'File' },
      { key: 'new-folder', label: 'Folder' },
    ]},
    { key: 'open', label: 'Open' },
  ]}
  onSelect={handleAction}
>
  <div>Right-click for nested menu</div>
</ContextMenu>
```

## API

### ContextMenu Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| children | Trigger element (first child) and menu items (compound pattern) | `React.ReactNode` | - |
| items | Menu items (data-driven pattern) | `ContextMenuItem[]` | - |
| onSelect | Selection callback | `(key: string) => void` | - |
| disabled | Whether the context menu is disabled | `boolean` | `false` |
| className | Additional CSS classes | `string` | - |

### ContextMenuItem (for items prop)

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| key | Unique identifier | `string` | - |
| label | Display text | `React.ReactNode` | - |
| icon | Icon element | `React.ReactNode` | - |
| disabled | Disable item | `boolean` | `false` |
| danger | Show as danger/destructive action | `boolean` | `false` |
| divider | Render as a divider | `boolean` | `false` |
| children | Submenu items | `ContextMenuItem[]` | - |

### ContextMenu.Item (compound pattern)

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| itemKey | Unique key for the item | `string` | - |
| children | Item content | `React.ReactNode` | - |
| icon | Icon to display before label | `React.ReactNode` | - |
| disabled | Whether the item is disabled | `boolean` | `false` |
| danger | Show as danger/destructive action | `boolean` | `false` |

### ContextMenu.SubMenu (compound pattern)

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| itemKey | Unique key for the submenu | `string` | - |
| label | Submenu label | `React.ReactNode` | - |
| icon | Icon to display before label | `React.ReactNode` | - |
| disabled | Whether the submenu is disabled | `boolean` | `false` |
| children | Submenu items | `React.ReactNode` | - |

## Accessibility

- Menu opens on right-click (contextmenu event)
- Keyboard navigation with arrow keys
- Escape closes the menu
- Click outside closes the menu
