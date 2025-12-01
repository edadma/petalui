import { Descriptions, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const descriptionsApi: ApiProperty[] = [
  {
    property: 'title',
    description: 'Title of the descriptions',
    type: 'React.ReactNode',
  },
  {
    property: 'bordered',
    description: 'Whether to show borders',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'column',
    description: 'Number of columns or responsive configuration',
    type: "number | { xs?: number, sm?: number, md?: number, lg?: number, xl?: number, '2xl'?: number }",
    default: '3',
  },
  {
    property: 'size',
    description: 'Size of the descriptions',
    type: "'small' | 'default' | 'large'",
    default: "'default'",
  },
  {
    property: 'layout',
    description: 'Layout orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
  },
  {
    property: 'colon',
    description: 'Show colon after label',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'labelStyle',
    description: 'Style for all labels',
    type: 'React.CSSProperties',
  },
  {
    property: 'contentStyle',
    description: 'Style for all content',
    type: 'React.CSSProperties',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
  {
    property: 'style',
    description: 'Inline styles',
    type: 'React.CSSProperties',
  },
]

const descriptionsItemApi: ApiProperty[] = [
  {
    property: 'label',
    description: 'Label text',
    type: 'React.ReactNode',
  },
  {
    property: 'span',
    description: 'Number of columns to span',
    type: 'number',
    default: '1',
  },
  {
    property: 'children',
    description: 'Content to display',
    type: 'React.ReactNode',
  },
  {
    property: 'labelStyle',
    description: 'Style for this label',
    type: 'React.CSSProperties',
  },
  {
    property: 'contentStyle',
    description: 'Style for this content',
    type: 'React.CSSProperties',
  },
]

export function DescriptionsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Descriptions</h1>
        <p className="text-base-content/70">
          Display multiple read-only fields in a structured layout.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic"
          description="Simple descriptions with labels and content."
          code={`import React from 'react'
import { Descriptions } from '@edadma/bloomui'

const App: React.FC = () => (
  <Descriptions title="User Info">
    <Descriptions.Item label="Name">John Doe</Descriptions.Item>
    <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
    <Descriptions.Item label="Phone">555-0123</Descriptions.Item>
    <Descriptions.Item label="Address">123 Main St, City</Descriptions.Item>
    <Descriptions.Item label="Status">Active</Descriptions.Item>
    <Descriptions.Item label="Role">Administrator</Descriptions.Item>
  </Descriptions>
)

export default App`}
        >
          <Descriptions title="User Info">
            <Descriptions.Item label="Name">John Doe</Descriptions.Item>
            <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
            <Descriptions.Item label="Phone">555-0123</Descriptions.Item>
            <Descriptions.Item label="Address">123 Main St, City</Descriptions.Item>
            <Descriptions.Item label="Status">Active</Descriptions.Item>
            <Descriptions.Item label="Role">Administrator</Descriptions.Item>
          </Descriptions>
        </ExampleSection>

        <ExampleSection
          title="Bordered"
          description="Add borders for better visual separation."
          code={`import React from 'react'
import { Descriptions } from '@edadma/bloomui'

const App: React.FC = () => (
  <Descriptions title="Product Details" bordered>
    <Descriptions.Item label="Product">MacBook Pro</Descriptions.Item>
    <Descriptions.Item label="Price">$2,499</Descriptions.Item>
    <Descriptions.Item label="Stock">In Stock</Descriptions.Item>
    <Descriptions.Item label="Category">Electronics</Descriptions.Item>
    <Descriptions.Item label="SKU">MBP-14-2023</Descriptions.Item>
    <Descriptions.Item label="Brand">Apple</Descriptions.Item>
  </Descriptions>
)

export default App`}
        >
          <Descriptions title="Product Details" bordered>
            <Descriptions.Item label="Product">MacBook Pro</Descriptions.Item>
            <Descriptions.Item label="Price">$2,499</Descriptions.Item>
            <Descriptions.Item label="Stock">In Stock</Descriptions.Item>
            <Descriptions.Item label="Category">Electronics</Descriptions.Item>
            <Descriptions.Item label="SKU">MBP-14-2023</Descriptions.Item>
            <Descriptions.Item label="Brand">Apple</Descriptions.Item>
          </Descriptions>
        </ExampleSection>

        <ExampleSection
          title="Column Span"
          description="Items can span multiple columns."
          code={`import React from 'react'
import { Descriptions } from '@edadma/bloomui'

const App: React.FC = () => (
  <Descriptions title="Order Details" bordered>
    <Descriptions.Item label="Order ID">ORD-2023-001</Descriptions.Item>
    <Descriptions.Item label="Date">2023-11-23</Descriptions.Item>
    <Descriptions.Item label="Status">Shipped</Descriptions.Item>
    <Descriptions.Item label="Shipping Address" span={3}>
      123 Main Street, Apt 4B<br/>
      San Francisco, CA 94102<br/>
      United States
    </Descriptions.Item>
    <Descriptions.Item label="Total">$299.99</Descriptions.Item>
    <Descriptions.Item label="Payment">Credit Card</Descriptions.Item>
  </Descriptions>
)

export default App`}
        >
          <Descriptions title="Order Details" bordered>
            <Descriptions.Item label="Order ID">ORD-2023-001</Descriptions.Item>
            <Descriptions.Item label="Date">2023-11-23</Descriptions.Item>
            <Descriptions.Item label="Status">Shipped</Descriptions.Item>
            <Descriptions.Item label="Shipping Address" span={3}>
              123 Main Street, Apt 4B<br />
              San Francisco, CA 94102<br />
              United States
            </Descriptions.Item>
            <Descriptions.Item label="Total">$299.99</Descriptions.Item>
            <Descriptions.Item label="Payment">Credit Card</Descriptions.Item>
          </Descriptions>
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description="Control the text size."
          code={`import React from 'react'
import { Descriptions } from '@edadma/bloomui'

const App: React.FC = () => (
  <>
    <Descriptions title="Small Size" size="small" bordered>
      <Descriptions.Item label="Name">John Doe</Descriptions.Item>
      <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
    </Descriptions>

    <Descriptions title="Large Size" size="large" bordered className="mt-4">
      <Descriptions.Item label="Name">John Doe</Descriptions.Item>
      <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
    </Descriptions>
  </>
)

export default App`}
        >
          <div className="space-y-4">
            <Descriptions title="Small Size" size="small" bordered>
              <Descriptions.Item label="Name">John Doe</Descriptions.Item>
              <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
              <Descriptions.Item label="Phone">555-0123</Descriptions.Item>
            </Descriptions>

            <Descriptions title="Large Size" size="large" bordered>
              <Descriptions.Item label="Name">John Doe</Descriptions.Item>
              <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
              <Descriptions.Item label="Phone">555-0123</Descriptions.Item>
            </Descriptions>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Vertical Layout"
          description="Display labels above content."
          code={`import React from 'react'
import { Descriptions } from '@edadma/bloomui'

const App: React.FC = () => (
  <Descriptions title="Server Info" layout="vertical" bordered>
    <Descriptions.Item label="Hostname">server-01.example.com</Descriptions.Item>
    <Descriptions.Item label="IP Address">192.168.1.100</Descriptions.Item>
    <Descriptions.Item label="Status">Running</Descriptions.Item>
    <Descriptions.Item label="Uptime">45 days</Descriptions.Item>
    <Descriptions.Item label="Memory">16 GB</Descriptions.Item>
    <Descriptions.Item label="CPU">Intel i7</Descriptions.Item>
  </Descriptions>
)

export default App`}
        >
          <Descriptions title="Server Info" layout="vertical" bordered>
            <Descriptions.Item label="Hostname">server-01.example.com</Descriptions.Item>
            <Descriptions.Item label="IP Address">192.168.1.100</Descriptions.Item>
            <Descriptions.Item label="Status">Running</Descriptions.Item>
            <Descriptions.Item label="Uptime">45 days</Descriptions.Item>
            <Descriptions.Item label="Memory">16 GB</Descriptions.Item>
            <Descriptions.Item label="CPU">Intel i7</Descriptions.Item>
          </Descriptions>
        </ExampleSection>

        <ExampleSection
          title="Custom Columns"
          description="Control the number of columns."
          code={`import React from 'react'
import { Descriptions } from '@edadma/bloomui'

const App: React.FC = () => (
  <>
    <Descriptions title="2 Columns" column={2} bordered>
      <Descriptions.Item label="Name">John Doe</Descriptions.Item>
      <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
      <Descriptions.Item label="Phone">555-0123</Descriptions.Item>
      <Descriptions.Item label="Address">123 Main St</Descriptions.Item>
    </Descriptions>

    <Descriptions title="4 Columns" column={4} bordered className="mt-4">
      <Descriptions.Item label="Q1">$10K</Descriptions.Item>
      <Descriptions.Item label="Q2">$12K</Descriptions.Item>
      <Descriptions.Item label="Q3">$15K</Descriptions.Item>
      <Descriptions.Item label="Q4">$18K</Descriptions.Item>
    </Descriptions>
  </>
)

export default App`}
        >
          <div className="space-y-4">
            <Descriptions title="2 Columns" column={2} bordered>
              <Descriptions.Item label="Name">John Doe</Descriptions.Item>
              <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
              <Descriptions.Item label="Phone">555-0123</Descriptions.Item>
              <Descriptions.Item label="Address">123 Main St</Descriptions.Item>
            </Descriptions>

            <Descriptions title="4 Columns" column={4} bordered>
              <Descriptions.Item label="Q1">$10K</Descriptions.Item>
              <Descriptions.Item label="Q2">$12K</Descriptions.Item>
              <Descriptions.Item label="Q3">$15K</Descriptions.Item>
              <Descriptions.Item label="Q4">$18K</Descriptions.Item>
            </Descriptions>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Without Colon"
          description="Hide the colon separator."
          code={`import React from 'react'
import { Descriptions } from '@edadma/bloomui'

const App: React.FC = () => (
  <Descriptions title="User Profile" colon={false} bordered>
    <Descriptions.Item label="Name">John Doe</Descriptions.Item>
    <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
    <Descriptions.Item label="Phone">555-0123</Descriptions.Item>
    <Descriptions.Item label="Location">San Francisco</Descriptions.Item>
  </Descriptions>
)

export default App`}
        >
          <Descriptions title="User Profile" colon={false} bordered>
            <Descriptions.Item label="Name">John Doe</Descriptions.Item>
            <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
            <Descriptions.Item label="Phone">555-0123</Descriptions.Item>
            <Descriptions.Item label="Location">San Francisco</Descriptions.Item>
          </Descriptions>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Descriptions" data={descriptionsApi} />

        <ApiTable title="Descriptions.Item" data={descriptionsItemApi} className="mt-8" />
      </div>
    </div>
  )
}
