# Footer

Page footer component with support for links, sections, and centered layouts.

**Import:** `import { Footer } from 'asterui'`

## Examples

### Basic Footer

Simple left-aligned footer with horizontal links.

```tsx
import React from 'react'
import { Footer } from 'asterui'

const App: React.FC = () => (
  <Footer horizontal className="bg-base-200 p-4">
    <a href="#" className="link link-hover">About</a>
    <a href="#" className="link link-hover">Contact</a>
    <a href="#" className="link link-hover">Privacy</a>
    <a href="#" className="link link-hover">Terms</a>
  </Footer>
)

export default App
```

### Footer with Sections

Footer with titled sections in columns.

```tsx
import React from 'react'
import { Footer } from 'asterui'

const App: React.FC = () => (
  <Footer horizontal className="bg-base-200 p-10">
    <nav>
      <Footer.Title>Services</Footer.Title>
      <a href="#" className="link link-hover">Branding</a>
      <a href="#" className="link link-hover">Design</a>
      <a href="#" className="link link-hover">Marketing</a>
    </nav>
    <nav>
      <Footer.Title>Company</Footer.Title>
      <a href="#" className="link link-hover">About us</a>
      <a href="#" className="link link-hover">Contact</a>
      <a href="#" className="link link-hover">Jobs</a>
    </nav>
    <nav>
      <Footer.Title>Legal</Footer.Title>
      <a href="#" className="link link-hover">Terms of use</a>
      <a href="#" className="link link-hover">Privacy policy</a>
      <a href="#" className="link link-hover">Cookie policy</a>
    </nav>
  </Footer>
)

export default App
```

### Centered Footer

Footer with centered content.

```tsx
import React from 'react'
import { Footer } from 'asterui'

const App: React.FC = () => (
  <Footer center horizontal className="bg-base-200 p-4">
    <nav className="flex gap-4">
      <a href="#" className="link link-hover">About</a>
      <a href="#" className="link link-hover">Contact</a>
      <a href="#" className="link link-hover">Privacy</a>
      <a href="#" className="link link-hover">Terms</a>
    </nav>
    <aside>
      <p>© 2024 Company Name. All rights reserved.</p>
    </aside>
  </Footer>
)

export default App
```

## API

### Footer

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Footer content | `React.ReactNode` | `-` |
| `center` | Center the footer content | `boolean` | `false` |
| `horizontal` | Display columns horizontally | `boolean` | `false` |
| `vertical` | Display columns vertically (default) | `boolean` | `false` |
| `className` | Additional CSS classes | `string` | `-` |

### Footer.Title

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Title text | `React.ReactNode` | `-` |
| `className` | Additional CSS classes | `string` | `-` |
