import { useState } from 'react'
import { Rating, Space, Form, notification, Button } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Rating } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Rating defaultValue={3} />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Rating } from 'asterui'
export function ClearableDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Rating defaultValue={3} allowClear />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Rating, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <div className="flex items-center gap-4"><span className="w-8 text-xs opacity-70">xs</span><Rating size="xs" defaultValue={3} /></div>
        <div className="flex items-center gap-4"><span className="w-8 text-xs opacity-70">sm</span><Rating size="sm" defaultValue={3} /></div>
        <div className="flex items-center gap-4"><span className="w-8 text-xs opacity-70">md</span><Rating size="md" defaultValue={3} /></div>
        <div className="flex items-center gap-4"><span className="w-8 text-xs opacity-70">lg</span><Rating size="lg" defaultValue={3} /></div>
        <div className="flex items-center gap-4"><span className="w-8 text-xs opacity-70">xl</span><Rating size="xl" defaultValue={3} /></div>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Rating, Space } from 'asterui'
export function HalfDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <div className="flex items-center gap-4"><span className="w-8 text-xs opacity-70">md</span><Rating defaultValue={2.5} allowHalf /></div>
        <div className="flex items-center gap-4"><span className="w-8 text-xs opacity-70">lg</span><Rating defaultValue={2.5} allowHalf size="lg" /></div>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Rating } from 'asterui'
export function HeartDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Rating defaultValue={4} mask="heart" color="bg-error" />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Rating } from 'asterui'
export function CustomColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Rating defaultValue={3}>
        <Rating.Item value={1} color="bg-error" />
        <Rating.Item value={2} color="bg-warning" />
        <Rating.Item value={3} color="bg-warning" />
        <Rating.Item value={4} color="bg-success" />
        <Rating.Item value={5} color="bg-success" />
      </Rating>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Rating } from 'asterui'
export function DisabledDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Rating value={4} disabled />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Rating } from 'asterui'
export function CountDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Rating defaultValue={7} count={10} />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Rating } from 'asterui'
// @example-imports: { useState } from 'react'
export function ControlledDemo() {
  // @example-include
  const [rating, setRating] = useState(0)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Rating value={rating} onChange={setRating} />
        <p className="mt-2">Current rating: {rating}</p>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Rating } from 'asterui'
export function AltStarDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Rating defaultValue={3} mask="star" color="bg-success" />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Rating, Form, notification, Button } from 'asterui'
export function FormDemo() {
  // @example-include
  const handleSubmit = (values: { rating?: number }) => {
    notification.success({ message: 'Submitted!', description: `Rating: ${values.rating}` })
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}
