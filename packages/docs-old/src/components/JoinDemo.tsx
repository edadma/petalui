import { Join, Button, Input } from '@aster-ui/prefixed'
import { MagnifyingGlassIcon } from '@aster-ui/icons-prefixed'
import { Demo } from './Demo'

// @example-imports: { Join, Button } from 'asterui'
export function JoinedButtonsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Join>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </Join>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Join, Button } from 'asterui'
export function VerticalJoinDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Join direction="vertical">
        <Button>Top</Button>
        <Button>Middle</Button>
        <Button>Bottom</Button>
      </Join>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Join, Input, Button } from 'asterui'
// @example-imports: { MagnifyingGlassIcon } from '@aster-ui/icons'
export function JoinedInputAndButtonDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Join>
        <Input placeholder="Search..." />
        <Button color="primary">
          <MagnifyingGlassIcon />
        </Button>
      </Join>
      {/* @example-return-end */}
    </Demo>
  )
}
