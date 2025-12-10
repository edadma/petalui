import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Cascader } from 'asterui'
import type { CascaderOption } from 'asterui'
import { CheckIconSvg } from './icons'

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

const simpleOptions: CascaderOption[] = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' },
]

const foodOptions: CascaderOption[] = [
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

// Basic demo
function BasicDemo() {
  return <Cascader options={locationOptions} placeholder="Select location" />
}

// Hover demo
function HoverDemo() {
  return <Cascader options={categoryOptions} expandTrigger="hover" placeholder="Select category" />
}

// Sizes demo
function SizesDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Cascader size="xs" options={simpleOptions} placeholder="Extra small" />
      <Cascader size="sm" options={simpleOptions} placeholder="Small" />
      <Cascader size="md" options={simpleOptions} placeholder="Medium" />
      <Cascader size="lg" options={simpleOptions} placeholder="Large" />
    </div>
  )
}

// Disabled demo
function DisabledDemo() {
  return <Cascader options={simpleOptions} disabled value={['opt1']} />
}

// Search demo
function SearchDemo() {
  return <Cascader options={locationOptions} showSearch placeholder="Search locations" />
}

// Change on select demo
function ChangeOnSelectDemo() {
  const [value, setValue] = useState<string[]>([])

  return (
    <div>
      <Cascader
        options={locationOptions}
        changeOnSelect
        value={value}
        onChange={setValue}
        placeholder="Select any level"
      />
      <p className="mt-2 text-sm">Selected: {value.join(' / ') || 'None'}</p>
    </div>
  )
}

// Async loading demo
function AsyncLoadDemo() {
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

  return <Cascader options={options} loadData={loadData} placeholder="Load on expand" />
}

// Status demo
function StatusDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Cascader options={simpleOptions} status="error" placeholder="Error state" />
      <Cascader options={simpleOptions} status="warning" placeholder="Warning state" />
    </div>
  )
}

// Multiple demo
function MultipleDemo() {
  return <Cascader options={foodOptions} multiple placeholder="Select multiple" />
}

// Stateful demos mapping
const statefulDemos: Record<string, React.FC> = {
  basic: BasicDemo,
  hover: HoverDemo,
  sizes: SizesDemo,
  disabled: DisabledDemo,
  search: SearchDemo,
  'change-on-select': ChangeOnSelectDemo,
  'async-load': AsyncLoadDemo,
  status: StatusDemo,
  multiple: MultipleDemo,
}

// Mount React demos
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll<HTMLElement>('.demo-container').forEach(container => {
    const exampleId = container.dataset.example
    if (exampleId && statefulDemos[exampleId]) {
      const root = createRoot(container)
      const Component = statefulDemos[exampleId]
      root.render(<Component />)
    }
  })
})

// Copy button functionality
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const code = btn.getAttribute('data-code')
    if (code) {
      await navigator.clipboard.writeText(code)
      const originalHTML = btn.innerHTML
      btn.innerHTML = CheckIconSvg
      setTimeout(() => {
        btn.innerHTML = originalHTML
      }, 2000)
    }
  })
})
