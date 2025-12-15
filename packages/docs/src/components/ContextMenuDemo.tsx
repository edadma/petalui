import { ContextMenu, notification } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <ContextMenu onSelect={(key) => notification.info({ message: `Selected: ${key}` })}>
        <div className="p-8 bg-base-200 rounded-lg text-center cursor-context-menu">
          Right-click here
        </div>
        <ContextMenu.Item key="copy">Copy</ContextMenu.Item>
        <ContextMenu.Item key="paste">Paste</ContextMenu.Item>
        <ContextMenu.Item key="cut">Cut</ContextMenu.Item>
      </ContextMenu>
    </Demo>
  )
}

export function DataDrivenDemo() {
  const items = [
    { key: 'copy', label: 'Copy' },
    { key: 'paste', label: 'Paste' },
    { key: 'cut', label: 'Cut' },
  ]

  return (
    <Demo>
      <ContextMenu items={items} onSelect={(key) => notification.info({ message: `Selected: ${key}` })}>
        <div className="p-8 bg-base-200 rounded-lg text-center cursor-context-menu">
          Right-click here
        </div>
      </ContextMenu>
    </Demo>
  )
}

export function IconsDemo() {
  const items = [
    { key: 'edit', label: 'Edit', icon: <span>✏️</span> },
    { key: 'duplicate', label: 'Duplicate', icon: <span>📋</span> },
    { key: 'delete', label: 'Delete', icon: <span>🗑️</span>, danger: true },
  ]

  return (
    <Demo>
      <ContextMenu items={items} onSelect={(key) => notification.info({ message: `Selected: ${key}` })}>
        <div className="p-8 bg-base-200 rounded-lg text-center cursor-context-menu">
          Right-click for options
        </div>
      </ContextMenu>
    </Demo>
  )
}

export function DividersDemo() {
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

  return (
    <Demo>
      <ContextMenu items={items} onSelect={(key) => notification.info({ message: `Selected: ${key}` })}>
        <div className="p-8 bg-base-200 rounded-lg text-center cursor-context-menu">
          Right-click for menu with sections
        </div>
      </ContextMenu>
    </Demo>
  )
}

export function SubmenuDemo() {
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

  return (
    <Demo>
      <ContextMenu items={items} onSelect={(key) => notification.info({ message: `Selected: ${key}` })}>
        <div className="p-8 bg-base-200 rounded-lg text-center cursor-context-menu">
          Right-click for nested menu
        </div>
      </ContextMenu>
    </Demo>
  )
}

export function DisabledDemo() {
  const items = [
    { key: 'copy', label: 'Copy' },
    { key: 'paste', label: 'Paste', disabled: true },
    { key: 'cut', label: 'Cut' },
    { key: 'delete', label: 'Delete', danger: true, disabled: true },
  ]

  return (
    <Demo>
      <ContextMenu items={items} onSelect={(key) => notification.info({ message: `Selected: ${key}` })}>
        <div className="p-8 bg-base-200 rounded-lg text-center cursor-context-menu">
          Right-click (some items disabled)
        </div>
      </ContextMenu>
    </Demo>
  )
}
