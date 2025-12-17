# @aster-ui/prefixed

React UI component library with DaisyUI - prefixed version.

This package is identical to `asterui` but uses prefixed DaisyUI classes (`d-btn`, `d-card`, etc.) to avoid conflicts with other CSS frameworks or custom styles.

## Installation

```bash
npm install @aster-ui/prefixed
# or
pnpm add @aster-ui/prefixed
```

## DaisyUI Configuration

When using this package, you must configure DaisyUI to use the `d-` prefix in your CSS:

```css
@import "tailwindcss";
@plugin "daisyui" {
  prefix: "d-";
}
```

## Usage

```tsx
import { Button, Card } from '@aster-ui/prefixed'

function App() {
  return (
    <Card>
      <Button color="primary">Click me</Button>
    </Card>
  )
}
```

The components will automatically use the prefixed DaisyUI classes internally (e.g., `d-btn`, `d-card`).
