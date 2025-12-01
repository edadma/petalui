import { Cascader, Form, Button, Space, Masonry } from '@edadma/bloomui'
import type { CascaderOption } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'
import { useState } from 'react'

const cascaderApi: ApiProperty[] = [
  {
    property: 'options',
    description: 'Hierarchical options data',
    type: 'CascaderOption[]',
    default: '[]',
  },
  {
    property: 'value',
    description: 'Selected value path (array of values)',
    type: '(string | number)[]',
  },
  {
    property: 'onChange',
    description: 'Callback when selection changes',
    type: '(value: (string | number)[], selectedOptions: CascaderOption[]) => void',
  },
  {
    property: 'placeholder',
    description: 'Placeholder text when no selection',
    type: 'string',
    default: "'Please select'",
  },
  {
    property: 'disabled',
    description: 'Disable the cascader',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'allowClear',
    description: 'Show clear button',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'expandTrigger',
    description: 'How to trigger column expansion',
    type: "'click' | 'hover'",
    default: "'click'",
  },
  {
    property: 'displayRender',
    description: 'Custom render function for display value',
    type: '(labels: ReactNode[], selectedOptions: CascaderOption[]) => ReactNode',
  },
  {
    property: 'size',
    description: 'Size of the cascader',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const optionApi: ApiProperty[] = [
  {
    property: 'value',
    description: 'Option value',
    type: 'string | number',
  },
  {
    property: 'label',
    description: 'Display label',
    type: 'React.ReactNode',
  },
  {
    property: 'disabled',
    description: 'Disable this option',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'children',
    description: 'Child options for next level',
    type: 'CascaderOption[]',
  },
]

const locationOptions: CascaderOption[] = [
  {
    value: 'usa',
    label: 'United States',
    children: [
      {
        value: 'ca',
        label: 'California',
        children: [
          { value: 'sf', label: 'San Francisco' },
          { value: 'la', label: 'Los Angeles' },
          { value: 'sd', label: 'San Diego' },
        ],
      },
      {
        value: 'ny',
        label: 'New York',
        children: [
          { value: 'nyc', label: 'New York City' },
          { value: 'buf', label: 'Buffalo' },
        ],
      },
      {
        value: 'tx',
        label: 'Texas',
        children: [
          { value: 'hou', label: 'Houston' },
          { value: 'dal', label: 'Dallas' },
          { value: 'aus', label: 'Austin' },
        ],
      },
    ],
  },
  {
    value: 'canada',
    label: 'Canada',
    children: [
      {
        value: 'on',
        label: 'Ontario',
        children: [
          { value: 'tor', label: 'Toronto' },
          { value: 'ott', label: 'Ottawa' },
        ],
      },
      {
        value: 'bc',
        label: 'British Columbia',
        children: [
          { value: 'van', label: 'Vancouver' },
          { value: 'vic', label: 'Victoria' },
        ],
      },
    ],
  },
  {
    value: 'uk',
    label: 'United Kingdom',
    children: [
      {
        value: 'eng',
        label: 'England',
        children: [
          { value: 'lon', label: 'London' },
          { value: 'man', label: 'Manchester' },
        ],
      },
      {
        value: 'sco',
        label: 'Scotland',
        children: [
          { value: 'edi', label: 'Edinburgh' },
          { value: 'gla', label: 'Glasgow' },
        ],
      },
    ],
  },
]

const categoryOptions: CascaderOption[] = [
  {
    value: 'electronics',
    label: 'Electronics',
    children: [
      {
        value: 'phones',
        label: 'Phones',
        children: [
          { value: 'iphone', label: 'iPhone' },
          { value: 'samsung', label: 'Samsung' },
          { value: 'pixel', label: 'Google Pixel' },
        ],
      },
      {
        value: 'laptops',
        label: 'Laptops',
        children: [
          { value: 'macbook', label: 'MacBook' },
          { value: 'thinkpad', label: 'ThinkPad' },
          { value: 'xps', label: 'Dell XPS' },
        ],
      },
    ],
  },
  {
    value: 'clothing',
    label: 'Clothing',
    children: [
      {
        value: 'mens',
        label: "Men's",
        children: [
          { value: 'shirts', label: 'Shirts' },
          { value: 'pants', label: 'Pants' },
        ],
      },
      {
        value: 'womens',
        label: "Women's",
        children: [
          { value: 'dresses', label: 'Dresses' },
          { value: 'tops', label: 'Tops' },
        ],
      },
    ],
  },
]

const disabledOptions: CascaderOption[] = [
  {
    value: 'opt1',
    label: 'Option 1',
    children: [
      { value: 'opt1-1', label: 'Option 1-1' },
      { value: 'opt1-2', label: 'Option 1-2', disabled: true },
      { value: 'opt1-3', label: 'Option 1-3' },
    ],
  },
  {
    value: 'opt2',
    label: 'Option 2',
    disabled: true,
    children: [
      { value: 'opt2-1', label: 'Option 2-1' },
    ],
  },
  {
    value: 'opt3',
    label: 'Option 3',
    children: [
      { value: 'opt3-1', label: 'Option 3-1' },
    ],
  },
]

export function CascaderPage() {
  const [basicValue, setBasicValue] = useState<(string | number)[]>([])
  const [hoverValue, setHoverValue] = useState<(string | number)[]>([])
  const [categoryValue, setCategoryValue] = useState<(string | number)[]>([])
  const [customValue, setCustomValue] = useState<(string | number)[]>([])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Cascader</h1>
        <p className="text-base-content/70">Hierarchical selection from cascading dropdown columns.</p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Cascader"
          description="Select from a hierarchical list of options."
          code={`import React, { useState } from 'react'
import { Cascader } from '@edadma/bloomui'

const options = [
  {
    value: 'usa',
    label: 'United States',
    children: [
      {
        value: 'ca',
        label: 'California',
        children: [
          { value: 'sf', label: 'San Francisco' },
          { value: 'la', label: 'Los Angeles' },
        ],
      },
      // ...more states
    ],
  },
  // ...more countries
]

const App: React.FC = () => {
  const [value, setValue] = useState([])

  return (
    <Cascader
      options={options}
      value={value}
      onChange={(val) => setValue(val)}
      placeholder="Select location"
    />
  )
}

export default App`}
        >
          <div className="w-64">
            <Cascader
              options={locationOptions}
              value={basicValue}
              onChange={(val) => setBasicValue(val)}
              placeholder="Select location"
            />
            {basicValue.length > 0 && (
              <p className="mt-2 text-sm text-base-content/70">
                Value: {JSON.stringify(basicValue)}
              </p>
            )}
          </div>
        </ExampleSection>

        <ExampleSection
          title="Expand on Hover"
          description="Expand columns when hovering over options."
          code={`<Cascader
  options={options}
  expandTrigger="hover"
  placeholder="Hover to expand"
/>`}
        >
          <div className="w-64">
            <Cascader
              options={locationOptions}
              value={hoverValue}
              onChange={(val) => setHoverValue(val)}
              expandTrigger="hover"
              placeholder="Hover to expand"
            />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Custom Display"
          description="Customize how the selected value is displayed."
          code={`<Cascader
  options={options}
  displayRender={(labels) => labels.join(' > ')}
  placeholder="Select category"
/>`}
        >
          <div className="w-64">
            <Cascader
              options={categoryOptions}
              value={categoryValue}
              onChange={(val) => setCategoryValue(val)}
              displayRender={(labels) => labels.join(' > ')}
              placeholder="Select category"
            />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Different Sizes"
          description="Cascader in various sizes."
          code={`<Space direction="vertical">
  <Cascader size="xs" options={options} placeholder="Extra small" />
  <Cascader size="sm" options={options} placeholder="Small" />
  <Cascader size="md" options={options} placeholder="Medium" />
  <Cascader size="lg" options={options} placeholder="Large" />
</Space>`}
        >
          <Space direction="vertical" className="w-64">
            <Cascader size="xs" options={locationOptions} placeholder="Extra small" />
            <Cascader size="sm" options={locationOptions} placeholder="Small" />
            <Cascader size="md" options={locationOptions} placeholder="Medium" />
            <Cascader size="lg" options={locationOptions} placeholder="Large" />
          </Space>
        </ExampleSection>

        <ExampleSection
          title="Disabled Options"
          description="Individual options or the entire cascader can be disabled."
          code={`const options = [
  { value: 'opt1', label: 'Option 1', children: [...] },
  { value: 'opt2', label: 'Option 2 (disabled)', disabled: true },
  { value: 'opt3', label: 'Option 3', children: [...] },
]

<Cascader options={options} />`}
        >
          <div className="w-64">
            <Cascader
              options={disabledOptions}
              placeholder="Some options disabled"
            />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Disabled Cascader"
          description="Entire cascader can be disabled."
          code={`<Cascader
  options={options}
  value={['usa', 'ca', 'sf']}
  disabled
/>`}
        >
          <div className="w-64">
            <Cascader
              options={locationOptions}
              value={['usa', 'ca', 'sf']}
              disabled
            />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Form Integration"
          description="Use Cascader with Form.Item."
          code={`<Form onFinish={(values) => console.log(values)}>
  <Form.Item name="location" label="Location" required>
    <Cascader options={options} placeholder="Select location" />
  </Form.Item>
  <Button htmlType="submit" color="primary">Submit</Button>
</Form>`}
        >
          <Form
            onFinish={(values) => alert(JSON.stringify(values))}
            className="w-64"
          >
            <Form.Item name="location" label="Location" required>
              <Cascader options={locationOptions} placeholder="Select location" />
            </Form.Item>
            <Button htmlType="submit" color="primary">Submit</Button>
          </Form>
        </ExampleSection>

        <ExampleSection
          title="Default Value"
          description="Set an initial selected value."
          code={`<Cascader
  options={options}
  value={customValue}
  onChange={setCustomValue}
/>`}
        >
          <div className="w-64">
            <Cascader
              options={locationOptions}
              value={customValue.length ? customValue : ['canada', 'bc', 'van']}
              onChange={(val) => setCustomValue(val)}
            />
          </div>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>
        <ApiTable title="Cascader" data={cascaderApi} />
        <ApiTable title="CascaderOption" data={optionApi} className="mt-8" />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Use <code>expandTrigger="hover"</code> for faster navigation in deep hierarchies</li>
              <li>Provide <code>displayRender</code> to customize the selected path display</li>
              <li>The <code>onChange</code> callback provides both the value path and the full option objects</li>
              <li>Set <code>allowClear=&#123;false&#125;</code> to hide the clear button</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
