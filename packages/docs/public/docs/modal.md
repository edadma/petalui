# Modal

Dialog overlay for user interaction and displaying information.

## Import

```tsx
import { Modal } from 'asterui'
```

## Examples

### Basic Modal

Simple modal with open/close functionality.

```tsx
import { useState } from 'react'
import { Modal, Button } from 'asterui'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
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
    </>
  )
}
```

### Default Footer

Modal with built-in OK/Cancel buttons using onOk and onCancel props.

```tsx
import { useState } from 'react'
import { Modal, Button } from 'asterui'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        open={open}
        onOk={() => {
          setOpen(false)
          Modal.success({ title: 'Submitted', content: 'Form submitted!' })
        }}
        onCancel={() => setOpen(false)}
        title="Submit Form"
        okText="Submit"
        cancelText="Cancel"
      >
        <p>Click OK to submit or Cancel to close.</p>
      </Modal>
    </>
  )
}
```

### Custom Footer

Modal with custom footer buttons.

```tsx
import { useState } from 'react'
import { Modal, Button, Space } from 'asterui'

export default function App() {
  const [open, setOpen] = useState(false)

  const handleOk = () => {
    setOpen(false)
    Modal.success({ title: 'Success', content: 'Action completed!' })
  }

  return (
    <>
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
            <Button color="primary" onClick={handleOk}>OK</Button>
          </Space>
        }
      >
        <p>Are you sure you want to proceed?</p>
      </Modal>
    </>
  )
}
```

### Static Methods

Quick dialogs using Modal.info, Modal.success, Modal.warning, and Modal.error.

```tsx
import { Modal, Button, Space } from 'asterui'

export default function App() {
  return (
    <Space direction="horizontal" size="sm" wrap>
      <Button onClick={() => Modal.info({
        title: 'Info',
        content: 'This is an informational message.'
      })}>
        Info
      </Button>
      <Button onClick={() => Modal.success({
        title: 'Success',
        content: 'Operation completed successfully!'
      })}>
        Success
      </Button>
      <Button onClick={() => Modal.warning({
        title: 'Warning',
        content: 'Please proceed with caution.'
      })}>
        Warning
      </Button>
      <Button onClick={() => Modal.error({
        title: 'Error',
        content: 'Something went wrong.'
      })}>
        Error
      </Button>
    </Space>
  )
}
```

### Confirm Dialog

Confirmation dialog with OK and Cancel buttons using Modal.confirm.

```tsx
import { Modal, Button } from 'asterui'

export default function App() {
  return (
    <Button
      onClick={() =>
        Modal.confirm({
          title: 'Delete Item',
          content: 'Are you sure you want to delete this item?',
          okText: 'Delete',
          cancelText: 'Cancel',
          onOk: () => Modal.success({
            title: 'Deleted',
            content: 'Item has been deleted.'
          }),
        })
      }
    >
      Delete Item
    </Button>
  )
}
```

### Centered Modal

Vertically centered modal.

```tsx
import { useState } from 'react'
import { Modal, Button } from 'asterui'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
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
    </>
  )
}
```

### Modal Sizes

Different modal widths.

```tsx
import { useState } from 'react'
import { Modal, Button, Space } from 'asterui'

export default function App() {
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState<number | string>(520)

  const showModal = (w: number | string) => {
    setWidth(w)
    setOpen(true)
  }

  return (
    <>
      <Space direction="horizontal" size="sm" wrap>
        <Button onClick={() => showModal(400)}>Small (400px)</Button>
        <Button onClick={() => showModal(520)}>Default (520px)</Button>
        <Button onClick={() => showModal(800)}>Large (800px)</Button>
      </Space>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`Modal Width: ${width}px`}
        width={width}
      >
        <p>This modal has a width of {width}px.</p>
      </Modal>
    </>
  )
}
```

### Responsive Position

Modal position can change based on screen size using a responsive position object.

```tsx
import { useState } from 'react'
import { Modal, Button } from 'asterui'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
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
      </Modal>
    </>
  )
}
```

## API

### Modal Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `open` | Controlled open state | `boolean` | `false` |
| `title` | Modal title | `React.ReactNode` | - |
| `children` | Modal content | `React.ReactNode` | - |
| `footer` | Custom footer content (set to null to hide) | `React.ReactNode` | - |
| `onOk` | OK button click handler (shows default footer) | `() => void \| Promise<void>` | - |
| `onCancel` | Cancel button click handler | `() => void` | - |
| `onClose` | Close handler (alias for onCancel) | `() => void` | - |
| `afterClose` | Callback after modal close animation completes | `() => void` | - |
| `okText` | OK button text | `string` | `'OK'` |
| `cancelText` | Cancel button text | `string` | `'Cancel'` |
| `confirmLoading` | Show loading spinner on OK button | `boolean` | - |
| `okButtonProps` | Props for the OK button | `React.ButtonHTMLAttributes` | - |
| `cancelButtonProps` | Props for the Cancel button | `React.ButtonHTMLAttributes` | - |
| `closeIcon` | Custom close icon | `React.ReactNode` | - |
| `width` | Modal width | `number \| string` | - |
| `centered` | Vertically center modal | `boolean` | `false` |
| `position` | Modal position (supports responsive object) | `'top' \| 'middle' \| 'bottom' \| ResponsivePosition` | - |
| `align` | Modal alignment | `'start' \| 'end'` | - |
| `maskClosable` | Close on backdrop click | `boolean` | `true` |
| `closable` | Show close backdrop | `boolean` | `true` |
| `zIndex` | CSS z-index for the modal | `number` | - |
| `destroyOnClose` | Destroy child components when modal is closed | `boolean` | `false` |
| `initialFocus` | Where to place initial focus | `'ok' \| 'cancel' \| 'close'` | - |
| `alertDialog` | Use alertdialog role for urgent messages | `boolean` | `false` |
| `data-testid` | Test ID prefix for child elements | `string` | - |
| `className` | Additional CSS classes | `string` | - |

### Modal.info/success/warning/error/confirm Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `title` | Modal title | `React.ReactNode` | - |
| `content` | Modal content | `React.ReactNode` | - |
| `onOk` | OK button click handler | `() => void \| Promise<void>` | - |
| `onCancel` | Cancel button click handler (confirm only) | `() => void` | - |
| `okText` | OK button text | `string` | `'OK'` |
| `cancelText` | Cancel button text (confirm only) | `string` | `'Cancel'` |
| `type` | Modal type for styling | `'info' \| 'success' \| 'warning' \| 'error'` | - |

### Static Methods

- `Modal.info(config)` - Information dialog
- `Modal.success(config)` - Success dialog
- `Modal.warning(config)` - Warning dialog
- `Modal.error(config)` - Error dialog
- `Modal.confirm(config)` - Confirmation dialog with OK/Cancel

## Accessibility

- Uses native `<dialog>` element for proper modal behavior
- Focus is trapped within the modal when open
- Pressing Escape closes the modal
- Focus is restored to the trigger element when closed
- Uses `aria-labelledby` and `aria-describedby` for screen readers
