import { ContextMenu, notification } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { ContextMenu, notification } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <ContextMenu onSelect={(key) => notification.info({ message: `Selected: ${key}` })}>
        <div className="p-8 bg-base-200 rounded-lg text-center cursor-context-menu">
          Right-click here
        </div>
        <ContextMenu.Item key="copy">Copy</ContextMenu.Item>
        <ContextMenu.Item key="paste">Paste</ContextMenu.Item>
        <ContextMenu.Item key="cut">Cut</ContextMenu.Item>
      </ContextMenu>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { ContextMenu, notification } from 'asterui'
export function DataDrivenDemo() {
  // @example-include
  const items = [
    { key: 'copy', label: 'Copy' },
    { key: 'paste', label: 'Paste' },
    { key: 'cut', label: 'Cut' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <ContextMenu items={items} onSelect={(key) => notification.info({ message: `Selected: ${key}` })}>
        <div className="p-8 bg-base-200 rounded-lg text-center cursor-context-menu">
          Right-click here
        </div>
      </ContextMenu>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { ContextMenu, notification } from 'asterui'
export function IconsDemo() {
  // @example-include
  const items = [
    { key: 'edit', label: 'Edit', icon: <span>✏️</span> },
    { key: 'duplicate', label: 'Duplicate', icon: <span>📋</span> },
    { key: 'delete', label: 'Delete', icon: <span>🗑️</span>, danger: true },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <ContextMenu items={items} onSelect={(key) => notification.info({ message: `Selected: ${key}` })}>
        <div className="p-8 bg-base-200 rounded-lg text-center cursor-context-menu">
          Right-click for options
        </div>
      </ContextMenu>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { ContextMenu, notification } from 'asterui'
export function DividersDemo() {
  // @example-include
  const items = [
    { key: 'undo', label: 'Undo' },
    { key: 'redo', label: 'Redo' },
    { key: 'divider1', divider: true },
    { key: 'cut', label: 'Cut' },
    { key: 'copy', label: 'Copy' },
    { key: 'paste', label: 'Paste' },
    { key: 'divider2', divider: true },
    { key: 'select-all', label: 'Select All' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <ContextMenu items={items} onSelect={(key) => notification.info({ message: `Selected: ${key}` })}>
        <div className="p-8 bg-base-200 rounded-lg text-center cursor-context-menu">
          Right-click for menu with sections
        </div>
      </ContextMenu>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { ContextMenu, notification } from 'asterui'
export function SubmenuDemo() {
  // @example-include
  const items = [
    { key: 'new', label: 'New', children: [
      { key: 'new-file', label: 'File' },
      { key: 'new-folder', label: 'Folder' },
      { key: 'new-project', label: 'Project' },
    ]},
    { key: 'open', label: 'Open' },
    { key: 'save', label: 'Save' },
    { key: 'divider', divider: true },
    { key: 'export', label: 'Export', children: [
      { key: 'export-pdf', label: 'PDF' },
      { key: 'export-png', label: 'PNG' },
      { key: 'export-svg', label: 'SVG' },
    ]},
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <ContextMenu items={items} onSelect={(key) => notification.info({ message: `Selected: ${key}` })}>
        <div className="p-8 bg-base-200 rounded-lg text-center cursor-context-menu">
          Right-click for nested menu
        </div>
      </ContextMenu>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { ContextMenu, notification } from 'asterui'
export function DisabledDemo() {
  // @example-include
  const items = [
    { key: 'copy', label: 'Copy' },
    { key: 'paste', label: 'Paste', disabled: true },
    { key: 'cut', label: 'Cut' },
    { key: 'delete', label: 'Delete', danger: true, disabled: true },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <ContextMenu items={items} onSelect={(key) => notification.info({ message: `Selected: ${key}` })}>
        <div className="p-8 bg-base-200 rounded-lg text-center cursor-context-menu">
          Right-click (some items disabled)
        </div>
      </ContextMenu>
      {/* @example-return-end */}
    </Demo>
  )
}
