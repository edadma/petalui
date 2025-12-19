import React from 'react';
import { Popconfirm, Button, notification } from '@aster-ui/prefixed';
import { Demo } from './Demo';

const handleDelete = () => {
  notification.success({
    message: 'Deleted',
    description: 'The item has been deleted successfully.',
  });
};

const handleAsyncDelete = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      notification.success({
        message: 'Deleted',
        description: 'The item has been deleted after async operation.',
      });
      resolve();
    }, 2000);
  });
};

// @example-imports: { Popconfirm, Button, notification } from 'asterui'
export function BasicDemo() {
  // @example-include
  const handleDelete = () => {
    notification.success({
      message: 'Deleted',
      description: 'The item has been deleted successfully.',
    });
  };
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Popconfirm title="Are you sure?" onConfirm={handleDelete}>
        <Button color="error">Delete</Button>
      </Popconfirm>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Popconfirm, Button, notification } from 'asterui'
export function DescriptionDemo() {
  // @example-include
  const handleDelete = () => {
    notification.success({
      message: 'Deleted',
      description: 'The item has been deleted successfully.',
    });
  };
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Popconfirm
        title="Delete this task?"
        description="This action cannot be undone. Are you sure you want to continue?"
        onConfirm={handleDelete}
      >
        <Button color="error">Delete</Button>
      </Popconfirm>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Popconfirm, Button } from 'asterui'
export function PlacementsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="flex gap-4 flex-wrap">
        <Popconfirm title="Delete?" placement="top">
          <Button>Top</Button>
        </Popconfirm>
        <Popconfirm title="Delete?" placement="right">
          <Button>Right</Button>
        </Popconfirm>
        <Popconfirm title="Delete?" placement="bottom">
          <Button>Bottom</Button>
        </Popconfirm>
        <Popconfirm title="Delete?" placement="left">
          <Button>Left</Button>
        </Popconfirm>
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Popconfirm, Button, notification } from 'asterui'
export function CustomTextDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Popconfirm
        title="Confirm submission?"
        okText="Yes, submit"
        cancelText="No, cancel"
        okType="success"
        cancelType="error"
        onConfirm={() => {
          notification.success({ message: 'Submitted!', description: 'Form submitted successfully.' });
        }}
      >
        <Button color="primary">Submit</Button>
      </Popconfirm>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Popconfirm, Button, notification } from 'asterui'
export function AsyncDemo() {
  // @example-include
  const handleAsyncDelete = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        notification.success({
          message: 'Deleted',
          description: 'The item has been deleted after async operation.',
        });
        resolve();
      }, 2000);
    });
  };
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Popconfirm
        title="Delete this item?"
        description="This will take a moment..."
        onConfirm={handleAsyncDelete}
      >
        <Button color="error">Delete (Async)</Button>
      </Popconfirm>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Popconfirm, Button } from 'asterui'
export function CustomIconDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="flex gap-4">
        <Popconfirm title="Delete this?" icon={<span className="text-2xl">🗑️</span>}>
          <Button>Custom Icon</Button>
        </Popconfirm>
        <Popconfirm title="Proceed?" icon={null}>
          <Button>No Icon</Button>
        </Popconfirm>
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Popconfirm, Button } from 'asterui'
export function NoCancelDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Popconfirm
        title="Acknowledge this message"
        description="Click OK to dismiss."
        showCancel={false}
        okText="Got it"
      >
        <Button color="info">Show Info</Button>
      </Popconfirm>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Popconfirm, Button } from 'asterui'
export function DisabledDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Popconfirm title="Are you sure?" disabled>
        <Button disabled>Disabled</Button>
      </Popconfirm>
      {/* @example-return-end */}
    </Demo>
  );
}
