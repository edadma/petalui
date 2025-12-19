import { useState } from 'react'
import { TreeSelect } from '@aster-ui/prefixed'
import type { TreeDataNode } from '@aster-ui/prefixed'
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

// @example-imports: { TreeSelect } from 'asterui'
// @example-imports: type { TreeDataNode } from 'asterui'
// @example-imports: { useState } from 'react'
export function BasicDemo() {
  // @example-include
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

  const [value, setValue] = useState<string | undefined>()
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <TreeSelect
        treeData={basicTreeData}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="Select an item"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { TreeSelect } from 'asterui'
// @example-imports: type { TreeDataNode } from 'asterui'
// @example-imports: { useState } from 'react'
export function MultipleDemo() {
  // @example-include
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

  const [value, setValue] = useState<string[]>([])
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <TreeSelect
        treeData={categoriesData}
        value={value}
        onChange={(val) => setValue(val as string[])}
        placeholder="Select items"
        multiple
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { TreeSelect } from 'asterui'
// @example-imports: type { TreeDataNode } from 'asterui'
// @example-imports: { useState } from 'react'
export function CheckableDemo() {
  // @example-include
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

  const [value, setValue] = useState<string[]>([])
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <TreeSelect
        treeData={categoriesData}
        value={value}
        onChange={(val) => setValue(val as string[])}
        placeholder="Check items"
        treeCheckable
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { TreeSelect } from 'asterui'
// @example-imports: type { TreeDataNode } from 'asterui'
// @example-imports: { useState } from 'react'
export function SearchableDemo() {
  // @example-include
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

  const [value, setValue] = useState<string | undefined>()
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <TreeSelect
        treeData={categoriesData}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="Search and select"
        showSearch
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { TreeSelect } from 'asterui'
// @example-imports: type { TreeDataNode } from 'asterui'
export function SizesDemo() {
  // @example-include
  const simpleData: TreeDataNode[] = [
    { key: 'opt1', title: 'Option 1' },
    { key: 'opt2', title: 'Option 2' },
    { key: 'opt3', title: 'Option 3' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div className="flex flex-col gap-2">
        <TreeSelect treeData={simpleData} size="xs" placeholder="Extra small" />
        <TreeSelect treeData={simpleData} size="sm" placeholder="Small" />
        <TreeSelect treeData={simpleData} size="md" placeholder="Medium" />
        <TreeSelect treeData={simpleData} size="lg" placeholder="Large" />
        <TreeSelect treeData={simpleData} size="xl" placeholder="Extra large" />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { TreeSelect } from 'asterui'
// @example-imports: type { TreeDataNode } from 'asterui'
export function StatusDemo() {
  // @example-include
  const simpleData: TreeDataNode[] = [
    { key: 'opt1', title: 'Option 1' },
    { key: 'opt2', title: 'Option 2' },
    { key: 'opt3', title: 'Option 3' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div className="flex flex-col gap-2">
        <TreeSelect treeData={simpleData} status="error" placeholder="Error state" />
        <TreeSelect treeData={simpleData} status="warning" placeholder="Warning state" />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { TreeSelect } from 'asterui'
// @example-imports: type { TreeDataNode } from 'asterui'
// @example-imports: { useState } from 'react'
export function AsyncLoadDemo() {
  // @example-include
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
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <TreeSelect
        treeData={treeData}
        loadData={loadData}
        placeholder="Expand to load"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { TreeSelect } from 'asterui'
// @example-imports: type { TreeDataNode } from 'asterui'
// @example-imports: { useState } from 'react'
export function MaxTagDemo() {
  // @example-include
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

  const [value, setValue] = useState<string[]>([])
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <TreeSelect
        treeData={categoriesData}
        value={value}
        onChange={(val) => setValue(val as string[])}
        placeholder="Select items"
        treeCheckable
        maxTagCount={2}
        maxTagPlaceholder={(omitted) => `+${omitted.length} more...`}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { TreeSelect } from 'asterui'
// @example-imports: type { TreeDataNode } from 'asterui'
export function TreeLineDemo() {
  // @example-include
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
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <TreeSelect
        treeData={basicTreeData}
        placeholder="With tree lines"
        treeLine
        treeDefaultExpandAll
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { TreeSelect } from 'asterui'
// @example-imports: type { TreeDataNode } from 'asterui'
// @example-imports: { useState } from 'react'
export function DisabledItemsDemo() {
  // @example-include
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
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <TreeSelect
        treeData={treeDataWithDisabled}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="Select an item"
      />
      {/* @example-return-end */}
    </Demo>
  )
}
