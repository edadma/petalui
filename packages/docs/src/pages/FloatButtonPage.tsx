import { FloatButton, Button, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const floatButtonApi: ApiProperty[] = [
  { property: 'children', description: 'Button content (icon or text)', type: 'React.ReactNode' },
  { property: 'onClick', description: 'Click handler', type: '() => void' },
  { property: 'type', description: 'Button color', type: "'default' | 'primary' | 'secondary' | 'accent'", default: "'default'" },
  { property: 'shape', description: 'Button shape', type: "'circle' | 'square'", default: "'circle'" },
  { property: 'position', description: 'Position on screen', type: "'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'", default: "'bottom-right'" },
  { property: 'offset', description: 'Distance from edge in pixels', type: 'number', default: '24' },
  { property: 'tooltip', description: 'Tooltip text', type: 'string' },
  { property: 'tooltipPlacement', description: 'Tooltip placement', type: "'left' | 'right' | 'top' | 'bottom'", default: "'left'" },
  { property: 'className', description: 'Additional CSS classes', type: 'string' },
]

const backTopApi: ApiProperty[] = [
  { property: 'visibilityHeight', description: 'Scroll threshold to show button (pixels)', type: 'number', default: '400' },
  { property: 'target', description: 'Scroll target element', type: '() => HTMLElement | Window' },
  { property: 'onClick', description: 'Click handler (called before scrolling)', type: '() => void' },
  { property: 'children', description: 'Custom button content', type: 'React.ReactNode' },
  { property: 'position', description: 'Position on screen', type: "'bottom-right' | 'bottom-left'", default: "'bottom-right'" },
  { property: 'offset', description: 'Distance from edge in pixels', type: 'number', default: '24' },
  { property: 'className', description: 'Additional CSS classes', type: 'string' },
]

export function FloatButtonPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">FloatButton</h1>
        <p className="text-base-content/70">
          Floating action button that stays fixed on the screen. Includes BackTop variant for scroll-to-top functionality.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic FloatButton"
          description="Default floating action button with plus icon."
          code={`import React from 'react'
import { FloatButton } from '@edadma/bloomui'

const App: React.FC = () => (
  <FloatButton onClick={() => alert('Clicked!')} />
)

export default App`}
        >
          <div className="h-32 flex items-center justify-center text-base-content/50 relative">
            <span>FloatButton appears fixed on screen (bottom-right)</span>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Button Types"
          description="Different color variants."
          code={`import React from 'react'
import { FloatButton } from '@edadma/bloomui'

const App: React.FC = () => (
  <>
    <FloatButton type="primary" position="bottom-right" />
    <FloatButton type="secondary" position="bottom-left" />
    <FloatButton type="accent" position="top-right" />
  </>
)

export default App`}
        >
          <div className="flex gap-4 justify-center py-4">
            <Button type="primary" shape="circle" size="lg">+</Button>
            <Button type="secondary" shape="circle" size="lg">+</Button>
            <Button type="accent" shape="circle" size="lg">+</Button>
          </div>
          <p className="text-center text-sm text-base-content/50">(Preview - actual buttons are fixed positioned)</p>
        </ExampleSection>

        <ExampleSection
          title="Custom Icon"
          description="Use any icon as button content."
          code={`import React from 'react'
import { FloatButton } from '@edadma/bloomui'

const App: React.FC = () => (
  <FloatButton type="primary">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  </FloatButton>
)

export default App`}
        >
          <div className="flex justify-center py-4">
            <Button type="primary" shape="circle" size="lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Button>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Square Shape"
          description="Square button instead of circle."
          code={`import React from 'react'
import { FloatButton } from '@edadma/bloomui'

const App: React.FC = () => (
  <FloatButton shape="square" type="primary">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  </FloatButton>
)

export default App`}
        >
          <div className="flex justify-center py-4">
            <Button type="primary" shape="square" size="lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Button>
          </div>
        </ExampleSection>

        <ExampleSection
          title="With Tooltip"
          description="Show tooltip on hover."
          code={`import React from 'react'
import { FloatButton } from '@edadma/bloomui'

const App: React.FC = () => (
  <FloatButton
    type="primary"
    tooltip="Add new item"
    tooltipPlacement="left"
  />
)

export default App`}
        >
          <div className="flex justify-center py-4">
            <div className="tooltip tooltip-left" data-tip="Add new item">
              <Button type="primary" shape="circle" size="lg">+</Button>
            </div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="BackTop"
          description="Scroll-to-top button that appears after scrolling down."
          code={`import React from 'react'
import { FloatButton } from '@edadma/bloomui'

const App: React.FC = () => (
  <FloatButton.BackTop visibilityHeight={400} />
)

export default App`}
        >
          <div className="h-32 flex items-center justify-center text-base-content/50">
            <span>BackTop appears after scrolling 400px (try scrolling this page)</span>
          </div>
        </ExampleSection>
      </Masonry>

      <div className="mt-12 space-y-8">
        <h2 className="text-2xl font-bold mb-4">API</h2>
        <ApiTable title="FloatButton" data={floatButtonApi} />
        <ApiTable title="FloatButton.BackTop" data={backTopApi} />
      </div>

      <FloatButton.BackTop />
    </div>
  )
}
