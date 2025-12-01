import { Loading, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const loadingApi: ApiProperty[] = [
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

export function LoadingPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Loading</h1>
        <p className="text-base-content/70">
          Loading spinner component with multiple types and sizes.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
        title="Types"
        description="Different spinner animations to choose from."
        code={`import React from 'react'
import { Loading } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-8 flex-wrap">
    <Loading type="spinner" />
    <Loading type="dots" />
    <Loading type="ring" />
    <Loading type="ball" />
    <Loading type="bars" />
    <Loading type="infinity" />
  </div>
)

export default App`}
      >
        <Loading type="spinner" />
        <Loading type="dots" />
        <Loading type="ring" />
        <Loading type="ball" />
        <Loading type="bars" />
        <Loading type="infinity" />
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Four sizes available: xs, sm, md (default), and lg."
        code={`import React from 'react'
import { Loading } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-8 items-center flex-wrap">
    <Loading size="xs" />
    <Loading size="sm" />
    <Loading size="md" />
    <Loading size="lg" />
  </div>
)

export default App`}
      >
        <Loading size="xs" />
        <Loading size="sm" />
        <Loading size="md" />
        <Loading size="lg" />
      </ExampleSection>

      <ExampleSection
        title="With Tip"
        description="Display a text message below the spinner."
        code={`import React from 'react'
import { Loading } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-8 flex-wrap">
    <Loading tip="Loading..." />
    <Loading type="dots" tip="Please wait..." />
    <Loading type="ring" size="lg" tip="Processing..." />
  </div>
)

export default App`}
      >
        <Loading tip="Loading..." />
        <Loading type="dots" tip="Please wait..." />
        <Loading type="ring" size="lg" tip="Processing..." />
      </ExampleSection>

      <ExampleSection
        title="Embedded in Container"
        description="Wrap content to show a loading overlay."
        code={`import React from 'react'
import { Loading } from '@edadma/bloomui'

const App: React.FC = () => (
  <Loading spinning={true} tip="Loading content...">
    <div className="p-8 bg-base-200 rounded-box">
      <h3 className="text-xl font-bold mb-2">Card Title</h3>
      <p>This content is currently loading.</p>
      <p>The spinner overlay prevents interaction.</p>
    </div>
  </Loading>
)

export default App`}
      >
        <Loading spinning={true} tip="Loading content...">
          <div className="p-8 bg-base-200 rounded-box">
            <h3 className="text-xl font-bold mb-2">Card Title</h3>
            <p>This content is currently loading.</p>
            <p>The spinner overlay prevents interaction.</p>
          </div>
        </Loading>
      </ExampleSection>

      <ExampleSection
        title="Controlled Spinning"
        description="Toggle the spinning state with the spinning prop."
        code={`import React from 'react'
import { Loading } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-8 flex-wrap">
    <Loading spinning={false} tip="Not spinning" />
    <Loading spinning={true} tip="Spinning" />
  </div>
)

export default App`}
      >
        <Loading spinning={false} tip="Not spinning" />
        <Loading spinning={true} tip="Spinning" />
      </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Loading" data={loadingApi} />
      </div>
    </div>
  )
}
