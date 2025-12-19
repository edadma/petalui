import { Carousel, Space, Card, Button } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Carousel } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Carousel } from 'asterui'
export function AutoplayDemo() {
  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Carousel } from 'asterui'
export function FadeDemo() {
  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Carousel } from 'asterui'
export function VerticalDemo() {
  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Carousel } from 'asterui'
export function NoControlsDemo() {
  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Carousel, Space } from 'asterui'
export function DotPlacementDemo() {
  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Carousel, Card, Button } from 'asterui'
export function CustomContentDemo() {
  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}
