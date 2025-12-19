import React, { useState } from 'react'
import { Tabs, Input, Button, notification, Space, Typography } from '@aster-ui/prefixed'
import { HomeIcon, UserIcon, Cog6ToothIcon } from '@aster-ui/icons-prefixed'
import { Demo } from './Demo'

// @example-imports: { Tabs, Typography } from 'asterui'
export const BasicDemo: React.FC = () => (
  <Demo>
    {/* @example-return */}
    <Tabs>
      <Tabs.Panel tab="Tab 1" key="1">
        <Typography.Text>Content of Tab 1</Typography.Text>
      </Tabs.Panel>
      <Tabs.Panel tab="Tab 2" key="2">
        <Typography.Text>Content of Tab 2</Typography.Text>
      </Tabs.Panel>
      <Tabs.Panel tab="Tab 3" key="3">
        <Typography.Text>Content of Tab 3</Typography.Text>
      </Tabs.Panel>
    </Tabs>
    {/* @example-return-end */}
  </Demo>
)

// @example-imports: { Tabs, Space, Input, Button } from 'asterui'
export const SettingsDemo: React.FC = () => (
  <Demo>
    {/* @example-return */}
    <Tabs defaultActiveKey="account" variant="border">
      <Tabs.Panel tab="Account" key="account">
        <Space direction="vertical" size="md">
          <Input floatingLabel="Username" placeholder="john_doe" />
          <Input floatingLabel="Email" type="email" placeholder="john@example.com" />
          <Button color="primary">Save</Button>
        </Space>
      </Tabs.Panel>
      <Tabs.Panel tab="Security" key="security">
        <Space direction="vertical" size="md">
          <Input floatingLabel="Current Password" type="password" />
          <Input floatingLabel="New Password" type="password" />
          <Button color="primary">Update</Button>
        </Space>
      </Tabs.Panel>
    </Tabs>
    {/* @example-return-end */}
  </Demo>
)

// @example-imports: { Tabs, Typography } from 'asterui'
export const BoxDemo: React.FC = () => (
  <Demo>
    {/* @example-return */}
    <Tabs variant="box">
      <Tabs.Panel tab="Home" key="home">
        <Typography.Text>Home content</Typography.Text>
      </Tabs.Panel>
      <Tabs.Panel tab="Profile" key="profile">
        <Typography.Text>Profile content</Typography.Text>
      </Tabs.Panel>
      <Tabs.Panel tab="Settings" key="settings">
        <Typography.Text>Settings content</Typography.Text>
      </Tabs.Panel>
    </Tabs>
    {/* @example-return-end */}
  </Demo>
)

// @example-imports: { Tabs, Typography } from 'asterui'
export const LiftDemo: React.FC = () => (
  <Demo>
    {/* @example-return */}
    <Tabs variant="lift">
      <Tabs.Panel tab="Overview" key="1">
        <Typography.Text>Overview content</Typography.Text>
      </Tabs.Panel>
      <Tabs.Panel tab="Reports" key="2">
        <Typography.Text>Reports content</Typography.Text>
      </Tabs.Panel>
      <Tabs.Panel tab="Analytics" key="3">
        <Typography.Text>Analytics content</Typography.Text>
      </Tabs.Panel>
    </Tabs>
    {/* @example-return-end */}
  </Demo>
)

// @example-imports: { Tabs, Space, Typography } from 'asterui'
export const SizesDemo: React.FC = () => (
  <Demo>
    {/* @example-return */}
    <Space direction="vertical" size="md">
      <div>
        <Typography.Text strong>Small</Typography.Text>
        <Tabs size="sm">
          <Tabs.Panel tab="Tab 1" key="1"><Typography.Text>Small tabs content</Typography.Text></Tabs.Panel>
          <Tabs.Panel tab="Tab 2" key="2"><Typography.Text>Content 2</Typography.Text></Tabs.Panel>
        </Tabs>
      </div>
      <div>
        <Typography.Text strong>Large</Typography.Text>
        <Tabs size="lg">
          <Tabs.Panel tab="Tab 1" key="1"><Typography.Text>Large tabs content</Typography.Text></Tabs.Panel>
          <Tabs.Panel tab="Tab 2" key="2"><Typography.Text>Content 2</Typography.Text></Tabs.Panel>
        </Tabs>
      </div>
    </Space>
    {/* @example-return-end */}
  </Demo>
)

// @example-imports: { Tabs, Typography } from 'asterui'
export const DisabledDemo: React.FC = () => (
  <Demo>
    {/* @example-return */}
    <Tabs>
      <Tabs.Panel tab="Active" key="1">
        <Typography.Text>Active content</Typography.Text>
      </Tabs.Panel>
      <Tabs.Panel tab="Disabled" key="2" disabled>
        <Typography.Text>Cannot see this</Typography.Text>
      </Tabs.Panel>
      <Tabs.Panel tab="Also Active" key="3">
        <Typography.Text>Active content</Typography.Text>
      </Tabs.Panel>
    </Tabs>
    {/* @example-return-end */}
  </Demo>
)

// @example-imports: { Tabs, notification, Typography } from 'asterui'
// @example-imports: { HomeIcon, UserIcon, Cog6ToothIcon } from '@aster-ui/icons'
// @example-imports: { useState } from 'react'
export const DataDrivenDemo: React.FC = () => {
  // @example-include
  const [activeKey, setActiveKey] = useState('home')

  const items = [
    { key: 'home', label: 'Home', icon: <HomeIcon size="sm" />, children: <Typography.Text>Home content</Typography.Text> },
    { key: 'profile', label: 'Profile', icon: <UserIcon size="sm" />, children: <Typography.Text>Profile content</Typography.Text> },
    { key: 'settings', label: 'Settings', icon: <Cog6ToothIcon size="sm" />, children: <Typography.Text>Settings content</Typography.Text> },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Tabs
        items={items}
        activeKey={activeKey}
        onChange={(key) => {
          setActiveKey(key)
          notification.info({ message: `Switched to ${key}` })
        }}
        variant="border"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Tabs, Typography } from 'asterui'
export const PositionDemo: React.FC = () => (
  <Demo>
    {/* @example-return */}
    <Tabs position="bottom" variant="border">
      <Tabs.Panel tab="Tab 1" key="1">
        <Typography.Text>Content appears above the tabs</Typography.Text>
      </Tabs.Panel>
      <Tabs.Panel tab="Tab 2" key="2">
        <Typography.Text>Second tab content</Typography.Text>
      </Tabs.Panel>
      <Tabs.Panel tab="Tab 3" key="3">
        <Typography.Text>Third tab content</Typography.Text>
      </Tabs.Panel>
    </Tabs>
    {/* @example-return-end */}
  </Demo>
)
