import { useState } from 'react'
import { FileInput, Fieldset, Form, Modal } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const fileInputApi: ApiProperty[] = [
  {
    property: 'size',
    description: 'File input size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
  },
  {
    property: 'color',
    description: 'File input color variant',
    type: "'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'",
  },
  {
    property: 'ghost',
    description: 'Minimal ghost style',
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
    description: 'Disable file selection',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function FileInputPage() {
  const [submittedData, setSubmittedData] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (values: { file?: FileList }) => {
    if (values.file && values.file.length > 0) {
      setSubmittedData({ fileName: values.file[0].name, fileSize: values.file[0].size })
      setIsModalOpen(true)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">File Input</h1>
        <p className="text-base-content/70">
          Styled file input for uploading files.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic File Input"
          description="Standard file input."
          code={`import React from 'react'
import { FileInput } from '@edadma/petalui'

const App: React.FC = () => (
  <FileInput />
)

export default App`}
        >
          <FileInput />
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description="Different input sizes from xs to xl."
          code={`import React from 'react'
import { FileInput } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-4">
    <FileInput size="xs" />
    <FileInput size="sm" />
    <FileInput size="md" />
    <FileInput size="lg" />
    <FileInput size="xl" />
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-4">
            <FileInput size="xs" />
            <FileInput size="sm" />
            <FileInput size="md" />
            <FileInput size="lg" />
            <FileInput size="xl" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Colors"
          description="Colored file input variants."
          code={`import React from 'react'
import { FileInput } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-4">
    <FileInput color="primary" />
    <FileInput color="secondary" />
    <FileInput color="accent" />
    <FileInput color="info" />
    <FileInput color="success" />
    <FileInput color="warning" />
    <FileInput color="error" />
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-4">
            <FileInput color="primary" />
            <FileInput color="secondary" />
            <FileInput color="accent" />
            <FileInput color="info" />
            <FileInput color="success" />
            <FileInput color="warning" />
            <FileInput color="error" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Ghost Style"
          description="Minimal styling with ghost variant."
          code={`import React from 'react'
import { FileInput } from '@edadma/petalui'

const App: React.FC = () => (
  <FileInput ghost />
)

export default App`}
        >
          <FileInput ghost />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description="Disabled file input."
          code={`import React from 'react'
import { FileInput } from '@edadma/petalui'

const App: React.FC = () => (
  <FileInput disabled />
)

export default App`}
        >
          <FileInput disabled />
        </ExampleSection>

        <ExampleSection
          title="With Fieldset"
          description="File input within a fieldset with helper text."
          code={`import React from 'react'
import { FileInput, Fieldset } from '@edadma/petalui'

const App: React.FC = () => (
  <Fieldset>
    <Fieldset.Legend>Pick a file</Fieldset.Legend>
    <FileInput />
    <span className="label text-xs opacity-70">Max size 2MB</span>
  </Fieldset>
)

export default App`}
        >
          <Fieldset>
            <Fieldset.Legend>Pick a file</Fieldset.Legend>
            <FileInput />
            <span className="label text-xs opacity-70">Max size 2MB</span>
          </Fieldset>
        </ExampleSection>

        <ExampleSection
          title="In Form"
          description="File input in a form with validation."
          code={`import React from 'react'
import { FileInput, Form, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const handleSubmit = (values: { file?: FileList }) => {
    console.log(values)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="file"
        label="Upload file"
        rules={{ required: 'Please select a file' }}
      >
        <FileInput />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  )
}

export default App`}
        >
          <Form onFinish={handleSubmit}>
            <Form.Item
              name="file"
              label="Upload file"
              rules={{ required: 'Please select a file' }}
            >
              <FileInput />
            </Form.Item>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Form>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="FileInput" data={fileInputApi} />
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
