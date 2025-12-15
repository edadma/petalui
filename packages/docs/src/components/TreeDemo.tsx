import React, { useState } from 'react'
import { Tree } from 'asterui'
import type { TreeDataNode } from 'asterui'
import { FolderIcon, DocumentIcon } from '@aster-ui/icons/solid'
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

export function BasicDemo() {
  return (
    <Demo>
      <Tree treeData={basicTreeData} defaultExpandedKeys={['0', '0-0']} />
    </Demo>
  )
}

export function CheckableDemo() {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])

  return (
    <Demo>
      <Tree
        treeData={basicTreeData}
        checkable
        checkedKeys={checkedKeys}
        onCheck={setCheckedKeys}
        defaultExpandedKeys={['0', '0-0', '0-1']}
      />
      <p className="mt-4 text-sm">Checked: {checkedKeys.join(', ') || 'None'}</p>
    </Demo>
  )
}

export function SelectableDemo() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  return (
    <Demo>
      <Tree
        treeData={basicTreeData}
        selectable
        selectedKeys={selectedKeys}
        onSelect={setSelectedKeys}
        defaultExpandedKeys={['0', '0-0', '0-1']}
      />
      <p className="mt-4 text-sm">Selected: {selectedKeys.join(', ') || 'None'}</p>
    </Demo>
  )
}

export function MultipleDemo() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  return (
    <Demo>
      <Tree
        treeData={basicTreeData}
        selectable
        multiple
        selectedKeys={selectedKeys}
        onSelect={setSelectedKeys}
        defaultExpandedKeys={['0', '0-0', '0-1']}
      />
    </Demo>
  )
}

export function ShowLineDemo() {
  return (
    <Demo>
      <Tree
        treeData={fileTreeData}
        showLine
        defaultExpandedKeys={['src', 'components']}
      />
    </Demo>
  )
}

export function ShowIconDemo() {
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

  return (
    <Demo>
      <Tree treeData={treeDataWithIcons} showIcon defaultExpandedKeys={['src']} />
    </Demo>
  )
}

export function CompoundDemo() {
  return (
    <Demo>
      <Tree defaultExpandedKeys={['parent']}>
        <Tree.Node key="parent" title="Parent Node">
          <Tree.Node key="child-1" title="Child Node 1">
            <Tree.Node key="leaf-1" title="Leaf Node 1" />
            <Tree.Node key="leaf-2" title="Leaf Node 2" />
          </Tree.Node>
          <Tree.Node key="child-2" title="Child Node 2" />
        </Tree.Node>
      </Tree>
    </Demo>
  )
}

export function CheckboxColorsDemo() {
  return (
    <Demo>
      <Tree
        treeData={basicTreeData}
        checkable
        checkboxColor="success"
        checkboxSize="md"
        defaultExpandedKeys={['0']}
      />
    </Demo>
  )
}

export function CheckStrictlyDemo() {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])

  return (
    <Demo>
      <Tree
        treeData={basicTreeData}
        checkable
        checkStrictly
        checkedKeys={checkedKeys}
        onCheck={setCheckedKeys}
        defaultExpandedKeys={['0']}
      />
    </Demo>
  )
}

export function AsyncLoadDemo() {
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

  return (
    <Demo>
      <Tree treeData={treeData} loadData={loadData} />
    </Demo>
  )
}
