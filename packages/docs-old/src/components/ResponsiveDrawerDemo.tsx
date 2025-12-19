import { useState } from 'react'
import { ResponsiveDrawer, Button, Menu, Avatar } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { ResponsiveDrawer, Button, Menu } from 'asterui'
// @example-imports: { useState } from 'react'
export function BasicDemo() {
  // @example-include
  const [open, setOpen] = useState(false)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <ResponsiveDrawer
        open={open}
        onOpenChange={setOpen}
        sidebar={
          <Menu>
            <Menu.Item>Dashboard</Menu.Item>
            <Menu.Item>Settings</Menu.Item>
            <Menu.Item>Profile</Menu.Item>
          </Menu>
        }
      >
        <div className="p-4">
          <Button onClick={() => setOpen(true)}>
            Open Sidebar
          </Button>
          <p className="mt-4">Main content area</p>
        </div>
      </ResponsiveDrawer>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { ResponsiveDrawer, Button, Menu } from 'asterui'
// @example-imports: { useState } from 'react'
export function ResponsiveDemo() {
  // @example-include
  const [open, setOpen] = useState(false)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <ResponsiveDrawer
        open={open}
        onOpenChange={setOpen}
        responsive="lg"
        sidebar={
          <Menu>
            <Menu.Title>Navigation</Menu.Title>
            <Menu.Item>Dashboard</Menu.Item>
            <Menu.Item>Analytics</Menu.Item>
            <Menu.Item>Settings</Menu.Item>
          </Menu>
        }
      >
        <div className="p-4">
          <Button className="lg:hidden" onClick={() => setOpen(true)}>
            Menu
          </Button>
          <p className="mt-4">
            Resize the window to see the responsive behavior.
            On large screens, the sidebar is always visible.
          </p>
        </div>
      </ResponsiveDrawer>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { ResponsiveDrawer, Button, Menu } from 'asterui'
// @example-imports: { useState } from 'react'
export function CustomWidthDemo() {
  // @example-include
  const [open, setOpen] = useState(false)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <ResponsiveDrawer
        open={open}
        onOpenChange={setOpen}
        width={400}
        sidebar={
          <Menu>
            <Menu.Title>Wide Sidebar</Menu.Title>
            <Menu.Item>Item with more space</Menu.Item>
            <Menu.Item>Another item</Menu.Item>
          </Menu>
        }
      >
        <div className="p-4">
          <Button onClick={() => setOpen(true)}>
            Open Wide Sidebar
          </Button>
        </div>
      </ResponsiveDrawer>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { ResponsiveDrawer, Button, Menu } from 'asterui'
// @example-imports: { useState } from 'react'
export function EndDemo() {
  // @example-include
  const [open, setOpen] = useState(false)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <ResponsiveDrawer
        open={open}
        onOpenChange={setOpen}
        end
        sidebar={
          <Menu>
            <Menu.Item>Info Panel</Menu.Item>
            <Menu.Item>Quick Actions</Menu.Item>
            <Menu.Item>Help</Menu.Item>
          </Menu>
        }
      >
        <div className="p-4">
          <Button onClick={() => setOpen(true)}>
            Open Right Sidebar
          </Button>
          <p className="mt-4">Main content area</p>
        </div>
      </ResponsiveDrawer>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { ResponsiveDrawer, Button, Avatar } from 'asterui'
// @example-imports: { useState } from 'react'
export function CustomSidebarDemo() {
  // @example-include
  const [open, setOpen] = useState(false)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <ResponsiveDrawer
        open={open}
        onOpenChange={setOpen}
        sidebarClassName="bg-base-300"
        sidebar={
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar>JD</Avatar>
              <div>
                <div className="font-semibold">John Doe</div>
                <div className="text-sm opacity-70">Admin</div>
              </div>
            </div>
            <ul className="menu">
              <li><a>Dashboard</a></li>
              <li><a>Users</a></li>
              <li><a>Reports</a></li>
              <li><a>Settings</a></li>
            </ul>
          </div>
        }
      >
        <div className="p-4">
          <Button onClick={() => setOpen(true)}>
            Toggle Sidebar
          </Button>
          <p className="mt-4">Application content</p>
        </div>
      </ResponsiveDrawer>
      {/* @example-return-end */}
    </Demo>
  )
}
