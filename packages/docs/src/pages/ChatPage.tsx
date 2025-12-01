import { Chat, Space } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const chatApi: ApiProperty[] = [
  {
    property: 'message',
    description: 'Message content',
    type: 'React.ReactNode',
  },
  {
    property: 'position',
    description: 'Chat bubble position',
    type: "'start' | 'end'",
    default: "'start'",
  },
  {
    property: 'avatar',
    description: 'Avatar image URL',
    type: 'string',
  },
  {
    property: 'avatarAlt',
    description: 'Avatar alt text',
    type: 'string',
  },
  {
    property: 'header',
    description: 'Header content (name, timestamp)',
    type: 'React.ReactNode',
  },
  {
    property: 'footer',
    description: 'Footer content (delivery status)',
    type: 'React.ReactNode',
  },
  {
    property: 'color',
    description: 'Bubble color',
    type: "'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'",
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function ChatPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Chat</h1>
        <p className="text-base-content/70">
          Display conversation messages with avatars, headers, and footers.
        </p>
      </div>

      <div className="columns-1 md:columns-2 gap-x-4">
        <ExampleSection
          title="Basic"
          description="Simple chat bubbles with start and end positions."
          code={`import React from 'react'
import { Chat, Space } from '@edadma/bloomui'

const App: React.FC = () => (
  <Space className="w-96">
    <Chat position="start" message="Hello! How are you?" />
    <Chat position="end" message="I'm doing great, thanks!" />
  </Space>
)

export default App`}
          noColumnBreak
        >
          <Space className="w-96">
            <Chat position="start" message="Hello! How are you?" />
            <Chat position="end" message="I'm doing great, thanks!" />
          </Space>
        </ExampleSection>

        <ExampleSection
          title="With Avatar"
          description="Add profile pictures using the avatar prop."
          code={`import React from 'react'
import { Chat, Space } from '@edadma/bloomui'

const App: React.FC = () => (
  <Space className="w-96">
    <Chat
      position="start"
      message="Hello! How are you?"
      avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    />
    <Chat
      position="end"
      message="I'm doing great, thanks!"
      avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    />
  </Space>
)

export default App`}
          noColumnBreak
        >
          <Space className="w-96">
            <Chat
              position="start"
              message="Hello! How are you?"
              avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
            <Chat
              position="end"
              message="I'm doing great, thanks!"
              avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </Space>
        </ExampleSection>

        <ExampleSection
          title="With Header"
          description="Add sender name and timestamp."
          code={`import React from 'react'
import { Chat, Space } from '@edadma/bloomui'

const App: React.FC = () => (
  <Space className="w-96">
    <Chat
      position="start"
      message="You were the Chosen One!"
      avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      header={<>Obi-Wan Kenobi <time className="text-xs opacity-50">12:45</time></>}
    />
    <Chat
      position="end"
      message="I hate you!"
      avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      header={<>Anakin <time className="text-xs opacity-50">12:46</time></>}
    />
  </Space>
)

export default App`}
          noColumnBreak
        >
          <Space className="w-96">
            <Chat
              position="start"
              message="You were the Chosen One!"
              avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              header={<>Obi-Wan Kenobi <time className="text-xs opacity-50">12:45</time></>}
            />
            <Chat
              position="end"
              message="I hate you!"
              avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              header={<>Anakin <time className="text-xs opacity-50">12:46</time></>}
            />
          </Space>
        </ExampleSection>

        <ExampleSection
          title="With Footer"
          description="Add delivery status or metadata below the bubble."
          code={`import React from 'react'
import { Chat, Space } from '@edadma/bloomui'

const App: React.FC = () => (
  <Space className="w-96">
    <Chat
      position="start"
      message="You were the Chosen One!"
      avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      header="Obi-Wan Kenobi"
      footer={<span className="opacity-50">Delivered</span>}
    />
    <Chat
      position="end"
      message="I hate you!"
      avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      header="Anakin"
      footer={<span className="opacity-50">Seen at 12:46</span>}
    />
  </Space>
)

export default App`}
          noColumnBreak
        >
          <Space className="w-96">
            <Chat
              position="start"
              message="You were the Chosen One!"
              avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              header="Obi-Wan Kenobi"
              footer={<span className="opacity-50">Delivered</span>}
            />
            <Chat
              position="end"
              message="I hate you!"
              avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              header="Anakin"
              footer={<span className="opacity-50">Seen at 12:46</span>}
            />
          </Space>
        </ExampleSection>

        <ExampleSection
          title="Colored Bubbles"
          description="Use color prop for different bubble colors."
          code={`import React from 'react'
import { Chat, Space } from '@edadma/bloomui'

const App: React.FC = () => (
  <Space className="w-96">
    <Chat position="start" message="Primary message" color="primary" />
    <Chat position="start" message="Secondary message" color="secondary" />
    <Chat position="start" message="Accent message" color="accent" />
    <Chat position="start" message="Info message" color="info" />
    <Chat position="start" message="Success message" color="success" />
    <Chat position="start" message="Warning message" color="warning" />
    <Chat position="start" message="Error message" color="error" />
  </Space>
)

export default App`}
          noColumnBreak
        >
          <Space className="w-96">
            <Chat position="start" message="Primary message" color="primary" />
            <Chat position="start" message="Secondary message" color="secondary" />
            <Chat position="start" message="Accent message" color="accent" />
            <Chat position="start" message="Info message" color="info" />
            <Chat position="start" message="Success message" color="success" />
            <Chat position="start" message="Warning message" color="warning" />
            <Chat position="start" message="Error message" color="error" />
          </Space>
        </ExampleSection>

        <ExampleSection
          title="Complete Conversation"
          description="A realistic chat conversation with all features."
          code={`import React from 'react'
import { Chat, Space } from '@edadma/bloomui'

const App: React.FC = () => (
  <Space className="w-96">
    <Chat
      position="start"
      message="Hey! Are you coming to the meeting?"
      avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      header={<>Alice <time className="text-xs opacity-50">2 hours ago</time></>}
      footer={<span className="opacity-50">Delivered</span>}
    />
    <Chat
      position="end"
      message="Yes, I'll be there in 10 minutes!"
      avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      header={<>You <time className="text-xs opacity-50">2 hours ago</time></>}
      footer={<span className="opacity-50">Seen</span>}
      color="primary"
    />
    <Chat
      position="start"
      message="Perfect! See you soon 👍"
      avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      header={<>Alice <time className="text-xs opacity-50">2 hours ago</time></>}
    />
  </Space>
)

export default App`}
          noColumnBreak
        >
          <Space className="w-96">
            <Chat
              position="start"
              message="Hey! Are you coming to the meeting?"
              avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              header={<>Alice <time className="text-xs opacity-50">2 hours ago</time></>}
              footer={<span className="opacity-50">Delivered</span>}
            />
            <Chat
              position="end"
              message="Yes, I'll be there in 10 minutes!"
              avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              header={<>You <time className="text-xs opacity-50">2 hours ago</time></>}
              footer={<span className="opacity-50">Seen</span>}
              color="primary"
            />
            <Chat
              position="start"
              message="Perfect! See you soon 👍"
              avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              header={<>Alice <time className="text-xs opacity-50">2 hours ago</time></>}
            />
          </Space>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Chat" data={chatApi} />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Use position="start" for messages from others (left-aligned)</li>
              <li>Use position="end" for messages from the current user (right-aligned)</li>
              <li>header and footer props are optional</li>
              <li>Add timestamps in the header for better context</li>
              <li>Use color prop to differentiate message types or importance</li>
              <li>Avatar is automatically formatted as circular</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
