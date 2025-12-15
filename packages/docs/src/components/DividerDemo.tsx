import { Divider, Space } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <div>
        <p>Content above the divider</p>
        <Divider />
        <p>Content below the divider</p>
      </div>
    </Demo>
  )
}

export function WithTextDemo() {
  return (
    <Demo>
      <div>
        <p>Section 1 content</p>
        <Divider>OR</Divider>
        <p>Section 2 content</p>
      </div>
    </Demo>
  )
}

export function PositionDemo() {
  return (
    <Demo>
      <Space direction="vertical" size="md" className="w-full">
        <Divider position="start">Start</Divider>
        <Divider position="center">Center</Divider>
        <Divider position="end">End</Divider>
      </Space>
    </Demo>
  )
}

export function VerticalDemo() {
  return (
    <Demo>
      <div className="flex items-center h-8">
        <span>Home</span>
        <Divider orientation="vertical" />
        <span>Products</span>
        <Divider orientation="vertical" />
        <span>About</span>
      </div>
    </Demo>
  )
}

export function ColorsDemo() {
  return (
    <Demo>
      <Space direction="vertical" size="md" className="w-full">
        <Divider type="primary">Primary</Divider>
        <Divider type="secondary">Secondary</Divider>
        <Divider type="accent">Accent</Divider>
      </Space>
    </Demo>
  )
}
