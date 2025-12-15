import React, { useState } from 'react'
import { Toggle, Form, Button, Space } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <Toggle />
    </Demo>
  )
}

export function SizesDemo() {
  return (
    <Demo>
      <Space>
        <Toggle size="xs" defaultChecked />
        <Toggle size="sm" defaultChecked />
        <Toggle size="md" defaultChecked />
        <Toggle size="lg" defaultChecked />
      </Space>
    </Demo>
  )
}

export function ColorsDemo() {
  return (
    <Demo>
      <Space>
        <Toggle color="primary" defaultChecked />
        <Toggle color="secondary" defaultChecked />
        <Toggle color="accent" defaultChecked />
        <Toggle color="info" defaultChecked />
        <Toggle color="success" defaultChecked />
        <Toggle color="warning" defaultChecked />
        <Toggle color="error" defaultChecked />
      </Space>
    </Demo>
  )
}

export function DisabledDemo() {
  return (
    <Demo>
      <Space>
        <Toggle disabled />
        <Toggle disabled defaultChecked />
      </Space>
    </Demo>
  )
}

export function ControlledDemo() {
  const [checked, setChecked] = useState(false)

  return (
    <Demo>
      <div className="flex items-center gap-4">
        <Toggle checked={checked} onChange={(e) => setChecked(e.target.checked)} color="primary" />
        <span>Toggle is {checked ? 'ON' : 'OFF'}</span>
      </div>
    </Demo>
  )
}

export function FormDemo() {
  const handleSubmit = (values: Record<string, unknown>) => {
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <Demo>
      <Form onFinish={handleSubmit} className="max-w-md">
        <Form.Item name="notifications" label="Enable notifications" valuePropName="checked">
          <Toggle color="primary" />
        </Form.Item>

        <Form.Item name="darkMode" label="Dark mode" valuePropName="checked">
          <Toggle color="secondary" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" color="primary">
            Save Settings
          </Button>
        </Form.Item>
      </Form>
    </Demo>
  )
}
