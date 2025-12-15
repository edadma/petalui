import { Empty, Button } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <Empty />
    </Demo>
  )
}

export function CustomDescriptionDemo() {
  return (
    <Demo>
      <Empty description="No data available" />
    </Demo>
  )
}

export function CustomImageDemo() {
  return (
    <Demo>
      <Empty
        image={
          <svg className="w-16 h-16 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        }
        description="No files found"
      />
    </Demo>
  )
}

export function WithActionDemo() {
  return (
    <Demo>
      <Empty description="No items in your cart">
        <Button color="primary">Start Shopping</Button>
      </Empty>
    </Demo>
  )
}

export function SimpleImageDemo() {
  return (
    <Demo>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="No results"
      />
    </Demo>
  )
}
