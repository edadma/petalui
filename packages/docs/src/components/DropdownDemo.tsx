import { Dropdown, Button, Space, Typography, Join } from '@aster-ui/prefixed'
import { PencilIcon, DocumentDuplicateIcon, TrashIcon, FolderIcon, Cog6ToothIcon, UserIcon, EllipsisVerticalIcon } from '@aster-ui/icons-prefixed'
import { Demo } from './Demo'

// @example-imports: { Dropdown, Button } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Dropdown>
        <Dropdown.Trigger>
          <Button color="primary">Actions</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
          <Dropdown.Item>Duplicate</Dropdown.Item>
          <Dropdown.Item>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Dropdown, Button } from 'asterui'
// @example-imports: { PencilIcon, DocumentDuplicateIcon, TrashIcon } from '@aster-ui/icons'
export function ItemsPropDemo() {
  // @example-include
  const menuItems = [
    { key: 'edit', label: 'Edit', icon: <PencilIcon size="sm" /> },
    { key: 'duplicate', label: 'Duplicate', icon: <DocumentDuplicateIcon size="sm" /> },
    { type: 'divider' as const },
    { key: 'delete', label: 'Delete', danger: true, icon: <TrashIcon size="sm" /> },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Dropdown menu={{ items: menuItems }}>
        <Dropdown.Trigger>
          <Button color="primary">Data-Driven</Button>
        </Dropdown.Trigger>
      </Dropdown>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Dropdown, Button, Space } from 'asterui'
export function PositionDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="sm" wrap>
        <Dropdown placement="top">
          <Dropdown.Trigger>
            <Button>Top</Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Option 1</Dropdown.Item>
            <Dropdown.Item>Option 2</Dropdown.Item>
            <Dropdown.Item>Option 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown placement="bottom">
          <Dropdown.Trigger>
            <Button>Bottom</Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Option 1</Dropdown.Item>
            <Dropdown.Item>Option 2</Dropdown.Item>
            <Dropdown.Item>Option 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown placement="left">
          <Dropdown.Trigger>
            <Button>Left</Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Option 1</Dropdown.Item>
            <Dropdown.Item>Option 2</Dropdown.Item>
            <Dropdown.Item>Option 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown placement="right">
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Dropdown, Button, Space } from 'asterui'
export function TriggerDemo() {
  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Dropdown, Button } from 'asterui'
// @example-imports: { PencilIcon, DocumentDuplicateIcon, TrashIcon } from '@aster-ui/icons'
export function WithIconsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Dropdown>
        <Dropdown.Trigger>
          <Button color="primary">Options</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item icon={<PencilIcon size="sm" />}>Edit</Dropdown.Item>
          <Dropdown.Item icon={<DocumentDuplicateIcon size="sm" />}>Duplicate</Dropdown.Item>
          <Dropdown.Item icon={<TrashIcon size="sm" />}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Dropdown, Button } from 'asterui'
export function WithDividerDemo() {
  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Dropdown, Button } from 'asterui'
export function ItemStatesDemo() {
  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Dropdown, Button, Space } from 'asterui'
export function AlignDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="sm" wrap>
        <Dropdown placement="bottomLeft">
          <Dropdown.Trigger>
            <Button>Bottom Left</Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Option 1</Dropdown.Item>
            <Dropdown.Item>Option 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown placement="bottom">
          <Dropdown.Trigger>
            <Button>Bottom Center</Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Option 1</Dropdown.Item>
            <Dropdown.Item>Option 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown placement="bottomRight">
          <Dropdown.Trigger>
            <Button>Bottom Right</Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Option 1</Dropdown.Item>
            <Dropdown.Item>Option 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Dropdown, Typography } from 'asterui'
// @example-imports: { PencilIcon, DocumentDuplicateIcon, TrashIcon } from '@aster-ui/icons'
export function ContextMenuDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Dropdown trigger={['contextMenu']}>
        <Dropdown.Trigger>
          <div className="p-8 border-2 border-dashed border-base-300 rounded-lg text-center cursor-context-menu">
            <Typography.Text type="secondary">Right-click here</Typography.Text>
          </div>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item icon={<PencilIcon size="sm" />}>Edit</Dropdown.Item>
          <Dropdown.Item icon={<DocumentDuplicateIcon size="sm" />}>Copy</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item icon={<TrashIcon size="sm" />} danger>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Dropdown, Button } from 'asterui'
// @example-imports: { PencilIcon, FolderIcon, Cog6ToothIcon } from '@aster-ui/icons'
export function SubmenuDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Dropdown>
        <Dropdown.Trigger>
          <Button>With Submenu</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item icon={<PencilIcon size="sm" />}>Edit</Dropdown.Item>
          <Dropdown.SubMenu title="More Options" icon={<FolderIcon size="sm" />}>
            <Dropdown.Item>Option A</Dropdown.Item>
            <Dropdown.Item>Option B</Dropdown.Item>
            <Dropdown.Item>Option C</Dropdown.Item>
          </Dropdown.SubMenu>
          <Dropdown.SubMenu title="Settings" icon={<Cog6ToothIcon size="sm" />}>
            <Dropdown.Item>Preferences</Dropdown.Item>
            <Dropdown.Item>Account</Dropdown.Item>
          </Dropdown.SubMenu>
          <Dropdown.Divider />
          <Dropdown.Item danger>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Dropdown, Button, Join } from 'asterui'
// @example-imports: { UserIcon } from '@aster-ui/icons'
export function CompactButtonDemo() {
  // @example-include
  const menuItems = [
    { key: 'profile', label: 'Profile' },
    { key: 'settings', label: 'Settings' },
    { type: 'divider' as const },
    { key: 'logout', label: 'Sign out', danger: true },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Join>
        <Button color="primary">Actions</Button>
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <Button color="primary" icon={<UserIcon />} />
        </Dropdown>
      </Join>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Dropdown, Button, Join } from 'asterui'
// @example-imports: { EllipsisVerticalIcon } from '@aster-ui/icons'
export function CompactIconDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Join>
        <Button>Save</Button>
        <Dropdown placement="bottomRight">
          <Button icon={<EllipsisVerticalIcon />} />
          <Dropdown.Menu>
            <Dropdown.Item>Save and Close</Dropdown.Item>
            <Dropdown.Item>Save as Draft</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Discard</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Join>
      {/* @example-return-end */}
    </Demo>
  )
}
