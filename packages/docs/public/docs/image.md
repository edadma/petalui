# Image

**Import:** `import { Image } from 'asterui'`

## Examples

### Basic Image

Simple image display with src and alt props.

```tsx
import React from 'react'
import { Image } from 'asterui'

const App: React.FC = () => (
  <Image
    src="/valley.png"
    alt="Landscape"
    width={400}
    height={300}
  />
)

export default App
```

### Different Sizes

Images with various dimensions.

```tsx
import React from 'react'
import { Image, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="horizontal" size="md" align="center">
    <Image
      src="/valley.png"
      alt="Small"
      width={100}
      height={100}
    />
    <Image
      src="/valley.png"
      alt="Medium"
      width={200}
      height={150}
    />
    <Image
      src="/valley.png"
      alt="Large"
      width={300}
      height={200}
    />
  </Space>
)

export default App
```

### Image Preview

Click image to preview in full size.

```tsx
import React from 'react'
import { Image } from 'asterui'

const App: React.FC = () => (
  <Image
    src="/valley.png"
    alt="Landscape with preview"
    width={400}
    height={300}
    preview
  />
)

export default App
```

### Fallback Image

Display fallback image when source fails to load.

```tsx
import React from 'react'
import { Image, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="horizontal" size="md">
    <Image
      src="/does-not-exist.png"
      alt="Broken image"
      width={200}
      height={150}
      fallback="/valley.png"
    />
  </Space>
)

export default App
```

## API

### Image

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `src` | Image source URL | `string` | `-` |
| `alt` | Alternative text for the image | `string` | `-` |
| `width` | Image width | `number \| string` | `-` |
| `height` | Image height | `number \| string` | `-` |
| `preview` | Enable click to preview image | `boolean` | `false` |
| `fallback` | Fallback image URL for broken images | `string` | `-` |
| `className` | Additional CSS classes | `string` | `-` |
| `style` | Inline styles | `React.CSSProperties` | `-` |
