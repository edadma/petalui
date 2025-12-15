import { Progress } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <Progress value={70} className="w-56" />
    </Demo>
  )
}

export function ColorsDemo() {
  return (
    <Demo>
      <div className="space-y-4">
        <Progress value={20} className="w-56" />
        <Progress type="primary" value={40} className="w-56" />
        <Progress type="secondary" value={60} className="w-56" />
        <Progress type="accent" value={80} className="w-56" />
      </div>
    </Demo>
  )
}

export function StatusDemo() {
  return (
    <Demo>
      <div className="space-y-4">
        <Progress type="info" value={40} className="w-56" />
        <Progress type="success" value={60} className="w-56" />
        <Progress type="warning" value={80} className="w-56" />
        <Progress type="error" value={100} className="w-56" />
      </div>
    </Demo>
  )
}

export function IndeterminateDemo() {
  return (
    <Demo>
      <Progress className="w-56" />
    </Demo>
  )
}

export function SizesDemo() {
  return (
    <Demo>
      <div className="space-y-4">
        <Progress type="primary" value={70} className="w-32" />
        <Progress type="primary" value={70} className="w-56" />
        <Progress type="primary" value={70} className="w-full" />
      </div>
    </Demo>
  )
}

export function LabelDemo() {
  return (
    <Demo>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Uploading...</span>
          <span>75%</span>
        </div>
        <Progress type="primary" value={75} className="w-full" />
      </div>
    </Demo>
  )
}
