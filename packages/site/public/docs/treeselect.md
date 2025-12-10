# TreeSelect

Dropdown tree selection for hierarchical data.

**Import:** `import { TreeSelect } from 'asterui'`

## Examples

### Basic

```tsx
import { useState } from 'react'
import { TreeSelect } from 'asterui'

const treeData = [
  {
    key: 'parent',
    title: 'Parent Node',
    children: [
      {
        key: 'child1',
        title: 'Child Node 1',
        children: [
          { key: 'leaf1', title: 'Leaf 1' },
          { key: 'leaf2', title: 'Leaf 2' },
        ],
      },
      { key: 'child2', title: 'Child Node 2' },
    ],
  },
]

function App() {
  const [value, setValue] = useState<string>()

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={(val) => setValue(val as string)}
      placeholder="Select an item"
    />
  )
}
```

### Multiple Selection

```tsx
import { useState } from 'react'
import { TreeSelect } from 'asterui'

function App() {
  const [value, setValue] = useState<string[]>([])

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={(val) => setValue(val as string[])}
      placeholder="Select items"
      multiple
    />
  )
}
```

### Checkable

```tsx
import { useState } from 'react'
import { TreeSelect } from 'asterui'

function App() {
  const [value, setValue] = useState<string[]>([])

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={(val) => setValue(val as string[])}
      placeholder="Check items"
      treeCheckable
    />
  )
}
```

### Searchable

```tsx
import { useState } from 'react'
import { TreeSelect } from 'asterui'

function App() {
  const [value, setValue] = useState<string>()

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={(val) => setValue(val as string)}
      placeholder="Search and select"
      showSearch
    />
  )
}
```

### Sizes

```tsx
import { TreeSelect } from 'asterui'

function App() {
  return (
    <div className="flex flex-col gap-2">
      <TreeSelect treeData={treeData} size="xs" placeholder="Extra small" />
      <TreeSelect treeData={treeData} size="sm" placeholder="Small" />
      <TreeSelect treeData={treeData} size="md" placeholder="Medium" />
      <TreeSelect treeData={treeData} size="lg" placeholder="Large" />
      <TreeSelect treeData={treeData} size="xl" placeholder="Extra large" />
    </div>
  )
}
```

### Validation Status

```tsx
import { TreeSelect } from 'asterui'

function App() {
  return (
    <div className="flex flex-col gap-2">
      <TreeSelect treeData={treeData} status="error" placeholder="Error state" />
      <TreeSelect treeData={treeData} status="warning" placeholder="Warning state" />
    </div>
  )
}
```

### Async Loading

```tsx
import { useState } from 'react'
import { TreeSelect } from 'asterui'
import type { TreeDataNode } from 'asterui'

function App() {
  const [treeData, setTreeData] = useState<TreeDataNode[]>([
    { key: 'region1', title: 'Region 1' },
    { key: 'region2', title: 'Region 2' },
  ])

  const loadData = async (node: TreeDataNode) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setTreeData((prev) => {
      const updateNode = (nodes: TreeDataNode[]): TreeDataNode[] =>
        nodes.map((n) =>
          n.key === node.key
            ? {
                ...n,
                children: [
                  { key: `${n.key}-1`, title: 'Child 1', isLeaf: true },
                  { key: `${n.key}-2`, title: 'Child 2', isLeaf: true },
                ],
              }
            : { ...n, children: n.children ? updateNode(n.children) : undefined }
        )
      return updateNode(prev)
    })
  }

  return (
    <TreeSelect
      treeData={treeData}
      loadData={loadData}
      placeholder="Expand to load"
    />
  )
}
```

### Max Tag Count

```tsx
import { useState } from 'react'
import { TreeSelect } from 'asterui'

function App() {
  const [value, setValue] = useState<string[]>([])

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={(val) => setValue(val as string[])}
      placeholder="Select items"
      treeCheckable
      maxTagCount={2}
      maxTagPlaceholder={(omitted) => `+${omitted.length} more...`}
    />
  )
}
```

### Tree Line

```tsx
import { TreeSelect } from 'asterui'

function App() {
  return (
    <TreeSelect
      treeData={treeData}
      placeholder="With tree lines"
      treeLine
      treeDefaultExpandAll
    />
  )
}
```

## API

### TreeSelect Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `treeData` | Tree data structure | `TreeDataNode[]` | `[]` |
| `value` | Selected value(s) | `string \| string[]` | - |
| `defaultValue` | Default selected value(s) | `string \| string[]` | `[]` |
| `onChange` | Callback when selection changes | `(value: string \| string[], labels: ReactNode[]) => void` | - |
| `multiple` | Allow multiple selection | `boolean` | `false` |
| `treeCheckable` | Show checkbox for tree nodes | `boolean` | `false` |
| `treeCheckStrictly` | Check without parent-child association | `boolean` | `false` |
| `showCheckedStrategy` | How to display checked items | `'SHOW_ALL' \| 'SHOW_PARENT' \| 'SHOW_CHILD'` | `'SHOW_ALL'` |
| `showSearch` | Enable search functionality | `boolean` | `false` |
| `searchValue` | Controlled search input value | `string` | - |
| `onSearch` | Callback when search input changes | `(value: string) => void` | - |
| `filterTreeNode` | Custom filter function | `(searchValue: string, node: TreeDataNode) => boolean` | - |
| `placeholder` | Placeholder text | `string` | `'Please select'` |
| `allowClear` | Show clear button | `boolean` | `true` |
| `disabled` | Disable the select | `boolean` | `false` |
| `size` | Size of the input | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `color` | Color theme | `'primary' \| 'secondary' \| 'accent' \| 'info' \| 'success' \| 'warning' \| 'error'` | - |
| `status` | Validation status | `'error' \| 'warning'` | - |
| `maxTagCount` | Max number of tags to show | `number \| 'responsive'` | - |
| `maxTagPlaceholder` | Content for hidden tags | `ReactNode \| ((omittedValues: string[]) => ReactNode)` | - |
| `treeLine` | Show connecting lines | `boolean` | `false` |
| `treeDefaultExpandAll` | Expand all tree nodes by default | `boolean` | `false` |
| `treeDefaultExpandedKeys` | Default expanded tree node keys | `string[]` | `[]` |
| `treeExpandedKeys` | Controlled expanded tree node keys | `string[]` | - |
| `onTreeExpand` | Callback when tree nodes expand/collapse | `(expandedKeys: string[]) => void` | - |
| `loadData` | Load data asynchronously | `(node: TreeDataNode) => Promise<void>` | - |
| `fieldNames` | Customize field names | `{ label?: string; value?: string; children?: string }` | - |
| `open` | Controlled dropdown visibility | `boolean` | - |
| `onDropdownVisibleChange` | Callback when dropdown visibility changes | `(open: boolean) => void` | - |
| `suffixIcon` | Custom suffix icon | `ReactNode` | - |
| `switcherIcon` | Custom expand/collapse icon | `ReactNode \| ((props: { expanded: boolean }) => ReactNode)` | - |
| `notFoundContent` | Content when no results | `ReactNode` | `'No results found'` |
| `dropdownRender` | Custom dropdown content renderer | `(menu: ReactNode) => ReactNode` | - |
| `popupClassName` | Class for dropdown | `string` | - |
| `data-testid` | Test ID for the component | `string` | `'treeselect'` |
| `className` | Additional CSS classes | `string` | - |

### TreeDataNode

| Property | Description | Type |
|----------|-------------|------|
| `key` | Unique identifier | `string` |
| `title` | Display text | `ReactNode` |
| `children` | Child nodes | `TreeDataNode[]` |
| `disabled` | Whether disabled | `boolean` |
| `isLeaf` | Whether this is a leaf node | `boolean` |

## Accessibility

The TreeSelect component follows WAI-ARIA combobox and tree patterns:

- Uses `role="combobox"` with proper `aria-expanded`, `aria-haspopup="tree"`, and `aria-owns` attributes
- Tree options use `role="tree"` and `role="treeitem"` with `aria-selected` and `aria-expanded`
- Uses `aria-activedescendant` to track focused option
- Full keyboard navigation support

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Open dropdown or select focused item |
| `Escape` | Close dropdown |
| `↓` | Open dropdown or move focus down |
| `↑` | Move focus up |
| `→` | Expand focused tree node |
| `←` | Collapse focused tree node or move to parent |
| `Home` | Move focus to first item |
| `End` | Move focus to last item |

## Testing

The component exposes `data-testid` and `data-state` attributes for testing:

| Element | Test ID | Data Attributes |
|---------|---------|-----------------|
| Root | `{baseTestId}` | `data-state="open\|closed"`, `data-disabled` |
| Trigger | `{baseTestId}-trigger` | - |
| Dropdown | `{baseTestId}-dropdown` | - |
| Search | `{baseTestId}-search` | - |
| Clear | `{baseTestId}-clear` | - |
| Option | `{baseTestId}-option-{key}` | `data-state="selected\|unselected"`, `data-disabled` |
| Tag | `{baseTestId}-tag-{key}` | - |
| Empty | `{baseTestId}-empty` | - |

Pass a custom `data-testid` prop to use a different base ID:

```tsx
<TreeSelect data-testid="category-picker" treeData={data} />
// Results in: category-picker-trigger, category-picker-dropdown, etc.
```
