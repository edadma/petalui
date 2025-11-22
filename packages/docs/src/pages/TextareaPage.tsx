import { useState } from 'react'
import { Textarea, Form, Button, Modal } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const textareaApi: ApiProperty[] = [
  {
    property: 'size',
    description: 'Textarea size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
  },
  {
    property: 'color',
    description: 'Textarea color theme',
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
    property: 'rows',
    description: 'Number of visible text rows',
    type: 'number',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function TextareaPage() {
  const [submittedData, setSubmittedData] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (values: any) => {
    setSubmittedData(values)
    setIsModalOpen(true)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Textarea</h1>
        <p className="text-base-content/70">
          Multi-line text input component for longer text content.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Textarea"
          description="Simple textarea with placeholder."
          code={`import React from 'react'
import { Textarea } from '@edadma/petalui'

const App: React.FC = () => (
  <Textarea placeholder="Type your message here" />
)

export default App`}
        >
          <Textarea placeholder="Type your message here" />
        </ExampleSection>

        <ExampleSection
          title="With Rows"
          description="Control height with rows attribute."
          code={`import React from 'react'
import { Textarea } from '@edadma/petalui'

const App: React.FC = () => (
  <Textarea rows={6} placeholder="Tall textarea" />
)

export default App`}
        >
          <Textarea rows={6} placeholder="Tall textarea" />
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description="Five sizes: xs, sm, md, lg, and xl."
          code={`import React from 'react'
import { Textarea } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-2">
    <Textarea size="xs" placeholder="Extra small" />
    <Textarea size="sm" placeholder="Small" />
    <Textarea size="md" placeholder="Medium (default)" />
    <Textarea size="lg" placeholder="Large" />
    <Textarea size="xl" placeholder="Extra large" />
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-2">
            <Textarea size="xs" placeholder="Extra small" />
            <Textarea size="sm" placeholder="Small" />
            <Textarea size="md" placeholder="Medium (default)" />
            <Textarea size="lg" placeholder="Large" />
            <Textarea size="xl" placeholder="Extra large" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Colors"
          description="Color variants for different states."
          code={`import React from 'react'
import { Textarea } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-2">
    <Textarea color="primary" placeholder="Primary" />
    <Textarea color="secondary" placeholder="Secondary" />
    <Textarea color="accent" placeholder="Accent" />
    <Textarea color="info" placeholder="Info" />
    <Textarea color="success" placeholder="Success" />
    <Textarea color="warning" placeholder="Warning" />
    <Textarea color="error" placeholder="Error" />
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-2">
            <Textarea color="primary" placeholder="Primary" />
            <Textarea color="secondary" placeholder="Secondary" />
            <Textarea color="accent" placeholder="Accent" />
            <Textarea color="info" placeholder="Info" />
            <Textarea color="success" placeholder="Success" />
            <Textarea color="warning" placeholder="Warning" />
            <Textarea color="error" placeholder="Error" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Ghost Variant"
          description="Transparent background style."
          code={`import React from 'react'
import { Textarea } from '@edadma/petalui'

const App: React.FC = () => (
  <Textarea ghost placeholder="Ghost textarea" />
)

export default App`}
        >
          <Textarea ghost placeholder="Ghost textarea" />
        </ExampleSection>

        <ExampleSection
          title="Disabled State"
          description="Non-interactive disabled textarea."
          code={`import React from 'react'
import { Textarea } from '@edadma/petalui'

const App: React.FC = () => (
  <Textarea disabled placeholder="Disabled textarea" />
)

export default App`}
        >
          <Textarea disabled placeholder="Disabled textarea" />
        </ExampleSection>

        <ExampleSection
          title="In Form"
          description="Textarea with form validation."
          code={`import React from 'react'
import { Form, Textarea, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="message"
        label="Message"
        required
        rules={{
          required: 'Please enter a message',
          min: { value: 10, message: 'Message must be at least 10 characters' },
        }}
      >
        <Textarea rows={4} placeholder="Enter your message here" />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary">
          Send Message
        </Button>
      </Form.Item>
    </Form>
  )
}

export default App`}
        >
          <Form onFinish={handleSubmit}>
            <Form.Item
              name="message"
              label="Message"
              required
              rules={{
                required: 'Please enter a message',
                min: { value: 10, message: 'Message must be at least 10 characters' },
              }}
            >
              <Textarea rows={4} placeholder="Enter your message here" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Textarea" data={textareaApi} />
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
