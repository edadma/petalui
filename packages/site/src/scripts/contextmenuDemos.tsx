import React from 'react'
import { createRoot } from 'react-dom/client'
import { ContextMenu, notification } from 'asterui'

const BasicDemo = () => (
  <ContextMenu onSelect={(key) => notification.info({ message: `Selected: ${key}` })}>
    <div className="p-8 bg-base-200 rounded-lg text-center cursor-context-menu">
      Right-click here
    </div>
    <ContextMenu.Item itemKey="copy">Copy</ContextMenu.Item>
    <ContextMenu.Item itemKey="paste">Paste</ContextMenu.Item>
    <ContextMenu.Item itemKey="cut">Cut</ContextMenu.Item>
  </ContextMenu>
)

const DataDrivenDemo = () => {
  const items = [
    { key: 'copy', label: 'Copy' },
    { key: 'paste', label: 'Paste' },
    { key: 'cut', label: 'Cut' },
  ]

  return (
    <ContextMenu items={items} onSelect={(key) => notification.info({ message: `Selected: ${key}` })}>
      <div className="p-8 bg-base-200 rounded-lg text-center cursor-context-menu">
        Right-click here
      </div>
    </ContextMenu>
  )
}

const IconsDemo = () => {
  const items = [
    { key: 'edit', label: 'Edit', icon: <span>✏️</span> },
    { key: 'duplicate', label: 'Duplicate', icon: <span>📋</span> },
    { key: 'delete', label: 'Delete', icon: <span>🗑️</span>, danger: true },
  ]

  return (
    <ContextMenu items={items} onSelect={(key) => notification.info({ message: `Selected: ${key}` })}>
      <div className="p-8 bg-base-200 rounded-lg text-center cursor-context-menu">
        Right-click for options
      </div>
    </ContextMenu>
  )
}

const DividersDemo = () => {
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
    <ContextMenu items={items} onSelect={(key) => notification.info({ message: `Selected: ${key}` })}>
      <div className="p-8 bg-base-200 rounded-lg text-center cursor-context-menu">
        Right-click for menu with sections
      </div>
    </ContextMenu>
  )
}

const SubmenuDemo = () => {
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
    <ContextMenu items={items} onSelect={(key) => notification.info({ message: `Selected: ${key}` })}>
      <div className="p-8 bg-base-200 rounded-lg text-center cursor-context-menu">
        Right-click for nested menu
      </div>
    </ContextMenu>
  )
}

const DisabledDemo = () => {
  const items = [
    { key: 'copy', label: 'Copy' },
    { key: 'paste', label: 'Paste', disabled: true },
    { key: 'cut', label: 'Cut' },
    { key: 'delete', label: 'Delete', danger: true, disabled: true },
  ]

  return (
    <ContextMenu items={items} onSelect={(key) => notification.info({ message: `Selected: ${key}` })}>
      <div className="p-8 bg-base-200 rounded-lg text-center cursor-context-menu">
        Right-click (some items disabled)
      </div>
    </ContextMenu>
  )
}

const demos: Record<string, React.FC> = {
  basic: BasicDemo,
  datadriven: DataDrivenDemo,
  icons: IconsDemo,
  dividers: DividersDemo,
  submenu: SubmenuDemo,
  disabled: DisabledDemo,
}

document.querySelectorAll('.demo-container').forEach((container) => {
  const exampleId = container.getAttribute('data-example')
  if (exampleId && demos[exampleId]) {
    const Demo = demos[exampleId]
    createRoot(container).render(<Demo />)
  }
})
