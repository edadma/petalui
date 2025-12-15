import { useState } from 'react'
import { DatePicker, Space } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <DatePicker placeholder="Select date" />
    </Demo>
  )
}

export function ControlledDemo() {
  const [date, setDate] = useState<Date | null>(null)
  return (
    <Demo>
      <Space direction="vertical" size="sm">
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Select date"
        />
        <p className="text-sm text-base-content/70">
          Selected: {date ? date.toLocaleDateString() : 'None'}
        </p>
      </Space>
    </Demo>
  )
}

export function DefaultValueDemo() {
  return (
    <Demo>
      <DatePicker
        defaultValue={new Date()}
        placeholder="Select date"
      />
    </Demo>
  )
}

export function FormatDemo() {
  return (
    <Demo>
      <Space direction="vertical" size="sm">
        <DatePicker placeholder="MM/DD/YYYY (default)" format="MM/DD/YYYY" />
        <DatePicker placeholder="DD/MM/YYYY" format="DD/MM/YYYY" />
        <DatePicker placeholder="YYYY-MM-DD" format="YYYY-MM-DD" />
      </Space>
    </Demo>
  )
}

export function SizesDemo() {
  return (
    <Demo>
      <Space direction="vertical" size="sm">
        <DatePicker size="xs" placeholder="Extra small" />
        <DatePicker size="sm" placeholder="Small" />
        <DatePicker size="md" placeholder="Medium" />
        <DatePicker size="lg" placeholder="Large" />
      </Space>
    </Demo>
  )
}

export function DisabledDemo() {
  return (
    <Demo>
      <DatePicker disabled placeholder="Disabled" />
    </Demo>
  )
}
