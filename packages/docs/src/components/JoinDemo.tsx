import { Join, Button, Input } from 'asterui'
import { MagnifyingGlassIcon } from '@aster-ui/icons'
import { Demo } from './Demo'

export function JoinedButtonsDemo() {
  return (
    <Demo>
      <Join>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </Join>
    </Demo>
  )
}

export function VerticalJoinDemo() {
  return (
    <Demo>
      <Join direction="vertical">
        <Button>Top</Button>
        <Button>Middle</Button>
        <Button>Bottom</Button>
      </Join>
    </Demo>
  )
}

export function JoinedInputAndButtonDemo() {
  return (
    <Demo>
      <Join>
        <Input placeholder="Search..." />
        <Button color="primary">
          <MagnifyingGlassIcon />
        </Button>
      </Join>
    </Demo>
  )
}
