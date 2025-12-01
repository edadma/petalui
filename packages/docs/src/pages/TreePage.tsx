import { useState } from 'react'
import { Tree, Masonry } from '@edadma/bloomui'
import type { TreeDataNode } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const treeApi: ApiProperty[] = [
  {
    property: 'treeData',
    description: 'Tree data structure',
    type: 'TreeDataNode[]',
    default: '[]',
  },
  {
    property: 'checkable',
    description: 'Show checkboxes on nodes',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'selectable',
    description: 'Allow node selection',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'multiple',
    description: 'Allow multiple selection',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'defaultExpandAll',
    description: 'Expand all nodes by default',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'defaultExpandedKeys',
    description: 'Initially expanded node keys',
    type: 'string[]',
    default: '[]',
  },
  {
    property: 'expandedKeys',
    description: 'Controlled expanded keys',
    type: 'string[]',
  },
  {
    property: 'defaultSelectedKeys',
    description: 'Initially selected node keys',
    type: 'string[]',
    default: '[]',
  },
  {
    property: 'selectedKeys',
    description: 'Controlled selected keys',
    type: 'string[]',
  },
  {
    property: 'defaultCheckedKeys',
    description: 'Initially checked node keys',
    type: 'string[]',
    default: '[]',
  },
  {
    property: 'checkedKeys',
    description: 'Controlled checked keys',
    type: 'string[]',
  },
  {
    property: 'onExpand',
    description: 'Callback when node expands/collapses',
    type: '(expandedKeys, info) => void',
  },
  {
    property: 'onSelect',
    description: 'Callback when node is selected',
    type: '(selectedKeys, info) => void',
  },
  {
    property: 'onCheck',
    description: 'Callback when node is checked',
    type: '(checkedKeys, info) => void',
  },
  {
    property: 'showLine',
    description: 'Show connecting lines',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'showIcon',
    description: 'Show custom icons',
    type: 'boolean',
    default: 'false',
  },
]

const nodeApi: ApiProperty[] = [
  {
    property: 'key',
    description: 'Unique identifier for the node',
    type: 'string',
  },
  {
    property: 'title',
    description: 'Display title',
    type: 'ReactNode',
  },
  {
    property: 'children',
    description: 'Child nodes',
    type: 'TreeDataNode[]',
  },
  {
    property: 'disabled',
    description: 'Disable the node',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'disableCheckbox',
    description: 'Disable the checkbox only',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'selectable',
    description: 'Whether the node is selectable',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'icon',
    description: 'Custom icon',
    type: 'ReactNode',
  },
  {
    property: 'isLeaf',
    description: 'Force node to be a leaf',
    type: 'boolean',
  },
]

const FolderIcon = () => (
  <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
  </svg>
)

const FileIcon = () => (
  <svg className="w-4 h-4 text-info" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
  </svg>
)

const basicTreeData: TreeDataNode[] = [
  {
    key: 'parent-1',
    title: 'Parent 1',
    children: [
      { key: 'child-1-1', title: 'Child 1-1' },
      { key: 'child-1-2', title: 'Child 1-2' },
      {
        key: 'child-1-3',
        title: 'Child 1-3',
        children: [
          { key: 'grandchild-1', title: 'Grandchild 1' },
          { key: 'grandchild-2', title: 'Grandchild 2' },
        ],
      },
    ],
  },
  {
    key: 'parent-2',
    title: 'Parent 2',
    children: [
      { key: 'child-2-1', title: 'Child 2-1' },
      { key: 'child-2-2', title: 'Child 2-2' },
    ],
  },
  {
    key: 'parent-3',
    title: 'Parent 3',
  },
]

const fileTreeData: TreeDataNode[] = [
  {
    key: 'src',
    title: 'src',
    icon: <FolderIcon />,
    children: [
      {
        key: 'components',
        title: 'components',
        icon: <FolderIcon />,
        children: [
          { key: 'Button.tsx', title: 'Button.tsx', icon: <FileIcon />, isLeaf: true },
          { key: 'Input.tsx', title: 'Input.tsx', icon: <FileIcon />, isLeaf: true },
          { key: 'Modal.tsx', title: 'Modal.tsx', icon: <FileIcon />, isLeaf: true },
        ],
      },
      {
        key: 'utils',
        title: 'utils',
        icon: <FolderIcon />,
        children: [
          { key: 'helpers.ts', title: 'helpers.ts', icon: <FileIcon />, isLeaf: true },
          { key: 'constants.ts', title: 'constants.ts', icon: <FileIcon />, isLeaf: true },
        ],
      },
      { key: 'index.ts', title: 'index.ts', icon: <FileIcon />, isLeaf: true },
    ],
  },
  { key: 'package.json', title: 'package.json', icon: <FileIcon />, isLeaf: true },
  { key: 'README.md', title: 'README.md', icon: <FileIcon />, isLeaf: true },
]

const disabledTreeData: TreeDataNode[] = [
  {
    key: 'node-1',
    title: 'Node 1',
    children: [
      { key: 'node-1-1', title: 'Node 1-1' },
      { key: 'node-1-2', title: 'Node 1-2 (disabled)', disabled: true },
    ],
  },
  {
    key: 'node-2',
    title: 'Node 2 (disabled)',
    disabled: true,
    children: [
      { key: 'node-2-1', title: 'Node 2-1' },
    ],
  },
  {
    key: 'node-3',
    title: 'Node 3',
  },
]

export function TreePage() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['parent-1'])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Tree</h1>
        <p className="text-base-content/70">
          Hierarchical tree structure with expandable nodes, selection, and checkbox support.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Tree"
          description="Simple expandable tree structure."
          code={`import React from 'react'
import { Tree } from '@edadma/bloomui'
import type { TreeDataNode } from '@edadma/bloomui'

const App: React.FC = () => {
  const treeData: TreeDataNode[] = [
    {
      key: 'parent-1',
      title: 'Parent 1',
      children: [
        { key: 'child-1-1', title: 'Child 1-1' },
        { key: 'child-1-2', title: 'Child 1-2' },
        {
          key: 'child-1-3',
          title: 'Child 1-3',
          children: [
            { key: 'grandchild-1', title: 'Grandchild 1' },
            { key: 'grandchild-2', title: 'Grandchild 2' },
          ],
        },
      ],
    },
    {
      key: 'parent-2',
      title: 'Parent 2',
      children: [
        { key: 'child-2-1', title: 'Child 2-1' },
        { key: 'child-2-2', title: 'Child 2-2' },
      ],
    },
    { key: 'parent-3', title: 'Parent 3' },
  ]

  return <Tree treeData={treeData} defaultExpandedKeys={['parent-1']} />
}

export default App`}
        >
          <div className="w-72">
            <Tree treeData={basicTreeData} defaultExpandedKeys={['parent-1']} />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Controlled Selection"
          description="Tree with controlled selection state."
          code={`import React, { useState } from 'react'
import { Tree } from '@edadma/bloomui'
import type { TreeDataNode } from '@edadma/bloomui'

const App: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const treeData: TreeDataNode[] = [
    {
      key: 'parent-1',
      title: 'Parent 1',
      children: [
        { key: 'child-1-1', title: 'Child 1-1' },
        { key: 'child-1-2', title: 'Child 1-2' },
      ],
    },
    { key: 'parent-2', title: 'Parent 2' },
  ]

  return (
    <div>
      <Tree
        treeData={treeData}
        selectedKeys={selectedKeys}
        onSelect={(keys) => setSelectedKeys(keys)}
        defaultExpandAll
      />
      {selectedKeys.length > 0 && (
        <p className="mt-2 text-sm">Selected: {selectedKeys.join(', ')}</p>
      )}
    </div>
  )
}

export default App`}
        >
          <div className="w-72">
            <Tree
              treeData={basicTreeData}
              selectedKeys={selectedKeys}
              onSelect={(keys) => setSelectedKeys(keys)}
              defaultExpandAll
            />
            {selectedKeys.length > 0 && (
              <p className="mt-2 text-sm text-base-content/70">
                Selected: {selectedKeys.join(', ')}
              </p>
            )}
          </div>
        </ExampleSection>

        <ExampleSection
          title="Checkable Tree"
          description="Tree with checkbox selection. Parent nodes auto-check when all children are checked."
          code={`import React, { useState } from 'react'
import { Tree } from '@edadma/bloomui'
import type { TreeDataNode } from '@edadma/bloomui'

const App: React.FC = () => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])

  const treeData: TreeDataNode[] = [
    {
      key: 'parent-1',
      title: 'Parent 1',
      children: [
        { key: 'child-1-1', title: 'Child 1-1' },
        { key: 'child-1-2', title: 'Child 1-2' },
      ],
    },
    { key: 'parent-2', title: 'Parent 2' },
  ]

  return (
    <div>
      <Tree
        treeData={treeData}
        checkable
        checkedKeys={checkedKeys}
        onCheck={(keys) => setCheckedKeys(keys)}
        defaultExpandAll
      />
      {checkedKeys.length > 0 && (
        <p className="mt-2 text-sm">Checked: {checkedKeys.length} items</p>
      )}
    </div>
  )
}

export default App`}
        >
          <div className="w-72">
            <Tree
              treeData={basicTreeData}
              checkable
              checkedKeys={checkedKeys}
              onCheck={(keys) => setCheckedKeys(keys)}
              defaultExpandAll
            />
            {checkedKeys.length > 0 && (
              <p className="mt-2 text-sm text-base-content/70">
                Checked: {checkedKeys.length} items
              </p>
            )}
          </div>
        </ExampleSection>

        <ExampleSection
          title="Controlled Expansion"
          description="Control which nodes are expanded."
          code={`import React, { useState } from 'react'
import { Tree } from '@edadma/bloomui'
import type { TreeDataNode } from '@edadma/bloomui'

const App: React.FC = () => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['parent-1'])

  const treeData: TreeDataNode[] = [
    {
      key: 'parent-1',
      title: 'Parent 1',
      children: [
        { key: 'child-1-1', title: 'Child 1-1' },
        { key: 'child-1-2', title: 'Child 1-2' },
      ],
    },
    {
      key: 'parent-2',
      title: 'Parent 2',
      children: [
        { key: 'child-2-1', title: 'Child 2-1' },
      ],
    },
  ]

  return (
    <div>
      <Tree
        treeData={treeData}
        expandedKeys={expandedKeys}
        onExpand={(keys) => setExpandedKeys(keys)}
      />
      <p className="mt-2 text-sm">Expanded: {expandedKeys.join(', ') || 'none'}</p>
    </div>
  )
}

export default App`}
        >
          <div className="w-72">
            <Tree
              treeData={basicTreeData}
              expandedKeys={expandedKeys}
              onExpand={(keys) => setExpandedKeys(keys)}
            />
            <p className="mt-2 text-sm text-base-content/70">
              Expanded: {expandedKeys.join(', ') || 'none'}
            </p>
          </div>
        </ExampleSection>

        <ExampleSection
          title="With Icons"
          description="Tree with custom icons for files and folders."
          code={`import React from 'react'
import { Tree } from '@edadma/bloomui'
import type { TreeDataNode } from '@edadma/bloomui'

const FolderIcon = () => (
  <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
  </svg>
)

const FileIcon = () => (
  <svg className="w-4 h-4 text-info" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
  </svg>
)

const App: React.FC = () => {
  const treeData: TreeDataNode[] = [
    {
      key: 'src',
      title: 'src',
      icon: <FolderIcon />,
      children: [
        {
          key: 'components',
          title: 'components',
          icon: <FolderIcon />,
          children: [
            { key: 'Button.tsx', title: 'Button.tsx', icon: <FileIcon />, isLeaf: true },
            { key: 'Input.tsx', title: 'Input.tsx', icon: <FileIcon />, isLeaf: true },
          ],
        },
        { key: 'index.ts', title: 'index.ts', icon: <FileIcon />, isLeaf: true },
      ],
    },
    { key: 'package.json', title: 'package.json', icon: <FileIcon />, isLeaf: true },
  ]

  return <Tree treeData={treeData} showIcon defaultExpandAll />
}

export default App`}
        >
          <div className="w-72">
            <Tree treeData={fileTreeData} showIcon defaultExpandAll />
          </div>
        </ExampleSection>

        <ExampleSection
          title="With Connecting Lines"
          description="Show lines connecting parent and child nodes."
          code={`import React from 'react'
import { Tree } from '@edadma/bloomui'
import type { TreeDataNode } from '@edadma/bloomui'

const App: React.FC = () => {
  const treeData: TreeDataNode[] = [
    {
      key: 'parent-1',
      title: 'Parent 1',
      children: [
        { key: 'child-1-1', title: 'Child 1-1' },
        { key: 'child-1-2', title: 'Child 1-2' },
      ],
    },
    { key: 'parent-2', title: 'Parent 2' },
  ]

  return <Tree treeData={treeData} showLine defaultExpandAll />
}

export default App`}
        >
          <div className="w-72">
            <Tree treeData={basicTreeData} showLine defaultExpandAll />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Disabled Nodes"
          description="Disable specific nodes from selection."
          code={`import React from 'react'
import { Tree } from '@edadma/bloomui'
import type { TreeDataNode } from '@edadma/bloomui'

const App: React.FC = () => {
  const treeData: TreeDataNode[] = [
    {
      key: 'node-1',
      title: 'Node 1',
      children: [
        { key: 'node-1-1', title: 'Node 1-1' },
        { key: 'node-1-2', title: 'Node 1-2 (disabled)', disabled: true },
      ],
    },
    {
      key: 'node-2',
      title: 'Node 2 (disabled)',
      disabled: true,
      children: [
        { key: 'node-2-1', title: 'Node 2-1' },
      ],
    },
    { key: 'node-3', title: 'Node 3' },
  ]

  return <Tree treeData={treeData} checkable defaultExpandAll />
}

export default App`}
        >
          <div className="w-72">
            <Tree treeData={disabledTreeData} checkable defaultExpandAll />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Multiple Selection"
          description="Allow selecting multiple nodes."
          code={`import React, { useState } from 'react'
import { Tree } from '@edadma/bloomui'
import type { TreeDataNode } from '@edadma/bloomui'

const App: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const treeData: TreeDataNode[] = [
    {
      key: 'parent-1',
      title: 'Parent 1',
      children: [
        { key: 'child-1-1', title: 'Child 1-1' },
        { key: 'child-1-2', title: 'Child 1-2' },
      ],
    },
    { key: 'parent-2', title: 'Parent 2' },
  ]

  return (
    <div>
      <Tree
        treeData={treeData}
        multiple
        selectedKeys={selectedKeys}
        onSelect={(keys) => setSelectedKeys(keys)}
        defaultExpandAll
      />
      <p className="mt-2 text-sm">
        Selected: {selectedKeys.length > 0 ? selectedKeys.join(', ') : 'none'}
      </p>
    </div>
  )
}

export default App`}
        >
          <div className="w-72">
            <Tree
              treeData={basicTreeData}
              multiple
              defaultExpandAll
              onSelect={(keys) => console.log('Selected:', keys)}
            />
            <p className="mt-2 text-sm text-base-content/70">
              Click multiple nodes to select them
            </p>
          </div>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Tree" data={treeApi} />
        <ApiTable title="TreeDataNode" data={nodeApi} className="mt-8" />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Tree Features:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Hierarchical data display with expand/collapse</li>
              <li>Single or multiple selection modes</li>
              <li>Checkbox mode with parent-child cascade</li>
              <li>Custom icons for nodes</li>
              <li>Disabled state for nodes</li>
              <li>Controlled or uncontrolled state management</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
