# DatePicker

**Import:** `import { DatePicker } from 'asterui'`

## Examples

### Basic DatePicker

Simple date selection.

```tsx
import React from 'react'
import { DatePicker } from 'asterui'

const App: React.FC = () => (
  <DatePicker placeholder="Select date" />
)

export default App
```

### Controlled

Controlled date picker with onChange handler.

```tsx
import React, { useState } from 'react'
import { DatePicker } from 'asterui'

const App: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <DatePicker value={date} onChange={setDate} placeholder="Select date" />
  )
}

export default App
```

### Default Value

Date picker with initial value.

```tsx
import React from 'react'
import { DatePicker } from 'asterui'

const App: React.FC = () => (
  <DatePicker defaultValue={new Date()} placeholder="Select date" />
)

export default App
```

### Date Formats

Different display format strings.

```tsx
import React from 'react'
import { DatePicker, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="sm">
    <DatePicker placeholder="MM/DD/YYYY (default)" format="MM/DD/YYYY" />
    <DatePicker placeholder="DD/MM/YYYY" format="DD/MM/YYYY" />
    <DatePicker placeholder="YYYY-MM-DD" format="YYYY-MM-DD" />
  </Space>
)

export default App
```

### Disabled Dates

Disable specific dates (e.g., past dates).

```tsx
import React from 'react'
import { DatePicker, Space } from 'asterui'

const disablePastDates = (date: Date) => date < new Date(new Date().setHours(0, 0, 0, 0))

const App: React.FC = () => (
  <Space direction="vertical" size="sm">
    <DatePicker placeholder="Disable past dates" disabledDate={disablePastDates} />
    <DatePicker.Range placeholder={['Start date', 'End date']} disabledDate={disablePastDates} />
  </Space>
)

export default App
```

### Date Range

Select a start and end date.

```tsx
import React from 'react'
import { DatePicker } from 'asterui'

const App: React.FC = () => (
  <DatePicker.Range placeholder={['Start date', 'End date']} />
)

export default App
```

### Sizes

Different input sizes.

```tsx
import React from 'react'
import { DatePicker, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="sm">
    <DatePicker size="xs" placeholder="Extra small" />
    <DatePicker size="sm" placeholder="Small" />
    <DatePicker size="md" placeholder="Medium" />
    <DatePicker size="lg" placeholder="Large" />
    <DatePicker size="xl" placeholder="Extra large" />
  </Space>
)

export default App
```

### Disabled

Disabled date picker.

```tsx
import React from 'react'
import { DatePicker } from 'asterui'

const App: React.FC = () => (
  <DatePicker disabled placeholder="Disabled" />
)

export default App
```

## API

### DatePicker

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `value` | Controlled date value | `Date \| null` | - |
| `defaultValue` | Initial date value | `Date \| null` | - |
| `onChange` | Change handler | `(date: Date \| null) => void` | - |
| `format` | Display format string | `string` | `'MM/DD/YYYY'` |
| `placeholder` | Input placeholder | `string` | `'Select date'` |
| `disabledDate` | Disable specific dates | `(date: Date) => boolean` | - |
| `disabled` | Disable the picker | `boolean` | `false` |
| `size` | Input size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `componentSize` |
| `data-testid` | Test ID prefix for child elements | `string` | - |
| `className` | Additional CSS classes | `string` | - |

### DatePicker.Range

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `value` | Controlled date range value | `[Date \| null, Date \| null]` | - |
| `defaultValue` | Initial date range value | `[Date \| null, Date \| null]` | - |
| `onChange` | Change handler | `(range: [Date \| null, Date \| null]) => void` | - |
| `format` | Display format string | `string` | `'MM/DD/YYYY'` |
| `placeholder` | Input placeholder | `[string, string] \| string` | `['Start date', 'End date']` |
| `disabledDate` | Disable specific dates | `(date: Date) => boolean` | - |
| `disabled` | Disable the picker | `boolean` | `false` |
| `size` | Input size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `componentSize` |
| `data-testid` | Test ID prefix for child elements | `string` | - |
| `className` | Additional CSS classes | `string` | - |
