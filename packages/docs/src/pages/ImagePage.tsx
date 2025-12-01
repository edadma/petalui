import { Image, Skeleton } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const imageApi: ApiProperty[] = [
  {
    property: 'src',
    description: 'Image source URL',
    type: 'string',
  },
  {
    property: 'alt',
    description: 'Alt text for accessibility',
    type: 'string',
  },
  {
    property: 'fallback',
    description: 'Fallback image URL if src fails to load',
    type: 'string',
  },
  {
    property: 'placeholder',
    description: 'Placeholder content while loading',
    type: 'React.ReactNode',
  },
  {
    property: 'preview',
    description: 'Enable click to preview (zoom)',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'width',
    description: 'Image width',
    type: 'string | number',
  },
  {
    property: 'height',
    description: 'Image height',
    type: 'string | number',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
  {
    property: 'onLoad',
    description: 'Callback when image loads successfully',
    type: '() => void',
  },
  {
    property: 'onError',
    description: 'Callback when image fails to load',
    type: '() => void',
  },
]

export function ImagePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Image</h1>
        <p className="text-base-content/70">
          Enhanced image component with preview, fallback, and placeholder support.
        </p>
      </div>

      <div className="columns-1 gap-x-4">
        <ExampleSection
          title="Basic"
          description="Simple image display."
          code={`import React from 'react'
import { Image } from '@edadma/bloomui'

const App: React.FC = () => (
  <Image
    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
    alt="Shoes"
    width={400}
  />
)

export default App`}
          noColumnBreak
        >
          <Image
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            width={400}
          />
        </ExampleSection>

        <ExampleSection
          title="With Preview"
          description="Click the image to preview in fullscreen (enabled by default)."
          code={`import React from 'react'
import { Image } from '@edadma/bloomui'

const App: React.FC = () => (
  <Image
    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
    alt="Shoes"
    width={300}
    preview
  />
)

export default App`}
          noColumnBreak
        >
          <Image
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            width={300}
            preview
          />
          <p className="text-sm text-base-content/70 mt-2">Click to preview</p>
        </ExampleSection>

        <ExampleSection
          title="No Preview"
          description="Disable preview functionality."
          code={`import React from 'react'
import { Image } from '@edadma/bloomui'

const App: React.FC = () => (
  <Image
    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
    alt="Shoes"
    width={300}
    preview={false}
  />
)

export default App`}
          noColumnBreak
        >
          <Image
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            width={300}
            preview={false}
          />
        </ExampleSection>

        <ExampleSection
          title="With Placeholder"
          description="Show a placeholder while the image loads."
          code={`import React from 'react'
import { Image, Skeleton } from '@edadma/bloomui'

const App: React.FC = () => (
  <Image
    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
    alt="Shoes"
    width={400}
    height={300}
    placeholder={<Skeleton className="w-full h-full" />}
  />
)

export default App`}
          noColumnBreak
        >
          <Image
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            width={400}
            height={300}
            placeholder={<Skeleton className="w-full h-full" />}
          />
        </ExampleSection>

        <ExampleSection
          title="Fallback"
          description="Display a fallback image if the source fails to load."
          code={`import React from 'react'
import { Image } from '@edadma/bloomui'

const App: React.FC = () => (
  <Image
    src="https://invalid-url.com/image.jpg"
    alt="Broken"
    fallback="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
    width={300}
  />
)

export default App`}
          noColumnBreak
        >
          <Image
            src="https://invalid-url.com/image.jpg"
            alt="Broken"
            fallback="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            width={300}
          />
        </ExampleSection>

        <ExampleSection
          title="Error State"
          description="Show an error icon when image fails to load and no fallback is provided."
          code={`import React from 'react'
import { Image } from '@edadma/bloomui'

const App: React.FC = () => (
  <Image
    src="https://invalid-url.com/image.jpg"
    alt="Broken"
    width={200}
    height={200}
  />
)

export default App`}
          noColumnBreak
        >
          <Image
            src="https://invalid-url.com/image.jpg"
            alt="Broken"
            width={200}
            height={200}
          />
        </ExampleSection>

        <ExampleSection
          title="Custom Size"
          description="Set custom width and height."
          code={`import React from 'react'
import { Image } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <Image
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Small"
      width={100}
      height={100}
    />
    <Image
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Medium"
      width={200}
      height={150}
    />
    <Image
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Large"
      width="300px"
      height="200px"
    />
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="flex gap-4 flex-wrap">
            <Image
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Small"
              width={100}
              height={100}
            />
            <Image
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Medium"
              width={200}
              height={150}
            />
            <Image
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Large"
              width="300px"
              height="200px"
            />
          </div>
        </ExampleSection>

        <ExampleSection
          title="With Custom Styling"
          description="Apply custom CSS classes."
          code={`import React from 'react'
import { Image } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <Image
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Rounded"
      width={200}
      className="rounded-lg"
    />
    <Image
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Circle"
      width={200}
      height={200}
      className="rounded-full object-cover"
    />
    <Image
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shadow"
      width={200}
      className="rounded-lg shadow-xl"
    />
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="flex gap-4 flex-wrap">
            <Image
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Rounded"
              width={200}
              className="rounded-lg"
            />
            <Image
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Circle"
              width={200}
              height={200}
              className="rounded-full object-cover"
            />
            <Image
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shadow"
              width={200}
              className="rounded-lg shadow-xl"
            />
          </div>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Image" data={imageApi} />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Use preview prop to enable/disable click-to-zoom functionality</li>
              <li>Provide a fallback image for better UX when images fail to load</li>
              <li>Use placeholder with Skeleton component for progressive loading</li>
              <li>Set alt text for accessibility</li>
              <li>Combine with Tailwind classes for custom styling (rounded, shadow, etc.)</li>
              <li>The preview modal can be closed by clicking outside or the close button</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
