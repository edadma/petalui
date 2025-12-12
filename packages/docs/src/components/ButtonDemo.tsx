import React from 'react'
import { Button, Space } from 'asterui'

export function BasicButtonDemo() {
  return (
    <Space wrap>
      <Button>Default</Button>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="accent">Accent</Button>
      <Button color="info">Info</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="error">Error</Button>
    </Space>
  )
}

export function ButtonVariantsDemo() {
  return (
    <Space wrap>
      <Button color="primary">Solid</Button>
      <Button color="primary" variant="outline">Outline</Button>
      <Button color="primary" variant="soft">Soft</Button>
      <Button color="primary" variant="ghost">Ghost</Button>
      <Button color="primary" variant="link">Link</Button>
    </Space>
  )
}

export function ButtonSizesDemo() {
  return (
    <Space wrap align="center">
      <Button color="primary" size="xs">Extra Small</Button>
      <Button color="primary" size="sm">Small</Button>
      <Button color="primary" size="md">Medium</Button>
      <Button color="primary" size="lg">Large</Button>
    </Space>
  )
}

export function ButtonStatesDemo() {
  return (
    <Space wrap>
      <Button color="primary" loading>Loading</Button>
      <Button color="primary" disabled>Disabled</Button>
      <Button color="primary" block>Block Button</Button>
    </Space>
  )
}

export function ButtonShapesDemo() {
  return (
    <Space wrap>
      <Button color="primary">Default</Button>
      <Button color="primary" shape="square">S</Button>
      <Button color="primary" shape="circle">C</Button>
    </Space>
  )
}
