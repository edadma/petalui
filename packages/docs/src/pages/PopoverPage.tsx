import { Popover, Button, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const popoverApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Trigger element',
    type: 'React.ReactNode',
  },
  {
    property: 'content',
    description: 'Content of the popover',
    type: 'React.ReactNode',
  },
  {
    property: 'title',
    description: 'Title of the popover',
    type: 'React.ReactNode',
  },
  {
    property: 'trigger',
    description: 'How the popover is triggered',
    type: "'hover' | 'click' | 'focus'",
    default: "'hover'",
  },
  {
    property: 'placement',
    description: 'Position of the popover',
    type: "'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom'",
    default: "'top'",
  },
  {
    property: 'open',
    description: 'Whether popover is visible (controlled mode)',
    type: 'boolean',
  },
  {
    property: 'onOpenChange',
    description: 'Callback when visibility changes',
    type: '(open: boolean) => void',
  },
  {
    property: 'className',
    description: 'Additional CSS classes for wrapper',
    type: 'string',
  },
  {
    property: 'overlayClassName',
    description: 'Additional CSS classes for popover overlay',
    type: 'string',
  },
]

export default function PopoverPage() {
  return (
    <div className="space-y-8 pb-16">
      <div>
        <h1 className="text-4xl font-bold mb-2">Popover</h1>
        <p className="text-lg opacity-70">
          A card that displays additional information when triggered.
        </p>
      </div>

      <div className="space-y-6">
        <ExampleSection
          title="Basic Usage"
          code={`import React from 'react'
import { Popover, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Popover content="This is a simple popover">
    <Button>Hover me</Button>
  </Popover>
)

export default App`}
        >
          <Popover content="This is a simple popover">
            <Button>Hover me</Button>
          </Popover>
        </ExampleSection>

        <ExampleSection
          title="With Title"
          code={`import React from 'react'
import { Popover, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Popover
    title="User Information"
    content="Additional details about the user and their account settings."
  >
    <Button>Hover me</Button>
  </Popover>
)

export default App`}
        >
          <Popover
            title="User Information"
            content="Additional details about the user and their account settings."
          >
            <Button>Hover me</Button>
          </Popover>
        </ExampleSection>

        <ExampleSection
          title="Trigger Types"
          code={`import React from 'react'
import { Popover, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <Popover trigger="hover" content="Triggered by hovering">
      <Button>Hover</Button>
    </Popover>
    <Popover trigger="click" content="Triggered by clicking">
      <Button>Click</Button>
    </Popover>
    <Popover trigger="focus" content="Triggered by focusing">
      <Button>Focus</Button>
    </Popover>
  </div>
)

export default App`}
        >
          <div className="flex gap-4">
            <Popover trigger="hover" content="Triggered by hovering">
              <Button>Hover</Button>
            </Popover>
            <Popover trigger="click" content="Triggered by clicking">
              <Button>Click</Button>
            </Popover>
            <Popover trigger="focus" content="Triggered by focusing">
              <Button>Focus</Button>
            </Popover>
          </div>
        </ExampleSection>

        <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
          <ExampleSection
            title="Placement - Top"
            code={`import React from 'react'
import { Popover, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-4 justify-center">
    <Popover placement="top" content="Top placement">
      <Button>Top</Button>
    </Popover>
    <Popover placement="topLeft" content="Top left placement">
      <Button>Top Left</Button>
    </Popover>
    <Popover placement="topRight" content="Top right placement">
      <Button>Top Right</Button>
    </Popover>
  </div>
)

export default App`}
          >
            <div className="flex gap-4 justify-center">
              <Popover placement="top" content="Top placement">
                <Button>Top</Button>
              </Popover>
              <Popover placement="topLeft" content="Top left placement">
                <Button>Top Left</Button>
              </Popover>
              <Popover placement="topRight" content="Top right placement">
                <Button>Top Right</Button>
              </Popover>
            </div>
          </ExampleSection>

          <ExampleSection
            title="Placement - Bottom"
            code={`import React from 'react'
import { Popover, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-4 justify-center">
    <Popover placement="bottom" content="Bottom placement">
      <Button>Bottom</Button>
    </Popover>
    <Popover placement="bottomLeft" content="Bottom left placement">
      <Button>Bottom Left</Button>
    </Popover>
    <Popover placement="bottomRight" content="Bottom right placement">
      <Button>Bottom Right</Button>
    </Popover>
  </div>
)

export default App`}
          >
            <div className="flex gap-4 justify-center">
              <Popover placement="bottom" content="Bottom placement">
                <Button>Bottom</Button>
              </Popover>
              <Popover placement="bottomLeft" content="Bottom left placement">
                <Button>Bottom Left</Button>
              </Popover>
              <Popover placement="bottomRight" content="Bottom right placement">
                <Button>Bottom Right</Button>
              </Popover>
            </div>
          </ExampleSection>

          <ExampleSection
            title="Placement - Left"
            code={`import React from 'react'
import { Popover, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-4 justify-center">
    <Popover placement="left" content="Left placement">
      <Button>Left</Button>
    </Popover>
    <Popover placement="leftTop" content="Left top placement">
      <Button>Left Top</Button>
    </Popover>
    <Popover placement="leftBottom" content="Left bottom placement">
      <Button>Left Bottom</Button>
    </Popover>
  </div>
)

export default App`}
          >
            <div className="flex gap-4 justify-center">
              <Popover placement="left" content="Left placement">
                <Button>Left</Button>
              </Popover>
              <Popover placement="leftTop" content="Left top placement">
                <Button>Left Top</Button>
              </Popover>
              <Popover placement="leftBottom" content="Left bottom placement">
                <Button>Left Bottom</Button>
              </Popover>
            </div>
          </ExampleSection>

          <ExampleSection
            title="Placement - Right"
            code={`import React from 'react'
import { Popover, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-4 justify-center">
    <Popover placement="right" content="Right placement">
      <Button>Right</Button>
    </Popover>
    <Popover placement="rightTop" content="Right top placement">
      <Button>Right Top</Button>
    </Popover>
    <Popover placement="rightBottom" content="Right bottom placement">
      <Button>Right Bottom</Button>
    </Popover>
  </div>
)

export default App`}
          >
            <div className="flex gap-4 justify-center">
              <Popover placement="right" content="Right placement">
                <Button>Right</Button>
              </Popover>
              <Popover placement="rightTop" content="Right top placement">
                <Button>Right Top</Button>
              </Popover>
              <Popover placement="rightBottom" content="Right bottom placement">
                <Button>Right Bottom</Button>
              </Popover>
            </div>
          </ExampleSection>
        </Masonry>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">API</h2>
        <ApiTable data={popoverApi} title="Popover" />
      </div>
    </div>
  )
}
