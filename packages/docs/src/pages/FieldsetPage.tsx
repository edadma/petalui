import { useState } from 'react'
import { Fieldset, Input, Select, Checkbox, Button, Form, Modal, Space, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const fieldsetApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Content of the fieldset',
    type: 'React.ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
  {
    property: 'disabled',
    description: 'Disable all form controls within',
    type: 'boolean',
    default: 'false',
  },
]

const fieldsetLegendApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Legend text content',
    type: 'React.ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function FieldsetPage() {
  const [submittedData, setSubmittedData] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (values: any) => {
    setSubmittedData(values)
    setIsModalOpen(true)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Fieldset</h1>
        <p className="text-base-content/70">
          Container for grouping related form elements with a legend.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Fieldset"
          description="Simple fieldset with legend and inputs."
          code={`import React from 'react'
import { Fieldset, Input, Space } from '@edadma/bloomui'

const App: React.FC = () => (
  <Fieldset>
    <Fieldset.Legend>Personal Information</Fieldset.Legend>
    <Space>
      <label className="label">
        <span className="label-text">Name</span>
      </label>
      <Input placeholder="Enter your name" />

      <label className="label">
        <span className="label-text">Email</span>
      </label>
      <Input type="email" placeholder="Enter your email" />
    </Space>
  </Fieldset>
)

export default App`}
        >
          <Fieldset>
            <Fieldset.Legend>Personal Information</Fieldset.Legend>
            <Space>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <Input placeholder="Enter your name" />

              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <Input type="email" placeholder="Enter your email" />
            </Space>
          </Fieldset>
        </ExampleSection>

        <ExampleSection
          title="With Styling"
          description="Fieldset with border and background."
          code={`import React from 'react'
import { Fieldset, Select, Space } from '@edadma/bloomui'

const App: React.FC = () => (
  <Fieldset className="border border-base-300 bg-base-200 rounded-box p-4">
    <Fieldset.Legend>Preferences</Fieldset.Legend>
    <Space>
      <label className="label">
        <span className="label-text">Language</span>
      </label>
      <Select>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </Select>

      <label className="label">
        <span className="label-text">Theme</span>
      </label>
      <Select>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="auto">Auto</option>
      </Select>
    </Space>
  </Fieldset>
)

export default App`}
        >
          <Fieldset className="border border-base-300 bg-base-200 rounded-box p-4">
            <Fieldset.Legend>Preferences</Fieldset.Legend>
            <Space>
              <label className="label">
                <span className="label-text">Language</span>
              </label>
              <Select>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </Select>

              <label className="label">
                <span className="label-text">Theme</span>
              </label>
              <Select>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </Select>
            </Space>
          </Fieldset>
        </ExampleSection>

        <ExampleSection
          title="Multiple Fieldsets"
          description="Grouping different sections of a form."
          code={`import React from 'react'
import { Fieldset, Input, Checkbox, Space } from '@edadma/bloomui'

const App: React.FC = () => (
  <Space size="lg">
    <Fieldset className="border border-base-300 rounded-box p-4">
      <Fieldset.Legend>Account Details</Fieldset.Legend>
      <Space>
        <Input placeholder="Username" />
        <Input type="password" placeholder="Password" />
      </Space>
    </Fieldset>

    <Fieldset className="border border-base-300 rounded-box p-4">
      <Fieldset.Legend>Notifications</Fieldset.Legend>
      <Space size="xs">
        <div className="flex items-center gap-2">
          <Checkbox />
          <span>Email notifications</span>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox />
          <span>SMS notifications</span>
        </div>
      </Space>
    </Fieldset>
  </Space>
)

export default App`}
        >
          <Space size="lg">
            <Fieldset className="border border-base-300 rounded-box p-4">
              <Fieldset.Legend>Account Details</Fieldset.Legend>
              <Space>
                <Input placeholder="Username" />
                <Input type="password" placeholder="Password" />
              </Space>
            </Fieldset>

            <Fieldset className="border border-base-300 rounded-box p-4">
              <Fieldset.Legend>Notifications</Fieldset.Legend>
              <Space size="xs">
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <span>Email notifications</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <span>SMS notifications</span>
                </div>
              </Space>
            </Fieldset>
          </Space>
        </ExampleSection>

        <ExampleSection
          title="Disabled Fieldset"
          description="Disable all controls within a fieldset."
          code={`import React from 'react'
import { Fieldset, Input, Button, Space } from '@edadma/bloomui'

const App: React.FC = () => (
  <Fieldset disabled className="border border-base-300 rounded-box p-4">
    <Fieldset.Legend>Disabled Section</Fieldset.Legend>
    <Space>
      <Input placeholder="This is disabled" />
      <Input placeholder="This too" />
      <Button type="primary">Can't click me</Button>
    </Space>
  </Fieldset>
)

export default App`}
        >
          <Fieldset disabled className="border border-base-300 rounded-box p-4">
            <Fieldset.Legend>Disabled Section</Fieldset.Legend>
            <Space>
              <Input placeholder="This is disabled" />
              <Input placeholder="This too" />
              <Button type="primary">Can't click me</Button>
            </Space>
          </Fieldset>
        </ExampleSection>

        <ExampleSection
          title="In Form"
          description="Using Fieldset with Form component."
          code={`import React from 'react'
import { Form, Fieldset, Input, Select, Button } from '@edadma/bloomui'

const App: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Fieldset className="border border-base-300 rounded-box p-4 mb-4">
        <Fieldset.Legend>Shipping Address</Fieldset.Legend>
        <Space>
          <Form.Item name="address" label="Street Address" required>
            <Input />
          </Form.Item>
          <Form.Item name="city" label="City" required>
            <Input />
          </Form.Item>
          <Form.Item name="country" label="Country" required>
            <Select>
              <option value="">Select country</option>
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="uk">United Kingdom</option>
            </Select>
          </Form.Item>
        </Space>
      </Fieldset>

      <Form.Item>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default App`}
        >
          <Form onFinish={handleSubmit}>
            <Fieldset className="border border-base-300 rounded-box p-4 mb-4">
              <Fieldset.Legend>Shipping Address</Fieldset.Legend>
              <Space>
                <Form.Item name="address" label="Street Address" required>
                  <Input />
                </Form.Item>
                <Form.Item name="city" label="City" required>
                  <Input />
                </Form.Item>
                <Form.Item name="country" label="Country" required>
                  <Select>
                    <option value="">Select country</option>
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    <option value="uk">United Kingdom</option>
                  </Select>
                </Form.Item>
              </Space>
            </Fieldset>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Fieldset" data={fieldsetApi} />

        <ApiTable title="Fieldset.Legend" data={fieldsetLegendApi} className="mt-8" />
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
