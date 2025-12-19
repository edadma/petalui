import { Descriptions, Button, Badge, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Descriptions } from 'asterui'
export function BasicDemo() {
  // @example-include
  const items = [
    { key: 'name', label: 'Name', children: 'John Doe' },
    { key: 'email', label: 'Email', children: 'john@example.com' },
    { key: 'phone', label: 'Phone', children: '+1 234 567 890' },
    { key: 'location', label: 'Location', children: 'San Francisco, CA' },
    { key: 'status', label: 'Status', children: 'Active' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Descriptions items={items} />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Descriptions } from 'asterui'
export function BorderedDemo() {
  // @example-include
  const items = [
    { key: 'product', label: 'Product', children: 'AsterUI Pro' },
    { key: 'price', label: 'Price', children: '$99.00' },
    { key: 'quantity', label: 'Quantity', children: '2' },
    { key: 'total', label: 'Total', children: '$198.00' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Descriptions items={items} bordered title="Order Details" />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Descriptions, Space } from 'asterui'
export function SizesDemo() {
  // @example-include
  const items = [
    { key: 'name', label: 'Name', children: 'Jane Smith' },
    { key: 'role', label: 'Role', children: 'Engineer' },
    { key: 'team', label: 'Team', children: 'Frontend' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="lg" className="w-full">
        <Descriptions items={items} size="sm" bordered title="Small" />
        <Descriptions items={items} size="md" bordered title="Medium" />
        <Descriptions items={items} size="lg" bordered title="Large" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Descriptions } from 'asterui'
export function VerticalDemo() {
  // @example-include
  const items = [
    { key: 'created', label: 'Created', children: '2024-01-15 10:30:00' },
    { key: 'updated', label: 'Updated', children: '2024-01-20 14:45:00' },
    { key: 'author', label: 'Author', children: 'Jane Smith' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Descriptions items={items} layout="vertical" bordered />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Descriptions } from 'asterui'
export function ColumnsDemo() {
  // @example-include
  const items = [
    { key: 'name', label: 'Name', children: 'Alice Johnson' },
    { key: 'age', label: 'Age', children: '28' },
    { key: 'gender', label: 'Gender', children: 'Female' },
    { key: 'occupation', label: 'Occupation', children: 'Software Engineer' },
    { key: 'department', label: 'Department', children: 'Engineering' },
    { key: 'start-date', label: 'Start Date', children: '2022-03-15' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Descriptions items={items} column={2} bordered />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Descriptions } from 'asterui'
export function WithSpanDemo() {
  // @example-include
  const items = [
    { key: 'name', label: 'Name', children: 'Product X' },
    { key: 'sku', label: 'SKU', children: 'PRD-12345' },
    { key: 'category', label: 'Category', children: 'Electronics' },
    { key: 'description', label: 'Description', children: 'A detailed product description that spans multiple columns for better readability.', span: 3 },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Descriptions items={items} bordered />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Descriptions } from 'asterui'
export function FilledSpanDemo() {
  // @example-include
  const items = [
    { key: 'name', label: 'Name', children: 'John Doe' },
    { key: 'notes', label: 'Notes', children: 'This field fills the remaining space in the row.', span: 'filled' as const },
    { key: 'email', label: 'Email', children: 'john@example.com' },
    { key: 'phone', label: 'Phone', children: '+1 234 567 890' },
    { key: 'address', label: 'Address', children: '123 Main St, San Francisco, CA 94102', span: 'filled' as const },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Descriptions items={items} bordered />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Descriptions, Button, Badge } from 'asterui'
export function TitleExtraDemo() {
  // @example-include
  const items = [
    { key: 'name', label: 'Name', children: 'John Doe' },
    { key: 'email', label: 'Email', children: 'john@example.com' },
    { key: 'status', label: 'Status', children: <Badge color="success">Active</Badge> },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Descriptions
        items={items}
        bordered
        title="User Profile"
        extra={<Button size="sm">Edit</Button>}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Descriptions } from 'asterui'
export function NoColonDemo() {
  // @example-include
  const items = [
    { key: 'field1', label: 'Field One', children: 'Value One' },
    { key: 'field2', label: 'Field Two', children: 'Value Two' },
    { key: 'field3', label: 'Field Three', children: 'Value Three' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Descriptions items={items} colon={false} bordered />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Descriptions } from 'asterui'
export function CustomStylesDemo() {
  // @example-include
  const items = [
    { key: 'name', label: 'Name', children: 'Jane Doe' },
    { key: 'highlight', label: 'Highlighted', children: 'This item has custom styles', labelClassName: 'text-primary', contentClassName: 'text-accent font-bold' },
    { key: 'status', label: 'Status', children: 'Active' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Descriptions
        items={items}
        bordered
        styles={{
          label: { backgroundColor: 'oklch(var(--b2))' },
          content: { backgroundColor: 'oklch(var(--b1))' },
        }}
        classNames={{
          title: 'text-primary',
        }}
        title="Custom Styled"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Descriptions } from 'asterui'
export function CompoundDemo() {
  // @example-include
  const { Item } = Descriptions
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Descriptions bordered title="Using Compound Pattern">
        <Item key="name" label="Name">John Doe</Item>
        <Item key="email" label="Email">john@example.com</Item>
        <Item key="phone" label="Phone">+1 234 567 890</Item>
        <Item key="address" label="Address" span={3}>
          123 Main Street, San Francisco, CA 94102
        </Item>
      </Descriptions>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Descriptions } from 'asterui'
export function ResponsiveDemo() {
  // @example-include
  const items = [
    { key: 'field1', label: 'Field 1', children: 'Value 1' },
    { key: 'field2', label: 'Field 2', children: 'Value 2' },
    { key: 'field3', label: 'Field 3', children: 'Value 3' },
    { key: 'field4', label: 'Field 4', children: 'Value 4' },
    { key: 'field5', label: 'Field 5', children: 'Value 5' },
    { key: 'field6', label: 'Field 6', children: 'Value 6' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Descriptions
        items={items}
        bordered
        column={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        title="Resize window to see columns change"
      />
      {/* @example-return-end */}
    </Demo>
  )
}
