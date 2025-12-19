import { useState } from 'react'
import { Cascader } from '@aster-ui/prefixed'
import type { CascaderOption } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Cascader } from 'asterui'
export function BasicDemo() {
  // @example-include
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
        {
          value: 'ny',
          label: 'New York',
          children: [
            { value: 'nyc', label: 'New York City' },
            { value: 'buf', label: 'Buffalo' },
          ],
        },
      ],
    },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Cascader options={options} placeholder="Select location" />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Cascader } from 'asterui'
export function HoverDemo() {
  // @example-include
  const options = [
    {
      value: 'electronics',
      label: 'Electronics',
      children: [
        {
          value: 'phones',
          label: 'Phones',
          children: [
            { value: 'iphone', label: 'iPhone' },
            { value: 'android', label: 'Android' },
          ],
        },
        {
          value: 'computers',
          label: 'Computers',
          children: [
            { value: 'laptop', label: 'Laptop' },
            { value: 'desktop', label: 'Desktop' },
          ],
        },
      ],
    },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Cascader options={options} expandTrigger="hover" placeholder="Select category" />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Cascader } from 'asterui'
export function SizesDemo() {
  // @example-include
  const options = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div className="flex flex-col gap-2">
        <Cascader size="xs" options={options} placeholder="Extra small" />
        <Cascader size="sm" options={options} placeholder="Small" />
        <Cascader size="md" options={options} placeholder="Medium" />
        <Cascader size="lg" options={options} placeholder="Large" />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Cascader } from 'asterui'
export function DisabledDemo() {
  // @example-include
  const options = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Cascader options={options} disabled value={['opt1']} />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Cascader } from 'asterui'
export function SearchDemo() {
  // @example-include
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
      ],
    },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Cascader options={options} showSearch placeholder="Search locations" />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Cascader } from 'asterui'
// @example-imports: { useState } from 'react'
export function ChangeOnSelectDemo() {
  // @example-include
  const [value, setValue] = useState<string[]>([])
  const options = [
    {
      value: 'usa',
      label: 'United States',
      children: [
        { value: 'ca', label: 'California' },
        { value: 'ny', label: 'New York' },
      ],
    },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Cascader
          options={options}
          changeOnSelect
          value={value}
          onChange={setValue}
          placeholder="Select any level"
        />
        <p className="mt-2 text-sm">Selected: {value.join(' / ') || 'None'}</p>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Cascader } from 'asterui'
// @example-imports: { useState } from 'react'
export function AsyncLoadDemo() {
  // @example-include
  const [options, setOptions] = useState<CascaderOption[]>([
    { value: 'region1', label: 'Region 1' },
    { value: 'region2', label: 'Region 2' },
  ])

  const loadData = async (selectedOptions: CascaderOption[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    await new Promise(resolve => setTimeout(resolve, 1000))

    setOptions(prev => {
      const update = (opts: CascaderOption[]): CascaderOption[] =>
        opts.map(opt =>
          opt.value === targetOption.value
            ? {
                ...opt,
                children: [
                  { value: `${opt.value}-1`, label: 'Child 1', isLeaf: true },
                  { value: `${opt.value}-2`, label: 'Child 2', isLeaf: true },
                ],
              }
            : { ...opt, children: opt.children ? update(opt.children) : undefined }
        )
      return update(prev)
    })
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Cascader options={options} loadData={loadData} placeholder="Load on expand" />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Cascader } from 'asterui'
export function StatusDemo() {
  // @example-include
  const options = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div className="flex flex-col gap-2">
        <Cascader options={options} status="error" placeholder="Error state" />
        <Cascader options={options} status="warning" placeholder="Warning state" />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Cascader } from 'asterui'
export function MultipleDemo() {
  // @example-include
  const options = [
    {
      value: 'fruits',
      label: 'Fruits',
      children: [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
      ],
    },
    {
      value: 'vegetables',
      label: 'Vegetables',
      children: [
        { value: 'carrot', label: 'Carrot' },
        { value: 'lettuce', label: 'Lettuce' },
      ],
    },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Cascader options={options} multiple placeholder="Select multiple" />
      {/* @example-return-end */}
    </Demo>
  )
}
