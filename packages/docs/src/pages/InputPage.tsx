import { Input, Space, Masonry } from '@edadma/petalui'
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
  {
    property: 'mask',
    description: 'Input mask pattern. Use # for digits, A for letters, * for alphanumeric',
    type: 'string',
  },
  {
    property: 'maskPlaceholder',
    description: 'Placeholder character shown in mask',
    type: 'string',
    default: "'_'",
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

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
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
import { Input, Space } from '@edadma/petalui'

const App: React.FC = () => (
  <Space size="xs">
    <Input type="text" placeholder="Text" />
    <Input type="email" placeholder="Email" />
    <Input type="password" placeholder="Password" />
    <Input type="number" placeholder="Number" />
    <Input type="date" />
  </Space>
)

export default App`}
        >
          <Space size="xs">
            <Input type="text" placeholder="Text" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Input type="number" placeholder="Number" />
            <Input type="date" />
          </Space>
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description="Five sizes: xs, sm, md, lg, and xl."
          code={`import React from 'react'
import { Input, Space } from '@edadma/petalui'

const App: React.FC = () => (
  <Space size="xs">
    <Input size="xs" placeholder="Extra small" />
    <Input size="sm" placeholder="Small" />
    <Input size="md" placeholder="Medium (default)" />
    <Input size="lg" placeholder="Large" />
    <Input size="xl" placeholder="Extra large" />
  </Space>
)

export default App`}
        >
          <Space size="xs">
            <Input size="xs" placeholder="Extra small" />
            <Input size="sm" placeholder="Small" />
            <Input size="md" placeholder="Medium (default)" />
            <Input size="lg" placeholder="Large" />
            <Input size="xl" placeholder="Extra large" />
          </Space>
        </ExampleSection>

        <ExampleSection
          title="Colors"
          description="Color variants for different states."
          code={`import React from 'react'
import { Input, Space } from '@edadma/petalui'

const App: React.FC = () => (
  <Space size="xs">
    <Input color="primary" placeholder="Primary" />
    <Input color="secondary" placeholder="Secondary" />
    <Input color="accent" placeholder="Accent" />
    <Input color="info" placeholder="Info" />
    <Input color="success" placeholder="Success" />
    <Input color="warning" placeholder="Warning" />
    <Input color="error" placeholder="Error" />
  </Space>
)

export default App`}
        >
          <Space size="xs">
            <Input color="primary" placeholder="Primary" />
            <Input color="secondary" placeholder="Secondary" />
            <Input color="accent" placeholder="Accent" />
            <Input color="info" placeholder="Info" />
            <Input color="success" placeholder="Success" />
            <Input color="warning" placeholder="Warning" />
            <Input color="error" placeholder="Error" />
          </Space>
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

        <ExampleSection
          title="Input Mask - Phone"
          description="Mask for US phone number format."
          code={`<Input mask="(###) ###-####" placeholder="Phone number" />`}
        >
          <Input mask="(###) ###-####" />
        </ExampleSection>

        <ExampleSection
          title="Input Mask - Credit Card"
          description="Mask for credit card number."
          code={`<Input mask="#### #### #### ####" placeholder="Card number" />`}
        >
          <Input mask="#### #### #### ####" />
        </ExampleSection>

        <ExampleSection
          title="Input Mask - Date"
          description="Mask for date format MM/DD/YYYY."
          code={`<Input mask="##/##/####" placeholder="MM/DD/YYYY" />`}
        >
          <Input mask="##/##/####" />
        </ExampleSection>

        <ExampleSection
          title="Input Mask - SSN"
          description="Mask for Social Security Number."
          code={`<Input mask="###-##-####" placeholder="SSN" />`}
        >
          <Input mask="###-##-####" />
        </ExampleSection>

        <ExampleSection
          title="Input Mask - Custom Placeholder"
          description="Use a different placeholder character."
          code={`<Input mask="AA-####" maskPlaceholder="·" placeholder="Code" />`}
        >
          <Input mask="AA-####" maskPlaceholder="·" />
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Input" data={inputApi} />
      </div>
    </div>
  )
}
