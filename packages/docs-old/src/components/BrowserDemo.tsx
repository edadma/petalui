import { Browser } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Browser } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Browser url="https://daisyui.com" className="w-full">
        <div className="grid place-content-center h-40 bg-base-200">
          Hello!
        </div>
      </Browser>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Browser } from 'asterui'
export function PreviewDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Browser url="https://mysite.com" className="w-full">
        <div className="bg-base-100">
          <div className="bg-primary text-primary-content p-4">
            <span className="font-bold">MySite</span>
          </div>
          <div className="p-4 h-32">
            <h2 className="text-xl font-bold">Welcome</h2>
            <p className="text-base-content/70">Content here...</p>
          </div>
        </div>
      </Browser>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Browser } from 'asterui'
export function GradientDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Browser url="https://app.example.com" className="w-full">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 h-48 grid place-content-center">
          <span className="text-white text-2xl font-bold">Gradient</span>
        </div>
      </Browser>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Browser } from 'asterui'
export function DashboardDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Browser url="https://dashboard.example.com" className="w-full">
        <div className="bg-base-100 p-4 h-56">
          <div className="flex gap-4 mb-4">
            <div className="bg-primary/10 rounded-lg p-3 flex-1">
              <div className="text-xs text-base-content/60">Users</div>
              <div className="text-xl font-bold">1,234</div>
            </div>
            <div className="bg-secondary/10 rounded-lg p-3 flex-1">
              <div className="text-xs text-base-content/60">Revenue</div>
              <div className="text-xl font-bold">$5,678</div>
            </div>
          </div>
          <div className="bg-base-200 rounded-lg h-24"></div>
        </div>
      </Browser>
      {/* @example-return-end */}
    </Demo>
  )
}
