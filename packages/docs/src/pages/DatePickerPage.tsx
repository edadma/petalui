import { useState } from 'react'
import { DatePicker, Form, Button, Modal } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const datePickerApi: ApiProperty[] = [
  {
    property: 'value',
    description: 'Controlled selected date',
    type: 'Date',
  },
  {
    property: 'defaultValue',
    description: 'Default selected date (uncontrolled)',
    type: 'Date',
  },
  {
    property: 'onChange',
    description: 'Callback when date is selected',
    type: '(date: Date | null) => void',
  },
  {
    property: 'format',
    description: 'Date display format',
    type: 'string',
    default: '"MM/DD/YYYY"',
  },
  {
    property: 'placeholder',
    description: 'Input placeholder text',
    type: 'string',
    default: '"Select date"',
  },
  {
    property: 'disabled',
    description: 'Disable the date picker',
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
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function DatePickerPage() {
  const [date1, setDate1] = useState<Date | null>(null)
  const [date2, setDate2] = useState<Date | null>(new Date())
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
        <h1 className="text-4xl font-bold mb-2">DatePicker</h1>
        <p className="text-base-content/70">
          Select dates with an interactive calendar picker.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic DatePicker"
          description="Simple date picker with default settings."
          code={`import React from 'react'
import { DatePicker } from '@edadma/petalui'

const App: React.FC = () => (
  <DatePicker placeholder="Select date" />
)

export default App`}
        >
          <DatePicker placeholder="Select date" />
        </ExampleSection>

        <ExampleSection
          title="With Default Value"
          description="DatePicker with a pre-selected date."
          code={`import React from 'react'
import { DatePicker } from '@edadma/petalui'

const App: React.FC = () => (
  <DatePicker defaultValue={new Date()} />
)

export default App`}
        >
          <DatePicker defaultValue={new Date()} />
        </ExampleSection>

        <ExampleSection
          title="Controlled"
          description="Controlled date picker with state management."
          code={`import React, { useState } from 'react'
import { DatePicker } from '@edadma/petalui'

const App: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <div>
      <DatePicker value={date} onChange={setDate} />
      <p className="mt-2 text-sm">
        Selected: {date ? date.toLocaleDateString() : 'None'}
      </p>
    </div>
  )
}

export default App`}
        >
          <div>
            <DatePicker value={date1} onChange={setDate1} />
            <p className="mt-2 text-sm text-base-content/70">
              Selected: {date1 ? date1.toLocaleDateString() : 'None'}
            </p>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Custom Format"
          description="DatePicker with custom date format."
          code={`import React, { useState } from 'react'
import { DatePicker } from '@edadma/petalui'

const App: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date())

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      format="YYYY-MM-DD"
    />
  )
}

export default App`}
        >
          <DatePicker
            value={date2}
            onChange={setDate2}
            format="YYYY-MM-DD"
          />
        </ExampleSection>

        <ExampleSection
          title="Different Sizes"
          description="DatePicker in various sizes."
          code={`import React from 'react'
import { DatePicker } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-4">
    <DatePicker size="xs" placeholder="Extra small" />
    <DatePicker size="sm" placeholder="Small" />
    <DatePicker size="md" placeholder="Medium" />
    <DatePicker size="lg" placeholder="Large" />
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-4">
            <DatePicker size="xs" placeholder="Extra small" />
            <DatePicker size="sm" placeholder="Small" />
            <DatePicker size="md" placeholder="Medium" />
            <DatePicker size="lg" placeholder="Large" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description="Disabled date picker."
          code={`import React from 'react'
import { DatePicker } from '@edadma/petalui'

const App: React.FC = () => (
  <DatePicker disabled defaultValue={new Date()} />
)

export default App`}
        >
          <DatePicker disabled defaultValue={new Date()} />
        </ExampleSection>

        <ExampleSection
          title="In Form"
          description="DatePicker integrated with Form component."
          code={`import React from 'react'
import { DatePicker, Form, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="birthDate"
        label="Birth Date"
        required
        rules={{
          required: 'Please select your birth date',
        }}
      >
        <DatePicker placeholder="MM/DD/YYYY" />
      </Form.Item>

      <Form.Item
        name="appointmentDate"
        label="Appointment Date"
      >
        <DatePicker format="YYYY-MM-DD" />
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
              name="birthDate"
              label="Birth Date"
              required
              rules={{
                required: 'Please select your birth date',
              }}
            >
              <DatePicker placeholder="MM/DD/YYYY" />
            </Form.Item>

            <Form.Item
              name="appointmentDate"
              label="Appointment Date"
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </ExampleSection>

        <ExampleSection
          title="Date Range Selection"
          description="Two date pickers for selecting a date range."
          code={`import React, { useState } from 'react'
import { DatePicker } from '@edadma/petalui'

const App: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  return (
    <div className="flex gap-4">
      <div>
        <label className="label">
          <span className="label-text">Start Date</span>
        </label>
        <DatePicker
          value={startDate}
          onChange={setStartDate}
          placeholder="Start date"
        />
      </div>
      <div>
        <label className="label">
          <span className="label-text">End Date</span>
        </label>
        <DatePicker
          value={endDate}
          onChange={setEndDate}
          placeholder="End date"
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
                <span className="label-text">Start Date</span>
              </label>
              <DatePicker placeholder="Start date" />
            </div>
            <div>
              <label className="label">
                <span className="label-text">End Date</span>
              </label>
              <DatePicker placeholder="End date" />
            </div>
          </div>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="DatePicker" data={datePickerApi} />
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
