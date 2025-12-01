import { Label, Input, Select, Space, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const labelApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Label text content',
    type: 'React.ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const floatingLabelApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Input element',
    type: 'React.ReactNode',
  },
  {
    property: 'label',
    description: 'Floating label text',
    type: 'string',
  },
  {
    property: 'size',
    description: 'Input size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function LabelPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Label</h1>
        <p className="text-base-content/70">
          Text labels for input fields with prefix/suffix and floating variants.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Prefix Label"
          description="Label before the input (prefix)."
          code={`import React from 'react'
import { Label, Input } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex items-center gap-0">
    <Label>https://</Label>
    <Input placeholder="example.com" />
  </div>
)

export default App`}
        >
          <div className="flex items-center gap-0">
            <Label>https://</Label>
            <Input placeholder="example.com" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Suffix Label"
          description="Label after the input (suffix)."
          code={`import React from 'react'
import { Label, Input } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex items-center gap-0">
    <Input placeholder="example" />
    <Label>.com</Label>
  </div>
)

export default App`}
        >
          <div className="flex items-center gap-0">
            <Input placeholder="example" />
            <Label>.com</Label>
          </div>
        </ExampleSection>

        <ExampleSection
          title="With Select"
          description="Label with select dropdown."
          code={`import React from 'react'
import { Label, Select } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex items-center gap-2">
    <Label>Type</Label>
    <Select>
      <option>Personal</option>
      <option>Business</option>
      <option>Educational</option>
    </Select>
  </div>
)

export default App`}
        >
          <div className="flex items-center gap-2">
            <Label>Type</Label>
            <Select>
              <option>Personal</option>
              <option>Business</option>
              <option>Educational</option>
            </Select>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Floating Label"
          description="Label that floats above input on focus."
          code={`import React from 'react'
import { Label, Input } from '@edadma/bloomui'

const App: React.FC = () => (
  <Label.Floating label="Email">
    <Input type="email" />
  </Label.Floating>
)

export default App`}
        >
          <Label.Floating label="Email">
            <Input type="email" />
          </Label.Floating>
        </ExampleSection>

        <ExampleSection
          title="Floating Label Sizes"
          description="Different sizes for floating labels."
          code={`import React from 'react'
import { Label, Input, Space } from '@edadma/bloomui'

const App: React.FC = () => (
  <Space>
    <Label.Floating label="Extra Small" size="xs">
      <Input size="xs" />
    </Label.Floating>
    <Label.Floating label="Small" size="sm">
      <Input size="sm" />
    </Label.Floating>
    <Label.Floating label="Medium" size="md">
      <Input size="md" />
    </Label.Floating>
    <Label.Floating label="Large" size="lg">
      <Input size="lg" />
    </Label.Floating>
    <Label.Floating label="Extra Large" size="xl">
      <Input size="xl" />
    </Label.Floating>
  </Space>
)

export default App`}
        >
          <Space>
            <Label.Floating label="Extra Small" size="xs">
              <Input size="xs" />
            </Label.Floating>
            <Label.Floating label="Small" size="sm">
              <Input size="sm" />
            </Label.Floating>
            <Label.Floating label="Medium" size="md">
              <Input size="md" />
            </Label.Floating>
            <Label.Floating label="Large" size="lg">
              <Input size="lg" />
            </Label.Floating>
            <Label.Floating label="Extra Large" size="xl">
              <Input size="xl" />
            </Label.Floating>
          </Space>
        </ExampleSection>

        <ExampleSection
          title="Floating with Date Input"
          description="Floating label with date input."
          code={`import React from 'react'
import { Label, Input } from '@edadma/bloomui'

const App: React.FC = () => (
  <Label.Floating label="Birth Date">
    <Input type="date" />
  </Label.Floating>
)

export default App`}
        >
          <Label.Floating label="Birth Date">
            <Input type="date" />
          </Label.Floating>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Label" data={labelApi} />

        <ApiTable title="Label.Floating" data={floatingLabelApi} className="mt-8" />
      </div>
    </div>
  )
}
