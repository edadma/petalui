import { Collapse, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const collapseApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Content to display (or Collapse.Title and Collapse.Content components)',
    type: 'React.ReactNode',
  },
  {
    property: 'title',
    description: 'Title/header (renders automatically with content as children)',
    type: 'React.ReactNode',
  },
  {
    property: 'open',
    description: 'Controlled open state',
    type: 'boolean',
  },
  {
    property: 'defaultOpen',
    description: 'Default open state (uncontrolled)',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'onChange',
    description: 'Callback when open state changes',
    type: '(open: boolean) => void',
  },
  {
    property: 'icon',
    description: 'Icon type to display',
    type: "'arrow' | 'plus' | 'none'",
    default: "'arrow'",
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const collapseTitleApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Title content',
    type: 'React.ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const collapseContentApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Collapsible content',
    type: 'React.ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function CollapsePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Collapse</h1>
        <p className="text-base-content/70">Toggle visibility of content with collapsible sections.</p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Simple API"
          description="Use title prop for cleaner syntax."
          code={`import React from 'react'
import { Collapse } from '@edadma/bloomui'

const App: React.FC = () => (
  <Collapse title="Click to expand">
    <p>This is the hidden content that appears when expanded.</p>
  </Collapse>
)

export default App`}
        >
          <Collapse title="Click to expand">
            <p>This is the hidden content that appears when expanded.</p>
          </Collapse>
        </ExampleSection>

        <ExampleSection
          title="Compound Components"
          description="Use Title and Content for more control."
          code={`import React from 'react'
import { Collapse } from '@edadma/bloomui'

const App: React.FC = () => (
  <Collapse>
    <Collapse.Title>Click to expand</Collapse.Title>
    <Collapse.Content>
      <p>This is the hidden content that appears when expanded.</p>
    </Collapse.Content>
  </Collapse>
)

export default App`}
        >
          <Collapse>
            <Collapse.Title>Click to expand</Collapse.Title>
            <Collapse.Content>
              <p>This is the hidden content that appears when expanded.</p>
            </Collapse.Content>
          </Collapse>
        </ExampleSection>

        <ExampleSection
          title="Default Open"
          description="Start with content expanded."
          code={`import React from 'react'
import { Collapse } from '@edadma/bloomui'

const App: React.FC = () => (
  <Collapse title="Already expanded" defaultOpen>
    <p>This content is visible by default.</p>
  </Collapse>
)

export default App`}
        >
          <Collapse title="Already expanded" defaultOpen>
            <p>This content is visible by default.</p>
          </Collapse>
        </ExampleSection>

        <ExampleSection
          title="With Arrow Icon"
          description="Collapse with rotating arrow indicator."
          code={`import React from 'react'
import { Collapse } from '@edadma/bloomui'

const App: React.FC = () => (
  <Collapse title="Click me" icon="arrow">
    <p>Content with arrow indicator.</p>
  </Collapse>
)

export default App`}
        >
          <Collapse title="Click me" icon="arrow">
            <p>Content with arrow indicator.</p>
          </Collapse>
        </ExampleSection>

        <ExampleSection
          title="With Plus Icon"
          description="Collapse with plus/minus indicator."
          code={`import React from 'react'
import { Collapse } from '@edadma/bloomui'

const App: React.FC = () => (
  <Collapse icon="plus">
    <Collapse.Title>Click me</Collapse.Title>
    <Collapse.Content>
      <p>Content with plus/minus indicator.</p>
    </Collapse.Content>
  </Collapse>
)

export default App`}
        >
          <Collapse icon="plus">
            <Collapse.Title>Click me</Collapse.Title>
            <Collapse.Content>
              <p>Content with plus/minus indicator.</p>
            </Collapse.Content>
          </Collapse>
        </ExampleSection>

        <ExampleSection
          title="No Icon"
          description="Collapse without any icon."
          code={`import React from 'react'
import { Collapse } from '@edadma/bloomui'

const App: React.FC = () => (
  <Collapse icon="none">
    <Collapse.Title>Click me</Collapse.Title>
    <Collapse.Content>
      <p>Content without indicator icon.</p>
    </Collapse.Content>
  </Collapse>
)

export default App`}
        >
          <Collapse icon="none">
            <Collapse.Title>Click me</Collapse.Title>
            <Collapse.Content>
              <p>Content without indicator icon.</p>
            </Collapse.Content>
          </Collapse>
        </ExampleSection>

        <ExampleSection
          title="Multiple Collapses"
          description="Stack multiple collapse sections."
          code={`import React from 'react'
import { Collapse } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="space-y-2">
    <Collapse icon="arrow">
      <Collapse.Title>Section 1</Collapse.Title>
      <Collapse.Content>
        <p>Content for section 1.</p>
      </Collapse.Content>
    </Collapse>
    <Collapse icon="arrow">
      <Collapse.Title>Section 2</Collapse.Title>
      <Collapse.Content>
        <p>Content for section 2.</p>
      </Collapse.Content>
    </Collapse>
    <Collapse icon="arrow">
      <Collapse.Title>Section 3</Collapse.Title>
      <Collapse.Content>
        <p>Content for section 3.</p>
      </Collapse.Content>
    </Collapse>
  </div>
)

export default App`}
        >
          <div className="space-y-2">
            <Collapse icon="arrow">
              <Collapse.Title>Section 1</Collapse.Title>
              <Collapse.Content>
                <p>Content for section 1.</p>
              </Collapse.Content>
            </Collapse>
            <Collapse icon="arrow">
              <Collapse.Title>Section 2</Collapse.Title>
              <Collapse.Content>
                <p>Content for section 2.</p>
              </Collapse.Content>
            </Collapse>
            <Collapse icon="arrow">
              <Collapse.Title>Section 3</Collapse.Title>
              <Collapse.Content>
                <p>Content for section 3.</p>
              </Collapse.Content>
            </Collapse>
          </div>
        </ExampleSection>

        <ExampleSection
          title="With Border"
          description="Add border styling for definition."
          code={`import React from 'react'
import { Collapse } from '@edadma/bloomui'

const App: React.FC = () => (
  <Collapse icon="arrow" className="border border-base-300">
    <Collapse.Title>Bordered collapse</Collapse.Title>
    <Collapse.Content>
      <p>Content with border styling.</p>
    </Collapse.Content>
  </Collapse>
)

export default App`}
        >
          <Collapse icon="arrow" className="border border-base-300">
            <Collapse.Title>Bordered collapse</Collapse.Title>
            <Collapse.Content>
              <p>Content with border styling.</p>
            </Collapse.Content>
          </Collapse>
        </ExampleSection>

        <ExampleSection
          title="Controlled Mode"
          description="Control open state externally."
          code={`import React, { useState } from 'react'
import { Collapse, Button } from '@edadma/bloomui'

const App: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(!open)} className="mb-2">
        {open ? 'Close' : 'Open'} Collapse
      </Button>
      <Collapse open={open} onChange={setOpen} icon="arrow">
        <Collapse.Title>Controlled collapse</Collapse.Title>
        <Collapse.Content>
          <p>This collapse is controlled by external state.</p>
        </Collapse.Content>
      </Collapse>
    </>
  )
}

export default App`}
        >
          <div>
            <button
              onClick={() => {
                const collapse = document.querySelector('[data-collapse-demo]') as any
                if (collapse) {
                  const checkbox = collapse.querySelector('input[type="checkbox"]') as HTMLInputElement
                  checkbox.click()
                }
              }}
              className="btn mb-2"
            >
              Toggle
            </button>
            <div data-collapse-demo>
              <Collapse icon="arrow">
                <Collapse.Title>Controlled collapse</Collapse.Title>
                <Collapse.Content>
                  <p>This collapse is controlled by external state.</p>
                </Collapse.Content>
              </Collapse>
            </div>
          </div>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Collapse" data={collapseApi} />

        <ApiTable title="Collapse.Title" data={collapseTitleApi} className="mt-8" />

        <ApiTable title="Collapse.Content" data={collapseContentApi} className="mt-8" />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>
                Use <code>defaultOpen</code> for uncontrolled mode
              </li>
              <li>
                Use <code>open</code> + <code>onChange</code> for controlled mode
              </li>
              <li>Choose between arrow, plus, or no icon based on your design</li>
              <li>Stack multiple collapses for accordion-like behavior</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
