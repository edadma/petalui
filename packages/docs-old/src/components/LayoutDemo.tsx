import React, { useState } from 'react'
import { Layout, Menu, Button } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// Icons for menu items
const DashboardIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const UsersIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const SettingsIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const AnalyticsIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

// Page content components
const pageContent: Record<string, React.ReactNode> = {
  dashboard: (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-primary/10 p-4 rounded-lg">
          <div className="text-2xl font-bold">1,234</div>
          <div className="text-sm opacity-70">Total Users</div>
        </div>
        <div className="bg-secondary/10 p-4 rounded-lg">
          <div className="text-2xl font-bold">$56.7k</div>
          <div className="text-sm opacity-70">Revenue</div>
        </div>
      </div>
    </div>
  ),
  users: (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Users</h2>
      <div className="space-y-2">
        {['Alice Johnson', 'Bob Smith', 'Carol Williams'].map((name) => (
          <div key={name} className="flex items-center gap-3 p-2 bg-base-200 rounded">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
              {name[0]}
            </div>
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  settings: (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Settings</h2>
      <div className="space-y-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="checkbox checkbox-sm" defaultChecked />
          <span>Email notifications</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="checkbox checkbox-sm" />
          <span>Dark mode</span>
        </label>
      </div>
    </div>
  ),
  analytics: (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Analytics</h2>
      <div className="h-24 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg flex items-end p-2 gap-1">
        {[40, 60, 35, 80, 55, 70, 45].map((h, i) => (
          <div key={i} className="flex-1 bg-primary rounded-t" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  ),
}

// @example-imports: { Layout } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Layout className="min-h-[300px] w-full border border-base-300 rounded-lg overflow-hidden">
        <Layout.Header className="bg-primary text-primary-content px-4">
          <div className="text-lg font-bold">Header</div>
        </Layout.Header>
        <Layout.Content className="bg-base-200 p-6">
          <div className="bg-base-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Content</h2>
            <p className="text-base-content/70">Main content area</p>
          </div>
        </Layout.Content>
        <Layout.Footer className="bg-neutral text-neutral-content px-4 py-3 text-center text-sm">
          Footer
        </Layout.Footer>
      </Layout>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Layout, Menu } from 'asterui'
export function WithSiderDemo() {
  // @example-include
  const DashboardIcon = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
  const UsersIcon = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
  const SettingsIcon = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Layout className="min-h-[300px] w-full border border-base-300 rounded-lg overflow-hidden">
        <Layout.Header className="bg-primary text-primary-content px-4">
          <div className="text-lg font-bold">Header</div>
        </Layout.Header>
        <Layout className="flex-1">
          <Layout.Sider width={160} className="p-2">
            <Menu size="sm">
              <Menu.Item key="home" icon={DashboardIcon}>Home</Menu.Item>
              <Menu.Item key="about" icon={UsersIcon}>About</Menu.Item>
              <Menu.Item key="contact" icon={SettingsIcon}>Contact</Menu.Item>
            </Menu>
          </Layout.Sider>
          <Layout.Content className="bg-base-200 p-6">
            <div className="bg-base-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Content</h2>
              <p className="text-base-content/70">Layout with sidebar navigation</p>
            </div>
          </Layout.Content>
        </Layout>
        <Layout.Footer className="bg-neutral text-neutral-content px-4 py-3 text-center text-sm">
          Footer
        </Layout.Footer>
      </Layout>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Layout, Menu } from 'asterui'
export function SiderRightDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Layout className="min-h-[300px] w-full border border-base-300 rounded-lg overflow-hidden">
        <Layout.Header className="bg-primary text-primary-content px-4">
          <div className="text-lg font-bold">Header</div>
        </Layout.Header>
        <Layout className="flex-1">
          <Layout.Content className="bg-base-200 p-6">
            <div className="bg-base-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Content</h2>
              <p className="text-base-content/70">Main content with right sidebar</p>
            </div>
          </Layout.Content>
          <Layout.Sider width={160} reverseArrow className="p-2 border-l border-base-300">
            <Menu size="sm">
              <Menu.Title>Quick Links</Menu.Title>
              <Menu.Item key="info">Info Panel</Menu.Item>
              <Menu.Item key="help">Help</Menu.Item>
              <Menu.Item key="docs">Documentation</Menu.Item>
            </Menu>
          </Layout.Sider>
        </Layout>
        <Layout.Footer className="bg-neutral text-neutral-content px-4 py-3 text-center text-sm">
          Footer
        </Layout.Footer>
      </Layout>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Layout, Menu, Button } from 'asterui'
// @example-imports: { useState } from 'react'
export function CollapsibleDemo() {
  // @example-include
  const [collapsed, setCollapsed] = useState(false)

  const DashboardIcon = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
  const UsersIcon = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
  const SettingsIcon = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Layout className="min-h-[300px] w-full border border-base-300 rounded-lg overflow-hidden">
        <Layout.Header className="bg-primary text-primary-content px-4 flex items-center justify-between">
          <div className="text-lg font-bold">Header</div>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setCollapsed(!collapsed)}
            className="text-primary-content"
          >
            {collapsed ? 'Expand' : 'Collapse'}
          </Button>
        </Layout.Header>
        <Layout className="flex-1">
          <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(c) => setCollapsed(c)}
            width={160}
            collapsedWidth={48}
            className="p-2"
          >
            <Menu size="sm">
              <Menu.Item key="dash" icon={DashboardIcon}>
                {!collapsed && 'Dashboard'}
              </Menu.Item>
              <Menu.Item key="users" icon={UsersIcon}>
                {!collapsed && 'Users'}
              </Menu.Item>
              <Menu.Item key="settings" icon={SettingsIcon}>
                {!collapsed && 'Settings'}
              </Menu.Item>
            </Menu>
          </Layout.Sider>
          <Layout.Content className="bg-base-200 p-6">
            <div className="bg-base-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Content</h2>
              <p className="text-base-content/70">Click the button or trigger to toggle the sidebar</p>
            </div>
          </Layout.Content>
        </Layout>
        <Layout.Footer className="bg-neutral text-neutral-content px-4 py-3 text-center text-sm">
          Footer
        </Layout.Footer>
      </Layout>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Layout, Menu } from 'asterui'
// @example-imports: { useState } from 'react'
export function MenuNavigationDemo() {
  // @example-include
  const [selectedKey, setSelectedKey] = useState('dashboard')

  const DashboardIcon = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
  const UsersIcon = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
  const AnalyticsIcon = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
  const SettingsIcon = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )

  const pageContent: Record<string, React.ReactNode> = {
    dashboard: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="text-2xl font-bold">1,234</div>
            <div className="text-sm opacity-70">Total Users</div>
          </div>
          <div className="bg-secondary/10 p-4 rounded-lg">
            <div className="text-2xl font-bold">$56.7k</div>
            <div className="text-sm opacity-70">Revenue</div>
          </div>
        </div>
      </div>
    ),
    users: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Users</h2>
        <div className="space-y-2">
          {['Alice Johnson', 'Bob Smith', 'Carol Williams'].map((name) => (
            <div key={name} className="flex items-center gap-3 p-2 bg-base-200 rounded">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                {name[0]}
              </div>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    settings: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Settings</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox checkbox-sm" defaultChecked />
            <span>Email notifications</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox checkbox-sm" />
            <span>Dark mode</span>
          </label>
        </div>
      </div>
    ),
    analytics: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Analytics</h2>
        <div className="h-24 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg flex items-end p-2 gap-1">
          {[40, 60, 35, 80, 55, 70, 45].map((h, i) => (
            <div key={i} className="flex-1 bg-primary rounded-t" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    ),
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Layout className="min-h-[350px] w-full border border-base-300 rounded-lg overflow-hidden">
        <Layout.Header className="bg-primary text-primary-content px-4">
          <div className="text-lg font-bold">App Name</div>
        </Layout.Header>
        <Layout className="flex-1">
          <Layout.Sider width={180} className="py-2">
            <Menu
              size="sm"
              selectedKeys={[selectedKey]}
              onSelect={setSelectedKey}
            >
              <Menu.Title>Navigation</Menu.Title>
              <Menu.Item key="dashboard" icon={DashboardIcon}>Dashboard</Menu.Item>
              <Menu.Item key="users" icon={UsersIcon}>Users</Menu.Item>
              <Menu.Item key="analytics" icon={AnalyticsIcon}>Analytics</Menu.Item>
              <Menu.Divider />
              <Menu.Item key="settings" icon={SettingsIcon}>Settings</Menu.Item>
            </Menu>
          </Layout.Sider>
          <Layout.Content className="bg-base-200 p-6">
            <div className="bg-base-100 p-4 rounded-lg min-h-[200px]">
              {pageContent[selectedKey]}
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Layout, Menu } from 'asterui'
// @example-imports: { useState } from 'react'
export function SubmenuDemo() {
  // @example-include
  const [selectedKey, setSelectedKey] = useState('general')

  const SettingsIcon = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
  const UsersIcon = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )

  const contentMap: Record<string, React.ReactNode> = {
    general: <div><h3 className="font-bold mb-2">General Settings</h3><p className="text-sm opacity-70">Configure general application settings</p></div>,
    security: <div><h3 className="font-bold mb-2">Security Settings</h3><p className="text-sm opacity-70">Manage security and authentication</p></div>,
    profile: <div><h3 className="font-bold mb-2">Profile Settings</h3><p className="text-sm opacity-70">Update your profile information</p></div>,
    team: <div><h3 className="font-bold mb-2">Team Members</h3><p className="text-sm opacity-70">Manage team member access</p></div>,
    roles: <div><h3 className="font-bold mb-2">Roles & Permissions</h3><p className="text-sm opacity-70">Configure role-based access</p></div>,
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Layout className="min-h-[350px] w-full border border-base-300 rounded-lg overflow-hidden">
        <Layout.Header className="bg-neutral text-neutral-content px-4">
          <div className="text-lg font-bold">Settings Panel</div>
        </Layout.Header>
        <Layout className="flex-1">
          <Layout.Sider width={200} className="py-2 border-r border-base-300">
            <Menu
              mode="inline"
              size="sm"
              selectedKeys={[selectedKey]}
              defaultOpenKeys={['settings', 'users']}
              onSelect={setSelectedKey}
            >
              <Menu.SubMenu key="settings" label="Settings" icon={SettingsIcon}>
                <Menu.Item key="general">General</Menu.Item>
                <Menu.Item key="security">Security</Menu.Item>
                <Menu.Item key="profile">Profile</Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu key="users" label="Users" icon={UsersIcon}>
                <Menu.Item key="team">Team Members</Menu.Item>
                <Menu.Item key="roles">Roles</Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Layout.Sider>
          <Layout.Content className="bg-base-200 p-6">
            <div className="bg-base-100 p-4 rounded-lg">
              {contentMap[selectedKey]}
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
      {/* @example-return-end */}
    </Demo>
  )
}
