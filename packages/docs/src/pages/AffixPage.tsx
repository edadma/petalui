import { useState } from 'react'
import { Affix, Button, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const affixApi: ApiProperty[] = [
  { property: 'children', description: 'Content to make sticky', type: 'React.ReactNode' },
  { property: 'offsetTop', description: 'Offset from top when fixed (pixels)', type: 'number' },
  { property: 'offsetBottom', description: 'Offset from bottom when fixed (pixels)', type: 'number' },
  { property: 'target', description: 'Scroll target element', type: '() => HTMLElement | Window' },
  { property: 'onChange', description: 'Callback when affix state changes', type: '(affixed: boolean) => void' },
  { property: 'className', description: 'Additional CSS classes', type: 'string' },
]

export function AffixPage() {
  const [affixed, setAffixed] = useState(false)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Affix</h1>
        <p className="text-base-content/70">
          Make an element stick to the viewport when scrolling. Useful for navigation, toolbars, or action buttons.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Affix"
          description="Element becomes fixed when scrolled past its position."
          code={`import React from 'react'
import { Affix, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Affix offsetTop={80}>
    <Button type="primary">Affixed Button</Button>
  </Affix>
)

export default App`}
        >
          <div className="h-32 flex items-center justify-center">
            <p className="text-base-content/50">Scroll the page to see Affix in action</p>
          </div>
        </ExampleSection>

        <ExampleSection
          title="With Callback"
          description="Get notified when affix state changes."
          code={`import React, { useState } from 'react'
import { Affix, Button } from '@edadma/bloomui'

const App: React.FC = () => {
  const [affixed, setAffixed] = useState(false)

  return (
    <Affix offsetTop={80} onChange={setAffixed}>
      <Button type={affixed ? 'primary' : 'neutral'}>
        {affixed ? 'Affixed!' : 'Not Affixed'}
      </Button>
    </Affix>
  )
}

export default App`}
        >
          <div className="h-32 flex items-center justify-center">
            <Button type={affixed ? 'primary' : 'neutral'}>
              {affixed ? 'Affixed!' : 'Not Affixed'}
            </Button>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Affix to Bottom"
          description="Fix element to bottom of viewport."
          code={`import React from 'react'
import { Affix, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Affix offsetBottom={20}>
    <Button type="secondary">Bottom Affixed</Button>
  </Affix>
)

export default App`}
        >
          <div className="h-32 flex items-center justify-center">
            <p className="text-base-content/50">Use offsetBottom instead of offsetTop</p>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Custom Target"
          description="Affix within a scrollable container."
          code={`import React from 'react'
import { Affix } from '@edadma/bloomui'

const App: React.FC = () => (
  <div id="scroll-container" className="h-64 overflow-auto">
    <Affix offsetTop={0} target={() => document.getElementById('scroll-container')!}>
      <div className="bg-primary text-primary-content p-2">
        Sticky Header
      </div>
    </Affix>
    {/* Scrollable content */}
  </div>
)

export default App`}
        >
          <div className="h-32 flex items-center justify-center">
            <p className="text-base-content/50">Pass a target function for custom scroll containers</p>
          </div>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>
        <ApiTable title="Affix" data={affixApi} />
      </div>

      <Affix offsetTop={80} onChange={setAffixed}>
        <div className="bg-base-100 shadow-lg rounded-lg p-3 border border-base-300">
          <Button type={affixed ? 'primary' : 'neutral'} size="sm">
            {affixed ? 'Affixed!' : 'Scroll to affix'}
          </Button>
        </div>
      </Affix>
    </div>
  )
}
