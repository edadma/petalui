import { useState } from 'react'
import { ColorPicker, Space, Typography } from '@aster-ui/prefixed'
import { Demo } from './Demo'

const { Text } = Typography

// @example-imports: { ColorPicker } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <ColorPicker defaultValue="#6366f1" />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { ColorPicker } from 'asterui'
export function ShowTextDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <ColorPicker defaultValue="#10b981" showText />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { ColorPicker } from 'asterui'
export function PresetsDemo() {
  // @example-include
  const presets = [
    '#f43f5e', '#ec4899', '#d946ef', '#a855f7',
    '#8b5cf6', '#6366f1', '#3b82f6', '#0ea5e9',
    '#06b6d4', '#14b8a6', '#10b981', '#22c55e',
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <ColorPicker defaultValue="#6366f1" presets={presets} />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { ColorPicker, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="md">
        <ColorPicker size="xs" defaultValue="#f43f5e" mode="picker" />
        <ColorPicker size="sm" defaultValue="#6366f1" mode="picker" />
        <ColorPicker size="md" defaultValue="#10b981" mode="picker" />
        <ColorPicker size="lg" defaultValue="#a855f7" mode="picker" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { ColorPicker, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function ControlledDemo() {
  // @example-include
  const [color, setColor] = useState('#6366f1')
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <ColorPicker value={color} onChange={setColor} showText />
        <div
          className="w-full h-16 rounded-lg"
          style={{ backgroundColor: color }}
        />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { ColorPicker, Space, Typography } from 'asterui'
export function ModesDemo() {
  // @example-include
  const { Text } = Typography
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="lg">
        <Space direction="vertical" size="xs">
          <Text size="sm" muted>Picker only</Text>
          <ColorPicker mode="picker" defaultValue="#6366f1" />
        </Space>
        <Space direction="vertical" size="xs">
          <Text size="sm" muted>Swatches only</Text>
          <ColorPicker mode="swatches" defaultValue="#6366f1" />
        </Space>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}
