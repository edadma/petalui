# Transfer

Two-column transfer component for moving items between lists.

**Import:** `import { Transfer } from 'asterui'`

## Examples

### Basic

```tsx
import React, { useState } from 'react'
import { Transfer } from 'asterui'

const App: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState(['item-3', 'item-5'])

  const data = Array.from({ length: 10 }, (_, i) => ({
    key: \`item-\${i + 1}\`,
    title: \`Item \${i + 1}\`,
    description: \`Description of item \${i + 1}\`,
  }))

  return (
    <Transfer
      dataSource={data}
      targetKeys={targetKeys}
      onChange={setTargetKeys}
      render={(item) => item.title}
    />
  )
}

export default App
```

### Search

```tsx
import React, { useState } from 'react'
import { Transfer } from 'asterui'

const App: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState([])

  const data = Array.from({ length: 10 }, (_, i) => ({
    key: \`item-\${i + 1}\`,
    title: \`Item \${i + 1}\`,
  }))

  return (
    <Transfer
      dataSource={data}
      targetKeys={targetKeys}
      onChange={setTargetKeys}
      render={(item) => item.title}
      showSearch
    />
  )
}

export default App
```

### Custom Render

```tsx
import React, { useState } from 'react'
import { Transfer } from 'asterui'

const App: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState([])

  const data = [
    { key: '1', title: 'React', description: 'A JavaScript library for building user interfaces' },
    { key: '2', title: 'Vue', description: 'The Progressive JavaScript Framework' },
    { key: '3', title: 'Angular', description: 'Platform for building mobile and desktop web apps' },
  ]

  return (
    <Transfer
      dataSource={data}
      targetKeys={targetKeys}
      onChange={setTargetKeys}
      render={(item) => (
        <div>
          <div className="font-medium">{item.title}</div>
          <div className="text-xs opacity-60">{item.description}</div>
        </div>
      )}
    />
  )
}

export default App
```

### Titles

```tsx
import React, { useState } from 'react'
import { Transfer } from 'asterui'

const App: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState([])

  const data = Array.from({ length: 10 }, (_, i) => ({
    key: \`item-\${i + 1}\`,
    title: \`Item \${i + 1}\`,
  }))

  return (
    <Transfer
      dataSource={data}
      targetKeys={targetKeys}
      onChange={setTargetKeys}
      render={(item) => item.title}
      titles={['Available', 'Selected']}
      showSearch
    />
  )
}

export default App
```

## API

### Transfer

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `dataSource` | Data source array | `TransferItem[]` | `[]` |
| `targetKeys` | Keys of items in the right column | `string[]` | `[]` |
| `onChange` | Callback when items are transferred | `(targetKeys: string[]) => void` | `-` |
| `render` | Custom render function for items | `(item: TransferItem) => React.ReactNode` | `-` |
| `showSearch` | Show search input | `boolean` | `false` |
| `data-testid` | Test ID prefix for child elements | `string` | `-` |
| `className` | Additional CSS classes | `string` | `-` |

### Transfer Item

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `key` | Unique identifier | `string` | `-` |
| `title` | Display title | `string` | `-` |
| `description` | Optional description | `string` | `-` |
| `disabled` | Whether item is disabled | `boolean` | `false` |
