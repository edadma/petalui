# Grid

Flexible grid system with Row and Col components. Supports 24-column (default) and 120-column modes for precise layouts.

**Import:** `import { Row, Col } from 'asterui'`

## Examples

### Basic Grid

Basic 24-column grid system.

```tsx
import React from 'react'
import { Row, Col } from 'asterui'

const App: React.FC = () => (
  <Row>
    <Col span={6}>
      <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
        col-6
      </div>
    </Col>
    <Col span={6}>
      <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
        col-6
      </div>
    </Col>
    <Col span={6}>
      <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
        col-6
      </div>
    </Col>
    <Col span={6}>
      <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
        col-6
      </div>
    </Col>
  </Row>
)

export default App
```

### Grid Gutter

Customize spacing between columns. Default is 16px; recommended values are 16, 24, 32, 40, 48.

```tsx
import React from 'react'
import { Row, Col } from 'asterui'

const App: React.FC = () => (
  <Row gutter={32}>
    <Col span={6}>
      <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
        col-6
      </div>
    </Col>
    <Col span={6}>
      <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
        col-6
      </div>
    </Col>
    <Col span={6}>
      <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
        col-6
      </div>
    </Col>
    <Col span={6}>
      <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
        col-6
      </div>
    </Col>
  </Row>
)

export default App
```

### Column Offset

Offset columns using the offset prop.

```tsx
import React from 'react'
import { Row, Col, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="md" className="w-full">
    <Row>
      <Col span={8}>
        <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
          col-8
        </div>
      </Col>
      <Col span={8} offset={8}>
        <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
          col-8 offset-8
        </div>
      </Col>
    </Row>
    <Row>
      <Col span={6} offset={6}>
        <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
          col-6 offset-6
        </div>
      </Col>
      <Col span={6} offset={6}>
        <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
          col-6 offset-6
        </div>
      </Col>
    </Row>
  </Space>
)

export default App
```

### Responsive Columns

Different column spans at different breakpoints.

```tsx
import React from 'react'
import { Row, Col } from 'asterui'

const App: React.FC = () => (
  <Row gutter={24}>
    <Col xs={24} sm={12} md={8} lg={6}>
      <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
        Responsive
      </div>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6}>
      <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
        Responsive
      </div>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6}>
      <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
        Responsive
      </div>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6}>
      <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
        Responsive
      </div>
    </Col>
  </Row>
)

export default App
```

### 120-Column Grid

Fine-grained control with 120 columns for precise layouts.

```tsx
import React from 'react'
import { Row, Col } from 'asterui'

const App: React.FC = () => (
  <Row cols={120} gutter={8}>
    <Col span={30}>
      <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
        30/120
      </div>
    </Col>
    <Col span={45}>
      <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
        45/120
      </div>
    </Col>
    <Col span={45}>
      <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
        45/120
      </div>
    </Col>
  </Row>
)

export default App
```

## API

### Row

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `cols` | Number of grid columns | `24 \| 120` | `24` |
| `gutter` | Spacing between columns (px) | `number \| [number, number]` | `16` |
| `justify` | Horizontal alignment of grid items | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly'` | `-` |
| `align` | Vertical alignment of grid items | `'start' \| 'end' \| 'center' \| 'stretch' \| 'baseline'` | `-` |
| `children` | Column components | `React.ReactNode` | `-` |
| `className` | Additional CSS classes | `string` | `-` |

### Col

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `span` | Number of columns to span (out of 24 or 120) | `number` | `24` |
| `offset` | Number of columns to offset | `number` | `0` |
| `order` | Visual order of the column (1-12) | `number` | `-` |
| `xs` | Responsive span for extra small screens (<640px) | `number` | `-` |
| `sm` | Responsive span for small screens (≥640px) | `number` | `-` |
| `md` | Responsive span for medium screens (≥768px) | `number` | `-` |
| `lg` | Responsive span for large screens (≥1024px) | `number` | `-` |
| `xl` | Responsive span for extra large screens (≥1280px) | `number` | `-` |
| `xxl` | Responsive span for 2x extra large screens (≥1536px) | `number` | `-` |
| `children` | Column content | `React.ReactNode` | `-` |
| `className` | Additional CSS classes | `string` | `-` |
