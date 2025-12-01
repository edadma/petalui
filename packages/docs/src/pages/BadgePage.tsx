import { Badge, Button, Avatar, Masonry } from '@edadma/bloomui'
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
    property: 'overflowCount',
    description: 'Max count to show before displaying count+',
    type: 'number',
    default: '99',
  },
  {
    property: 'position',
    description: 'Position of badge when wrapping children',
    type: 'BadgePosition',
    default: "'top-end'",
  },
  {
    property: 'offset',
    description: 'Offset from default position in pixels [x, y]',
    type: '[number, number]',
  },
  {
    property: 'status',
    description: 'Status badge mode with colored dot',
    type: "'success' | 'processing' | 'error' | 'default' | 'warning'",
  },
  {
    property: 'text',
    description: 'Text to display with status badge',
    type: 'string',
  },
  {
    property: 'ribbon',
    description: 'Ribbon text to display',
    type: 'string',
  },
  {
    property: 'ribbonPlacement',
    description: 'Ribbon placement',
    type: "'start' | 'end'",
    default: "'end'",
  },
  {
    property: 'dot',
    description: 'Show a small circular dot instead of count',
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
          Notification badges, status indicators, and ribbons for highlighting content.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Notification Badges"
          description="Display count badges on elements."
          code={`import React from 'react'
import { Badge, Button } from '@edadma/bloomui'

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
          title="Overflow Count"
          description="Show count+ when exceeding the overflow threshold."
          code={`import React from 'react'
import { Badge, Button, Avatar } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-6 flex-wrap items-center">
    <Badge count={99}>
      <Avatar size="lg">U</Avatar>
    </Badge>
    <Badge count={100} overflowCount={99}>
      <Avatar size="lg">U</Avatar>
    </Badge>
    <Badge count={1000} overflowCount={999}>
      <Avatar size="lg">U</Avatar>
    </Badge>
  </div>
)

export default App`}
        >
          <div className="flex gap-6 flex-wrap items-center">
            <Badge count={99}>
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">U</span>
                </div>
              </Avatar>
            </Badge>
            <Badge count={100} overflowCount={99}>
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">U</span>
                </div>
              </Avatar>
            </Badge>
            <Badge count={1000} overflowCount={999}>
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">U</span>
                </div>
              </Avatar>
            </Badge>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Badge Positioning"
          description="Position badges at any of the 9 corners."
          code={`import React from 'react'
import { Badge, Avatar } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-6 flex-wrap">
    <Badge count={5} position="top-start">
      <Avatar size="lg">TL</Avatar>
    </Badge>
    <Badge count={5} position="top-center">
      <Avatar size="lg">TC</Avatar>
    </Badge>
    <Badge count={5} position="top-end">
      <Avatar size="lg">TR</Avatar>
    </Badge>
    <Badge count={5} position="bottom-start">
      <Avatar size="lg">BL</Avatar>
    </Badge>
    <Badge count={5} position="bottom-end">
      <Avatar size="lg">BR</Avatar>
    </Badge>
  </div>
)

export default App`}
        >
          <div className="flex gap-6 flex-wrap">
            <Badge count={5} position="top-start">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">TL</span>
                </div>
              </Avatar>
            </Badge>
            <Badge count={5} position="top-center">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">TC</span>
                </div>
              </Avatar>
            </Badge>
            <Badge count={5} position="top-end">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">TR</span>
                </div>
              </Avatar>
            </Badge>
            <Badge count={5} position="bottom-start">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">BL</span>
                </div>
              </Avatar>
            </Badge>
            <Badge count={5} position="bottom-end">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">BR</span>
                </div>
              </Avatar>
            </Badge>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Offset Positioning"
          description="Fine-tune badge position with pixel offsets."
          code={`import React from 'react'
import { Badge, Avatar } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-6 flex-wrap">
    <Badge count={5}>
      <Avatar size="lg">Default</Avatar>
    </Badge>
    <Badge count={5} offset={[-5, 5]}>
      <Avatar size="lg">Offset</Avatar>
    </Badge>
    <Badge count={5} offset={[10, -10]}>
      <Avatar size="lg">Custom</Avatar>
    </Badge>
  </div>
)

export default App`}
        >
          <div className="flex gap-6 flex-wrap">
            <Badge count={5}>
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">D</span>
                </div>
              </Avatar>
            </Badge>
            <Badge count={5} offset={[-5, 5]}>
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">O</span>
                </div>
              </Avatar>
            </Badge>
            <Badge count={5} offset={[10, -10]}>
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">C</span>
                </div>
              </Avatar>
            </Badge>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Status Badges"
          description="Status indicators with optional text labels."
          code={`import React from 'react'
import { Badge } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex flex-col gap-2">
    <Badge status="success" text="Success" />
    <Badge status="processing" text="Processing" />
    <Badge status="error" text="Error" />
    <Badge status="warning" text="Warning" />
    <Badge status="default" text="Default" />
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-2">
            <Badge status="success" text="Success" />
            <Badge status="processing" text="Processing" />
            <Badge status="error" text="Error" />
            <Badge status="warning" text="Warning" />
            <Badge status="default" text="Default" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Ribbon Badges"
          description="Decorative ribbon-style badges."
          code={`import React from 'react'
import { Badge } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-6 flex-wrap">
    <Badge ribbon="Recommended">
      <div className="card bg-base-200 w-48 p-4">
        <h3 className="font-bold">Premium Plan</h3>
        <p>Best value for teams</p>
      </div>
    </Badge>
    <Badge ribbon="New" ribbonPlacement="start">
      <div className="card bg-base-200 w-48 p-4">
        <h3 className="font-bold">Pro Plan</h3>
        <p>For professionals</p>
      </div>
    </Badge>
  </div>
)

export default App`}
        >
          <div className="flex gap-6 flex-wrap">
            <Badge ribbon="Recommended">
              <div className="card bg-base-200 w-48 p-4">
                <h3 className="font-bold">Premium Plan</h3>
                <p>Best value for teams</p>
              </div>
            </Badge>
            <Badge ribbon="New" ribbonPlacement="start">
              <div className="card bg-base-200 w-48 p-4">
                <h3 className="font-bold">Pro Plan</h3>
                <p>For professionals</p>
              </div>
            </Badge>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Dot Badges"
          description="Small circular indicators for presence or status."
          code={`import React from 'react'
import { Badge, Button } from '@edadma/bloomui'

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
          title="Badge Colors"
          description="Standalone count badges with different colors."
          code={`import React from 'react'
import { Badge } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    <Badge count={5} />
    <Badge count={5} type="primary" />
    <Badge count={5} type="secondary" />
    <Badge count={5} type="accent" />
    <Badge count={5} type="info" />
    <Badge count={5} type="success" />
    <Badge count={5} type="warning" />
    <Badge count={5} type="error" />
  </div>
)

export default App`}
        >
          <div className="flex gap-2 flex-wrap">
            <Badge count={5} />
            <Badge count={5} type="primary" />
            <Badge count={5} type="secondary" />
            <Badge count={5} type="accent" />
            <Badge count={5} type="info" />
            <Badge count={5} type="success" />
            <Badge count={5} type="warning" />
            <Badge count={5} type="error" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Badge Sizes"
          description="Four sizes available for badges."
          code={`import React from 'react'
import { Badge } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-2 items-center flex-wrap">
    <Badge count={5} type="primary" size="xs" />
    <Badge count={5} type="primary" size="sm" />
    <Badge count={5} type="primary" size="md" />
    <Badge count={5} type="primary" size="lg" />
  </div>
)

export default App`}
        >
          <div className="flex gap-2 items-center flex-wrap">
            <Badge count={5} type="primary" size="xs" />
            <Badge count={5} type="primary" size="sm" />
            <Badge count={5} type="primary" size="md" />
            <Badge count={5} type="primary" size="lg" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Show Zero"
          description="Display badge even when count is 0."
          code={`import React from 'react'
import { Badge, Button } from '@edadma/bloomui'

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
          title="Outline Style"
          description="Subtle outline style for count badges."
          code={`import React from 'react'
import { Badge } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    <Badge count={5} type="primary" outline />
    <Badge count={5} type="secondary" outline />
    <Badge count={5} type="accent" outline />
    <Badge count={5} type="info" outline />
    <Badge count={5} type="success" outline />
  </div>
)

export default App`}
        >
          <div className="flex gap-2 flex-wrap">
            <Badge count={5} type="primary" outline />
            <Badge count={5} type="secondary" outline />
            <Badge count={5} type="accent" outline />
            <Badge count={5} type="info" outline />
            <Badge count={5} type="success" outline />
          </div>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>
        <ApiTable title="Badge" data={badgeApi} />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Badge vs Tag:</strong>
            <p className="mt-1">
              Use <code>Badge</code> for notification counts, dots, status indicators, and ribbons.
              For text labels (like categories or keywords), use the <code>Tag</code> component instead.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
