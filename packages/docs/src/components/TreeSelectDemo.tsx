import { useState } from 'react'
import { TreeSelect } from 'asterui'
import type { TreeDataNode } from 'asterui'
import { Demo } from './Demo'

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
      { key: 'child2', title: 'Child Node 2' },
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

export function BasicDemo() {
  const [value, setValue] = useState<string | undefined>()

  return (
    <Demo>
      <TreeSelect
        treeData={basicTreeData}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="Select an item"
      />
    </Demo>
  )
}

export function MultipleDemo() {
  const [value, setValue] = useState<string[]>([])

  return (
    <Demo>
      <TreeSelect
        treeData={categoriesData}
        value={value}
        onChange={(val) => setValue(val as string[])}
        placeholder="Select items"
        multiple
      />
    </Demo>
  )
}

export function CheckableDemo() {
  const [value, setValue] = useState<string[]>([])

  return (
    <Demo>
      <TreeSelect
        treeData={categoriesData}
        value={value}
        onChange={(val) => setValue(val as string[])}
        placeholder="Check items"
        treeCheckable
      />
    </Demo>
  )
}

export function SearchableDemo() {
  const [value, setValue] = useState<string | undefined>()

  return (
    <Demo>
      <TreeSelect
        treeData={categoriesData}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="Search and select"
        showSearch
      />
    </Demo>
  )
}

export function SizesDemo() {
  return (
    <Demo>
      <div className="flex flex-col gap-2">
        <TreeSelect treeData={simpleData} size="xs" placeholder="Extra small" />
        <TreeSelect treeData={simpleData} size="sm" placeholder="Small" />
        <TreeSelect treeData={simpleData} size="md" placeholder="Medium" />
        <TreeSelect treeData={simpleData} size="lg" placeholder="Large" />
        <TreeSelect treeData={simpleData} size="xl" placeholder="Extra large" />
      </div>
    </Demo>
  )
}

export function StatusDemo() {
  return (
    <Demo>
      <div className="flex flex-col gap-2">
        <TreeSelect treeData={simpleData} status="error" placeholder="Error state" />
        <TreeSelect treeData={simpleData} status="warning" placeholder="Warning state" />
      </div>
    </Demo>
  )
}

export function AsyncLoadDemo() {
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
    <Demo>
      <TreeSelect
        treeData={treeData}
        loadData={loadData}
        placeholder="Expand to load"
      />
    </Demo>
  )
}

export function MaxTagDemo() {
  const [value, setValue] = useState<string[]>([])

  return (
    <Demo>
      <TreeSelect
        treeData={categoriesData}
        value={value}
        onChange={(val) => setValue(val as string[])}
        placeholder="Select items"
        treeCheckable
        maxTagCount={2}
        maxTagPlaceholder={(omitted) => `+${omitted.length} more...`}
      />
    </Demo>
  )
}

export function TreeLineDemo() {
  return (
    <Demo>
      <TreeSelect
        treeData={basicTreeData}
        placeholder="With tree lines"
        treeLine
        treeDefaultExpandAll
      />
    </Demo>
  )
}

export function DisabledItemsDemo() {
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
    <Demo>
      <TreeSelect
        treeData={treeDataWithDisabled}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="Select an item"
      />
    </Demo>
  )
}
