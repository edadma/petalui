import { useState } from 'react'
import { Layout, Menu, Breadcrumb, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const layoutApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Layout content (Header, Footer, Sider, Content, or nested Layout)',
    type: 'ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
  {
    property: 'style',
    description: 'Inline styles',
    type: 'CSSProperties',
  },
]

const headerApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Header content',
    type: 'ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
  {
    property: 'style',
    description: 'Inline styles',
    type: 'CSSProperties',
  },
]

const siderApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Sider content',
    type: 'ReactNode',
  },
  {
    property: 'width',
    description: 'Width of the sider',
    type: 'number | string',
    default: '200',
  },
  {
    property: 'collapsedWidth',
    description: 'Width when collapsed',
    type: 'number | string',
    default: '80',
  },
  {
    property: 'collapsed',
    description: 'Controlled collapsed state',
    type: 'boolean',
  },
  {
    property: 'defaultCollapsed',
    description: 'Initial collapsed state',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'collapsible',
    description: 'Whether the sider can be collapsed',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'onCollapse',
    description: 'Callback when collapsed state changes',
    type: '(collapsed: boolean) => void',
  },
  {
    property: 'trigger',
    description: 'Custom collapse trigger, or null to hide',
    type: 'ReactNode | null',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const contentApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Main content',
    type: 'ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
  {
    property: 'style',
    description: 'Inline styles',
    type: 'CSSProperties',
  },
]

const footerApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Footer content',
    type: 'ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
  {
    property: 'style',
    description: 'Inline styles',
    type: 'CSSProperties',
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

export function LayoutPage() {
  const [selectedKey1, setSelectedKey1] = useState('1')
  const [selectedKey2, setSelectedKey2] = useState('dashboard')
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Layout</h1>
        <p className="text-base-content/70">
          Page layout components for building application shells with header, sidebar, content, and footer.
        </p>
      </div>

      <Masonry columns={{ xs: 1 }} gap={4}>
        <ExampleSection
          title="Basic Layout"
          description="Simple layout with header, content, and footer."
          code={`import React from 'react'
import { Layout } from '@edadma/bloomui'

const App: React.FC = () => {
  return (
    <Layout className="min-h-[300px]">
      <Layout.Header>
        <span className="font-semibold">Header</span>
      </Layout.Header>
      <Layout.Content className="p-6 bg-base-100">
        <div className="h-full flex items-center justify-center text-base-content/50">
          Content
        </div>
      </Layout.Content>
      <Layout.Footer>Footer</Layout.Footer>
    </Layout>
  )
}

export default App`}
        >
          <div className="w-full border border-base-300 rounded-lg overflow-hidden">
            <Layout className="min-h-[300px]">
              <Layout.Header>
                <span className="font-semibold">Header</span>
              </Layout.Header>
              <Layout.Content className="p-6 bg-base-100">
                <div className="h-full flex items-center justify-center text-base-content/50">
                  Content
                </div>
              </Layout.Content>
              <Layout.Footer>Footer</Layout.Footer>
            </Layout>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Header with Navigation"
          description="Header with horizontal menu navigation."
          code={`import React, { useState } from 'react'
import { Layout, Menu } from '@edadma/bloomui'

const App: React.FC = () => {
  const [selected, setSelected] = useState('1')

  return (
    <Layout className="min-h-[300px]">
      <Layout.Header className="bg-neutral text-neutral-content">
        <div className="font-bold text-xl mr-8">Logo</div>
        <Menu
          mode="horizontal"
          selectedKeys={[selected]}
          onSelect={setSelected}
          className="bg-transparent flex-1"
        >
          <Menu.Item itemKey="1">Nav 1</Menu.Item>
          <Menu.Item itemKey="2">Nav 2</Menu.Item>
          <Menu.Item itemKey="3">Nav 3</Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content className="p-6 bg-base-100">
        <div className="text-base-content/50">
          Selected: Nav {selected}
        </div>
      </Layout.Content>
    </Layout>
  )
}

export default App`}
        >
          <div className="w-full border border-base-300 rounded-lg overflow-hidden">
            <Layout className="min-h-[300px]">
              <Layout.Header className="bg-neutral text-neutral-content">
                <div className="font-bold text-xl mr-8">Logo</div>
                <Menu
                  mode="horizontal"
                  selectedKeys={[selectedKey1]}
                  onSelect={setSelectedKey1}
                  className="bg-transparent flex-1"
                >
                  <Menu.Item itemKey="1">Nav 1</Menu.Item>
                  <Menu.Item itemKey="2">Nav 2</Menu.Item>
                  <Menu.Item itemKey="3">Nav 3</Menu.Item>
                </Menu>
              </Layout.Header>
              <Layout.Content className="p-6 bg-base-100">
                <div className="text-base-content/50">
                  Selected: Nav {selectedKey1}
                </div>
              </Layout.Content>
            </Layout>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Layout with Sider"
          description="Layout with a sidebar for navigation."
          code={`import React, { useState } from 'react'
import { Layout, Menu } from '@edadma/bloomui'

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
    <Layout className="min-h-[400px]">
      <Layout.Sider width={200}>
        <Menu
          mode="inline"
          defaultOpenKeys={['sub1']}
          selectedKeys={[selected]}
          onSelect={setSelected}
          className="h-full"
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
      </Layout.Sider>
      <Layout.Content className="p-6 bg-base-100">
        <div className="text-base-content/50">
          Selected: {selected}
        </div>
      </Layout.Content>
    </Layout>
  )
}

export default App`}
        >
          <div className="w-full border border-base-300 rounded-lg overflow-hidden">
            <Layout className="min-h-[400px]">
              <Layout.Sider width={200}>
                <Menu
                  mode="inline"
                  defaultOpenKeys={['sub1']}
                  selectedKeys={[selectedKey2]}
                  onSelect={setSelectedKey2}
                  className="h-full"
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
              </Layout.Sider>
              <Layout.Content className="p-6 bg-base-100">
                <div className="text-base-content/50">
                  Selected: {selectedKey2}
                </div>
              </Layout.Content>
            </Layout>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Collapsible Sider"
          description="Sidebar that can be collapsed to save space."
          code={`import React, { useState } from 'react'
import { Layout, Menu } from '@edadma/bloomui'

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
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className="min-h-[400px]">
      <Layout.Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={200}
        collapsedWidth={64}
      >
        <Menu mode="inline" selectedKeys={['1']} className="h-full">
          <Menu.Item itemKey="1" icon={<HomeIcon />}>
            {!collapsed && 'Home'}
          </Menu.Item>
          <Menu.Item itemKey="2" icon={<UserIcon />}>
            {!collapsed && 'Users'}
          </Menu.Item>
          <Menu.Item itemKey="3" icon={<FolderIcon />}>
            {!collapsed && 'Files'}
          </Menu.Item>
          <Menu.Item itemKey="4" icon={<SettingsIcon />}>
            {!collapsed && 'Settings'}
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout.Content className="p-6 bg-base-100">
        <p className="text-base-content/50">
          Sider is {collapsed ? 'collapsed' : 'expanded'}
        </p>
      </Layout.Content>
    </Layout>
  )
}

export default App`}
        >
          <div className="w-full border border-base-300 rounded-lg overflow-hidden">
            <Layout className="min-h-[400px]">
              <Layout.Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                width={200}
                collapsedWidth={64}
              >
                <Menu mode="inline" selectedKeys={['1']} className="h-full">
                  <Menu.Item itemKey="1" icon={<HomeIcon />}>
                    {!collapsed && 'Home'}
                  </Menu.Item>
                  <Menu.Item itemKey="2" icon={<UserIcon />}>
                    {!collapsed && 'Users'}
                  </Menu.Item>
                  <Menu.Item itemKey="3" icon={<FolderIcon />}>
                    {!collapsed && 'Files'}
                  </Menu.Item>
                  <Menu.Item itemKey="4" icon={<SettingsIcon />}>
                    {!collapsed && 'Settings'}
                  </Menu.Item>
                </Menu>
              </Layout.Sider>
              <Layout.Content className="p-6 bg-base-100">
                <p className="text-base-content/50">
                  Sider is {collapsed ? 'collapsed' : 'expanded'}
                </p>
              </Layout.Content>
            </Layout>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Full Application Layout"
          description="Complete layout with header, sidebar, breadcrumb, content, and footer."
          code={`import React from 'react'
import { Layout, Menu, Breadcrumb } from '@edadma/bloomui'

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
    <Layout className="min-h-[500px]">
      <Layout.Header className="bg-neutral text-neutral-content">
        <div className="font-bold text-xl mr-8">Logo</div>
        <Menu mode="horizontal" selectedKeys={['nav2']} className="bg-transparent flex-1">
          <Menu.Item itemKey="nav1">Nav 1</Menu.Item>
          <Menu.Item itemKey="nav2">Nav 2</Menu.Item>
          <Menu.Item itemKey="nav3">Nav 3</Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout className="flex-1">
        <Layout.Sider width={200} className="bg-base-100">
          <Menu mode="inline" defaultOpenKeys={['sub1']} selectedKeys={['1']} className="h-full">
            <Menu.SubMenu itemKey="sub1" icon={<UserIcon />} label="subnav 1">
              <Menu.Item itemKey="1">option1</Menu.Item>
              <Menu.Item itemKey="2">option2</Menu.Item>
              <Menu.Item itemKey="3">option3</Menu.Item>
              <Menu.Item itemKey="4">option4</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu itemKey="sub2" icon={<FolderIcon />} label="subnav 2">
              <Menu.Item itemKey="5">option5</Menu.Item>
              <Menu.Item itemKey="6">option6</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu itemKey="sub3" icon={<SettingsIcon />} label="subnav 3">
              <Menu.Item itemKey="7">option7</Menu.Item>
              <Menu.Item itemKey="8">option8</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Layout.Sider>
        <Layout className="flex-col bg-base-200">
          <div className="px-6 py-4">
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Layout.Content className="mx-6 mb-6 p-6 bg-base-100 rounded-lg">
            <div className="text-base-content/50">Content</div>
          </Layout.Content>
        </Layout>
      </Layout>
      <Layout.Footer>PetalUI</Layout.Footer>
    </Layout>
  )
}

export default App`}
        >
          <div className="w-full border border-base-300 rounded-lg overflow-hidden">
            <Layout className="min-h-[500px]">
              <Layout.Header className="bg-neutral text-neutral-content">
                <div className="font-bold text-xl mr-8">Logo</div>
                <Menu mode="horizontal" selectedKeys={['nav2']} className="bg-transparent flex-1">
                  <Menu.Item itemKey="nav1">Nav 1</Menu.Item>
                  <Menu.Item itemKey="nav2">Nav 2</Menu.Item>
                  <Menu.Item itemKey="nav3">Nav 3</Menu.Item>
                </Menu>
              </Layout.Header>
              <Layout className="flex-1">
                <Layout.Sider width={200} className="bg-base-100">
                  <Menu mode="inline" defaultOpenKeys={['sub1']} selectedKeys={['1']} className="h-full">
                    <Menu.SubMenu itemKey="sub1" icon={<UserIcon />} label="subnav 1">
                      <Menu.Item itemKey="1">option1</Menu.Item>
                      <Menu.Item itemKey="2">option2</Menu.Item>
                      <Menu.Item itemKey="3">option3</Menu.Item>
                      <Menu.Item itemKey="4">option4</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu itemKey="sub2" icon={<FolderIcon />} label="subnav 2">
                      <Menu.Item itemKey="5">option5</Menu.Item>
                      <Menu.Item itemKey="6">option6</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu itemKey="sub3" icon={<SettingsIcon />} label="subnav 3">
                      <Menu.Item itemKey="7">option7</Menu.Item>
                      <Menu.Item itemKey="8">option8</Menu.Item>
                    </Menu.SubMenu>
                  </Menu>
                </Layout.Sider>
                <Layout className="flex-col bg-base-200">
                  <div className="px-6 py-4">
                    <Breadcrumb>
                      <Breadcrumb.Item>Home</Breadcrumb.Item>
                      <Breadcrumb.Item>List</Breadcrumb.Item>
                      <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <Layout.Content className="mx-6 mb-6 p-6 bg-base-100 rounded-lg">
                    <div className="text-base-content/50">Content</div>
                  </Layout.Content>
                </Layout>
              </Layout>
              <Layout.Footer>PetalUI</Layout.Footer>
            </Layout>
          </div>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Layout" data={layoutApi} />
        <ApiTable title="Layout.Header" data={headerApi} className="mt-8" />
        <ApiTable title="Layout.Sider" data={siderApi} className="mt-8" />
        <ApiTable title="Layout.Content" data={contentApi} className="mt-8" />
        <ApiTable title="Layout.Footer" data={footerApi} className="mt-8" />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Layout Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Layout automatically detects Sider children and adjusts flex direction</li>
              <li>Nest Layout components to create complex layouts with multiple sidebars</li>
              <li>Use <code>collapsible</code> on Sider for responsive sidebars</li>
              <li>Combine with Menu component for navigation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
