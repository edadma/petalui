import { useState } from 'react'
import { Button, Space, Form, Input, notification } from 'asterui'
import { Demo } from './Demo'
import { X, Upload, Check, Trash2 } from 'lucide-react'

export function BrandColorsDemo() {
  return (
    <Demo>
      <Space wrap>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="accent">Accent</Button>
        <Button color="neutral">Neutral</Button>
      </Space>
    </Demo>
  )
}

export function StateColorsDemo() {
  return (
    <Demo>
      <Space wrap>
        <Button color="info">Info</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="error">Error</Button>
      </Space>
    </Demo>
  )
}

export function VariantsDemo() {
  return (
    <Demo>
      <Space wrap>
        <Button color="primary">Solid</Button>
        <Button color="primary" variant="outline">Outline</Button>
        <Button color="primary" variant="dash">Dash</Button>
        <Button color="primary" variant="soft">Soft</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </Space>
    </Demo>
  )
}

export function SizesDemo() {
  return (
    <Demo>
      <Space wrap align="center">
        <Button size="xs">XS</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">XL</Button>
      </Space>
    </Demo>
  )
}

export function OutlineDemo() {
  return (
    <Demo>
      <Space wrap>
        <Button color="primary" variant="outline">Primary</Button>
        <Button color="secondary" variant="outline">Secondary</Button>
        <Button color="accent" variant="outline">Accent</Button>
        <Button color="success" variant="outline">Success</Button>
        <Button color="error" variant="outline">Error</Button>
      </Space>
    </Demo>
  )
}

export function DashDemo() {
  return (
    <Demo>
      <Space wrap>
        <Button color="primary" variant="dash">Primary</Button>
        <Button color="secondary" variant="dash">Secondary</Button>
        <Button color="accent" variant="dash">Accent</Button>
      </Space>
    </Demo>
  )
}

export function SoftDemo() {
  return (
    <Demo>
      <Space wrap>
        <Button color="primary" variant="soft">Primary</Button>
        <Button color="secondary" variant="soft">Secondary</Button>
        <Button color="accent" variant="soft">Accent</Button>
        <Button color="success" variant="soft">Success</Button>
        <Button color="warning" variant="soft">Warning</Button>
      </Space>
    </Demo>
  )
}

export function StatesDemo() {
  return (
    <Demo>
      <Space wrap>
        <Button color="primary">Normal</Button>
        <Button color="primary" active>Active</Button>
        <Button color="primary" loading>Loading</Button>
        <Button color="primary" disabled>Disabled</Button>
      </Space>
    </Demo>
  )
}

export function ShapesDemo() {
  return (
    <Demo>
      <Space wrap>
        <Button color="primary" shape="square">
          <X />
        </Button>
        <Button color="primary" shape="circle">
          <X />
        </Button>
      </Space>
    </Demo>
  )
}

export function WideDemo() {
  return (
    <Demo>
      <Space direction="vertical">
        <Button color="primary" shape="wide">Wide Button</Button>
        <Button color="secondary" shape="wide">Another Wide</Button>
      </Space>
    </Demo>
  )
}

export function BlockDemo() {
  return (
    <Demo>
      <Space direction="vertical" block>
        <Button color="primary" shape="block">Block Button</Button>
        <Button color="secondary" shape="block">Another Block</Button>
      </Space>
    </Demo>
  )
}

export function LoadingDemo() {
  return (
    <Demo>
      <Space wrap>
        <Button color="primary" loading>Loading</Button>
        <Button color="success" loading>Processing</Button>
        <Button color="error" loading>Deleting</Button>
      </Space>
    </Demo>
  )
}

export function LinkButtonsDemo() {
  return (
    <Demo>
      <Space wrap>
        <Button color="primary" href="https://github.com" target="_blank">GitHub</Button>
        <Button variant="ghost" href="https://npmjs.com" target="_blank">npm</Button>
        <Button href="/components" variant="link">Internal Link</Button>
      </Space>
    </Demo>
  )
}

export function WithIconsDemo() {
  return (
    <Demo>
      <Space wrap>
        <Button color="primary" icon={<Upload />}>Upload</Button>
        <Button color="success" icon={<Check />}>Save</Button>
        <Button color="error" icon={<Trash2 />} iconPosition="end">Delete</Button>
      </Space>
    </Demo>
  )
}

export function DangerDemo() {
  return (
    <Demo>
      <Space wrap>
        <Button danger>Delete</Button>
        <Button danger icon={<Trash2 />}>Remove Item</Button>
        <Button danger variant="outline">Cancel Account</Button>
      </Space>
    </Demo>
  )
}

export function RoundDemo() {
  return (
    <Demo>
      <Space wrap>
        <Button color="primary" shape="round">Get Started</Button>
        <Button color="secondary" shape="round">Learn More</Button>
        <Button color="accent" shape="round">Subscribe</Button>
      </Space>
    </Demo>
  )
}

export function ToggleDemo() {
  const [pressed, setPressed] = useState(false)
  return (
    <Demo>
      <Space wrap>
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
    </Demo>
  )
}

export function NoAnimationDemo() {
  return (
    <Demo>
      <Space wrap>
        <Button color="primary">With Animation</Button>
        <Button color="primary" noAnimation>No Animation</Button>
      </Space>
    </Demo>
  )
}

export function FormSubmitDemo() {
  const handleFinish = (values: { email: string }) => {
    notification.success({ message: 'Submitted!', description: `Email: ${values.email}` })
  }

  return (
    <Demo>
      <Form onFinish={handleFinish}>
        <Form.Item name="email" label="Email" required>
          <Input type="email" placeholder="you@example.com" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button color="primary" htmlType="submit">Submit</Button>
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </Demo>
  )
}

export function EventHandlingDemo() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleAsync = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
  }

  return (
    <Demo>
      <Space wrap>
        <Button color="primary" onClick={() => setCount(c => c + 1)}>
          Clicked {count} times
        </Button>
        <Button color="secondary" onClick={handleAsync} loading={loading}>
          {loading ? 'Processing...' : 'Async Action'}
        </Button>
      </Space>
    </Demo>
  )
}
