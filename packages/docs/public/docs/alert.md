# Alert

**Import:** `import { Alert } from 'asterui'`

## Examples

### Basic Alert

Simple alert with icon and text.

```tsx
import React from 'react'
import { Alert } from 'asterui'
import { InformationCircleIcon } from '@aster-ui/icons'

const App: React.FC = () => (
  <Alert>
    <InformationCircleIcon size="lg" className="shrink-0" />
    <span>This is a basic alert</span>
  </Alert>
)

export default App
```

### Alert Types

Different color variants for context.

```tsx
import React from 'react'
import { Alert, Space } from 'asterui'
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from '@aster-ui/icons'

const App: React.FC = () => (
  <Space direction="vertical" size="sm">
    <Alert type="info">
      <InformationCircleIcon size="lg" className="shrink-0" />
      <span>Info: New software update available</span>
    </Alert>

    <Alert type="success">
      <CheckCircleIcon size="lg" className="shrink-0" />
      <span>Success: Your purchase has been confirmed</span>
    </Alert>

    <Alert type="warning">
      <ExclamationTriangleIcon size="lg" className="shrink-0" />
      <span>Warning: Invalid email address</span>
    </Alert>

    <Alert type="error">
      <XCircleIcon size="lg" className="shrink-0" />
      <span>Error: Invalid credentials</span>
    </Alert>
  </Space>
)

export default App
```

### With Action Button

Alert with dismissal or action button.

```tsx
import React from 'react'
import { Alert, Button } from 'asterui'
import { ExclamationTriangleIcon } from '@aster-ui/icons'

const App: React.FC = () => (
  <Alert type="warning">
    <ExclamationTriangleIcon size="lg" className="shrink-0" />
    <span>We use cookies for no reason</span>
    <div>
      <Button size="sm">Accept</Button>
    </div>
  </Alert>
)

export default App
```

### Outline Style

Alert with outline variant.

```tsx
import React from 'react'
import { Alert, Space } from 'asterui'
import { InformationCircleIcon, CheckCircleIcon } from '@aster-ui/icons'

const App: React.FC = () => (
  <Space direction="vertical" size="sm">
    <Alert type="info" outline>
      <InformationCircleIcon size="lg" className="shrink-0" />
      <span>Info outline alert</span>
    </Alert>

    <Alert type="success" outline>
      <CheckCircleIcon size="lg" className="shrink-0" />
      <span>Success outline alert</span>
    </Alert>
  </Space>
)

export default App
```

### Closable Alert

Alert with close button and callbacks.

```tsx
import React from 'react'
import { Alert, Space, message } from 'asterui'
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@aster-ui/icons'

const App: React.FC = () => (
  <Space direction="vertical" size="sm">
    <Alert type="info" closable>
      <InformationCircleIcon size="lg" className="shrink-0" />
      <span>Closable alert with default close button</span>
    </Alert>

    <Alert
      type="success"
      closable={{
        onClose: () => message.success('Success alert closed'),
        afterClose: () => message.info('After close callback executed'),
      }}
    >
      <CheckCircleIcon size="lg" className="shrink-0" />
      <span>Closable with onClose and afterClose callbacks</span>
    </Alert>

    <Alert
      type="warning"
      closable={{
        closeIcon: <span className="text-lg font-bold">×</span>,
        onClose: () => message.warning('Custom close icon clicked'),
      }}
    >
      <ExclamationTriangleIcon size="lg" className="shrink-0" />
      <span>Closable with custom close icon</span>
    </Alert>
  </Space>
)

export default App
```

## API

### Alert

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Alert content | `React.ReactNode` | `-` |
| `type` | Alert color variant | `'info' \| 'success' \| 'warning' \| 'error'` | `-` |
| `closable` | Show close button | `boolean \| { onClose?: () => void; closeIcon?: ReactNode; afterClose?: () => void }` | `false` |
| `outline` | Outline style | `boolean` | `false` |
| `dash` | Dash outline style | `boolean` | `false` |
| `soft` | Soft style | `boolean` | `false` |
| `vertical` | Vertical layout | `boolean` | `false` |
| `className` | Additional CSS classes | `string` | `-` |
