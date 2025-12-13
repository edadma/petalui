import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import { ResponsiveDrawer, Button, Menu, Avatar } from 'asterui';
import { CheckIconSvg } from './icons'

// Basic demo
const BasicDemo: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
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
  );
};

// Responsive demo - always open on lg screens
const ResponsiveDemo: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
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
  );
};

// Custom width demo
const CustomWidthDemo: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
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
  );
};

// Right-side demo
const EndDemo: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
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
  );
};

// Custom sidebar content demo
const CustomSidebarDemo: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
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
  );
};

const statefulDemos: Record<string, React.FC> = {
  'basic': BasicDemo,
  'responsive': ResponsiveDemo,
  'custom-width': CustomWidthDemo,
  'end': EndDemo,
  'custom-sidebar': CustomSidebarDemo,
};

// Mount React demos
document.querySelectorAll('.demo-container').forEach(container => {
  const exampleId = container.getAttribute('data-example');
  if (exampleId && statefulDemos[exampleId]) {
    const root = createRoot(container as HTMLElement);
    const Component = statefulDemos[exampleId];
    root.render(<Component />);
  }
});

// Copy button functionality
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const code = btn.getAttribute('data-code');
    if (code) {
      await navigator.clipboard.writeText(code);
      const originalHTML = btn.innerHTML;
      btn.innerHTML = CheckIconSvg;
      setTimeout(() => {
        btn.innerHTML = originalHTML;
      }, 2000);
    }
  });
});
