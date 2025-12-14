import { Alert, Space, Button } from 'asterui'
import { InformationCircleIcon, CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@aster-ui/icons'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <Alert>
        <InformationCircleIcon size="lg" className="shrink-0" />
        <span>This is a basic alert</span>
      </Alert>
    </Demo>
  )
}

export function TypesDemo() {
  return (
    <Demo>
      <Space direction="vertical" size="sm">
        <Alert type="info">
          <InformationCircleIcon size="lg" className="shrink-0" />
          <span>Info: New software update available</span>
        </Alert>

        <Alert type="success">
          <CheckCircleIcon size="lg" className="shrink-0" />
          <span>Success: Your purchase has been confirmed</span>
        </Alert>

        <Alert type="warning">
          <ExclamationTriangleIcon size="lg" className="shrink-0" />
          <span>Warning: Invalid email address</span>
        </Alert>

        <Alert type="error">
          <XCircleIcon size="lg" className="shrink-0" />
          <span>Error: Invalid credentials</span>
        </Alert>
      </Space>
    </Demo>
  )
}

export function ActionDemo() {
  return (
    <Demo>
      <Alert type="warning">
        <ExclamationTriangleIcon size="lg" className="shrink-0" />
        <span>We use cookies for no reason</span>
        <div>
          <Button size="sm">Accept</Button>
        </div>
      </Alert>
    </Demo>
  )
}

export function OutlineDemo() {
  return (
    <Demo>
      <Space direction="vertical" size="sm">
        <Alert type="info" outline>
          <InformationCircleIcon size="lg" className="shrink-0" />
          <span>Info outline alert</span>
        </Alert>

        <Alert type="success" outline>
          <CheckCircleIcon size="lg" className="shrink-0" />
          <span>Success outline alert</span>
        </Alert>
      </Space>
    </Demo>
  )
}
