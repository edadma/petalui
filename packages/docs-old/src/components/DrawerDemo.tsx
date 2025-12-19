import { useState, useEffect } from 'react'
import { Drawer, Button, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Drawer, Button } from 'asterui'
// @example-imports: { useState } from 'react'
export function BasicDemo() {
  // @example-include
  const [open, setOpen] = useState(false)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Button color="primary" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Basic Drawer"
      >
        <p>Drawer content goes here.</p>
      </Drawer>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Drawer, Button, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function PlacementDemo() {
  // @example-include
  const [placement, setPlacement] = useState<'left' | 'right' | 'top' | 'bottom'>('right')
  const [open, setOpen] = useState(false)

  const showDrawer = (p: typeof placement) => {
    setPlacement(p)
    setOpen(true)
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="sm" wrap>
        <Button onClick={() => showDrawer('left')}>Left</Button>
        <Button onClick={() => showDrawer('right')}>Right</Button>
        <Button onClick={() => showDrawer('top')}>Top</Button>
        <Button onClick={() => showDrawer('bottom')}>Bottom</Button>
      </Space>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement={placement}
        title={`${placement.charAt(0).toUpperCase() + placement.slice(1)} Drawer`}
      >
        <p>This drawer slides in from the {placement}.</p>
      </Drawer>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Drawer, Button, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function WithFooterDemo() {
  // @example-include
  const [open, setOpen] = useState(false)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Button color="primary" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Edit Profile"
        footer={
          <Space direction="horizontal" size="sm">
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button color="primary" onClick={() => setOpen(false)}>
              Save
            </Button>
          </Space>
        }
      >
        <p>Form content would go here...</p>
      </Drawer>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Drawer, Button, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function ExtraDemo() {
  // @example-include
  const [open, setOpen] = useState(false)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Button color="primary" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="User Details"
        extra={
          <Space size="xs">
            <Button size="sm" variant="ghost">Edit</Button>
            <Button size="sm" variant="ghost">Delete</Button>
          </Space>
        }
      >
        <p>User information displayed here.</p>
      </Drawer>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Drawer, Button, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function SizesDemo() {
  // @example-include
  const [size, setSize] = useState<'default' | 'large'>('default')
  const [open, setOpen] = useState(false)

  const showDrawer = (s: typeof size) => {
    setSize(s)
    setOpen(true)
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="sm">
        <Button onClick={() => showDrawer('default')}>Default (378px)</Button>
        <Button onClick={() => showDrawer('large')}>Large (736px)</Button>
      </Space>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={`${size.charAt(0).toUpperCase() + size.slice(1)} Drawer`}
        size={size}
      >
        <p>This drawer uses the {size} preset size.</p>
      </Drawer>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Drawer, Button } from 'asterui'
// @example-imports: { useState, useEffect } from 'react'
export function LoadingDemo() {
  // @example-include
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (open) {
      setLoading(true)
      const timer = setTimeout(() => setLoading(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [open])
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Button color="primary" onClick={() => setOpen(true)}>
        Load Data
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="User Profile"
        loading={loading}
      >
        <div className="space-y-4">
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john@example.com</p>
          <p><strong>Role:</strong> Administrator</p>
        </div>
      </Drawer>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Drawer, Button } from 'asterui'
// @example-imports: { useState } from 'react'
export function NestedDemo() {
  // @example-include
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Button color="primary" onClick={() => setOpen1(true)}>
        Open First Drawer
      </Button>
      <Drawer
        open={open1}
        onClose={() => setOpen1(false)}
        title="First Drawer"
        push={{ distance: 180 }}
      >
        <p>This is the first drawer.</p>
        <Button color="secondary" onClick={() => setOpen2(true)}>
          Open Second Drawer
        </Button>
        <Drawer
          open={open2}
          onClose={() => setOpen2(false)}
          title="Second Drawer"
          width={400}
        >
          <p>This is a nested drawer.</p>
          <p>Notice how the first drawer pushed back.</p>
        </Drawer>
      </Drawer>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Drawer, Button } from 'asterui'
// @example-imports: { useState } from 'react'
export function NoMaskDemo() {
  // @example-include
  const [open, setOpen] = useState(false)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Button color="primary" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="No Mask Drawer"
        mask={false}
      >
        <p>This drawer has no backdrop overlay.</p>
        <p>You can still interact with the page behind it.</p>
      </Drawer>
      {/* @example-return-end */}
    </Demo>
  )
}
