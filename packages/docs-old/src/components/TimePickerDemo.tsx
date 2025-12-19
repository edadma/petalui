import { useState } from 'react'
import { TimePicker, Form, Button, Space, Typography, Row, Col, notification } from '@aster-ui/prefixed'
import { Demo } from './Demo'

const { Text } = Typography

// @example-imports: { TimePicker } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <TimePicker placeholder="Select time" />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { TimePicker } from 'asterui'
export function TwelveHourDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <TimePicker format="12" placeholder="Select time" />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { TimePicker } from 'asterui'
export function SecondsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <TimePicker showSeconds placeholder="Select time" />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { TimePicker, Space, Typography } from 'asterui'
// @example-imports: { useState } from 'react'
export function ControlledDemo() {
  // @example-include
  const [time, setTime] = useState<Date | null>(null)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical">
        <TimePicker value={time} onChange={setTime} />
        <Typography.Text size="sm" muted>
          Selected: {time ? time.toLocaleTimeString() : 'None'}
        </Typography.Text>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { TimePicker, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical">
        <TimePicker size="xs" placeholder="Extra small" />
        <TimePicker size="sm" placeholder="Small" />
        <TimePicker size="md" placeholder="Medium" />
        <TimePicker size="lg" placeholder="Large" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { TimePicker } from 'asterui'
export function DisabledDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <TimePicker disabled defaultValue={new Date()} />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { TimePicker } from 'asterui'
export function StepsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <TimePicker minuteStep={15} placeholder="Select time (15 min intervals)" />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { TimePicker, Form, Button, Row, Col, notification } from 'asterui'
export function FormDemo() {
  // @example-include
  const handleSubmit = (values: Record<string, unknown>) => {
    const startTime = values.startTime as Date | null
    const endTime = values.endTime as Date | null
    notification.success({
      message: 'Form Submitted',
      description: `Start: ${startTime?.toLocaleTimeString() || 'Not set'}, End: ${endTime?.toLocaleTimeString() || 'Not set'}`,
    })
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Form onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="startTime" label="Start Time" rules={{ required: 'Please select start time' }}>
              <TimePicker placeholder="Start" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="endTime" label="End Time">
              <TimePicker placeholder="End" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button htmlType="submit" color="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* @example-return-end */}
    </Demo>
  )
}
