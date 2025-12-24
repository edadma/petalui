import { Image, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Image } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Image
        src="/valley.png"
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
          src="/valley.png"
          alt="Small"
          width={100}
          height={100}
        />
        <Image
          src="/valley.png"
          alt="Medium"
          width={200}
          height={150}
        />
        <Image
          src="/valley.png"
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
        src="/valley.png"
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
          src="/does-not-exist.png"
          alt="Broken image"
          width={200}
          height={150}
          fallback="/valley.png"
        />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}
