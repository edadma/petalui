<p align="center">
  <img src="logo.png" alt="PetalUI Logo" width="200">
</p>

# PetalUI

A React component library built with DaisyUI and Tailwind CSS.

## Demo

View the live demo at: [https://edadma.github.io/petalui](https://edadma.github.io/petalui)

## Installation

```bash
npm install @edadma/petalui
# or
pnpm add @edadma/petalui
# or
yarn add @edadma/petalui
```

## Prerequisites

PetalUI requires Tailwind CSS v4 and DaisyUI to be configured in your project.

Install dependencies:

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

Import Tailwind and DaisyUI in your CSS file (e.g., `src/index.css`):

```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: all;
}
```

Or specify themes in `tailwind.config.js` if you prefer:

```js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    themes: ['light', 'dark', 'cupcake'], // or "all" for all themes
  },
}
```

## Usage

```tsx
import { Form, Input, Button } from '@edadma/petalui'

function App() {
  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="email" label="Email" required>
        <Input type="email" placeholder="you@example.com" />
      </Form.Item>

      <Form.Item name="password" label="Password" required>
        <Input type="password" />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
```

## Components

### Actions
- **Button** - Buttons with multiple types, sizes, and variants
- **Dropdown** - Composable dropdown menu with trigger, items, and dividers

### Data Entry
- **Autocomplete** - Search and select with keyboard navigation and filtering
- **Checkbox** - Checkboxes with sizes, colors, and indeterminate state
- **DatePicker** - Interactive calendar date picker with custom formatting
- **Fieldset** - Fieldset container with legend
- **FileInput** - File input with sizes and colors
- **Form** - Form component with React Hook Form integration and validation
- **Input** - Text inputs with multiple types, sizes, and colors
- **Label** - Form labels with required indicator and floating labels
- **Radio** - Radio buttons with group support
- **Range** - Range slider with min, max, and step support
- **Rating** - Star rating component
- **Select** - Select dropdown with sizes and colors
- **Textarea** - Multiline text input
- **TimePicker** - Time input with hour and minute selection
- **Toggle** - Toggle switches with sizes and colors

### Data Display
- **Avatar** - User avatars with sizes, shapes, status indicators, and group support
- **Badge** - Notification badges with colors and variants
- **Card** - Composable card component with body, title, actions, and figure
- **Carousel** - Image carousel with navigation and indicators
- **Chat** - Chat message bubbles with avatars and timestamps
- **Collapse** - Collapsible content panels
- **Descriptions** - Display multiple read-only fields in structured layouts
- **Empty** - Empty state placeholder with custom images and actions
- **Image** - Image component with fallback and preview support
- **List** - Vertical list layout with customizable rows
- **Skeleton** - Loading placeholder with animated shimmer effect
- **Stats** - Statistics display with figures and actions
- **Steps** - Step progress indicator
- **Table** - Feature-rich data table with sorting and pagination
- **Timeline** - Timeline component for displaying chronological events

### Layout
- **Divider** - Horizontal and vertical dividers with optional text
- **Drawer** - Sidebar drawer with multiple placements
- **Footer** - Footer component with title sections
- **Grid** - Powerful 24-column grid system with Row and Col components
- **Hero** - Hero section with overlay and content wrapping
- **Indicator** - Position indicators and badges on elements
- **Join** - Join multiple elements together seamlessly
- **Masonry** - Masonry grid layout with CSS columns
- **Space** - Layout component for consistent spacing between elements

### Navigation
- **Breadcrumbs** - Breadcrumb navigation trail
- **Link** - Link component with hover and focus states
- **Menu** - Vertical menu component with titles and items
- **Navbar** - Navigation bar with start, center, and end sections
- **Tabs** - Tab navigation with multiple variants

### Feedback
- **Alert** - Alert messages with multiple types and dismissible option
- **Loading** - Loading spinners with sizes and overlay support
- **Modal** - Modal dialogs with imperative API
- **Notification** - Toast notifications with auto-dismiss and stacking
- **Popconfirm** - Confirmation popover for actions
- **Progress** - Progress bars with colors and indeterminate state
- **RadialProgress** - Circular progress indicator
- **Tooltip** - Tooltips with multiple placements

## Development

This is a pnpm monorepo with two packages:

- `packages/@edadma/petalui` - The component library
- `packages/docs` - Documentation site

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
cd packages/@edadma/petalui
pnpm publish
```

## License

ISC
