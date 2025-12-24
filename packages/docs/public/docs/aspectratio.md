# AspectRatio

Maintain consistent media and card proportions with a simple aspect ratio wrapper.

**Import:** `import { AspectRatio } from 'asterui'`

## Examples

### Widescreen Media

Use a 16:9 ratio for images or video frames.

```tsx
import React from 'react'
import { AspectRatio, Image } from 'asterui'

const App: React.FC = () => (
  <AspectRatio ratio={16 / 9} className="max-w-xl">
    <Image
      src="/valley.png"
      alt="Widescreen landscape"
      width="100%"
      height="100%"
      preview={false}
      className="w-full h-full object-cover rounded-box"
    />
  </AspectRatio>
)

export default App
```

### Square Card

Keep cards aligned in uniform grid layouts.

```tsx
import React from 'react'
import { AspectRatio, Card, Space, Typography } from 'asterui'

const App: React.FC = () => (
  <AspectRatio ratio={1} className="max-w-sm">
    <Card className="h-full w-full" bodyClassName="h-full flex flex-col justify-between">
      <Space direction="vertical">
        <Typography.Title level={5}>Square Tile</Typography.Title>
        <Typography.Text className="text-sm" type="secondary">Keep cards consistent in grid layouts.</Typography.Text>
      </Space>
      <Typography.Text className="text-sm" type="secondary">1:1 aspect ratio</Typography.Text>
    </Card>
  </AspectRatio>
)

export default App
```

## API

### AspectRatio

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `ratio` | Aspect ratio as width / height | `number` | `1` |
| `children` | Content to render inside the ratio container | `React.ReactNode` | `-` |
| `className` | Additional CSS classes | `string` | `-` |
| `style` | Inline styles merged with the ratio styles | `React.CSSProperties` | `-` |
| `data-testid` | Test ID for the root element | `string` | `-` |
