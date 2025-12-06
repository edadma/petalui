# Join

**Import:** `import { Join } from 'asterui'`

## Examples

### Joined Buttons

Basic horizontal join with buttons.

```tsx
import React from 'react'
import { Join, Button } from 'asterui'

const App: React.FC = () => (
  <Join>
    <Button>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
  </Join>
)

export default App
```

### Vertical Join

Vertically joined elements.

```tsx
import React from 'react'
import { Join, Button } from 'asterui'

const App: React.FC = () => (
  <Join direction="vertical">
    <Button>Top</Button>
    <Button>Middle</Button>
    <Button>Bottom</Button>
  </Join>
)

export default App
```

### Joined Input and Button

Join input with button for search or forms.

```tsx
import React from 'react'
import { Join, Input, Button } from 'asterui'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const App: React.FC = () => (
  <Join>
    <Input placeholder="Search..." />
    <Button type="primary">
      <MagnifyingGlassIcon className="w-5 h-5" />
    </Button>
  </Join>
)

export default App
```

## API

### Join

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `direction` | Join direction | `horizontal' \| 'vertical` | `horizontal` |
| `children` | Elements to join together | `React.ReactNode` | `-` |
| `className` | Additional CSS classes | `string` | `-` |
