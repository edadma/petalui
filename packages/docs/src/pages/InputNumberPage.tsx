import { useState } from 'react'
import { InputNumber, Masonry } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const inputNumberApi: ApiProperty[] = [
  {
    property: 'value',
    description: 'Current value (controlled)',
    type: 'number',
  },
  {
    property: 'defaultValue',
    description: 'Default value (uncontrolled)',
    type: 'number',
  },
  {
    property: 'min',
    description: 'Minimum value',
    type: 'number',
    default: '-Infinity',
  },
  {
    property: 'max',
    description: 'Maximum value',
    type: 'number',
    default: 'Infinity',
  },
  {
    property: 'step',
    description: 'Step value for increment/decrement',
    type: 'number',
    default: '1',
  },
  {
    property: 'precision',
    description: 'Number of decimal places',
    type: 'number',
  },
  {
    property: 'size',
    description: 'Size of the input',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
  },
  {
    property: 'disabled',
    description: 'Whether input is disabled',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'onChange',
    description: 'Callback when value changes',
    type: '(value: number | null) => void',
  },
  {
    property: 'formatter',
    description: 'Custom display formatter',
    type: '(value: number | undefined) => string',
  },
  {
    property: 'parser',
    description: 'Custom value parser',
    type: '(displayValue: string) => number',
  },
  {
    property: 'controls',
    description: 'Show increment/decrement buttons',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export default function InputNumberPage() {
  const [value1, setValue1] = useState(5)
  const [value2, setValue2] = useState(0)

  return (
    <div className="space-y-8 pb-16">
      <div>
        <h1 className="text-4xl font-bold mb-2">InputNumber</h1>
        <p className="text-lg opacity-70">
          Number input with increment/decrement controls and validation.
        </p>
      </div>

      <div className="space-y-6">
        <ExampleSection
          title="Basic Usage"
          code={`import React from 'react'
import { InputNumber } from '@edadma/petalui'

const App: React.FC = () => (
  <InputNumber defaultValue={0} />
)

export default App`}
        >
          <InputNumber defaultValue={0} />
        </ExampleSection>

        <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
          <ExampleSection
            title="Min and Max"
            code={`import React from 'react'
import { InputNumber } from '@edadma/petalui'

const App: React.FC = () => (
  <InputNumber defaultValue={5} min={0} max={10} />
)

export default App`}
          >
            <InputNumber defaultValue={5} min={0} max={10} />
          </ExampleSection>

          <ExampleSection
            title="Step"
            code={`import React from 'react'
import { InputNumber } from '@edadma/petalui'

const App: React.FC = () => (
  <InputNumber defaultValue={0} step={5} />
)

export default App`}
          >
            <InputNumber defaultValue={0} step={5} />
          </ExampleSection>

          <ExampleSection
            title="Decimal Precision"
            code={`import React from 'react'
import { InputNumber } from '@edadma/petalui'

const App: React.FC = () => (
  <InputNumber defaultValue={1.5} step={0.1} precision={2} />
)

export default App`}
          >
            <InputNumber defaultValue={1.5} step={0.1} precision={2} />
          </ExampleSection>

          <ExampleSection
            title="Sizes"
            code={`import React from 'react'
import { InputNumber } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="space-y-2">
    <InputNumber size="xs" defaultValue={0} />
    <InputNumber size="sm" defaultValue={0} />
    <InputNumber size="md" defaultValue={0} />
    <InputNumber size="lg" defaultValue={0} />
  </div>
)

export default App`}
          >
            <div className="space-y-2">
              <InputNumber size="xs" defaultValue={0} />
              <InputNumber size="sm" defaultValue={0} />
              <InputNumber size="md" defaultValue={0} />
              <InputNumber size="lg" defaultValue={0} />
            </div>
          </ExampleSection>
        </Masonry>

        <ExampleSection
          title="Controlled Mode"
          code={`import React, { useState } from 'react'
import { InputNumber } from '@edadma/petalui'

const App: React.FC = () => {
  const [value, setValue] = useState(5)

  return (
    <div className="space-y-2">
      <InputNumber value={value} onChange={(val) => setValue(val ?? 0)} />
      <p>Current value: {value}</p>
    </div>
  )
}

export default App`}
        >
          <div className="space-y-2">
            <InputNumber value={value1} onChange={(val) => setValue1(val ?? 0)} />
            <p>Current value: {value1}</p>
          </div>
        </ExampleSection>

        <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
          <ExampleSection
            title="Formatter and Parser"
            code={`import React from 'react'
import { InputNumber } from '@edadma/petalui'

const App: React.FC = () => (
  <InputNumber
    defaultValue={1000}
    formatter={(value) => \`$ \${value}\`.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',')}
    parser={(value) => value.replace(/\\$\\s?|(,*)/g, '')}
  />
)

export default App`}
          >
            <InputNumber
              defaultValue={1000}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => parseFloat(value.replace(/\$\s?|(,*)/g, ''))}
            />
          </ExampleSection>

          <ExampleSection
            title="Percentage"
            code={`import React from 'react'
import { InputNumber } from '@edadma/petalui'

const App: React.FC = () => (
  <InputNumber
    defaultValue={50}
    min={0}
    max={100}
    formatter={(value) => \`\${value}%\`}
    parser={(value) => value.replace('%', '')}
  />
)

export default App`}
          >
            <InputNumber
              defaultValue={50}
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => parseFloat(value.replace('%', ''))}
            />
          </ExampleSection>

          <ExampleSection
            title="Without Controls"
            code={`import React from 'react'
import { InputNumber } from '@edadma/petalui'

const App: React.FC = () => (
  <InputNumber defaultValue={10} controls={false} />
)

export default App`}
          >
            <InputNumber defaultValue={10} controls={false} />
          </ExampleSection>

          <ExampleSection
            title="Disabled"
            code={`import React from 'react'
import { InputNumber } from '@edadma/petalui'

const App: React.FC = () => (
  <InputNumber defaultValue={5} disabled />
)

export default App`}
          >
            <InputNumber defaultValue={5} disabled />
          </ExampleSection>
        </Masonry>

        <ExampleSection
          title="Keyboard Support"
          description="Use arrow keys to increment/decrement the value"
          code={`import React, { useState } from 'react'
import { InputNumber } from '@edadma/petalui'

const App: React.FC = () => {
  const [value, setValue] = useState(0)

  return (
    <div className="space-y-2">
      <InputNumber value={value} onChange={(val) => setValue(val ?? 0)} />
      <p className="text-sm opacity-70">
        Try using ↑ and ↓ arrow keys when focused
      </p>
    </div>
  )
}

export default App`}
        >
          <div className="space-y-2">
            <InputNumber value={value2} onChange={(val) => setValue2(val ?? 0)} />
            <p className="text-sm opacity-70">
              Try using ↑ and ↓ arrow keys when focused
            </p>
          </div>
        </ExampleSection>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">API</h2>
        <ApiTable data={inputNumberApi} title="InputNumber" />
      </div>
    </div>
  )
}
