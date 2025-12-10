import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { TreeSelect } from 'asterui'
import type { TreeDataNode } from 'asterui'
import { CheckIconSvg } from './icons'

const basicTreeData: TreeDataNode[] = [
  {
    key: 'parent',
    title: 'Parent Node',
    children: [
      {
        key: 'child1',
        title: 'Child Node 1',
        children: [
          { key: 'leaf1', title: 'Leaf 1' },
          { key: 'leaf2', title: 'Leaf 2' },
        ],
      },
      {
        key: 'child2',
        title: 'Child Node 2',
        children: [{ key: 'leaf3', title: 'Leaf 3' }],
      },
    ],
  },
]

const categoriesData: TreeDataNode[] = [
  {
    key: 'electronics',
    title: 'Electronics',
    children: [
      {
        key: 'phones',
        title: 'Phones',
        children: [
          { key: 'iphone', title: 'iPhone' },
          { key: 'samsung', title: 'Samsung' },
          { key: 'pixel', title: 'Pixel' },
        ],
      },
      {
        key: 'laptops',
        title: 'Laptops',
        children: [
          { key: 'macbook', title: 'MacBook' },
          { key: 'thinkpad', title: 'ThinkPad' },
        ],
      },
    ],
  },
  {
    key: 'clothing',
    title: 'Clothing',
    children: [
      { key: 'shirts', title: 'Shirts' },
      { key: 'pants', title: 'Pants' },
      { key: 'shoes', title: 'Shoes' },
    ],
  },
]

const simpleData: TreeDataNode[] = [
  { key: 'opt1', title: 'Option 1' },
  { key: 'opt2', title: 'Option 2' },
  { key: 'opt3', title: 'Option 3' },
]

// Basic demo
function BasicDemo() {
  const [value, setValue] = useState<string | undefined>()

  return (
    <div className="w-64">
      <TreeSelect
        treeData={basicTreeData}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="Select an item"
        className="w-full"
      />
      <p className="mt-2 text-sm">Selected: {value || 'None'}</p>
    </div>
  )
}

// Multiple selection demo
function MultipleDemo() {
  const [value, setValue] = useState<string[]>([])

  return (
    <div className="w-80">
      <TreeSelect
        treeData={categoriesData}
        value={value}
        onChange={(val) => setValue(val as string[])}
        placeholder="Select items"
        multiple
        className="w-full"
      />
      <p className="mt-2 text-sm">Selected: {value.join(', ') || 'None'}</p>
    </div>
  )
}

// Checkable demo
function CheckableDemo() {
  const [value, setValue] = useState<string[]>([])

  return (
    <div className="w-80">
      <TreeSelect
        treeData={categoriesData}
        value={value}
        onChange={(val) => setValue(val as string[])}
        placeholder="Check items"
        treeCheckable
        className="w-full"
      />
      <p className="mt-2 text-sm">Checked: {value.join(', ') || 'None'}</p>
    </div>
  )
}

// Searchable demo
function SearchableDemo() {
  const [value, setValue] = useState<string | undefined>()

  return (
    <div className="w-64">
      <TreeSelect
        treeData={categoriesData}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="Search and select"
        showSearch
        className="w-full"
      />
    </div>
  )
}

// Sizes demo
function SizesDemo() {
  return (
    <div className="flex flex-col gap-2 w-64">
      <TreeSelect treeData={simpleData} size="xs" placeholder="Extra small" />
      <TreeSelect treeData={simpleData} size="sm" placeholder="Small" />
      <TreeSelect treeData={simpleData} size="md" placeholder="Medium" />
      <TreeSelect treeData={simpleData} size="lg" placeholder="Large" />
      <TreeSelect treeData={simpleData} size="xl" placeholder="Extra large" />
    </div>
  )
}

// Status demo
function StatusDemo() {
  return (
    <div className="flex flex-col gap-2 w-64">
      <TreeSelect treeData={simpleData} status="error" placeholder="Error state" />
      <TreeSelect treeData={simpleData} status="warning" placeholder="Warning state" />
    </div>
  )
}

// Async loading demo
function AsyncLoadDemo() {
  const [treeData, setTreeData] = useState<TreeDataNode[]>([
    { key: 'region1', title: 'Region 1' },
    { key: 'region2', title: 'Region 2' },
  ])

  const loadData = async (node: TreeDataNode) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setTreeData((prev) => {
      const updateNode = (nodes: TreeDataNode[]): TreeDataNode[] =>
        nodes.map((n) =>
          n.key === node.key
            ? {
                ...n,
                children: [
                  { key: `${n.key}-1`, title: 'Child 1', isLeaf: true },
                  { key: `${n.key}-2`, title: 'Child 2', isLeaf: true },
                ],
              }
            : { ...n, children: n.children ? updateNode(n.children) : undefined }
        )
      return updateNode(prev)
    })
  }

  return (
    <div className="w-64">
      <TreeSelect
        treeData={treeData}
        loadData={loadData}
        placeholder="Expand to load"
        className="w-full"
      />
    </div>
  )
}

// Max tag count demo
function MaxTagDemo() {
  const [value, setValue] = useState<string[]>([])

  return (
    <div className="w-80">
      <TreeSelect
        treeData={categoriesData}
        value={value}
        onChange={(val) => setValue(val as string[])}
        placeholder="Select items"
        treeCheckable
        maxTagCount={2}
        maxTagPlaceholder={(omitted) => `+${omitted.length} more...`}
        className="w-full"
      />
    </div>
  )
}

// Tree line demo
function TreeLineDemo() {
  return (
    <div className="w-64">
      <TreeSelect
        treeData={basicTreeData}
        placeholder="With tree lines"
        treeLine
        treeDefaultExpandAll
        className="w-full"
      />
    </div>
  )
}

// Disabled items demo
function DisabledItemsDemo() {
  const [value, setValue] = useState<string | undefined>()

  const treeDataWithDisabled: TreeDataNode[] = [
    {
      key: 'parent',
      title: 'Available Parent',
      children: [
        { key: 'child1', title: 'Available Child' },
        { key: 'child2', title: 'Disabled Child', disabled: true },
        { key: 'child3', title: 'Another Available' },
      ],
    },
  ]

  return (
    <div className="w-64">
      <TreeSelect
        treeData={treeDataWithDisabled}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="Select an item"
        className="w-full"
      />
    </div>
  )
}

const statefulDemos: Record<string, React.FC> = {
  basic: BasicDemo,
  multiple: MultipleDemo,
  checkable: CheckableDemo,
  searchable: SearchableDemo,
  sizes: SizesDemo,
  status: StatusDemo,
  'async-load': AsyncLoadDemo,
  'max-tag': MaxTagDemo,
  'tree-line': TreeLineDemo,
  'disabled-items': DisabledItemsDemo,
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll<HTMLElement>('.demo-container').forEach((container) => {
    const example = container.dataset.example
    if (example && statefulDemos[example]) {
      const root = createRoot(container)
      const Component = statefulDemos[example]
      root.render(<Component />)
    }
  })
})

// Copy button functionality
document.querySelectorAll('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const code = btn.getAttribute('data-code')
    if (code) {
      await navigator.clipboard.writeText(code)
      const originalHTML = btn.innerHTML
      btn.innerHTML = CheckIconSvg
      setTimeout(() => {
        btn.innerHTML = originalHTML
      }, 2000)
    }
  })
})
