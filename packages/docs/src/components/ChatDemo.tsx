import { Chat } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <div>
        <Chat position="start" message="Hey! How are you?" />
        <Chat position="end" message="I'm doing great, thanks for asking!" />
      </div>
    </Demo>
  )
}

export function AvatarsDemo() {
  return (
    <Demo>
      <div>
        <Chat
          position="start"
          avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          avatarAlt="User"
          message="Hey! Did you see the new updates?"
        />
        <Chat
          position="end"
          avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          avatarAlt="Me"
          message="Yes! They look amazing!"
        />
      </div>
    </Demo>
  )
}

export function HeadersDemo() {
  return (
    <Demo>
      <div>
        <Chat
          position="start"
          avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          header={<span>Alice <time className="text-xs opacity-50">12:45</time></span>}
          message="Good morning! Ready for the meeting?"
        />
        <Chat
          position="end"
          avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          header={<span>Bob <time className="text-xs opacity-50">12:46</time></span>}
          message="Yes, joining now!"
        />
      </div>
    </Demo>
  )
}

export function ColorsDemo() {
  return (
    <Demo>
      <div>
        <Chat position="start" color="primary" message="Primary color message" />
        <Chat position="end" color="secondary" message="Secondary color message" />
        <Chat position="start" color="success" message="Success color message" />
        <Chat position="end" color="error" message="Error color message" />
      </div>
    </Demo>
  )
}

export function FooterDemo() {
  return (
    <Demo>
      <div>
        <Chat
          position="end"
          avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          footer={<span className="text-xs opacity-50">Delivered</span>}
          message="Did you get my message?"
        />
        <Chat
          position="end"
          avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          footer={<span className="text-xs opacity-50">Seen at 12:46</span>}
          message="Hello?"
        />
      </div>
    </Demo>
  )
}
