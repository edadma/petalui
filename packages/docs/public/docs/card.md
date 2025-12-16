# Card

**Import:** `import { Card } from 'asterui'`

## Examples

### Basic Card

Simple card with title and content.

```tsx
import React from 'react'
import { Card } from 'asterui'

const App: React.FC = () => (
  <Card title="Card Title" className="w-96">
    <p>This is a basic card with some content inside it.</p>
  </Card>
)

export default App
```

### Card with Image

Card with a cover image at the top.

```tsx
import React from 'react'
import { Card } from 'asterui'

const App: React.FC = () => (
  <Card
    title="Image Card"
    cover={<img src="https://picsum.photos/400/200" alt="Placeholder" />}
    className="w-96"
  >
    <p>A card with an image positioned at the top.</p>
  </Card>
)

export default App
```

### Card with Actions

Card with action buttons.

```tsx
import React from 'react'
import { Card, Button } from 'asterui'

const App: React.FC = () => (
  <Card
    title="Action Card"
    actions={
      <>
        <Button color="primary">Accept</Button>
        <Button variant="ghost">Decline</Button>
      </>
    }
    className="w-96"
  >
    <p>Card with buttons in the actions area.</p>
  </Card>
)

export default App
```

### Card Variants

Different card style variants.

```tsx
import React from 'react'
import { Card, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="sm" className="w-96">
    <Card title="Default Card" variant="default">
      <p>Default card with shadow.</p>
    </Card>
    <Card title="Bordered Card" variant="border">
      <p>Card with solid border.</p>
    </Card>
    <Card title="Dashed Card" variant="dash">
      <p>Card with dashed border.</p>
    </Card>
    <Card title="Borderless Card" variant="borderless">
      <p>Card without border or shadow.</p>
    </Card>
  </Space>
)

export default App
```

### Card Sizes

Cards in different sizes.

```tsx
import React from 'react'
import { Card, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="sm" className="w-96">
    <Card title="Extra Small" size="xs">
      <p>Compact card with minimal padding.</p>
    </Card>
    <Card title="Small" size="sm">
      <p>Small card with reduced padding.</p>
    </Card>
    <Card title="Large" size="lg">
      <p>Large card with increased padding.</p>
    </Card>
  </Space>
)

export default App
```

### Inner Card

Nested card with inner styling.

```tsx
import React from 'react'
import { Card } from 'asterui'

const App: React.FC = () => (
  <Card title="Outer Card" className="w-96">
    <p>This is the outer card content.</p>
    <Card title="Inner Card" type="inner" className="mt-4">
      <p>This is a nested inner card.</p>
    </Card>
  </Card>
)

export default App
```

### Side Layout

Horizontal card with image on the side.

```tsx
import React from 'react'
import { Card, Button } from 'asterui'

const App: React.FC = () => (
  <Card
    title="Side Card"
    cover={
      <img
        src="https://picsum.photos/200/300"
        alt="Placeholder"
        className="w-32 h-full object-cover"
      />
    }
    actions={<Button color="primary">Buy Now</Button>}
    side
    className="w-96"
  >
    <p>Image positioned beside the content.</p>
  </Card>
)

export default App
```

### Full Background Image

Card with image as full background overlay.

```tsx
import React from 'react'
import { Card, Button } from 'asterui'

const App: React.FC = () => (
  <Card
    title="Overlay Card"
    cover={<img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />}
    actions={<Button color="primary">View Details</Button>}
    imageFull
    className="w-96"
  >
    <p>Text appears over the background image.</p>
  </Card>
)

export default App
```

### Card with Tabs

Card with tab navigation.

```tsx
import React, { useState } from 'react'
import { Card } from 'asterui'

const App: React.FC = () => {
  const [activeKey, setActiveKey] = useState('tab1')

  return (
    <Card
      title="Tabbed Card"
      tabList={[
        { key: 'tab1', label: 'Tab 1' },
        { key: 'tab2', label: 'Tab 2' },
        { key: 'tab3', label: 'Tab 3', disabled: true },
      ]}
      activeTabKey={activeKey}
      onTabChange={setActiveKey}
      tabBarExtraContent={<a href="#">More</a>}
      className="w-96"
    >
      {activeKey === 'tab1' && <p>Content of Tab 1</p>}
      {activeKey === 'tab2' && <p>Content of Tab 2</p>}
    </Card>
  )
}

export default App
```

### Custom Colors

Card with custom background colors using className.

```tsx
import React from 'react'
import { Card, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="sm" className="w-96">
    <Card title="Primary Card" className="bg-primary text-primary-content">
      <p>Card with primary background color.</p>
    </Card>
    <Card title="Neutral Card" className="bg-neutral text-neutral-content">
      <p>Card with neutral background color.</p>
    </Card>
  </Space>
)

export default App
```

### Action Alignment

Different action button alignments.

```tsx
import React from 'react'
import { Card, Button, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="sm" className="w-96">
    <Card
      title="Left Actions"
      actions={<Button color="primary" size="sm">Left</Button>}
      actionsJustify="start"
    >
      <p>Actions aligned to the left.</p>
    </Card>
    <Card
      title="Center Actions"
      actions={<Button color="primary" size="sm">Center</Button>}
      actionsJustify="center"
    >
      <p>Actions aligned to the center.</p>
    </Card>
  </Space>
)

export default App
```

### Extra Content

Card with extra content in the top-right corner.

```tsx
import React from 'react'
import { Card, Button } from 'asterui'

const App: React.FC = () => (
  <Card
    title="Card Title"
    extra={<a href="#" className="link link-primary">More</a>}
    className="w-96"
  >
    <p>Card with extra content in the header area.</p>
  </Card>
)

export default App
```

### Loading State

Card showing skeleton placeholders while loading.

```tsx
import React, { useState } from 'react'
import { Card, Button, Space } from 'asterui'

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)

  return (
    <Space direction="vertical" size="sm">
      <Button size="sm" onClick={() => setLoading(!loading)}>
        Toggle Loading
      </Button>
      <Card
        title="Loading Card"
        cover={<img src="https://picsum.photos/400/200" alt="Placeholder" />}
        actions={<Button color="primary">Action</Button>}
        loading={loading}
        className="w-96"
      >
        <p>Content appears when loading is false.</p>
      </Card>
    </Space>
  )
}

export default App
```

### Hoverable

Card with hover effect.

```tsx
import React from 'react'
import { Card, Space } from 'asterui'

const App: React.FC = () => (
  <Space size="sm">
    <Card title="Hoverable Card" hoverable className="w-64">
      <p>Hover over this card to see the shadow effect.</p>
    </Card>
    <Card title="Normal Card" className="w-64">
      <p>This card has no hover effect.</p>
    </Card>
  </Space>
)

export default App
```

### Card.Meta

Use Card.Meta for avatar with title and description layout.

```tsx
import React from 'react'
import { Card, Avatar } from 'asterui'

const App: React.FC = () => (
  <Card className="w-96">
    <Card.Meta
      avatar={<Avatar src="https://i.pravatar.cc/100" />}
      title="John Doe"
      description="Software Engineer at Acme Corp"
    />
    <p className="mt-4">
      This card uses Card.Meta for a structured avatar layout.
    </p>
  </Card>
)

export default App
```

### Card with Avatar Props

Alternative inline avatar layout using Card props directly.

```tsx
import React from 'react'
import { Card, Avatar, Button } from 'asterui'

const App: React.FC = () => (
  <Card
    avatar={<Avatar src="https://i.pravatar.cc/100" />}
    title="Jane Smith"
    description="Product Designer"
    actions={<Button color="primary" size="sm">Follow</Button>}
    className="w-96"
  >
    <p className="mt-2">Building beautiful user experiences.</p>
  </Card>
)

export default App
```

## API

### Card

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Card body content | `React.ReactNode` | `-` |
| `title` | Card title | `React.ReactNode` | `-` |
| `extra` | Content in the top-right corner of the header | `React.ReactNode` | `-` |
| `cover` | Cover image or media element | `React.ReactNode` | `-` |
| `actions` | Action buttons or elements | `React.ReactNode` | `-` |
| `size` | Card size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `-` |
| `variant` | Card style variant | `'default' \| 'border' \| 'dash' \| 'borderless'` | `'default'` |
| `type` | Inner card styling for nested cards | `'inner'` | `-` |
| `bordered` | Add border (deprecated, use variant) | `boolean` | `true` |
| `side` | Place cover beside content (horizontal layout) | `boolean` | `false` |
| `imageFull` | Make cover image a full background overlay | `boolean` | `false` |
| `actionsJustify` | Horizontal alignment of actions | `'start' \| 'center' \| 'end'` | `'end'` |
| `loading` | Show skeleton loading state | `boolean` | `false` |
| `hoverable` | Enable hover shadow effect | `boolean` | `false` |
| `avatar` | Avatar element (for inline meta layout) | `React.ReactNode` | `-` |
| `description` | Description text (for inline meta layout) | `React.ReactNode` | `-` |
| `tabList` | Tab items for card header | `CardTabItem[]` | `-` |
| `activeTabKey` | Active tab key (controlled) | `string` | `-` |
| `defaultActiveTabKey` | Default active tab key | `string` | `-` |
| `onTabChange` | Callback when tab changes | `(key: string) => void` | `-` |
| `tabBarExtraContent` | Extra content in tab bar | `React.ReactNode` | `-` |
| `data-testid` | Test ID for the component | `string` | `'card'` |
| `className` | Additional CSS classes | `string` | `-` |
| `bodyClassName` | Additional CSS classes for the card-body element | `string` | `-` |
| `style` | Inline styles | `React.CSSProperties` | `-` |

### CardTabItem

| Property | Description | Type |
|----------|-------------|------|
| `key` | Unique identifier | `string` |
| `label` | Tab label | `React.ReactNode` |
| `disabled` | Whether tab is disabled | `boolean` |

### Card.Meta

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `avatar` | Avatar or icon element | `React.ReactNode` | `-` |
| `title` | Title content | `React.ReactNode` | `-` |
| `description` | Description content | `React.ReactNode` | `-` |
| `data-testid` | Test ID for the component | `string` | `-` |
| `className` | Additional CSS classes | `string` | `-` |

### Card.Grid

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Grid cell content | `React.ReactNode` | `-` |
| `hoverable` | Enable hover effect | `boolean` | `false` |
| `data-testid` | Test ID for the component | `string` | `-` |
| `className` | Additional CSS classes | `string` | `-` |
| `style` | Inline styles | `React.CSSProperties` | `-` |

## Accessibility

The Card component uses semantic HTML and follows accessibility best practices:

- Uses `<h2>` for card titles
- Tab navigation uses `role="tablist"` and `role="tab"` with `aria-selected`
- Loading state indicated via `data-loading` attribute

## Testing

The component exposes `data-testid` attributes for testing:

| Element | Test ID |
|---------|---------|
| Root | `{baseTestId}` |
| Header | `{baseTestId}-header` |
| Extra | `{baseTestId}-extra` |
| Cover | `{baseTestId}-cover` |
| Body | `{baseTestId}-body` |
| Actions | `{baseTestId}-actions` |
| Tabs | `{baseTestId}-tabs` |
| Tab | `{baseTestId}-tab-{key}` |
| Tab Extra | `{baseTestId}-tab-extra` |

Pass a custom `data-testid` prop to use a different base ID:

```tsx
<Card data-testid="user-profile" title="Profile" />
// Results in: user-profile-header, user-profile-body, etc.
```
