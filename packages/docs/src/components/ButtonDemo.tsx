import { Button } from 'asterui'
import { Demo } from './Demo'

export function ColorsDemo() {
  return (
    <Demo>
      <Button>Default</Button>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="accent">Accent</Button>
      <Button color="info">Info</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="error">Error</Button>
    </Demo>
  )
}

export function SizesDemo() {
  return (
    <Demo>
      <Button size="xs">Tiny</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Demo>
  )
}

export function VariantsDemo() {
  return (
    <Demo>
      <Button color="primary">Solid</Button>
      <Button color="primary" variant="outline">Outline</Button>
      <Button color="primary" variant="soft">Soft</Button>
      <Button color="primary" variant="ghost">Ghost</Button>
      <Button color="primary" variant="link">Link</Button>
    </Demo>
  )
}

export function StatesDemo() {
  return (
    <Demo>
      <Button color="primary" loading>Loading</Button>
      <Button color="primary" disabled>Disabled</Button>
    </Demo>
  )
}
