# TreeSelect

**Import:** `import { TreeSelect } from 'asterui'`

## Examples

### Basic TreeSelect

Simple tree selection.

```tsx
import React, { useState } from 'react'
import { TreeSelect } from 'asterui'

const treeData = [
  {
    key: 'parent-1',
    title: 'Parent 1',
    children: [
      { key: 'child-1-1', title: 'Child 1-1' },
      { key: 'child-1-2', title: 'Child 1-2' },
    ],
  },
  {
    key: 'parent-2',
    title: 'Parent 2',
    children: [
      { key: 'child-2-1', title: 'Child 2-1' },
    ],
  },
]

const App: React.FC = () => {
  const [value, setValue] = useState<string>('')

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={(val) => setValue(val as string)}
      placeholder="Select an item"
      className="w-80"
    />
  )
}

export default App
```

### Multiple Selection

Allow selecting multiple items.

```tsx
import React, { useState } from 'react'
import { TreeSelect } from 'asterui'

const treeData = [
  {
    key: 'fruits',
    title: 'Fruits',
    children: [
      { key: 'apple', title: 'Apple' },
      { key: 'banana', title: 'Banana' },
      { key: 'orange', title: 'Orange' },
    ],
  },
  {
    key: 'vegetables',
    title: 'Vegetables',
    children: [
      { key: 'carrot', title: 'Carrot' },
      { key: 'broccoli', title: 'Broccoli' },
    ],
  },
]

const App: React.FC = () => {
  const [value, setValue] = useState<string[]>([])

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={(val) => setValue(val as string[])}
      multiple
      placeholder="Select items"
      className="w-80"
    />
  )
}

export default App
```

### Checkable Tree

Tree with checkboxes for selection.

```tsx
import React, { useState } from 'react'
import { TreeSelect } from 'asterui'

const treeData = [
  {
    key: 'department-1',
    title: 'Engineering',
    children: [
      { key: 'team-1', title: 'Frontend' },
      { key: 'team-2', title: 'Backend' },
      { key: 'team-3', title: 'DevOps' },
    ],
  },
  {
    key: 'department-2',
    title: 'Design',
    children: [
      { key: 'team-4', title: 'UI/UX' },
      { key: 'team-5', title: 'Branding' },
    ],
  },
]

const App: React.FC = () => {
  const [value, setValue] = useState<string[]>([])

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={(val) => setValue(val as string[])}
      treeCheckable
      placeholder="Select departments"
      className="w-80"
    />
  )
}

export default App
```

### With Search

Enable search functionality.

```tsx
import React, { useState } from 'react'
import { TreeSelect } from 'asterui'

const treeData = [
  {
    key: 'asia',
    title: 'Asia',
    children: [
      { key: 'china', title: 'China' },
      { key: 'japan', title: 'Japan' },
      { key: 'korea', title: 'South Korea' },
    ],
  },
  {
    key: 'europe',
    title: 'Europe',
    children: [
      { key: 'france', title: 'France' },
      { key: 'germany', title: 'Germany' },
      { key: 'uk', title: 'United Kingdom' },
    ],
  },
]

const App: React.FC = () => {
  const [value, setValue] = useState<string>('')

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={(val) => setValue(val as string)}
      showSearch
      placeholder="Search countries"
      className="w-80"
    />
  )
}

export default App
```

### Sizes

Different sizes for the tree select.

```tsx
import React from 'react'
import { TreeSelect, Space } from 'asterui'

const treeData = [
  { key: '1', title: 'Option 1' },
  { key: '2', title: 'Option 2' },
]

const App: React.FC = () => (
  <Space direction="vertical" size="sm" className="w-80">
    <TreeSelect treeData={treeData} size="xs" placeholder="Extra Small" />
    <TreeSelect treeData={treeData} size="sm" placeholder="Small" />
    <TreeSelect treeData={treeData} size="md" placeholder="Medium (default)" />
    <TreeSelect treeData={treeData} size="lg" placeholder="Large" />
    <TreeSelect treeData={treeData} size="xl" placeholder="Extra Large" />
  </Space>
)

export default App
```

### Variants

Different visual variants.

```tsx
import React from 'react'
import { TreeSelect, Space } from 'asterui'

const treeData = [
  { key: '1', title: 'Option 1' },
  { key: '2', title: 'Option 2' },
]

const App: React.FC = () => (
  <Space direction="vertical" size="sm" className="w-80">
    <TreeSelect treeData={treeData} variant="outlined" placeholder="Outlined (default)" />
    <TreeSelect treeData={treeData} variant="filled" placeholder="Filled" />
    <TreeSelect treeData={treeData} variant="borderless" placeholder="Borderless" />
    <TreeSelect treeData={treeData} ghost placeholder="Ghost" />
  </Space>
)

export default App
```

### Colors

Different color variants.

```tsx
import React from 'react'
import { TreeSelect, Space } from 'asterui'

const treeData = [
  { key: '1', title: 'Option 1' },
  { key: '2', title: 'Option 2' },
]

const App: React.FC = () => (
  <Space direction="vertical" size="sm" className="w-80">
    <TreeSelect treeData={treeData} color="primary" placeholder="Primary" />
    <TreeSelect treeData={treeData} color="secondary" placeholder="Secondary" />
    <TreeSelect treeData={treeData} color="accent" placeholder="Accent" />
    <TreeSelect treeData={treeData} color="neutral" placeholder="Neutral" />
    <TreeSelect treeData={treeData} color="info" placeholder="Info" />
    <TreeSelect treeData={treeData} color="success" placeholder="Success" />
    <TreeSelect treeData={treeData} color="warning" placeholder="Warning" />
    <TreeSelect treeData={treeData} color="error" placeholder="Error" />
  </Space>
)

export default App
```

### Status

Validation status indicators.

```tsx
import React from 'react'
import { TreeSelect, Space } from 'asterui'

const treeData = [
  { key: '1', title: 'Option 1' },
  { key: '2', title: 'Option 2' },
]

const App: React.FC = () => (
  <Space direction="vertical" size="sm" className="w-80">
    <TreeSelect treeData={treeData} status="warning" placeholder="Warning status" />
    <TreeSelect treeData={treeData} status="error" placeholder="Error status" />
  </Space>
)

export default App
```

### Max Tag Count

Limit the number of displayed tags.

```tsx
import React, { useState } from 'react'
import { TreeSelect } from 'asterui'

const treeData = [
  { key: '1', title: 'Apple' },
  { key: '2', title: 'Banana' },
  { key: '3', title: 'Cherry' },
  { key: '4', title: 'Date' },
  { key: '5', title: 'Elderberry' },
]

const App: React.FC = () => {
  const [value, setValue] = useState<string[]>(['1', '2', '3', '4', '5'])

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={(val) => setValue(val as string[])}
      multiple
      maxTagCount={2}
      maxTagPlaceholder={(omitted) => `+${omitted.length} more`}
      className="w-80"
    />
  )
}

export default App
```

### Max Count

Limit the maximum number of selections.

```tsx
import React, { useState } from 'react'
import { TreeSelect } from 'asterui'

const treeData = [
  { key: '1', title: 'Option 1' },
  { key: '2', title: 'Option 2' },
  { key: '3', title: 'Option 3' },
  { key: '4', title: 'Option 4' },
  { key: '5', title: 'Option 5' },
]

const App: React.FC = () => {
  const [value, setValue] = useState<string[]>([])

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={(val) => setValue(val as string[])}
      multiple
      maxCount={3}
      placeholder="Select up to 3 items"
      className="w-80"
    />
  )
}

export default App
```

### Label In Value

Return value as object with label.

```tsx
import React, { useState } from 'react'
import { TreeSelect } from 'asterui'
import type { LabeledValue } from 'asterui'

const treeData = [
  { key: '1', title: 'Option 1' },
  { key: '2', title: 'Option 2' },
  { key: '3', title: 'Option 3' },
]

const App: React.FC = () => {
  const [value, setValue] = useState<LabeledValue | null>(null)

  return (
    <div className="space-y-2">
      <TreeSelect
        treeData={treeData}
        value={value}
        onChange={(val) => setValue(val as LabeledValue)}
        labelInValue
        placeholder="Select an option"
        className="w-80"
      />
      <pre className="text-xs bg-base-200 p-2 rounded">
        {JSON.stringify(value, null, 2)}
      </pre>
    </div>
  )
}

export default App
```

### Tree Line

Show connecting lines between nodes.

```tsx
import React, { useState } from 'react'
import { TreeSelect } from 'asterui'

const treeData = [
  {
    key: 'root',
    title: 'Root',
    children: [
      {
        key: 'branch-1',
        title: 'Branch 1',
        children: [
          { key: 'leaf-1', title: 'Leaf 1' },
          { key: 'leaf-2', title: 'Leaf 2' },
        ],
      },
      {
        key: 'branch-2',
        title: 'Branch 2',
        children: [
          { key: 'leaf-3', title: 'Leaf 3' },
        ],
      },
    ],
  },
]

const App: React.FC = () => {
  const [value, setValue] = useState<string>('')

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={(val) => setValue(val as string)}
      treeLine
      treeDefaultExpandAll
      placeholder="Select with tree lines"
      className="w-80"
    />
  )
}

export default App
```

### Tree Icons

Display icons on tree nodes.

```tsx
import React, { useState } from 'react'
import { TreeSelect } from 'asterui'

const FolderIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
)

const FileIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const treeData = [
  {
    key: 'folder-1',
    title: 'Documents',
    icon: <FolderIcon />,
    children: [
      { key: 'file-1', title: 'Report.pdf', icon: <FileIcon /> },
      { key: 'file-2', title: 'Notes.txt', icon: <FileIcon /> },
    ],
  },
  {
    key: 'folder-2',
    title: 'Images',
    icon: <FolderIcon />,
    children: [
      { key: 'file-3', title: 'Photo.jpg', icon: <FileIcon /> },
    ],
  },
]

const App: React.FC = () => {
  const [value, setValue] = useState<string>('')

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={(val) => setValue(val as string)}
      treeIcon
      treeDefaultExpandAll
      placeholder="Select a file"
      className="w-80"
    />
  )
}

export default App
```

### Custom Tag Render

Customize tag appearance.

```tsx
import React, { useState } from 'react'
import { TreeSelect, Tag } from 'asterui'

const treeData = [
  { key: 'red', title: 'Red' },
  { key: 'green', title: 'Green' },
  { key: 'blue', title: 'Blue' },
]

const App: React.FC = () => {
  const [value, setValue] = useState<string[]>(['red', 'green'])

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={(val) => setValue(val as string[])}
      multiple
      tagRender={({ label, value: tagValue, closable, onClose }) => (
        <Tag
          color={tagValue as 'primary' | 'secondary' | 'accent'}
          closable={closable}
          onClose={onClose}
          className="mr-1"
        >
          {label}
        </Tag>
      )}
      className="w-80"
    />
  )
}

export default App
```

### Show Checked Strategy

Control which items appear in selection display.

```tsx
import React, { useState } from 'react'
import { TreeSelect, Space } from 'asterui'

const treeData = [
  {
    key: 'parent',
    title: 'Parent',
    children: [
      { key: 'child-1', title: 'Child 1' },
      { key: 'child-2', title: 'Child 2' },
      { key: 'child-3', title: 'Child 3' },
    ],
  },
]

const App: React.FC = () => {
  const [value1, setValue1] = useState<string[]>([])
  const [value2, setValue2] = useState<string[]>([])
  const [value3, setValue3] = useState<string[]>([])

  return (
    <Space direction="vertical" size="sm" className="w-80">
      <div>
        <p className="text-sm mb-1">SHOW_ALL (default)</p>
        <TreeSelect
          treeData={treeData}
          value={value1}
          onChange={(val) => setValue1(val as string[])}
          treeCheckable
          showCheckedStrategy="SHOW_ALL"
          treeDefaultExpandAll
        />
      </div>
      <div>
        <p className="text-sm mb-1">SHOW_PARENT</p>
        <TreeSelect
          treeData={treeData}
          value={value2}
          onChange={(val) => setValue2(val as string[])}
          treeCheckable
          showCheckedStrategy="SHOW_PARENT"
          treeDefaultExpandAll
        />
      </div>
      <div>
        <p className="text-sm mb-1">SHOW_CHILD</p>
        <TreeSelect
          treeData={treeData}
          value={value3}
          onChange={(val) => setValue3(val as string[])}
          treeCheckable
          showCheckedStrategy="SHOW_CHILD"
          treeDefaultExpandAll
        />
      </div>
    </Space>
  )
}

export default App
```

### Async Loading

Load children data asynchronously.

```tsx
import React, { useState } from 'react'
import { TreeSelect } from 'asterui'
import type { TreeDataNode } from 'asterui'

const App: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const [treeData, setTreeData] = useState<TreeDataNode[]>([
    { key: 'expand-1', title: 'Expand to load', isLeaf: false },
    { key: 'expand-2', title: 'Expand to load', isLeaf: false },
  ])

  const loadData = async (node: TreeDataNode) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const children: TreeDataNode[] = [
      { key: `${node.key}-1`, title: `${node.title} - Child 1`, isLeaf: true },
      { key: `${node.key}-2`, title: `${node.title} - Child 2`, isLeaf: true },
    ]

    setTreeData((prev) => {
      const updateNode = (nodes: TreeDataNode[]): TreeDataNode[] =>
        nodes.map((n) => {
          if (n.key === node.key) {
            return { ...n, children }
          }
          if (n.children) {
            return { ...n, children: updateNode(n.children) }
          }
          return n
        })
      return updateNode(prev)
    })
  }

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={(val) => setValue(val as string)}
      loadData={loadData}
      placeholder="Expand to load children"
      className="w-80"
    />
  )
}

export default App
```

### Custom Field Names

Use custom field names in tree data.

```tsx
import React, { useState } from 'react'
import { TreeSelect } from 'asterui'

const treeData = [
  {
    id: 'cat-1',
    name: 'Category 1',
    items: [
      { id: 'item-1', name: 'Item 1' },
      { id: 'item-2', name: 'Item 2' },
    ],
  },
  {
    id: 'cat-2',
    name: 'Category 2',
    items: [
      { id: 'item-3', name: 'Item 3' },
    ],
  },
]

const App: React.FC = () => {
  const [value, setValue] = useState<string>('')

  return (
    <TreeSelect
      treeData={treeData as any}
      value={value}
      onChange={(val) => setValue(val as string)}
      fieldNames={{ label: 'name', value: 'id', children: 'items' }}
      treeDefaultExpandAll
      placeholder="Select item"
      className="w-80"
    />
  )
}

export default App
```

### Controlled Dropdown

Control dropdown visibility externally.

```tsx
import React, { useState } from 'react'
import { TreeSelect, Button, Space } from 'asterui'

const treeData = [
  { key: '1', title: 'Option 1' },
  { key: '2', title: 'Option 2' },
  { key: '3', title: 'Option 3' },
]

const App: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const [open, setOpen] = useState(false)

  return (
    <Space direction="vertical" size="sm">
      <Space size="sm">
        <Button size="sm" onClick={() => setOpen(true)}>Open</Button>
        <Button size="sm" onClick={() => setOpen(false)}>Close</Button>
      </Space>
      <TreeSelect
        treeData={treeData}
        value={value}
        onChange={(val) => setValue(val as string)}
        open={open}
        onDropdownVisibleChange={setOpen}
        placeholder="Controlled dropdown"
        className="w-80"
      />
    </Space>
  )
}

export default App
```

## API

### TreeSelect

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `treeData` | Tree data | `TreeDataNode[]` | `[]` |
| `value` | Selected value(s) | `string \| string[] \| LabeledValue \| LabeledValue[]` | `-` |
| `defaultValue` | Default selected value(s) | `string \| string[] \| LabeledValue \| LabeledValue[]` | `[]` |
| `onChange` | Callback when selection changes | `(value, labels, extra?) => void` | `-` |
| `multiple` | Allow multiple selections | `boolean` | `false` |
| `treeCheckable` | Show checkboxes | `boolean` | `false` |
| `treeCheckStrictly` | Disable parent-child check relationship | `boolean` | `false` |
| `showCheckedStrategy` | Strategy for displaying checked items | `'SHOW_ALL' \| 'SHOW_PARENT' \| 'SHOW_CHILD'` | `'SHOW_ALL'` |
| `showSearch` | Enable search | `boolean` | `false` |
| `searchValue` | Controlled search value | `string` | `-` |
| `onSearch` | Callback when search changes | `(value: string) => void` | `-` |
| `filterTreeNode` | Custom filter function | `(searchValue: string, node: TreeDataNode) => boolean` | `-` |
| `placeholder` | Placeholder text | `string` | `'Please select'` |
| `allowClear` | Show clear button | `boolean` | `true` |
| `disabled` | Disable the component | `boolean` | `false` |
| `size` | Component size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `color` | Border color | `'primary' \| 'secondary' \| 'accent' \| 'neutral' \| 'info' \| 'success' \| 'warning' \| 'error'` | `-` |
| `status` | Validation status | `'warning' \| 'error'` | `-` |
| `variant` | Visual variant | `'outlined' \| 'filled' \| 'borderless'` | `'outlined'` |
| `ghost` | Ghost style with no background | `boolean` | `false` |
| `maxTagCount` | Max tags to display | `number \| 'responsive'` | `-` |
| `maxTagPlaceholder` | Placeholder for hidden tags | `ReactNode \| ((omittedValues: string[]) => ReactNode)` | `-` |
| `maxCount` | Max number of selections | `number` | `-` |
| `labelInValue` | Return value as {value, label} | `boolean` | `false` |
| `tagRender` | Custom tag renderer | `(props) => ReactNode` | `-` |
| `treeLine` | Show connecting lines | `boolean` | `false` |
| `treeIcon` | Show node icons | `boolean` | `false` |
| `treeDefaultExpandAll` | Expand all nodes by default | `boolean` | `false` |
| `treeDefaultExpandedKeys` | Default expanded node keys | `string[]` | `[]` |
| `treeExpandedKeys` | Controlled expanded keys | `string[]` | `-` |
| `onTreeExpand` | Callback when expand changes | `(expandedKeys: string[]) => void` | `-` |
| `loadData` | Async load children | `(node: TreeDataNode) => Promise<void>` | `-` |
| `fieldNames` | Custom field mapping | `{ label?: string; value?: string; children?: string }` | `-` |
| `open` | Controlled dropdown visibility | `boolean` | `-` |
| `onDropdownVisibleChange` | Callback when dropdown visibility changes | `(open: boolean) => void` | `-` |
| `suffixIcon` | Custom suffix icon | `ReactNode` | `-` |
| `switcherIcon` | Custom expand/collapse icon | `ReactNode \| ((props: { expanded: boolean }) => ReactNode)` | `-` |
| `notFoundContent` | Empty state content | `ReactNode` | `'No results found'` |
| `dropdownRender` | Custom dropdown renderer | `(menu: ReactNode) => ReactNode` | `-` |
| `popupClassName` | Dropdown class name | `string` | `-` |
| `data-testid` | Test ID | `string` | `'treeselect'` |

### TreeDataNode

| Property | Description | Type |
|----------|-------------|------|
| `key` | Unique identifier | `string` |
| `title` | Display text | `ReactNode` |
| `children` | Child nodes | `TreeDataNode[]` |
| `disabled` | Disable selection | `boolean` |
| `isLeaf` | Is leaf node (no children) | `boolean` |
| `icon` | Custom icon (requires treeIcon=true) | `ReactNode` |

### LabeledValue

| Property | Description | Type |
|----------|-------------|------|
| `value` | The actual value | `string` |
| `label` | Display label | `ReactNode` |

### Static Constants

Access via `TreeSelect.SHOW_ALL`, `TreeSelect.SHOW_PARENT`, `TreeSelect.SHOW_CHILD`:

```tsx
import { TreeSelectComponent } from 'asterui'

// Use constants
const strategy = TreeSelectComponent.SHOW_PARENT
```

## Accessibility

The TreeSelect component follows accessibility best practices:

- Uses `role="combobox"` on trigger with `aria-expanded`, `aria-haspopup`
- Uses `role="tree"` and `role="treeitem"` for tree structure
- Supports `aria-selected`, `aria-disabled`, `aria-activedescendant`
- Full keyboard navigation: Arrow keys, Enter, Space, Escape, Home, End

### Keyboard Support

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Open dropdown / Select focused item |
| `Escape` | Close dropdown |
| `ArrowDown` | Move focus to next item |
| `ArrowUp` | Move focus to previous item |
| `ArrowRight` | Expand node |
| `ArrowLeft` | Collapse node / Move to parent |
| `Home` | Move focus to first item |
| `End` | Move focus to last item |

## Testing

The component exposes `data-testid` attributes for testing:

| Element | Test ID |
|---------|---------|
| Root | `{baseTestId}` |
| Trigger | `{baseTestId}-trigger` |
| Dropdown | `{baseTestId}-dropdown` |
| Search input | `{baseTestId}-search` |
| Option | `{baseTestId}-option-{key}` |
| Tag | `{baseTestId}-tag-{key}` |
| Clear button | `{baseTestId}-clear` |
| Empty state | `{baseTestId}-empty` |

Data attributes:
- `data-state`: `'open'` or `'closed'`
- `data-disabled`: Present when disabled

Pass a custom `data-testid` prop to use a different base ID:

```tsx
<TreeSelect data-testid="location-picker" {...props} />
// Results in: location-picker-trigger, location-picker-dropdown, etc.
```
