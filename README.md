<p align="center">
  <img src="logo.png" alt="BloomUI Logo" width="200">
</p>

# BloomUI

A comprehensive React component library built with DaisyUI and Tailwind CSS.

## Demo

View the documentation at: [https://bloomui.io](https://bloomui.io)

## Prerequisites

BloomUI requires Tailwind CSS v4 and DaisyUI to be configured in your project.

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
@source "../node_modules/@edadma/bloomui";
```

The `@source` directive tells Tailwind to scan the BloomUI package for classes to include in your build.

## Installation

```bash
npm install bloomui
# or
pnpm add bloomui
# or
yarn add bloomui
```

## Usage

```tsx
import { Form, Input, Checkbox, Button, Modal, Card, Space, Flex, Typography } from '@edadma/bloomui'

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

### General
- **Typography** - Text, Title, Paragraph, and Link components with consistent styling

### Actions
- **Button** - Buttons with multiple types, sizes, and variants
- **Dropdown** - Composable dropdown menu with trigger, items, and dividers
- **ThemeController** - Theme switcher with swap and dropdown modes

### Data Entry
- **Autocomplete** - Search and select with keyboard navigation and filtering
- **Cascader** - Cascade selection for hierarchical data
- **Checkbox** - Checkboxes with sizes, colors, and indeterminate state
- **ColorPicker** - Color selection with presets and custom colors
- **DatePicker** - Interactive calendar date picker with custom formatting
- **Fieldset** - Fieldset container with legend
- **FileInput** - File input with sizes and colors
- **Form** - Form component with React Hook Form integration and validation
- **Input** - Text inputs with types, sizes, colors, and input masking
- **InputNumber** - Numeric input with increment/decrement controls
- **Label** - Form labels with required indicator and floating labels
- **Mention** - Input with @mention support for tagging users
- **Radio** - Radio buttons with group support
- **Range** - Range slider with min, max, and step support
- **Rating** - Star rating component
- **Select** - Select dropdown with sizes and colors
- **Textarea** - Multiline text input
- **TimePicker** - Time input with hour and minute selection
- **Toggle** - Toggle switches with sizes and colors
- **Transfer** - Double-column transfer for moving items between lists
- **TreeSelect** - Tree selection dropdown for hierarchical data
- **Upload** - File upload with drag and drop support

### Data Display
- **Avatar** - User avatars with sizes, shapes, and group support
- **Badge** - Notification badges, status indicators, and ribbons
- **Card** - Composable card component with body, title, actions, and figure
- **Carousel** - Image carousel with navigation and indicators
- **Chart** - Data visualization with ApexCharts and theme integration
- **Chat** - Chat message bubbles with avatars and timestamps
- **Collapse** - Collapsible content panels
- **Descriptions** - Display multiple read-only fields in groups
- **Empty** - Empty state placeholder with custom images and actions
- **Image** - Image component with fallback and preview support
- **List** - Vertical list layout with customizable rows
- **Pagination** - Page navigation with multiple sizes
- **QRCode** - QR code generator
- **Stats** - Statistics display with figures and actions
- **Steps** - Step progress indicator
- **Table** - Feature-rich data table with sorting and pagination
- **Tag** - Categorization labels with colors and close button
- **Timeline** - Timeline component for displaying chronological events
- **Tree** - Hierarchical tree view with expand/collapse and selection

### Layout
- **Affix** - Make elements stick to viewport when scrolling
- **Divider** - Horizontal and vertical dividers with optional text
- **Drawer** - Sidebar drawer with multiple placements
- **Footer** - Footer component with title sections
- **Grid** - Flexible grid system with Row and Col components
- **Hero** - Hero section with overlay and content wrapping
- **Indicator** - Position indicators on elements
- **Join** - Join multiple elements together seamlessly
- **Layout** - Page layout with Header, Sider, Content, and Footer
- **Masonry** - Responsive masonry grid layout
- **Space** - Layout component for consistent spacing between elements
- **Splitter** - Resizable split panes for adjustable layouts

### Responsive
- **Show/Hide** - Conditionally render content based on breakpoint
- **useBreakpoint** - Hook for detecting current breakpoint and screen width

### Navigation
- **Breadcrumb** - Breadcrumb navigation trail
- **Menu** - Menu with vertical, horizontal, and inline modes
- **Navbar** - Navigation bar with start, center, and end sections
- **Tabs** - Tab navigation with multiple variants

### Feedback
- **Alert** - Alert messages with multiple types and dismissible option
- **FloatButton** - Floating action button with BackTop variant
- **Loading** - Loading spinners with sizes and overlay support
- **Modal** - Modal dialogs with imperative API
- **Notification** - Toast notifications with auto-dismiss and stacking
- **Popconfirm** - Confirmation popover for actions
- **Popover** - Floating content triggered by hover or click
- **Progress** - Progress bars with colors and indeterminate state
- **RadialProgress** - Circular progress indicator
- **Result** - Result pages for operation outcomes
- **Skeleton** - Loading placeholder with animated shimmer effect
- **Tooltip** - Tooltips with multiple placements

### Mockup
- **Browser** - Browser window mockup with URL bar
- **Code** - Terminal-style code display with line highlighting
- **Phone** - iPhone-style phone frame mockup
- **Window** - OS-style window frame mockup

## Development

This is a pnpm monorepo with the following packages:

- `packages/bloomui` - The component library
- `packages/site` - Documentation website (bloomui.io)

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
cd packages/bloomui
pnpm publish
```

## License

ISC
