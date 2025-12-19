import { Kbd, Space, Typography } from '@aster-ui/prefixed'
import { Demo } from './Demo'

const { Paragraph } = Typography

// @example-imports: { Kbd } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Kbd>K</Kbd>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Kbd, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space align="center">
        <Kbd size="xs">xs</Kbd>
        <Kbd size="sm">sm</Kbd>
        <Kbd size="md">md</Kbd>
        <Kbd size="lg">lg</Kbd>
        <Kbd size="xl">xl</Kbd>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Kbd, Space } from 'asterui'
export function CombinationDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space align="center" size="xs">
        <Kbd>⌘</Kbd>
        <span>+</span>
        <Kbd>K</Kbd>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Kbd, Typography } from 'asterui'
export function InTextDemo() {
  // @example-include
  const { Paragraph } = Typography
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Paragraph>
        Press <Kbd size="sm">F</Kbd> to pay respects.
      </Paragraph>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Kbd, Space } from 'asterui'
export function ArrowsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="flex flex-col items-center gap-1">
        <Kbd>▲</Kbd>
        <Space size="xs">
          <Kbd>◀</Kbd>
          <Kbd>▼</Kbd>
          <Kbd>▶</Kbd>
        </Space>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Kbd } from 'asterui'
export function FullKeyboardDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          <Kbd>q</Kbd><Kbd>w</Kbd><Kbd>e</Kbd><Kbd>r</Kbd><Kbd>t</Kbd>
          <Kbd>y</Kbd><Kbd>u</Kbd><Kbd>i</Kbd><Kbd>o</Kbd><Kbd>p</Kbd>
        </div>
        <div className="flex gap-1 ml-2">
          <Kbd>a</Kbd><Kbd>s</Kbd><Kbd>d</Kbd><Kbd>f</Kbd><Kbd>g</Kbd>
          <Kbd>h</Kbd><Kbd>j</Kbd><Kbd>k</Kbd><Kbd>l</Kbd>
        </div>
        <div className="flex gap-1 ml-6">
          <Kbd>z</Kbd><Kbd>x</Kbd><Kbd>c</Kbd><Kbd>v</Kbd>
          <Kbd>b</Kbd><Kbd>n</Kbd><Kbd>m</Kbd>
        </div>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}
