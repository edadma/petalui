import { useState } from 'react'
import { DatePicker, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { DatePicker } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <DatePicker placeholder="Select date" />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { DatePicker, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function ControlledDemo() {
  // @example-include
  const [date, setDate] = useState<Date | null>(null)
  // @example-include-end
  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { DatePicker } from 'asterui'
export function DefaultValueDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <DatePicker
        defaultValue={new Date()}
        placeholder="Select date"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { DatePicker, Space } from 'asterui'
export function FormatDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <DatePicker placeholder="MM/DD/YYYY (default)" format="MM/DD/YYYY" />
        <DatePicker placeholder="DD/MM/YYYY" format="DD/MM/YYYY" />
        <DatePicker placeholder="YYYY-MM-DD" format="YYYY-MM-DD" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { DatePicker, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <DatePicker size="xs" placeholder="Extra small" />
        <DatePicker size="sm" placeholder="Small" />
        <DatePicker size="md" placeholder="Medium" />
        <DatePicker size="lg" placeholder="Large" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { DatePicker } from 'asterui'
export function DisabledDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <DatePicker disabled placeholder="Disabled" />
      {/* @example-return-end */}
    </Demo>
  )
}
