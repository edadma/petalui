import React, { useState, useMemo, useEffect } from 'react'
import { Countdown, Space, notification } from 'asterui'
import { Demo } from './Demo'

// Single component with all demos to avoid multiple React roots
export function AllDemos() {
  const target1h = useMemo(() => Date.now() + 60 * 60 * 1000, [])
  const target3d = useMemo(() => Date.now() + 3 * 24 * 60 * 60 * 1000, [])
  const target2d = useMemo(() => Date.now() + 2 * 24 * 60 * 60 * 1000, [])
  const target1d = useMemo(() => Date.now() + 24 * 60 * 60 * 1000, [])
  const [callbackTarget, setCallbackTarget] = useState(() => Date.now() + 20 * 1000)

  const handleFinish = () => {
    notification.success({ message: 'Countdown finished!' })
    setCallbackTarget(Date.now() + 20 * 1000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-2">Basic Countdown</h3>
        <Countdown value={target1h} />
      </div>

      <div>
        <h3 className="font-semibold mb-2">With Days</h3>
        <Countdown value={target3d} format="DD:HH:MM:SS" />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Sizes</h3>
        <Space direction="vertical" size="lg">
          <Countdown value={target1h} size="xs" />
          <Countdown value={target1h} size="sm" />
          <Countdown value={target1h} size="md" />
          <Countdown value={target1h} size="lg" />
        </Space>
      </div>

      <div>
        <h3 className="font-semibold mb-2">With Labels</h3>
        <Countdown value={target2d} format="DD:HH:MM:SS" showLabels />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Boxed Style</h3>
        <Countdown value={target1d} format="DD:HH:MM:SS" showLabels boxed />
      </div>

      <div>
        <h3 className="font-semibold mb-2">With Callback</h3>
        <Countdown
          key={callbackTarget}
          value={callbackTarget}
          format="MM:SS"
          onFinish={handleFinish}
        />
      </div>
    </div>
  )
}

export function BasicDemo() {
  const target = useMemo(() => Date.now() + 60 * 60 * 1000, [])
  return <Countdown value={target} />
}

export function WithDaysDemo() {
  const target = useMemo(() => Date.now() + 3 * 24 * 60 * 60 * 1000, [])
  return <Countdown value={target} format="DD:HH:MM:SS" />
}

export function SizesDemo() {
  const [target] = useState(() => Date.now() + 60 * 60 * 1000)

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
  const [target] = useState(() => Date.now() + 2 * 24 * 60 * 60 * 1000)

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
  const [target] = useState(() => Date.now() + 24 * 60 * 60 * 1000)

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
