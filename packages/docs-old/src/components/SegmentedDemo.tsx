import React, { useState } from 'react'
import { Segmented, Space } from '@aster-ui/prefixed'
import { Bars3Icon, Squares2X2Icon } from '@aster-ui/icons-prefixed'
import { Demo } from './Demo'

// @example-imports: { Segmented } from 'asterui'
// @example-imports: { useState } from 'react'
export function BasicDemo() {
  // @example-include
  const [view, setView] = useState('List')
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Segmented value={view} onChange={(v) => setView(v as string)}>
          <Segmented.Item value="List">List</Segmented.Item>
          <Segmented.Item value="Grid">Grid</Segmented.Item>
          <Segmented.Item value="Table">Table</Segmented.Item>
        </Segmented>
        <p className="mt-2 text-sm text-base-content/70">Selected: {view}</p>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Segmented } from 'asterui'
// @example-imports: { useState } from 'react'
export function DisabledItemsDemo() {
  // @example-include
  const [period, setPeriod] = useState('week')
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Segmented value={period} onChange={(v) => setPeriod(v as string)}>
          <Segmented.Item value="day">Daily</Segmented.Item>
          <Segmented.Item value="week">Weekly</Segmented.Item>
          <Segmented.Item value="month">Monthly</Segmented.Item>
          <Segmented.Item value="year" disabled>Yearly</Segmented.Item>
        </Segmented>
        <p className="mt-2 text-sm text-base-content/70">Selected: {period}</p>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Segmented, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" gap="md">
        <Segmented size="xs" defaultValue="M">
          <Segmented.Item value="S">S</Segmented.Item>
          <Segmented.Item value="M">M</Segmented.Item>
          <Segmented.Item value="L">L</Segmented.Item>
        </Segmented>
        <Segmented size="sm" defaultValue="M">
          <Segmented.Item value="S">S</Segmented.Item>
          <Segmented.Item value="M">M</Segmented.Item>
          <Segmented.Item value="L">L</Segmented.Item>
        </Segmented>
        <Segmented size="md" defaultValue="M">
          <Segmented.Item value="S">S</Segmented.Item>
          <Segmented.Item value="M">M</Segmented.Item>
          <Segmented.Item value="L">L</Segmented.Item>
        </Segmented>
        <Segmented size="lg" defaultValue="M">
          <Segmented.Item value="S">S</Segmented.Item>
          <Segmented.Item value="M">M</Segmented.Item>
          <Segmented.Item value="L">L</Segmented.Item>
        </Segmented>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Segmented } from 'asterui'
// @example-imports: { useState } from 'react'
export function BlockDemo() {
  // @example-include
  const [align, setAlign] = useState('Center')
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div className="w-full max-w-md">
        <Segmented value={align} onChange={(v) => setAlign(v as string)} block>
          <Segmented.Item value="Left">Left</Segmented.Item>
          <Segmented.Item value="Center">Center</Segmented.Item>
          <Segmented.Item value="Right">Right</Segmented.Item>
        </Segmented>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Segmented } from 'asterui'
export function DisabledDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Segmented defaultValue="A" disabled>
        <Segmented.Item value="A">Option A</Segmented.Item>
        <Segmented.Item value="B">Option B</Segmented.Item>
        <Segmented.Item value="C">Option C</Segmented.Item>
      </Segmented>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Segmented } from 'asterui'
// @example-imports: { Bars3Icon, Squares2X2Icon } from '@aster-ui/icons'
// @example-imports: { useState } from 'react'
export function WithIconsDemo() {
  // @example-include
  const [view, setView] = useState('list')
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Segmented value={view} onChange={(v) => setView(v as string)}>
          <Segmented.Item value="list" icon={<Bars3Icon size="sm" />}>
            List
          </Segmented.Item>
          <Segmented.Item value="grid" icon={<Squares2X2Icon size="sm" />}>
            Grid
          </Segmented.Item>
        </Segmented>
        <p className="mt-2 text-sm text-base-content/70">View: {view}</p>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}
