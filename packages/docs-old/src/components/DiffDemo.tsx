import { Diff, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Diff } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Diff
        left={<img src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp" alt="Original" />}
        right={<img src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp" alt="Blurred" />}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Diff } from 'asterui'
export function TextDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Diff
        left={
          <div className="bg-primary text-primary-content grid place-content-center text-7xl font-black h-full">
            DAISY
          </div>
        }
        right={
          <div className="bg-base-200 grid place-content-center text-7xl font-black h-full">
            DAISY
          </div>
        }
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Diff, Space } from 'asterui'
export function AspectDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="lg">
        <Diff
          aspect="aspect-square"
          className="max-w-xs"
          left={<img src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp" alt="Original" />}
          right={<img src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp" alt="Blurred" />}
        />
        <Diff
          aspect="aspect-4/3"
          className="max-w-md"
          left={<img src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp" alt="Original" />}
          right={<img src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp" alt="Blurred" />}
        />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}
