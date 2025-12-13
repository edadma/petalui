# Carousel

**Import:** `import { Carousel } from 'asterui'`

## Examples

### Basic Carousel

Simple carousel with navigation controls and indicators.

```tsx
import React from 'react'
import { Carousel } from 'asterui'

const App: React.FC = () => (
  <Carousel className="w-full max-w-md h-48">
    <Carousel.Item>
      <img src="https://picsum.photos/seed/1/400/200" alt="Slide 1" className="w-full h-full object-cover" />
    </Carousel.Item>
    <Carousel.Item>
      <img src="https://picsum.photos/seed/2/400/200" alt="Slide 2" className="w-full h-full object-cover" />
    </Carousel.Item>
    <Carousel.Item>
      <img src="https://picsum.photos/seed/3/400/200" alt="Slide 3" className="w-full h-full object-cover" />
    </Carousel.Item>
  </Carousel>
)

export default App
```

### Autoplay

Carousel with automatic slide advancement. Pauses on hover.

```tsx
import React from 'react'
import { Carousel } from 'asterui'

const App: React.FC = () => (
  <Carousel autoplay autoplaySpeed={2000} className="w-full max-w-md h-40">
    <Carousel.Item>
      <div className="bg-primary text-primary-content h-full flex items-center justify-center">
        <span className="text-2xl">Slide 1</span>
      </div>
    </Carousel.Item>
    <Carousel.Item>
      <div className="bg-secondary text-secondary-content h-full flex items-center justify-center">
        <span className="text-2xl">Slide 2</span>
      </div>
    </Carousel.Item>
    <Carousel.Item>
      <div className="bg-accent text-accent-content h-full flex items-center justify-center">
        <span className="text-2xl">Slide 3</span>
      </div>
    </Carousel.Item>
  </Carousel>
)

export default App
```

### Fade Effect

Carousel with fade transition instead of slide.

```tsx
import React from 'react'
import { Carousel } from 'asterui'

const App: React.FC = () => (
  <Carousel effect="fade" autoplay autoplaySpeed={3000} className="w-full max-w-md h-48">
    <Carousel.Item>
      <img src="https://picsum.photos/seed/10/400/200" alt="Slide 1" className="w-full h-full object-cover" />
    </Carousel.Item>
    <Carousel.Item>
      <img src="https://picsum.photos/seed/11/400/200" alt="Slide 2" className="w-full h-full object-cover" />
    </Carousel.Item>
    <Carousel.Item>
      <img src="https://picsum.photos/seed/12/400/200" alt="Slide 3" className="w-full h-full object-cover" />
    </Carousel.Item>
  </Carousel>
)

export default App
```

### Vertical Carousel

Carousel with vertical orientation.

```tsx
import React from 'react'
import { Carousel } from 'asterui'

const App: React.FC = () => (
  <Carousel vertical className="h-48 w-full max-w-md">
    <Carousel.Item>
      <img src="https://picsum.photos/seed/4/400/200" alt="Slide 1" className="w-full h-full object-cover" />
    </Carousel.Item>
    <Carousel.Item>
      <img src="https://picsum.photos/seed/5/400/200" alt="Slide 2" className="w-full h-full object-cover" />
    </Carousel.Item>
    <Carousel.Item>
      <img src="https://picsum.photos/seed/6/400/200" alt="Slide 3" className="w-full h-full object-cover" />
    </Carousel.Item>
  </Carousel>
)

export default App
```

### Without Controls

Carousel with arrows hidden, dots-only navigation.

```tsx
import React from 'react'
import { Carousel } from 'asterui'

const App: React.FC = () => (
  <Carousel arrows={false} className="w-full max-w-md h-48">
    <Carousel.Item>
      <img src="https://picsum.photos/seed/7/400/200" alt="Slide 1" className="w-full h-full object-cover" />
    </Carousel.Item>
    <Carousel.Item>
      <img src="https://picsum.photos/seed/8/400/200" alt="Slide 2" className="w-full h-full object-cover" />
    </Carousel.Item>
    <Carousel.Item>
      <img src="https://picsum.photos/seed/9/400/200" alt="Slide 3" className="w-full h-full object-cover" />
    </Carousel.Item>
  </Carousel>
)

export default App
```

### Dot Placement

Position indicator dots at different locations.

```tsx
import React from 'react'
import { Carousel, Space } from 'asterui'

const App: React.FC = () => (
  <Space direction="vertical" size="lg" className="w-full">
    <Carousel dotPlacement="top" className="w-full max-w-md h-32">
      <Carousel.Item>
        <div className="bg-info text-info-content h-full flex items-center justify-center">Top Dots</div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="bg-success text-success-content h-full flex items-center justify-center">Slide 2</div>
      </Carousel.Item>
    </Carousel>
    <Carousel dotPlacement="start" arrows={false} className="w-full max-w-md h-32">
      <Carousel.Item>
        <div className="bg-warning text-warning-content h-full flex items-center justify-center">Start Dots</div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="bg-error text-error-content h-full flex items-center justify-center">Slide 2</div>
      </Carousel.Item>
    </Carousel>
  </Space>
)

export default App
```

### Custom Content

Carousel with custom slide content like cards.

```tsx
import React from 'react'
import { Carousel, Card, Button } from 'asterui'

const App: React.FC = () => (
  <Carousel className="w-full max-w-md">
    <Carousel.Item>
      <Card title="Feature 1" className="bg-base-200 h-full">
        <p>Discover amazing features</p>
        <Button color="primary" size="sm">Learn More</Button>
      </Card>
    </Carousel.Item>
    <Carousel.Item>
      <Card title="Feature 2" className="bg-base-200 h-full">
        <p>Powerful and flexible</p>
        <Button color="secondary" size="sm">Explore</Button>
      </Card>
    </Carousel.Item>
  </Carousel>
)

export default App
```

### Controlled Carousel

Control the active slide programmatically.

```tsx
import React, { useState, useRef } from 'react'
import { Carousel, Button, Space } from 'asterui'
import type { CarouselRef } from 'asterui'

const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<CarouselRef>(null)

  return (
    <Space direction="vertical" size="md">
      <Carousel
        ref={carouselRef}
        activeIndex={activeIndex}
        afterChange={setActiveIndex}
        className="w-full max-w-md h-40"
      >
        <Carousel.Item>
          <div className="bg-primary text-primary-content h-full flex items-center justify-center">Slide 1</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="bg-secondary text-secondary-content h-full flex items-center justify-center">Slide 2</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="bg-accent text-accent-content h-full flex items-center justify-center">Slide 3</div>
        </Carousel.Item>
      </Carousel>
      <Space direction="horizontal" size="sm">
        <Button size="sm" onClick={() => carouselRef.current?.prev()}>Prev</Button>
        <Button size="sm" onClick={() => carouselRef.current?.goTo(0)}>First</Button>
        <Button size="sm" onClick={() => carouselRef.current?.goTo(2)}>Last</Button>
        <Button size="sm" onClick={() => carouselRef.current?.next()}>Next</Button>
      </Space>
    </Space>
  )
}

export default App
```

## API

### Carousel

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Carousel slides (Carousel.Item components) | `ReactNode` | `-` |
| `activeIndex` | Current slide index (controlled mode) | `number` | `-` |
| `defaultActiveIndex` | Default slide index (uncontrolled mode) | `number` | `0` |
| `autoplay` | Auto-advance slides | `boolean` | `false` |
| `autoplaySpeed` | Autoplay interval in milliseconds | `number` | `3000` |
| `speed` | Animation duration in milliseconds | `number` | `500` |
| `arrows` | Show prev/next navigation arrows | `boolean` | `true` |
| `dots` | Show slide indicator dots | `boolean \| { className?: string }` | `true` |
| `dotPlacement` | Position of indicator dots | `'top' \| 'bottom' \| 'start' \| 'end'` | `'bottom'` |
| `effect` | Transition effect | `'scrollx' \| 'fade'` | `'scrollx'` |
| `infinite` | Enable infinite looping | `boolean` | `true` |
| `pauseOnHover` | Pause autoplay on hover | `boolean` | `true` |
| `vertical` | Vertical carousel orientation | `boolean` | `false` |
| `beforeChange` | Callback before slide change | `(current: number, next: number) => void` | `-` |
| `afterChange` | Callback after slide change | `(current: number) => void` | `-` |
| `className` | Additional CSS classes | `string` | `-` |
| `data-testid` | Test ID for testing; child elements use this as prefix | `string` | `-` |

### Carousel.Item

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `children` | Slide content | `ReactNode` | `-` |
| `className` | Additional CSS classes | `string` | `-` |
| `data-testid` | Test ID for testing | `string` | `-` |

### CarouselRef Methods

Access these methods via a ref on the Carousel component.

| Method | Description | Type |
|--------|-------------|------|
| `goTo` | Navigate to a specific slide | `(index: number, animate?: boolean) => void` |
| `next` | Go to the next slide | `() => void` |
| `prev` | Go to the previous slide | `() => void` |
