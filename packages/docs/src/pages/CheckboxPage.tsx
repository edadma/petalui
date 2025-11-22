import { useState } from 'react'
import { Checkbox, Form, Button, Modal } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const checkboxApi: ApiProperty[] = [
  {
    property: 'size',
    description: 'Checkbox size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
  },
  {
    property: 'color',
    description: 'Checkbox color theme',
    type: "'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'info' | 'error'",
  },
  {
    property: 'indeterminate',
    description: 'Indeterminate state (partially checked)',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'checked',
    description: 'Checked state',
    type: 'boolean',
  },
  {
    property: 'disabled',
    description: 'Disabled state',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'onChange',
    description: 'Change event handler',
    type: '(e: React.ChangeEvent<HTMLInputElement>) => void',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const checkboxGroupApi: ApiProperty[] = [
  {
    property: 'value',
    description: 'Array of checked values (controlled)',
    type: '(string | number)[]',
  },
  {
    property: 'defaultValue',
    description: 'Default array of checked values (uncontrolled)',
    type: '(string | number)[]',
  },
  {
    property: 'onChange',
    description: 'Callback when checked values change',
    type: '(values: (string | number)[]) => void',
  },
  {
    property: 'options',
    description: 'Generate checkboxes from array. Can be strings, numbers, or objects',
    type: '(string | number | CheckboxOptionType)[]',
  },
  {
    property: 'disabled',
    description: 'Disable all checkboxes in group',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function CheckboxPage() {
  const [submittedData, setSubmittedData] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (values: any) => {
    setSubmittedData(values)
    setIsModalOpen(true)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Checkbox</h1>
        <p className="text-base-content/70">
          Checkbox component for selecting or deselecting values.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Checkbox"
          description="Simple checkbox with label."
          code={`import React from 'react'
import { Checkbox } from '@edadma/petalui'

const App: React.FC = () => (
  <Checkbox>Remember me</Checkbox>
)

export default App`}
        >
          <Checkbox>Remember me</Checkbox>
        </ExampleSection>

        <ExampleSection
          title="Checked"
          description="Checkbox in checked state."
          code={`import React from 'react'
import { Checkbox } from '@edadma/petalui'

const App: React.FC = () => (
  <Checkbox checked readOnly>Checked</Checkbox>
)

export default App`}
        >
          <Checkbox checked readOnly>Checked</Checkbox>
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description="Five sizes: xs, sm, md, lg, and xl."
          code={`import React from 'react'
import { Checkbox } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex items-center gap-4">
    <Checkbox size="xs" />
    <Checkbox size="sm" />
    <Checkbox size="md" />
    <Checkbox size="lg" />
    <Checkbox size="xl" />
  </div>
)

export default App`}
        >
          <div className="flex items-center gap-4">
            <Checkbox size="xs" />
            <Checkbox size="sm" />
            <Checkbox size="md" />
            <Checkbox size="lg" />
            <Checkbox size="xl" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Colors"
          description="Color variants for different themes."
          code={`import React from 'react'
import { Checkbox } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-2">
    <Checkbox color="primary" checked readOnly>Primary</Checkbox>
    <Checkbox color="secondary" checked readOnly>Secondary</Checkbox>
    <Checkbox color="accent" checked readOnly>Accent</Checkbox>
    <Checkbox color="success" checked readOnly>Success</Checkbox>
    <Checkbox color="warning" checked readOnly>Warning</Checkbox>
    <Checkbox color="info" checked readOnly>Info</Checkbox>
    <Checkbox color="error" checked readOnly>Error</Checkbox>
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-2">
            <Checkbox color="primary" checked readOnly>Primary</Checkbox>
            <Checkbox color="secondary" checked readOnly>Secondary</Checkbox>
            <Checkbox color="accent" checked readOnly>Accent</Checkbox>
            <Checkbox color="success" checked readOnly>Success</Checkbox>
            <Checkbox color="warning" checked readOnly>Warning</Checkbox>
            <Checkbox color="info" checked readOnly>Info</Checkbox>
            <Checkbox color="error" checked readOnly>Error</Checkbox>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Disabled State"
          description="Non-interactive disabled checkbox."
          code={`import React from 'react'
import { Checkbox } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-2">
    <Checkbox disabled>Disabled unchecked</Checkbox>
    <Checkbox disabled checked readOnly>Disabled checked</Checkbox>
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-2">
            <Checkbox disabled>Disabled unchecked</Checkbox>
            <Checkbox disabled checked readOnly>Disabled checked</Checkbox>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Indeterminate State"
          description="Partially checked state for hierarchical selections."
          code={`import React from 'react'
import { Checkbox } from '@edadma/petalui'

const App: React.FC = () => (
  <Checkbox indeterminate>Indeterminate</Checkbox>
)

export default App`}
        >
          <Checkbox indeterminate>Indeterminate</Checkbox>
        </ExampleSection>

        <ExampleSection
          title="Checkbox Group"
          description="Group checkboxes together with automatic value management."
          code={`import React, { useState } from 'react'
import { Checkbox } from '@edadma/petalui'

const App: React.FC = () => {
  const [checkedList, setCheckedList] = useState(['Apple', 'Pear'])

  return (
    <div>
      <Checkbox.Group
        value={checkedList}
        onChange={setCheckedList}
        className="flex flex-col gap-2"
      >
        <Checkbox value="Apple">Apple</Checkbox>
        <Checkbox value="Pear">Pear</Checkbox>
        <Checkbox value="Orange">Orange</Checkbox>
      </Checkbox.Group>
      <div className="mt-4 text-sm">
        Selected: {checkedList.join(', ')}
      </div>
    </div>
  )
}

export default App`}
        >
          <Checkbox.Group
            defaultValue={['Apple', 'Pear']}
            className="flex flex-col gap-2"
          >
            <Checkbox value="Apple">Apple</Checkbox>
            <Checkbox value="Pear">Pear</Checkbox>
            <Checkbox value="Orange">Orange</Checkbox>
          </Checkbox.Group>
        </ExampleSection>

        <ExampleSection
          title="Checkbox Group with Options"
          description="Generate checkboxes from an options array."
          code={`import React, { useState } from 'react'
import { Checkbox } from '@edadma/petalui'

const options = ['Apple', 'Pear', 'Orange']

const App: React.FC = () => {
  const [value, setValue] = useState(['Pear'])

  return (
    <div>
      <Checkbox.Group
        options={options}
        value={value}
        onChange={setValue}
        className="flex flex-col gap-2"
      />
      <div className="mt-4 text-sm">
        Selected: {value.join(', ')}
      </div>
    </div>
  )
}

export default App`}
        >
          <Checkbox.Group
            options={['Apple', 'Pear', 'Orange']}
            defaultValue={['Pear']}
            className="flex flex-col gap-2"
          />
        </ExampleSection>

        <ExampleSection
          title="In Form"
          description="Checkbox working with Form validation."
          code={`import React from 'react'
import { Form, Checkbox, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <Form
      onFinish={handleSubmit}
      initialValues={{ newsletter: true }}
    >
      <Form.Item name="terms" valuePropName="checked">
        <Checkbox>I agree to the terms and conditions</Checkbox>
      </Form.Item>

      <Form.Item name="newsletter" valuePropName="checked">
        <Checkbox>Subscribe to newsletter</Checkbox>
      </Form.Item>

      <Form.Item name="updates" valuePropName="checked">
        <Checkbox>Receive product updates</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary">
          Save Preferences
        </Button>
      </Form.Item>
    </Form>
  )
}

export default App`}
        >
          <Form
            onFinish={handleSubmit}
            initialValues={{ newsletter: true }}
          >
            <Form.Item name="terms" valuePropName="checked">
              <Checkbox>I agree to the terms and conditions</Checkbox>
            </Form.Item>

            <Form.Item name="newsletter" valuePropName="checked">
              <Checkbox>Subscribe to newsletter</Checkbox>
            </Form.Item>

            <Form.Item name="updates" valuePropName="checked">
              <Checkbox>Receive product updates</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                Save Preferences
              </Button>
            </Form.Item>
          </Form>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Checkbox" data={checkboxApi} />

        <ApiTable title="Checkbox.Group" data={checkboxGroupApi} className="mt-8" />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Use Checkbox.Group to manage multiple related checkboxes with automatic state handling</li>
              <li>Use options prop for simple lists - it generates checkboxes with labels automatically</li>
              <li>For custom layouts, use children and apply your own styling with className</li>
              <li>Set disabled on Checkbox.Group to disable all checkboxes at once</li>
              <li>Each checkbox in a group needs a unique value prop</li>
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
