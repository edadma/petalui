import { useState } from 'react'
import { Radio, Form, Modal } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const radioGroupApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Radio components',
    type: 'React.ReactNode',
  },
  {
    property: 'value',
    description: 'Current selected value (controlled)',
    type: 'string | number',
  },
  {
    property: 'defaultValue',
    description: 'Default selected value (uncontrolled)',
    type: 'string | number',
  },
  {
    property: 'onChange',
    description: 'Callback when selection changes',
    type: '(value: string | number) => void',
  },
  {
    property: 'name',
    description: 'Name for all radio inputs in the group',
    type: 'string',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const radioApi: ApiProperty[] = [
  {
    property: 'value',
    description: 'Radio value (required when in Radio.Group)',
    type: 'string | number',
  },
  {
    property: 'size',
    description: 'Radio button size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
  },
  {
    property: 'color',
    description: 'Radio button color variant',
    type: "'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'",
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
]

export function RadioPage() {
  const [submittedData, setSubmittedData] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (values: { plan?: string }) => {
    setSubmittedData(values)
    setIsModalOpen(true)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Radio</h1>
        <p className="text-base-content/70">
          Radio buttons for selecting one option from a set.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Usage"
          description="Use Radio.Group to manage radio selection."
          code={`import React from 'react'
import { Radio } from '@edadma/petalui'

const App: React.FC = () => (
  <Radio.Group defaultValue="1">
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2 cursor-pointer">
        <Radio value="1" />
        <span>Option 1</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Radio value="2" />
        <span>Option 2</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Radio value="3" />
        <span>Option 3</span>
      </label>
    </div>
  </Radio.Group>
)

export default App`}
        >
          <Radio.Group defaultValue="1">
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <Radio value="1" />
                <span>Option 1</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Radio value="2" />
                <span>Option 2</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Radio value="3" />
                <span>Option 3</span>
              </label>
            </div>
          </Radio.Group>
        </ExampleSection>

        <ExampleSection
          title="Horizontal Layout"
          description="Radio buttons in a horizontal row."
          code={`import React from 'react'
import { Radio } from '@edadma/petalui'

const App: React.FC = () => (
  <Radio.Group defaultValue="apple">
    <div className="flex gap-4">
      <label className="flex items-center gap-2 cursor-pointer">
        <Radio value="apple" />
        <span>Apple</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Radio value="orange" />
        <span>Orange</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Radio value="banana" />
        <span>Banana</span>
      </label>
    </div>
  </Radio.Group>
)

export default App`}
        >
          <Radio.Group defaultValue="apple">
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <Radio value="apple" />
                <span>Apple</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Radio value="orange" />
                <span>Orange</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Radio value="banana" />
                <span>Banana</span>
              </label>
            </div>
          </Radio.Group>
        </ExampleSection>

        <ExampleSection
          title="Different Sizes"
          description="Radio buttons in various sizes."
          code={`import React from 'react'
import { Radio } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-3">
    <label className="flex items-center gap-2">
      <Radio size="xs" defaultChecked />
      <span className="text-xs">Extra Small</span>
    </label>
    <label className="flex items-center gap-2">
      <Radio size="sm" />
      <span className="text-sm">Small</span>
    </label>
    <label className="flex items-center gap-2">
      <Radio size="md" />
      <span>Medium</span>
    </label>
    <label className="flex items-center gap-2">
      <Radio size="lg" />
      <span className="text-lg">Large</span>
    </label>
    <label className="flex items-center gap-2">
      <Radio size="xl" />
      <span className="text-xl">Extra Large</span>
    </label>
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2">
              <Radio size="xs" defaultChecked />
              <span className="text-xs">Extra Small</span>
            </label>
            <label className="flex items-center gap-2">
              <Radio size="sm" />
              <span className="text-sm">Small</span>
            </label>
            <label className="flex items-center gap-2">
              <Radio size="md" />
              <span>Medium</span>
            </label>
            <label className="flex items-center gap-2">
              <Radio size="lg" />
              <span className="text-lg">Large</span>
            </label>
            <label className="flex items-center gap-2">
              <Radio size="xl" />
              <span className="text-xl">Extra Large</span>
            </label>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Colors"
          description="Colored radio button variants."
          code={`import React from 'react'
import { Radio } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-wrap gap-4">
    <Radio color="primary" defaultChecked />
    <Radio color="secondary" />
    <Radio color="accent" />
    <Radio color="info" />
    <Radio color="success" />
    <Radio color="warning" />
    <Radio color="error" />
  </div>
)

export default App`}
        >
          <div className="flex flex-wrap gap-4">
            <Radio color="primary" defaultChecked />
            <Radio color="secondary" />
            <Radio color="accent" />
            <Radio color="info" />
            <Radio color="success" />
            <Radio color="warning" />
            <Radio color="error" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Disabled State"
          description="Disabled radio buttons."
          code={`import React from 'react'
import { Radio } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-3">
    <label className="flex items-center gap-2">
      <Radio disabled />
      <span className="opacity-50">Disabled unchecked</span>
    </label>
    <label className="flex items-center gap-2">
      <Radio disabled defaultChecked />
      <span className="opacity-50">Disabled checked</span>
    </label>
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2">
              <Radio disabled />
              <span className="opacity-50">Disabled unchecked</span>
            </label>
            <label className="flex items-center gap-2">
              <Radio disabled defaultChecked />
              <span className="opacity-50">Disabled checked</span>
            </label>
          </div>
        </ExampleSection>

        <ExampleSection
          title="In Form"
          description="Radio group in a form with validation."
          code={`import React from 'react'
import { Radio, Form, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const handleSubmit = (values: { plan?: string }) => {
    console.log(values)
  }

  return (
    <Form onFinish={handleSubmit} initialValues={{ plan: 'basic' }}>
      <Form.Item
        name="plan"
        label="Choose a plan"
        rules={{ required: 'Please select a plan' }}
      >
        <Radio.Group>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="basic" />
              <div>
                <div className="font-semibold">Basic</div>
                <div className="text-sm opacity-70">$10/month</div>
              </div>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="pro" />
              <div>
                <div className="font-semibold">Pro</div>
                <div className="text-sm opacity-70">$20/month</div>
              </div>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="enterprise" />
              <div>
                <div className="font-semibold">Enterprise</div>
                <div className="text-sm opacity-70">Contact us</div>
              </div>
            </label>
          </div>
        </Radio.Group>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Continue
      </Button>
    </Form>
  )
}

export default App`}
        >
          <Form onFinish={handleSubmit} initialValues={{ plan: 'basic' }}>
            <Form.Item name="plan" label="Choose a plan" rules={{ required: 'Please select a plan' }}>
              <Radio.Group>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Radio value="basic" />
                    <div>
                      <div className="font-semibold">Basic</div>
                      <div className="text-sm opacity-70">$10/month</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Radio value="pro" />
                    <div>
                      <div className="font-semibold">Pro</div>
                      <div className="text-sm opacity-70">$20/month</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Radio value="enterprise" />
                    <div>
                      <div className="font-semibold">Enterprise</div>
                      <div className="text-sm opacity-70">Contact us</div>
                    </div>
                  </label>
                </div>
              </Radio.Group>
            </Form.Item>
            <button type="submit" className="btn btn-primary">
              Continue
            </button>
          </Form>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Radio.Group" data={radioGroupApi} />

        <ApiTable title="Radio" data={radioApi} className="mt-8" />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>
                Use <code>Radio.Group</code> to manage selection state
              </li>
              <li>
                Each <code>Radio</code> needs a unique <code>value</code> prop
              </li>
              <li>
                Use <code>defaultValue</code> for uncontrolled, <code>value</code> + <code>onChange</code> for
                controlled
              </li>
            </ul>
          </div>
        </div>
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
