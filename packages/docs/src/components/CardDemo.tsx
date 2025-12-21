import { useState } from 'react'
import { Card, Avatar, Button, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Card } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Card title="Card Title" style={{ width: '20rem' }}>
        <p>Card content goes here. This is a basic card with a title.</p>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Card } from 'asterui'
export function BorderedDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Card variant="border" title="Card Title" style={{ width: '20rem' }}>
        <p>A card with a solid border instead of a shadow.</p>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Card } from 'asterui'
export function WithCoverDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Card
        cover={<img src="https://picsum.photos/seed/card1/400/200" alt="Cover" />}
        title="Card with Cover"
        style={{ width: '20rem' }}
      >
        <p>Cards can have cover images that appear above the content.</p>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Card, Button } from 'asterui'
export function WithActionsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Card
        cover={<img src="https://picsum.photos/seed/card2/400/200" alt="Cover" />}
        title="Card with Actions"
        style={{ width: '20rem' }}
        actions={
          <>
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button color="primary" size="sm">Buy Now</Button>
          </>
        }
      >
        <p>Action buttons appear at the bottom of the card.</p>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Card, Space } from 'asterui'
export function VariantsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="md">
        <Card title="Default" variant="default" style={{ width: '14rem' }}>
          Shadow style
        </Card>
        <Card title="Border" variant="border" style={{ width: '14rem' }}>
          Solid border
        </Card>
        <Card title="Dash" variant="dash" style={{ width: '14rem' }}>
          Dashed border
        </Card>
        <Card title="Borderless" variant="borderless" style={{ width: '14rem' }}>
          No border
        </Card>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Card, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" wrap size="md" align="start">
        <Card title="Extra Small" size="xs" style={{ width: '12rem' }}>
          <p>Compact content</p>
        </Card>
        <Card title="Small" size="sm" style={{ width: '14rem' }}>
          <p>Small card content</p>
        </Card>
        <Card title="Medium" size="md" style={{ width: '16rem' }}>
          <p>Medium card content</p>
        </Card>
        <Card title="Large" size="lg" style={{ width: '18rem' }}>
          <p>Large card content</p>
        </Card>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Card } from 'asterui'
export function ExtraContentDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Card
        title="Card Title"
        extra={<a href="#" className="link link-primary text-sm">More</a>}
        style={{ width: '20rem' }}
      >
        <p>Use the extra prop to add content in the top-right corner.</p>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Card, Avatar } from 'asterui'
export function MetaDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Card
        avatar={<Avatar src="/avatar-1.webp" />}
        title="John Doe"
        description="Software Engineer"
        style={{ width: '20rem' }}
      >
        <p className="mt-4">Use avatar, title, and description for a meta layout.</p>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Card, Avatar } from 'asterui'
export function CardMetaDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Card style={{ width: '20rem' }}>
        <Card.Meta
          avatar={<Avatar src="/avatar-1.webp" />}
          title="Jane Smith"
          description="Product Designer"
        />
        <p className="mt-4">Card.Meta can be used anywhere inside the card body.</p>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Card } from 'asterui'
export function HoverableDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Card
        hoverable
        cover={<img src="https://picsum.photos/seed/card3/400/200" alt="Cover" />}
        title="Hoverable Card"
        style={{ width: '20rem' }}
      >
        <p>Hover over this card to see the shadow effect.</p>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Card, Button, Space, Avatar } from 'asterui'
// @example-imports: { useState } from 'react'
export function LoadingDemo() {
  // @example-include
  const [loading, setLoading] = useState(true)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="md">
        <Button size="sm" onClick={() => setLoading(!loading)}>
          Toggle Loading
        </Button>
        <Card
          loading={loading}
          avatar={<Avatar />}
          title="Card Title"
          description="Card description"
          style={{ width: '20rem' }}
          actions={
            <>
              <Button variant="ghost" size="sm">Action</Button>
              <Button color="primary" size="sm">Submit</Button>
            </>
          }
        >
          <p className="mt-4">Card content that appears when not loading.</p>
        </Card>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Card, Button } from 'asterui'
export function ImageFullDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Card
        imageFull
        cover={<img src="https://picsum.photos/seed/card4/400/250" alt="Cover" />}
        title="Image Full"
        style={{ width: '20rem' }}
        actions={<Button color="primary" size="sm">Learn More</Button>}
      >
        <p>Content overlays on top of the image with dark gradient.</p>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Card, Button } from 'asterui'
export function SideLayoutDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Card
        side
        cover={<img src="https://picsum.photos/seed/card5/200/200" alt="Cover" className="max-w-[200px]" />}
        title="Side Layout"
        style={{ width: '28rem' }}
        actions={<Button color="primary" size="sm">Details</Button>}
      >
        <p>The cover image appears on the side instead of the top.</p>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Card } from 'asterui'
export function InnerCardDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Card title="Outer Card" style={{ width: '24rem' }}>
        <p className="mb-4">This is the outer card content.</p>
        <Card type="inner" title="Inner Card">
          <p>Inner cards have a subtle background distinction.</p>
        </Card>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Card } from 'asterui'
// @example-imports: { useState } from 'react'
export function TabsDemo() {
  // @example-include
  const [activeKey, setActiveKey] = useState('tab1')
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Card
        tabList={[
          { key: 'tab1', label: 'Article' },
          { key: 'tab2', label: 'App' },
          { key: 'tab3', label: 'Project' },
        ]}
        activeTabKey={activeKey}
        onTabChange={setActiveKey}
        style={{ width: '24rem' }}
      >
        {activeKey === 'tab1' && <p>Article content here...</p>}
        {activeKey === 'tab2' && <p>App content here...</p>}
        {activeKey === 'tab3' && <p>Project content here...</p>}
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Card } from 'asterui'
export function GridDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Card title="Card Grid" style={{ width: '28rem' }}>
        <div className="grid grid-cols-2 -mx-6 -mb-6">
          <Card.Grid hoverable>Grid Item 1</Card.Grid>
          <Card.Grid hoverable>Grid Item 2</Card.Grid>
          <Card.Grid hoverable>Grid Item 3</Card.Grid>
          <Card.Grid hoverable>Grid Item 4</Card.Grid>
        </div>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}
