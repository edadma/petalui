import { Dropdown, Button, notification } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const dropdownApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Dropdown trigger and menu components',
    type: 'ReactNode',
  },
  {
    property: 'hover',
    description: 'Open dropdown on hover in addition to click',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'position',
    description: 'Dropdown opening direction',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'bottom'",
  },
  {
    property: 'align',
    description: 'Horizontal alignment relative to trigger',
    type: "'start' | 'center' | 'end'",
    default: "'start'",
  },
  {
    property: 'className',
    description: 'Additional CSS classes for dropdown container',
    type: 'string',
  },
]

const dropdownTriggerApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Trigger element content',
    type: 'ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const dropdownMenuApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Menu items',
    type: 'ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes (overwrites default menu styling)',
    type: 'string',
  },
]

const dropdownItemApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Item content',
    type: 'ReactNode',
  },
  {
    property: 'onClick',
    description: 'Click handler',
    type: '() => void',
  },
  {
    property: 'active',
    description: 'Whether item is active/selected',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'disabled',
    description: 'Whether item is disabled',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'danger',
    description: 'Whether item represents a destructive action',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const dropdownDividerApi: ApiProperty[] = [
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function DropdownPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Dropdown</h1>
        <p className="text-base-content/70">
          Toggleable dropdown component with composable trigger, menu, and items.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Dropdown"
          description="Simple dropdown with menu items."
          code={`import React from 'react'
import { Dropdown, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button>Click Me</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item>Item 1</Dropdown.Item>
      <Dropdown.Item>Item 2</Dropdown.Item>
      <Dropdown.Item>Item 3</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default App`}
        >
          <Dropdown>
            <Dropdown.Trigger>
              <Button>Click Me</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
              <Dropdown.Item>Item 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ExampleSection>

        <ExampleSection
          title="With Click Handlers"
          description="Dropdown items with onClick handlers."
          code={`import React from 'react'
import { Dropdown, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button type="primary">Actions</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item onClick={() => console.log('Edit')}>Edit</Dropdown.Item>
      <Dropdown.Item onClick={() => console.log('Delete')}>Delete</Dropdown.Item>
      <Dropdown.Item onClick={() => console.log('Share')}>Share</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default App`}
        >
          <Dropdown>
            <Dropdown.Trigger>
              <Button type="primary">Actions</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => notification.info({ message: 'Edit clicked' })}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={() => notification.info({ message: 'Delete clicked' })}>Delete</Dropdown.Item>
              <Dropdown.Item onClick={() => notification.info({ message: 'Share clicked' })}>Share</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ExampleSection>

        <ExampleSection
          title="Dropdown on Hover"
          description="Opens on hover and click."
          code={`import React from 'react'
import { Dropdown, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Dropdown hover>
    <Dropdown.Trigger>
      <Button type="secondary">Hover Me</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Logout</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default App`}
        >
          <Dropdown hover>
            <Dropdown.Trigger>
              <Button type="secondary">Hover Me</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ExampleSection>

        <ExampleSection
          title="Dropdown Positions"
          description="Different opening directions."
          code={`import React from 'react'
import { Dropdown, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4 flex-wrap">
    <Dropdown position="top">
      <Dropdown.Trigger>
        <Button>Top</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown position="bottom">
      <Dropdown.Trigger>
        <Button>Bottom</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown position="left">
      <Dropdown.Trigger>
        <Button>Left</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown position="right">
      <Dropdown.Trigger>
        <Button>Right</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>
)

export default App`}
        >
          <div className="flex gap-4 flex-wrap">
            <Dropdown position="top">
              <Dropdown.Trigger>
                <Button>Top</Button>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Item>Option 1</Dropdown.Item>
                <Dropdown.Item>Option 2</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown position="bottom">
              <Dropdown.Trigger>
                <Button>Bottom</Button>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Item>Option 1</Dropdown.Item>
                <Dropdown.Item>Option 2</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown position="left">
              <Dropdown.Trigger>
                <Button>Left</Button>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Item>Option 1</Dropdown.Item>
                <Dropdown.Item>Option 2</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown position="right">
              <Dropdown.Trigger>
                <Button>Right</Button>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Item>Option 1</Dropdown.Item>
                <Dropdown.Item>Option 2</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Alignment Options"
          description="Different horizontal alignments."
          code={`import React from 'react'
import { Dropdown, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4 flex-wrap">
    <Dropdown align="start">
      <Dropdown.Trigger>
        <Button>Start</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Aligned Start</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown align="center">
      <Dropdown.Trigger>
        <Button>Center</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Aligned Center</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown align="end">
      <Dropdown.Trigger>
        <Button>End</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Aligned End</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>
)

export default App`}
        >
          <div className="flex gap-4 flex-wrap">
            <Dropdown align="start">
              <Dropdown.Trigger>
                <Button>Start</Button>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Item>Aligned Start</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown align="center">
              <Dropdown.Trigger>
                <Button>Center</Button>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Item>Aligned Center</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown align="end">
              <Dropdown.Trigger>
                <Button>End</Button>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Item>Aligned End</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Active Items"
          description="Menu items with active state."
          code={`import React from 'react'
import { Dropdown, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button type="accent">Options</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item active>Selected Item</Dropdown.Item>
      <Dropdown.Item>Regular Item</Dropdown.Item>
      <Dropdown.Item>Another Item</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default App`}
        >
          <Dropdown>
            <Dropdown.Trigger>
              <Button type="accent">Options</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item active>Selected Item</Dropdown.Item>
              <Dropdown.Item>Regular Item</Dropdown.Item>
              <Dropdown.Item>Another Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ExampleSection>

        <ExampleSection
          title="Custom Menu Width"
          description="Customize menu styling with className."
          code={`import React from 'react'
import { Dropdown, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button>Wide Menu</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu className="w-64">
      <Dropdown.Item>Item with more space</Dropdown.Item>
      <Dropdown.Item>Another spacious item</Dropdown.Item>
      <Dropdown.Item>Wide item</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default App`}
        >
          <Dropdown>
            <Dropdown.Trigger>
              <Button>Wide Menu</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu className="w-64">
              <Dropdown.Item>Item with more space</Dropdown.Item>
              <Dropdown.Item>Another spacious item</Dropdown.Item>
              <Dropdown.Item>Wide item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ExampleSection>

        <ExampleSection
          title="Custom Trigger"
          description="Any element can be a trigger."
          code={`import React from 'react'
import { Dropdown } from '@edadma/petalui'

const App: React.FC = () => (
  <Dropdown>
    <Dropdown.Trigger>
      <div className="avatar cursor-pointer">
        <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
          <span>JD</span>
        </div>
      </div>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item>Profile</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Logout</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default App`}
        >
          <Dropdown>
            <Dropdown.Trigger>
              <div className="avatar cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                  <span>JD</span>
                </div>
              </div>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ExampleSection>

        <ExampleSection
          title="Combined Position & Align"
          description="Top position with end alignment."
          code={`import React from 'react'
import { Dropdown, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Dropdown position="top" align="end">
    <Dropdown.Trigger>
      <Button type="info">Top End</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item>Profile</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Logout</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default App`}
        >
          <Dropdown position="top" align="end">
            <Dropdown.Trigger>
              <Button type="info">Top End</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ExampleSection>

        <ExampleSection
          title="With Dividers"
          description="Separate menu sections with dividers."
          code={`import React from 'react'
import { Dropdown, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button>User Menu</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item>Profile</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>Help</Dropdown.Item>
      <Dropdown.Item>Documentation</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item danger>Logout</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default App`}
        >
          <Dropdown>
            <Dropdown.Trigger>
              <Button>User Menu</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Help</Dropdown.Item>
              <Dropdown.Item>Documentation</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item danger>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ExampleSection>

        <ExampleSection
          title="Disabled Items"
          description="Prevent interaction with disabled items."
          code={`import React from 'react'
import { Dropdown, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button type="secondary">File Menu</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item onClick={() => notification.info({ message: 'New clicked' })}>New</Dropdown.Item>
      <Dropdown.Item onClick={() => notification.info({ message: 'Open clicked' })}>Open</Dropdown.Item>
      <Dropdown.Item disabled onClick={() => notification.info({ message: 'Save clicked' })}>
        Save (Disabled)
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={() => notification.info({ message: 'Export clicked' })}>Export</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default App`}
        >
          <Dropdown>
            <Dropdown.Trigger>
              <Button type="secondary">File Menu</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => notification.info({ message: 'New clicked' })}>New</Dropdown.Item>
              <Dropdown.Item onClick={() => notification.info({ message: 'Open clicked' })}>Open</Dropdown.Item>
              <Dropdown.Item disabled onClick={() => notification.info({ message: 'Save clicked' })}>
                Save (Disabled)
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => notification.info({ message: 'Export clicked' })}>Export</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ExampleSection>

        <ExampleSection
          title="Danger Actions"
          description="Highlight destructive actions with danger styling."
          code={`import React from 'react'
import { Dropdown, Button, notification } from '@edadma/petalui'

const App: React.FC = () => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button type="ghost">Item Actions</Button>
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item onClick={() => notification.info({ message: 'Edit clicked' })}>Edit</Dropdown.Item>
      <Dropdown.Item onClick={() => notification.info({ message: 'Duplicate clicked' })}>Duplicate</Dropdown.Item>
      <Dropdown.Item onClick={() => notification.info({ message: 'Archive clicked' })}>Archive</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item danger onClick={() => notification.info({ message: 'Delete clicked' })}>
        Delete
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default App`}
        >
          <Dropdown>
            <Dropdown.Trigger>
              <Button type="ghost">Item Actions</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => notification.info({ message: 'Edit clicked' })}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={() => notification.info({ message: 'Duplicate clicked' })}>Duplicate</Dropdown.Item>
              <Dropdown.Item onClick={() => notification.info({ message: 'Archive clicked' })}>Archive</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item danger onClick={() => notification.info({ message: 'Delete clicked' })}>
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Dropdown" data={dropdownApi} />

        <ApiTable title="Dropdown.Trigger" data={dropdownTriggerApi} className="mt-8" />

        <ApiTable title="Dropdown.Menu" data={dropdownMenuApi} className="mt-8" />

        <ApiTable title="Dropdown.Item" data={dropdownItemApi} className="mt-8" />

        <ApiTable title="Dropdown.Divider" data={dropdownDividerApi} className="mt-8" />
      </div>
    </div>
  )
}
