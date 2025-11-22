import { useState } from 'react'
import { TimePicker, Form, Button, Modal } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const timePickerApi: ApiProperty[] = [
  {
    property: 'value',
    description: 'Controlled selected time',
    type: 'Date',
  },
  {
    property: 'defaultValue',
    description: 'Default selected time (uncontrolled)',
    type: 'Date',
  },
  {
    property: 'onChange',
    description: 'Callback when time is selected',
    type: '(date: Date | null) => void',
  },
  {
    property: 'format',
    description: 'Time display format',
    type: "'12' | '24'",
    default: "'24'",
  },
  {
    property: 'placeholder',
    description: 'Input placeholder text',
    type: 'string',
    default: '"Select time"',
  },
  {
    property: 'disabled',
    description: 'Disable the time picker',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'size',
    description: 'Input size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
  },
  {
    property: 'showSeconds',
    description: 'Show seconds in the time picker',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function TimePickerPage() {
  const [time1, setTime1] = useState<Date | null>(null)
  const [time2, setTime2] = useState<Date | null>(null)
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
        <h1 className="text-4xl font-bold mb-2">TimePicker</h1>
        <p className="text-base-content/70">
          Select time with an interactive picker interface.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic TimePicker"
          description="Simple time picker with default 24-hour format."
          code={`import React from 'react'
import { TimePicker } from '@edadma/petalui'

const App: React.FC = () => (
  <TimePicker placeholder="Select time" />
)

export default App`}
        >
          <TimePicker placeholder="Select time" />
        </ExampleSection>

        <ExampleSection
          title="12-Hour Format"
          description="Time picker with 12-hour format and AM/PM selection."
          code={`import React from 'react'
import { TimePicker } from '@edadma/petalui'

const App: React.FC = () => (
  <TimePicker format="12" placeholder="Select time" />
)

export default App`}
        >
          <TimePicker format="12" placeholder="Select time" />
        </ExampleSection>

        <ExampleSection
          title="With Seconds"
          description="Time picker that includes seconds selection."
          code={`import React from 'react'
import { TimePicker } from '@edadma/petalui'

const App: React.FC = () => (
  <TimePicker showSeconds placeholder="Select time" />
)

export default App`}
        >
          <TimePicker showSeconds placeholder="Select time" />
        </ExampleSection>

        <ExampleSection
          title="Controlled"
          description="Controlled time picker with state management."
          code={`import React, { useState } from 'react'
import { TimePicker } from '@edadma/petalui'

const App: React.FC = () => {
  const [time, setTime] = useState<Date | null>(null)

  return (
    <div>
      <TimePicker value={time} onChange={setTime} />
      <p className="mt-2 text-sm">
        Selected: {time ? time.toLocaleTimeString() : 'None'}
      </p>
    </div>
  )
}

export default App`}
        >
          <div>
            <TimePicker value={time1} onChange={setTime1} />
            <p className="mt-2 text-sm text-base-content/70">
              Selected: {time1 ? time1.toLocaleTimeString() : 'None'}
            </p>
          </div>
        </ExampleSection>

        <ExampleSection
          title="12-Hour with Seconds"
          description="Time picker with 12-hour format including seconds."
          code={`import React from 'react'
import { TimePicker } from '@edadma/petalui'

const App: React.FC = () => (
  <TimePicker format="12" showSeconds placeholder="Select time" />
)

export default App`}
        >
          <TimePicker format="12" showSeconds placeholder="Select time" />
        </ExampleSection>

        <ExampleSection
          title="Different Sizes"
          description="Time picker in various sizes."
          code={`import React from 'react'
import { TimePicker } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-4">
    <TimePicker size="xs" placeholder="Extra small" />
    <TimePicker size="sm" placeholder="Small" />
    <TimePicker size="md" placeholder="Medium" />
    <TimePicker size="lg" placeholder="Large" />
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-4">
            <TimePicker size="xs" placeholder="Extra small" />
            <TimePicker size="sm" placeholder="Small" />
            <TimePicker size="md" placeholder="Medium" />
            <TimePicker size="lg" placeholder="Large" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description="Disabled time picker."
          code={`import React from 'react'
import { TimePicker } from '@edadma/petalui'

const App: React.FC = () => (
  <TimePicker disabled defaultValue={new Date()} />
)

export default App`}
        >
          <TimePicker disabled defaultValue={new Date()} />
        </ExampleSection>

        <ExampleSection
          title="In Form"
          description="TimePicker integrated with Form component."
          code={`import React from 'react'
import { TimePicker, Form, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="startTime"
        label="Start Time"
        required
        rules={{
          required: 'Please select start time',
        }}
      >
        <TimePicker placeholder="HH:MM" />
      </Form.Item>

      <Form.Item
        name="endTime"
        label="End Time"
      >
        <TimePicker format="12" />
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
          <Form onFinish={handleSubmit}>
            <Form.Item
              name="startTime"
              label="Start Time"
              required
              rules={{
                required: 'Please select start time',
              }}
            >
              <TimePicker placeholder="HH:MM" />
            </Form.Item>

            <Form.Item
              name="endTime"
              label="End Time"
            >
              <TimePicker format="12" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </ExampleSection>

        <ExampleSection
          title="Time Range Selection"
          description="Two time pickers for selecting a time range."
          code={`import React, { useState } from 'react'
import { TimePicker } from '@edadma/petalui'

const App: React.FC = () => {
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)

  return (
    <div className="flex gap-4">
      <div>
        <label className="label">
          <span className="label-text">Start Time</span>
        </label>
        <TimePicker
          value={startTime}
          onChange={setStartTime}
          placeholder="Start time"
        />
      </div>
      <div>
        <label className="label">
          <span className="label-text">End Time</span>
        </label>
        <TimePicker
          value={endTime}
          onChange={setEndTime}
          placeholder="End time"
        />
      </div>
    </div>
  )
}

export default App`}
        >
          <div className="flex gap-4">
            <div>
              <label className="label">
                <span className="label-text">Start Time</span>
              </label>
              <TimePicker
                value={time1}
                onChange={setTime1}
                placeholder="Start time"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">End Time</span>
              </label>
              <TimePicker
                value={time2}
                onChange={setTime2}
                placeholder="End time"
              />
            </div>
          </div>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="TimePicker" data={timePickerApi} />
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
