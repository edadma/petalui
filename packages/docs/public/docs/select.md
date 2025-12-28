# Select

Dropdown select component for choosing from a list of options.

**Import:** `import { Select } from 'asterui'`

## Examples

### Basic

```tsx
import React from 'react'
import { Select } from 'asterui'

const App: React.FC = () => (
  <Select defaultValue="">
    <option value="" disabled>Pick your favorite</option>
    <option value="apple">Apple</option>
    <option value="orange">Orange</option>
    <option value="banana">Banana</option>
    <option value="grape">Grape</option>
  </Select>
)

export default App
```

### Default Value

```tsx
import React from 'react'
import { Select } from 'asterui'

const App: React.FC = () => (
  <Select defaultValue="orange">
    <option value="apple">Apple</option>
    <option value="orange">Orange</option>
    <option value="banana">Banana</option>
    <option value="grape">Grape</option>
  </Select>
)

export default App
```

### Options Array

Use the `options` prop for better performance compared to JSX children.

```tsx
import React from 'react'
import { Select, SelectOption } from 'asterui'

const App: React.FC = () => {
  const options: SelectOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Orange', value: 'orange' },
    { label: 'Banana', value: 'banana' },
    { label: 'Grape', value: 'grape' },
    { label: 'Mango (disabled)', value: 'mango', disabled: true },
  ]

  return <Select options={options} defaultValue="orange" />
}

export default App
```

### Sizes

```tsx
import React from 'react'
import { Select, Space } from 'asterui'

const App: React.FC = () => (
  <Space size="xs">
    <Select size="xs">
      <option>Extra small</option>
    </Select>
    <Select size="sm">
      <option>Small</option>
    </Select>
    <Select size="md">
      <option>Medium (default)</option>
    </Select>
    <Select size="lg">
      <option>Large</option>
    </Select>
    <Select size="xl">
      <option>Extra large</option>
    </Select>
  </Space>
)

export default App
```

### Colors

```tsx
import React from 'react'
import { Select, Space } from 'asterui'

const App: React.FC = () => (
  <Space size="xs">
    <Select color="primary">
      <option>Primary</option>
    </Select>
    <Select color="secondary">
      <option>Secondary</option>
    </Select>
    <Select color="accent">
      <option>Accent</option>
    </Select>
    <Select color="info">
      <option>Info</option>
    </Select>
    <Select color="success">
      <option>Success</option>
    </Select>
    <Select color="warning">
      <option>Warning</option>
    </Select>
    <Select color="error">
      <option>Error</option>
    </Select>
  </Space>
)

export default App
```

### Ghost

```tsx
import React from 'react'
import { Select } from 'asterui'

const App: React.FC = () => (
  <Select ghost defaultValue="">
    <option value="" disabled>Pick one</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </Select>
)

export default App
```

### Disabled

```tsx
import React from 'react'
import { Select } from 'asterui'

const App: React.FC = () => (
  <Select disabled>
    <option>Disabled select</option>
  </Select>
)

export default App
```

### Status

Validation status for form feedback.

```tsx
import React from 'react'
import { Select, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="sm">
    <Select status="error" defaultValue="">
      <option value="" disabled>Error state</option>
      <option value="1">Option 1</option>
    </Select>
    <Select status="warning" defaultValue="">
      <option value="" disabled>Warning state</option>
      <option value="1">Option 1</option>
    </Select>
  </Space>
)

export default App
```

### Floating Label

Select with animated floating label.

```tsx
import React from 'react'
import { Select, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="md">
    <Select floatingLabel="Country">
      <option value="us">United States</option>
      <option value="ca">Canada</option>
      <option value="mx">Mexico</option>
    </Select>
    <Select floatingLabel="Language">
      <option value="en">English</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
    </Select>
  </Space>
)

export default App
```

### Addons

Select with text or elements before/after.

```tsx
import React from 'react'
import { Select, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="md">
    <Select addonBefore="Currency">
      <option value="usd">USD</option>
      <option value="eur">EUR</option>
      <option value="gbp">GBP</option>
    </Select>
    <Select addonBefore="$" addonAfter=".00">
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
    </Select>
  </Space>
)

export default App
```

### Form

```tsx
import React from 'react'
import { Form, Select, Button } from 'asterui'

const App: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <Form
      onFinish={handleSubmit}
      initialValues={{ country: 'canada' }}
    >
      <Form.Item
        name="country"
        label="Country"
        required
        rules={{ required: 'Please select a country' }}
      >
        <Select>
          <option value="">Select a country</option>
          <option value="usa">United States</option>
          <option value="canada">Canada</option>
          <option value="mexico">Mexico</option>
          <option value="uk">United Kingdom</option>
        </Select>
      </Form.Item>

      <Form.Item
        name="language"
        label="Language"
        required
        rules={{ required: 'Please select a language' }}
      >
        <Select>
          <option value="">Select a language</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </Select>
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

### Select

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `options` | Select options array (recommended for better performance) | `SelectOption[]` | `-` |
| `size` | Select size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `-` |
| `color` | Select color variant | `'neutral' \| 'primary' \| 'secondary' \| 'accent' \| 'info' \| 'success' \| 'warning' \| 'error'` | `-` |
| `status` | Validation status (takes precedence over color) | `'error' \| 'warning'` | `-` |
| `ghost` | Ghost variant (transparent background) | `boolean` | `false` |
| `bordered` | Show border | `boolean` | `true` |
| `floatingLabel` | Floating label text | `string` | `-` |
| `addonBefore` | Text/element before select (outside) | `React.ReactNode` | `-` |
| `addonAfter` | Text/element after select (outside) | `React.ReactNode` | `-` |
| `disabled` | Disabled state | `boolean` | `false` |
| `defaultValue` | Default selected value | `string` | `-` |
| `value` | Controlled value | `string` | `-` |
| `onChange` | Change event handler | `(e: React.ChangeEvent<HTMLSelectElement>) => void` | `-` |
| `className` | Additional CSS classes | `string` | `-` |
| `data-testid` | Test ID for testing | `string` | - |

### SelectOption

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `label` | Display label for the option | `React.ReactNode` | `-` |
| `value` | Value of the option | `string \| number` | `-` |
| `disabled` | Whether option is disabled | `boolean` | `false` |
