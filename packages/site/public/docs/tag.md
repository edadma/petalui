# Tag

Labels for categorizing, marking, and organizing content.

**Import:** `import { Tag, CheckableTag, TagLiveRegion } from 'asterui'`

## Examples

### Basic

```tsx
import React from 'react'
import { Tag, Space } from 'asterui'

const App: React.FC = () => (
  <Space size="sm" wrap>
    <Tag>Default</Tag>
    <Tag color="primary">Primary</Tag>
    <Tag color="secondary">Secondary</Tag>
    <Tag color="accent">Accent</Tag>
    <Tag color="info">Info</Tag>
    <Tag color="success">Success</Tag>
    <Tag color="warning">Warning</Tag>
    <Tag color="error">Error</Tag>
  </Space>
)

export default App
```

### Variants

```tsx
import React from 'react'
import { Tag, Space } from 'asterui'

const App: React.FC = () => (
  <Space size="sm" wrap>
    <Tag color="primary" variant="filled">Filled</Tag>
    <Tag color="primary" variant="outlined">Outlined</Tag>
    <Tag color="primary" variant="soft">Soft</Tag>
    <Tag color="primary" variant="dash">Dash</Tag>
  </Space>
)

export default App
```

### Closable

```tsx
import React, { useState } from 'react'
import { Tag, Space, TagLiveRegion } from 'asterui'

const App: React.FC = () => {
  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3'])

  const handleClose = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <>
      <TagLiveRegion />
      <Space size="sm" wrap>
        {tags.map((tag) => (
          <Tag
            key={tag}
            closable
            color="primary"
            onClose={() => handleClose(tag)}
          >
            {tag}
          </Tag>
        ))}
      </Space>
    </>
  )
}

export default App
```

### Controlled Visibility

```tsx
import React, { useState } from 'react'
import { Tag, Button, Space } from 'asterui'

const App: React.FC = () => {
  const [visible, setVisible] = useState(true)

  return (
    <Space size="sm" align="center">
      <Tag color="primary" visible={visible} closable onClose={() => setVisible(false)}>
        Controlled Tag
      </Tag>
      {!visible && (
        <Button size="sm" onClick={() => setVisible(true)}>
          Show Tag
        </Button>
      )}
    </Space>
  )
}

export default App
```

### Sizes

```tsx
import React from 'react'
import { Tag, Space } from 'asterui'

const App: React.FC = () => (
  <Space size="sm" align="center" wrap>
    <Tag color="primary" size="xs">Extra Small</Tag>
    <Tag color="primary" size="sm">Small</Tag>
    <Tag color="primary" size="md">Medium</Tag>
    <Tag color="primary" size="lg">Large</Tag>
    <Tag color="primary" size="xl">Extra Large</Tag>
  </Space>
)

export default App
```

### Custom Colors

```tsx
import React from 'react'
import { Tag, Space } from 'asterui'

const App: React.FC = () => (
  <Space size="sm" wrap>
    <Tag color="#f50">Red</Tag>
    <Tag color="#2db7f5">Blue</Tag>
    <Tag color="#87d068">Green</Tag>
    <Tag color="#108ee9">Cyan</Tag>
    <Tag color="#f5222d">Crimson</Tag>
  </Space>
)

export default App
```

### Link Tags

```tsx
import React from 'react'
import { Tag, Space } from 'asterui'

const App: React.FC = () => (
  <Space size="sm" wrap>
    <Tag color="primary" href="https://github.com" target="_blank">
      GitHub
    </Tag>
    <Tag color="info" href="/docs">
      Documentation
    </Tag>
  </Space>
)

export default App
```

### Disabled

```tsx
import React from 'react'
import { Tag, CheckableTag, Space } from 'asterui'

const App: React.FC = () => (
  <Space size="sm" wrap>
    <Tag color="primary" disabled>Disabled Tag</Tag>
    <Tag color="primary" closable disabled>Disabled Closable</Tag>
    <CheckableTag disabled>Disabled Checkable</CheckableTag>
  </Space>
)

export default App
```

### Checkable

```tsx
import React, { useState } from 'react'
import { CheckableTag, Space } from 'asterui'

const App: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(['React'])

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag)
    setSelectedTags(nextSelectedTags)
  }

  const tags = ['React', 'Vue', 'Angular', 'Svelte']

  return (
    <Space size="sm" wrap>
      {tags.map((tag) => (
        <CheckableTag
          key={tag}
          checked={selectedTags.includes(tag)}
          onChange={(checked) => handleChange(tag, checked)}
        >
          {tag}
        </CheckableTag>
      ))}
    </Space>
  )
}

export default App
```

### Checkable with Colors and Sizes

```tsx
import React, { useState } from 'react'
import { CheckableTag, Space } from 'asterui'

const App: React.FC = () => {
  const [checked, setChecked] = useState([true, false, false])

  return (
    <Space direction="vertical" size="md">
      <Space size="sm" wrap>
        <CheckableTag checked={checked[0]} onChange={(c) => setChecked([c, checked[1], checked[2]])} color="success" size="sm">
          Success
        </CheckableTag>
        <CheckableTag checked={checked[1]} onChange={(c) => setChecked([checked[0], c, checked[2]])} color="warning" size="md">
          Warning
        </CheckableTag>
        <CheckableTag checked={checked[2]} onChange={(c) => setChecked([checked[0], checked[1], c])} color="error" size="lg">
          Error
        </CheckableTag>
      </Space>
    </Space>
  )
}

export default App
```

## API

### Tag

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `closable` | Show close icon and enable closing | `boolean` | `false` |
| `closeIcon` | Custom close icon element | `ReactNode` | `-` |
| `onClose` | Callback when tag is closed | `() => void` | `-` |
| `color` | Tag color (preset or custom hex) | `'primary' \| 'secondary' \| 'accent' \| 'neutral' \| 'info' \| 'success' \| 'warning' \| 'error' \| 'ghost' \| string` | `-` |
| `icon` | Icon element to display before text | `ReactNode` | `-` |
| `size` | Tag size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `variant` | Tag style variant | `'filled' \| 'outlined' \| 'soft' \| 'dash'` | `'filled'` |
| `visible` | Controlled visibility state | `boolean` | `-` |
| `disabled` | Disable interactions | `boolean` | `false` |
| `href` | Render tag as a link | `string` | `-` |
| `target` | Link target (when href is set) | `string` | `-` |
| `children` | Tag content | `ReactNode` | `-` |
| `className` | Additional CSS classes | `string` | `-` |
| `data-testid` | Test ID for the component | `string` | `'tag'` |
| `aria-label` | Accessible label (used in close button announcement) | `string` | `-` |

### CheckableTag

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `checked` | Whether tag is checked | `boolean` | `false` |
| `onChange` | Callback when checked state changes | `(checked: boolean) => void` | `-` |
| `icon` | Icon element to display before text | `ReactNode` | `-` |
| `size` | Tag size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `color` | Tag color when checked | `'primary' \| 'secondary' \| 'accent' \| 'neutral' \| 'info' \| 'success' \| 'warning' \| 'error' \| 'ghost'` | `'primary'` |
| `disabled` | Disable interactions | `boolean` | `false` |
| `children` | Tag content | `ReactNode` | `-` |
| `className` | Additional CSS classes | `string` | `-` |
| `data-testid` | Test ID for the component | `string` | `'checkable-tag'` |

### TagLiveRegion

A helper component that provides a live region for screen reader announcements when tags are removed. Include it once in your app if you're using closable tags.

```tsx
import { TagLiveRegion } from 'asterui'

// In your app root or layout
<TagLiveRegion />
```

## Accessibility

The Tag components follow accessibility best practices:

- CheckableTag uses `role="checkbox"` with `aria-checked`
- CheckableTag supports keyboard navigation (Enter/Space to toggle)
- Close buttons have descriptive `aria-label` (e.g., "Remove Tag 1")
- Visible focus indicators on interactive elements
- `TagLiveRegion` announces tag removals to screen readers
- `aria-disabled` attribute set when disabled

## Testing

The component exposes `data-testid` attributes for testing:

| Element | Test ID |
|---------|---------|
| Tag root | `{baseTestId}` |
| Close button | `{baseTestId}-close` |
| CheckableTag root | `{baseTestId}` |

Data attributes:
- `data-state`: `'checked'` or `'unchecked'` (CheckableTag only)
- `data-disabled`: Present when disabled

Pass a custom `data-testid` prop to use a different base ID:

```tsx
<Tag data-testid="user-role">Admin</Tag>
// Results in: user-role, user-role-close (if closable)
```
