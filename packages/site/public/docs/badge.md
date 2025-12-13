# Badge

**Import:** `import { Badge } from 'asterui'`

## Examples

### Basic Notification Badges

Display count badges on elements.

```tsx
import React from 'react'
import { Badge, Button, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="horizontal" size="lg" wrap>
    <Badge count={5}>
      <Button>Messages</Button>
    </Badge>
    <Badge count={99}>
      <Button color="secondary">Notifications</Button>
    </Badge>
    <Badge count={0}>
      <Button color="accent">No Count</Button>
    </Badge>
  </Space>
)

export default App
```

### Overflow Count

Show count+ when exceeding the overflow threshold.

```tsx
import React from 'react'
import { Badge, Avatar, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="horizontal" size="lg" align="center" wrap>
    <Badge count={99}>
      <Avatar size="lg">U</Avatar>
    </Badge>
    <Badge count={100} overflowCount={99}>
      <Avatar size="lg">U</Avatar>
    </Badge>
    <Badge count={1000} overflowCount={999}>
      <Avatar size="lg">U</Avatar>
    </Badge>
  </Space>
)

export default App
```

### Badge Positioning

Position badges at any of the 9 corners.

```tsx
import React from 'react'
import { Badge, Avatar, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="horizontal" size="lg" wrap>
    <Badge count={5} position="top-start">
      <Avatar size="lg">TL</Avatar>
    </Badge>
    <Badge count={5} position="top-center">
      <Avatar size="lg">TC</Avatar>
    </Badge>
    <Badge count={5} position="top-end">
      <Avatar size="lg">TR</Avatar>
    </Badge>
    <Badge count={5} position="bottom-start">
      <Avatar size="lg">BL</Avatar>
    </Badge>
    <Badge count={5} position="bottom-end">
      <Avatar size="lg">BR</Avatar>
    </Badge>
  </Space>
)

export default App
```

### Badge Offset

Fine-tune badge position with pixel offsets.

```tsx
import React from 'react'
import { Badge, Avatar, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="horizontal" size="lg">
    <Badge count={5}>
      <Avatar size="lg">Default</Avatar>
    </Badge>
    <Badge count={5} offset={[-5, 5]}>
      <Avatar size="lg">Offset</Avatar>
    </Badge>
    <Badge count={5} offset={[0, 10]}>
      <Avatar size="lg">Down</Avatar>
    </Badge>
  </Space>
)

export default App
```

### Status Badges

Status indicators with optional text labels.

```tsx
import React from 'react'
import { Badge, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="sm">
    <Badge status="success" text="Success" />
    <Badge status="processing" text="Processing" />
    <Badge status="error" text="Error" />
    <Badge status="warning" text="Warning" />
    <Badge status="default" text="Default" />
  </Space>
)

export default App
```

### Ribbon Badges

Decorative ribbon-style badges using the compound `Badge.Ribbon` component.

```tsx
import React from 'react'
import { Badge, Card, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="horizontal" size="lg" wrap>
    <Badge.Ribbon text="Recommended">
      <Card title="Premium Plan" variant="border" className="w-48">
        Best value for teams
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="New" placement="start">
      <Card title="Pro Plan" variant="border" className="w-48">
        For professionals
      </Card>
    </Badge.Ribbon>
  </Space>
)

export default App
```

### Ribbon Colors

Ribbons support different color types and custom colors.

```tsx
import React from 'react'
import { Badge, Card, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="md">
    <Badge.Ribbon text="Primary" type="primary">
      <Card title="Primary Ribbon" variant="border" className="w-48">Card content</Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Success" type="success">
      <Card title="Success Ribbon" variant="border" className="w-48">Card content</Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Custom" color="#722ed1">
      <Card title="Custom Color" variant="border" className="w-48">Card content</Card>
    </Badge.Ribbon>
  </Space>
)

export default App
```

### Dot Badges

Small circular indicators for presence or status.

```tsx
import React from 'react'
import { Badge, Button, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="horizontal" size="lg" wrap>
    <Badge dot type="error">
      <Button>Notifications</Button>
    </Badge>
    <Badge dot type="success">
      <Button variant="ghost">Online</Button>
    </Badge>
    <Badge dot type="warning">
      <Button color="secondary">Pending</Button>
    </Badge>
  </Space>
)

export default App
```

### Badge Colors

Standalone count badges with different colors.

```tsx
import React from 'react'
import { Badge, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="horizontal" size="sm" wrap>
    <Badge count={5} />
    <Badge count={5} type="primary" />
    <Badge count={5} type="secondary" />
    <Badge count={5} type="accent" />
    <Badge count={5} type="info" />
    <Badge count={5} type="success" />
    <Badge count={5} type="warning" />
    <Badge count={5} type="error" />
  </Space>
)

export default App
```

### Custom Colors

Use the `color` prop for custom badge colors.

```tsx
import React from 'react'
import { Badge, Button, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="horizontal" size="md">
    <Badge count={5} color="#722ed1">
      <Button>Purple</Button>
    </Badge>
    <Badge count={5} color="#eb2f96">
      <Button>Magenta</Button>
    </Badge>
    <Badge count={5} color="#52c41a">
      <Button>Green</Button>
    </Badge>
    <Badge count={5} color="#faad14">
      <Button>Gold</Button>
    </Badge>
  </Space>
)

export default App
```

### Badge Sizes

Five sizes available for badges.

```tsx
import React from 'react'
import { Badge, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="horizontal" size="sm" align="center">
    <Badge count={5} type="primary" size="xs" />
    <Badge count={5} type="primary" size="sm" />
    <Badge count={5} type="primary" size="md" />
    <Badge count={5} type="primary" size="lg" />
    <Badge count={5} type="primary" size="xl" />
  </Space>
)

export default App
```

### Show Zero

Display badge even when count is 0.

```tsx
import React from 'react'
import { Badge, Button, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="horizontal" size="lg">
    <Badge count={0} showZero>
      <Button>Messages</Button>
    </Badge>
    <Badge count={0}>
      <Button color="secondary">Hidden Zero</Button>
    </Badge>
  </Space>
)

export default App
```

### Badge Variants

Different visual styles for badges.

```tsx
import React from 'react'
import { Badge, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="md">
    <Space direction="horizontal" size="sm" wrap>
      <Badge count={5} type="primary" variant="solid" />
      <Badge count={5} type="secondary" variant="solid" />
      <Badge count={5} type="accent" variant="solid" />
    </Space>
    <Space direction="horizontal" size="sm" wrap>
      <Badge count={5} type="primary" variant="outline" />
      <Badge count={5} type="secondary" variant="outline" />
      <Badge count={5} type="accent" variant="outline" />
    </Space>
    <Space direction="horizontal" size="sm" wrap>
      <Badge count={5} type="primary" variant="soft" />
      <Badge count={5} type="secondary" variant="soft" />
      <Badge count={5} type="accent" variant="soft" />
    </Space>
    <Space direction="horizontal" size="sm" wrap>
      <Badge count={5} type="primary" variant="dash" />
      <Badge count={5} type="secondary" variant="dash" />
      <Badge count={5} type="accent" variant="dash" />
    </Space>
    <Space direction="horizontal" size="sm" wrap>
      <Badge count={5} type="primary" variant="ghost" />
      <Badge count={5} type="secondary" variant="ghost" />
      <Badge count={5} type="accent" variant="ghost" />
    </Space>
  </Space>
)

export default App
```

## API

### Badge

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `count` | Number to display in the badge | `number` | `-` |
| `showZero` | Whether to display badge when count is 0 | `boolean` | `false` |
| `overflowCount` | Max count to show before displaying count+ | `number` | `99` |
| `position` | Position of badge when wrapping children | `BadgePosition` | `top-end` |
| `offset` | Offset of badge from its position `[x, y]` | `[number, number]` | `-` |
| `status` | Status badge mode with colored dot | `'success' \| 'processing' \| 'error' \| 'default' \| 'warning'` | `-` |
| `text` | Text to display with status badge | `string` | `-` |
| `dot` | Show a small circular dot instead of count | `boolean` | `false` |
| `type` | Badge color type | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'neutral' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'error'` |
| `size` | Badge size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `variant` | Badge style variant | `'solid' \| 'outline' \| 'dash' \| 'soft' \| 'ghost'` | `'solid'` |
| `color` | Custom background color | `string` | `-` |
| `children` | Element to wrap with badge (notification mode) | `ReactNode` | `-` |
| `className` | Additional CSS classes | `string` | `-` |
| `data-testid` | Test ID for testing; child elements use this as prefix | `string` | `-` |

### Badge.Ribbon

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `text` | Ribbon text content | `string` | **required** |
| `placement` | Ribbon placement | `'start' \| 'end'` | `'end'` |
| `type` | Ribbon color type | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'neutral' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'primary'` |
| `color` | Custom background color | `string` | `-` |
| `children` | Element to wrap with ribbon | `ReactNode` | **required** |
| `className` | Additional CSS classes | `string` | `-` |
| `data-testid` | Test ID for testing; ribbon element uses `{testid}-ribbon` | `string` | `-` |
