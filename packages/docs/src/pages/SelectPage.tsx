import { useState } from 'react'
import { Select, Form, Button, Modal } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const selectApi: ApiProperty[] = [
  {
    property: 'size',
    description: 'Select size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
  },
  {
    property: 'color',
    description: 'Select color theme',
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
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
  {
    property: 'children',
    description: 'Option elements',
    type: 'React.ReactNode',
  },
]

export function SelectPage() {
  const [submittedData, setSubmittedData] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (values: any) => {
    setSubmittedData(values)
    setIsModalOpen(true)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Select</h1>
        <p className="text-base-content/70">
          Dropdown select component for choosing from a list of options.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Select"
          description="Simple select dropdown."
          code={`import React from 'react'
import { Select } from '@edadma/petalui'

const App: React.FC = () => (
  <Select>
    <option disabled selected>Pick your favorite</option>
    <option>Apple</option>
    <option>Orange</option>
    <option>Banana</option>
    <option>Grape</option>
  </Select>
)

export default App`}
        >
          <Select>
            <option disabled selected>Pick your favorite</option>
            <option>Apple</option>
            <option>Orange</option>
            <option>Banana</option>
            <option>Grape</option>
          </Select>
        </ExampleSection>

        <ExampleSection
          title="With Default Value"
          description="Select with pre-selected option."
          code={`import React from 'react'
import { Select } from '@edadma/petalui'

const App: React.FC = () => (
  <Select defaultValue="orange">
    <option value="apple">Apple</option>
    <option value="orange">Orange</option>
    <option value="banana">Banana</option>
    <option value="grape">Grape</option>
  </Select>
)

export default App`}
        >
          <Select defaultValue="orange">
            <option value="apple">Apple</option>
            <option value="orange">Orange</option>
            <option value="banana">Banana</option>
            <option value="grape">Grape</option>
          </Select>
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description="Five sizes: xs, sm, md, lg, and xl."
          code={`import React from 'react'
import { Select } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-2">
    <Select size="xs">
      <option>Extra small</option>
    </Select>
    <Select size="sm">
      <option>Small</option>
    </Select>
    <Select size="md">
      <option>Medium (default)</option>
    </Select>
    <Select size="lg">
      <option>Large</option>
    </Select>
    <Select size="xl">
      <option>Extra large</option>
    </Select>
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-2">
            <Select size="xs">
              <option>Extra small</option>
            </Select>
            <Select size="sm">
              <option>Small</option>
            </Select>
            <Select size="md">
              <option>Medium (default)</option>
            </Select>
            <Select size="lg">
              <option>Large</option>
            </Select>
            <Select size="xl">
              <option>Extra large</option>
            </Select>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Colors"
          description="Color variants for different states."
          code={`import React from 'react'
import { Select } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-2">
    <Select color="primary">
      <option>Primary</option>
    </Select>
    <Select color="secondary">
      <option>Secondary</option>
    </Select>
    <Select color="accent">
      <option>Accent</option>
    </Select>
    <Select color="info">
      <option>Info</option>
    </Select>
    <Select color="success">
      <option>Success</option>
    </Select>
    <Select color="warning">
      <option>Warning</option>
    </Select>
    <Select color="error">
      <option>Error</option>
    </Select>
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-2">
            <Select color="primary">
              <option>Primary</option>
            </Select>
            <Select color="secondary">
              <option>Secondary</option>
            </Select>
            <Select color="accent">
              <option>Accent</option>
            </Select>
            <Select color="info">
              <option>Info</option>
            </Select>
            <Select color="success">
              <option>Success</option>
            </Select>
            <Select color="warning">
              <option>Warning</option>
            </Select>
            <Select color="error">
              <option>Error</option>
            </Select>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Ghost Variant"
          description="Transparent background style."
          code={`import React from 'react'
import { Select } from '@edadma/petalui'

const App: React.FC = () => (
  <Select ghost>
    <option disabled selected>Pick one</option>
    <option>Option 1</option>
    <option>Option 2</option>
  </Select>
)

export default App`}
        >
          <Select ghost>
            <option disabled selected>Pick one</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </Select>
        </ExampleSection>

        <ExampleSection
          title="Disabled State"
          description="Non-interactive disabled select."
          code={`import React from 'react'
import { Select } from '@edadma/petalui'

const App: React.FC = () => (
  <Select disabled>
    <option>Disabled select</option>
  </Select>
)

export default App`}
        >
          <Select disabled>
            <option>Disabled select</option>
          </Select>
        </ExampleSection>

        <ExampleSection
          title="In Form"
          description="Select with form validation."
          code={`import React from 'react'
import { Form, Select, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <Form
      onFinish={handleSubmit}
      initialValues={{ country: 'canada' }}
    >
      <Form.Item
        name="country"
        label="Country"
        required
        rules={{ required: 'Please select a country' }}
      >
        <Select>
          <option value="">Select a country</option>
          <option value="usa">United States</option>
          <option value="canada">Canada</option>
          <option value="mexico">Mexico</option>
          <option value="uk">United Kingdom</option>
        </Select>
      </Form.Item>

      <Form.Item
        name="language"
        label="Language"
        required
        rules={{ required: 'Please select a language' }}
      >
        <Select>
          <option value="">Select a language</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary">
          Save Settings
        </Button>
      </Form.Item>
    </Form>
  )
}

export default App`}
        >
          <Form
            onFinish={handleSubmit}
            initialValues={{ country: 'canada' }}
          >
            <Form.Item
              name="country"
              label="Country"
              required
              rules={{ required: 'Please select a country' }}
            >
              <Select>
                <option value="">Select a country</option>
                <option value="usa">United States</option>
                <option value="canada">Canada</option>
                <option value="mexico">Mexico</option>
                <option value="uk">United Kingdom</option>
              </Select>
            </Form.Item>

            <Form.Item
              name="language"
              label="Language"
              required
              rules={{ required: 'Please select a language' }}
            >
              <Select>
                <option value="">Select a language</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                Save Settings
              </Button>
            </Form.Item>
          </Form>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Select" data={selectApi} />
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        title="Form Submitted"
        footer={null}
      >
        <div className="py-4">
          <p className="mb-4">Form data:</p>
          <pre className="bg-base-200 p-4 rounded-lg overflow-auto max-h-96">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      </Modal>
    </div>
  )
}
