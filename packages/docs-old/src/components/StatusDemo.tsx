import React from 'react'
import { Status, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Status, Space } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space size="md">
        <Status type="success" />
        <Status type="warning" />
        <Status type="error" />
        <Status type="info" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Status, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space size="md" align="center">
        <Status type="primary" size="xs" />
        <Status type="primary" size="sm" />
        <Status type="primary" size="md" />
        <Status type="primary" size="lg" />
        <Status type="primary" size="xl" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Status, Space } from 'asterui'
export function AnimatedDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space size="lg" align="center">
        <Status type="error" ping />
        <Status type="success" ping />
        <Status type="info" bounce />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Status, Space } from 'asterui'
export function ColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space size="md">
        <Status type="neutral" />
        <Status type="primary" />
        <Status type="secondary" />
        <Status type="accent" />
        <Status type="info" />
        <Status type="success" />
        <Status type="warning" />
        <Status type="error" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}
