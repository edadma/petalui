import { useState } from 'react'
import { Countdown, Space, notification } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  // 1 hour from now
  const target = Date.now() + 60 * 60 * 1000

  return (
    <Demo>
      <Countdown value={target} />
    </Demo>
  )
}

export function WithDaysDemo() {
  // 3 days from now
  const target = Date.now() + 3 * 24 * 60 * 60 * 1000

  return (
    <Demo>
      <Countdown value={target} format="DD:HH:MM:SS" />
    </Demo>
  )
}

export function SizesDemo() {
  const target = Date.now() + 60 * 60 * 1000

  return (
    <Demo>
      <Space direction="vertical" size="lg">
        <Countdown value={target} size="xs" />
        <Countdown value={target} size="sm" />
        <Countdown value={target} size="md" />
        <Countdown value={target} size="lg" />
      </Space>
    </Demo>
  )
}

export function WithLabelsDemo() {
  const target = Date.now() + 2 * 24 * 60 * 60 * 1000

  return (
    <Demo>
      <Countdown
        value={target}
        format="DD:HH:MM:SS"
        showLabels
      />
    </Demo>
  )
}

export function BoxedDemo() {
  const target = Date.now() + 24 * 60 * 60 * 1000

  return (
    <Demo>
      <Countdown
        value={target}
        format="DD:HH:MM:SS"
        showLabels
        boxed
      />
    </Demo>
  )
}

export function CallbackDemo() {
  const [target, setTarget] = useState(() => Date.now() + 20 * 1000)

  const handleFinish = () => {
    notification.success({ message: 'Countdown finished!' })
    setTarget(Date.now() + 20 * 1000) // Restart
  }

  return (
    <Demo>
      <Countdown
        key={target}
        value={target}
        format="MM:SS"
        onFinish={handleFinish}
      />
    </Demo>
  )
}
