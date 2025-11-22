import { useState } from 'react'
import { Toggle, Form, Button, Modal } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const toggleApi: ApiProperty[] = [
  {
    property: 'size',
    description: 'Toggle size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
  },
  {
    property: 'color',
    description: 'Toggle color theme',
    type: "'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'info' | 'error'",
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

export function TogglePage() {
  const [submittedData, setSubmittedData] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (values: any) => {
    setSubmittedData(values)
    setIsModalOpen(true)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Toggle</h1>
        <p className="text-base-content/70">
          Toggle switch component for binary on/off states.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Toggle"
          description="Simple toggle with label."
          code={`import React from 'react'
import { Toggle } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex items-center gap-2">
    <Toggle />
    <span>Enable notifications</span>
  </div>
)

export default App`}
        >
          <div className="flex items-center gap-2">
            <Toggle />
            <span>Enable notifications</span>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Checked"
          description="Toggle in checked state."
          code={`import React from 'react'
import { Toggle } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex items-center gap-2">
    <Toggle checked readOnly />
    <span>Enabled</span>
  </div>
)

export default App`}
        >
          <div className="flex items-center gap-2">
            <Toggle checked readOnly />
            <span>Enabled</span>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description="Five sizes: xs, sm, md, lg, and xl."
          code={`import React from 'react'
import { Toggle } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex items-center gap-4">
    <Toggle size="xs" />
    <Toggle size="sm" />
    <Toggle size="md" />
    <Toggle size="lg" />
    <Toggle size="xl" />
  </div>
)

export default App`}
        >
          <div className="flex items-center gap-4">
            <Toggle size="xs" />
            <Toggle size="sm" />
            <Toggle size="md" />
            <Toggle size="lg" />
            <Toggle size="xl" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Colors"
          description="Color variants for different themes."
          code={`import React from 'react'
import { Toggle } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2">
      <Toggle color="primary" checked readOnly />
      <span>Primary</span>
    </div>
    <div className="flex items-center gap-2">
      <Toggle color="secondary" checked readOnly />
      <span>Secondary</span>
    </div>
    <div className="flex items-center gap-2">
      <Toggle color="accent" checked readOnly />
      <span>Accent</span>
    </div>
    <div className="flex items-center gap-2">
      <Toggle color="success" checked readOnly />
      <span>Success</span>
    </div>
    <div className="flex items-center gap-2">
      <Toggle color="warning" checked readOnly />
      <span>Warning</span>
    </div>
    <div className="flex items-center gap-2">
      <Toggle color="info" checked readOnly />
      <span>Info</span>
    </div>
    <div className="flex items-center gap-2">
      <Toggle color="error" checked readOnly />
      <span>Error</span>
    </div>
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Toggle color="primary" checked readOnly />
              <span>Primary</span>
            </div>
            <div className="flex items-center gap-2">
              <Toggle color="secondary" checked readOnly />
              <span>Secondary</span>
            </div>
            <div className="flex items-center gap-2">
              <Toggle color="accent" checked readOnly />
              <span>Accent</span>
            </div>
            <div className="flex items-center gap-2">
              <Toggle color="success" checked readOnly />
              <span>Success</span>
            </div>
            <div className="flex items-center gap-2">
              <Toggle color="warning" checked readOnly />
              <span>Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <Toggle color="info" checked readOnly />
              <span>Info</span>
            </div>
            <div className="flex items-center gap-2">
              <Toggle color="error" checked readOnly />
              <span>Error</span>
            </div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Disabled State"
          description="Non-interactive disabled toggle."
          code={`import React from 'react'
import { Toggle } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2">
      <Toggle disabled />
      <span>Disabled off</span>
    </div>
    <div className="flex items-center gap-2">
      <Toggle disabled checked readOnly />
      <span>Disabled on</span>
    </div>
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Toggle disabled />
              <span>Disabled off</span>
            </div>
            <div className="flex items-center gap-2">
              <Toggle disabled checked readOnly />
              <span>Disabled on</span>
            </div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="In Form"
          description="Toggle working with Form validation."
          code={`import React from 'react'
import { Form, Toggle, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <Form
      onFinish={handleSubmit}
      initialValues={{ notifications: true }}
    >
      <Form.Item name="notifications" valuePropName="checked">
        <div className="flex items-center gap-2">
          <Toggle />
          <span>Enable notifications</span>
        </div>
      </Form.Item>

      <Form.Item name="newsletter" valuePropName="checked">
        <div className="flex items-center gap-2">
          <Toggle />
          <span>Subscribe to newsletter</span>
        </div>
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
            initialValues={{ notifications: true }}
          >
            <Form.Item name="notifications" valuePropName="checked">
              <div className="flex items-center gap-2">
                <Toggle />
                <span>Enable notifications</span>
              </div>
            </Form.Item>

            <Form.Item name="newsletter" valuePropName="checked">
              <div className="flex items-center gap-2">
                <Toggle />
                <span>Subscribe to newsletter</span>
              </div>
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

        <ApiTable title="Toggle" data={toggleApi} />
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
