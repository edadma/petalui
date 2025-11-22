import { Carousel } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const carouselApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Carousel items (use Carousel.Item)',
    type: 'React.ReactNode',
  },
  {
    property: 'snap',
    description: 'Snap alignment for items',
    type: "'start' | 'center' | 'end'",
    default: "'start'",
  },
  {
    property: 'vertical',
    description: 'Enable vertical scrolling',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const carouselItemApi: ApiProperty[] = [
  {
    property: 'id',
    description: 'Unique ID for navigation anchors',
    type: 'string',
  },
  {
    property: 'children',
    description: 'Item content',
    type: 'React.ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes (e.g., w-full, w-1/2)',
    type: 'string',
  },
]

export function CarouselPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Carousel</h1>
        <p className="text-base-content/70">
          Scrollable container for displaying images or content with snap scrolling.
        </p>
      </div>

      <div className="columns-1 md:columns-2 gap-x-4">
        <ExampleSection
          title="Basic"
          description="Simple horizontal carousel with snap scrolling."
          code={`import React from 'react'
import { Carousel } from '@edadma/petalui'

const App: React.FC = () => (
  <Carousel className="rounded-box">
    <Carousel.Item>
      <img
        src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
        alt="Burger"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
        alt="Drink"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
        alt="Pizza"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
        alt="Sushi"
      />
    </Carousel.Item>
  </Carousel>
)

export default App`}
          noColumnBreak
        >
          <Carousel className="rounded-box w-full">
            <Carousel.Item>
              <img
                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                alt="Burger"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                alt="Drink"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                alt="Pizza"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                alt="Sushi"
              />
            </Carousel.Item>
          </Carousel>
        </ExampleSection>

        <ExampleSection
          title="Center Snap"
          description="Carousel with center-aligned snap scrolling."
          code={`import React from 'react'
import { Carousel } from '@edadma/petalui'

const App: React.FC = () => (
  <Carousel snap="center" className="rounded-box">
    <Carousel.Item>
      <img
        src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
        alt="Burger"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
        alt="Drink"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
        alt="Pizza"
      />
    </Carousel.Item>
  </Carousel>
)

export default App`}
          noColumnBreak
        >
          <Carousel snap="center" className="rounded-box w-full">
            <Carousel.Item>
              <img
                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                alt="Burger"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                alt="Drink"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                alt="Pizza"
              />
            </Carousel.Item>
          </Carousel>
        </ExampleSection>

        <ExampleSection
          title="End Snap"
          description="Carousel with end-aligned snap scrolling."
          code={`import React from 'react'
import { Carousel } from '@edadma/petalui'

const App: React.FC = () => (
  <Carousel snap="end" className="rounded-box">
    <Carousel.Item>
      <img
        src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
        alt="Burger"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
        alt="Drink"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
        alt="Pizza"
      />
    </Carousel.Item>
  </Carousel>
)

export default App`}
          noColumnBreak
        >
          <Carousel snap="end" className="rounded-box w-full">
            <Carousel.Item>
              <img
                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                alt="Burger"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                alt="Drink"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                alt="Pizza"
              />
            </Carousel.Item>
          </Carousel>
        </ExampleSection>

        <ExampleSection
          title="Full Width Items"
          description="Each item takes full width of the carousel."
          code={`import React from 'react'
import { Carousel } from '@edadma/petalui'

const App: React.FC = () => (
  <Carousel className="rounded-box">
    <Carousel.Item className="w-full">
      <img
        src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
        alt="Burger"
        className="w-full"
      />
    </Carousel.Item>
    <Carousel.Item className="w-full">
      <img
        src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
        alt="Drink"
        className="w-full"
      />
    </Carousel.Item>
    <Carousel.Item className="w-full">
      <img
        src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
        alt="Pizza"
        className="w-full"
      />
    </Carousel.Item>
  </Carousel>
)

export default App`}
          noColumnBreak
        >
          <Carousel className="rounded-box w-full">
            <Carousel.Item className="w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                alt="Burger"
                className="w-full"
              />
            </Carousel.Item>
            <Carousel.Item className="w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                alt="Drink"
                className="w-full"
              />
            </Carousel.Item>
            <Carousel.Item className="w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                alt="Pizza"
                className="w-full"
              />
            </Carousel.Item>
          </Carousel>
        </ExampleSection>

        <ExampleSection
          title="Half Width Items"
          description="Each item takes half the width of the carousel."
          code={`import React from 'react'
import { Carousel } from '@edadma/petalui'

const App: React.FC = () => (
  <Carousel snap="center" className="rounded-box">
    <Carousel.Item className="w-1/2">
      <img
        src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
        alt="Burger"
        className="w-full"
      />
    </Carousel.Item>
    <Carousel.Item className="w-1/2">
      <img
        src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
        alt="Drink"
        className="w-full"
      />
    </Carousel.Item>
    <Carousel.Item className="w-1/2">
      <img
        src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
        alt="Pizza"
        className="w-full"
      />
    </Carousel.Item>
  </Carousel>
)

export default App`}
          noColumnBreak
        >
          <Carousel snap="center" className="rounded-box w-full">
            <Carousel.Item className="w-1/2">
              <img
                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                alt="Burger"
                className="w-full"
              />
            </Carousel.Item>
            <Carousel.Item className="w-1/2">
              <img
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                alt="Drink"
                className="w-full"
              />
            </Carousel.Item>
            <Carousel.Item className="w-1/2">
              <img
                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                alt="Pizza"
                className="w-full"
              />
            </Carousel.Item>
          </Carousel>
        </ExampleSection>

        <ExampleSection
          title="Vertical Carousel"
          description="Carousel with vertical scrolling."
          code={`import React from 'react'
import { Carousel } from '@edadma/petalui'

const App: React.FC = () => (
  <Carousel vertical className="rounded-box h-96">
    <Carousel.Item className="h-full">
      <img
        src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
        alt="Burger"
      />
    </Carousel.Item>
    <Carousel.Item className="h-full">
      <img
        src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
        alt="Drink"
      />
    </Carousel.Item>
    <Carousel.Item className="h-full">
      <img
        src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
        alt="Pizza"
      />
    </Carousel.Item>
  </Carousel>
)

export default App`}
          noColumnBreak
        >
          <Carousel vertical className="rounded-box h-96 w-64">
            <Carousel.Item className="h-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                alt="Burger"
              />
            </Carousel.Item>
            <Carousel.Item className="h-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                alt="Drink"
              />
            </Carousel.Item>
            <Carousel.Item className="h-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                alt="Pizza"
              />
            </Carousel.Item>
          </Carousel>
        </ExampleSection>

        <ExampleSection
          title="With Indicators"
          description="Carousel with navigation indicators using anchor links."
          code={`import React from 'react'
import { Carousel } from '@edadma/petalui'

const App: React.FC = () => (
  <div>
    <Carousel className="rounded-box w-full">
      <Carousel.Item id="slide1" className="w-full">
        <img
          src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
          alt="Burger"
          className="w-full"
        />
      </Carousel.Item>
      <Carousel.Item id="slide2" className="w-full">
        <img
          src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
          alt="Drink"
          className="w-full"
        />
      </Carousel.Item>
      <Carousel.Item id="slide3" className="w-full">
        <img
          src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
          alt="Pizza"
          className="w-full"
        />
      </Carousel.Item>
      <Carousel.Item id="slide4" className="w-full">
        <img
          src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
          alt="Sushi"
          className="w-full"
        />
      </Carousel.Item>
    </Carousel>
    <div className="flex w-full justify-center gap-2 py-2">
      <a href="#slide1" className="btn btn-xs">1</a>
      <a href="#slide2" className="btn btn-xs">2</a>
      <a href="#slide3" className="btn btn-xs">3</a>
      <a href="#slide4" className="btn btn-xs">4</a>
    </div>
  </div>
)

export default App`}
          noColumnBreak
        >
          <div>
            <Carousel className="rounded-box w-full">
              <Carousel.Item id="slide1" className="w-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                  alt="Burger"
                  className="w-full"
                />
              </Carousel.Item>
              <Carousel.Item id="slide2" className="w-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                  alt="Drink"
                  className="w-full"
                />
              </Carousel.Item>
              <Carousel.Item id="slide3" className="w-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                  alt="Pizza"
                  className="w-full"
                />
              </Carousel.Item>
              <Carousel.Item id="slide4" className="w-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                  alt="Sushi"
                  className="w-full"
                />
              </Carousel.Item>
            </Carousel>
            <div className="flex w-full justify-center gap-2 py-2">
              <a href="#slide1" className="btn btn-xs">
                1
              </a>
              <a href="#slide2" className="btn btn-xs">
                2
              </a>
              <a href="#slide3" className="btn btn-xs">
                3
              </a>
              <a href="#slide4" className="btn btn-xs">
                4
              </a>
            </div>
          </div>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Carousel" data={carouselApi} />

        <div className="mt-8">
          <ApiTable title="Carousel.Item" data={carouselItemApi} />
        </div>

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Use snap prop to control scroll snap alignment</li>
              <li>Add w-full, w-1/2, or custom widths to Carousel.Item for sizing</li>
              <li>Use vertical prop for vertical scrolling carousels</li>
              <li>Add IDs to items and use anchor links for navigation</li>
              <li>Combine with rounded-box for rounded corners</li>
              <li>Native scroll behavior works on touch devices and trackpads</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
