import { Tooltip, Button } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const tooltipApi: ApiProperty[] = [
  {
    property: 'tip',
    description: 'Tooltip text content',
    type: 'string',
  },
  {
    property: 'children',
    description: 'Element to attach tooltip to',
    type: 'React.ReactNode',
  },
  {
    property: 'position',
    description: 'Tooltip placement',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'top'",
  },
  {
    property: 'color',
    description: 'Tooltip color variant',
    type: "'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'",
  },
  {
    property: 'open',
    description: 'Force tooltip to stay visible',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function TooltipPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Tooltip</h1>
        <p className="text-base-content/70">
          Display helpful text on hover or focus.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Tooltip"
          description="Hover over the button to see tooltip."
          code={`import React from 'react'
import { Tooltip, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Tooltip tip="Hello there!">
    <Button>Hover me</Button>
  </Tooltip>
)

export default App`}
        >
          <Tooltip tip="Hello there!">
            <Button>Hover me</Button>
          </Tooltip>
        </ExampleSection>

        <ExampleSection
          title="Positions"
          description="Four placement options."
          code={`import React from 'react'
import { Tooltip, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <Tooltip tip="Top tooltip" position="top">
      <Button>Top</Button>
    </Tooltip>
    <Tooltip tip="Right tooltip" position="right">
      <Button>Right</Button>
    </Tooltip>
    <Tooltip tip="Bottom tooltip" position="bottom">
      <Button>Bottom</Button>
    </Tooltip>
    <Tooltip tip="Left tooltip" position="left">
      <Button>Left</Button>
    </Tooltip>
  </div>
)

export default App`}
        >
          <div className="flex gap-4 flex-wrap">
            <Tooltip tip="Top tooltip" position="top">
              <Button>Top</Button>
            </Tooltip>
            <Tooltip tip="Right tooltip" position="right">
              <Button>Right</Button>
            </Tooltip>
            <Tooltip tip="Bottom tooltip" position="bottom">
              <Button>Bottom</Button>
            </Tooltip>
            <Tooltip tip="Left tooltip" position="left">
              <Button>Left</Button>
            </Tooltip>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Colors"
          description="Colored tooltip variants."
          code={`import React from 'react'
import { Tooltip, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-wrap gap-4">
    <Tooltip tip="Primary" color="primary">
      <Button type="primary">Primary</Button>
    </Tooltip>
    <Tooltip tip="Secondary" color="secondary">
      <Button type="secondary">Secondary</Button>
    </Tooltip>
    <Tooltip tip="Accent" color="accent">
      <Button type="accent">Accent</Button>
    </Tooltip>
    <Tooltip tip="Info" color="info">
      <Button type="info">Info</Button>
    </Tooltip>
    <Tooltip tip="Success" color="success">
      <Button type="success">Success</Button>
    </Tooltip>
    <Tooltip tip="Warning" color="warning">
      <Button type="warning">Warning</Button>
    </Tooltip>
    <Tooltip tip="Error" color="error">
      <Button type="error">Error</Button>
    </Tooltip>
  </div>
)

export default App`}
        >
          <div className="flex flex-wrap gap-4">
            <Tooltip tip="Primary" color="primary">
              <Button type="primary">Primary</Button>
            </Tooltip>
            <Tooltip tip="Secondary" color="secondary">
              <Button type="secondary">Secondary</Button>
            </Tooltip>
            <Tooltip tip="Accent" color="accent">
              <Button type="accent">Accent</Button>
            </Tooltip>
            <Tooltip tip="Info" color="info">
              <Button type="info">Info</Button>
            </Tooltip>
            <Tooltip tip="Success" color="success">
              <Button type="success">Success</Button>
            </Tooltip>
            <Tooltip tip="Warning" color="warning">
              <Button type="warning">Warning</Button>
            </Tooltip>
            <Tooltip tip="Error" color="error">
              <Button type="error">Error</Button>
            </Tooltip>
          </div>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Tooltip" data={tooltipApi} />
      </div>
    </div>
  )
}
