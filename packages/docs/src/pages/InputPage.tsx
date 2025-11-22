import { Input } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const inputApi: ApiProperty[] = [
  {
    property: 'type',
    description: 'Input type',
    type: "'text' | 'password' | 'email' | 'number' | 'date' | 'datetime-local' | 'week' | 'month' | 'tel' | 'url' | 'search' | 'time'",
    default: "'text'",
  },
  {
    property: 'size',
    description: 'Input size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
  },
  {
    property: 'color',
    description: 'Input color theme',
    type: "'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'",
  },
  {
    property: 'ghost',
    description: 'Ghost style variant',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'bordered',
    description: 'Show border',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'disabled',
    description: 'Disabled state',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'placeholder',
    description: 'Placeholder text',
    type: 'string',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function InputPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Input</h1>
        <p className="text-base-content/70">
          Text input field component with various types, sizes, and colors.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Input"
          description="Simple text input field."
          code={`import React from 'react'
import { Input } from '@edadma/petalui'

const App: React.FC = () => (
  <Input placeholder="Type here" />
)

export default App`}
        >
          <Input placeholder="Type here" />
        </ExampleSection>

        <ExampleSection
          title="Input Types"
          description="Different input types for various data."
          code={`import React from 'react'
import { Input } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-2">
    <Input type="text" placeholder="Text" />
    <Input type="email" placeholder="Email" />
    <Input type="password" placeholder="Password" />
    <Input type="number" placeholder="Number" />
    <Input type="date" />
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-2">
            <Input type="text" placeholder="Text" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Input type="number" placeholder="Number" />
            <Input type="date" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description="Five sizes: xs, sm, md, lg, and xl."
          code={`import React from 'react'
import { Input } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-2">
    <Input size="xs" placeholder="Extra small" />
    <Input size="sm" placeholder="Small" />
    <Input size="md" placeholder="Medium (default)" />
    <Input size="lg" placeholder="Large" />
    <Input size="xl" placeholder="Extra large" />
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-2">
            <Input size="xs" placeholder="Extra small" />
            <Input size="sm" placeholder="Small" />
            <Input size="md" placeholder="Medium (default)" />
            <Input size="lg" placeholder="Large" />
            <Input size="xl" placeholder="Extra large" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Colors"
          description="Color variants for different states."
          code={`import React from 'react'
import { Input } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-2">
    <Input color="primary" placeholder="Primary" />
    <Input color="secondary" placeholder="Secondary" />
    <Input color="accent" placeholder="Accent" />
    <Input color="info" placeholder="Info" />
    <Input color="success" placeholder="Success" />
    <Input color="warning" placeholder="Warning" />
    <Input color="error" placeholder="Error" />
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-2">
            <Input color="primary" placeholder="Primary" />
            <Input color="secondary" placeholder="Secondary" />
            <Input color="accent" placeholder="Accent" />
            <Input color="info" placeholder="Info" />
            <Input color="success" placeholder="Success" />
            <Input color="warning" placeholder="Warning" />
            <Input color="error" placeholder="Error" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Ghost Style"
          description="Minimal appearance without border."
          code={`import React from 'react'
import { Input } from '@edadma/petalui'

const App: React.FC = () => (
  <Input ghost placeholder="Ghost input" />
)

export default App`}
        >
          <Input ghost placeholder="Ghost input" />
        </ExampleSection>

        <ExampleSection
          title="Without Border"
          description="Remove the border styling."
          code={`import React from 'react'
import { Input } from '@edadma/petalui'

const App: React.FC = () => (
  <Input bordered={false} placeholder="No border" />
)

export default App`}
        >
          <Input bordered={false} placeholder="No border" />
        </ExampleSection>

        <ExampleSection
          title="Disabled State"
          description="Non-interactive disabled input."
          code={`import React from 'react'
import { Input } from '@edadma/petalui'

const App: React.FC = () => (
  <Input disabled placeholder="Disabled input" />
)

export default App`}
        >
          <Input disabled placeholder="Disabled input" />
        </ExampleSection>

        <ExampleSection
          title="With Default Value"
          description="Input with pre-filled value."
          code={`import React from 'react'
import { Input } from '@edadma/petalui'

const App: React.FC = () => (
  <Input defaultValue="Pre-filled value" />
)

export default App`}
        >
          <Input defaultValue="Pre-filled value" />
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Input" data={inputApi} />
      </div>
    </div>
  )
}
