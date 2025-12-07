# Input

**Import:** `import { Input } from 'asterui'`

## Examples

### Basic Input

Simple text input field.

```tsx
import React from 'react'
import { Input } from 'asterui'

const App: React.FC = () => (
  <Input placeholder="Enter text..." />
)

export default App
```

### Sizes

Five sizes: xs, sm, md (default), lg, and xl.

```tsx
import React from 'react'
import { Input, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="sm">
    <Input size="xs" placeholder="Extra small" />
    <Input size="sm" placeholder="Small" />
    <Input size="md" placeholder="Medium (default)" />
    <Input size="lg" placeholder="Large" />
    <Input size="xl" placeholder="Extra large" />
  </Space>
)

export default App
```

### Colors

Different color variants for visual emphasis.

```tsx
import React from 'react'
import { Input, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="sm">
    <Input color="primary" placeholder="Primary" />
    <Input color="secondary" placeholder="Secondary" />
    <Input color="accent" placeholder="Accent" />
    <Input color="info" placeholder="Info" />
    <Input color="success" placeholder="Success" />
    <Input color="warning" placeholder="Warning" />
    <Input color="error" placeholder="Error" />
  </Space>
)

export default App
```

### Input Types

Different HTML input types.

```tsx
import React from 'react'
import { Input, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="sm">
    <Input type="text" placeholder="Text input" />
    <Input type="email" placeholder="Email input" />
    <Input type="password" placeholder="Password input" />
    <Input type="number" placeholder="Number input" />
    <Input type="tel" placeholder="Telephone input" />
    <Input type="url" placeholder="URL input" />
    <Input type="search" placeholder="Search input" />
  </Space>
)

export default App
```

### Variants

Bordered and ghost styles.

```tsx
import React from 'react'
import { Input, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="sm">
    <Input placeholder="Default bordered" />
    <Input bordered={false} placeholder="Without border" />
    <Input ghost placeholder="Ghost variant" />
  </Space>
)

export default App
```

### Input Mask

Formatted input with masking pattern.

```tsx
import React from 'react'
import { Input, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="sm">
    <Input mask="(###) ###-####" placeholder="Phone number" />
    <Input mask="####-####-####-####" placeholder="Credit card" />
    <Input mask="##/##/####" placeholder="Date (MM/DD/YYYY)" />
    <Input mask="AA-####" placeholder="License plate" />
  </Space>
)

export default App
```

### Controlled Input

Input with controlled state.

```tsx
import React, { useState } from 'react'
import { Input, Space } from 'asterui'

const App: React.FC = () => {
  const [value, setValue] = useState('')

  return (
    <Space direction="vertical" size="sm">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
      <div className="text-sm text-base-content/70">
        Value: {value || '(empty)'}
      </div>
    </Space>
  )
}

export default App
```

### Disabled

Disabled input state.

```tsx
import React from 'react'
import { Input, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="sm">
    <Input placeholder="Normal input" />
    <Input placeholder="Disabled input" disabled />
    <Input value="Disabled with value" disabled />
  </Space>
)

export default App
```

### Floating Label

Input with animated floating label that moves above when focused or filled.

```tsx
import React, { useState } from 'react'
import { Input, Space } from 'asterui'

const App: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Space direction="vertical" size="md">
      <Input
        floatingLabel="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        floatingLabel="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </Space>
  )
}

export default App
```

### Addons

Input with text or elements before/after (outside the input field).

```tsx
import React from 'react'
import { Input, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="md">
    <Input addonBefore="https://" placeholder="your-site.com" />
    <Input addonAfter=".com" placeholder="username" />
    <Input addonBefore="$" addonAfter=".00" placeholder="0" />
  </Space>
)

export default App
```

## API

### Input

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `type` | HTML input type | `text' \| 'password' \| 'email' \| 'number' \| 'date' \| 'datetime-local' \| 'week' \| 'month' \| 'tel' \| 'url' \| 'search' \| 'time` | `text` |
| `size` | Input size | `xs' \| 'sm' \| 'md' \| 'lg' \| 'xl` | `md` |
| `color` | Input color variant | `neutral' \| 'primary' \| 'secondary' \| 'accent' \| 'info' \| 'success' \| 'warning' \| 'error` | `-` |
| `ghost` | Ghost variant (transparent) | `boolean` | `false` |
| `bordered` | Show border (set to false to remove) | `boolean` | `true` |
| `mask` | Input mask pattern. Use # for digits, A for letters, * for alphanumeric | `string` | `-` |
| `maskPlaceholder` | Placeholder character shown in mask | `string` | `_` |
| `floatingLabel` | Floating label text (uses DaisyUI floating-label) | `string` | `-` |
| `addonBefore` | Text/element before input (outside) | `React.ReactNode` | `-` |
| `addonAfter` | Text/element after input (outside) | `React.ReactNode` | `-` |
| `disabled` | Disabled state | `boolean` | `false` |
| `placeholder` | Placeholder text | `string` | `-` |
| `value` | Input value | `string` | `-` |
| `onChange` | Change event handler | `(e: React.ChangeEvent<HTMLInputElement>) => void` | `-` |
| `className` | Additional CSS classes | `string` | `-` |
