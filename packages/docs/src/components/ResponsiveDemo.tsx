import React from 'react'
import { Show, Hide, useBreakpoint, Button, Flex, Alert, Card, Typography } from 'asterui'
import { Demo } from './Demo'

const { Text } = Typography

export function ShowAboveDemo() {
  return (
    <Demo>
      <Show above="md">
        <Button color="primary">Visible on md and larger</Button>
      </Show>
    </Demo>
  )
}

export function HideBelowDemo() {
  return (
    <Demo>
      <Hide below="md">
        <Alert type="info">This is hidden on small screens</Alert>
      </Hide>
    </Demo>
  )
}

export function ShowAtDemo() {
  return (
    <Demo>
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
    </Demo>
  )
}

export function ShowBetweenDemo() {
  return (
    <Demo>
      <Show between={['sm', 'lg']}>
        <Card title="Responsive Content" className="bg-base-200">
          Visible on sm, md, and lg screens only
        </Card>
      </Show>
    </Demo>
  )
}

export function ResponsiveLayoutDemo() {
  return (
    <Demo>
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
    </Demo>
  )
}

function BreakpointDemo() {
  const { breakpoint, width, isAbove, isBelow } = useBreakpoint()

  return (
    <Card className="bg-base-200">
      <Flex direction="column" gap="xs">
        <Text>
          Breakpoint: <strong>{breakpoint}</strong>
        </Text>
        <Text>
          Width: <strong>{width}px</strong>
        </Text>
        <Text>
          Is desktop (lg+): <strong>{isAbove('lg') ? 'Yes' : 'No'}</strong>
        </Text>
        <Text>
          Is mobile (&lt;md): <strong>{isBelow('md') ? 'Yes' : 'No'}</strong>
        </Text>
      </Flex>
    </Card>
  )
}

export function UseBreakpointDemo() {
  return (
    <Demo>
      <BreakpointDemo />
    </Demo>
  )
}
