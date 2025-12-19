import React, { useState, useMemo, useEffect } from 'react'
import { Countdown, Space, notification } from '@aster-ui/prefixed'
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

// @example-imports: { Countdown } from 'asterui'
// @example-imports: { useMemo } from 'react'
export function BasicDemo() {
  // @example-include
  const target = useMemo(() => Date.now() + 60 * 60 * 1000, [])
  // @example-include-end
  return (
    <Demo>
      {/* @example-return */}
      <Countdown value={target} />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Countdown } from 'asterui'
// @example-imports: { useMemo } from 'react'
export function WithDaysDemo() {
  // @example-include
  const target = useMemo(() => Date.now() + 3 * 24 * 60 * 60 * 1000, [])
  // @example-include-end
  return (
    <Demo>
      {/* @example-return */}
      <Countdown value={target} format="DD:HH:MM:SS" />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Countdown, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function SizesDemo() {
  // @example-include
  const [target] = useState(() => Date.now() + 60 * 60 * 1000)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="lg">
        <Countdown value={target} size="xs" />
        <Countdown value={target} size="sm" />
        <Countdown value={target} size="md" />
        <Countdown value={target} size="lg" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Countdown } from 'asterui'
// @example-imports: { useState } from 'react'
export function WithLabelsDemo() {
  // @example-include
  const [target] = useState(() => Date.now() + 2 * 24 * 60 * 60 * 1000)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Countdown
        value={target}
        format="DD:HH:MM:SS"
        showLabels
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Countdown } from 'asterui'
// @example-imports: { useState } from 'react'
export function BoxedDemo() {
  // @example-include
  const [target] = useState(() => Date.now() + 24 * 60 * 60 * 1000)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Countdown
        value={target}
        format="DD:HH:MM:SS"
        showLabels
        boxed
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Countdown, notification } from 'asterui'
// @example-imports: { useState } from 'react'
export function CallbackDemo() {
  // @example-include
  const [target, setTarget] = useState(() => Date.now() + 20 * 1000)

  const handleFinish = () => {
    notification.success({ message: 'Countdown finished!' })
    setTarget(Date.now() + 20 * 1000) // Restart
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Countdown
        key={target}
        value={target}
        format="MM:SS"
        onFinish={handleFinish}
      />
      {/* @example-return-end */}
    </Demo>
  )
}
