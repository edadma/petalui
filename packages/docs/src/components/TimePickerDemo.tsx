import { useState } from 'react'
import { TimePicker, Form, Button, Space, Typography, Row, Col, notification } from 'asterui'
import { Demo } from './Demo'

const { Text } = Typography

export function BasicDemo() {
  return (
    <Demo>
      <TimePicker placeholder="Select time" />
    </Demo>
  )
}

export function TwelveHourDemo() {
  return (
    <Demo>
      <TimePicker format="12" placeholder="Select time" />
    </Demo>
  )
}

export function SecondsDemo() {
  return (
    <Demo>
      <TimePicker showSeconds placeholder="Select time" />
    </Demo>
  )
}

export function ControlledDemo() {
  const [time, setTime] = useState<Date | null>(null)

  return (
    <Demo>
      <Space direction="vertical">
        <TimePicker value={time} onChange={setTime} />
        <Text size="sm" muted>
          Selected: {time ? time.toLocaleTimeString() : 'None'}
        </Text>
      </Space>
    </Demo>
  )
}

export function SizesDemo() {
  return (
    <Demo>
      <Space direction="vertical">
        <TimePicker size="xs" placeholder="Extra small" />
        <TimePicker size="sm" placeholder="Small" />
        <TimePicker size="md" placeholder="Medium" />
        <TimePicker size="lg" placeholder="Large" />
      </Space>
    </Demo>
  )
}

export function DisabledDemo() {
  return (
    <Demo>
      <TimePicker disabled defaultValue={new Date()} />
    </Demo>
  )
}

export function StepsDemo() {
  return (
    <Demo>
      <TimePicker minuteStep={15} placeholder="Select time (15 min intervals)" />
    </Demo>
  )
}

export function FormDemo() {
  const handleSubmit = (values: Record<string, unknown>) => {
    const startTime = values.startTime as Date | null
    const endTime = values.endTime as Date | null
    notification.success({
      message: 'Form Submitted',
      description: `Start: ${startTime?.toLocaleTimeString() || 'Not set'}, End: ${endTime?.toLocaleTimeString() || 'Not set'}`,
    })
  }

  return (
    <Demo>
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
    </Demo>
  )
}
