import { useState } from 'react'
import { Cascader } from 'asterui'
import type { CascaderOption } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
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

  return (
    <Demo>
      <Cascader options={options} placeholder="Select location" />
    </Demo>
  )
}

export function HoverDemo() {
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

  return (
    <Demo>
      <Cascader options={options} expandTrigger="hover" placeholder="Select category" />
    </Demo>
  )
}

export function SizesDemo() {
  const options = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
  ]

  return (
    <Demo>
      <div className="flex flex-col gap-2">
        <Cascader size="xs" options={options} placeholder="Extra small" />
        <Cascader size="sm" options={options} placeholder="Small" />
        <Cascader size="md" options={options} placeholder="Medium" />
        <Cascader size="lg" options={options} placeholder="Large" />
      </div>
    </Demo>
  )
}

export function DisabledDemo() {
  const options = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
  ]

  return (
    <Demo>
      <Cascader options={options} disabled value={['opt1']} />
    </Demo>
  )
}

export function SearchDemo() {
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

  return (
    <Demo>
      <Cascader options={options} showSearch placeholder="Search locations" />
    </Demo>
  )
}

export function ChangeOnSelectDemo() {
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

  return (
    <Demo>
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
    </Demo>
  )
}

export function AsyncLoadDemo() {
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

  return (
    <Demo>
      <Cascader options={options} loadData={loadData} placeholder="Load on expand" />
    </Demo>
  )
}

export function StatusDemo() {
  const options = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
  ]

  return (
    <Demo>
      <div className="flex flex-col gap-2">
        <Cascader options={options} status="error" placeholder="Error state" />
        <Cascader options={options} status="warning" placeholder="Warning state" />
      </div>
    </Demo>
  )
}

export function MultipleDemo() {
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

  return (
    <Demo>
      <Cascader options={options} multiple placeholder="Select multiple" />
    </Demo>
  )
}
