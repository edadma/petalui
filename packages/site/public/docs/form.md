# Form

**Import:** `import { Form } from 'asterui'`

## Examples

### Basic Form

Simple login form with username and password fields.

```tsx
import React from 'react'
import { Form, Input, Button, Modal } from 'asterui'

const App: React.FC = () => {
  const handleFinish = (values: any) => {
    Modal.success({
      title: 'Form Submitted',
      content: <pre>{JSON.stringify(values, null, 2)}</pre>,
    })
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
        <Button color="primary" htmlType="submit">
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
import { Form, Input, Button, Modal } from 'asterui'

const App: React.FC = () => {
  const handleFinish = (values: any) => {
    Modal.success({
      title: 'Form Submitted',
      content: <pre>{JSON.stringify(values, null, 2)}</pre>,
    })
  }

  return (
    <Form onFinish={handleFinish}>
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
        <Button color="primary" htmlType="submit">Submit</Button>
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
import { Form, Input, Checkbox, Button, Modal } from 'asterui'

const App: React.FC = () => {
  const handleFinish = (values: any) => {
    Modal.success({
      title: 'Form Submitted',
      content: <pre>{JSON.stringify(values, null, 2)}</pre>,
    })
  }

  return (
    <Form onFinish={handleFinish} initialValues={{ remember: false }}>
      <Form.Item name="email" label="Email" rules={{ required: true, type: 'email' }}>
        <Input placeholder="you@example.com" />
      </Form.Item>
      <div className="flex justify-between items-center mb-4">
        <Form.Item name="remember" valuePropName="checked" inline>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <a href="#" className="link link-primary text-sm">Forgot password?</a>
      </div>
      <Button color="primary" htmlType="submit" shape="block">Sign In</Button>
    </Form>
  )
}

export default App
```

### Form Layouts

Different form layouts: horizontal, vertical, and inline.

```tsx
import React, { useState } from 'react'
import { Form, Input, Button, Radio, Space, Modal } from 'asterui'

const App: React.FC = () => {
  const [layout, setLayout] = useState<'horizontal' | 'vertical' | 'inline'>('vertical')

  const handleFinish = (values: any) => {
    Modal.success({
      title: 'Form Submitted',
      content: <pre>{JSON.stringify(values, null, 2)}</pre>,
    })
  }

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

      <Form layout={layout} onFinish={handleFinish}>
        <Form.Item name="name" label="Name" required>
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item name="email" label="Email" required>
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item>
          <Button color="primary" htmlType="submit">
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
import { Form, Input, Button, Textarea, Modal } from 'asterui'

const App: React.FC = () => {
  const initialValues = {
    username: 'john_doe',
    email: 'john@example.com',
    bio: 'Software developer'
  }

  const handleFinish = (values: any) => {
    Modal.success({
      title: 'Form Submitted',
      content: <pre>{JSON.stringify(values, null, 2)}</pre>,
    })
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
        <Textarea rows={3} />
      </Form.Item>
      <Form.Item>
        <Button color="primary" htmlType="submit">
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
| `labelWidth` | Label width in pixels for horizontal layout | `number` | `60` |
| `disabled` | Disable all form fields | `boolean` | `false` |
| `children` | Form content (Form.Item elements) | `React.ReactNode` | `-` |
| `className` | Additional CSS classes | `string` | `-` |

### Form.Item

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `name` | Field name (required for validation) | `string` | `-` |
| `label` | Field label text | `string` | `-` |
| `floatingLabel` | Floating label text (alternative to label) | `string` | `-` |
| `addonBefore` | Text/element before input (outside) | `React.ReactNode` | `-` |
| `addonAfter` | Text/element after input (outside) | `React.ReactNode` | `-` |
| `rules` | Validation rules (see below) | `object` | `-` |
| `required` | Mark field as required (shorthand) | `boolean` | `false` |
| `valuePropName` | Prop name for value (e.g., `'checked'` for checkboxes) | `string` | `'value'` |
| `inline` | Render with auto width instead of full width | `boolean` | `false` |
| `tooltip` | Tooltip text to show next to label | `string` | `-` |
| `extra` | Additional content below the form control | `React.ReactNode` | `-` |
| `hasFeedback` | Show validation feedback icon (checkmark or X) | `boolean` | `false` |
| `dependencies` | Field names that trigger re-validation when changed | `string[]` | `-` |
| `validateTrigger` | When to validate | `'onChange' \| 'onBlur' \| 'onSubmit' \| array` | `'onChange'` |
| `initialValue` | Initial value for this field (overrides Form initialValues) | `any` | `-` |
| `hidden` | Hide field but still validate and submit | `boolean` | `false` |
| `children` | Form control element (Input, Select, etc.) | `React.ReactNode` | `-` |
| `className` | Additional CSS classes | `string` | `-` |

### Form.ErrorList

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `fields` | Specific field names to show errors for (shows all if not specified) | `string[]` | `-` |
| `className` | Additional CSS classes | `string` | `-` |

## Advanced Examples

### Tooltip & Extra

Show help icons and additional text below fields.

```tsx
import React from 'react'
import { Form, Input, Button, Modal } from 'asterui'

const App: React.FC = () => {
  const handleFinish = (values: any) => {
    Modal.success({
      title: 'Form Submitted',
      content: <pre>{JSON.stringify(values, null, 2)}</pre>,
    })
  }

  return (
    <Form onFinish={handleFinish}>
      <Form.Item
        name="username"
        label="Username"
        tooltip="Your unique identifier"
        extra="Must be 3-20 characters"
        rules={[{ required: true }, { min: 3 }, { max: 20 }]}
      >
        <Input placeholder="Choose a username" />
      </Form.Item>
      <Form.Item>
        <Button color="primary" htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  )
}

export default App
```

### Field Dependencies (Password Confirmation)

Re-validate confirm password when password changes.

```tsx
import React from 'react'
import { Form, Input, Button, Modal } from 'asterui'

const App: React.FC = () => {
  const form = Form.useForm()

  const handleFinish = (values: any) => {
    Modal.success({
      title: 'Form Submitted',
      content: <pre>{JSON.stringify(values, null, 2)}</pre>,
    })
  }

  return (
    <Form form={form} onFinish={handleFinish}>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true }, { min: 8 }]}
      >
        <Input type="password" placeholder="Enter password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your password' },
          {
            validate: (value) => {
              const password = form.getValues('password')
              return value === password || 'Passwords do not match'
            },
          },
        ]}
      >
        <Input type="password" placeholder="Confirm password" />
      </Form.Item>
      <Form.Item>
        <Button color="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  )
}

export default App
```

### Validation Feedback Icons

Show checkmark or X icons inside inputs.

```tsx
<Form.Item
  name="email"
  label="Email"
  hasFeedback
  rules={[{ required: true }, { type: 'email' }]}
>
  <Input placeholder="you@example.com" />
</Form.Item>
```

### Floating Labels

Form.Item with floating labels that animate when focused.

```tsx
import React from 'react'
import { Form, Input, Button, Modal } from 'asterui'

const App: React.FC = () => {
  const handleFinish = (values: any) => {
    Modal.success({
      title: 'Form Submitted',
      content: <pre>{JSON.stringify(values, null, 2)}</pre>,
    })
  }

  return (
    <Form onFinish={handleFinish}>
      <Form.Item name="fullName" floatingLabel="Full Name" required>
        <Input />
      </Form.Item>
      <Form.Item name="email" floatingLabel="Email Address" required>
        <Input type="email" />
      </Form.Item>
      <Form.Item name="password" floatingLabel="Password" required>
        <Input type="password" />
      </Form.Item>
      <Form.Item>
        <Button color="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  )
}

export default App
```

### Form Addons

Form.Item with text/elements before or after inputs.

```tsx
import React from 'react'
import { Form, Input, Button, Modal } from 'asterui'

const App: React.FC = () => {
  const handleFinish = (values: any) => {
    Modal.success({
      title: 'Form Submitted',
      content: <pre>{JSON.stringify(values, null, 2)}</pre>,
    })
  }

  return (
    <Form onFinish={handleFinish}>
      <Form.Item name="website" label="Website" addonBefore="https://">
        <Input placeholder="your-site.com" />
      </Form.Item>
      <Form.Item name="price" label="Price" addonBefore="$" addonAfter=".00">
        <Input type="number" placeholder="0" />
      </Form.Item>
      <Form.Item name="email" label="Email" addonAfter="@company.com">
        <Input placeholder="username" />
      </Form.Item>
      <Form.Item>
        <Button color="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default App
```

### Form.ErrorList

Display all errors in one place.

```tsx
import React from 'react'
import { Form, Input, Button, Modal } from 'asterui'

const App: React.FC = () => {
  const handleFinish = (values: any) => {
    Modal.success({
      title: 'Form Submitted',
      content: <pre>{JSON.stringify(values, null, 2)}</pre>,
    })
  }

  return (
    <Form onFinish={handleFinish}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true }, { type: 'email' }]}>
        <Input />
      </Form.Item>
      <div className="mb-4">
        <Form.ErrorList className="bg-error/10 p-3 rounded-lg" />
      </div>
      <Button color="primary" htmlType="submit">Submit</Button>
    </Form>
  )
}

export default App
```

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
