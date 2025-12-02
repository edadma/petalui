import React from 'react';
import { createRoot } from 'react-dom/client';
import { Show, Hide, useBreakpoint, Button, Flex, Alert, Card, Typography } from '@edadma/bloomui';

const { Text } = Typography;

function BreakpointDemo() {
  const { breakpoint, width, isAbove, isBelow } = useBreakpoint();

  return (
    <Card className="bg-base-200">
      <Flex direction="column" gap="xs">
        <Text>Breakpoint: <strong>{breakpoint}</strong></Text>
        <Text>Width: <strong>{width}px</strong></Text>
        <Text>Is desktop (lg+): <strong>{isAbove('lg') ? 'Yes' : 'No'}</strong></Text>
        <Text>Is mobile (&lt;md): <strong>{isBelow('md') ? 'Yes' : 'No'}</strong></Text>
      </Flex>
    </Card>
  );
}

const demos: Record<string, React.ReactNode> = {
  'show-above': (
    <Show above="md">
      <Button type="primary">Visible on md and larger</Button>
    </Show>
  ),
  'hide-below': (
    <Hide below="md">
      <Alert type="info">This is hidden on small screens</Alert>
    </Hide>
  ),
  'show-at': (
    <>
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
    </>
  ),
  'show-between': (
    <Show between={['sm', 'lg']}>
      <Card title="Responsive Content" className="bg-base-200">
        Visible on sm, md, and lg screens only
      </Card>
    </Show>
  ),
  'responsive-layout': (
    <Flex justify="between" align="center" className="p-4 bg-base-200 rounded-lg">
      <div className="font-bold">Logo</div>
      <Show above="md">
        <Flex gap="md">
          <Button type="ghost" size="sm">Home</Button>
          <Button type="ghost" size="sm">About</Button>
          <Button type="ghost" size="sm">Contact</Button>
        </Flex>
      </Show>
      <Hide above="md">
        <Button type="ghost" size="sm">Menu</Button>
      </Hide>
    </Flex>
  ),
  'use-breakpoint': <BreakpointDemo />,
};

document.querySelectorAll('.demo-container').forEach((container) => {
  const example = container.getAttribute('data-example');
  if (example && demos[example]) {
    const root = createRoot(container);
    root.render(<>{demos[example]}</>);
  }
});
