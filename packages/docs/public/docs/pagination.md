# Pagination

Navigate through pages of data.

**Import:** `import { Pagination } from 'asterui'`

## Examples

### Basic

```tsx
import React, { useState } from 'react'
import { Pagination } from 'asterui'

const App: React.FC = () => {
  const [current, setCurrent] = useState(1)

  return (
    <Pagination
      current={current}
      total={85}
      onChange={setCurrent}
    />
  )
}

export default App
```

### Size Changer

```tsx
import React, { useState } from 'react'
import { Pagination } from 'asterui'

const App: React.FC = () => {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  return (
    <Pagination
      current={current}
      total={500}
      pageSize={pageSize}
      showSizeChanger
      onChange={(page, size) => {
        setCurrent(page)
        setPageSize(size)
      }}
    />
  )
}

export default App
```

### Show Total

```tsx
import React from 'react'
import { Pagination } from 'asterui'

const App: React.FC = () => (
  <Pagination total={250} showTotal />
)

export default App
```

### Custom Total

```tsx
import React from 'react'
import { Pagination } from 'asterui'

const App: React.FC = () => (
  <Pagination
    total={250}
    showTotal={(total, range) =>
      \`Showing \${range[0]}-\${range[1]} of \${total} items\`
    }
  />
)

export default App
```

### Quick Jumper

```tsx
import React from 'react'
import { Pagination } from 'asterui'

const App: React.FC = () => (
  <Pagination total={500} showQuickJumper />
)

export default App
```

### All Features

```tsx
import React, { useState } from 'react'
import { Pagination } from 'asterui'

const App: React.FC = () => {
  const [current, setCurrent] = useState(1)

  return (
    <Pagination
      current={current}
      total={500}
      showSizeChanger
      showQuickJumper
      showTotal={(total, range) =>
        \`\${range[0]}-\${range[1]} of \${total}\`
      }
      onChange={setCurrent}
    />
  )
}

export default App
```

### Simple

```tsx
import React from 'react'
import { Pagination } from 'asterui'

const App: React.FC = () => (
  <Pagination total={100} simple />
)

export default App
```

### Sizes

```tsx
import React from 'react'
import { Pagination } from 'asterui'

const App: React.FC = () => (
  <div className="space-y-4">
    <Pagination total={100} size="xs" />
    <Pagination total={100} size="sm" />
    <Pagination total={100} size="md" />
    <Pagination total={100} size="lg" />
  </div>
)

export default App
```

### Disabled

```tsx
import React from 'react'
import { Pagination } from 'asterui'

const App: React.FC = () => (
  <Pagination total={100} disabled />
)

export default App
```

## API

### Pagination

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `current` | Current page number (controlled) | `number` | - |
| `defaultCurrent` | Default initial page number | `number` | `1` |
| `total` | Total number of items | `number` | - |
| `pageSize` | Number of items per page (controlled) | `number` | - |
| `defaultPageSize` | Default number of items per page | `number` | `10` |
| `pageSizeOptions` | Options for page size selector | `number[]` | `[10, 20, 50, 100]` |
| `onChange` | Callback when page or pageSize changes | `(page: number, pageSize: number) => void` | - |
| `onShowSizeChange` | Callback when pageSize changes | `(current: number, size: number) => void` | - |
| `showSizeChanger` | Show page size selector | `boolean` | `false` |
| `showQuickJumper` | Show quick jump to page input | `boolean` | `false` |
| `showTotal` | Show total count or custom render function | `boolean \| ((total: number, range: [number, number]) => ReactNode)` | `false` |
| `simple` | Simple mode with minimal controls | `boolean` | `false` |
| `size` | Size of pagination buttons | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `disabled` | Disable all pagination controls | `boolean` | `false` |
| `data-testid` | Test ID prefix for child elements | `string` | - |
| `className` | Additional CSS classes | `string` | - |
