import { useState } from 'react'
import { Table, Button, Badge } from '@edadma/petalui'
import type { ColumnType } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  age?: number
}

const userData: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', age: 32 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', age: 28 },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', age: 45 },
  { id: '4', name: 'Alice Williams', email: 'alice@example.com', role: 'Editor', status: 'active', age: 35 },
  { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'active', age: 29 },
  { id: '6', name: 'David Lee', email: 'david@example.com', role: 'User', status: 'active', age: 41 },
  { id: '7', name: 'Emma Wilson', email: 'emma@example.com', role: 'Editor', status: 'active', age: 31 },
  { id: '8', name: 'Frank Miller', email: 'frank@example.com', role: 'User', status: 'inactive', age: 38 },
  { id: '9', name: 'Grace Taylor', email: 'grace@example.com', role: 'Admin', status: 'active', age: 42 },
  { id: '10', name: 'Henry Davis', email: 'henry@example.com', role: 'User', status: 'active', age: 27 },
  { id: '11', name: 'Iris Martin', email: 'iris@example.com', role: 'Editor', status: 'active', age: 33 },
  { id: '12', name: 'Jack White', email: 'jack@example.com', role: 'User', status: 'inactive', age: 36 },
]

const basicColumns: ColumnType<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'role', title: 'Role', dataIndex: 'role' },
]

const tableApi: ApiProperty[] = [
  {
    property: 'columns',
    description: 'Table column configuration',
    type: 'ColumnType<T>[]',
  },
  {
    property: 'dataSource',
    description: 'Data to display in table',
    type: 'T[]',
  },
  {
    property: 'rowKey',
    description: 'Unique key for each row',
    type: 'string | ((record: T) => string)',
    default: "'id'",
  },
  {
    property: 'loading',
    description: 'Loading state',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'size',
    description: 'Table size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
  },
  {
    property: 'bordered',
    description: 'Add border around table',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'hoverable',
    description: 'Highlight row on hover',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'striped',
    description: 'Alternating row colors (zebra stripes)',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'pinRows',
    description: 'Pin header rows while scrolling',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'pinCols',
    description: 'Pin columns while scrolling',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'pagination',
    description: 'Pagination configuration or false to disable',
    type: 'false | PaginationConfig',
    default: '{ pageSize: 10 }',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
  {
    property: 'onRow',
    description: 'Row event handlers',
    type: '(record: T, index: number) => HTMLAttributes',
  },
]

const columnTypeApi: ApiProperty[] = [
  {
    property: 'key',
    description: 'Unique key for column',
    type: 'string',
  },
  {
    property: 'title',
    description: 'Column header title',
    type: 'string',
  },
  {
    property: 'dataIndex',
    description: 'Field name in data record',
    type: 'string',
  },
  {
    property: 'render',
    description: 'Custom render function for cell content',
    type: '(value: any, record: T, index: number) => ReactNode',
  },
  {
    property: 'width',
    description: 'Column width',
    type: 'string | number',
  },
  {
    property: 'align',
    description: 'Text alignment',
    type: "'left' | 'center' | 'right'",
  },
  {
    property: 'fixed',
    description: 'Fix column to left or right',
    type: "'left' | 'right'",
  },
  {
    property: 'sorter',
    description: 'Enable sorting or custom sort function',
    type: 'boolean | ((a: T, b: T) => number)',
  },
]

export function TablePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRow, setSelectedRow] = useState<string | null>(null)

  const columnsWithRender: ColumnType<User>[] = [
    { key: 'name', title: 'Name', dataIndex: 'name', width: 150 },
    { key: 'email', title: 'Email', dataIndex: 'email' },
    { key: 'role', title: 'Role', dataIndex: 'role', align: 'center' },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: (value: string) => (
        <Badge type={value === 'active' ? 'success' : 'ghost'} content={value} size="sm" />
      ),
    },
    {
      key: 'actions',
      title: 'Actions',
      align: 'right',
      render: () => (
        <div className="flex gap-2 justify-end">
          <Button size="xs" type="ghost">Edit</Button>
          <Button size="xs" type="ghost">Delete</Button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Table</h1>
        <p className="text-base-content/70">
          Feature-rich table component for displaying tabular data.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Table"
          description="Simple table with default pagination (10 rows per page)."
          code={`import React from 'react'
import { Table } from '@edadma/petalui'
import type { ColumnType } from '@edadma/petalui'

interface User {
  id: string
  name: string
  email: string
  role: string
}

const columns: ColumnType<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'role', title: 'Role', dataIndex: 'role' },
]

const data: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
]

const App: React.FC = () => (
  <Table columns={columns} dataSource={data} />
)

export default App`}
        >
          <Table columns={basicColumns} dataSource={userData.slice(0, 5)} />
        </ExampleSection>

        <ExampleSection
          title="Custom Rendering"
          description="Use render functions for badges, buttons, and custom content."
          code={`import React from 'react'
import { Table, Badge, Button } from '@edadma/petalui'
import type { ColumnType } from '@edadma/petalui'

interface User {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive'
}

const data: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
]

const columns: ColumnType<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    render: (value: string) => (
      <Badge type={value === 'active' ? 'success' : 'ghost'} content={value} />
    ),
  },
  {
    key: 'actions',
    title: 'Actions',
    render: () => (
      <div className="flex gap-2">
        <Button size="xs">Edit</Button>
      </div>
    ),
  },
]

const App: React.FC = () => (
  <Table columns={columns} dataSource={data} pagination={false} />
)

export default App`}
        >
          <Table columns={columnsWithRender} dataSource={userData.slice(0, 4)} pagination={false} />
        </ExampleSection>

        <ExampleSection
          title="Striped Rows"
          description="Zebra striping for better readability."
          code={`import React from 'react'
import { Table } from '@edadma/petalui'
import type { ColumnType } from '@edadma/petalui'

interface User {
  id: string
  name: string
  email: string
  role: string
}

const columns: ColumnType<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'role', title: 'Role', dataIndex: 'role' },
]

const data: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
]

const App: React.FC = () => (
  <Table columns={columns} dataSource={data} striped pagination={false} />
)

export default App`}
        >
          <Table columns={basicColumns} dataSource={userData.slice(0, 5)} striped pagination={false} />
        </ExampleSection>

        <ExampleSection
          title="Bordered Table"
          description="Add borders for a more defined look."
          code={`import React from 'react'
import { Table } from '@edadma/petalui'
import type { ColumnType } from '@edadma/petalui'

interface User {
  id: string
  name: string
  email: string
  role: string
}

const columns: ColumnType<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'role', title: 'Role', dataIndex: 'role' },
]

const data: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
]

const App: React.FC = () => (
  <Table columns={columns} dataSource={data} bordered pagination={false} />
)

export default App`}
        >
          <Table columns={basicColumns} dataSource={userData.slice(0, 5)} bordered pagination={false} />
        </ExampleSection>

        <ExampleSection
          title="Compact Size"
          description="Extra small size for dense data display."
          code={`import React from 'react'
import { Table } from '@edadma/petalui'
import type { ColumnType } from '@edadma/petalui'

interface User {
  id: string
  name: string
  email: string
  role: string
}

const columns: ColumnType<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'role', title: 'Role', dataIndex: 'role' },
]

const data: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
]

const App: React.FC = () => (
  <Table
    columns={columns}
    dataSource={data}
    size="xs"
    striped
    bordered
    pagination={false}
  />
)

export default App`}
        >
          <Table columns={basicColumns} dataSource={userData.slice(0, 5)} size="xs" striped bordered pagination={false} />
        </ExampleSection>

        <ExampleSection
          title="Large Size"
          description="Larger cells for better readability."
          code={`import React from 'react'
import { Table } from '@edadma/petalui'
import type { ColumnType } from '@edadma/petalui'

interface User {
  id: string
  name: string
  email: string
  role: string
}

const columns: ColumnType<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'role', title: 'Role', dataIndex: 'role' },
]

const data: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
]

const App: React.FC = () => (
  <Table columns={columns} dataSource={data} size="lg" pagination={false} />
)

export default App`}
        >
          <Table columns={basicColumns} dataSource={userData.slice(0, 4)} size="lg" pagination={false} />
        </ExampleSection>

        <ExampleSection
          title="Text Alignment"
          description="Control text alignment per column."
          code={`import React from 'react'
import { Table } from '@edadma/petalui'
import type { ColumnType } from '@edadma/petalui'

interface User {
  id: string
  name: string
  role: string
  age: number
}

const columns: ColumnType<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', align: 'left' },
  { key: 'role', title: 'Role', dataIndex: 'role', align: 'center' },
  { key: 'age', title: 'Age', dataIndex: 'age', align: 'right' },
]

const data: User[] = [
  { id: '1', name: 'John Doe', role: 'Admin', age: 32 },
  { id: '2', name: 'Jane Smith', role: 'User', age: 28 },
  { id: '3', name: 'Bob Johnson', role: 'User', age: 45 },
]

const App: React.FC = () => (
  <Table columns={columns} dataSource={data} pagination={false} />
)

export default App`}
        >
          <Table
            columns={[
              { key: 'name', title: 'Name', dataIndex: 'name', align: 'left' },
              { key: 'role', title: 'Role', dataIndex: 'role', align: 'center' },
              { key: 'age', title: 'Age', dataIndex: 'age', align: 'right' },
            ]}
            dataSource={userData.slice(0, 4)}
            pagination={false}
          />
        </ExampleSection>

        <ExampleSection
          title="Column Width"
          description="Set specific widths for columns."
          code={`import React from 'react'
import { Table } from '@edadma/petalui'
import type { ColumnType } from '@edadma/petalui'

interface User {
  id: string
  name: string
  email: string
  role: string
}

const columns: ColumnType<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', width: 150 },
  { key: 'email', title: 'Email', dataIndex: 'email', width: 250 },
  { key: 'role', title: 'Role', dataIndex: 'role', width: 100 },
]

const data: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
]

const App: React.FC = () => (
  <Table columns={columns} dataSource={data} pagination={false} />
)

export default App`}
        >
          <Table
            columns={[
              { key: 'name', title: 'Name', dataIndex: 'name', width: 150 },
              { key: 'email', title: 'Email', dataIndex: 'email', width: 250 },
              { key: 'role', title: 'Role', dataIndex: 'role', width: 100 },
            ]}
            dataSource={userData.slice(0, 4)}
            pagination={false}
          />
        </ExampleSection>

        <ExampleSection
          title="Loading State"
          description="Show loading spinner while data is being fetched."
          code={`import React, { useState } from 'react'
import { Table, Button } from '@edadma/petalui'
import type { ColumnType } from '@edadma/petalui'

interface User {
  id: string
  name: string
  email: string
  role: string
}

const columns: ColumnType<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'role', title: 'Role', dataIndex: 'role' },
]

const data: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
]

const App: React.FC = () => {
  const [loading, setLoading] = useState(false)

  return (
    <div className="space-y-4">
      <Button size="sm" onClick={() => setLoading(!loading)}>
        Toggle Loading
      </Button>
      <Table columns={columns} dataSource={data} loading={loading} />
    </div>
  )
}

export default App`}
        >
          <div className="space-y-4">
            <Button size="sm" onClick={() => setIsLoading(!isLoading)}>
              {isLoading ? 'Hide' : 'Show'} Loading
            </Button>
            <Table columns={basicColumns} dataSource={userData.slice(0, 5)} loading={isLoading} />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Empty State"
          description="Table automatically handles empty data."
          code={`import React from 'react'
import { Table } from '@edadma/petalui'
import type { ColumnType } from '@edadma/petalui'

interface User {
  id: string
  name: string
  email: string
  role: string
}

const columns: ColumnType<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'role', title: 'Role', dataIndex: 'role' },
]

const App: React.FC = () => (
  <Table columns={columns} dataSource={[]} pagination={false} />
)

export default App`}
        >
          <Table columns={basicColumns} dataSource={[]} pagination={false} />
        </ExampleSection>

        <ExampleSection
          title="Row Click Handler"
          description="Handle row clicks with onRow callback."
          code={`import React, { useState } from 'react'
import { Table } from '@edadma/petalui'
import type { ColumnType } from '@edadma/petalui'

interface User {
  id: string
  name: string
  email: string
  role: string
}

const columns: ColumnType<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'role', title: 'Role', dataIndex: 'role' },
]

const data: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
]

const App: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      {selected && <div className="text-sm">Selected: {selected}</div>}
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        onRow={(record) => ({
          onClick: () => setSelected(record.id),
          className: selected === record.id ? 'bg-primary/10' : '',
          style: { cursor: 'pointer' },
        })}
      />
    </div>
  )
}

export default App`}
        >
          <div className="space-y-4">
            {selectedRow && <div className="text-sm">Selected: {selectedRow}</div>}
            <Table
              columns={basicColumns}
              dataSource={userData.slice(0, 5)}
              pagination={false}
              onRow={(record) => ({
                onClick: () => setSelectedRow(record.id),
                className: selectedRow === record.id ? 'bg-primary/10' : '',
                style: { cursor: 'pointer' },
              })}
            />
          </div>
        </ExampleSection>

        <ExampleSection
          title="No Hover Effect"
          description="Disable row hover highlighting."
          code={`import React from 'react'
import { Table } from '@edadma/petalui'
import type { ColumnType } from '@edadma/petalui'

interface User {
  id: string
  name: string
  email: string
  role: string
}

const columns: ColumnType<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'role', title: 'Role', dataIndex: 'role' },
]

const data: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
]

const App: React.FC = () => (
  <Table
    columns={columns}
    dataSource={data}
    hoverable={false}
    pagination={false}
  />
)

export default App`}
        >
          <Table columns={basicColumns} dataSource={userData.slice(0, 4)} hoverable={false} pagination={false} />
        </ExampleSection>

        <ExampleSection
          title="Custom Page Size"
          description="Control pagination page size."
          code={`import React from 'react'
import { Table } from '@edadma/petalui'
import type { ColumnType } from '@edadma/petalui'

interface User {
  id: string
  name: string
  email: string
  role: string
}

const columns: ColumnType<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'role', title: 'Role', dataIndex: 'role' },
]

const data: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  { id: '4', name: 'Alice Williams', email: 'alice@example.com', role: 'Editor' },
  { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' },
  { id: '6', name: 'David Lee', email: 'david@example.com', role: 'User' },
  { id: '7', name: 'Emma Wilson', email: 'emma@example.com', role: 'Editor' },
]

const App: React.FC = () => (
  <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
)

export default App`}
        >
          <Table columns={basicColumns} dataSource={userData} pagination={{ pageSize: 5 }} />
        </ExampleSection>

        <ExampleSection
          title="Pinned Header"
          description="Keep header visible while scrolling (don't use bordered prop)."
          code={`import React from 'react'
import { Table } from '@edadma/petalui'
import type { ColumnType } from '@edadma/petalui'

interface User {
  id: string
  name: string
  email: string
  role: string
}

const columns: ColumnType<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'role', title: 'Role', dataIndex: 'role' },
]

const data: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  { id: '4', name: 'Alice Williams', email: 'alice@example.com', role: 'Editor' },
  { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' },
  { id: '6', name: 'David Lee', email: 'david@example.com', role: 'User' },
  { id: '7', name: 'Emma Wilson', email: 'emma@example.com', role: 'Editor' },
  { id: '8', name: 'Frank Miller', email: 'frank@example.com', role: 'User' },
]

const App: React.FC = () => (
  <div className="max-h-64 overflow-auto border border-base-content/10 rounded-lg">
    <Table
      columns={columns}
      dataSource={data}
      pinRows
      striped
      pagination={false}
    />
  </div>
)

export default App`}
        >
          <div className="max-h-64 overflow-auto border border-base-content/10 rounded-lg">
            <Table columns={basicColumns} dataSource={userData} pinRows striped pagination={false} />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Complete Example"
          description="Combining multiple features together."
          code={`import React from 'react'
import { Table, Badge, Button } from '@edadma/petalui'
import type { ColumnType } from '@edadma/petalui'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

const data: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive' },
  { id: '4', name: 'Alice Williams', email: 'alice@example.com', role: 'Editor', status: 'active' },
  { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'active' },
  { id: '6', name: 'David Lee', email: 'david@example.com', role: 'User', status: 'active' },
]

const columns: ColumnType<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', width: 150 },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'role', title: 'Role', dataIndex: 'role', align: 'center' },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    align: 'center',
    render: (value: string) => (
      <Badge type={value === 'active' ? 'success' : 'ghost'} content={value} size="sm" />
    ),
  },
  {
    key: 'actions',
    title: 'Actions',
    align: 'right',
    render: () => (
      <div className="flex gap-2 justify-end">
        <Button size="xs" type="ghost">Edit</Button>
        <Button size="xs" type="ghost">Delete</Button>
      </div>
    ),
  },
]

const App: React.FC = () => (
  <Table
    columns={columns}
    dataSource={data}
    size="sm"
    striped
    bordered
    pagination={{ pageSize: 5 }}
  />
)

export default App`}
        >
          <Table
            columns={columnsWithRender}
            dataSource={userData}
            size="sm"
            striped
            bordered
            pagination={{ pageSize: 5 }}
          />
        </ExampleSection>
      </div>

      <ApiTable title="Table Props" data={tableApi} />
      <ApiTable title="ColumnType Interface" data={columnTypeApi} />
    </div>
  )
}
