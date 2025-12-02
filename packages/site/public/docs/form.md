# Form

**Import:** `import { Form } from '@edadma/bloomui'`

## Examples

### Basic Form

Simple login form with username and password fields.

```tsx
import React from 'react'
import { Form, Input, Button } from '@edadma/bloomui'

const App: React.FC = () => {
  const handleFinish = (values: any) => {
    console.log('Form values:', values)
  }

  return (
    <Form onFinish={handleFinish}>
      <Form.Item name="username" label="Username">
        <Input placeholder="Enter username" />
      </Form.Item>
      <Form.Item name="password" label="Password">
        <Input type="password" placeholder="Enter password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}

export default App
```

### Form Validation

Form with validation rules. Rules can be a single object or an array of rules.

```tsx
import React from 'react'
import { Form, Input, Button } from '@edadma/bloomui'

const App: React.FC = () => {
  return (
    <Form onFinish={(values) => console.log('Success:', values)}>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true }, { type: 'email' }]}
      >
        <Input placeholder="name@example.com" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true },
          { min: 8, message: 'Password must be at least 8 characters' },
          { pattern: /[A-Z]/, message: 'Must contain an uppercase letter' },
          { pattern: /[a-z]/, message: 'Must contain a lowercase letter' },
          { pattern: /[0-9]/, message: 'Must contain a number' },
        ]}
      >
        <Input type="password" placeholder="Enter password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  )
}

export default App
```

### Checkbox with valuePropName

Use `valuePropName="checked"` for checkboxes and toggles. Use `inline` for auto-width items.

```tsx
import React from 'react'
import { Form, Input, Checkbox, Button } from '@edadma/bloomui'

const App: React.FC = () => {
  return (
    <Form onFinish={(values) => console.log(values)} initialValues={{ remember: false }}>
      <Form.Item name="email" label="Email" rules={{ required: true, type: 'email' }}>
        <Input placeholder="you@example.com" />
      </Form.Item>
      <div className="flex justify-between items-center mb-4">
        <Form.Item name="remember" valuePropName="checked" inline>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <a href="#" className="link link-primary text-sm">Forgot password?</a>
      </div>
      <Button type="primary" htmlType="submit" shape="block">Sign In</Button>
    </Form>
  )
}

export default App
```

### Form Layouts

Different form layouts: horizontal, vertical, and inline.

```tsx
import React, { useState } from 'react'
import { Form, Input, Button, Radio, Space } from '@edadma/bloomui'

const App: React.FC = () => {
  const [layout, setLayout] = useState<'horizontal' | 'vertical' | 'inline'>('vertical')

  return (
    <Space direction="vertical" size="lg" className="w-full">
      <Radio.Group
        value={layout}
        onChange={(e) => setLayout(e.target.value as typeof layout)}
      >
        <Radio value="vertical">Vertical</Radio>
        <Radio value="horizontal">Horizontal</Radio>
        <Radio value="inline">Inline</Radio>
      </Radio.Group>

      <Form layout={layout} onFinish={(values) => console.log(values)}>
        <Form.Item name="name" label="Name" required>
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item name="email" label="Email" required>
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Space>
  )
}

export default App
```

### Initial Values

Form with pre-populated initial values.

```tsx
import React from 'react'
import { Form, Input, Button } from '@edadma/bloomui'

const App: React.FC = () => {
  const initialValues = {
    username: 'john_doe',
    email: 'john@example.com',
    bio: 'Software developer'
  }

  const handleFinish = (values: any) => {
    console.log('Updated values:', values)
  }

  return (
    <Form initialValues={initialValues} onFinish={handleFinish}>
      <Form.Item name="username" label="Username">
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>
      <Form.Item name="bio" label="Bio">
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Profile
        </Button>
      </Form.Item>
    </Form>
  )
}

export default App
```

## API

### Form

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `onFinish` | Success handler (called when validation passes) | `(values: any) => void` | `-` |
| `onFinishFailed` | Failed handler (called when validation fails) | `(errorInfo: any) => void` | `-` |
| `initialValues` | Initial form field values | `Record<string, any>` | `-` |
| `layout` | Form layout orientation | `'horizontal' \| 'vertical' \| 'inline'` | `'vertical'` |
| `disabled` | Disable all form fields | `boolean` | `false` |
| `children` | Form content (Form.Item elements) | `React.ReactNode` | `-` |
| `className` | Additional CSS classes | `string` | `-` |

### Form.Item

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `name` | Field name (required for validation) | `string` | `-` |
| `label` | Field label text | `string` | `-` |
| `rules` | Validation rules (see below) | `object` | `-` |
| `required` | Mark field as required (shorthand) | `boolean` | `false` |
| `valuePropName` | Prop name for value (e.g., `'checked'` for checkboxes) | `string` | `'value'` |
| `inline` | Render with auto width instead of full width | `boolean` | `false` |
| `children` | Form control element (Input, Select, etc.) | `React.ReactNode` | `-` |
| `className` | Additional CSS classes | `string` | `-` |

### Validation Rules

The `rules` prop accepts a single rule object or an array of rules. Each rule can have:

| Property | Description | Type |
|----------|-------------|------|
| `required` | Field is required | `boolean \| string` |
| `type` | Built-in type validation | `'email' \| 'url' \| 'number'` |
| `min` | Minimum length | `number \| { value: number; message: string }` |
| `max` | Maximum length | `number \| { value: number; message: string }` |
| `pattern` | Regex validation | `RegExp \| { value: RegExp; message: string }` |
| `message` | Error message for this rule | `string` |
| `validate` | Custom validation function | `(value: any) => boolean \| string` |

**Array rules example:**
```tsx
rules={[
  { required: true },
  { min: 8, message: 'At least 8 characters' },
  { pattern: /[A-Z]/, message: 'Must contain uppercase' },
]}
```

**Single object (also supported):**
```tsx
rules={{ required: true, type: 'email' }}
```
