import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Tabs, Input, Button, notification, Space, Typography } from 'asterui'
import { HomeIcon, UserIcon, CogIcon } from '@heroicons/react/24/outline'

// Basic demo
const BasicDemo: React.FC = () => (
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

// Settings demo
const SettingsDemo: React.FC = () => (
  <Tabs defaultActiveKey="account" variant="border">
    <Tabs.Panel tab="Account" tabKey="account">
      <Space direction="vertical" size="md">
        <Input floatingLabel="Username" placeholder="john_doe" />
        <Input floatingLabel="Email" type="email" placeholder="john@example.com" />
        <Button color="primary">Save</Button>
      </Space>
    </Tabs.Panel>
    <Tabs.Panel tab="Security" tabKey="security">
      <Space direction="vertical" size="md">
        <Input floatingLabel="Current Password" type="password" />
        <Input floatingLabel="New Password" type="password" />
        <Button color="primary">Update</Button>
      </Space>
    </Tabs.Panel>
  </Tabs>
)

// Box variant demo
const BoxDemo: React.FC = () => (
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

// Lift variant demo
const LiftDemo: React.FC = () => (
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

// Sizes demo
const SizesDemo: React.FC = () => (
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

// Disabled demo
const DisabledDemo: React.FC = () => (
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

// Data-driven demo
const DataDrivenDemo: React.FC = () => {
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

// Position demo
const PositionDemo: React.FC = () => (
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

const demos: Record<string, React.FC> = {
  basic: BasicDemo,
  settings: SettingsDemo,
  box: BoxDemo,
  lift: LiftDemo,
  sizes: SizesDemo,
  disabled: DisabledDemo,
  datadriven: DataDrivenDemo,
  position: PositionDemo,
}

document.querySelectorAll('.demo-container').forEach((container) => {
  const example = container.getAttribute('data-example')
  if (example && demos[example]) {
    const root = createRoot(container)
    const Demo = demos[example]
    root.render(<Demo />)
  }
})
