import { HoverGallery, Card } from '@aster-ui/prefixed'
import { Demo } from './Demo'

const images = [
  'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
  'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp',
  'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp',
  'https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp',
]

// @example-imports: { HoverGallery } from 'asterui'
export function BasicDemo() {
  // @example-include
  const images = [
    'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
    'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp',
    'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp',
    'https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp',
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <HoverGallery
        images={images}
        className="max-w-60 rounded-lg"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { HoverGallery, Card } from 'asterui'
export function ProductCardDemo() {
  // @example-include
  const images = [
    'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
    'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp',
    'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp',
    'https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp',
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Card
        className="max-w-60 shadow-xl"
        title="Product Name"
        cover={<HoverGallery images={images} />}
      >
        <p>Hover over the image to see more angles</p>
        <p className="text-lg font-bold">$49.99</p>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { HoverGallery } from 'asterui'
export function TwoImagesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <HoverGallery
        images={[
          'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
          'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp',
        ]}
        alts={['Front view', 'Side view']}
        className="max-w-60 rounded-lg"
      />
      {/* @example-return-end */}
    </Demo>
  )
}
