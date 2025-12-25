# DateOfBirth

**Import:** `import { DateOfBirth } from 'asterui'`

## Examples

### Basic

Default month/day/year selector.

```tsx
import React from 'react'
import { DateOfBirth } from 'asterui'

const App: React.FC = () => (
  <DateOfBirth />
)

export default App
```

### Order

Switch to day/month/year order.

```tsx
import React from 'react'
import { DateOfBirth } from 'asterui'

const App: React.FC = () => (
  <DateOfBirth order="dmy" />
)

export default App
```

### Month Grid

Compact grid for month selection.

```tsx
import React from 'react'
import { DateOfBirth } from 'asterui'

const App: React.FC = () => (
  <DateOfBirth monthStyle="grid" />
)

export default App
```

### Year Input

Use a numeric year input and custom age rules.

```tsx
import React from 'react'
import { DateOfBirth } from 'asterui'

const App: React.FC = () => (
  <DateOfBirth yearStyle="input" minAge={18} yearSpan={90} />
)

export default App
```

### Controlled

Control the value via local state.

```tsx
import React, { useState } from 'react'
import { DateOfBirth } from 'asterui'

const App: React.FC = () => {
  const [dob, setDob] = useState({ month: '1', day: '15', year: '1995' })

  return (
    <DateOfBirth value={dob} onChange={setDob} />
  )
}

export default App
```

### Form Integration

Submit the value with Form and show it in a modal.

```tsx
import React from 'react'
import { Button, DateOfBirth, Form, Modal } from 'asterui'

const App: React.FC = () => {
  const form = Form.useForm()

  const handleFinish = (values: any) => {
    const dob = values.dob ?? {}
    Modal.info({
      title: 'Date of birth',
      content: (
        <div>
          <div>Month: {dob.month || '—'}</div>
          <div>Day: {dob.day || '—'}</div>
          <div>Year: {dob.year || '—'}</div>
        </div>
      ),
    })
  }

  return (
    <Form form={form} onFinish={handleFinish}>
      <Form.Item
        name="dob"
        rules={[{
          validate: (value) => (
            value?.month && value?.day && value?.year
              ? true
              : 'Please select a complete date of birth.'
          ),
        }]}
      >
        <DateOfBirth />
      </Form.Item>
      <Button htmlType="submit">Submit</Button>
    </Form>
  )
}

export default App
```
