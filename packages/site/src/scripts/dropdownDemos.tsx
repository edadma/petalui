import { createRoot } from 'react-dom/client';
import React from 'react';
import { Dropdown, Button, Space, Typography } from 'asterui';
import type { DropdownMenuItemType } from 'asterui';
import { PencilIcon, DocumentDuplicateIcon, TrashIcon, FolderIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { CheckIconSvg } from './icons'

// Demo components for each example
const demos: Record<string, React.ReactNode> = {
  'basic': (
    <Dropdown>
      <Dropdown.Trigger>
        <Button type="primary">Actions</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item>Duplicate</Dropdown.Item>
        <Dropdown.Item>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  'items-prop': (() => {
    const items: DropdownMenuItemType[] = [
      { key: 'edit', label: 'Edit', icon: <PencilIcon className="w-4 h-4" /> },
      { key: 'duplicate', label: 'Duplicate', icon: <DocumentDuplicateIcon className="w-4 h-4" /> },
      { type: 'divider' },
      { key: 'delete', label: 'Delete', danger: true, icon: <TrashIcon className="w-4 h-4" /> },
    ]
    return (
      <Dropdown items={items}>
        <Dropdown.Trigger>
          <Button type="primary">Data-Driven</Button>
        </Dropdown.Trigger>
      </Dropdown>
    )
  })(),
  'position': (
    <Space direction="horizontal" size="sm" wrap>
      <Dropdown position="top">
        <Dropdown.Trigger>
          <Button>Top</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Option 1</Dropdown.Item>
          <Dropdown.Item>Option 2</Dropdown.Item>
          <Dropdown.Item>Option 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown position="bottom">
        <Dropdown.Trigger>
          <Button>Bottom</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Option 1</Dropdown.Item>
          <Dropdown.Item>Option 2</Dropdown.Item>
          <Dropdown.Item>Option 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown position="left">
        <Dropdown.Trigger>
          <Button>Left</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Option 1</Dropdown.Item>
          <Dropdown.Item>Option 2</Dropdown.Item>
          <Dropdown.Item>Option 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown position="right">
        <Dropdown.Trigger>
          <Button>Right</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Option 1</Dropdown.Item>
          <Dropdown.Item>Option 2</Dropdown.Item>
          <Dropdown.Item>Option 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Space>
  ),
  'hover': (
    <Dropdown hover>
      <Dropdown.Trigger>
        <Button type="secondary">Hover Me</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Profile</Dropdown.Item>
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  'with-icons': (
    <Dropdown>
      <Dropdown.Trigger>
        <Button type="primary">Options</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>
          <PencilIcon className="w-4 h-4 mr-2" />
          Edit
        </Dropdown.Item>
        <Dropdown.Item>
          <DocumentDuplicateIcon className="w-4 h-4 mr-2" />
          Duplicate
        </Dropdown.Item>
        <Dropdown.Item>
          <TrashIcon className="w-4 h-4 mr-2" />
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  'with-divider': (
    <Dropdown>
      <Dropdown.Trigger>
        <Button>Account</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Profile</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Help</Dropdown.Item>
        <Dropdown.Item danger>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  'item-states': (
    <Dropdown>
      <Dropdown.Trigger>
        <Button>States</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item active>Active Item</Dropdown.Item>
        <Dropdown.Item>Normal Item</Dropdown.Item>
        <Dropdown.Item disabled>Disabled Item</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item danger>Delete Account</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  'align': (
    <Space direction="horizontal" size="sm" wrap>
      <Dropdown align="start">
        <Dropdown.Trigger>
          <Button>Start</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Option 1</Dropdown.Item>
          <Dropdown.Item>Option 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown align="center">
        <Dropdown.Trigger>
          <Button>Center</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Option 1</Dropdown.Item>
          <Dropdown.Item>Option 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown align="end">
        <Dropdown.Trigger>
          <Button>End</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Option 1</Dropdown.Item>
          <Dropdown.Item>Option 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Space>
  ),
  'trigger': (
    <Space direction="horizontal" size="sm" wrap>
      <Dropdown trigger={['click']}>
        <Dropdown.Trigger>
          <Button>Click</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Option 1</Dropdown.Item>
          <Dropdown.Item>Option 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown trigger={['hover']}>
        <Dropdown.Trigger>
          <Button>Hover</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Option 1</Dropdown.Item>
          <Dropdown.Item>Option 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Space>
  ),
  'context-menu': (
    <Dropdown trigger={['contextMenu']}>
      <Dropdown.Trigger>
        <div className="p-8 border-2 border-dashed border-base-300 rounded-lg text-center cursor-context-menu">
          <Typography.Text type="secondary">Right-click here</Typography.Text>
        </div>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item icon={<PencilIcon className="w-4 h-4" />}>Edit</Dropdown.Item>
        <Dropdown.Item icon={<DocumentDuplicateIcon className="w-4 h-4" />}>Copy</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item icon={<TrashIcon className="w-4 h-4" />} danger>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  'submenu': (
    <Dropdown>
      <Dropdown.Trigger>
        <Button>With Submenu</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item icon={<PencilIcon className="w-4 h-4" />}>Edit</Dropdown.Item>
        <Dropdown.SubMenu title="More Options" icon={<FolderIcon className="w-4 h-4" />}>
          <Dropdown.Item>Option A</Dropdown.Item>
          <Dropdown.Item>Option B</Dropdown.Item>
          <Dropdown.Item>Option C</Dropdown.Item>
        </Dropdown.SubMenu>
        <Dropdown.SubMenu title="Settings" icon={<Cog6ToothIcon className="w-4 h-4" />}>
          <Dropdown.Item>Preferences</Dropdown.Item>
          <Dropdown.Item>Account</Dropdown.Item>
        </Dropdown.SubMenu>
        <Dropdown.Divider />
        <Dropdown.Item danger>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// Mount React demos
document.querySelectorAll('.demo-container').forEach(container => {
  const exampleId = container.getAttribute('data-example');
  if (exampleId && demos[exampleId]) {
    const root = createRoot(container as HTMLElement);
    root.render(demos[exampleId]);
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
