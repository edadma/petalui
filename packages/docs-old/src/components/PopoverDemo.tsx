import { Popover, Button } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Popover, Button } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Popover content="This is a simple popover">
        <Button>Hover me</Button>
      </Popover>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Popover, Button } from 'asterui'
export function TitleDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Popover
        title="User Information"
        content="Additional details about the user and their account settings."
      >
        <Button>Hover me</Button>
      </Popover>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Popover, Button } from 'asterui'
export function TriggersDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="flex gap-4">
        <Popover trigger="hover" content="Triggered by hovering">
          <Button>Hover</Button>
        </Popover>
        <Popover trigger="click" content="Triggered by clicking">
          <Button>Click</Button>
        </Popover>
        <Popover trigger="focus" content="Triggered by focusing">
          <Button>Focus</Button>
        </Popover>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Popover, Button } from 'asterui'
export function PlacementTopDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="flex gap-4 justify-center">
        <Popover placement="top" content="Top placement">
          <Button>Top</Button>
        </Popover>
        <Popover placement="topLeft" content="Top left placement">
          <Button>Top Left</Button>
        </Popover>
        <Popover placement="topRight" content="Top right placement">
          <Button>Top Right</Button>
        </Popover>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Popover, Button } from 'asterui'
export function PlacementBottomDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="flex gap-4 justify-center">
        <Popover placement="bottom" content="Bottom placement">
          <Button>Bottom</Button>
        </Popover>
        <Popover placement="bottomLeft" content="Bottom left placement">
          <Button>Bottom Left</Button>
        </Popover>
        <Popover placement="bottomRight" content="Bottom right placement">
          <Button>Bottom Right</Button>
        </Popover>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Popover, Button } from 'asterui'
export function PlacementLeftDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="flex gap-4 justify-center">
        <Popover placement="left" content="Left placement">
          <Button>Left</Button>
        </Popover>
        <Popover placement="leftTop" content="Left top placement">
          <Button>Left Top</Button>
        </Popover>
        <Popover placement="leftBottom" content="Left bottom placement">
          <Button>Left Bottom</Button>
        </Popover>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Popover, Button } from 'asterui'
export function PlacementRightDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="flex gap-4 justify-center">
        <Popover placement="right" content="Right placement">
          <Button>Right</Button>
        </Popover>
        <Popover placement="rightTop" content="Right top placement">
          <Button>Right Top</Button>
        </Popover>
        <Popover placement="rightBottom" content="Right bottom placement">
          <Button>Right Bottom</Button>
        </Popover>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}
