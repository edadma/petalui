# Typography

Semantic text components for titles, paragraphs, and text formatting.

**Import:** `import { Typography } from 'asterui'`

## Examples

### Titles

```tsx
import React from 'react'
import { Typography } from 'asterui'

const { Title } = Typography

const App: React.FC = () => (
  <div>
    <Title level={1}>h1. Heading</Title>
    <Title level={2}>h2. Heading</Title>
    <Title level={3}>h3. Heading</Title>
    <Title level={4}>h4. Heading</Title>
    <Title level={5}>h5. Heading</Title>
  </div>
)

export default App
```

### Text

```tsx
import React from 'react'
import { Typography, Space } from 'asterui'

const { Text } = Typography

const App: React.FC = () => (
  <Space direction="vertical">
    <Text>Default Text</Text>
    <Text type="secondary">Secondary Text</Text>
    <Text type="success">Success Text</Text>
    <Text type="warning">Warning Text</Text>
    <Text type="danger">Danger Text</Text>
    <Text disabled>Disabled Text</Text>
  </Space>
)

export default App
```

### Text Styles

```tsx
import React from 'react'
import { Typography, Space } from 'asterui'

const { Text } = Typography

const App: React.FC = () => (
  <Space direction="vertical">
    <Text strong>Bold Text</Text>
    <Text italic>Italic Text</Text>
    <Text underline>Underlined Text</Text>
    <Text delete>Strikethrough Text</Text>
    <Text code>Code Text</Text>
    <Text mark>Marked Text</Text>
    <Text keyboard>Keyboard Text</Text>
  </Space>
)

export default App
```

### Copyable

```tsx
import React from 'react'
import { Typography } from 'asterui'

const { Paragraph } = Typography

const App: React.FC = () => (
  <Space direction="vertical">
    <Paragraph copyable>
      This is copyable text. Click the icon to copy.
    </Paragraph>
    <Paragraph copyable={{ text: 'Custom copied text!' }}>
      Copy different text than displayed.
    </Paragraph>
  </Space>
)

export default App
```

### Ellipsis

```tsx
import React from 'react'
import { Typography } from 'asterui'

const { Paragraph } = Typography

const App: React.FC = () => (
  <div className="max-w-md">
    <Paragraph ellipsis>
      This is a very long paragraph that will be truncated...
    </Paragraph>
    <Paragraph ellipsis={{ rows: 2 }}>
      This paragraph will show two lines before truncating...
    </Paragraph>
  </div>
)

export default App
```

## API

### Typography

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Content | `React.ReactNode` | `-` |
| `className` | Additional CSS classes | `string` | `-` |
| `data-testid` | Test ID for testing | `string` | - |

### Title

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `level` | Heading level (h1-h5) | `1 \| 2 \| 3 \| 4 \| 5` | `1` |
| `copyable` | Enable copy to clipboard | `boolean \| { text?: string` | `-` |
| `ellipsis` | Truncate with ellipsis | `boolean \| { rows?: number` | `-` |
| `editable` | Enable inline editing | `boolean` | `false` |
| `className` | Additional CSS classes | `string` | `-` |
| `data-testid` | Test ID for testing | `string` | - |

### Text

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `type` | Text type for styling | `secondary' \| 'success' \| 'warning' \| 'danger` | `-` |
| `disabled` | Disabled style | `boolean` | `false` |
| `strong` | Bold text | `boolean` | `false` |
| `italic` | Italic text | `boolean` | `false` |
| `underline` | Underlined text | `boolean` | `false` |
| `delete` | Strikethrough text | `boolean` | `false` |
| `code` | Code style | `boolean` | `false` |
| `mark` | Highlighted text | `boolean` | `false` |
| `keyboard` | Keyboard style | `boolean` | `false` |
| `size` | Text size | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl' \| '2xl'` | `-` |
| `className` | Additional CSS classes | `string` | `-` |
| `data-testid` | Test ID for testing | `string` | - |

### Paragraph

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `copyable` | Enable copy to clipboard | `boolean \| { text?: string }` | `-` |
| `ellipsis` | Truncate with ellipsis | `boolean \| { rows?: number }` | `-` |
| `size` | Text size | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl' \| '2xl'` | `-` |
| `align` | Text alignment | `'left' \| 'center' \| 'right'` | `-` |
| `className` | Additional CSS classes | `string` | `-` |
| `data-testid` | Test ID for testing | `string` | - |

### Link

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `href` | Link URL | `string` | `'#'` |
| `size` | Text size | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl' \| '2xl'` | `-` |
| `external` | Open in new tab with external icon | `boolean` | `false` |
| `className` | Additional CSS classes | `string` | `-` |
| `data-testid` | Test ID for testing | `string` | - |
