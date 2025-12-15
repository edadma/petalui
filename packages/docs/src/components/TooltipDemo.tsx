import { Tooltip, Button, Space } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <Tooltip tip="This is a tooltip">
        <Button>Hover me</Button>
      </Tooltip>
    </Demo>
  )
}

export function PositionsDemo() {
  return (
    <Demo>
      <div className="flex flex-wrap gap-4 justify-center py-8">
        <Tooltip tip="Top tooltip" position="top">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip tip="Bottom tooltip" position="bottom">
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip tip="Left tooltip" position="left">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip tip="Right tooltip" position="right">
          <Button>Right</Button>
        </Tooltip>
      </div>
    </Demo>
  )
}

export function ColorsDemo() {
  return (
    <Demo>
      <Space wrap>
        <Tooltip tip="Primary tooltip" color="primary">
          <Button color="primary">Primary</Button>
        </Tooltip>
        <Tooltip tip="Secondary tooltip" color="secondary">
          <Button color="secondary">Secondary</Button>
        </Tooltip>
        <Tooltip tip="Accent tooltip" color="accent">
          <Button color="accent">Accent</Button>
        </Tooltip>
        <Tooltip tip="Info tooltip" color="info">
          <Button color="info">Info</Button>
        </Tooltip>
        <Tooltip tip="Success tooltip" color="success">
          <Button color="success">Success</Button>
        </Tooltip>
        <Tooltip tip="Warning tooltip" color="warning">
          <Button color="warning">Warning</Button>
        </Tooltip>
        <Tooltip tip="Error tooltip" color="error">
          <Button color="error">Error</Button>
        </Tooltip>
      </Space>
    </Demo>
  )
}

export function OpenStateDemo() {
  return (
    <Demo>
      <Tooltip tip="Always visible" open>
        <Button>Always Open</Button>
      </Tooltip>
    </Demo>
  )
}
