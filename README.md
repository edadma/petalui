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

## Usage

```tsx
import { Button, Badge, Table } from '@edadma/petalui'
import '@edadma/petalui/styles.css'

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
- **Drawer** - Sidebar navigation drawer
- **Navbar** - Navigation bar component
- **Spin** - Loading spinners with overlay support
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
