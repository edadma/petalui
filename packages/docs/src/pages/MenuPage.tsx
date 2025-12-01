import { useState } from 'react'
import { Menu, Card, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const menuApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Menu items, submenus, titles, and dividers',
    type: 'ReactNode',
  },
  {
    property: 'mode',
    description: 'Menu display mode',
    type: "'vertical' | 'horizontal' | 'inline'",
    default: "'vertical'",
  },
  {
    property: 'selectedKeys',
    description: 'Controlled selected item keys',
    type: 'string[]',
  },
  {
    property: 'defaultSelectedKeys',
    description: 'Initial selected item keys',
    type: 'string[]',
    default: '[]',
  },
  {
    property: 'openKeys',
    description: 'Controlled open submenu keys',
    type: 'string[]',
  },
  {
    property: 'defaultOpenKeys',
    description: 'Initial open submenu keys',
    type: 'string[]',
    default: '[]',
  },
  {
    property: 'onSelect',
    description: 'Callback when an item is selected',
    type: '(key: string) => void',
  },
  {
    property: 'onOpenChange',
    description: 'Callback when open submenus change',
    type: '(openKeys: string[]) => void',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const menuItemApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Item content',
    type: 'ReactNode',
  },
  {
    property: 'itemKey',
    description: 'Unique key for the item',
    type: 'string',
  },
  {
    property: 'icon',
    description: 'Icon to display before the label',
    type: 'ReactNode',
  },
  {
    property: 'disabled',
    description: 'Whether the item is disabled',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'onClick',
    description: 'Click handler function',
    type: '() => void',
  },
  {
    property: 'active',
    description: 'Manual active state (deprecated, use itemKey)',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const menuSubMenuApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Submenu items',
    type: 'ReactNode',
  },
  {
    property: 'itemKey',
    description: 'Unique key for the submenu (required)',
    type: 'string',
  },
  {
    property: 'label',
    description: 'Submenu label',
    type: 'ReactNode',
  },
  {
    property: 'icon',
    description: 'Icon to display before the label',
    type: 'ReactNode',
  },
  {
    property: 'disabled',
    description: 'Whether the submenu is disabled',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const menuTitleApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Title text',
    type: 'ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

// Icons for examples
const HomeIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const SettingsIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const FolderIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
)

export function MenuPage() {
  const [selectedKey, setSelectedKey] = useState('home')
  const [horizontalKey, setHorizontalKey] = useState('nav1')
  const [inlineKey, setInlineKey] = useState('dashboard')

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Menu</h1>
        <p className="text-base-content/70">
          Versatile menu component with vertical, horizontal, and inline modes for navigation.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Menu with Keys"
          description="Menu with key-based selection. Items automatically track selection state."
          code={`import React, { useState } from 'react'
import { Menu } from '@edadma/bloomui'

const HomeIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const SettingsIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const App: React.FC = () => {
  const [selected, setSelected] = useState('home')

  return (
    <div className="w-64">
      <Menu selectedKeys={[selected]} onSelect={setSelected}>
        <Menu.Item itemKey="home" icon={<HomeIcon />}>Home</Menu.Item>
        <Menu.Item itemKey="users" icon={<UserIcon />}>Users</Menu.Item>
        <Menu.Item itemKey="settings" icon={<SettingsIcon />}>Settings</Menu.Item>
      </Menu>
      <p className="mt-2 text-sm">Selected: {selected}</p>
    </div>
  )
}

export default App`}
        >
          <div className="w-64">
            <Menu selectedKeys={[selectedKey]} onSelect={setSelectedKey}>
              <Menu.Item itemKey="home" icon={<HomeIcon />}>Home</Menu.Item>
              <Menu.Item itemKey="users" icon={<UserIcon />}>Users</Menu.Item>
              <Menu.Item itemKey="settings" icon={<SettingsIcon />}>Settings</Menu.Item>
            </Menu>
            <p className="mt-2 text-sm text-base-content/70">
              Selected: {selectedKey}
            </p>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Horizontal Menu"
          description="Horizontal menu for navigation bars."
          code={`import React, { useState } from 'react'
import { Menu } from '@edadma/bloomui'

const App: React.FC = () => {
  const [selected, setSelected] = useState('nav1')

  return (
    <div className="w-full bg-base-200 p-2 rounded-lg">
      <Menu mode="horizontal" selectedKeys={[selected]} onSelect={setSelected}>
        <Menu.Item itemKey="nav1">Navigation 1</Menu.Item>
        <Menu.Item itemKey="nav2">Navigation 2</Menu.Item>
        <Menu.Item itemKey="nav3">Navigation 3</Menu.Item>
      </Menu>
      <p className="mt-2 text-sm px-2">Selected: {selected}</p>
    </div>
  )
}

export default App`}
        >
          <div className="w-full bg-base-200 p-2 rounded-lg">
            <Menu mode="horizontal" selectedKeys={[horizontalKey]} onSelect={setHorizontalKey}>
              <Menu.Item itemKey="nav1">Navigation 1</Menu.Item>
              <Menu.Item itemKey="nav2">Navigation 2</Menu.Item>
              <Menu.Item itemKey="nav3">Navigation 3</Menu.Item>
            </Menu>
            <p className="mt-2 text-sm text-base-content/70 px-2">
              Selected: {horizontalKey}
            </p>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Inline Menu with Submenus"
          description="Collapsible submenus for sidebar navigation."
          code={`import React, { useState } from 'react'
import { Menu } from '@edadma/bloomui'

const HomeIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const SettingsIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const App: React.FC = () => {
  const [selected, setSelected] = useState('dashboard')

  return (
    <div className="w-64">
      <Menu
        mode="inline"
        defaultOpenKeys={['sub1']}
        selectedKeys={[selected]}
        onSelect={setSelected}
      >
        <Menu.SubMenu itemKey="sub1" label="Navigation" icon={<HomeIcon />}>
          <Menu.Item itemKey="dashboard">Dashboard</Menu.Item>
          <Menu.Item itemKey="analytics">Analytics</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu itemKey="sub2" label="Settings" icon={<SettingsIcon />}>
          <Menu.Item itemKey="profile">Profile</Menu.Item>
          <Menu.Item itemKey="preferences">Preferences</Menu.Item>
        </Menu.SubMenu>
      </Menu>
      <p className="mt-2 text-sm">Selected: {selected}</p>
    </div>
  )
}

export default App`}
        >
          <div className="w-64">
            <Menu
              mode="inline"
              defaultOpenKeys={['sub1']}
              selectedKeys={[inlineKey]}
              onSelect={setInlineKey}
            >
              <Menu.SubMenu itemKey="sub1" label="Navigation" icon={<HomeIcon />}>
                <Menu.Item itemKey="dashboard">Dashboard</Menu.Item>
                <Menu.Item itemKey="analytics">Analytics</Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu itemKey="sub2" label="Settings" icon={<SettingsIcon />}>
                <Menu.Item itemKey="profile">Profile</Menu.Item>
                <Menu.Item itemKey="preferences">Preferences</Menu.Item>
              </Menu.SubMenu>
            </Menu>
            <p className="mt-2 text-sm text-base-content/70">
              Selected: {inlineKey}
            </p>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Grouped Menu with Titles"
          description="Menu with titled sections for organization."
          code={`import React from 'react'
import { Menu } from '@edadma/bloomui'

const App: React.FC = () => {
  return (
    <div className="w-64">
      <Menu defaultSelectedKeys={['inbox']}>
        <Menu.Title>Messages</Menu.Title>
        <Menu.Item itemKey="inbox">Inbox</Menu.Item>
        <Menu.Item itemKey="sent">Sent</Menu.Item>
        <Menu.Divider />
        <Menu.Title>Folders</Menu.Title>
        <Menu.Item itemKey="drafts">Drafts</Menu.Item>
        <Menu.Item itemKey="trash">Trash</Menu.Item>
      </Menu>
    </div>
  )
}

export default App`}
        >
          <div className="w-64">
            <Menu defaultSelectedKeys={['inbox']}>
              <Menu.Title>Messages</Menu.Title>
              <Menu.Item itemKey="inbox">Inbox</Menu.Item>
              <Menu.Item itemKey="sent">Sent</Menu.Item>
              <Menu.Divider />
              <Menu.Title>Folders</Menu.Title>
              <Menu.Item itemKey="drafts">Drafts</Menu.Item>
              <Menu.Item itemKey="trash">Trash</Menu.Item>
            </Menu>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Menu with Icons"
          description="Menu items can include icons for better visual context."
          code={`import React from 'react'
import { Menu } from '@edadma/bloomui'

const HomeIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const FolderIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
)

const SettingsIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const App: React.FC = () => {
  return (
    <div className="w-64">
      <Menu defaultSelectedKeys={['home']}>
        <Menu.Item itemKey="home" icon={<HomeIcon />}>Home</Menu.Item>
        <Menu.Item itemKey="users" icon={<UserIcon />}>Users</Menu.Item>
        <Menu.Item itemKey="files" icon={<FolderIcon />}>Files</Menu.Item>
        <Menu.Item itemKey="settings" icon={<SettingsIcon />}>Settings</Menu.Item>
      </Menu>
    </div>
  )
}

export default App`}
        >
          <div className="w-64">
            <Menu defaultSelectedKeys={['home']}>
              <Menu.Item itemKey="home" icon={<HomeIcon />}>Home</Menu.Item>
              <Menu.Item itemKey="users" icon={<UserIcon />}>Users</Menu.Item>
              <Menu.Item itemKey="files" icon={<FolderIcon />}>Files</Menu.Item>
              <Menu.Item itemKey="settings" icon={<SettingsIcon />}>Settings</Menu.Item>
            </Menu>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Disabled Items"
          description="Menu items can be disabled."
          code={`import React from 'react'
import { Menu } from '@edadma/bloomui'

const App: React.FC = () => {
  return (
    <div className="w-64">
      <Menu defaultSelectedKeys={['item1']}>
        <Menu.Item itemKey="item1">Active Item</Menu.Item>
        <Menu.Item itemKey="item2" disabled>Disabled Item</Menu.Item>
        <Menu.Item itemKey="item3">Another Item</Menu.Item>
      </Menu>
    </div>
  )
}

export default App`}
        >
          <div className="w-64">
            <Menu defaultSelectedKeys={['item1']}>
              <Menu.Item itemKey="item1">Active Item</Menu.Item>
              <Menu.Item itemKey="item2" disabled>Disabled Item</Menu.Item>
              <Menu.Item itemKey="item3">Another Item</Menu.Item>
            </Menu>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Menu in Card"
          description="Menu styled within a card container."
          code={`import React from 'react'
import { Menu, Card } from '@edadma/bloomui'

const App: React.FC = () => {
  return (
    <div className="w-64">
      <Card bordered className="[&>.card-body]:p-0">
        <Menu defaultSelectedKeys={['inbox']}>
          <Menu.Item itemKey="inbox">Inbox</Menu.Item>
          <Menu.Item itemKey="sent">Sent</Menu.Item>
          <Menu.Item itemKey="drafts">Drafts</Menu.Item>
          <Menu.Item itemKey="trash">Trash</Menu.Item>
        </Menu>
      </Card>
    </div>
  )
}

export default App`}
        >
          <div className="w-64">
            <Card bordered className="[&>.card-body]:p-0">
              <Menu defaultSelectedKeys={['inbox']}>
                <Menu.Item itemKey="inbox">Inbox</Menu.Item>
                <Menu.Item itemKey="sent">Sent</Menu.Item>
                <Menu.Item itemKey="drafts">Drafts</Menu.Item>
                <Menu.Item itemKey="trash">Trash</Menu.Item>
              </Menu>
            </Card>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Nested Submenus"
          description="Submenus can contain multiple levels of items."
          code={`import React from 'react'
import { Menu } from '@edadma/bloomui'

const FolderIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const App: React.FC = () => {
  return (
    <div className="w-64">
      <Menu mode="inline" defaultOpenKeys={['files']}>
        <Menu.SubMenu itemKey="files" label="Files" icon={<FolderIcon />}>
          <Menu.Item itemKey="documents">Documents</Menu.Item>
          <Menu.Item itemKey="images">Images</Menu.Item>
          <Menu.Item itemKey="videos">Videos</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu itemKey="users" label="Users" icon={<UserIcon />}>
          <Menu.Item itemKey="admins">Admins</Menu.Item>
          <Menu.Item itemKey="members">Members</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  )
}

export default App`}
        >
          <div className="w-64">
            <Menu mode="inline" defaultOpenKeys={['files']}>
              <Menu.SubMenu itemKey="files" label="Files" icon={<FolderIcon />}>
                <Menu.Item itemKey="documents">Documents</Menu.Item>
                <Menu.Item itemKey="images">Images</Menu.Item>
                <Menu.Item itemKey="videos">Videos</Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu itemKey="users" label="Users" icon={<UserIcon />}>
                <Menu.Item itemKey="admins">Admins</Menu.Item>
                <Menu.Item itemKey="members">Members</Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </div>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Menu" data={menuApi} />
        <ApiTable title="Menu.Item" data={menuItemApi} className="mt-8" />
        <ApiTable title="Menu.SubMenu" data={menuSubMenuApi} className="mt-8" />
        <ApiTable title="Menu.Title" data={menuTitleApi} className="mt-8" />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Menu Modes:</strong>
            <ul className="list-disc list-inside mt-2">
              <li><code>vertical</code> - Default vertical list (for sidebars)</li>
              <li><code>horizontal</code> - Horizontal menu (for navigation bars)</li>
              <li><code>inline</code> - Vertical with collapsible submenus (for app sidebars)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
