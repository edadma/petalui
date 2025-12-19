import { Chat } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Chat } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Chat position="start" message="Hey! How are you?" />
        <Chat position="end" message="I'm doing great, thanks for asking!" />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Chat } from 'asterui'
export function AvatarsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Chat
          position="start"
          avatar="/avatar-1.png"
          avatarAlt="User"
          message="Hey! Did you see the new updates?"
        />
        <Chat
          position="end"
          avatar="/avatar-1.png"
          avatarAlt="Me"
          message="Yes! They look amazing!"
        />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Chat } from 'asterui'
export function HeadersDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Chat
          position="start"
          avatar="/avatar-1.png"
          header={<span>Alice <time className="text-xs opacity-50">12:45</time></span>}
          message="Good morning! Ready for the meeting?"
        />
        <Chat
          position="end"
          avatar="/avatar-1.png"
          header={<span>Bob <time className="text-xs opacity-50">12:46</time></span>}
          message="Yes, joining now!"
        />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Chat } from 'asterui'
export function ColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Chat position="start" color="primary" message="Primary color message" />
        <Chat position="end" color="secondary" message="Secondary color message" />
        <Chat position="start" color="success" message="Success color message" />
        <Chat position="end" color="error" message="Error color message" />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Chat } from 'asterui'
export function FooterDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Chat
          position="end"
          avatar="/avatar-1.png"
          footer={<span className="text-xs opacity-50">Delivered</span>}
          message="Did you get my message?"
        />
        <Chat
          position="end"
          avatar="/avatar-1.png"
          footer={<span className="text-xs opacity-50">Seen at 12:46</span>}
          message="Hello?"
        />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}
