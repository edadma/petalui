<p align="center">
  <img src="logo.png" alt="AsterUI Logo" width="200">
</p>

# AsterUI

A comprehensive React component library built with [DaisyUI](https://daisyui.com) and [Tailwind CSS](https://tailwindcss.com).

## Demo

View the documentation at: [https://asterui.com](https://asterui.com)

## Quick Start

The fastest way to get started is with `create-asterui`, which sets up a new project with Vite, Tailwind CSS v4, DaisyUI v5, and AsterUI pre-configured:

```bash
npm create asterui@latest
# or
pnpm create asterui@latest
# or
yarn create asterui
```

The CLI will guide you through interactive prompts to configure:
- **Language** - TypeScript (recommended) or JavaScript
- **Themes** - Light/Dark, Business/Corporate, all themes, or custom selection
- **Package manager** - npm, pnpm, or yarn (auto-detected)
- **Optional components** - Chart, QRCode, VirtualList (adds required peer dependencies)

You can also pass arguments directly:

```bash
npm create asterui@latest my-app
npm create asterui@latest my-app --js          # Use JavaScript instead of TypeScript
npm create asterui@latest my-app --themes all  # Include all DaisyUI themes
```

Then start the dev server:

```bash
cd my-app
npm run dev
```

## Manual Installation

To add AsterUI to an existing project, you'll need Tailwind CSS v4 and DaisyUI v5.

### 1. Install dependencies

```bash
npm install asterui
npm install -D tailwindcss @tailwindcss/vite daisyui
```

### 2. Configure Vite

Add the Tailwind plugin to your `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### 3. Configure CSS

Update your CSS file (e.g., `src/index.css`):

```css
@import "tailwindcss";
@plugin "daisyui";
@source "../node_modules/asterui";
```

The `@source` directive tells Tailwind to scan the AsterUI package for classes to include in your build.

## Usage

```tsx
import { Form, Input, Checkbox, Button, Modal, Card, Flex, Space, Divider, Typography } from 'asterui'

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
      <Card title="Sign In" className="w-full max-w-sm">
        <Form onFinish={handleSubmit} initialValues={{ remember: false }}>
        <Form.Item name="email" label="Email" rules={[{ required: true }, { type: 'email' }]}>
          <Input className="w-full" placeholder="you@example.com" />
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
          <Input className="w-full" type="password" placeholder="Enter your password" />
        </Form.Item>
        <Space justify="between" align="center" className="mb-4">
          <Form.Item name="remember" valuePropName="checked" inline>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Link size="sm">Forgot password?</Link>
        </Space>
        <Button color="primary" htmlType="submit" shape="block">
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

103 components including forms, data display, navigation, feedback, and layout. See the full list at [asterui.com/components](https://asterui.com/components).

## Optional Components

Some components require additional peer dependencies and use separate imports:

```bash
# For Chart component
npm install apexcharts
import { Chart } from 'asterui/chart'

# For QRCode component
npm install qrcode
import { QRCode } from 'asterui/qrcode'

# For VirtualList component
npm install @tanstack/react-virtual
import { VirtualList } from 'asterui/virtuallist'
```

## Development

This is a pnpm monorepo with the following packages:

- `packages/asterui` - The component library (103 components)
- `packages/create-asterui` - Project scaffolding CLI
- `packages/docs` - Documentation website (asterui.com)
- `packages/examples` - Example apps for testing components

### Setup

```bash
# Enable corepack (if not already enabled)
corepack enable

# Install dependencies
pnpm install

# Start documentation site
pnpm dev

# Build all packages
pnpm build
```

### Publishing

```bash
cd packages/asterui
pnpm publish
```

## License

ISC
