import { Checkbox, Form, Button } from '@edadma/petalui'
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

export function CheckboxPage() {
  const handleSubmit = (values: any) => {
    alert(JSON.stringify(values, null, 2))
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
  <div className="flex items-center gap-2">
    <Checkbox />
    <span>Remember me</span>
  </div>
)

export default App`}
        >
          <div className="flex items-center gap-2">
            <Checkbox />
            <span>Remember me</span>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Checked"
          description="Checkbox in checked state."
          code={`import React from 'react'
import { Checkbox } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex items-center gap-2">
    <Checkbox checked />
    <span>Checked</span>
  </div>
)

export default App`}
        >
          <div className="flex items-center gap-2">
            <Checkbox checked readOnly />
            <span>Checked</span>
          </div>
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
    <div className="flex items-center gap-2">
      <Checkbox color="primary" checked readOnly />
      <span>Primary</span>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox color="secondary" checked readOnly />
      <span>Secondary</span>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox color="accent" checked readOnly />
      <span>Accent</span>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox color="success" checked readOnly />
      <span>Success</span>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox color="warning" checked readOnly />
      <span>Warning</span>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox color="info" checked readOnly />
      <span>Info</span>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox color="error" checked readOnly />
      <span>Error</span>
    </div>
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox color="primary" checked readOnly />
              <span>Primary</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox color="secondary" checked readOnly />
              <span>Secondary</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox color="accent" checked readOnly />
              <span>Accent</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox color="success" checked readOnly />
              <span>Success</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox color="warning" checked readOnly />
              <span>Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox color="info" checked readOnly />
              <span>Info</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox color="error" checked readOnly />
              <span>Error</span>
            </div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Disabled State"
          description="Non-interactive disabled checkbox."
          code={`import React from 'react'
import { Checkbox } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2">
      <Checkbox disabled />
      <span>Disabled unchecked</span>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox disabled checked readOnly />
      <span>Disabled checked</span>
    </div>
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox disabled />
              <span>Disabled unchecked</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox disabled checked readOnly />
              <span>Disabled checked</span>
            </div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Indeterminate State"
          description="Partially checked state for hierarchical selections."
          code={`import React from 'react'
import { Checkbox } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex items-center gap-2">
    <Checkbox indeterminate />
    <span>Indeterminate</span>
  </div>
)

export default App`}
        >
          <div className="flex items-center gap-2">
            <Checkbox indeterminate />
            <span>Indeterminate</span>
          </div>
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
        <div className="flex items-center gap-2">
          <Checkbox />
          <span>I agree to the terms and conditions</span>
        </div>
      </Form.Item>

      <Form.Item name="newsletter" valuePropName="checked">
        <div className="flex items-center gap-2">
          <Checkbox />
          <span>Subscribe to newsletter</span>
        </div>
      </Form.Item>

      <Form.Item name="updates" valuePropName="checked">
        <div className="flex items-center gap-2">
          <Checkbox />
          <span>Receive product updates</span>
        </div>
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
              <div className="flex items-center gap-2">
                <Checkbox />
                <span>I agree to the terms and conditions</span>
              </div>
            </Form.Item>

            <Form.Item name="newsletter" valuePropName="checked">
              <div className="flex items-center gap-2">
                <Checkbox />
                <span>Subscribe to newsletter</span>
              </div>
            </Form.Item>

            <Form.Item name="updates" valuePropName="checked">
              <div className="flex items-center gap-2">
                <Checkbox />
                <span>Receive product updates</span>
              </div>
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
        <h2 className="text-2xl font-bold mb-4">Checkbox API</h2>
        <ApiTable data={checkboxApi} />
      </div>
    </div>
  )
}
