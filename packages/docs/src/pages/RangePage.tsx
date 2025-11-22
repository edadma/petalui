import { useState } from 'react'
import { Range, Form, Button, Modal } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const rangeApi: ApiProperty[] = [
  {
    property: 'value',
    description: 'Controlled value',
    type: 'number',
  },
  {
    property: 'defaultValue',
    description: 'Default value (uncontrolled)',
    type: 'number',
    default: '50',
  },
  {
    property: 'onChange',
    description: 'Callback when value changes',
    type: '(value: number) => void',
  },
  {
    property: 'min',
    description: 'Minimum value',
    type: 'number',
    default: '0',
  },
  {
    property: 'max',
    description: 'Maximum value',
    type: 'number',
    default: '100',
  },
  {
    property: 'step',
    description: 'Step increment',
    type: 'number',
    default: '1',
  },
  {
    property: 'size',
    description: 'Range size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
  },
  {
    property: 'color',
    description: 'Range color theme',
    type: "'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error'",
  },
  {
    property: 'disabled',
    description: 'Disable the range input',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'showValue',
    description: 'Show current value below the range',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'showSteps',
    description: 'Show step markers below the range',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function RangePage() {
  const [value1, setValue1] = useState(50)
  const [value2, setValue2] = useState(75)
  const [volumeValue, setVolumeValue] = useState(50)
  const [submittedData, setSubmittedData] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (values: any) => {
    console.log('Form values:', values)
    setSubmittedData(values)
    setIsModalOpen(true)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Range</h1>
        <p className="text-base-content/70">
          Select numeric values using an interactive slider.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Range"
          description="Simple range slider with default settings."
          code={`import React from 'react'
import { Range } from '@edadma/petalui'

const App: React.FC = () => (
  <Range />
)

export default App`}
        >
          <Range />
        </ExampleSection>

        <ExampleSection
          title="With Value Display"
          description="Range slider showing the current value."
          code={`import React from 'react'
import { Range } from '@edadma/petalui'

const App: React.FC = () => (
  <Range showValue />
)

export default App`}
        >
          <Range showValue />
        </ExampleSection>

        <ExampleSection
          title="With Steps"
          description="Range slider with visible step markers."
          code={`import React from 'react'
import { Range } from '@edadma/petalui'

const App: React.FC = () => (
  <Range showSteps step={10} />
)

export default App`}
        >
          <Range showSteps step={10} />
        </ExampleSection>

        <ExampleSection
          title="Controlled"
          description="Controlled range slider with state management."
          code={`import React, { useState } from 'react'
import { Range } from '@edadma/petalui'

const App: React.FC = () => {
  const [value, setValue] = useState(50)

  return (
    <div>
      <Range value={value} onChange={setValue} showValue />
      <p className="mt-2 text-sm">Value: {value}</p>
    </div>
  )
}

export default App`}
        >
          <div>
            <Range value={value1} onChange={setValue1} showValue />
            <p className="mt-2 text-sm text-base-content/70">Value: {value1}</p>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Custom Range"
          description="Range slider with custom min, max, and step values."
          code={`import React from 'react'
import { Range } from '@edadma/petalui'

const App: React.FC = () => (
  <Range min={0} max={10} step={0.5} defaultValue={5} showValue />
)

export default App`}
        >
          <Range min={0} max={10} step={0.5} defaultValue={5} showValue />
        </ExampleSection>

        <ExampleSection
          title="Different Colors"
          description="Range sliders in various theme colors."
          code={`import React from 'react'
import { Range } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-4">
    <Range color="primary" defaultValue={25} />
    <Range color="secondary" defaultValue={35} />
    <Range color="accent" defaultValue={45} />
    <Range color="success" defaultValue={55} />
    <Range color="warning" defaultValue={65} />
    <Range color="info" defaultValue={75} />
    <Range color="error" defaultValue={85} />
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-4">
            <Range color="primary" defaultValue={25} />
            <Range color="secondary" defaultValue={35} />
            <Range color="accent" defaultValue={45} />
            <Range color="success" defaultValue={55} />
            <Range color="warning" defaultValue={65} />
            <Range color="info" defaultValue={75} />
            <Range color="error" defaultValue={85} />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Different Sizes"
          description="Range sliders in various sizes."
          code={`import React from 'react'
import { Range } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-6">
    <Range size="xs" defaultValue={25} />
    <Range size="sm" defaultValue={50} />
    <Range size="md" defaultValue={75} />
    <Range size="lg" defaultValue={90} />
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-6">
            <Range size="xs" defaultValue={25} />
            <Range size="sm" defaultValue={50} />
            <Range size="md" defaultValue={75} />
            <Range size="lg" defaultValue={90} />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description="Disabled range slider."
          code={`import React from 'react'
import { Range } from '@edadma/petalui'

const App: React.FC = () => (
  <Range disabled defaultValue={60} />
)

export default App`}
        >
          <Range disabled defaultValue={60} />
        </ExampleSection>

        <ExampleSection
          title="Volume Control Example"
          description="Real-world example of a volume control."
          code={`import React, { useState } from 'react'
import { Range } from '@edadma/petalui'

const App: React.FC = () => {
  const [volume, setVolume] = useState(50)

  return (
    <div className="p-4 border border-base-300 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-2xl">
          {volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊'}
        </span>
        <Range
          value={volume}
          onChange={setVolume}
          color="primary"
          className="flex-1"
        />
        <span className="text-sm font-medium w-12 text-right">
          {volume}%
        </span>
      </div>
    </div>
  )
}

export default App`}
        >
          <div className="p-4 border border-base-300 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {volumeValue === 0 ? '🔇' : volumeValue < 50 ? '🔉' : '🔊'}
              </span>
              <Range
                value={volumeValue}
                onChange={setVolumeValue}
                color="primary"
                className="flex-1"
              />
              <span className="text-sm font-medium w-12 text-right">
                {volumeValue}%
              </span>
            </div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="In Form"
          description="Range slider integrated with Form component."
          code={`import React from 'react'
import { Range, Form, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <Form onFinish={handleSubmit} initialValues={{ volume: 50, brightness: 75 }}>
      <Form.Item name="volume" label="Volume">
        <Range showValue color="primary" />
      </Form.Item>

      <Form.Item name="brightness" label="Brightness">
        <Range showValue color="warning" />
      </Form.Item>

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
          <Form onFinish={handleSubmit} initialValues={{ volume: 50, brightness: 75 }}>
            <Form.Item name="volume" label="Volume">
              <Range showValue color="primary" />
            </Form.Item>

            <Form.Item name="brightness" label="Brightness">
              <Range showValue color="warning" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </ExampleSection>

        <ExampleSection
          title="Price Range"
          description="Example of a price range selector."
          code={`import React, { useState } from 'react'
import { Range } from '@edadma/petalui'

const App: React.FC = () => {
  const [value1, setValue1] = useState(100)
  const [value2, setValue2] = useState(500)

  return (
    <div className="space-y-4">
      <div>
        <label className="label">
          <span className="label-text">Min Price: ${value1}</span>
        </label>
        <Range
          value={value1}
          onChange={setValue1}
          min={0}
          max={1000}
          step={50}
          color="success"
        />
      </div>
      <div>
        <label className="label">
          <span className="label-text">Max Price: ${value2}</span>
        </label>
        <Range
          value={value2}
          onChange={setValue2}
          min={0}
          max={1000}
          step={50}
          color="success"
        />
      </div>
    </div>
  )
}

export default App`}
        >
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Min Price: ${value1}</span>
              </label>
              <Range
                value={value1}
                onChange={setValue1}
                min={0}
                max={1000}
                step={50}
                color="success"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Max Price: ${value2}</span>
              </label>
              <Range
                value={value2}
                onChange={setValue2}
                min={0}
                max={1000}
                step={50}
                color="success"
              />
            </div>
          </div>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Range" data={rangeApi} />
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
