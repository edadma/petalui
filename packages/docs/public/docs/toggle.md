# Toggle

Binary switch control for on/off states.

**Import:** `import { Toggle } from 'asterui'`

## Examples

### Basic

```tsx
import React from 'react'
import { Toggle } from 'asterui'

const App: React.FC = () => (
  <Toggle />
)

export default App
```

### Sizes

```tsx
import React from 'react'
import { Toggle, Space } from 'asterui'

const App: React.FC = () => (
  <Space>
    <Toggle size="xs" defaultChecked />
    <Toggle size="sm" defaultChecked />
    <Toggle size="md" defaultChecked />
    <Toggle size="lg" defaultChecked />
  </Space>
)

export default App
```

### Colors

```tsx
import React from 'react'
import { Toggle, Space } from 'asterui'

const App: React.FC = () => (
  <Space>
    <Toggle color="primary" defaultChecked />
    <Toggle color="secondary" defaultChecked />
    <Toggle color="accent" defaultChecked />
    <Toggle color="info" defaultChecked />
    <Toggle color="success" defaultChecked />
    <Toggle color="warning" defaultChecked />
    <Toggle color="error" defaultChecked />
  </Space>
)

export default App
```

### Controlled

```tsx
import React, { useState } from 'react'
import { Toggle } from 'asterui'

const App: React.FC = () => {
  const [checked, setChecked] = useState(false)

  return (
    <div className="flex items-center gap-4">
      <Toggle
        checked={checked}
        onChange={(checked) => setChecked(checked)}
        color="primary"
      />
      <span>Toggle is {checked ? 'ON' : 'OFF'}</span>
    </div>
  )
}

export default App
```

### Form

```tsx
import React from 'react'
import { Form, Toggle, Button } from 'asterui'

const App: React.FC = () => {
  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="notifications"
        label="Enable notifications"
        valuePropName="checked"
      >
        <Toggle color="primary" />
      </Form.Item>

      <Form.Item
        name="darkMode"
        label="Dark mode"
        valuePropName="checked"
      >
        <Toggle color="secondary" />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" color="primary">
          Save Settings
        </Button>
      </Form.Item>
    </Form>
  )
}

export default App
```

## API

### Toggle

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `checked` | Controlled checked state | `boolean` | `-` |
| `defaultChecked` | Default checked state (uncontrolled) | `boolean` | `false` |
| `onChange` | Callback when toggle state changes | `(checked: boolean, event: ChangeEvent<HTMLInputElement>) => void` | `-` |
| `size` | Toggle size | `xs' \| 'sm' \| 'md' \| 'lg` | `md` |
| `color` | Toggle color | `primary' \| 'secondary' \| 'accent' \| 'info' \| 'success' \| 'warning' \| 'error` | `-` |
| `disabled` | Disable the toggle | `boolean` | `false` |
| `className` | Additional CSS classes | `string` | `-` |
