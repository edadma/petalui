import { Spin } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const spinApi: ApiProperty[] = [
  {
    property: 'size',
    description: 'Spinner size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
  },
  {
    property: 'type',
    description: 'Spinner animation type',
    type: "'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity'",
    default: "'spinner'",
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
  {
    property: 'spinning',
    description: 'Whether the spinner is active',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'children',
    description: 'Content to wrap with loading overlay',
    type: 'ReactNode',
  },
  {
    property: 'tip',
    description: 'Text message to display with spinner',
    type: 'string',
  },
]

export function SpinPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Spin</h1>
        <p className="text-base-content/70">
          Loading spinner component with multiple types and sizes.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
        title="Types"
        description="Different spinner animations to choose from."
        code={`import React from 'react'
import { Spin } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-8 flex-wrap">
    <Spin type="spinner" />
    <Spin type="dots" />
    <Spin type="ring" />
    <Spin type="ball" />
    <Spin type="bars" />
    <Spin type="infinity" />
  </div>
)

export default App`}
      >
        <Spin type="spinner" />
        <Spin type="dots" />
        <Spin type="ring" />
        <Spin type="ball" />
        <Spin type="bars" />
        <Spin type="infinity" />
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Four sizes available: xs, sm, md (default), and lg."
        code={`import React from 'react'
import { Spin } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-8 items-center flex-wrap">
    <Spin size="xs" />
    <Spin size="sm" />
    <Spin size="md" />
    <Spin size="lg" />
  </div>
)

export default App`}
      >
        <Spin size="xs" />
        <Spin size="sm" />
        <Spin size="md" />
        <Spin size="lg" />
      </ExampleSection>

      <ExampleSection
        title="With Tip"
        description="Display a text message below the spinner."
        code={`import React from 'react'
import { Spin } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-8 flex-wrap">
    <Spin tip="Loading..." />
    <Spin type="dots" tip="Please wait..." />
    <Spin type="ring" size="lg" tip="Processing..." />
  </div>
)

export default App`}
      >
        <Spin tip="Loading..." />
        <Spin type="dots" tip="Please wait..." />
        <Spin type="ring" size="lg" tip="Processing..." />
      </ExampleSection>

      <ExampleSection
        title="Embedded in Container"
        description="Wrap content to show a loading overlay."
        code={`import React from 'react'
import { Spin } from '@edadma/petalui'

const App: React.FC = () => (
  <Spin spinning={true} tip="Loading content...">
    <div className="p-8 bg-base-200 rounded-box">
      <h3 className="text-xl font-bold mb-2">Card Title</h3>
      <p>This content is currently loading.</p>
      <p>The spinner overlay prevents interaction.</p>
    </div>
  </Spin>
)

export default App`}
      >
        <Spin spinning={true} tip="Loading content...">
          <div className="p-8 bg-base-200 rounded-box">
            <h3 className="text-xl font-bold mb-2">Card Title</h3>
            <p>This content is currently loading.</p>
            <p>The spinner overlay prevents interaction.</p>
          </div>
        </Spin>
      </ExampleSection>

      <ExampleSection
        title="Controlled Spinning"
        description="Toggle the spinning state with the spinning prop."
        code={`import React from 'react'
import { Spin } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-8 flex-wrap">
    <Spin spinning={false} tip="Not spinning" />
    <Spin spinning={true} tip="Spinning" />
  </div>
)

export default App`}
      >
        <Spin spinning={false} tip="Not spinning" />
        <Spin spinning={true} tip="Spinning" />
      </ExampleSection>
      </div>

      <ApiTable data={spinApi} />
    </div>
  )
}
