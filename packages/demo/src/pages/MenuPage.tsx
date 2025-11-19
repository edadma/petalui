import { useState } from 'react'
import { Menu, Card } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const menuApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Menu items and titles',
    type: 'ReactNode',
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
    property: 'onClick',
    description: 'Click handler function',
    type: '() => void',
  },
  {
    property: 'active',
    description: 'Whether the menu item is active/selected',
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

export function MenuPage() {
  const [activeKey1, setActiveKey1] = useState('home')
  const [activeKey2, setActiveKey2] = useState('dashboard')

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Menu</h1>
        <p className="text-base-content/70">
          Composable vertical menu component for navigation lists and grouped items.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Menu"
          description="Simple menu with clickable items."
          code={`import React, { useState } from 'react'
import { Menu } from '@edadma/petalui'

const App: React.FC = () => {
  const [active, setActive] = useState('home')

  return (
    <Menu>
      <Menu.Item active={active === 'home'} onClick={() => setActive('home')}>
        Home
      </Menu.Item>
      <Menu.Item active={active === 'about'} onClick={() => setActive('about')}>
        About
      </Menu.Item>
      <Menu.Item active={active === 'contact'} onClick={() => setActive('contact')}>
        Contact
      </Menu.Item>
    </Menu>
  )
}

export default App`}
        >
          <div className="w-64">
            <Menu>
              <Menu.Item active={activeKey1 === 'home'} onClick={() => setActiveKey1('home')}>
                Home
              </Menu.Item>
              <Menu.Item active={activeKey1 === 'about'} onClick={() => setActiveKey1('about')}>
                About
              </Menu.Item>
              <Menu.Item active={activeKey1 === 'contact'} onClick={() => setActiveKey1('contact')}>
                Contact
              </Menu.Item>
            </Menu>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Grouped Menu"
          description="Menu with titled sections."
          code={`import React, { useState } from 'react'
import { Menu } from '@edadma/petalui'

const App: React.FC = () => {
  const [active, setActive] = useState('dashboard')

  return (
    <Menu>
      <Menu.Title>Main</Menu.Title>
      <Menu.Item active={active === 'dashboard'} onClick={() => setActive('dashboard')}>
        Dashboard
      </Menu.Item>
      <Menu.Item active={active === 'analytics'} onClick={() => setActive('analytics')}>
        Analytics
      </Menu.Item>

      <Menu.Title>Settings</Menu.Title>
      <Menu.Item active={active === 'profile'} onClick={() => setActive('profile')}>
        Profile
      </Menu.Item>
      <Menu.Item active={active === 'preferences'} onClick={() => setActive('preferences')}>
        Preferences
      </Menu.Item>
    </Menu>
  )
}

export default App`}
        >
          <div className="w-64">
            <Menu>
              <Menu.Title>Main</Menu.Title>
              <Menu.Item active={activeKey2 === 'dashboard'} onClick={() => setActiveKey2('dashboard')}>
                Dashboard
              </Menu.Item>
              <Menu.Item active={activeKey2 === 'analytics'} onClick={() => setActiveKey2('analytics')}>
                Analytics
              </Menu.Item>

              <Menu.Title>Settings</Menu.Title>
              <Menu.Item active={activeKey2 === 'profile'} onClick={() => setActiveKey2('profile')}>
                Profile
              </Menu.Item>
              <Menu.Item active={activeKey2 === 'preferences'} onClick={() => setActiveKey2('preferences')}>
                Preferences
              </Menu.Item>
            </Menu>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Menu in Card"
          description="Menu styled within a card container."
          code={`import React from 'react'
import { Menu, Card } from '@edadma/petalui'

const App: React.FC = () => (
  <Card bordered>
    <Card.Body className="p-0">
      <Menu>
        <Menu.Item active>Inbox</Menu.Item>
        <Menu.Item>Sent</Menu.Item>
        <Menu.Item>Drafts</Menu.Item>
        <Menu.Item>Trash</Menu.Item>
      </Menu>
    </Card.Body>
  </Card>
)

export default App`}
        >
          <div className="w-64">
            <Card bordered>
              <Card.Body className="p-0">
                <Menu>
                  <Menu.Item active>Inbox</Menu.Item>
                  <Menu.Item>Sent</Menu.Item>
                  <Menu.Item>Drafts</Menu.Item>
                  <Menu.Item>Trash</Menu.Item>
                </Menu>
              </Card.Body>
            </Card>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Compact Menu"
          description="Menu with compact spacing."
          code={`import React from 'react'
import { Menu } from '@edadma/petalui'

const App: React.FC = () => (
  <Menu className="menu-compact">
    <Menu.Item>File</Menu.Item>
    <Menu.Item>Edit</Menu.Item>
    <Menu.Item>View</Menu.Item>
    <Menu.Item>Help</Menu.Item>
  </Menu>
)

export default App`}
        >
          <div className="w-64">
            <Menu className="menu-compact">
              <Menu.Item>File</Menu.Item>
              <Menu.Item>Edit</Menu.Item>
              <Menu.Item>View</Menu.Item>
              <Menu.Item>Help</Menu.Item>
            </Menu>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Multi-Group Menu"
          description="Menu with multiple titled groups."
          code={`import React from 'react'
import { Menu } from '@edadma/petalui'

const App: React.FC = () => (
  <Menu>
    <Menu.Title>Navigation</Menu.Title>
    <Menu.Item>Home</Menu.Item>
    <Menu.Item>Explore</Menu.Item>

    <Menu.Title>Content</Menu.Title>
    <Menu.Item>Library</Menu.Item>
    <Menu.Item>History</Menu.Item>

    <Menu.Title>Account</Menu.Title>
    <Menu.Item>Settings</Menu.Item>
    <Menu.Item>Logout</Menu.Item>
  </Menu>
)

export default App`}
        >
          <div className="w-64">
            <Menu>
              <Menu.Title>Navigation</Menu.Title>
              <Menu.Item>Home</Menu.Item>
              <Menu.Item>Explore</Menu.Item>

              <Menu.Title>Content</Menu.Title>
              <Menu.Item>Library</Menu.Item>
              <Menu.Item>History</Menu.Item>

              <Menu.Title>Account</Menu.Title>
              <Menu.Item>Settings</Menu.Item>
              <Menu.Item>Logout</Menu.Item>
            </Menu>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Simple List"
          description="Menu without active states or handlers."
          code={`import React from 'react'
import { Menu } from '@edadma/petalui'

const App: React.FC = () => (
  <Menu>
    <Menu.Item>Getting Started</Menu.Item>
    <Menu.Item>Installation</Menu.Item>
    <Menu.Item>Configuration</Menu.Item>
    <Menu.Item>Usage Examples</Menu.Item>
  </Menu>
)

export default App`}
        >
          <div className="w-64">
            <Menu>
              <Menu.Item>Getting Started</Menu.Item>
              <Menu.Item>Installation</Menu.Item>
              <Menu.Item>Configuration</Menu.Item>
              <Menu.Item>Usage Examples</Menu.Item>
            </Menu>
          </div>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Menu API</h2>
        <ApiTable data={menuApi} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Menu.Item API</h2>
        <ApiTable data={menuItemApi} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Menu.Title API</h2>
        <ApiTable data={menuTitleApi} />
      </div>
    </div>
  )
}
