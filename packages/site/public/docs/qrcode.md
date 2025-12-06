# QRCode

Generate QR codes with customizable appearance, icons, and status states.

**Installation:** `npm install qrcode`

**Import:** `import { QRCode } from 'asterui'`

## Examples

### Basic

```tsx
import React from 'react'
import { QRCode } from 'asterui'

const App: React.FC = () => (
  <QRCode value="https://github.com" />
)

export default App
```

### Sizes

```tsx
import React from 'react'
import { QRCode } from 'asterui'

const App: React.FC = () => (
  <div className="flex gap-4 items-center flex-wrap">
    <QRCode value="https://example.com" size={80} />
    <QRCode value="https://example.com" size={120} />
    <QRCode value="https://example.com" size={160} />
    <QRCode value="https://example.com" size={200} />
  </div>
)

export default App
```

### Colors

```tsx
import React from 'react'
import { QRCode } from 'asterui'

const App: React.FC = () => (
  <div className="flex gap-4 flex-wrap">
    <QRCode
      value="https://example.com"
      color="#1890ff"
      bgColor="#f0f0f0"
    />
    <QRCode
      value="https://example.com"
      color="#52c41a"
      bgColor="#f6ffed"
    />
    <QRCode
      value="https://example.com"
      color="#722ed1"
      bgColor="#f9f0ff"
    />
  </div>
)

export default App
```

### Icon

```tsx
import React from 'react'
import { QRCode } from 'asterui'

const App: React.FC = () => (
  <QRCode
    value="https://github.com"
    icon="https://avatars.githubusercontent.com/u/142286421"
    iconSize={40}
  />
)

export default App
```

### Error Level

```tsx
import React from 'react'
import { QRCode } from 'asterui'

const App: React.FC = () => (
  <div className="flex gap-4 flex-wrap">
    <div className="text-center">
      <QRCode value="https://example.com/data" errorLevel="L" />
      <div className="text-sm mt-2">Level L (7%)</div>
    </div>
    <div className="text-center">
      <QRCode value="https://example.com/data" errorLevel="M" />
      <div className="text-sm mt-2">Level M (15%)</div>
    </div>
    <div className="text-center">
      <QRCode value="https://example.com/data" errorLevel="Q" />
      <div className="text-sm mt-2">Level Q (25%)</div>
    </div>
    <div className="text-center">
      <QRCode value="https://example.com/data" errorLevel="H" />
      <div className="text-sm mt-2">Level H (30%)</div>
    </div>
  </div>
)

export default App
```

### Border

```tsx
import React from 'react'
import { QRCode } from 'asterui'

const App: React.FC = () => (
  <div className="flex gap-4 flex-wrap">
    <QRCode value="https://example.com" bordered />
    <QRCode value="https://example.com" bordered={false} />
  </div>
)

export default App
```

### Loading

```tsx
import React from 'react'
import { QRCode } from 'asterui'

const App: React.FC = () => (
  <QRCode
    value="https://example.com"
    status="loading"
  />
)

export default App
```

### Expired

```tsx
import React, { useState } from 'react'
import { QRCode } from 'asterui'

const App: React.FC = () => {
  const [status, setStatus] = useState<'active' | 'loading' | 'expired'>('expired')

  const handleRefresh = () => {
    setStatus('loading')
    setTimeout(() => setStatus('active'), 2000)
  }

  return (
    <QRCode
      value="https://example.com"
      status={status}
      onRefresh={handleRefresh}
    />
  )
}

export default App
```

### Dynamic

```tsx
import React, { useState } from 'react'
import { QRCode, Input } from 'asterui'

const App: React.FC = () => {
  const [text, setText] = useState('https://github.com')

  return (
    <div className="flex flex-col gap-4 items-center">
      <QRCode value={text} />
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL"
        className="w-full max-w-md"
      />
    </div>
  )
}

export default App
```
