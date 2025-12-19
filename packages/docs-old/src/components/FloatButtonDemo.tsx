import { FloatButton } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { FloatButton } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="relative h-32 bg-base-200 rounded-lg">
        <FloatButton
          icon={<span className="text-lg">+</span>}
          onClick={() => alert('Button clicked!')}
          className="!absolute !right-4 !bottom-4"
        />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { FloatButton } from 'asterui'
export function WithTooltipDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="relative h-32 bg-base-200 rounded-lg">
        <FloatButton
          icon={<span className="text-lg">+</span>}
          tooltip="Add new item"
          type="primary"
          onClick={() => alert('Add clicked!')}
          className="!absolute !right-4 !bottom-4"
        />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { FloatButton } from 'asterui'
export function TypesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="relative h-32 bg-base-200 rounded-lg">
        <FloatButton
          icon={<span className="text-lg">+</span>}
          type="default"
          className="!absolute !right-20 !bottom-4"
        />
        <FloatButton
          icon={<span className="text-lg">♥</span>}
          type="primary"
          className="!absolute !right-4 !bottom-4"
        />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { FloatButton } from 'asterui'
export function ShapesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="relative h-32 bg-base-200 rounded-lg">
        <FloatButton
          icon={<span className="text-lg">+</span>}
          shape="circle"
          className="!absolute !right-20 !bottom-4"
        />
        <FloatButton
          icon={<span className="text-lg">+</span>}
          shape="square"
          className="!absolute !right-4 !bottom-4"
        />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { FloatButton } from 'asterui'
export function WithBadgeDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="relative h-32 bg-base-200 rounded-lg">
        <FloatButton
          icon={<span className="text-lg">💬</span>}
          badge={5}
          onClick={() => alert('You have 5 unread messages')}
          className="!absolute !right-4 !bottom-4"
        />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { FloatButton } from 'asterui'
export function GroupDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="relative h-48 bg-base-200 rounded-lg">
        <FloatButton.Group
          icon={<span className="text-lg">+</span>}
          className="!absolute !right-4 !bottom-4"
        >
          <FloatButton
            icon={<span>?</span>}
            onClick={() => alert('Help section')}
          />
          <FloatButton
            icon={<span>💬</span>}
            onClick={() => alert('Contact support')}
          />
          <FloatButton
            icon={<span>↻</span>}
            onClick={() => alert('Refreshing...')}
          />
        </FloatButton.Group>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { FloatButton } from 'asterui'
export function BackTopDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="relative h-32 bg-base-200 rounded-lg flex items-center justify-center text-base-content/60">
        <p>BackTop button appears after scrolling down 400px</p>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}
