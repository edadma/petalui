import { Join, Button, Input, Select } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const joinApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Elements to join together (buttons, inputs, etc.)',
    type: 'React.ReactNode',
  },
  {
    property: 'vertical',
    description: 'Vertical layout orientation',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function JoinPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Join</h1>
        <p className="text-base-content/70">Group elements together with shared borders.</p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Join"
          description="Group buttons together horizontally."
          code={`import React from 'react'
import { Join, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Join>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
  </Join>
)

export default App`}
        >
          <Join>
            <Button>Button</Button>
            <Button>Button</Button>
            <Button>Button</Button>
          </Join>
        </ExampleSection>

        <ExampleSection
          title="Vertical Join"
          description="Stack elements vertically."
          code={`import React from 'react'
import { Join, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Join vertical>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
  </Join>
)

export default App`}
        >
          <Join vertical>
            <Button>Button</Button>
            <Button>Button</Button>
            <Button>Button</Button>
          </Join>
        </ExampleSection>

        <ExampleSection
          title="Input Group"
          description="Combine inputs with buttons."
          code={`import React from 'react'
import { Join, Input, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Join>
    <Input placeholder="Email" />
    <Button type="primary">Subscribe</Button>
  </Join>
)

export default App`}
        >
          <Join>
            <Input placeholder="Email" />
            <Button type="primary">Subscribe</Button>
          </Join>
        </ExampleSection>

        <ExampleSection
          title="With Select"
          description="Mix different form controls."
          code={`import React from 'react'
import { Join, Select, Input, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Join>
    <Select>
      <option>Filter</option>
      <option>Name</option>
      <option>Date</option>
      <option>Status</option>
    </Select>
    <Input placeholder="Search..." />
    <Button type="primary">Go</Button>
  </Join>
)

export default App`}
        >
          <Join>
            <Select>
              <option>Filter</option>
              <option>Name</option>
              <option>Date</option>
              <option>Status</option>
            </Select>
            <Input placeholder="Search..." />
            <Button type="primary">Go</Button>
          </Join>
        </ExampleSection>

        <ExampleSection
          title="Responsive Layout"
          description="Vertical on mobile, horizontal on desktop."
          code={`import React from 'react'
import { Join, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Join className="join-vertical lg:join-horizontal">
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
  </Join>
)

export default App`}
        >
          <Join className="join-vertical lg:join-horizontal">
            <Button>Button</Button>
            <Button>Button</Button>
            <Button>Button</Button>
          </Join>
        </ExampleSection>

        <ExampleSection
          title="Custom Styling"
          description="Apply custom classes to items."
          code={`import React from 'react'
import { Join, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Join>
    <Button className="rounded-l-full">Button</Button>
    <Button>Button</Button>
    <Button className="rounded-r-full">Button</Button>
  </Join>
)

export default App`}
        >
          <Join>
            <Button className="rounded-l-full">Button</Button>
            <Button>Button</Button>
            <Button className="rounded-r-full">Button</Button>
          </Join>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Join API</h2>
        <ApiTable data={joinApi} />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Join automatically adds join-item class to all children</li>
              <li>Join automatically applies border radius to first and last items</li>
              <li>Works with buttons, inputs, selects, and other form controls</li>
              <li>Use vertical prop or responsive classes for layout control</li>
              <li>Children can have their own className props for customization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
