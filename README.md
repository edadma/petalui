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
import { Button, Badge, Table } from '@edadma/petalui'

function App() {
  return (
    <div>
      <Badge count={5}>
        <Button type="primary">Notifications</Button>
      </Badge>
    </div>
  )
}
```

## Components

- **Badge** - Notification badges with count and dot indicators
- **Button** - Buttons with multiple types and sizes
- **Card** - Composable card component with body, title, actions, and figure
- **Drawer** - Sidebar navigation drawer
- **Dropdown** - Composable dropdown menu with trigger and items
- **Loading** - Loading spinners with overlay support
- **Menu** - Vertical menu component for navigation
- **Navbar** - Navigation bar component
- **Table** - Feature-rich data table with pagination

## Development

This is a pnpm monorepo with two packages:

- `packages/@edadma/petalui` - The component library
- `packages/demo` - Demo application

### Setup

```bash
# Enable corepack (if not already enabled)
corepack enable

# Install dependencies
pnpm install

# Start demo app
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
