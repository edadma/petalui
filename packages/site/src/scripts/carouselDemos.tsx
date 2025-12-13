import { createRoot } from 'react-dom/client'
import React from 'react'
import { Carousel, Card, Button, Space } from 'asterui'
import { CheckIconSvg } from './icons'

// Demo components for each example
const demos: Record<string, React.ReactNode> = {
  basic: (
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
  ),
  autoplay: (
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
  ),
  fade: (
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
  ),
  vertical: (
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
  ),
  'no-controls': (
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
  ),
  'dot-placement': (
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
  ),
  'custom-content': (
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
  ),
}

// Mount React demos
document.querySelectorAll('.demo-container').forEach((container) => {
  const exampleId = container.getAttribute('data-example')
  if (exampleId && demos[exampleId]) {
    const root = createRoot(container as HTMLElement)
    root.render(demos[exampleId])
  }
})

// Copy button functionality
document.querySelectorAll('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const code = btn.getAttribute('data-code')
    if (code) {
      await navigator.clipboard.writeText(code)
      const originalHTML = btn.innerHTML
      btn.innerHTML = CheckIconSvg
      setTimeout(() => {
        btn.innerHTML = originalHTML
      }, 2000)
    }
  })
})
