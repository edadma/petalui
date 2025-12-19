import { Divider, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Divider } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div>
        <p>Content above the divider</p>
        <Divider />
        <p>Content below the divider</p>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Divider } from 'asterui'
export function WithTextDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div>
        <p>Section 1 content</p>
        <Divider>OR</Divider>
        <p>Section 2 content</p>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Divider, Space } from 'asterui'
export function PositionDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="md" className="w-full">
        <Divider position="start">Start</Divider>
        <Divider position="center">Center</Divider>
        <Divider position="end">End</Divider>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Divider } from 'asterui'
export function VerticalDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="flex items-center h-8">
        <span>Home</span>
        <Divider orientation="vertical" />
        <span>Products</span>
        <Divider orientation="vertical" />
        <span>About</span>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Divider, Space } from 'asterui'
export function ColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="md" className="w-full">
        <Divider type="primary">Primary</Divider>
        <Divider type="secondary">Secondary</Divider>
        <Divider type="accent">Accent</Divider>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}
