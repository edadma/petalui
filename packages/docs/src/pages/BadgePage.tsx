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
    description: 'Show a small circular dot instead of count',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'circular',
    description: 'Make badge perfectly circular (standalone mode)',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'type',
    description: 'Badge color type',
    type: "'default' | 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error' | 'ghost'",
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
    description: 'Outline style variant',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'content',
    description: 'Custom content for standalone badges',
    type: 'ReactNode',
  },
  {
    property: 'children',
    description: 'Element to wrap with badge (notification mode)',
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
          Badges for status indicators, labels, and notification counts.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
        title="Notification Badges"
        description="Display count badges on elements."
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
        title="Dot Badges"
        description="Small circular indicators for presence or status."
        code={`import React from 'react'
import { Badge, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-6 flex-wrap">
    <Badge dot type="error">
      <Button>Notifications</Button>
    </Badge>
    <Badge dot type="success">
      <Button type="ghost">Online</Button>
    </Badge>
    <Badge dot type="warning">
      <Button type="secondary">Pending</Button>
    </Badge>
  </div>
)

export default App`}
      >
        <div className="flex gap-6 flex-wrap">
          <Badge dot type="error">
            <Button>Notifications</Button>
          </Badge>
          <Badge dot type="success">
            <Button type="ghost">Online</Button>
          </Badge>
          <Badge dot type="warning">
            <Button type="secondary">Pending</Button>
          </Badge>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Label Badges - Brand Colors"
        description="Standalone badges as labels or tags."
        code={`import React from 'react'
import { Badge } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    <Badge content="Default" />
    <Badge type="primary" content="Primary" />
    <Badge type="secondary" content="Secondary" />
    <Badge type="accent" content="Accent" />
    <Badge type="neutral" content="Neutral" />
  </div>
)

export default App`}
      >
        <Badge content="Default" />
        <Badge type="primary" content="Primary" />
        <Badge type="secondary" content="Secondary" />
        <Badge type="accent" content="Accent" />
        <Badge type="neutral" content="Neutral" />
      </ExampleSection>

      <ExampleSection
        title="Label Badges - State Colors"
        description="Semantic colors for status indication."
        code={`import React from 'react'
import { Badge } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    <Badge type="info" content="Info" />
    <Badge type="success" content="Success" />
    <Badge type="warning" content="Warning" />
    <Badge type="error" content="Error" />
    <Badge type="ghost" content="Ghost" />
  </div>
)

export default App`}
      >
        <Badge type="info" content="Info" />
        <Badge type="success" content="Success" />
        <Badge type="warning" content="Warning" />
        <Badge type="error" content="Error" />
        <Badge type="ghost" content="Ghost" />
      </ExampleSection>

      <ExampleSection
        title="Outline Badges"
        description="Subtle outline style for labels."
        code={`import React from 'react'
import { Badge } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    <Badge type="primary" content="Primary" outline />
    <Badge type="secondary" content="Secondary" outline />
    <Badge type="accent" content="Accent" outline />
    <Badge type="info" content="Info" outline />
    <Badge type="success" content="Success" outline />
  </div>
)

export default App`}
      >
        <Badge type="primary" content="Primary" outline />
        <Badge type="secondary" content="Secondary" outline />
        <Badge type="accent" content="Accent" outline />
        <Badge type="info" content="Info" outline />
        <Badge type="success" content="Success" outline />
      </ExampleSection>

      <ExampleSection
        title="Badge Sizes"
        description="Four sizes available for standalone badges."
        code={`import React from 'react'
import { Badge } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-2 items-center flex-wrap">
    <Badge type="primary" content="XS" size="xs" />
    <Badge type="primary" content="Small" size="sm" />
    <Badge type="primary" content="Medium" size="md" />
    <Badge type="primary" content="Large" size="lg" />
  </div>
)

export default App`}
      >
        <Badge type="primary" content="XS" size="xs" />
        <Badge type="primary" content="Small" size="sm" />
        <Badge type="primary" content="Medium" size="md" />
        <Badge type="primary" content="Large" size="lg" />
      </ExampleSection>

      <ExampleSection
        title="Badge Types on Buttons"
        description="Different badge colors on notification badges."
        code={`import React from 'react'
import { Badge, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4 flex-wrap">
    <Badge count={5} type="primary">
      <Button>Primary</Button>
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
  </div>
)

export default App`}
      >
        <div className="flex gap-4 flex-wrap">
          <Badge count={5} type="primary">
            <Button>Primary</Button>
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
        </div>
      </ExampleSection>

      <ExampleSection
        title="Show Zero"
        description="Display badge even when count is 0."
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
        title="Custom Content"
        description="Use any content in standalone badges."
        code={`import React from 'react'
import { Badge } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    <Badge type="primary" content="New" />
    <Badge type="success" content="✓ Verified" />
    <Badge type="warning" content="⚠ Beta" />
    <Badge type="info" content="PRO" />
  </div>
)

export default App`}
      >
        <Badge type="primary" content="New" />
        <Badge type="success" content="✓ Verified" />
        <Badge type="warning" content="⚠ Beta" />
        <Badge type="info" content="PRO" />
      </ExampleSection>

      <ExampleSection
        title="Circular Badges"
        description="Perfect circles for status indicators using the circular prop."
        code={`import React from 'react'
import { Badge } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-3 items-center flex-wrap">
    <Badge type="primary" circular />
    <Badge type="success" circular />
    <Badge type="warning" circular />
    <Badge type="error" circular />
    <Badge type="info" circular />
    <Badge type="neutral" circular />
  </div>
)

export default App`}
      >
        <Badge type="primary" circular />
        <Badge type="success" circular />
        <Badge type="warning" circular />
        <Badge type="error" circular />
        <Badge type="info" circular />
        <Badge type="neutral" circular />
      </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Badge" data={badgeApi} />
      </div>
    </div>
  )
}
