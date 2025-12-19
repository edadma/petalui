import React, { useState } from 'react'
import { Tree } from '@aster-ui/prefixed'
import type { TreeDataNode } from '@aster-ui/prefixed'
import { FolderIcon, DocumentIcon } from '@aster-ui/icons-prefixed/solid'
import { Demo } from './Demo'

const basicTreeData: TreeDataNode[] = [
  {
    key: '0',
    title: 'Parent Node',
    children: [
      {
        key: '0-0',
        title: 'Child Node 1',
        children: [
          { key: '0-0-0', title: 'Leaf Node 1' },
          { key: '0-0-1', title: 'Leaf Node 2' },
        ],
      },
      {
        key: '0-1',
        title: 'Child Node 2',
        children: [{ key: '0-1-0', title: 'Leaf Node 3' }],
      },
    ],
  },
]

const fileTreeData: TreeDataNode[] = [
  {
    key: 'src',
    title: 'src',
    children: [
      {
        key: 'components',
        title: 'components',
        children: [
          { key: 'Button.tsx', title: 'Button.tsx' },
          { key: 'Input.tsx', title: 'Input.tsx' },
        ],
      },
      { key: 'App.tsx', title: 'App.tsx' },
    ],
  },
]

// @example-imports: { Tree } from 'asterui'
// @example-imports: type { TreeDataNode } from 'asterui'
export function BasicDemo() {
  // @example-include
  const basicTreeData: TreeDataNode[] = [
    {
      key: '0',
      title: 'Parent Node',
      children: [
        {
          key: '0-0',
          title: 'Child Node 1',
          children: [
            { key: '0-0-0', title: 'Leaf Node 1' },
            { key: '0-0-1', title: 'Leaf Node 2' },
          ],
        },
        {
          key: '0-1',
          title: 'Child Node 2',
          children: [{ key: '0-1-0', title: 'Leaf Node 3' }],
        },
      ],
    },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Tree treeData={basicTreeData} defaultExpandedKeys={['0', '0-0']} />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Tree } from 'asterui'
// @example-imports: type { TreeDataNode } from 'asterui'
// @example-imports: { useState } from 'react'
export function CheckableDemo() {
  // @example-include
  const basicTreeData: TreeDataNode[] = [
    {
      key: '0',
      title: 'Parent Node',
      children: [
        {
          key: '0-0',
          title: 'Child Node 1',
          children: [
            { key: '0-0-0', title: 'Leaf Node 1' },
            { key: '0-0-1', title: 'Leaf Node 2' },
          ],
        },
        {
          key: '0-1',
          title: 'Child Node 2',
          children: [{ key: '0-1-0', title: 'Leaf Node 3' }],
        },
      ],
    },
  ]

  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Tree
        treeData={basicTreeData}
        checkable
        checkedKeys={checkedKeys}
        onCheck={setCheckedKeys}
        defaultExpandedKeys={['0', '0-0', '0-1']}
      />
      <p className="mt-4 text-sm">Checked: {checkedKeys.join(', ') || 'None'}</p>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Tree } from 'asterui'
// @example-imports: type { TreeDataNode } from 'asterui'
// @example-imports: { useState } from 'react'
export function SelectableDemo() {
  // @example-include
  const basicTreeData: TreeDataNode[] = [
    {
      key: '0',
      title: 'Parent Node',
      children: [
        {
          key: '0-0',
          title: 'Child Node 1',
          children: [
            { key: '0-0-0', title: 'Leaf Node 1' },
            { key: '0-0-1', title: 'Leaf Node 2' },
          ],
        },
        {
          key: '0-1',
          title: 'Child Node 2',
          children: [{ key: '0-1-0', title: 'Leaf Node 3' }],
        },
      ],
    },
  ]

  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Tree
        treeData={basicTreeData}
        selectable
        selectedKeys={selectedKeys}
        onSelect={setSelectedKeys}
        defaultExpandedKeys={['0', '0-0', '0-1']}
      />
      <p className="mt-4 text-sm">Selected: {selectedKeys.join(', ') || 'None'}</p>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Tree } from 'asterui'
// @example-imports: type { TreeDataNode } from 'asterui'
// @example-imports: { useState } from 'react'
export function MultipleDemo() {
  // @example-include
  const basicTreeData: TreeDataNode[] = [
    {
      key: '0',
      title: 'Parent Node',
      children: [
        {
          key: '0-0',
          title: 'Child Node 1',
          children: [
            { key: '0-0-0', title: 'Leaf Node 1' },
            { key: '0-0-1', title: 'Leaf Node 2' },
          ],
        },
        {
          key: '0-1',
          title: 'Child Node 2',
          children: [{ key: '0-1-0', title: 'Leaf Node 3' }],
        },
      ],
    },
  ]

  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Tree
        treeData={basicTreeData}
        selectable
        multiple
        selectedKeys={selectedKeys}
        onSelect={setSelectedKeys}
        defaultExpandedKeys={['0', '0-0', '0-1']}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Tree } from 'asterui'
// @example-imports: type { TreeDataNode } from 'asterui'
export function ShowLineDemo() {
  // @example-include
  const fileTreeData: TreeDataNode[] = [
    {
      key: 'src',
      title: 'src',
      children: [
        {
          key: 'components',
          title: 'components',
          children: [
            { key: 'Button.tsx', title: 'Button.tsx' },
            { key: 'Input.tsx', title: 'Input.tsx' },
          ],
        },
        { key: 'App.tsx', title: 'App.tsx' },
      ],
    },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Tree
        treeData={fileTreeData}
        showLine
        defaultExpandedKeys={['src', 'components']}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Tree } from 'asterui'
// @example-imports: type { TreeDataNode } from 'asterui'
// @example-imports: { FolderIcon, DocumentIcon } from '@aster-ui/icons/solid'
export function ShowIconDemo() {
  // @example-include
  const treeDataWithIcons: TreeDataNode[] = [
    {
      key: 'src',
      title: 'src',
      icon: <FolderIcon size="sm" />,
      children: [
        { key: 'App.tsx', title: 'App.tsx', icon: <DocumentIcon size="sm" /> },
        { key: 'index.tsx', title: 'index.tsx', icon: <DocumentIcon size="sm" /> },
      ],
    },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Tree treeData={treeDataWithIcons} showIcon defaultExpandedKeys={['src']} />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Tree } from 'asterui'
export function CompoundDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Tree defaultExpandedKeys={['parent']}>
        <Tree.Node key="parent" title="Parent Node">
          <Tree.Node key="child-1" title="Child Node 1">
            <Tree.Node key="leaf-1" title="Leaf Node 1" />
            <Tree.Node key="leaf-2" title="Leaf Node 2" />
          </Tree.Node>
          <Tree.Node key="child-2" title="Child Node 2" />
        </Tree.Node>
      </Tree>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Tree } from 'asterui'
// @example-imports: type { TreeDataNode } from 'asterui'
export function CheckboxColorsDemo() {
  // @example-include
  const basicTreeData: TreeDataNode[] = [
    {
      key: '0',
      title: 'Parent Node',
      children: [
        {
          key: '0-0',
          title: 'Child Node 1',
          children: [
            { key: '0-0-0', title: 'Leaf Node 1' },
            { key: '0-0-1', title: 'Leaf Node 2' },
          ],
        },
        {
          key: '0-1',
          title: 'Child Node 2',
          children: [{ key: '0-1-0', title: 'Leaf Node 3' }],
        },
      ],
    },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Tree
        treeData={basicTreeData}
        checkable
        checkboxColor="success"
        checkboxSize="md"
        defaultExpandedKeys={['0']}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Tree } from 'asterui'
// @example-imports: type { TreeDataNode } from 'asterui'
// @example-imports: { useState } from 'react'
export function CheckStrictlyDemo() {
  // @example-include
  const basicTreeData: TreeDataNode[] = [
    {
      key: '0',
      title: 'Parent Node',
      children: [
        {
          key: '0-0',
          title: 'Child Node 1',
          children: [
            { key: '0-0-0', title: 'Leaf Node 1' },
            { key: '0-0-1', title: 'Leaf Node 2' },
          ],
        },
        {
          key: '0-1',
          title: 'Child Node 2',
          children: [{ key: '0-1-0', title: 'Leaf Node 3' }],
        },
      ],
    },
  ]

  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Tree
        treeData={basicTreeData}
        checkable
        checkStrictly
        checkedKeys={checkedKeys}
        onCheck={setCheckedKeys}
        defaultExpandedKeys={['0']}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Tree } from 'asterui'
// @example-imports: type { TreeDataNode } from 'asterui'
// @example-imports: { useState } from 'react'
export function AsyncLoadDemo() {
  // @example-include
  const [treeData, setTreeData] = useState<TreeDataNode[]>([
    { key: '0', title: 'Expand to load' },
    { key: '1', title: 'Expand to load' },
  ])

  const loadData = async (node: TreeDataNode) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    setTreeData(prev => {
      const update = (nodes: TreeDataNode[]): TreeDataNode[] =>
        nodes.map(n => n.key === node.key
          ? { ...n, children: [
              { key: `${n.key}-0`, title: 'Child 1', isLeaf: true },
              { key: `${n.key}-1`, title: 'Child 2', isLeaf: true },
            ]}
          : { ...n, children: n.children ? update(n.children) : undefined }
        )
      return update(prev)
    })
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Tree treeData={treeData} loadData={loadData} />
      {/* @example-return-end */}
    </Demo>
  )
}
