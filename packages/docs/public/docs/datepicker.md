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

### With Time Selection

Date picker with time selection.

```tsx
import React from 'react'
import { DatePicker } from 'asterui'

const App: React.FC = () => (
  <DatePicker showTime placeholder="Select date and time" />
)

export default App
```

### Date Range

Select a date range.

```tsx
import React from 'react'
import { DatePicker } from 'asterui'

const App: React.FC = () => (
  <DatePicker range placeholder={['Start date', 'End date']} />
)

export default App
```

### Picker Types

Different picker types for various granularities.

```tsx
import React from 'react'
import { DatePicker, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="sm">
    <DatePicker picker="date" placeholder="Select date" />
    <DatePicker picker="week" placeholder="Select week" />
    <DatePicker picker="month" placeholder="Select month" />
    <DatePicker picker="year" placeholder="Select year" />
  </Space>
)

export default App
```

### Disabled Dates

Disable specific dates (e.g., past dates).

```tsx
import React from 'react'
import { DatePicker } from 'asterui'

const App: React.FC = () => (
  <DatePicker
    placeholder="Select future date"
    disabledDate={(date) => date < new Date()}
  />
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
  </Space>
)

export default App
```

## API

### Date Picker

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `format` | Display format string | `string` | `YYYY-MM-DD` |
| `picker` | Picker type | `date' \| 'week' \| 'month' \| 'year` | `date` |
| `showTime` | Enable time selection | `boolean` | `false` |
| `range` | Enable date range selection | `boolean` | `false` |
| `disabledDate` | Function to disable specific dates | `(date: Date) => boolean` | `-` |
| `placeholder` | Input placeholder | `string` | `-` |
| `disabled` | Disable the picker | `boolean` | `false` |
| `size` | Input size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `data-testid` | Test ID prefix for child elements | `string` | `-` |
| `className` | Additional CSS classes | `string` | `-` |
