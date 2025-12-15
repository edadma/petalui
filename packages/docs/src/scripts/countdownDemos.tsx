import React from 'react'
import { createRoot } from 'react-dom/client'
import { Countdown, Space, notification } from 'asterui'

const BasicDemo = () => {
  const target = Date.now() + 60 * 60 * 1000
  return <Countdown value={target} />
}

const WithDaysDemo = () => {
  const target = Date.now() + 3 * 24 * 60 * 60 * 1000
  return <Countdown value={target} format="DD:HH:MM:SS" />
}

const SizesDemo = () => {
  const target = Date.now() + 60 * 60 * 1000

  return (
    <Space direction="vertical" size="lg">
      <Countdown value={target} size="xs" />
      <Countdown value={target} size="sm" />
      <Countdown value={target} size="md" />
      <Countdown value={target} size="lg" />
    </Space>
  )
}

const WithLabelsDemo = () => {
  const target = Date.now() + 2 * 24 * 60 * 60 * 1000
  return (
    <Countdown
      value={target}
      format="DD:HH:MM:SS"
      showLabels
    />
  )
}

const BoxedDemo = () => {
  const target = Date.now() + 24 * 60 * 60 * 1000
  return (
    <Countdown
      value={target}
      format="DD:HH:MM:SS"
      showLabels
      boxed
    />
  )
}

const CallbackDemo = () => {
  const [target, setTarget] = React.useState(() => Date.now() + 20 * 1000)

  const handleFinish = () => {
    notification.success({ message: 'Countdown finished!' })
    setTarget(Date.now() + 20 * 1000) // Restart
  }

  return (
    <Countdown
      key={target}
      value={target}
      format="MM:SS"
      onFinish={handleFinish}
    />
  )
}

const demos: Record<string, React.FC> = {
  basic: BasicDemo,
  'with-days': WithDaysDemo,
  sizes: SizesDemo,
  'with-labels': WithLabelsDemo,
  boxed: BoxedDemo,
  callback: CallbackDemo,
}

document.querySelectorAll('.countdown-demo').forEach((container) => {
  const exampleId = container.getAttribute('data-example')
  if (exampleId && demos[exampleId]) {
    const Demo = demos[exampleId]
    createRoot(container).render(<Demo />)
  }
})
