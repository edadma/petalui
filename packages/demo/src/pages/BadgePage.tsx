import { Badge, Button } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const badgeApi: ApiProperty[] = [
  {
    property: 'count',
    description: 'Number to display in the badge',
    type: 'number',
  },
  {
    property: 'showZero',
    description: 'Whether to display badge when count is 0',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'dot',
    description: 'Show a dot instead of count',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'type',
    description: 'Badge color type',
    type: "'default' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost'",
    default: "'error'",
  },
  {
    property: 'size',
    description: 'Badge size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
  },
  {
    property: 'outline',
    description: 'Outline style (standalone mode only)',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'children',
    description: 'Element to wrap with badge',
    type: 'ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function BadgePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Badge</h1>
        <p className="text-base-content/70">
          Notification badges for showing counts and status indicators.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
        title="Basic"
        description="Display a count badge on an element."
        code={`import React from 'react'
import { Badge, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-6 flex-wrap">
    <Badge count={5}>
      <Button>Messages</Button>
    </Badge>
    <Badge count={99}>
      <Button type="secondary">Notifications</Button>
    </Badge>
    <Badge count={0}>
      <Button type="accent">No Count</Button>
    </Badge>
  </div>
)

export default App`}
      >
        <div className="flex gap-6 flex-wrap">
          <Badge count={5}>
            <Button>Messages</Button>
          </Badge>
          <Badge count={99}>
            <Button type="secondary">Notifications</Button>
          </Badge>
          <Badge count={0}>
            <Button type="accent">No Count</Button>
          </Badge>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Show Zero"
        description="Use showZero to display badge when count is 0."
        code={`import React from 'react'
import { Badge, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-6 flex-wrap">
    <Badge count={0} showZero>
      <Button>Messages</Button>
    </Badge>
    <Badge count={0}>
      <Button type="secondary">Hidden Zero</Button>
    </Badge>
  </div>
)

export default App`}
      >
        <div className="flex gap-6 flex-wrap">
          <Badge count={0} showZero>
            <Button>Messages</Button>
          </Badge>
          <Badge count={0}>
            <Button type="secondary">Hidden Zero</Button>
          </Badge>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Dot Badge"
        description="Show a simple dot indicator without a count."
        code={`import React from 'react'
import { Badge, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-6 flex-wrap">
    <Badge dot>
      <Button>Notifications</Button>
    </Badge>
    <Badge dot type="success">
      <Button type="ghost">Online Status</Button>
    </Badge>
  </div>
)

export default App`}
      >
        <div className="flex gap-6 flex-wrap">
          <Badge dot>
            <Button>Notifications</Button>
          </Badge>
          <Badge dot type="success">
            <Button type="ghost">Online Status</Button>
          </Badge>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Badge Types"
        description="Different badge colors for various purposes."
        code={`import React from 'react'
import { Badge, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-6 flex-wrap">
    <Badge count={5} type="primary">
      <Button>Primary</Button>
    </Badge>
    <Badge count={5} type="secondary">
      <Button>Secondary</Button>
    </Badge>
    <Badge count={5} type="success">
      <Button>Success</Button>
    </Badge>
    <Badge count={5} type="warning">
      <Button>Warning</Button>
    </Badge>
    <Badge count={5} type="error">
      <Button>Error</Button>
    </Badge>
    <Badge count={5} type="info">
      <Button>Info</Button>
    </Badge>
  </div>
)

export default App`}
      >
        <div className="flex gap-6 flex-wrap">
          <Badge count={5} type="primary">
            <Button>Primary</Button>
          </Badge>
          <Badge count={5} type="secondary">
            <Button>Secondary</Button>
          </Badge>
          <Badge count={5} type="success">
            <Button>Success</Button>
          </Badge>
          <Badge count={5} type="warning">
            <Button>Warning</Button>
          </Badge>
          <Badge count={5} type="error">
            <Button>Error</Button>
          </Badge>
          <Badge count={5} type="info">
            <Button>Info</Button>
          </Badge>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Standalone"
        description="Use badge standalone without wrapping children."
        code={`import React from 'react'
import { Badge } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    <Badge count={5} />
    <Badge count={10} type="primary" />
    <Badge count={99} type="success" />
    <Badge count={999} type="warning" />
  </div>
)

export default App`}
      >
        <Badge count={5} />
        <Badge count={10} type="primary" />
        <Badge count={99} type="success" />
        <Badge count={999} type="warning" />
      </ExampleSection>
      </div>

      <ApiTable data={badgeApi} />
    </div>
  )
}
