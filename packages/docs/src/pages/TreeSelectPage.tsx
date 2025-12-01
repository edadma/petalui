import { useState } from 'react'
import { TreeSelect, Form, Button, Space, Masonry } from '@edadma/bloomui'
import type { TreeDataNode } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const treeSelectApi: ApiProperty[] = [
  {
    property: 'treeData',
    description: 'Tree data structure',
    type: 'TreeDataNode[]',
    default: '[]',
  },
  {
    property: 'value',
    description: 'Selected value(s)',
    type: 'string | string[]',
  },
  {
    property: 'defaultValue',
    description: 'Initial selected value(s)',
    type: 'string | string[]',
    default: '[]',
  },
  {
    property: 'onChange',
    description: 'Callback when selection changes',
    type: '(value, labels) => void',
  },
  {
    property: 'multiple',
    description: 'Allow multiple selection',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'treeCheckable',
    description: 'Show checkboxes for selection',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'showSearch',
    description: 'Show search input',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'placeholder',
    description: 'Placeholder text',
    type: 'string',
    default: "'Please select'",
  },
  {
    property: 'allowClear',
    description: 'Show clear button',
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
    property: 'treeDefaultExpandAll',
    description: 'Expand all tree nodes by default',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'treeDefaultExpandedKeys',
    description: 'Initially expanded node keys',
    type: 'string[]',
    default: '[]',
  },
  {
    property: 'size',
    description: 'Size of the select',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
  },
]

const categoryData: TreeDataNode[] = [
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
          { key: 'pixel', title: 'Google Pixel' },
        ],
      },
      {
        key: 'computers',
        title: 'Computers',
        children: [
          { key: 'laptop', title: 'Laptops' },
          { key: 'desktop', title: 'Desktops' },
          { key: 'tablet', title: 'Tablets' },
        ],
      },
    ],
  },
  {
    key: 'clothing',
    title: 'Clothing',
    children: [
      {
        key: 'mens',
        title: "Men's",
        children: [
          { key: 'shirts', title: 'Shirts' },
          { key: 'pants', title: 'Pants' },
        ],
      },
      {
        key: 'womens',
        title: "Women's",
        children: [
          { key: 'dresses', title: 'Dresses' },
          { key: 'tops', title: 'Tops' },
        ],
      },
    ],
  },
  {
    key: 'home',
    title: 'Home & Garden',
    children: [
      { key: 'furniture', title: 'Furniture' },
      { key: 'decor', title: 'Decor' },
      { key: 'garden', title: 'Garden' },
    ],
  },
]

const locationData: TreeDataNode[] = [
  {
    key: 'usa',
    title: 'United States',
    children: [
      {
        key: 'ca',
        title: 'California',
        children: [
          { key: 'sf', title: 'San Francisco' },
          { key: 'la', title: 'Los Angeles' },
          { key: 'sd', title: 'San Diego' },
        ],
      },
      {
        key: 'ny',
        title: 'New York',
        children: [
          { key: 'nyc', title: 'New York City' },
          { key: 'buffalo', title: 'Buffalo' },
        ],
      },
      {
        key: 'tx',
        title: 'Texas',
        children: [
          { key: 'houston', title: 'Houston' },
          { key: 'dallas', title: 'Dallas' },
          { key: 'austin', title: 'Austin' },
        ],
      },
    ],
  },
  {
    key: 'canada',
    title: 'Canada',
    children: [
      { key: 'toronto', title: 'Toronto' },
      { key: 'vancouver', title: 'Vancouver' },
      { key: 'montreal', title: 'Montreal' },
    ],
  },
]

export function TreeSelectPage() {
  const [singleValue, setSingleValue] = useState<string>('')
  const [multiValue, setMultiValue] = useState<string[]>([])
  const [checkableValue, setCheckableValue] = useState<string[]>([])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">TreeSelect</h1>
        <p className="text-base-content/70">
          Tree selection component presented in a dropdown, combining tree structure with select functionality.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic TreeSelect"
          description="Single selection from a tree structure."
          code={`import React, { useState } from 'react'
import { TreeSelect } from '@edadma/bloomui'
import type { TreeDataNode } from '@edadma/bloomui'

const App: React.FC = () => {
  const [value, setValue] = useState<string>('')

  const categoryData: TreeDataNode[] = [
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
            { key: 'pixel', title: 'Google Pixel' },
          ],
        },
        {
          key: 'computers',
          title: 'Computers',
          children: [
            { key: 'laptop', title: 'Laptops' },
            { key: 'desktop', title: 'Desktops' },
            { key: 'tablet', title: 'Tablets' },
          ],
        },
      ],
    },
    {
      key: 'clothing',
      title: 'Clothing',
      children: [
        {
          key: 'mens',
          title: "Men's",
          children: [
            { key: 'shirts', title: 'Shirts' },
            { key: 'pants', title: 'Pants' },
          ],
        },
        {
          key: 'womens',
          title: "Women's",
          children: [
            { key: 'dresses', title: 'Dresses' },
            { key: 'tops', title: 'Tops' },
          ],
        },
      ],
    },
    {
      key: 'home',
      title: 'Home & Garden',
      children: [
        { key: 'furniture', title: 'Furniture' },
        { key: 'decor', title: 'Decor' },
        { key: 'garden', title: 'Garden' },
      ],
    },
  ]

  return (
    <div className="w-72">
      <TreeSelect
        treeData={categoryData}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="Select a category"
        treeDefaultExpandAll
      />
      {value && <p className="mt-2 text-sm">Selected: {value}</p>}
    </div>
  )
}

export default App`}
        >
          <div className="w-72">
            <TreeSelect
              treeData={categoryData}
              value={singleValue}
              onChange={(val) => setSingleValue(val as string)}
              placeholder="Select a category"
              treeDefaultExpandAll
            />
            {singleValue && (
              <p className="mt-2 text-sm text-base-content/70">
                Selected: {singleValue}
              </p>
            )}
          </div>
        </ExampleSection>

        <ExampleSection
          title="Multiple Selection"
          description="Select multiple items from the tree."
          code={`import React, { useState } from 'react'
import { TreeSelect } from '@edadma/bloomui'
import type { TreeDataNode } from '@edadma/bloomui'

const App: React.FC = () => {
  const [value, setValue] = useState<string[]>([])

  const categoryData: TreeDataNode[] = [
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
      ],
    },
  ]

  return (
    <div className="w-72">
      <TreeSelect
        treeData={categoryData}
        value={value}
        onChange={(val) => setValue(val as string[])}
        multiple
        placeholder="Select categories"
        treeDefaultExpandAll
      />
      {value.length > 0 && (
        <p className="mt-2 text-sm">Selected: {value.length} items</p>
      )}
    </div>
  )
}

export default App`}
        >
          <div className="w-72">
            <TreeSelect
              treeData={categoryData}
              value={multiValue}
              onChange={(val) => setMultiValue(val as string[])}
              multiple
              placeholder="Select categories"
              treeDefaultExpandAll
            />
            {multiValue.length > 0 && (
              <p className="mt-2 text-sm text-base-content/70">
                Selected: {multiValue.length} items
              </p>
            )}
          </div>
        </ExampleSection>

        <ExampleSection
          title="Checkable TreeSelect"
          description="Checkbox-based selection with cascade checking."
          code={`import React, { useState } from 'react'
import { TreeSelect } from '@edadma/bloomui'
import type { TreeDataNode } from '@edadma/bloomui'

const App: React.FC = () => {
  const [value, setValue] = useState<string[]>([])

  const locationData: TreeDataNode[] = [
    {
      key: 'usa',
      title: 'United States',
      children: [
        {
          key: 'ca',
          title: 'California',
          children: [
            { key: 'sf', title: 'San Francisco' },
            { key: 'la', title: 'Los Angeles' },
            { key: 'sd', title: 'San Diego' },
          ],
        },
        {
          key: 'ny',
          title: 'New York',
          children: [
            { key: 'nyc', title: 'New York City' },
            { key: 'buffalo', title: 'Buffalo' },
          ],
        },
      ],
    },
    {
      key: 'canada',
      title: 'Canada',
      children: [
        { key: 'toronto', title: 'Toronto' },
        { key: 'vancouver', title: 'Vancouver' },
      ],
    },
  ]

  return (
    <div className="w-72">
      <TreeSelect
        treeData={locationData}
        value={value}
        onChange={(val) => setValue(val as string[])}
        treeCheckable
        placeholder="Select locations"
        treeDefaultExpandAll
      />
      {value.length > 0 && (
        <p className="mt-2 text-sm">Checked: {value.length} items</p>
      )}
    </div>
  )
}

export default App`}
        >
          <div className="w-72">
            <TreeSelect
              treeData={locationData}
              value={checkableValue}
              onChange={(val) => setCheckableValue(val as string[])}
              treeCheckable
              placeholder="Select locations"
              treeDefaultExpandAll
            />
            {checkableValue.length > 0 && (
              <p className="mt-2 text-sm text-base-content/70">
                Checked: {checkableValue.length} items
              </p>
            )}
          </div>
        </ExampleSection>

        <ExampleSection
          title="With Search"
          description="Filter tree nodes with search."
          code={`import React from 'react'
import { TreeSelect } from '@edadma/bloomui'
import type { TreeDataNode } from '@edadma/bloomui'

const App: React.FC = () => {
  const categoryData: TreeDataNode[] = [
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
      ],
    },
  ]

  return (
    <div className="w-72">
      <TreeSelect
        treeData={categoryData}
        showSearch
        placeholder="Search and select"
        treeDefaultExpandAll
      />
    </div>
  )
}

export default App`}
        >
          <div className="w-72">
            <TreeSelect
              treeData={categoryData}
              showSearch
              placeholder="Search and select"
              treeDefaultExpandAll
            />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Different Sizes"
          description="TreeSelect in various sizes."
          code={`import React from 'react'
import { TreeSelect, Space } from '@edadma/bloomui'
import type { TreeDataNode } from '@edadma/bloomui'

const App: React.FC = () => {
  const data: TreeDataNode[] = [
    {
      key: 'category',
      title: 'Category',
      children: [
        { key: 'option-1', title: 'Option 1' },
        { key: 'option-2', title: 'Option 2' },
      ],
    },
  ]

  return (
    <Space direction="vertical" className="w-72">
      <TreeSelect size="xs" treeData={data} placeholder="Extra small" treeDefaultExpandAll />
      <TreeSelect size="sm" treeData={data} placeholder="Small" treeDefaultExpandAll />
      <TreeSelect size="md" treeData={data} placeholder="Medium" treeDefaultExpandAll />
      <TreeSelect size="lg" treeData={data} placeholder="Large" treeDefaultExpandAll />
    </Space>
  )
}

export default App`}
        >
          <Space direction="vertical" className="w-72">
            <TreeSelect size="xs" treeData={categoryData} placeholder="Extra small" treeDefaultExpandAll />
            <TreeSelect size="sm" treeData={categoryData} placeholder="Small" treeDefaultExpandAll />
            <TreeSelect size="md" treeData={categoryData} placeholder="Medium" treeDefaultExpandAll />
            <TreeSelect size="lg" treeData={categoryData} placeholder="Large" treeDefaultExpandAll />
          </Space>
        </ExampleSection>

        <ExampleSection
          title="Disabled State"
          description="Disabled TreeSelect with a preset value."
          code={`import React from 'react'
import { TreeSelect } from '@edadma/bloomui'
import type { TreeDataNode } from '@edadma/bloomui'

const App: React.FC = () => {
  const categoryData: TreeDataNode[] = [
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
          ],
        },
      ],
    },
  ]

  return (
    <div className="w-72">
      <TreeSelect
        treeData={categoryData}
        defaultValue="iphone"
        disabled
        treeDefaultExpandAll
      />
    </div>
  )
}

export default App`}
        >
          <div className="w-72">
            <TreeSelect
              treeData={categoryData}
              defaultValue="iphone"
              disabled
              treeDefaultExpandAll
            />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Form Integration"
          description="TreeSelect in a form with validation."
          code={`import React from 'react'
import { TreeSelect, Form, Button } from '@edadma/bloomui'
import type { TreeDataNode } from '@edadma/bloomui'

const App: React.FC = () => {
  const categoryData: TreeDataNode[] = [
    {
      key: 'electronics',
      title: 'Electronics',
      children: [
        { key: 'phones', title: 'Phones' },
        { key: 'computers', title: 'Computers' },
      ],
    },
    {
      key: 'clothing',
      title: 'Clothing',
      children: [
        { key: 'shirts', title: 'Shirts' },
        { key: 'pants', title: 'Pants' },
      ],
    },
  ]

  return (
    <Form onFinish={(values) => alert(JSON.stringify(values))} className="w-72">
      <Form.Item name="category" label="Category" required>
        <TreeSelect
          treeData={categoryData}
          placeholder="Select category"
          treeDefaultExpandAll
        />
      </Form.Item>
      <Button htmlType="submit" color="primary">Submit</Button>
    </Form>
  )
}

export default App`}
        >
          <Form onFinish={(values) => alert(JSON.stringify(values))} className="w-72">
            <Form.Item name="category" label="Category" required>
              <TreeSelect
                treeData={categoryData}
                placeholder="Select category"
                treeDefaultExpandAll
              />
            </Form.Item>
            <Button htmlType="submit" color="primary">Submit</Button>
          </Form>
        </ExampleSection>

        <ExampleSection
          title="Default Expanded"
          description="Control which nodes are expanded by default."
          code={`import React from 'react'
import { TreeSelect } from '@edadma/bloomui'
import type { TreeDataNode } from '@edadma/bloomui'

const App: React.FC = () => {
  const categoryData: TreeDataNode[] = [
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
          ],
        },
        {
          key: 'computers',
          title: 'Computers',
          children: [
            { key: 'laptop', title: 'Laptops' },
            { key: 'desktop', title: 'Desktops' },
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
      ],
    },
  ]

  return (
    <div className="w-72">
      <TreeSelect
        treeData={categoryData}
        treeDefaultExpandedKeys={['electronics', 'phones']}
        placeholder="Select item"
      />
    </div>
  )
}

export default App`}
        >
          <div className="w-72">
            <TreeSelect
              treeData={categoryData}
              treeDefaultExpandedKeys={['electronics', 'phones']}
              placeholder="Select item"
            />
          </div>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="TreeSelect" data={treeSelectApi} />

        <div className="alert alert-info mt-8">
          <div>
            <strong>TreeSelect vs Tree:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>TreeSelect presents data in a compact dropdown format</li>
              <li>Better for form inputs where space is limited</li>
              <li>Supports single, multiple, and checkable selection modes</li>
              <li>Built-in search functionality</li>
              <li>Uses the same TreeDataNode structure as Tree</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
