# PetalUI

A comprehensive React component library built with DaisyUI and Tailwind CSS.

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
@plugin "daisyui";
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

### Navigation
- **Breadcrumb** - Breadcrumb navigation trail
- **Link** - Link component with hover and focus states
- **Menu** - Menu with vertical, horizontal, and inline modes
- **Navbar** - Navigation bar with start, center, and end sections
- **Tabs** - Tab navigation with multiple variants

### Feedback
- **Alert** - Alert messages with multiple types and dismissible option
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
- **CodeMockup** - Terminal-style code display
- **Phone** - iPhone-style phone frame mockup
- **Window** - OS-style window frame mockup

## Demo

View live examples and documentation at [https://edadma.github.io/petalui](https://edadma.github.io/petalui)

## Requirements

- React 18 or 19
- Tailwind CSS 4+
- DaisyUI 5+

## License

ISC
