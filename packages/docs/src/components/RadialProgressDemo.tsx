import { RadialProgress } from 'asterui'
import { CheckIcon } from '@aster-ui/icons'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <RadialProgress value={70} />
    </Demo>
  )
}

export function ValuesDemo() {
  return (
    <Demo>
      <div className="flex gap-4 flex-wrap">
        <RadialProgress value={0} />
        <RadialProgress value={25} />
        <RadialProgress value={50} />
        <RadialProgress value={75} />
        <RadialProgress value={100} />
      </div>
    </Demo>
  )
}

export function ColorsDemo() {
  return (
    <Demo>
      <div className="flex gap-4 flex-wrap">
        <RadialProgress value={70} color="primary" />
        <RadialProgress value={70} color="secondary" />
        <RadialProgress value={70} color="accent" />
        <RadialProgress value={70} color="success" />
        <RadialProgress value={70} color="warning" />
        <RadialProgress value={70} color="error" />
        <RadialProgress value={70} color="info" />
      </div>
    </Demo>
  )
}

export function SizesDemo() {
  return (
    <Demo>
      <div className="flex gap-4 items-center flex-wrap">
        <RadialProgress value={70} size={3} />
        <RadialProgress value={70} size={5} />
        <RadialProgress value={70} size={8} />
        <RadialProgress value={70} size={12} />
      </div>
    </Demo>
  )
}

export function ThicknessDemo() {
  return (
    <Demo>
      <div className="flex gap-4 flex-wrap">
        <RadialProgress value={70} thickness={2} />
        <RadialProgress value={70} thickness={5} />
        <RadialProgress value={70} thickness={10} />
        <RadialProgress value={70} thickness={20} />
      </div>
    </Demo>
  )
}

export function CustomContentDemo() {
  return (
    <Demo>
      <div className="flex gap-4 flex-wrap">
        <RadialProgress value={85}>
          <div className="text-xs">85/100</div>
        </RadialProgress>
        <RadialProgress value={60}>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold">60</div>
            <div className="text-xs">days</div>
          </div>
        </RadialProgress>
        <RadialProgress value={100} color="success">
          <CheckIcon size={32} />
        </RadialProgress>
      </div>
    </Demo>
  )
}

export function NoValueDemo() {
  return (
    <Demo>
      <div className="flex gap-4 flex-wrap">
        <RadialProgress value={30} showValue={false} />
        <RadialProgress value={60} showValue={false} color="primary" />
        <RadialProgress value={90} showValue={false} color="success" />
      </div>
    </Demo>
  )
}

export function BackgroundDemo() {
  return (
    <Demo>
      <div className="flex gap-4 flex-wrap">
        <RadialProgress
          value={70}
          color="primary"
          className="bg-primary text-primary-content border-4 border-primary"
        />
        <RadialProgress
          value={50}
          color="secondary"
          className="bg-secondary text-secondary-content border-4 border-secondary"
        />
        <RadialProgress
          value={90}
          color="accent"
          className="bg-accent text-accent-content border-4 border-accent"
        />
      </div>
    </Demo>
  )
}
