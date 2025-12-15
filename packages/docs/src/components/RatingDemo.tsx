import { useState } from 'react'
import { Rating, Space, Form, notification, Button } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <Rating defaultValue={3} />
    </Demo>
  )
}

export function ClearableDemo() {
  return (
    <Demo>
      <Rating defaultValue={3} allowClear />
    </Demo>
  )
}

export function SizesDemo() {
  return (
    <Demo>
      <Space direction="vertical" size="sm">
        <div className="flex items-center gap-4"><span className="w-8 text-xs opacity-70">xs</span><Rating size="xs" defaultValue={3} /></div>
        <div className="flex items-center gap-4"><span className="w-8 text-xs opacity-70">sm</span><Rating size="sm" defaultValue={3} /></div>
        <div className="flex items-center gap-4"><span className="w-8 text-xs opacity-70">md</span><Rating size="md" defaultValue={3} /></div>
        <div className="flex items-center gap-4"><span className="w-8 text-xs opacity-70">lg</span><Rating size="lg" defaultValue={3} /></div>
        <div className="flex items-center gap-4"><span className="w-8 text-xs opacity-70">xl</span><Rating size="xl" defaultValue={3} /></div>
      </Space>
    </Demo>
  )
}

export function HalfDemo() {
  return (
    <Demo>
      <Space direction="vertical" size="sm">
        <div className="flex items-center gap-4"><span className="w-8 text-xs opacity-70">md</span><Rating defaultValue={2.5} allowHalf /></div>
        <div className="flex items-center gap-4"><span className="w-8 text-xs opacity-70">lg</span><Rating defaultValue={2.5} allowHalf size="lg" /></div>
      </Space>
    </Demo>
  )
}

export function HeartDemo() {
  return (
    <Demo>
      <Rating defaultValue={4} mask="heart" color="bg-error" />
    </Demo>
  )
}

export function CustomColorsDemo() {
  return (
    <Demo>
      <Rating defaultValue={3}>
        <Rating.Item value={1} color="bg-error" />
        <Rating.Item value={2} color="bg-warning" />
        <Rating.Item value={3} color="bg-warning" />
        <Rating.Item value={4} color="bg-success" />
        <Rating.Item value={5} color="bg-success" />
      </Rating>
    </Demo>
  )
}

export function DisabledDemo() {
  return (
    <Demo>
      <Rating value={4} disabled />
    </Demo>
  )
}

export function CountDemo() {
  return (
    <Demo>
      <Rating defaultValue={7} count={10} />
    </Demo>
  )
}

export function ControlledDemo() {
  const [rating, setRating] = useState(0)

  return (
    <Demo>
      <div>
        <Rating value={rating} onChange={setRating} />
        <p className="mt-2">Current rating: {rating}</p>
      </div>
    </Demo>
  )
}

export function AltStarDemo() {
  return (
    <Demo>
      <Rating defaultValue={3} mask="star" color="bg-success" />
    </Demo>
  )
}

export function FormDemo() {
  const handleSubmit = (values: { rating?: number }) => {
    notification.success({ message: 'Submitted!', description: `Rating: ${values.rating}` })
  }

  return (
    <Demo>
      <Form onFinish={handleSubmit} initialValues={{ rating: 3 }}>
        <Form.Item
          name="rating"
          label="Your rating"
          rules={{ required: 'Please provide a rating' }}
        >
          <Rating />
        </Form.Item>
        <Button htmlType="submit" color="primary">Submit</Button>
      </Form>
    </Demo>
  )
}
