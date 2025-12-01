import { Tabs, Input, Button, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const tabsApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Tabs.Panel components',
    type: 'React.ReactNode',
  },
  {
    property: 'activeKey',
    description: 'Current active tab key (controlled)',
    type: 'string',
  },
  {
    property: 'defaultActiveKey',
    description: 'Default active tab key (uncontrolled)',
    type: 'string',
  },
  {
    property: 'onChange',
    description: 'Callback when tab changes',
    type: '(key: string) => void',
  },
  {
    property: 'variant',
    description: 'Visual style variant',
    type: "'box' | 'border' | 'lift'",
  },
  {
    property: 'size',
    description: 'Tab size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const tabPanelApi: ApiProperty[] = [
  {
    property: 'tab',
    description: 'Tab button label',
    type: 'React.ReactNode',
  },
  {
    property: 'tabKey',
    description: 'Unique identifier for the tab',
    type: 'string',
  },
  {
    property: 'disabled',
    description: 'Disable the tab',
    type: 'boolean',
  },
  {
    property: 'children',
    description: 'Tab panel content',
    type: 'React.ReactNode',
  },
]

export function TabsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Tabs</h1>
        <p className="text-base-content/70">
          Organize content into separate views where only one view is visible at a time.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Usage"
          description="Simple tabs - content switching is handled automatically."
          code={`import React from 'react'
import { Tabs, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <Tabs>
    <Tabs.Panel tab="Tab 1" tabKey="1">
      Content of Tab 1
    </Tabs.Panel>
    <Tabs.Panel tab="Tab 2" tabKey="2">
      Content of Tab 2
    </Tabs.Panel>
    <Tabs.Panel tab="Tab 3" tabKey="3">
      Content of Tab 3
    </Tabs.Panel>
  </Tabs>
)

export default App`}
        >
          <Tabs>
            <Tabs.Panel tab="Tab 1" tabKey="1">
              Content of Tab 1
            </Tabs.Panel>
            <Tabs.Panel tab="Tab 2" tabKey="2">
              Content of Tab 2
            </Tabs.Panel>
            <Tabs.Panel tab="Tab 3" tabKey="3">
              Content of Tab 3
            </Tabs.Panel>
          </Tabs>
        </ExampleSection>

        <ExampleSection
          title="Settings Page"
          description="Complete settings page with forms."
          code={`import React from 'react'
import { Tabs, Input, Button, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <Tabs defaultActiveKey="account" variant="border">
    <Tabs.Panel tab="Account" tabKey="account">
      <div className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <Input placeholder="john_doe" />
        </div>
        <Button type="primary">Save</Button>
      </div>
    </Tabs.Panel>
    <Tabs.Panel tab="Security" tabKey="security">
      <div className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <Input type="password" />
        </div>
        <Button type="primary">Update</Button>
      </div>
    </Tabs.Panel>
  </Tabs>
)

export default App`}
        >
          <Tabs defaultActiveKey="account" variant="border">
            <Tabs.Panel tab="Account" tabKey="account">
              <div className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <Input placeholder="john_doe" />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <Button type="primary">Save</Button>
              </div>
            </Tabs.Panel>
            <Tabs.Panel tab="Security" tabKey="security">
              <div className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text">Current Password</span>
                  </label>
                  <Input type="password" />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">New Password</span>
                  </label>
                  <Input type="password" />
                </div>
                <Button type="primary">Update</Button>
              </div>
            </Tabs.Panel>
          </Tabs>
        </ExampleSection>

        <ExampleSection
          title="Boxed Variant"
          description="Tabs with enclosed box styling."
          code={`import React from 'react'
import { Tabs, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <Tabs variant="box">
    <Tabs.Panel tab="Home" tabKey="home">
      Home content
    </Tabs.Panel>
    <Tabs.Panel tab="Profile" tabKey="profile">
      Profile content
    </Tabs.Panel>
    <Tabs.Panel tab="Settings" tabKey="settings">
      Settings content
    </Tabs.Panel>
  </Tabs>
)

export default App`}
        >
          <Tabs variant="box">
            <Tabs.Panel tab="Home" tabKey="home">
              Home content
            </Tabs.Panel>
            <Tabs.Panel tab="Profile" tabKey="profile">
              Profile content
            </Tabs.Panel>
            <Tabs.Panel tab="Settings" tabKey="settings">
              Settings content
            </Tabs.Panel>
          </Tabs>
        </ExampleSection>

        <ExampleSection
          title="Lifted Variant"
          description="Tabs with 3D lifted appearance."
          code={`import React from 'react'
import { Tabs, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <Tabs variant="lift">
    <Tabs.Panel tab="Overview" tabKey="1">
      Overview content
    </Tabs.Panel>
    <Tabs.Panel tab="Reports" tabKey="2">
      Reports content
    </Tabs.Panel>
    <Tabs.Panel tab="Analytics" tabKey="3">
      Analytics content
    </Tabs.Panel>
  </Tabs>
)

export default App`}
        >
          <Tabs variant="lift">
            <Tabs.Panel tab="Overview" tabKey="1">
              Overview content
            </Tabs.Panel>
            <Tabs.Panel tab="Reports" tabKey="2">
              Reports content
            </Tabs.Panel>
            <Tabs.Panel tab="Analytics" tabKey="3">
              Analytics content
            </Tabs.Panel>
          </Tabs>
        </ExampleSection>

        <ExampleSection
          title="Different Sizes"
          description="Tabs in various sizes."
          code={`import React from 'react'
import { Tabs, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="space-y-4">
    <Tabs size="sm">
      <Tabs.Panel tab="Small" tabKey="1">
        Small tabs
      </Tabs.Panel>
      <Tabs.Panel tab="Tab 2" tabKey="2">
        Content 2
      </Tabs.Panel>
    </Tabs>
    <Tabs size="lg">
      <Tabs.Panel tab="Large" tabKey="1">
        Large tabs
      </Tabs.Panel>
      <Tabs.Panel tab="Tab 2" tabKey="2">
        Content 2
      </Tabs.Panel>
    </Tabs>
  </div>
)

export default App`}
        >
          <div className="space-y-4">
            <Tabs size="sm">
              <Tabs.Panel tab="Small" tabKey="1">
                Small tabs
              </Tabs.Panel>
              <Tabs.Panel tab="Tab 2" tabKey="2">
                Content 2
              </Tabs.Panel>
            </Tabs>
            <Tabs size="lg">
              <Tabs.Panel tab="Large" tabKey="1">
                Large tabs
              </Tabs.Panel>
              <Tabs.Panel tab="Tab 2" tabKey="2">
                Content 2
              </Tabs.Panel>
            </Tabs>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Disabled Tab"
          description="Disable specific tabs."
          code={`import React from 'react'
import { Tabs, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <Tabs>
    <Tabs.Panel tab="Active" tabKey="1">
      Active content
    </Tabs.Panel>
    <Tabs.Panel tab="Disabled" tabKey="2" disabled>
      Cannot see this
    </Tabs.Panel>
    <Tabs.Panel tab="Also Active" tabKey="3">
      Active content
    </Tabs.Panel>
  </Tabs>
)

export default App`}
        >
          <Tabs>
            <Tabs.Panel tab="Active" tabKey="1">
              Active content
            </Tabs.Panel>
            <Tabs.Panel tab="Disabled" tabKey="2" disabled>
              Cannot see this
            </Tabs.Panel>
            <Tabs.Panel tab="Also Active" tabKey="3">
              Active content
            </Tabs.Panel>
          </Tabs>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Tabs" data={tabsApi} />

        <ApiTable title="Tabs.Panel" data={tabPanelApi} className="mt-8" />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Pattern:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>
                Use <code>Tabs.Panel</code> for each tab with <code>tab</code> and <code>tabKey</code> props
              </li>
              <li>Content switching is handled automatically by the Tabs component</li>
              <li>
                Use <code>defaultActiveKey</code> for uncontrolled tabs
              </li>
              <li>
                Use <code>activeKey</code> + <code>onChange</code> for controlled tabs
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
