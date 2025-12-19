import { Progress } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Progress } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Progress value={70} className="w-56" />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Progress } from 'asterui'
export function ColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="space-y-4">
        <Progress value={20} className="w-56" />
        <Progress type="primary" value={40} className="w-56" />
        <Progress type="secondary" value={60} className="w-56" />
        <Progress type="accent" value={80} className="w-56" />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Progress } from 'asterui'
export function StatusDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="space-y-4">
        <Progress type="info" value={40} className="w-56" />
        <Progress type="success" value={60} className="w-56" />
        <Progress type="warning" value={80} className="w-56" />
        <Progress type="error" value={100} className="w-56" />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Progress } from 'asterui'
export function IndeterminateDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Progress className="w-56" />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Progress } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="space-y-4">
        <Progress type="primary" value={70} className="w-32" />
        <Progress type="primary" value={70} className="w-56" />
        <Progress type="primary" value={70} className="w-full" />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Progress } from 'asterui'
export function LabelDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Uploading...</span>
          <span>75%</span>
        </div>
        <Progress type="primary" value={75} className="w-full" />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}
