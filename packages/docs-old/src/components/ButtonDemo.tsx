import { useState } from 'react'
import { Button, Space, Input, Form, notification } from '@aster-ui/prefixed'
import { XMarkIcon, ArrowUpTrayIcon, CheckIcon, TrashIcon } from '@aster-ui/icons-prefixed'
import { Demo } from './Demo'

// @example-imports: { Button, Space } from 'asterui'
export function BrandColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="sm">
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="accent">Accent</Button>
        <Button color="neutral">Neutral</Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space } from 'asterui'
export function StateColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="sm">
        <Button color="info">Info</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="error">Error</Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space } from 'asterui'
export function VariantsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="sm">
        <Button color="primary">Solid</Button>
        <Button color="primary" variant="outline">Outline</Button>
        <Button color="primary" variant="dash">Dash</Button>
        <Button color="primary" variant="soft">Soft</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="sm" align="center">
        <Button size="xs">XS</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">XL</Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space } from 'asterui'
export function OutlineDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="sm">
        <Button color="primary" variant="outline">Primary</Button>
        <Button color="secondary" variant="outline">Secondary</Button>
        <Button color="accent" variant="outline">Accent</Button>
        <Button color="success" variant="outline">Success</Button>
        <Button color="error" variant="outline">Error</Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space } from 'asterui'
export function DashDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="sm">
        <Button color="primary" variant="dash">Primary</Button>
        <Button color="secondary" variant="dash">Secondary</Button>
        <Button color="accent" variant="dash">Accent</Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space } from 'asterui'
export function SoftDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="sm">
        <Button color="primary" variant="soft">Primary</Button>
        <Button color="secondary" variant="soft">Secondary</Button>
        <Button color="accent" variant="soft">Accent</Button>
        <Button color="success" variant="soft">Success</Button>
        <Button color="warning" variant="soft">Warning</Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space } from 'asterui'
export function StatesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="sm">
        <Button color="primary">Normal</Button>
        <Button color="primary" active>Active</Button>
        <Button color="primary" loading>Loading</Button>
        <Button color="primary" disabled>Disabled</Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space } from 'asterui'
// @example-imports: { XMarkIcon } from '@aster-ui/icons'
export function ShapesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="sm" align="center">
        <Button color="primary" shape="square">
          <XMarkIcon />
        </Button>
        <Button color="primary" shape="circle">
          <XMarkIcon />
        </Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space } from 'asterui'
export function WideDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <Button color="primary" shape="wide">Wide Button</Button>
        <Button color="secondary" shape="wide">Another Wide</Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space } from 'asterui'
export function BlockDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" className="w-full">
        <Button color="primary" shape="block">Block Button</Button>
        <Button color="secondary" shape="block">Another Block</Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space } from 'asterui'
export function LoadingDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="sm">
        <Button color="primary" loading>Loading</Button>
        <Button color="success" loading>Processing</Button>
        <Button color="error" loading>Deleting</Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space } from 'asterui'
export function LinkButtonsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="sm">
        <Button color="primary" href="https://github.com" target="_blank">GitHub</Button>
        <Button variant="ghost" href="https://npmjs.com" target="_blank">npm</Button>
        <Button href="/components" variant="link">Internal Link</Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space } from 'asterui'
// @example-imports: { ArrowUpTrayIcon, CheckIcon, TrashIcon } from '@aster-ui/icons'
export function WithIconsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="sm">
        <Button color="primary" icon={<ArrowUpTrayIcon />}>
          Upload
        </Button>
        <Button color="success" icon={<CheckIcon />}>
          Save
        </Button>
        <Button color="error" icon={<TrashIcon />} iconPosition="end">
          Delete
        </Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space } from 'asterui'
// @example-imports: { ArrowUpTrayIcon } from '@aster-ui/icons'
export function IconSizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="sm" align="center">
        <Button size="xs" color="primary" icon={<ArrowUpTrayIcon />}>XS</Button>
        <Button size="sm" color="primary" icon={<ArrowUpTrayIcon />}>Small</Button>
        <Button size="md" color="primary" icon={<ArrowUpTrayIcon />}>Medium</Button>
        <Button size="lg" color="primary" icon={<ArrowUpTrayIcon />}>Large</Button>
        <Button size="xl" color="primary" icon={<ArrowUpTrayIcon />}>XL</Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space } from 'asterui'
// @example-imports: { TrashIcon } from '@aster-ui/icons'
export function DangerDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="sm">
        <Button danger>Delete</Button>
        <Button danger icon={<TrashIcon />}>
          Remove Item
        </Button>
        <Button danger variant="outline">Cancel Account</Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space } from 'asterui'
export function RoundDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="sm">
        <Button color="primary" shape="round">Get Started</Button>
        <Button color="secondary" shape="round">Learn More</Button>
        <Button color="accent" shape="round">Subscribe</Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space } from 'asterui'
export function NoAnimationDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="sm">
        <Button color="primary">With Animation</Button>
        <Button color="primary" noAnimation>No Animation</Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function ToggleDemo() {
  // @example-include
  const [pressed, setPressed] = useState(false)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="sm">
        <Button
          color="primary"
          pressed={pressed}
          active={pressed}
          onClick={() => setPressed(!pressed)}
        >
          {pressed ? 'On' : 'Off'}
        </Button>
        <Button
          color="secondary"
          variant="outline"
          pressed={pressed}
          active={pressed}
          onClick={() => setPressed(!pressed)}
        >
          Toggle: {pressed ? 'Active' : 'Inactive'}
        </Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space, Input, Form, notification } from 'asterui'
export function FormSubmitDemo() {
  // @example-include
  const handleFinish = (values: { email: string }) => {
    notification.success({ message: 'Submitted!', description: `Email: ${values.email}` })
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Form onFinish={handleFinish}>
        <Form.Item name="email" label="Email" required>
          <Input type="email" placeholder="you@example.com" />
        </Form.Item>
        <Form.Item>
          <Space direction="horizontal" size="sm">
            <Button color="primary" htmlType="submit">Submit</Button>
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Button, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function EventHandlingDemo() {
  // @example-include
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleAsync = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="sm">
        <Button color="primary" onClick={() => setCount(c => c + 1)}>
          Clicked {count} times
        </Button>
        <Button color="secondary" onClick={handleAsync} loading={loading}>
          {loading ? 'Processing...' : 'Async Action'}
        </Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}
