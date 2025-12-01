import { useState } from 'react'
import { Transfer, Masonry } from '@edadma/bloomui'
import type { TransferItem } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const transferApi: ApiProperty[] = [
  {
    property: 'dataSource',
    description: 'Array of items to transfer',
    type: 'TransferItem[]',
    default: '[]',
  },
  {
    property: 'targetKeys',
    description: 'Keys of items in the target list',
    type: 'string[]',
  },
  {
    property: 'defaultTargetKeys',
    description: 'Initial target keys',
    type: 'string[]',
    default: '[]',
  },
  {
    property: 'onChange',
    description: 'Callback when items are transferred',
    type: '(targetKeys, direction, moveKeys) => void',
  },
  {
    property: 'onSelectChange',
    description: 'Callback when selection changes',
    type: '(sourceSelectedKeys, targetSelectedKeys) => void',
  },
  {
    property: 'titles',
    description: 'Titles for source and target lists',
    type: '[ReactNode, ReactNode]',
    default: "['Source', 'Target']",
  },
  {
    property: 'render',
    description: 'Custom render function for items',
    type: '(item) => ReactNode',
  },
  {
    property: 'showSearch',
    description: 'Show search input in lists',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'filterOption',
    description: 'Custom filter function for search',
    type: '(inputValue, item) => boolean',
  },
  {
    property: 'showSelectAll',
    description: 'Show select all checkbox',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'disabled',
    description: 'Disable the component',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'listStyle',
    description: 'Custom style for lists',
    type: 'CSSProperties',
  },
]

const itemApi: ApiProperty[] = [
  {
    property: 'key',
    description: 'Unique identifier',
    type: 'string',
  },
  {
    property: 'title',
    description: 'Display title',
    type: 'ReactNode',
  },
  {
    property: 'description',
    description: 'Additional description',
    type: 'ReactNode',
  },
  {
    property: 'disabled',
    description: 'Disable the item',
    type: 'boolean',
    default: 'false',
  },
]

const basicData: TransferItem[] = Array.from({ length: 10 }, (_, i) => ({
  key: `item-${i + 1}`,
  title: `Item ${i + 1}`,
}))

const userDataSource: TransferItem[] = [
  { key: 'john', title: 'John Smith', description: 'john@example.com' },
  { key: 'jane', title: 'Jane Doe', description: 'jane@example.com' },
  { key: 'bob', title: 'Bob Wilson', description: 'bob@example.com' },
  { key: 'alice', title: 'Alice Brown', description: 'alice@example.com' },
  { key: 'charlie', title: 'Charlie Davis', description: 'charlie@example.com' },
  { key: 'diana', title: 'Diana Miller', description: 'diana@example.com' },
  { key: 'edward', title: 'Edward Lee', description: 'edward@example.com' },
  { key: 'fiona', title: 'Fiona Chen', description: 'fiona@example.com' },
]

const permissionData: TransferItem[] = [
  { key: 'read', title: 'Read' },
  { key: 'write', title: 'Write' },
  { key: 'delete', title: 'Delete' },
  { key: 'admin', title: 'Admin' },
  { key: 'export', title: 'Export' },
  { key: 'import', title: 'Import' },
  { key: 'share', title: 'Share' },
  { key: 'archive', title: 'Archive' },
]

const disabledData: TransferItem[] = [
  { key: 'item-1', title: 'Item 1' },
  { key: 'item-2', title: 'Item 2 (disabled)', disabled: true },
  { key: 'item-3', title: 'Item 3' },
  { key: 'item-4', title: 'Item 4 (disabled)', disabled: true },
  { key: 'item-5', title: 'Item 5' },
  { key: 'item-6', title: 'Item 6' },
]

export function TransferPage() {
  const [basicTarget, setBasicTarget] = useState<string[]>(['item-3', 'item-5'])
  const [userTarget, setUserTarget] = useState<string[]>(['john', 'alice'])
  const [permTarget, setPermTarget] = useState<string[]>(['read'])
  const [searchTarget, setSearchTarget] = useState<string[]>([])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Transfer</h1>
        <p className="text-base-content/70">
          Double-column transfer choice box for moving items between source and target lists.
        </p>
      </div>

      <Masonry columns={{ xs: 1 }} gap={4}>
        <ExampleSection
          title="Basic Transfer"
          description="Simple transfer between two lists."
          code={`import React, { useState } from 'react'
import { Transfer } from '@edadma/bloomui'
import type { TransferItem } from '@edadma/bloomui'

const App: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>(['item-3', 'item-5'])

  const dataSource: TransferItem[] = Array.from({ length: 10 }, (_, i) => ({
    key: \`item-\${i + 1}\`,
    title: \`Item \${i + 1}\`,
  }))

  return (
    <Transfer
      dataSource={dataSource}
      targetKeys={targetKeys}
      onChange={(keys) => setTargetKeys(keys)}
      titles={['Available', 'Selected']}
    />
  )
}

export default App`}
        >
          <Transfer
            dataSource={basicData}
            targetKeys={basicTarget}
            onChange={(keys) => setBasicTarget(keys)}
            titles={['Available', 'Selected']}
          />
        </ExampleSection>

        <ExampleSection
          title="With Search"
          description="Transfer with search functionality."
          code={`import React, { useState } from 'react'
import { Transfer } from '@edadma/bloomui'
import type { TransferItem } from '@edadma/bloomui'

const App: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>([])

  const userDataSource: TransferItem[] = [
    { key: 'john', title: 'John Smith', description: 'john@example.com' },
    { key: 'jane', title: 'Jane Doe', description: 'jane@example.com' },
    { key: 'bob', title: 'Bob Wilson', description: 'bob@example.com' },
    { key: 'alice', title: 'Alice Brown', description: 'alice@example.com' },
    { key: 'charlie', title: 'Charlie Davis', description: 'charlie@example.com' },
    { key: 'diana', title: 'Diana Miller', description: 'diana@example.com' },
    { key: 'edward', title: 'Edward Lee', description: 'edward@example.com' },
    { key: 'fiona', title: 'Fiona Chen', description: 'fiona@example.com' },
  ]

  return (
    <Transfer
      dataSource={userDataSource}
      targetKeys={targetKeys}
      onChange={(keys) => setTargetKeys(keys)}
      showSearch
      titles={['All Users', 'Selected Users']}
    />
  )
}

export default App`}
        >
          <Transfer
            dataSource={userDataSource}
            targetKeys={searchTarget}
            onChange={(keys) => setSearchTarget(keys)}
            showSearch
            titles={['All Users', 'Selected Users']}
          />
        </ExampleSection>

        <ExampleSection
          title="Custom Render"
          description="Customize how items are rendered."
          code={`import React, { useState } from 'react'
import { Transfer } from '@edadma/bloomui'
import type { TransferItem } from '@edadma/bloomui'

const App: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>(['john', 'alice'])

  const userDataSource: TransferItem[] = [
    { key: 'john', title: 'John Smith', description: 'john@example.com' },
    { key: 'jane', title: 'Jane Doe', description: 'jane@example.com' },
    { key: 'bob', title: 'Bob Wilson', description: 'bob@example.com' },
    { key: 'alice', title: 'Alice Brown', description: 'alice@example.com' },
    { key: 'charlie', title: 'Charlie Davis', description: 'charlie@example.com' },
    { key: 'diana', title: 'Diana Miller', description: 'diana@example.com' },
    { key: 'edward', title: 'Edward Lee', description: 'edward@example.com' },
    { key: 'fiona', title: 'Fiona Chen', description: 'fiona@example.com' },
  ]

  return (
    <Transfer
      dataSource={userDataSource}
      targetKeys={targetKeys}
      onChange={(keys) => setTargetKeys(keys)}
      render={(item) => (
        <div>
          <div className="font-medium">{item.title}</div>
          {item.description && (
            <div className="text-xs text-base-content/50">{item.description}</div>
          )}
        </div>
      )}
      titles={['All Users', 'Team Members']}
      listStyle={{ height: 350 }}
    />
  )
}

export default App`}
        >
          <Transfer
            dataSource={userDataSource}
            targetKeys={userTarget}
            onChange={(keys) => setUserTarget(keys)}
            render={(item) => (
              <div>
                <div className="font-medium">{item.title}</div>
                {item.description && (
                  <div className="text-xs text-base-content/50">{item.description}</div>
                )}
              </div>
            )}
            titles={['All Users', 'Team Members']}
            listStyle={{ height: 350 }}
          />
        </ExampleSection>

        <ExampleSection
          title="Permissions Example"
          description="Assign permissions using transfer."
          code={`import React, { useState } from 'react'
import { Transfer } from '@edadma/bloomui'
import type { TransferItem } from '@edadma/bloomui'

const App: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>(['read'])

  const permissionData: TransferItem[] = [
    { key: 'read', title: 'Read' },
    { key: 'write', title: 'Write' },
    { key: 'delete', title: 'Delete' },
    { key: 'admin', title: 'Admin' },
    { key: 'export', title: 'Export' },
    { key: 'import', title: 'Import' },
    { key: 'share', title: 'Share' },
    { key: 'archive', title: 'Archive' },
  ]

  return (
    <Transfer
      dataSource={permissionData}
      targetKeys={targetKeys}
      onChange={(keys) => setTargetKeys(keys)}
      titles={['Available Permissions', 'Granted Permissions']}
    />
  )
}

export default App`}
        >
          <Transfer
            dataSource={permissionData}
            targetKeys={permTarget}
            onChange={(keys) => setPermTarget(keys)}
            titles={['Available Permissions', 'Granted Permissions']}
          />
        </ExampleSection>

        <ExampleSection
          title="Disabled Items"
          description="Some items cannot be transferred."
          code={`import React from 'react'
import { Transfer } from '@edadma/bloomui'
import type { TransferItem } from '@edadma/bloomui'

const App: React.FC = () => {
  const dataSource: TransferItem[] = [
    { key: 'item-1', title: 'Item 1' },
    { key: 'item-2', title: 'Item 2 (disabled)', disabled: true },
    { key: 'item-3', title: 'Item 3' },
    { key: 'item-4', title: 'Item 4 (disabled)', disabled: true },
    { key: 'item-5', title: 'Item 5' },
    { key: 'item-6', title: 'Item 6' },
  ]

  return (
    <Transfer
      dataSource={dataSource}
      defaultTargetKeys={['item-2']}
      titles={['Source', 'Target']}
    />
  )
}

export default App`}
        >
          <Transfer
            dataSource={disabledData}
            defaultTargetKeys={['item-2']}
            titles={['Source', 'Target']}
          />
        </ExampleSection>

        <ExampleSection
          title="Disabled Transfer"
          description="Entire transfer component disabled."
          code={`import React from 'react'
import { Transfer } from '@edadma/bloomui'
import type { TransferItem } from '@edadma/bloomui'

const App: React.FC = () => {
  const dataSource: TransferItem[] = Array.from({ length: 10 }, (_, i) => ({
    key: \`item-\${i + 1}\`,
    title: \`Item \${i + 1}\`,
  }))

  return (
    <Transfer
      dataSource={dataSource}
      defaultTargetKeys={['item-1', 'item-2']}
      disabled
      titles={['Source', 'Target']}
    />
  )
}

export default App`}
        >
          <Transfer
            dataSource={basicData}
            defaultTargetKeys={['item-1', 'item-2']}
            disabled
            titles={['Source', 'Target']}
          />
        </ExampleSection>

        <ExampleSection
          title="Custom List Style"
          description="Customize the size of transfer lists."
          code={`import React from 'react'
import { Transfer } from '@edadma/bloomui'
import type { TransferItem } from '@edadma/bloomui'

const App: React.FC = () => {
  const userDataSource: TransferItem[] = [
    { key: 'john', title: 'John Smith', description: 'john@example.com' },
    { key: 'jane', title: 'Jane Doe', description: 'jane@example.com' },
    { key: 'bob', title: 'Bob Wilson', description: 'bob@example.com' },
    { key: 'alice', title: 'Alice Brown', description: 'alice@example.com' },
    { key: 'charlie', title: 'Charlie Davis', description: 'charlie@example.com' },
    { key: 'diana', title: 'Diana Miller', description: 'diana@example.com' },
    { key: 'edward', title: 'Edward Lee', description: 'edward@example.com' },
    { key: 'fiona', title: 'Fiona Chen', description: 'fiona@example.com' },
  ]

  return (
    <Transfer
      dataSource={userDataSource}
      listStyle={{ width: 250, height: 350 }}
      showSearch
      titles={['Source', 'Target']}
    />
  )
}

export default App`}
        >
          <Transfer
            dataSource={userDataSource}
            listStyle={{ width: 250, height: 350 }}
            showSearch
            titles={['Source', 'Target']}
          />
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Transfer" data={transferApi} />
        <ApiTable title="TransferItem" data={itemApi} className="mt-8" />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Transfer Use Cases:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Assigning users to groups or teams</li>
              <li>Managing permissions and roles</li>
              <li>Selecting items for bulk operations</li>
              <li>Configuring which columns to display</li>
              <li>Moving items between categories</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
