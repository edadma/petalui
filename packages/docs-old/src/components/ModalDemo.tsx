import { useState } from 'react';
import { Modal, Button, Space } from '@aster-ui/prefixed';
import { Demo } from './Demo';

// @example-imports: { Modal, Button } from 'asterui'
// @example-imports: { useState } from 'react'
export function BasicDemo() {
  // @example-include
  const [open, setOpen] = useState(false);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Button color="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Basic Modal"
      >
        <p>This is the modal content.</p>
        <p>You can put any content here.</p>
      </Modal>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Modal, Button } from 'asterui'
// @example-imports: { useState } from 'react'
export function DefaultFooterDemo() {
  // @example-include
  const [open, setOpen] = useState(false);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Button color="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        open={open}
        onOk={() => {
          setOpen(false);
          Modal.success({ title: 'Submitted', content: 'Form submitted successfully!' });
        }}
        onCancel={() => setOpen(false)}
        title="Submit Form"
        okText="Submit"
        cancelText="Cancel"
      >
        <p>Click OK to submit the form or Cancel to close.</p>
      </Modal>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Modal, Button, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function CustomFooterDemo() {
  // @example-include
  const [open, setOpen] = useState(false);

  const handleOk = () => {
    setOpen(false);
    Modal.success({ title: 'Success', content: 'Action completed successfully!' });
  };
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Button color="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirmation"
        footer={
          <Space direction="horizontal" size="sm">
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button color="primary" onClick={handleOk}>
              OK
            </Button>
          </Space>
        }
      >
        <p>Are you sure you want to proceed with this action?</p>
      </Modal>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Modal, Button, Space } from 'asterui'
export function StaticMethodsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="sm" wrap>
        <Button onClick={() => Modal.info({ title: 'Info', content: 'This is an informational message.' })}>
          Info
        </Button>
        <Button onClick={() => Modal.success({ title: 'Success', content: 'Operation completed successfully!' })}>
          Success
        </Button>
        <Button onClick={() => Modal.warning({ title: 'Warning', content: 'Please proceed with caution.' })}>
          Warning
        </Button>
        <Button onClick={() => Modal.error({ title: 'Error', content: 'Something went wrong.' })}>
          Error
        </Button>
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Modal, Button } from 'asterui'
export function ConfirmDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Button
        onClick={() =>
          Modal.confirm({
            title: 'Delete Item',
            content: 'Are you sure you want to delete this item? This action cannot be undone.',
            okText: 'Delete',
            cancelText: 'Cancel',
            onOk: () => Modal.success({ title: 'Deleted', content: 'Item has been deleted.' }),
          })
        }
      >
        Delete Item
      </Button>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Modal, Button } from 'asterui'
// @example-imports: { useState } from 'react'
export function CenteredDemo() {
  // @example-include
  const [open, setOpen] = useState(false);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Button color="primary" onClick={() => setOpen(true)}>
        Centered Modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Centered Modal"
        centered
      >
        <p>This modal is vertically centered on the screen.</p>
      </Modal>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Modal, Button, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function SizesDemo() {
  // @example-include
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState<number | string>(520);

  const showModal = (w: number | string) => {
    setWidth(w);
    setOpen(true);
  };
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="sm" wrap>
        <Button onClick={() => showModal(400)}>
          Small (400px)
        </Button>
        <Button onClick={() => showModal(520)}>
          Default (520px)
        </Button>
        <Button onClick={() => showModal(800)}>
          Large (800px)
        </Button>
      </Space>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`Modal Width: ${width}px`}
        width={width}
      >
        <p>This modal has a width of {width}px.</p>
      </Modal>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Modal, Button } from 'asterui'
// @example-imports: { useState } from 'react'
export function ResponsiveDemo() {
  // @example-include
  const [open, setOpen] = useState(false);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Button color="primary" onClick={() => setOpen(true)}>
        Responsive Modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Responsive Modal"
        position={{ base: 'bottom', sm: 'middle' }}
      >
        <p>This modal appears at the bottom on mobile and centered on larger screens.</p>
        <p className="text-sm text-base-content/70 mt-2">Resize your browser to see the effect.</p>
      </Modal>
      {/* @example-return-end */}
    </Demo>
  );
}
