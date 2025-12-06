# Flex

Flexible box layout component for building responsive layouts.

**Import:** `import { Flex } from 'asterui'`

## Examples

### Basic

Default horizontal flex layout.

```tsx
import React from 'react'
import { Flex, Button } from 'asterui'

const App: React.FC = () => (
  <Flex gap="sm">
    <Button type="primary">Button 1</Button>
    <Button type="secondary">Button 2</Button>
    <Button type="accent">Button 3</Button>
  </Flex>
)

export default App
```

### Direction

Control flex direction with the direction prop.

```tsx
import React from 'react'
import { Flex, Button } from 'asterui'

const App: React.FC = () => (
  <Flex direction="column" gap="sm">
    <Button type="primary">First</Button>
    <Button type="secondary">Second</Button>
    <Button type="accent">Third</Button>
  </Flex>
)

export default App
```

### Justify Content

Distribute items along the main axis.

```tsx
import React from 'react'
import { Flex, Button } from 'asterui'

const App: React.FC = () => (
  <Flex direction="column" gap="md">
    <Flex justify="start" gap="sm" className="bg-base-200 p-2 rounded">
      <Button size="sm">Start</Button>
      <Button size="sm">Items</Button>
    </Flex>
    <Flex justify="center" gap="sm" className="bg-base-200 p-2 rounded">
      <Button size="sm">Center</Button>
      <Button size="sm">Items</Button>
    </Flex>
    <Flex justify="end" gap="sm" className="bg-base-200 p-2 rounded">
      <Button size="sm">End</Button>
      <Button size="sm">Items</Button>
    </Flex>
    <Flex justify="between" className="bg-base-200 p-2 rounded">
      <Button size="sm">Between</Button>
      <Button size="sm">Items</Button>
    </Flex>
  </Flex>
)

export default App
```

### Align Items

Align items along the cross axis.

```tsx
import React from 'react'
import { Flex, Button } from 'asterui'

const App: React.FC = () => (
  <Flex gap="md">
    <Flex align="start" gap="sm" className="bg-base-200 p-2 rounded h-24">
      <Button size="xs">Top</Button>
      <Button size="sm">Aligned</Button>
    </Flex>
    <Flex align="center" gap="sm" className="bg-base-200 p-2 rounded h-24">
      <Button size="xs">Center</Button>
      <Button size="sm">Aligned</Button>
    </Flex>
    <Flex align="end" gap="sm" className="bg-base-200 p-2 rounded h-24">
      <Button size="xs">Bottom</Button>
      <Button size="sm">Aligned</Button>
    </Flex>
  </Flex>
)

export default App
```

### Gap Sizes

Control spacing between items.

```tsx
import React from 'react'
import { Flex, Badge } from 'asterui'

const App: React.FC = () => (
  <Flex direction="column" gap="lg">
    <Flex gap="xs">
      <Badge>XS</Badge>
      <Badge>Gap</Badge>
    </Flex>
    <Flex gap="sm">
      <Badge>SM</Badge>
      <Badge>Gap</Badge>
    </Flex>
    <Flex gap="md">
      <Badge>MD</Badge>
      <Badge>Gap</Badge>
    </Flex>
    <Flex gap="lg">
      <Badge>LG</Badge>
      <Badge>Gap</Badge>
    </Flex>
    <Flex gap="xl">
      <Badge>XL</Badge>
      <Badge>Gap</Badge>
    </Flex>
  </Flex>
)

export default App
```

### Wrap

Allow items to wrap to the next line.

```tsx
import React from 'react'
import { Flex, Badge } from 'asterui'

const App: React.FC = () => (
  <Flex wrap gap="sm">
    <Badge>Tag 1</Badge>
    <Badge>Tag 2</Badge>
    <Badge>Tag 3</Badge>
    <Badge>Tag 4</Badge>
    <Badge>Tag 5</Badge>
    <Badge>Tag 6</Badge>
    <Badge>Tag 7</Badge>
    <Badge>Tag 8</Badge>
  </Flex>
)

export default App
```

### Centering Content

Center content both horizontally and vertically.

```tsx
import React from 'react'
import { Flex, Card, Typography } from 'asterui'

const { Title, Paragraph } = Typography

const App: React.FC = () => (
  <Flex
    justify="center"
    align="center"
    className="bg-base-200 rounded-lg"
    style={{ height: '200px' }}
  >
    <Card className="w-64">
      <Title level={4}>Centered Card</Title>
      <Paragraph>This card is centered in its container.</Paragraph>
    </Card>
  </Flex>
)

export default App
```

### Full Page Layout

Use minHeight="screen" for full viewport layouts. Demo shows scaled version.

```tsx
import React from 'react'
import { Flex, Card, Button, Typography } from 'asterui'

const { Title } = Typography

const App: React.FC = () => (
  <Flex
    justify="center"
    align="center"
    className="bg-base-200 rounded-lg"
    style={{ height: '200px' }}
  >
    <Card title="Welcome" className="w-64">
      <Flex direction="column" gap="md">
        <Title level={5}>Sign in to continue</Title>
        <Button type="primary" shape="block">Login</Button>
      </Flex>
    </Card>
  </Flex>
)

export default App
```

### Nested Flex

Combine flex containers for complex layouts.

```tsx
import React from 'react'
import { Flex, Button } from 'asterui'

const App: React.FC = () => (
  <Flex direction="column" gap="md">
    <Flex justify="between" className="bg-base-200 p-4 rounded">
      <Button type="ghost">Logo</Button>
      <Flex gap="sm">
        <Button type="ghost">Home</Button>
        <Button type="ghost">About</Button>
        <Button type="primary">Contact</Button>
      </Flex>
    </Flex>
    <Flex gap="md" className="p-4">
      <Flex direction="column" gap="sm" flex="1" className="bg-base-200 p-4 rounded">
        <Button type="ghost" shape="block">Sidebar Item 1</Button>
        <Button type="ghost" shape="block">Sidebar Item 2</Button>
      </Flex>
      <Flex flex="1" className="bg-base-200 p-4 rounded min-h-32" justify="center" align="center">
        Main Content
      </Flex>
    </Flex>
  </Flex>
)

export default App
```

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `direction` | Flex direction | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'` | `'row'` |
| `justify` | Justify content along main axis | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly'` | `-` |
| `align` | Align items along cross axis | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | `-` |
| `wrap` | Whether to wrap items | `boolean \| 'wrap' \| 'nowrap' \| 'wrap-reverse'` | `false` |
| `gap` | Gap between items | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `-` |
| `flex` | Flex shorthand for the container | `'1' \| 'auto' \| 'initial' \| 'none'` | `-` |
| `inline` | Use inline-flex instead of flex | `boolean` | `false` |
| `minHeight` | Minimum height | `'screen' \| 'full' \| 'fit' \| 'min' \| 'max'` | `-` |
| `minWidth` | Minimum width | `'full' \| 'fit' \| 'min' \| 'max'` | `-` |
| `className` | Additional CSS classes | `string` | `-` |
