import React from 'react'
import { Status, Space } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <Space size="md">
        <Status type="success" />
        <Status type="warning" />
        <Status type="error" />
        <Status type="info" />
      </Space>
    </Demo>
  )
}

export function SizesDemo() {
  return (
    <Demo>
      <Space size="md" align="center">
        <Status type="primary" size="xs" />
        <Status type="primary" size="sm" />
        <Status type="primary" size="md" />
        <Status type="primary" size="lg" />
        <Status type="primary" size="xl" />
      </Space>
    </Demo>
  )
}

export function AnimatedDemo() {
  return (
    <Demo>
      <Space size="lg" align="center">
        <Status type="error" ping />
        <Status type="success" ping />
        <Status type="info" bounce />
      </Space>
    </Demo>
  )
}

export function ColorsDemo() {
  return (
    <Demo>
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
    </Demo>
  )
}
