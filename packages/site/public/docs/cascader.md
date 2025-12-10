# Cascader

Cascade selection box for hierarchical data like locations or categories.

**Import:** `import { Cascader } from 'asterui'`

## Examples

### Basic

```tsx
import React from 'react'
import { Cascader } from 'asterui'

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

const App: React.FC = () => (
  <Cascader options={options} placeholder="Select location" />
)

export default App
```

### Hover Expand

```tsx
import React from 'react'
import { Cascader } from 'asterui'

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

const App: React.FC = () => (
  <Cascader options={options} expandTrigger="hover" placeholder="Select category" />
)

export default App
```

### Sizes

```tsx
import React from 'react'
import { Cascader } from 'asterui'

const options = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' },
]

const App: React.FC = () => (
  <div className="flex flex-col gap-2">
    <Cascader size="xs" options={options} placeholder="Extra small" />
    <Cascader size="sm" options={options} placeholder="Small" />
    <Cascader size="md" options={options} placeholder="Medium" />
    <Cascader size="lg" options={options} placeholder="Large" />
  </div>
)

export default App
```

### Disabled

```tsx
import React from 'react'
import { Cascader } from 'asterui'

const options = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' },
]

const App: React.FC = () => (
  <Cascader options={options} disabled value={['opt1']} />
)

export default App
```

### Search

```tsx
import React from 'react'
import { Cascader } from 'asterui'

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

const App: React.FC = () => (
  <Cascader options={options} showSearch placeholder="Search locations" />
)

export default App
```

### Change On Select

```tsx
import React, { useState } from 'react'
import { Cascader } from 'asterui'

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

const App: React.FC = () => {
  const [value, setValue] = useState<string[]>([])

  return (
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
  )
}

export default App
```

### Async Loading

```tsx
import React, { useState } from 'react'
import { Cascader } from 'asterui'
import type { CascaderOption } from 'asterui'

const App: React.FC = () => {
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

export default App
```

### Validation Status

```tsx
import React from 'react'
import { Cascader } from 'asterui'

const options = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' },
]

const App: React.FC = () => (
  <div className="flex flex-col gap-2">
    <Cascader options={options} status="error" placeholder="Error state" />
    <Cascader options={options} status="warning" placeholder="Warning state" />
  </div>
)

export default App
```

### Multiple Selection

```tsx
import React from 'react'
import { Cascader } from 'asterui'

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

const App: React.FC = () => (
  <Cascader options={options} multiple placeholder="Select multiple" />
)

export default App
```

## API

### Cascader

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `options` | Hierarchical options data | `CascaderOption[]` | `[]` |
| `value` | Controlled selected value path | `string[]` | `-` |
| `defaultValue` | Default selected value (uncontrolled) | `string[]` | `[]` |
| `onChange` | Callback when selection changes | `(value: string[], selectedOptions: CascaderOption[]) => void` | `-` |
| `placeholder` | Input placeholder text | `string` | `'Please select'` |
| `disabled` | Disable the cascader | `boolean` | `false` |
| `allowClear` | Show clear button | `boolean` | `true` |
| `expandTrigger` | How to expand sub-menus | `'click' \| 'hover'` | `'click'` |
| `changeOnSelect` | Allow selection of any level, not just leaves | `boolean` | `false` |
| `displayRender` | Custom display render function | `(labels: ReactNode[], selectedOptions: CascaderOption[]) => ReactNode` | `-` |
| `size` | Input size | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` |
| `color` | Focus ring color | `'primary' \| 'secondary' \| 'accent' \| 'info' \| 'success' \| 'warning' \| 'error'` | `-` |
| `status` | Validation status | `'error' \| 'warning'` | `-` |
| `showSearch` | Enable search functionality | `boolean \| { filter?, render?, matchInputWidth? }` | `false` |
| `notFoundContent` | Content when no search results | `ReactNode` | `'No results found'` |
| `loadData` | Async data loading function | `(selectedOptions: CascaderOption[]) => Promise<void>` | `-` |
| `fieldNames` | Custom field names for data mapping | `{ label?: string; value?: string; children?: string }` | `-` |
| `open` | Controlled dropdown open state | `boolean` | `-` |
| `onDropdownVisibleChange` | Callback when dropdown visibility changes | `(open: boolean) => void` | `-` |
| `popupClassName` | Class name for dropdown | `string` | `-` |
| `dropdownRender` | Custom dropdown wrapper render | `(menu: ReactNode) => ReactNode` | `-` |
| `multiple` | Enable multiple selection mode | `boolean` | `false` |
| `maxTagCount` | Max tags to show in multiple mode | `number \| 'responsive'` | `-` |
| `className` | Additional CSS classes | `string` | `-` |

### CascaderOption

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `value` | Unique identifier | `string` | `-` |
| `label` | Display label | `ReactNode` | `-` |
| `children` | Child options | `CascaderOption[]` | `-` |
| `disabled` | Disable this option | `boolean` | `false` |
| `isLeaf` | Force as leaf node (no expand, no async load) | `boolean` | `-` |

## Accessibility

The Cascader component follows WAI-ARIA combobox pattern:

- Uses `role="combobox"` on trigger with `aria-expanded`, `aria-haspopup`
- `aria-activedescendant` tracks focused option for screen readers
- `aria-selected` indicates selected state on options
- `aria-disabled` indicates disabled state
- Clear button has `aria-label="Clear selection"`

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `↓` | Open dropdown or move to next option |
| `↑` | Move to previous option |
| `→` | Move to next column (expand) |
| `←` | Move to previous column |
| `Enter` | Select focused option or open dropdown |
| `Space` | Toggle dropdown (when not searching) |
| `Escape` | Close dropdown |
| `Home` | Move to first option |
| `End` | Move to last option |

## Testing

The component includes data attributes for testing:

- `data-testid="cascader"` on the root container
- `data-testid="cascader-dropdown"` on the dropdown
- `data-testid="cascader-option-{value}"` on each option
- `data-testid="cascader-clear"` on the clear button
- `data-state="open|closed"` on root indicates dropdown state
- `data-state="selected|hovered"` on options indicates state
- `data-value="{value}"` on options provides the value
