import React from 'react';
import { message, Button, Space } from 'asterui';
import { Demo } from './Demo';

export function BasicDemo() {
  return (
    <Demo>
      <Space direction="horizontal" size="sm" wrap>
        <Button
          color="primary"
          onClick={() => message.success('Changes saved successfully')}
        >
          Success
        </Button>

        <Button
          onClick={() => message.error('Failed to save changes')}
        >
          Error
        </Button>

        <Button
          onClick={() => message.info('New updates available')}
        >
          Info
        </Button>

        <Button
          onClick={() => message.warning('Session expires in 5 minutes')}
        >
          Warning
        </Button>
      </Space>
    </Demo>
  );
}

export function LoadingDemo() {
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  const handleClick = () => {
    const id = message.loading('Processing...');
    setLoadingId(id);

    setTimeout(() => {
      message.destroy(id);
      message.success('Done!');
      setLoadingId(null);
    }, 2000);
  };

  return (
    <Demo>
      <Button onClick={handleClick} disabled={!!loadingId}>
        {loadingId ? 'Processing...' : 'Submit'}
      </Button>
    </Demo>
  );
}

export function DurationDemo() {
  return (
    <Demo>
      <Space direction="horizontal" size="sm" wrap>
        <Button
          onClick={() => message.info('Quick message', { duration: 1 })}
        >
          1 second
        </Button>

        <Button
          color="primary"
          onClick={() => message.info('Default duration')}
        >
          Default (3s)
        </Button>

        <Button
          onClick={() => message.info('Longer message', { duration: 6 })}
        >
          6 seconds
        </Button>
      </Space>
    </Demo>
  );
}

export function StackingDemo() {
  return (
    <Demo>
      <Button
        color="primary"
        onClick={() => {
          message.success('First message');
          setTimeout(() => message.info('Second message'), 300);
          setTimeout(() => message.warning('Third message'), 600);
        }}
      >
        Show Multiple
      </Button>
    </Demo>
  );
}
