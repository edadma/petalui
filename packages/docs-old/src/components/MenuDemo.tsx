import React, { useState } from 'react';
import { Menu, Space, notification } from '@aster-ui/prefixed';
import { HomeIcon, FolderIcon, UsersIcon, Cog6ToothIcon } from '@aster-ui/icons-prefixed';
import { Demo } from './Demo';

// @example-imports: { Menu } from 'asterui'
// @example-imports: { useState } from 'react'
export function BasicDemo() {
  // @example-include
  const [selected, setSelected] = useState('dashboard')
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Menu selectedKeys={[selected]} onSelect={setSelected}>
        <Menu.Item key="dashboard">Dashboard</Menu.Item>
        <Menu.Item key="projects">Projects</Menu.Item>
        <Menu.Item key="team">Team</Menu.Item>
        <Menu.Item key="settings">Settings</Menu.Item>
      </Menu>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Menu } from 'asterui'
// @example-imports: { useState } from 'react'
export function HorizontalDemo() {
  // @example-include
  const [selected, setSelected] = useState('home')
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Menu mode="horizontal" selectedKeys={[selected]} onSelect={setSelected}>
        <Menu.Item key="home">Home</Menu.Item>
        <Menu.Item key="about">About</Menu.Item>
        <Menu.Item key="services">Services</Menu.Item>
        <Menu.Item key="contact">Contact</Menu.Item>
      </Menu>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Menu } from 'asterui'
// @example-imports: { HomeIcon, FolderIcon, UsersIcon, Cog6ToothIcon } from '@aster-ui/icons'
// @example-imports: { useState } from 'react'
export function WithIconsDemo() {
  // @example-include
  const [selected, setSelected] = useState('dashboard')
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Menu selectedKeys={[selected]} onSelect={setSelected}>
        <Menu.Item key="dashboard" icon={<HomeIcon />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="projects" icon={<FolderIcon />}>
          Projects
        </Menu.Item>
        <Menu.Item key="team" icon={<UsersIcon />}>
          Team
        </Menu.Item>
        <Menu.Item key="settings" icon={<Cog6ToothIcon />}>
          Settings
        </Menu.Item>
      </Menu>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Menu } from 'asterui'
// @example-imports: { useState } from 'react'
export function SubmenuDemo() {
  // @example-include
  const [selected, setSelected] = useState('dashboard')
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Menu selectedKeys={[selected]} onSelect={setSelected} defaultOpenKeys={['projects']}>
        <Menu.Item key="dashboard">Dashboard</Menu.Item>
        <Menu.SubMenu key="projects" label="Projects">
          <Menu.Item key="active">Active Projects</Menu.Item>
          <Menu.Item key="archived">Archived</Menu.Item>
          <Menu.Item key="templates">Templates</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="team" label="Team">
          <Menu.Item key="members">Members</Menu.Item>
          <Menu.Item key="roles">Roles</Menu.Item>
          <Menu.Item key="permissions">Permissions</Menu.Item>
        </Menu.SubMenu>
        <Menu.Divider />
        <Menu.Title>Admin</Menu.Title>
        <Menu.Item key="admin-settings">Settings</Menu.Item>
        <Menu.Item key="billing">Billing</Menu.Item>
      </Menu>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Menu, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="lg" wrap>
        <div>
          <div className="text-sm font-semibold mb-2">Extra Small</div>
          <Menu size="xs" defaultSelectedKeys={['dashboard']}>
            <Menu.Item key="dashboard">Dashboard</Menu.Item>
            <Menu.Item key="projects">Projects</Menu.Item>
            <Menu.Item key="team">Team</Menu.Item>
          </Menu>
        </div>

        <div>
          <div className="text-sm font-semibold mb-2">Small</div>
          <Menu size="sm" defaultSelectedKeys={['dashboard']}>
            <Menu.Item key="dashboard">Dashboard</Menu.Item>
            <Menu.Item key="projects">Projects</Menu.Item>
            <Menu.Item key="team">Team</Menu.Item>
          </Menu>
        </div>

        <div>
          <div className="text-sm font-semibold mb-2">Medium</div>
          <Menu size="md" defaultSelectedKeys={['dashboard']}>
            <Menu.Item key="dashboard">Dashboard</Menu.Item>
            <Menu.Item key="projects">Projects</Menu.Item>
            <Menu.Item key="team">Team</Menu.Item>
          </Menu>
        </div>

        <div>
          <div className="text-sm font-semibold mb-2">Large</div>
          <Menu size="lg" defaultSelectedKeys={['dashboard']}>
            <Menu.Item key="dashboard">Dashboard</Menu.Item>
            <Menu.Item key="projects">Projects</Menu.Item>
            <Menu.Item key="team">Team</Menu.Item>
          </Menu>
        </div>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Menu, notification } from 'asterui'
// @example-imports: { HomeIcon, FolderIcon, Cog6ToothIcon } from '@aster-ui/icons'
// @example-imports: { useState } from 'react'
export function DataDrivenDemo() {
  // @example-include
  const [selected, setSelected] = useState('dashboard')

  const items = [
    { key: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
    { key: 'projects', label: 'Projects', icon: <FolderIcon />, children: [
      { key: 'active', label: 'Active Projects' },
      { key: 'archived', label: 'Archived' },
    ]},
    { key: 'divider1', divider: true },
    { key: 'admin', label: 'Admin', title: true },
    { key: 'settings', label: 'Settings', icon: <Cog6ToothIcon /> },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Menu
        items={items}
        selectedKeys={[selected]}
        onSelect={(key) => {
          setSelected(key)
          notification.info({ message: `Selected: ${key}` })
        }}
      />
      {/* @example-return-end */}
    </Demo>
  )
}
