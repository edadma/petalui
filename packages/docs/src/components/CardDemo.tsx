import { useState } from 'react'
import { Card, Button, Space, Avatar } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <Card title="Card Title" className="w-96">
        <p>This is a basic card with some content inside it.</p>
      </Card>
    </Demo>
  )
}

export function ImageDemo() {
  return (
    <Demo>
      <Card
        title="Image Card"
        cover={<img src="https://picsum.photos/400/200" alt="Placeholder" />}
        className="w-96"
      >
        <p>A card with an image positioned at the top.</p>
      </Card>
    </Demo>
  )
}

export function ActionsDemo() {
  return (
    <Demo>
      <Card
        title="Action Card"
        actions={
          <>
            <Button color="primary">Accept</Button>
            <Button variant="ghost">Decline</Button>
          </>
        }
        className="w-96"
      >
        <p>Card with buttons in the actions area.</p>
      </Card>
    </Demo>
  )
}

export function UnborderedDemo() {
  return (
    <Demo>
      <Card title="Unbordered Card" className="w-96" bordered={false}>
        <p>This card has no border.</p>
      </Card>
    </Demo>
  )
}

export function SizesDemo() {
  return (
    <Demo>
      <Space direction="vertical" size="sm" className="w-96">
        <Card title="Extra Small" size="xs" bordered>
          <p>Compact card with minimal padding.</p>
        </Card>
        <Card title="Small" size="sm" bordered>
          <p>Small card with reduced padding.</p>
        </Card>
        <Card title="Large" size="lg" bordered>
          <p>Large card with increased padding.</p>
        </Card>
      </Space>
    </Demo>
  )
}

export function SideDemo() {
  return (
    <Demo>
      <Card
        title="Side Card"
        cover={
          <img
            src="https://picsum.photos/200/300"
            alt="Placeholder"
            className="w-32 h-full object-cover"
          />
        }
        actions={<Button color="primary">Buy Now</Button>}
        side
        className="w-96"
      >
        <p>Image positioned beside the content.</p>
      </Card>
    </Demo>
  )
}

export function OverlayDemo() {
  return (
    <Demo>
      <Card
        title="Overlay Card"
        cover={<img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />}
        actions={<Button color="primary">View Details</Button>}
        imageFull
        className="w-96"
      >
        <p>Text appears over the background image.</p>
      </Card>
    </Demo>
  )
}

export function ColorsDemo() {
  return (
    <Demo>
      <Space direction="vertical" size="sm" className="w-96">
        <Card title="Primary Card" className="bg-primary text-primary-content">
          <p>Card with primary background color.</p>
        </Card>
        <Card title="Neutral Card" className="bg-neutral text-neutral-content">
          <p>Card with neutral background color.</p>
        </Card>
      </Space>
    </Demo>
  )
}

export function AlignmentDemo() {
  return (
    <Demo>
      <Space direction="vertical" size="sm" className="w-96">
        <Card
          title="Left Actions"
          actions={<Button color="primary" size="sm">Left</Button>}
          actionsJustify="start"
          bordered
        >
          <p>Actions aligned to the left.</p>
        </Card>
        <Card
          title="Center Actions"
          actions={<Button color="primary" size="sm">Center</Button>}
          actionsJustify="center"
          bordered
        >
          <p>Actions aligned to the center.</p>
        </Card>
      </Space>
    </Demo>
  )
}

export function ExtraDemo() {
  return (
    <Demo>
      <Card
        title="Card Title"
        extra={<a href="#" className="link link-primary">More</a>}
        className="w-96"
      >
        <p>Card with extra content in the header area.</p>
      </Card>
    </Demo>
  )
}

export function HoverableDemo() {
  return (
    <Demo>
      <Space size="sm">
        <Card title="Hoverable Card" hoverable className="w-64">
          <p>Hover over this card to see the shadow effect.</p>
        </Card>
        <Card title="Normal Card" className="w-64">
          <p>This card has no hover effect.</p>
        </Card>
      </Space>
    </Demo>
  )
}

export function LoadingDemo() {
  const [loading, setLoading] = useState(true)

  return (
    <Demo>
      <Space direction="vertical" size="sm">
        <Button size="sm" onClick={() => setLoading(!loading)}>
          Toggle Loading
        </Button>
        <Card
          title="Loading Card"
          cover={<img src="https://picsum.photos/400/200" alt="Placeholder" />}
          actions={<Button color="primary">Action</Button>}
          loading={loading}
          className="w-96"
        >
          <p>Content appears when loading is false.</p>
        </Card>
      </Space>
    </Demo>
  )
}

export function MetaDemo() {
  return (
    <Demo>
      <Card className="w-96">
        <Card.Meta
          avatar={<Avatar src="https://i.pravatar.cc/100" />}
          title="John Doe"
          description="Software Engineer at Acme Corp"
        />
        <p className="mt-4">
          This card uses Card.Meta for a structured avatar layout.
        </p>
      </Card>
    </Demo>
  )
}

export function AvatarPropsDemo() {
  return (
    <Demo>
      <Card
        avatar={<Avatar src="https://i.pravatar.cc/100" />}
        title="Jane Smith"
        description="Product Designer"
        actions={<Button color="primary" size="sm">Follow</Button>}
        className="w-96"
      >
        <p className="mt-2">Building beautiful user experiences.</p>
      </Card>
    </Demo>
  )
}
