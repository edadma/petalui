import { Descriptions } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  const items = [
    { label: 'Name', children: 'John Doe' },
    { label: 'Email', children: 'john@example.com' },
    { label: 'Phone', children: '+1 234 567 890' },
    { label: 'Location', children: 'San Francisco, CA' },
    { label: 'Status', children: 'Active' },
  ]

  return (
    <Demo>
      <Descriptions items={items} />
    </Demo>
  )
}

export function BorderedDemo() {
  const items = [
    { label: 'Product', children: 'AsterUI Pro' },
    { label: 'Price', children: '$99.00' },
    { label: 'Quantity', children: '2' },
    { label: 'Total', children: '$198.00' },
  ]

  return (
    <Demo>
      <Descriptions items={items} bordered title="Order Details" />
    </Demo>
  )
}

export function VerticalDemo() {
  const items = [
    { label: 'Created', children: '2024-01-15 10:30:00' },
    { label: 'Updated', children: '2024-01-20 14:45:00' },
    { label: 'Author', children: 'Jane Smith' },
  ]

  return (
    <Demo>
      <Descriptions items={items} layout="vertical" />
    </Demo>
  )
}

export function ColumnsDemo() {
  const items = [
    { label: 'Name', children: 'Alice Johnson' },
    { label: 'Age', children: '28' },
    { label: 'Gender', children: 'Female' },
    { label: 'Occupation', children: 'Software Engineer' },
    { label: 'Department', children: 'Engineering' },
    { label: 'Start Date', children: '2022-03-15' },
  ]

  return (
    <Demo>
      <Descriptions items={items} column={2} bordered />
    </Demo>
  )
}

export function WithSpanDemo() {
  const items = [
    { label: 'Name', children: 'Product X' },
    { label: 'SKU', children: 'PRD-12345' },
    { label: 'Category', children: 'Electronics' },
    { label: 'Description', children: 'A detailed product description that spans multiple columns for better readability.', span: 3 },
  ]

  return (
    <Demo>
      <Descriptions items={items} bordered />
    </Demo>
  )
}
