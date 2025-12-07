# InputNumber

**Import:** `import { InputNumber } from 'asterui'`

## Examples

### Basic Input Number

Simple number input with increment/decrement controls.

```tsx
import React, { useState } from 'react'
import { InputNumber } from 'asterui'

const App: React.FC = () => {
  const [value, setValue] = useState(0)

  return (
    <InputNumber value={value} onChange={setValue} />
  )
}

export default App
```

### Min/Max Limits

Number input with minimum and maximum value constraints.

```tsx
import React, { useState } from 'react'
import { InputNumber, Space } from 'asterui'

const App: React.FC = () => {
  const [value, setValue] = useState(5)

  return (
    <Space direction="vertical" size="sm">
      <InputNumber
        value={value}
        onChange={setValue}
        min={0}
        max={10}
      />
      <div className="text-sm text-base-content/70">
        Value: {value} (min: 0, max: 10)
      </div>
    </Space>
  )
}

export default App
```

### Custom Step

Number input with custom increment/decrement step value.

```tsx
import React, { useState } from 'react'
import { InputNumber, Space } from 'asterui'

const App: React.FC = () => {
  const [value, setValue] = useState(0)

  return (
    <Space direction="vertical" size="sm">
      <InputNumber
        value={value}
        onChange={setValue}
        step={5}
      />
      <div className="text-sm text-base-content/70">
        Step: 5
      </div>
    </Space>
  )
}

export default App
```

### Decimal Precision

Number input with decimal precision control.

```tsx
import React, { useState } from 'react'
import { InputNumber, Space } from 'asterui'

const App: React.FC = () => {
  const [value, setValue] = useState(0)

  return (
    <Space direction="vertical" size="sm">
      <InputNumber
        value={value}
        onChange={setValue}
        step={0.1}
        precision={2}
      />
      <div className="text-sm text-base-content/70">
        Precision: 2 decimal places
      </div>
    </Space>
  )
}

export default App
```

### Sizes

Five sizes: xs, sm, md, lg, and xl.

```tsx
import React, { useState } from 'react'
import { InputNumber, Space } from 'asterui'

const App: React.FC = () => {
  const [value1, setValue1] = useState(0)
  const [value2, setValue2] = useState(0)
  const [value3, setValue3] = useState(0)
  const [value4, setValue4] = useState(0)
  const [value5, setValue5] = useState(0)

  return (
    <Space direction="vertical" size="sm">
      <InputNumber size="xs" value={value1} onChange={setValue1} />
      <InputNumber size="sm" value={value2} onChange={setValue2} />
      <InputNumber size="md" value={value3} onChange={setValue3} />
      <InputNumber size="lg" value={value4} onChange={setValue4} />
      <InputNumber size="xl" value={value5} onChange={setValue5} />
    </Space>
  )
}

export default App
```

### Without Controls

Number input without increment/decrement buttons.

```tsx
import React, { useState } from 'react'
import { InputNumber } from 'asterui'

const App: React.FC = () => {
  const [value, setValue] = useState(0)

  return (
    <InputNumber
      value={value}
      onChange={setValue}
      controls={false}
    />
  )
}

export default App
```

### Disabled

Disabled input number state.

```tsx
import React, { useState } from 'react'
import { InputNumber, Space } from 'asterui'

const App: React.FC = () => {
  const [value, setValue] = useState(42)

  return (
    <Space direction="vertical" size="sm">
      <InputNumber value={value} onChange={setValue} />
      <InputNumber value={42} onChange={() => {}} disabled />
    </Space>
  )
}

export default App
```

## API

### Input Number

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `value` | Current number value (controlled) | `number` | `-` |
| `defaultValue` | Initial value (uncontrolled) | `number` | `-` |
| `onChange` | Callback when value changes | `(value: number \| null) => void` | `-` |
| `min` | Minimum value | `number` | `-Infinity` |
| `max` | Maximum value | `number` | `Infinity` |
| `step` | Value increment/decrement step | `number` | `1` |
| `precision` | Decimal precision for display | `number` | `-` |
| `formatter` | Format display value | `(value: number \| undefined) => string` | `-` |
| `parser` | Parse display value to number | `(displayValue: string) => number` | `-` |
| `controls` | Show increment/decrement buttons | `boolean` | `true` |
| `disabled` | Disabled state | `boolean` | `false` |
| `size` | Input size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `-` |
| `block` | Full width input | `boolean` | `false` |
| `className` | Additional CSS classes | `string` | `-` |
