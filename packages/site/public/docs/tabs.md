# Tabs

Organize content into separate views where only one view is visible at a time.

**Import:** `import { Tabs } from 'asterui'`

## Examples

### Basic

```tsx
import React from 'react'
import { Tabs, Typography } from 'asterui'

const App: React.FC = () => (
  <Tabs>
    <Tabs.Panel tab="Tab 1" tabKey="1">
      <Typography.Text>Content of Tab 1</Typography.Text>
    </Tabs.Panel>
    <Tabs.Panel tab="Tab 2" tabKey="2">
      <Typography.Text>Content of Tab 2</Typography.Text>
    </Tabs.Panel>
    <Tabs.Panel tab="Tab 3" tabKey="3">
      <Typography.Text>Content of Tab 3</Typography.Text>
    </Tabs.Panel>
  </Tabs>
)

export default App
```

### Settings Page

```tsx
import React from 'react'
import { Tabs, Input, Button, Label, Space } from 'asterui'

const App: React.FC = () => (
  <Tabs defaultActiveKey="account" variant="border">
    <Tabs.Panel tab="Account" tabKey="account">
      <Space direction="vertical" size="md">
        <Label.Floating label="Username">
          <Input placeholder="john_doe" />
        </Label.Floating>
        <Label.Floating label="Email">
          <Input type="email" placeholder="john@example.com" />
        </Label.Floating>
        <Button color="primary">Save</Button>
      </Space>
    </Tabs.Panel>
    <Tabs.Panel tab="Security" tabKey="security">
      <Space direction="vertical" size="md">
        <Label.Floating label="Current Password">
          <Input type="password" />
        </Label.Floating>
        <Label.Floating label="New Password">
          <Input type="password" />
        </Label.Floating>
        <Button color="primary">Update</Button>
      </Space>
    </Tabs.Panel>
  </Tabs>
)

export default App
```

### Boxed Variant

```tsx
import React from 'react'
import { Tabs, Typography } from 'asterui'

const App: React.FC = () => (
  <Tabs variant="box">
    <Tabs.Panel tab="Home" tabKey="home">
      <Typography.Text>Home content</Typography.Text>
    </Tabs.Panel>
    <Tabs.Panel tab="Profile" tabKey="profile">
      <Typography.Text>Profile content</Typography.Text>
    </Tabs.Panel>
    <Tabs.Panel tab="Settings" tabKey="settings">
      <Typography.Text>Settings content</Typography.Text>
    </Tabs.Panel>
  </Tabs>
)

export default App
```

### Lifted Variant

```tsx
import React from 'react'
import { Tabs, Typography } from 'asterui'

const App: React.FC = () => (
  <Tabs variant="lift">
    <Tabs.Panel tab="Overview" tabKey="1">
      <Typography.Text>Overview content</Typography.Text>
    </Tabs.Panel>
    <Tabs.Panel tab="Reports" tabKey="2">
      <Typography.Text>Reports content</Typography.Text>
    </Tabs.Panel>
    <Tabs.Panel tab="Analytics" tabKey="3">
      <Typography.Text>Analytics content</Typography.Text>
    </Tabs.Panel>
  </Tabs>
)

export default App
```

### Different Sizes

```tsx
import React from 'react'
import { Tabs, Space, Typography } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="md">
    <div>
      <Typography.Text strong>Small</Typography.Text>
      <Tabs size="sm">
        <Tabs.Panel tab="Tab 1" tabKey="1"><Typography.Text>Small tabs content</Typography.Text></Tabs.Panel>
        <Tabs.Panel tab="Tab 2" tabKey="2"><Typography.Text>Content 2</Typography.Text></Tabs.Panel>
      </Tabs>
    </div>
    <div>
      <Typography.Text strong>Large</Typography.Text>
      <Tabs size="lg">
        <Tabs.Panel tab="Tab 1" tabKey="1"><Typography.Text>Large tabs content</Typography.Text></Tabs.Panel>
        <Tabs.Panel tab="Tab 2" tabKey="2"><Typography.Text>Content 2</Typography.Text></Tabs.Panel>
      </Tabs>
    </div>
  </Space>
)

export default App
```

### Disabled Tab

```tsx
import React from 'react'
import { Tabs, Typography } from 'asterui'

const App: React.FC = () => (
  <Tabs>
    <Tabs.Panel tab="Active" tabKey="1">
      <Typography.Text>Active content</Typography.Text>
    </Tabs.Panel>
    <Tabs.Panel tab="Disabled" tabKey="2" disabled>
      <Typography.Text>Cannot see this</Typography.Text>
    </Tabs.Panel>
    <Tabs.Panel tab="Also Active" tabKey="3">
      <Typography.Text>Active content</Typography.Text>
    </Tabs.Panel>
  </Tabs>
)

export default App
```

### Data-Driven Pattern

```tsx
import React, { useState } from 'react'
import { Tabs, Typography, notification } from 'asterui'
import { HomeIcon, UserIcon, CogIcon } from '@heroicons/react/24/outline'

const App: React.FC = () => {
  const [activeKey, setActiveKey] = useState('home')

  const items = [
    { key: 'home', label: 'Home', icon: <HomeIcon className="w-4 h-4" />, children: <Typography.Text>Home content</Typography.Text> },
    { key: 'profile', label: 'Profile', icon: <UserIcon className="w-4 h-4" />, children: <Typography.Text>Profile content</Typography.Text> },
    { key: 'settings', label: 'Settings', icon: <CogIcon className="w-4 h-4" />, children: <Typography.Text>Settings content</Typography.Text> },
  ]

  return (
    <Tabs
      items={items}
      activeKey={activeKey}
      onChange={(key) => {
        setActiveKey(key)
        notification.info({ message: `Switched to ${key}` })
      }}
      variant="border"
    />
  )
}

export default App
```

### Bottom Position

```tsx
import React from 'react'
import { Tabs, Typography } from 'asterui'

const App: React.FC = () => (
  <Tabs position="bottom" variant="border">
    <Tabs.Panel tab="Tab 1" tabKey="1">
      <Typography.Text>Content appears above the tabs</Typography.Text>
    </Tabs.Panel>
    <Tabs.Panel tab="Tab 2" tabKey="2">
      <Typography.Text>Second tab content</Typography.Text>
    </Tabs.Panel>
    <Tabs.Panel tab="Tab 3" tabKey="3">
      <Typography.Text>Third tab content</Typography.Text>
    </Tabs.Panel>
  </Tabs>
)

export default App
```

## API

### Tabs

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Tab panels (compound pattern) | `React.ReactNode` | `-` |
| `items` | Tab items (data-driven pattern) | `TabItem[]` | `-` |
| `activeKey` | Current active tab key (controlled) | `string` | `-` |
| `defaultActiveKey` | Default active tab key (uncontrolled) | `string` | `-` |
| `onChange` | Callback when tab changes | `(key: string) => void` | `-` |
| `variant` | Visual style variant | `'box' \| 'border' \| 'lift'` | `-` |
| `size` | Tab size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `-` |
| `position` | Tab position relative to content | `'top' \| 'bottom'` | `'top'` |
| `className` | Additional CSS classes | `string` | `-` |

### TabItem (for items prop)

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `key` | Unique identifier | `string` | `-` |
| `label` | Tab button label | `React.ReactNode` | `-` |
| `children` | Tab panel content | `React.ReactNode` | `-` |
| `disabled` | Disable the tab | `boolean` | `false` |
| `icon` | Tab icon | `React.ReactNode` | `-` |

### Tabs.Panel (compound pattern)

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `tab` | Tab button label | `React.ReactNode` | `-` |
| `tabKey` | Unique identifier for the tab | `string` | `-` |
| `disabled` | Disable the tab | `boolean` | `false` |
| `icon` | Tab icon | `React.ReactNode` | `-` |
| `children` | Tab panel content | `React.ReactNode` | `-` |
