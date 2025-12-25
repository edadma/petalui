import { useState } from 'react'
import { Button, Card, DateOfBirth, Form, Modal, Space, Typography } from '@aster-ui/prefixed'
import { Demo } from './Demo'

const { Text } = Typography

// @example-imports: { DateOfBirth, Card, Space, Typography } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Card>
        <Space direction="vertical" size="sm">
          <Text type="secondary">Default (MDY, 120 years)</Text>
          <DateOfBirth />
        </Space>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { DateOfBirth, Card, Space, Typography } from 'asterui'
export function OrderDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Card className="w-full max-w-xl">
        <Space direction="vertical" size="sm">
          <Text type="secondary">DD/MM/YYYY order</Text>
          <DateOfBirth order="dmy" />
        </Space>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { DateOfBirth, Card, Space, Typography } from 'asterui'
export function MonthGridDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Card className="w-full max-w-xl">
        <Space direction="vertical" size="sm">
          <Text type="secondary">Month grid + compact day/year</Text>
          <DateOfBirth monthStyle="grid" yearStyle="select" />
        </Space>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { DateOfBirth, Card, Space, Typography } from 'asterui'
export function YearInputDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Card className="w-full max-w-xl">
        <Space direction="vertical" size="sm">
          <Text type="secondary">Year input + custom age rules</Text>
          <DateOfBirth yearStyle="input" minAge={18} yearSpan={90} />
        </Space>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { DateOfBirth, Card, Space, Typography } from 'asterui'
export function ControlledDemo() {
  // @example-include
  const [value, setValue] = useState({ month: '1', day: '15', year: '1995' })
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Card className="w-full max-w-xl">
        <Space direction="vertical" size="sm">
          <Text type="secondary">Controlled value</Text>
          <DateOfBirth value={value} onChange={setValue} />
          <Text type="secondary" className="text-xs">
            {JSON.stringify(value)}
          </Text>
        </Space>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { DateOfBirth, Card, Space, Typography, Form, Button, Modal } from 'asterui'
export function FormDemo() {
  const form = Form.useForm<{ dob?: { month?: string; day?: string; year?: string } }>()

  const handleFinish = (values: { dob?: { month?: string; day?: string; year?: string } }) => {
    const dob = values.dob ?? {}
    Modal.info({
      title: 'Date of birth',
      content: (
        <div className="text-sm space-y-1">
          <div>Month: {dob.month || '—'}</div>
          <div>Day: {dob.day || '—'}</div>
          <div>Year: {dob.year || '—'}</div>
        </div>
      ),
    })
  }

  return (
    <Demo>
      {/* @example-return */}
      <Card className="w-full max-w-xl">
        <Space direction="vertical" size="sm">
          <Text type="secondary">Form integration</Text>
          <Form
            form={form}
            onFinish={handleFinish}
          >
            <Form.Item
              name="dob"
              rules={[{
                validate: (value) => (
                  value?.month && value?.day && value?.year
                    ? true
                    : 'Please select a complete date of birth.'
                ),
              }]}
            >
              <DateOfBirth />
            </Form.Item>
            <Button htmlType="submit">Submit</Button>
          </Form>
        </Space>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}
