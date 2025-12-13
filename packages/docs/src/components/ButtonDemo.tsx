import { useState } from 'react'
import { Button, Space, Form, Input, notification } from 'asterui'
import { Demo } from './Demo'
import { XMarkIcon, ArrowUpTrayIcon, CheckIcon, TrashIcon } from '@heroicons/react/24/outline'

export function BrandColorsDemo() {
  return (
    <Demo>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="accent">Accent</Button>
      <Button color="neutral">Neutral</Button>
    </Demo>
  )
}

export function StateColorsDemo() {
  return (
    <Demo>
      <Button color="info">Info</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="error">Error</Button>
    </Demo>
  )
}

export function VariantsDemo() {
  return (
    <Demo>
      <Button color="primary">Solid</Button>
      <Button color="primary" variant="outline">Outline</Button>
      <Button color="primary" variant="dash">Dash</Button>
      <Button color="primary" variant="soft">Soft</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </Demo>
  )
}

export function SizesDemo() {
  return (
    <Demo>
      <Button size="xs">XS</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">XL</Button>
    </Demo>
  )
}

export function OutlineDemo() {
  return (
    <Demo>
      <Button color="primary" variant="outline">Primary</Button>
      <Button color="secondary" variant="outline">Secondary</Button>
      <Button color="accent" variant="outline">Accent</Button>
      <Button color="success" variant="outline">Success</Button>
      <Button color="error" variant="outline">Error</Button>
    </Demo>
  )
}

export function DashDemo() {
  return (
    <Demo>
      <Button color="primary" variant="dash">Primary</Button>
      <Button color="secondary" variant="dash">Secondary</Button>
      <Button color="accent" variant="dash">Accent</Button>
    </Demo>
  )
}

export function SoftDemo() {
  return (
    <Demo>
      <Button color="primary" variant="soft">Primary</Button>
      <Button color="secondary" variant="soft">Secondary</Button>
      <Button color="accent" variant="soft">Accent</Button>
      <Button color="success" variant="soft">Success</Button>
      <Button color="warning" variant="soft">Warning</Button>
    </Demo>
  )
}

export function StatesDemo() {
  return (
    <Demo>
      <Button color="primary">Normal</Button>
      <Button color="primary" active>Active</Button>
      <Button color="primary" loading>Loading</Button>
      <Button color="primary" disabled>Disabled</Button>
    </Demo>
  )
}

export function ShapesDemo() {
  return (
    <Demo>
      <Button color="primary" shape="square">
        <XMarkIcon className="w-4 h-4" />
      </Button>
      <Button color="primary" shape="circle">
        <XMarkIcon className="w-4 h-4" />
      </Button>
    </Demo>
  )
}

export function WideDemo() {
  return (
    <Demo>
      <Button color="primary" shape="wide">Wide Button</Button>
      <Button color="secondary" shape="wide">Another Wide</Button>
    </Demo>
  )
}

export function BlockDemo() {
  return (
    <Demo>
      <Button color="primary" shape="block">Block Button</Button>
      <Button color="secondary" shape="block">Another Block</Button>
    </Demo>
  )
}

export function LoadingDemo() {
  return (
    <Demo>
      <Button color="primary" loading>Loading</Button>
      <Button color="success" loading>Processing</Button>
      <Button color="error" loading>Deleting</Button>
    </Demo>
  )
}

export function LinkButtonsDemo() {
  return (
    <Demo>
      <Button color="primary" href="https://github.com" target="_blank">GitHub</Button>
      <Button variant="ghost" href="https://npmjs.com" target="_blank">npm</Button>
      <Button href="/components" variant="link">Internal Link</Button>
    </Demo>
  )
}

export function WithIconsDemo() {
  return (
    <Demo>
      <Button color="primary" icon={<ArrowUpTrayIcon className="w-4 h-4" />}>Upload</Button>
      <Button color="success" icon={<CheckIcon className="w-4 h-4" />}>Save</Button>
      <Button color="error" icon={<TrashIcon className="w-4 h-4" />} iconPosition="end">Delete</Button>
    </Demo>
  )
}

export function DangerDemo() {
  return (
    <Demo>
      <Button danger>Delete</Button>
      <Button danger icon={<TrashIcon className="w-4 h-4" />}>Remove Item</Button>
      <Button danger variant="outline">Cancel Account</Button>
    </Demo>
  )
}

export function RoundDemo() {
  return (
    <Demo>
      <Button color="primary" shape="round">Get Started</Button>
      <Button color="secondary" shape="round">Learn More</Button>
      <Button color="accent" shape="round">Subscribe</Button>
    </Demo>
  )
}

export function ToggleDemo() {
  const [pressed, setPressed] = useState(false)
  return (
    <Demo>
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
    </Demo>
  )
}

export function NoAnimationDemo() {
  return (
    <Demo>
      <Button color="primary">With Animation</Button>
      <Button color="primary" noAnimation>No Animation</Button>
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
          <Space direction="horizontal" size="sm">
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
      <Button color="primary" onClick={() => setCount(c => c + 1)}>
        Clicked {count} times
      </Button>
      <Button color="secondary" onClick={handleAsync} loading={loading}>
        {loading ? 'Processing...' : 'Async Action'}
      </Button>
    </Demo>
  )
}
