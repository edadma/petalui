import { Image, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Image } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Image
        src="https://picsum.photos/seed/asterui/800/600"
        alt="Landscape"
        width={400}
        height={300}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Image, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="md" align="center">
        <Image
          src="https://picsum.photos/seed/asterui/800/600"
          alt="Small"
          width={100}
          height={100}
        />
        <Image
          src="https://picsum.photos/seed/asterui/800/600"
          alt="Medium"
          width={200}
          height={150}
        />
        <Image
          src="https://picsum.photos/seed/asterui/800/600"
          alt="Large"
          width={300}
          height={200}
        />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Image } from 'asterui'
export function PreviewDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Image
        src="https://picsum.photos/seed/asterui/800/600"
        alt="Landscape with preview"
        width={400}
        height={300}
        preview
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Image, Space } from 'asterui'
export function FallbackDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="md">
        <Image
          src="https://invalid-url.example.com/broken.jpg"
          alt="Broken image"
          width={200}
          height={150}
          fallback="https://picsum.photos/seed/asterui/800/600"
        />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}
