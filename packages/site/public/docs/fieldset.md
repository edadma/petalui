# Fieldset

Group related form controls with an optional legend and disabled state.

**Import:** `import { Fieldset } from 'asterui'`

## Examples

### Basic Fieldset

Simple fieldset with legend.

```tsx
import React from 'react'
import { Fieldset } from 'asterui'

const App: React.FC = () => (
  <Fieldset className="bg-base-200 border border-base-300 rounded-box p-4">
    <Fieldset.Legend>User Information</Fieldset.Legend>
    <p className="text-sm text-base-content/70">
      Group related form controls with a descriptive legend.
    </p>
  </Fieldset>
)

export default App
```

### With Form Inputs

Fieldset containing form inputs with labels.

```tsx
import React from 'react'
import { Fieldset, Input } from 'asterui'

const App: React.FC = () => (
  <Fieldset className="bg-base-200 border border-base-300 rounded-box p-4">
    <Fieldset.Legend>Contact Details</Fieldset.Legend>
    <Fieldset.Label>Name</Fieldset.Label>
    <Input placeholder="Enter your name" />
    <Fieldset.Label>Email</Fieldset.Label>
    <Input type="email" placeholder="Enter your email" />
    <Fieldset.Label>Phone</Fieldset.Label>
    <Input type="tel" placeholder="Enter your phone" />
  </Fieldset>
)

export default App
```

### Disabled Fieldset

All form controls within are disabled.

```tsx
import React from 'react'
import { Fieldset, Input } from 'asterui'

const App: React.FC = () => (
  <Fieldset disabled className="bg-base-200 border border-base-300 rounded-box p-4">
    <Fieldset.Legend>Disabled Form Section</Fieldset.Legend>
    <Fieldset.Label>Username</Fieldset.Label>
    <Input placeholder="Cannot edit" />
    <Fieldset.Label>Password</Fieldset.Label>
    <Input type="password" placeholder="Cannot edit" />
  </Fieldset>
)

export default App
```

## API

### Fieldset

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Content of the fieldset | `React.ReactNode` | `-` |
| `disabled` | Disables all form controls within | `boolean` | `false` |
| `className` | Additional CSS classes | `string` | `-` |

### Fieldset.Legend

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Legend text or content | `React.ReactNode` | `-` |
| `className` | Additional CSS classes | `string` | `-` |

### Fieldset.Label

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Label text or content | `React.ReactNode` | `-` |
| `htmlFor` | ID of the form element the label is for | `string` | `-` |
| `className` | Additional CSS classes | `string` | `-` |
