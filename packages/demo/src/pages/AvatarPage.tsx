import { Avatar, AvatarGroup } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const avatarApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Avatar content (image or placeholder)',
    type: 'React.ReactNode',
  },
  {
    property: 'online',
    description: 'Show online indicator',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'offline',
    description: 'Show offline indicator',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'placeholder',
    description: 'Use placeholder mode (for text/initials)',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const avatarGroupApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Multiple Avatar components',
    type: 'React.ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function AvatarPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Avatar</h1>
        <p className="text-base-content/70">
          Display user profile images, initials, or placeholder graphics.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Avatar"
          description="Simple avatar with image."
          code={`import React from 'react'
import { Avatar } from '@edadma/petalui'

const App: React.FC = () => (
  <Avatar>
    <div className="w-24 rounded">
      <img
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        alt="Avatar"
      />
    </div>
  </Avatar>
)

export default App`}
        >
          <Avatar>
            <div className="w-24 rounded">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Avatar"
              />
            </div>
          </Avatar>
        </ExampleSection>

        <ExampleSection
          title="Different Sizes"
          description="Control size with width classes."
          code={`import React from 'react'
import { Avatar } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4 items-center">
    <Avatar>
      <div className="w-32 rounded">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </Avatar>
    <Avatar>
      <div className="w-24 rounded">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </Avatar>
    <Avatar>
      <div className="w-16 rounded">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </Avatar>
    <Avatar>
      <div className="w-12 rounded">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </Avatar>
  </div>
)

export default App`}
        >
          <div className="flex gap-4 items-center">
            <Avatar>
              <div className="w-32 rounded">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
              </div>
            </Avatar>
            <Avatar>
              <div className="w-24 rounded">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
              </div>
            </Avatar>
            <Avatar>
              <div className="w-16 rounded">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
              </div>
            </Avatar>
            <Avatar>
              <div className="w-12 rounded">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
              </div>
            </Avatar>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Rounded and Circular"
          description="Different corner styles."
          code={`import React from 'react'
import { Avatar } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <Avatar>
      <div className="w-24 rounded">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </Avatar>
    <Avatar>
      <div className="w-24 rounded-xl">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </Avatar>
    <Avatar>
      <div className="w-24 rounded-full">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </Avatar>
  </div>
)

export default App`}
        >
          <div className="flex gap-4">
            <Avatar>
              <div className="w-24 rounded">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
              </div>
            </Avatar>
            <Avatar>
              <div className="w-24 rounded-xl">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
              </div>
            </Avatar>
            <Avatar>
              <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
              </div>
            </Avatar>
          </div>
        </ExampleSection>

        <ExampleSection
          title="With Ring"
          description="Add ring styling around avatar."
          code={`import React from 'react'
import { Avatar } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <Avatar>
      <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </Avatar>
    <Avatar>
      <div className="w-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </Avatar>
  </div>
)

export default App`}
        >
          <div className="flex gap-4">
            <Avatar>
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
              </div>
            </Avatar>
            <Avatar>
              <div className="w-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
              </div>
            </Avatar>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Online/Offline Indicators"
          description="Show presence status."
          code={`import React from 'react'
import { Avatar } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <Avatar online>
      <div className="w-24 rounded-full">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </Avatar>
    <Avatar offline>
      <div className="w-24 rounded-full">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </Avatar>
  </div>
)

export default App`}
        >
          <div className="flex gap-4">
            <Avatar online>
              <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
              </div>
            </Avatar>
            <Avatar offline>
              <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
              </div>
            </Avatar>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Placeholder with Initials"
          description="Display text when no image available."
          code={`import React from 'react'
import { Avatar } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <Avatar placeholder>
      <div className="bg-neutral text-neutral-content w-24 rounded-full">
        <span className="text-3xl">AI</span>
      </div>
    </Avatar>
    <Avatar placeholder>
      <div className="bg-primary text-primary-content w-16 rounded-full">
        <span className="text-xl">JD</span>
      </div>
    </Avatar>
    <Avatar placeholder>
      <div className="bg-accent text-accent-content w-12 rounded-full">
        <span>MX</span>
      </div>
    </Avatar>
  </div>
)

export default App`}
        >
          <div className="flex gap-4">
            <Avatar placeholder>
              <div className="bg-neutral text-neutral-content w-24 rounded-full">
                <span className="text-3xl">AI</span>
              </div>
            </Avatar>
            <Avatar placeholder>
              <div className="bg-primary text-primary-content w-16 rounded-full">
                <span className="text-xl">JD</span>
              </div>
            </Avatar>
            <Avatar placeholder>
              <div className="bg-accent text-accent-content w-12 rounded-full">
                <span>MX</span>
              </div>
            </Avatar>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Avatar Group"
          description="Group multiple avatars with overlap."
          code={`import React from 'react'
import { Avatar, AvatarGroup } from '@edadma/petalui'

const App: React.FC = () => (
  <AvatarGroup>
    <Avatar>
      <div className="w-12">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </Avatar>
    <Avatar>
      <div className="w-12">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </Avatar>
    <Avatar>
      <div className="w-12">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </Avatar>
    <Avatar placeholder>
      <div className="bg-neutral text-neutral-content w-12">
        <span>+99</span>
      </div>
    </Avatar>
  </AvatarGroup>
)

export default App`}
        >
          <AvatarGroup>
            <Avatar>
              <div className="w-12">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
              </div>
            </Avatar>
            <Avatar>
              <div className="w-12">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
              </div>
            </Avatar>
            <Avatar>
              <div className="w-12">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
              </div>
            </Avatar>
            <Avatar placeholder>
              <div className="bg-neutral text-neutral-content w-12">
                <span>+99</span>
              </div>
            </Avatar>
          </AvatarGroup>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Avatar" data={avatarApi} />

        <ApiTable title="AvatarGroup" data={avatarGroupApi} className="mt-8" />
      </div>
    </div>
  )
}
