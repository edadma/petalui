import React, { useState } from 'react';
import { Table, Button, Tag, Space } from 'asterui';
import type { ColumnType, ExpandableConfig } from 'asterui';
import { Demo } from './Demo';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  age?: number;
  description?: string;
}

const userData: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', age: 32, description: 'Senior administrator with full system access' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', age: 28, description: 'Regular user account' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', age: 45, description: 'Account currently suspended' },
  { id: '4', name: 'Alice Williams', email: 'alice@example.com', role: 'Editor', status: 'active', age: 35, description: 'Content editor with publishing rights' },
  { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'active', age: 29, description: 'New user account' },
  { id: '6', name: 'David Lee', email: 'david@example.com', role: 'User', status: 'active', age: 41, description: 'Premium user account' },
  { id: '7', name: 'Emma Wilson', email: 'emma@example.com', role: 'Editor', status: 'active', age: 31, description: 'Senior editor' },
  { id: '8', name: 'Frank Miller', email: 'frank@example.com', role: 'User', status: 'inactive', age: 38, description: 'Pending verification' },
  { id: '9', name: 'Grace Taylor', email: 'grace@example.com', role: 'Admin', status: 'active', age: 42, description: 'System administrator' },
  { id: '10', name: 'Henry Davis', email: 'henry@example.com', role: 'User', status: 'active', age: 27, description: 'Developer account' },
  { id: '11', name: 'Iris Martin', email: 'iris@example.com', role: 'Editor', status: 'active', age: 33, description: 'Technical writer' },
  { id: '12', name: 'Jack White', email: 'jack@example.com', role: 'User', status: 'inactive', age: 36, description: 'Trial user' },
];

const basicColumns: ColumnType<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'role', title: 'Role', dataIndex: 'role' },
];

const columnsWithRender: ColumnType<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', width: 150 },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'role', title: 'Role', dataIndex: 'role', align: 'center' },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    align: 'center',
    render: (value) => (
      <Tag color={value === 'active' ? 'success' : 'ghost'} size="sm">
        {String(value)}
      </Tag>
    ),
  },
  {
    key: 'actions',
    title: 'Actions',
    align: 'right',
    render: () => (
      <Space size="xs">
        <Button size="xs" variant="ghost">Edit</Button>
        <Button size="xs" variant="ghost">Delete</Button>
      </Space>
    ),
  },
];

export function BasicDemo() {
  return (
    <Demo>
      <Table columns={basicColumns} dataSource={userData.slice(0, 5)} pagination={false} />
    </Demo>
  );
}

export function CustomRenderDemo() {
  return (
    <Demo>
      <Table columns={columnsWithRender} dataSource={userData.slice(0, 4)} pagination={false} />
    </Demo>
  );
}

export function StripedDemo() {
  return (
    <Demo>
      <Table columns={basicColumns} dataSource={userData.slice(0, 5)} striped pagination={false} />
    </Demo>
  );
}

export function BorderedDemo() {
  return (
    <Demo>
      <Table columns={basicColumns} dataSource={userData.slice(0, 5)} bordered pagination={false} />
    </Demo>
  );
}

export function SizeXsDemo() {
  return (
    <Demo>
      <Table
        columns={basicColumns}
        dataSource={userData.slice(0, 5)}
        size="xs"
        striped
        bordered
        pagination={false}
      />
    </Demo>
  );
}

export function SizeXlDemo() {
  return (
    <Demo>
      <Table columns={basicColumns} dataSource={userData.slice(0, 3)} size="xl" pagination={false} />
    </Demo>
  );
}

export function EmptyDemo() {
  return (
    <Demo>
      <Table
        columns={basicColumns}
        dataSource={[]}
        pagination={false}
        locale={{ emptyText: 'No users found' }}
      />
    </Demo>
  );
}

export function LoadingDemo() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Demo>
      <div className="space-y-4">
        <Button size="sm" onClick={() => setIsLoading(!isLoading)}>
          {isLoading ? 'Hide' : 'Show'} Loading
        </Button>
        <Table columns={basicColumns} dataSource={userData.slice(0, 5)} loading={isLoading} pagination={false} />
      </div>
    </Demo>
  );
}

export function PaginationDemo() {
  return (
    <Demo>
      <Table columns={basicColumns} dataSource={userData} pagination={{ pageSize: 5 }} />
    </Demo>
  );
}

export function PaginationFeaturesDemo() {
  return (
    <Demo>
      <Table
        columns={basicColumns}
        dataSource={userData}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          pageSizeOptions: [5, 10, 20],
        }}
      />
    </Demo>
  );
}

export function PinnedDemo() {
  return (
    <Demo>
      <div className="max-h-64 overflow-auto border border-base-content/10 rounded-lg">
        <Table columns={basicColumns} dataSource={userData} pinRows striped pagination={false} />
      </div>
    </Demo>
  );
}

export function SortingDemo() {
  return (
    <Demo>
      <Table
        columns={[
          { key: 'name', title: 'Name', dataIndex: 'name', sorter: true },
          { key: 'age', title: 'Age', dataIndex: 'age', sorter: true, defaultSortOrder: 'ascend' },
          { key: 'email', title: 'Email', dataIndex: 'email', sorter: true },
        ]}
        dataSource={userData.slice(0, 6)}
        pagination={false}
      />
    </Demo>
  );
}

export function ControlledSortDemo() {
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend' | null>('ascend');

  return (
    <Demo>
      <div className="space-y-4">
        <Space size="sm">
          <Button size="sm" variant={sortOrder === 'ascend' ? 'primary' : 'outline'} onClick={() => setSortOrder('ascend')}>
            Ascending
          </Button>
          <Button size="sm" variant={sortOrder === 'descend' ? 'primary' : 'outline'} onClick={() => setSortOrder('descend')}>
            Descending
          </Button>
          <Button size="sm" variant={sortOrder === null ? 'primary' : 'outline'} onClick={() => setSortOrder(null)}>
            None
          </Button>
        </Space>
        <Table
          columns={[
            { key: 'name', title: 'Name', dataIndex: 'name', sorter: true, sortOrder },
            { key: 'email', title: 'Email', dataIndex: 'email' },
            { key: 'role', title: 'Role', dataIndex: 'role' },
          ]}
          dataSource={userData.slice(0, 5)}
          pagination={false}
          onSortChange={(sorter) => setSortOrder(sorter.order ?? null)}
        />
      </div>
    </Demo>
  );
}

export function FilteringDemo() {
  return (
    <Demo>
      <Table
        columns={[
          { key: 'name', title: 'Name', dataIndex: 'name' },
          {
            key: 'role',
            title: 'Role',
            dataIndex: 'role',
            filters: [
              { text: 'Admin', value: 'Admin' },
              { text: 'User', value: 'User' },
              { text: 'Editor', value: 'Editor' },
            ],
            onFilter: (value, record) => record.role === value,
          },
          {
            key: 'status',
            title: 'Status',
            dataIndex: 'status',
            filters: [
              { text: 'Active', value: 'active' },
              { text: 'Inactive', value: 'inactive' },
            ],
            onFilter: (value, record) => record.status === value,
          },
        ]}
        dataSource={userData.slice(0, 6)}
        pagination={false}
      />
    </Demo>
  );
}

export function SelectionDemo() {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  return (
    <Demo>
      <div className="space-y-4">
        <div className="text-sm">Selected: {selectedKeys.join(', ') || 'None'}</div>
        <Table
          columns={basicColumns}
          dataSource={userData.slice(0, 5)}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => setSelectedKeys(keys),
          }}
          pagination={false}
        />
      </div>
    </Demo>
  );
}

export function RadioSelectionDemo() {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  return (
    <Demo>
      <div className="space-y-4">
        <div className="text-sm">Selected: {selectedKeys.join(', ') || 'None'}</div>
        <Table
          columns={basicColumns}
          dataSource={userData.slice(0, 5)}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: selectedKeys,
            onChange: (keys) => setSelectedKeys(keys),
          }}
          pagination={false}
        />
      </div>
    </Demo>
  );
}

export function ExpandableDemo() {
  const expandable: ExpandableConfig<User> = {
    expandedRowRender: (record) => (
      <div className="p-2">
        <p className="text-sm"><strong>Description:</strong> {record.description}</p>
        <p className="text-sm"><strong>Age:</strong> {record.age}</p>
      </div>
    ),
    rowExpandable: (record) => record.status === 'active',
  };

  return (
    <Demo>
      <Table
        columns={basicColumns}
        dataSource={userData.slice(0, 5)}
        expandable={expandable}
        pagination={false}
      />
    </Demo>
  );
}

export function EllipsisDemo() {
  return (
    <Demo>
      <Table
        columns={[
          { key: 'name', title: 'Name', dataIndex: 'name', width: 100 },
          { key: 'email', title: 'Email', dataIndex: 'email', width: 150, ellipsis: true },
          { key: 'description', title: 'Description', dataIndex: 'description', ellipsis: true },
        ]}
        dataSource={userData.slice(0, 4)}
        pagination={false}
      />
    </Demo>
  );
}

export function ScrollDemo() {
  return (
    <Demo>
      <Table
        columns={[
          { key: 'name', title: 'Name', dataIndex: 'name', width: 150 },
          { key: 'email', title: 'Email', dataIndex: 'email', width: 200 },
          { key: 'role', title: 'Role', dataIndex: 'role', width: 100 },
          { key: 'status', title: 'Status', dataIndex: 'status', width: 100 },
          { key: 'age', title: 'Age', dataIndex: 'age', width: 80 },
          { key: 'description', title: 'Description', dataIndex: 'description', width: 300 },
        ]}
        dataSource={userData.slice(0, 5)}
        scroll={{ x: 800, y: 200 }}
        pagination={false}
      />
    </Demo>
  );
}

export function CompleteDemo() {
  return (
    <Demo>
      <Table
        columns={columnsWithRender}
        dataSource={userData}
        size="sm"
        striped
        bordered
        pagination={{ pageSize: 5 }}
      />
    </Demo>
  );
}
