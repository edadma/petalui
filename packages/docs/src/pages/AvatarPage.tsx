import { Avatar, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const avatarApi: ApiProperty[] = [
  {
    property: 'src',
    description: 'Image source URL',
    type: 'string',
  },
  {
    property: 'alt',
    description: 'Image alt text',
    type: 'string',
    default: "'avatar'",
  },
  {
    property: 'icon',
    description: 'Icon element to display',
    type: 'React.ReactNode',
  },
  {
    property: 'children',
    description: 'Text content (e.g., initials) or custom content',
    type: 'React.ReactNode',
  },
  {
    property: 'size',
    description: 'Avatar size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
  },
  {
    property: 'shape',
    description: 'Avatar shape',
    type: "'circle' | 'square'",
    default: "'circle'",
  },
  {
    property: 'status',
    description: 'Presence status indicator',
    type: "'online' | 'offline'",
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
  {
    property: 'style',
    description: 'Inline styles',
    type: 'React.CSSProperties',
  },
]

const avatarGroupApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Multiple Avatar components',
    type: 'React.ReactNode',
  },
  {
    property: 'max',
    description: 'Maximum avatars to show before +N overflow',
    type: 'number',
  },
  {
    property: 'size',
    description: 'Size for all avatars in the group',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
  {
    property: 'style',
    description: 'Inline styles',
    type: 'React.CSSProperties',
  },
]

export function AvatarPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Avatar</h1>
        <p className="text-base-content/70">
          Display user profile images, initials, icons, or placeholder graphics with status indicators.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Avatar"
          description="Simple avatar with image using the src prop."
          code={`import React from 'react'
import { Avatar } from '@edadma/bloomui'

const App: React.FC = () => (
  <Avatar
    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    alt="User avatar"
  />
)

export default App`}
        >
          <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User avatar" />
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description="Control avatar size with the size prop."
          code={`import React from 'react'
import { Avatar } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-4 items-center">
    <Avatar
      size="xs"
      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    />
    <Avatar
      size="sm"
      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    />
    <Avatar
      size="md"
      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    />
    <Avatar
      size="lg"
      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    />
    <Avatar
      size="xl"
      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    />
  </div>
)

export default App`}
        >
          <div className="flex gap-4 items-center">
            <Avatar size="xs" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            <Avatar size="sm" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            <Avatar size="md" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            <Avatar size="lg" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            <Avatar size="xl" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Shapes"
          description="Circle or square avatars."
          code={`import React from 'react'
import { Avatar } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <Avatar
      shape="circle"
      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    />
    <Avatar
      shape="square"
      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    />
  </div>
)

export default App`}
        >
          <div className="flex gap-4">
            <Avatar shape="circle" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            <Avatar shape="square" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Status Indicators"
          description="Show online or offline presence."
          code={`import React from 'react'
import { Avatar } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <Avatar
      status="online"
      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    />
    <Avatar
      status="offline"
      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    />
  </div>
)

export default App`}
        >
          <div className="flex gap-4">
            <Avatar status="online" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            <Avatar status="offline" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Text Avatars"
          description="Display initials or text."
          code={`import React from 'react'
import { Avatar } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-4 items-center">
    <Avatar size="xl">
      <span className="text-3xl">AI</span>
    </Avatar>
    <Avatar size="lg">
      <span className="text-xl">JD</span>
    </Avatar>
    <Avatar size="md">
      <span>MX</span>
    </Avatar>
  </div>
)

export default App`}
        >
          <div className="flex gap-4 items-center">
            <Avatar size="xl">
              <span className="text-3xl">AI</span>
            </Avatar>
            <Avatar size="lg">
              <span className="text-xl">JD</span>
            </Avatar>
            <Avatar size="md">
              <span>MX</span>
            </Avatar>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Icon Avatars"
          description="Display icons instead of images."
          code={`import React from 'react'
import { Avatar } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <Avatar icon={
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    } />
    <Avatar size="lg" icon={
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    } />
  </div>
)

export default App`}
        >
          <div className="flex gap-4">
            <Avatar
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />
            <Avatar
              size="lg"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Avatar Group"
          description="Group multiple avatars with overlap."
          code={`import React from 'react'
import { Avatar } from '@edadma/bloomui'

const App: React.FC = () => (
  <Avatar.Group>
    <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </Avatar.Group>
)

export default App`}
        >
          <Avatar.Group>
            <Avatar size="sm" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            <Avatar size="sm" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            <Avatar size="sm" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            <Avatar size="sm" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </Avatar.Group>
        </ExampleSection>

        <ExampleSection
          title="Avatar Group with Max Count"
          description="Show overflow count when exceeding max."
          code={`import React from 'react'
import { Avatar } from '@edadma/bloomui'

const App: React.FC = () => (
  <Avatar.Group max={3}>
    <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </Avatar.Group>
)

export default App`}
        >
          <Avatar.Group max={3}>
            <Avatar size="sm" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            <Avatar size="sm" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            <Avatar size="sm" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            <Avatar size="sm" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            <Avatar size="sm" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            <Avatar size="sm" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </Avatar.Group>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Avatar" data={avatarApi} />

        <ApiTable title="Avatar.Group" data={avatarGroupApi} className="mt-8" />
      </div>
    </div>
  )
}
