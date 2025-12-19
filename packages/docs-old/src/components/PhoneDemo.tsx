import { Phone, Button } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Phone } from 'asterui'
export function BasicPhoneDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Phone displayClassName="bg-base-100 grid place-content-center">
        <span className="text-xl">Hello World</span>
      </Phone>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Phone } from 'asterui'
export function ImagePhoneDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Phone>
        <img
          src="https://img.daisyui.com/images/stock/453966.webp"
          alt="wallpaper"
          className="w-full h-full object-cover"
        />
      </Phone>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Phone } from 'asterui'
export function ColorPhoneDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Phone color="#ff8938" displayClassName="bg-gradient-to-b from-orange-400 to-orange-600 grid place-content-center">
        <span className="text-white text-xl font-bold">Orange</span>
      </Phone>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Phone, Button } from 'asterui'
export function AppPhoneDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Phone displayClassName="bg-base-100 flex flex-col">
        <div className="bg-primary text-primary-content p-4">
          <h2 className="font-bold">My App</h2>
        </div>
        <div className="flex-1 p-4 space-y-3">
          <div className="bg-base-200 rounded-lg p-3 text-sm">Item 1</div>
          <div className="bg-base-200 rounded-lg p-3 text-sm">Item 2</div>
          <div className="bg-base-200 rounded-lg p-3 text-sm">Item 3</div>
        </div>
        <div className="p-4 border-t border-base-300">
          <Button color="primary" size="sm" className="w-full">Action</Button>
        </div>
      </Phone>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Phone } from 'asterui'
export function ChatPhoneDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Phone displayClassName="bg-base-200 flex flex-col">
        <div className="bg-base-100 p-3 border-b border-base-300 flex items-center gap-3">
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=jane" alt="" />
            </div>
          </div>
          <span className="font-medium text-sm">Jane</span>
        </div>
        <div className="flex-1 p-3 space-y-2 overflow-auto">
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-primary text-xs">Hey! How are you?</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble text-xs">Hi there! I'm good!</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-primary text-xs">Great to hear!</div>
          </div>
        </div>
      </Phone>
      {/* @example-return-end */}
    </Demo>
  )
}
