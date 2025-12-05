# AsterUI

A comprehensive React component library built with [DaisyUI](https://daisyui.com) and [Tailwind CSS](https://tailwindcss.com).

## Prerequisites

AsterUI requires Tailwind CSS v4 and DaisyUI v5 to be configured in your project.

Install Tailwind and DaisyUI:

```bash
npm install -D tailwindcss @tailwindcss/vite daisyui
```

Add the Tailwind plugin to your `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Configure your CSS file (e.g., `src/index.css`):

```css
@import "tailwindcss";
@plugin "daisyui";
@source "../node_modules/asterui";
```

The `@source` directive tells Tailwind to scan the AsterUI package for classes to include in your build.

## Installation

```bash
npm install asterui
# or
pnpm add asterui
# or
yarn add asterui
```

## Usage

```tsx
import { Form, Input, Checkbox, Button, Modal, Card, Space, Flex, Typography } from 'asterui'

const { Link, Paragraph } = Typography

export default function App() {
  const handleSubmit = (values: { email: string; password: string; remember: boolean }) => {
      Modal.success({
        title: 'Login Successful',
        content: <pre className="text-left">{JSON.stringify(values, null, 2)}</pre>,
      })
  }

  return (
    <Flex justify="center" align="center" minHeight="screen" className="bg-base-200 p-4">
      <Card title="Sign In" className="w-full max-w-md">
        <Form onFinish={handleSubmit} initialValues={{ remember: false }}>
          <Form.Item name="email" label="Email" rules={[{ required: true }, { type: 'email' }]}>
            <Input placeholder="you@example.com" />
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
              { pattern: /[!@#$%^&*.?]/, message: 'Must contain a special character' },
            ]}
          >
            <Input type="password" placeholder="Enter your password" />
          </Form.Item>
          <Space justify="between" align="center" className="mb-4">
            <Form.Item name="remember" valuePropName="checked" inline>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link size="sm">Forgot password?</Link>
          </Space>
          <Button type="primary" htmlType="submit" shape="block">
            Sign In
          </Button>
          <Divider>or</Divider>
          <Paragraph align="center" size="sm">
            Don't have an account? <Link>Sign up</Link>
          </Paragraph>
        </Form>
      </Card>
    </Flex>
  )
}
```

## Components

80+ components including forms, data display, navigation, feedback, and layout. See the full list at [asterui.com/components](https://asterui.com/components).

## Requirements

- React 18 or 19
- Tailwind CSS 4+
- DaisyUI 5+

## License

ISC
