import React, { useState } from 'react'
import { Toggle, Form, Button, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Toggle } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Toggle />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Toggle, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space>
        <Toggle size="xs" defaultChecked />
        <Toggle size="sm" defaultChecked />
        <Toggle size="md" defaultChecked />
        <Toggle size="lg" defaultChecked />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Toggle, Space } from 'asterui'
export function ColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space>
        <Toggle color="primary" defaultChecked />
        <Toggle color="secondary" defaultChecked />
        <Toggle color="accent" defaultChecked />
        <Toggle color="info" defaultChecked />
        <Toggle color="success" defaultChecked />
        <Toggle color="warning" defaultChecked />
        <Toggle color="error" defaultChecked />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Toggle, Space } from 'asterui'
export function DisabledDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space>
        <Toggle disabled />
        <Toggle disabled defaultChecked />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Toggle } from 'asterui'
// @example-imports: { useState } from 'react'
export function ControlledDemo() {
  // @example-include
  const [checked, setChecked] = useState(false)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div className="flex items-center gap-4">
        <Toggle checked={checked} onChange={(e) => setChecked(e.target.checked)} color="primary" />
        <span>Toggle is {checked ? 'ON' : 'OFF'}</span>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Toggle, Form, Button } from 'asterui'
export function FormDemo() {
  // @example-include
  const handleSubmit = (values: Record<string, unknown>) => {
    alert(JSON.stringify(values, null, 2))
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}
