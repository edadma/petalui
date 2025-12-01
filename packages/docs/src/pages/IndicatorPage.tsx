import { Indicator, Avatar, Button, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const indicatorApi: ApiProperty[] = [
  {
    property: 'position',
    description: 'Position of indicator element',
    type: 'IndicatorPosition',
    default: "'top-end'",
  },
  {
    property: 'children',
    description: 'Content element and indicator element (first child is content, second is indicator)',
    type: 'ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function IndicatorPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Indicator</h1>
        <p className="text-base-content/70">
          A flexible positioning utility for overlaying indicators, badges, and other elements at any of 9 positions.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Usage"
          description="Position an indicator at different corners."
          code={`import React from 'react'
import { Indicator, Avatar } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-6 flex-wrap">
    <Indicator position="top-end">
      <Avatar size="lg">TR</Avatar>
      <span className="badge badge-primary">9</span>
    </Indicator>
    <Indicator position="top-start">
      <Avatar size="lg">TL</Avatar>
      <span className="badge badge-secondary">5</span>
    </Indicator>
    <Indicator position="bottom-end">
      <Avatar size="lg">BR</Avatar>
      <span className="badge badge-accent">3</span>
    </Indicator>
  </div>
)

export default App`}
        >
          <div className="flex gap-6 flex-wrap">
            <Indicator position="top-end">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">TR</span>
                </div>
              </Avatar>
              <span className="badge badge-primary">9</span>
            </Indicator>
            <Indicator position="top-start">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">TL</span>
                </div>
              </Avatar>
              <span className="badge badge-secondary">5</span>
            </Indicator>
            <Indicator position="bottom-end">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">BR</span>
                </div>
              </Avatar>
              <span className="badge badge-accent">3</span>
            </Indicator>
          </div>
        </ExampleSection>

        <ExampleSection
          title="All 9 Positions"
          description="Demonstrate all available indicator positions."
          code={`import React from 'react'
import { Indicator, Avatar } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-6 flex-wrap">
    <Indicator position="top-start">
      <Avatar size="lg">TL</Avatar>
      <span className="badge badge-xs badge-primary"></span>
    </Indicator>
    <Indicator position="top-center">
      <Avatar size="lg">TC</Avatar>
      <span className="badge badge-xs badge-primary"></span>
    </Indicator>
    <Indicator position="top-end">
      <Avatar size="lg">TR</Avatar>
      <span className="badge badge-xs badge-primary"></span>
    </Indicator>
    <Indicator position="middle-start">
      <Avatar size="lg">ML</Avatar>
      <span className="badge badge-xs badge-secondary"></span>
    </Indicator>
    <Indicator position="middle-center">
      <Avatar size="lg">MC</Avatar>
      <span className="badge badge-xs badge-secondary"></span>
    </Indicator>
    <Indicator position="middle-end">
      <Avatar size="lg">MR</Avatar>
      <span className="badge badge-xs badge-secondary"></span>
    </Indicator>
    <Indicator position="bottom-start">
      <Avatar size="lg">BL</Avatar>
      <span className="badge badge-xs badge-accent"></span>
    </Indicator>
    <Indicator position="bottom-center">
      <Avatar size="lg">BC</Avatar>
      <span className="badge badge-xs badge-accent"></span>
    </Indicator>
    <Indicator position="bottom-end">
      <Avatar size="lg">BR</Avatar>
      <span className="badge badge-xs badge-accent"></span>
    </Indicator>
  </div>
)

export default App`}
        >
          <div className="flex gap-6 flex-wrap">
            <Indicator position="top-start">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">TL</span>
                </div>
              </Avatar>
              <span className="badge badge-xs badge-primary"></span>
            </Indicator>
            <Indicator position="top-center">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">TC</span>
                </div>
              </Avatar>
              <span className="badge badge-xs badge-primary"></span>
            </Indicator>
            <Indicator position="top-end">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">TR</span>
                </div>
              </Avatar>
              <span className="badge badge-xs badge-primary"></span>
            </Indicator>
            <Indicator position="middle-start">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">ML</span>
                </div>
              </Avatar>
              <span className="badge badge-xs badge-secondary"></span>
            </Indicator>
            <Indicator position="middle-center">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">MC</span>
                </div>
              </Avatar>
              <span className="badge badge-xs badge-secondary"></span>
            </Indicator>
            <Indicator position="middle-end">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">MR</span>
                </div>
              </Avatar>
              <span className="badge badge-xs badge-secondary"></span>
            </Indicator>
            <Indicator position="bottom-start">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">BL</span>
                </div>
              </Avatar>
              <span className="badge badge-xs badge-accent"></span>
            </Indicator>
            <Indicator position="bottom-center">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">BC</span>
                </div>
              </Avatar>
              <span className="badge badge-xs badge-accent"></span>
            </Indicator>
            <Indicator position="bottom-end">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">BR</span>
                </div>
              </Avatar>
              <span className="badge badge-xs badge-accent"></span>
            </Indicator>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Status Dots"
          description="Display online/offline status with colored dots."
          code={`import React from 'react'
import { Indicator, Avatar } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-6 flex-wrap">
    <Indicator position="bottom-end">
      <Avatar size="lg">JD</Avatar>
      <span className="badge badge-xs badge-success p-1"></span>
    </Indicator>
    <Indicator position="bottom-end">
      <Avatar size="lg">AS</Avatar>
      <span className="badge badge-xs badge-warning p-1"></span>
    </Indicator>
    <Indicator position="bottom-end">
      <Avatar size="lg">MK</Avatar>
      <span className="badge badge-xs badge-error p-1"></span>
    </Indicator>
  </div>
)

export default App`}
        >
          <div className="flex gap-6 flex-wrap">
            <Indicator position="bottom-end">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">JD</span>
                </div>
              </Avatar>
              <span className="badge badge-xs badge-success p-1"></span>
            </Indicator>
            <Indicator position="bottom-end">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">AS</span>
                </div>
              </Avatar>
              <span className="badge badge-xs badge-warning p-1"></span>
            </Indicator>
            <Indicator position="bottom-end">
              <Avatar placeholder>
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">MK</span>
                </div>
              </Avatar>
              <span className="badge badge-xs badge-error p-1"></span>
            </Indicator>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Notification Badges"
          description="Add notification counts to buttons or elements."
          code={`import React from 'react'
import { Indicator, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-6 flex-wrap">
    <Indicator position="top-end">
      <Button>Inbox</Button>
      <span className="badge badge-sm badge-primary">12</span>
    </Indicator>
    <Indicator position="top-end">
      <Button type="secondary">Messages</Button>
      <span className="badge badge-sm badge-secondary">5</span>
    </Indicator>
    <Indicator position="top-end">
      <Button type="accent">Alerts</Button>
      <span className="badge badge-sm badge-error">99+</span>
    </Indicator>
  </div>
)

export default App`}
        >
          <div className="flex gap-6 flex-wrap">
            <Indicator position="top-end">
              <Button>Inbox</Button>
              <span className="badge badge-sm badge-primary">12</span>
            </Indicator>
            <Indicator position="top-end">
              <Button type="secondary">Messages</Button>
              <span className="badge badge-sm badge-secondary">5</span>
            </Indicator>
            <Indicator position="top-end">
              <Button type="accent">Alerts</Button>
              <span className="badge badge-sm badge-error">99+</span>
            </Indicator>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Custom Indicators"
          description="Use any element as an indicator."
          code={`import React from 'react'
import { Indicator } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-6 flex-wrap">
    <Indicator position="top-end">
      <div className="card bg-base-200 w-48 h-32 flex items-center justify-center">
        <span className="text-lg font-bold">Card</span>
      </div>
      <span className="text-xs font-bold text-primary">NEW</span>
    </Indicator>
    <Indicator position="top-start">
      <div className="card bg-base-200 w-48 h-32 flex items-center justify-center">
        <span className="text-lg font-bold">Product</span>
      </div>
      <div className="badge badge-secondary">-50%</div>
    </Indicator>
  </div>
)

export default App`}
        >
          <div className="flex gap-6 flex-wrap">
            <Indicator position="top-end">
              <div className="card bg-base-200 w-48 h-32 flex items-center justify-center">
                <span className="text-lg font-bold">Card</span>
              </div>
              <span className="text-xs font-bold text-primary">NEW</span>
            </Indicator>
            <Indicator position="top-start">
              <div className="card bg-base-200 w-48 h-32 flex items-center justify-center">
                <span className="text-lg font-bold">Product</span>
              </div>
              <div className="badge badge-secondary">-50%</div>
            </Indicator>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Icon Indicators"
          description="Use icons as indicator elements."
          code={`import React from 'react'
import { Indicator, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-6 flex-wrap">
    <Indicator position="top-end">
      <Button>Settings</Button>
      <svg
        className="w-4 h-4 text-success"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </Indicator>
    <Indicator position="top-end">
      <Button type="secondary">Profile</Button>
      <svg
        className="w-4 h-4 text-warning"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    </Indicator>
  </div>
)

export default App`}
        >
          <div className="flex gap-6 flex-wrap">
            <Indicator position="top-end">
              <Button>Settings</Button>
              <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Indicator>
            <Indicator position="top-end">
              <Button type="secondary">Profile</Button>
              <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </Indicator>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Multiple Indicators"
          description="Stack multiple indicators at different positions."
          code={`import React from 'react'
import { Indicator } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-6 flex-wrap">
    <Indicator position="top-end">
      <Indicator position="bottom-start">
        <div className="card bg-base-200 w-48 h-32 flex items-center justify-center">
          <span className="text-lg font-bold">Item</span>
        </div>
        <span className="badge badge-xs badge-success p-1"></span>
      </Indicator>
      <span className="badge badge-sm badge-primary">5</span>
    </Indicator>
  </div>
)

export default App`}
        >
          <div className="flex gap-6 flex-wrap">
            <Indicator position="top-end">
              <Indicator position="bottom-start">
                <div className="card bg-base-200 w-48 h-32 flex items-center justify-center">
                  <span className="text-lg font-bold">Item</span>
                </div>
                <span className="badge badge-xs badge-success p-1"></span>
              </Indicator>
              <span className="badge badge-sm badge-primary">5</span>
            </Indicator>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Empty Indicator"
          description="Indicator without second child renders just the content."
          code={`import React from 'react'
import { Indicator, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-6 flex-wrap">
    <Indicator>
      <Button>No Indicator</Button>
    </Indicator>
    <Indicator position="top-end">
      <Button>With Indicator</Button>
      <span className="badge badge-sm badge-primary">5</span>
    </Indicator>
  </div>
)

export default App`}
        >
          <div className="flex gap-6 flex-wrap">
            <Indicator>
              <Button>No Indicator</Button>
            </Indicator>
            <Indicator position="top-end">
              <Button>With Indicator</Button>
              <span className="badge badge-sm badge-primary">5</span>
            </Indicator>
          </div>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>
        <ApiTable title="Indicator" data={indicatorApi} />

        <div className="mt-6 p-4 bg-base-200 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Children Structure</h3>
          <p className="text-sm text-base-content/70 mb-2">
            The Indicator component expects up to two children:
          </p>
          <ul className="list-disc list-inside text-sm text-base-content/70 space-y-1">
            <li><strong>First child:</strong> The main content element to be wrapped</li>
            <li><strong>Second child:</strong> The indicator element to be positioned (optional)</li>
          </ul>
          <pre className="mt-3 p-3 bg-base-300 rounded text-sm overflow-x-auto">
{`<Indicator position="top-end">
  <Button>Content</Button>
  <span className="badge">Indicator</span>
</Indicator>`}
          </pre>
        </div>

        <div className="mt-6 p-4 bg-info/10 rounded-lg border border-info/20">
          <h3 className="text-lg font-bold mb-2 text-info">IndicatorPosition Type</h3>
          <p className="text-sm text-base-content/70 mb-3">
            The position prop accepts one of 9 values representing a 3x3 grid:
          </p>
          <div className="grid grid-cols-3 gap-2 max-w-md">
            <div className="badge badge-outline justify-center">top-start</div>
            <div className="badge badge-outline justify-center">top-center</div>
            <div className="badge badge-outline justify-center">top-end</div>
            <div className="badge badge-outline justify-center">middle-start</div>
            <div className="badge badge-outline justify-center">middle-center</div>
            <div className="badge badge-outline justify-center">middle-end</div>
            <div className="badge badge-outline justify-center">bottom-start</div>
            <div className="badge badge-outline justify-center">bottom-center</div>
            <div className="badge badge-outline justify-center">bottom-end</div>
          </div>
        </div>
      </div>
    </div>
  )
}
