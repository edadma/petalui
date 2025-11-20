import { Divider } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const dividerApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Optional text content to display in the divider',
    type: 'React.ReactNode',
  },
  {
    property: 'orientation',
    description: 'Divider orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
  },
  {
    property: 'position',
    description: 'Text position within the divider',
    type: "'start' | 'center' | 'end'",
    default: "'center'",
  },
  {
    property: 'type',
    description: 'Color variant',
    type: "'neutral' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error'",
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function DividerPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Divider</h1>
        <p className="text-base-content/70">
          Visual separator for content sections with optional text label.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Divider"
          description="Simple horizontal divider line."
          code={`import React from 'react'
import { Divider } from '@edadma/petalui'

const App: React.FC = () => (
  <div>
    <p>Content above</p>
    <Divider />
    <p>Content below</p>
  </div>
)

export default App`}
        >
          <div className="w-full">
            <p>Content above</p>
            <Divider />
            <p>Content below</p>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Divider with Text"
          description="Divider with centered text label."
          code={`import React from 'react'
import { Divider } from '@edadma/petalui'

const App: React.FC = () => (
  <div>
    <p>First section</p>
    <Divider>OR</Divider>
    <p>Second section</p>
  </div>
)

export default App`}
        >
          <div className="w-full">
            <p>First section</p>
            <Divider>OR</Divider>
            <p>Second section</p>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Text Position"
          description="Position text at start, center, or end."
          code={`import React from 'react'
import { Divider } from '@edadma/petalui'

const App: React.FC = () => (
  <div>
    <Divider position="start">Start</Divider>
    <Divider position="center">Center</Divider>
    <Divider position="end">End</Divider>
  </div>
)

export default App`}
        >
          <div className="w-full">
            <Divider position="start">Start</Divider>
            <Divider position="center">Center</Divider>
            <Divider position="end">End</Divider>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Vertical Divider"
          description="Divider for horizontal layouts."
          code={`import React from 'react'
import { Divider } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex h-32 items-center">
    <div className="flex-1 text-center">Left</div>
    <Divider orientation="vertical" />
    <div className="flex-1 text-center">Center</div>
    <Divider orientation="vertical" />
    <div className="flex-1 text-center">Right</div>
  </div>
)

export default App`}
        >
          <div className="flex h-32 items-center">
            <div className="flex-1 text-center">Left</div>
            <Divider orientation="vertical" />
            <div className="flex-1 text-center">Center</div>
            <Divider orientation="vertical" />
            <div className="flex-1 text-center">Right</div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Color Variants"
          description="Dividers with different colors."
          code={`import React from 'react'
import { Divider } from '@edadma/petalui'

const App: React.FC = () => (
  <div>
    <Divider type="neutral">Neutral</Divider>
    <Divider type="primary">Primary</Divider>
    <Divider type="secondary">Secondary</Divider>
    <Divider type="accent">Accent</Divider>
  </div>
)

export default App`}
        >
          <div className="w-full">
            <Divider type="neutral">Neutral</Divider>
            <Divider type="primary">Primary</Divider>
            <Divider type="secondary">Secondary</Divider>
            <Divider type="accent">Accent</Divider>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Status Colors"
          description="Dividers with status colors."
          code={`import React from 'react'
import { Divider } from '@edadma/petalui'

const App: React.FC = () => (
  <div>
    <Divider type="success">Success</Divider>
    <Divider type="warning">Warning</Divider>
    <Divider type="info">Info</Divider>
    <Divider type="error">Error</Divider>
  </div>
)

export default App`}
        >
          <div className="w-full">
            <Divider type="success">Success</Divider>
            <Divider type="warning">Warning</Divider>
            <Divider type="info">Info</Divider>
            <Divider type="error">Error</Divider>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Form Sections"
          description="Use dividers to separate form sections."
          code={`import React from 'react'
import { Divider } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="w-full max-w-md">
    <h3 className="font-bold">Personal Information</h3>
    <div className="form-control">
      <input type="text" placeholder="Name" className="input input-bordered" />
    </div>

    <Divider>Contact Details</Divider>

    <div className="form-control">
      <input type="email" placeholder="Email" className="input input-bordered" />
    </div>
  </div>
)

export default App`}
        >
          <div className="w-full max-w-md">
            <h3 className="font-bold">Personal Information</h3>
            <div className="form-control">
              <input type="text" placeholder="Name" className="input input-bordered" />
            </div>

            <Divider>Contact Details</Divider>

            <div className="form-control">
              <input type="email" placeholder="Email" className="input input-bordered" />
            </div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Responsive Orientation"
          description="Change orientation based on screen size."
          code={`import React from 'react'
import { Divider } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col lg:flex-row h-64 lg:h-32 items-center">
    <div className="flex-1 text-center">Section 1</div>
    <Divider className="lg:divider-horizontal" orientation="vertical" />
    <div className="flex-1 text-center">Section 2</div>
  </div>
)

export default App`}
        >
          <div className="flex flex-col lg:flex-row h-64 lg:h-32 items-center">
            <div className="flex-1 text-center">Section 1</div>
            <Divider className="lg:divider-horizontal" orientation="vertical" />
            <div className="flex-1 text-center">Section 2</div>
          </div>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Divider" data={dividerApi} />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Use horizontal dividers between vertically stacked content</li>
              <li>Use vertical dividers in flex-row layouts</li>
              <li>Add optional text to provide context for the separation</li>
              <li>Position text at start/center/end based on your design needs</li>
              <li>Use color variants to match your theme or indicate section importance</li>
              <li>Combine with responsive classes for adaptive layouts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
