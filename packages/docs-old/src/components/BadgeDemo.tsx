import { Badge, Button, Avatar, Space, Card } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Badge, Button, Space } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="lg" wrap>
        <Badge count={5}>
          <Button>Messages</Button>
        </Badge>
        <Badge count={99}>
          <Button color="secondary">Notifications</Button>
        </Badge>
        <Badge count={0}>
          <Button color="accent">No Count</Button>
        </Badge>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Badge, Avatar, Space } from 'asterui'
export function OverflowDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="lg" align="center" wrap>
        <Badge count={99}>
          <Avatar size="lg">U</Avatar>
        </Badge>
        <Badge count={100} overflowCount={99}>
          <Avatar size="lg">U</Avatar>
        </Badge>
        <Badge count={1000} overflowCount={999}>
          <Avatar size="lg">U</Avatar>
        </Badge>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Badge, Avatar, Space } from 'asterui'
export function PositionDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="lg" wrap>
        <Badge count={5} position="top-start">
          <Avatar size="lg">TL</Avatar>
        </Badge>
        <Badge count={5} position="top-center">
          <Avatar size="lg">TC</Avatar>
        </Badge>
        <Badge count={5} position="top-end">
          <Avatar size="lg">TR</Avatar>
        </Badge>
        <Badge count={5} position="bottom-start">
          <Avatar size="lg">BL</Avatar>
        </Badge>
        <Badge count={5} position="bottom-end">
          <Avatar size="lg">BR</Avatar>
        </Badge>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Badge, Avatar, Space } from 'asterui'
export function OffsetDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="lg">
        <Badge count={5}>
          <Avatar size="lg">Default</Avatar>
        </Badge>
        <Badge count={5} offset={[-5, 5]}>
          <Avatar size="lg">Offset</Avatar>
        </Badge>
        <Badge count={5} offset={[0, 10]}>
          <Avatar size="lg">Down</Avatar>
        </Badge>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Badge, Space } from 'asterui'
export function StatusDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <Badge status="success" text="Success" />
        <Badge status="processing" text="Processing" />
        <Badge status="error" text="Error" />
        <Badge status="warning" text="Warning" />
        <Badge status="default" text="Default" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Badge, Card, Space } from 'asterui'
export function RibbonDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="lg" wrap>
        <Badge.Ribbon text="Recommended">
          <Card title="Premium Plan" variant="border" className="w-48">
            Best value for teams
          </Card>
        </Badge.Ribbon>
        <Badge.Ribbon text="New" placement="start">
          <Card title="Pro Plan" variant="border" className="w-48">
            For professionals
          </Card>
        </Badge.Ribbon>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Badge, Card, Space } from 'asterui'
export function RibbonColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="md">
        <Badge.Ribbon text="Primary" type="primary">
          <Card title="Primary Ribbon" variant="border" className="w-48">Card content</Card>
        </Badge.Ribbon>
        <Badge.Ribbon text="Success" type="success">
          <Card title="Success Ribbon" variant="border" className="w-48">Card content</Card>
        </Badge.Ribbon>
        <Badge.Ribbon text="Custom" color="#722ed1">
          <Card title="Custom Color" variant="border" className="w-48">Card content</Card>
        </Badge.Ribbon>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Badge, Button, Space } from 'asterui'
export function DotDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="lg" wrap>
        <Badge dot type="error">
          <Button>Notifications</Button>
        </Badge>
        <Badge dot type="success">
          <Button variant="ghost">Online</Button>
        </Badge>
        <Badge dot type="warning">
          <Button color="secondary">Pending</Button>
        </Badge>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Badge, Space } from 'asterui'
export function ColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="sm" wrap>
        <Badge count={5} />
        <Badge count={5} type="primary" />
        <Badge count={5} type="secondary" />
        <Badge count={5} type="accent" />
        <Badge count={5} type="info" />
        <Badge count={5} type="success" />
        <Badge count={5} type="warning" />
        <Badge count={5} type="error" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Badge, Button, Space } from 'asterui'
export function CustomColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="md">
        <Badge count={5} color="#722ed1">
          <Button>Purple</Button>
        </Badge>
        <Badge count={5} color="#eb2f96">
          <Button>Magenta</Button>
        </Badge>
        <Badge count={5} color="#52c41a">
          <Button>Green</Button>
        </Badge>
        <Badge count={5} color="#faad14">
          <Button>Gold</Button>
        </Badge>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Badge, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="sm" align="center">
        <Badge count={5} type="primary" size="xs" />
        <Badge count={5} type="primary" size="sm" />
        <Badge count={5} type="primary" size="md" />
        <Badge count={5} type="primary" size="lg" />
        <Badge count={5} type="primary" size="xl" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Badge, Button, Space } from 'asterui'
export function ShowZeroDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="lg">
        <Badge count={0} showZero>
          <Button>Messages</Button>
        </Badge>
        <Badge count={0}>
          <Button color="secondary">Hidden Zero</Button>
        </Badge>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Badge, Space } from 'asterui'
export function VariantsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="md">
        <Space direction="horizontal" size="sm" wrap>
          <Badge count={5} type="primary" variant="solid" />
          <Badge count={5} type="secondary" variant="solid" />
          <Badge count={5} type="accent" variant="solid" />
        </Space>
        <Space direction="horizontal" size="sm" wrap>
          <Badge count={5} type="primary" variant="outline" />
          <Badge count={5} type="secondary" variant="outline" />
          <Badge count={5} type="accent" variant="outline" />
        </Space>
        <Space direction="horizontal" size="sm" wrap>
          <Badge count={5} type="primary" variant="soft" />
          <Badge count={5} type="secondary" variant="soft" />
          <Badge count={5} type="accent" variant="soft" />
        </Space>
        <Space direction="horizontal" size="sm" wrap>
          <Badge count={5} type="primary" variant="dash" />
          <Badge count={5} type="secondary" variant="dash" />
          <Badge count={5} type="accent" variant="dash" />
        </Space>
        <Space direction="horizontal" size="sm" wrap>
          <Badge count={5} type="primary" variant="ghost" />
          <Badge count={5} type="secondary" variant="ghost" />
          <Badge count={5} type="accent" variant="ghost" />
        </Space>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}
