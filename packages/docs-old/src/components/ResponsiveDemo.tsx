import React from 'react'
import { Show, Hide, useBreakpoint, Button, Flex, Alert, Card, Typography } from '@aster-ui/prefixed'
import { Demo } from './Demo'

const { Text } = Typography

// @example-imports: { Show, Button } from 'asterui'
export function ShowAboveDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Show above="md">
        <Button color="primary">Visible on md and larger</Button>
      </Show>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Hide, Alert } from 'asterui'
export function HideBelowDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Hide below="md">
        <Alert type="info">This is hidden on small screens</Alert>
      </Hide>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Show, Alert } from 'asterui'
export function ShowAtDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Show at="xs">
        <Alert type="info">Mobile view (xs)</Alert>
      </Show>
      <Show at="sm">
        <Alert type="warning">Small screen (sm)</Alert>
      </Show>
      <Show at={['md', 'lg']}>
        <Alert type="success">Tablet or small desktop (md/lg)</Alert>
      </Show>
      <Show at={['xl', '2xl']}>
        <Alert type="info">Large desktop (xl/2xl)</Alert>
      </Show>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Show, Card } from 'asterui'
export function ShowBetweenDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Show between={['sm', 'lg']}>
        <Card title="Responsive Content" className="bg-base-200">
          Visible on sm, md, and lg screens only
        </Card>
      </Show>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Show, Hide, Flex, Button } from 'asterui'
export function ResponsiveLayoutDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Flex justify="between" align="center" className="p-4 bg-base-200 rounded-lg">
        <div className="font-bold">Logo</div>
        <Show above="md">
          <Flex gap="md">
            <Button variant="ghost" size="sm">
              Home
            </Button>
            <Button variant="ghost" size="sm">
              About
            </Button>
            <Button variant="ghost" size="sm">
              Contact
            </Button>
          </Flex>
        </Show>
        <Hide above="md">
          <Button variant="ghost" size="sm">
            Menu
          </Button>
        </Hide>
      </Flex>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { useBreakpoint, Card, Flex, Typography } from 'asterui'
function BreakpointDemo() {
  // @example-include
  const { breakpoint, width, isAbove, isBelow } = useBreakpoint()
  // @example-include-end

  return (
    <Card className="bg-base-200">
      <Flex direction="column" gap="xs">
        <Typography.Text>
          Breakpoint: <strong>{breakpoint}</strong>
        </Typography.Text>
        <Typography.Text>
          Width: <strong>{width}px</strong>
        </Typography.Text>
        <Typography.Text>
          Is desktop (lg+): <strong>{isAbove('lg') ? 'Yes' : 'No'}</strong>
        </Typography.Text>
        <Typography.Text>
          Is mobile (&lt;md): <strong>{isBelow('md') ? 'Yes' : 'No'}</strong>
        </Typography.Text>
      </Flex>
    </Card>
  )
}

export function UseBreakpointDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <BreakpointDemo />
      {/* @example-return-end */}
    </Demo>
  )
}
