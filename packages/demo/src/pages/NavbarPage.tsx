import { Navbar, Button, Dropdown, Badge } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const navbarApi: ApiProperty[] = [
  {
    property: 'start',
    description: 'Content for left section (navbar-start)',
    type: 'React.ReactNode',
  },
  {
    property: 'center',
    description: 'Content for center section (navbar-center)',
    type: 'React.ReactNode',
  },
  {
    property: 'end',
    description: 'Content for right section (navbar-end)',
    type: 'React.ReactNode',
  },
  {
    property: 'children',
    description: 'Custom content (overrides start/center/end)',
    type: 'React.ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function NavbarPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Navbar</h1>
        <p className="text-base-content/70">
          Navigation bar component with flexible layout sections.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Navbar"
          description="Simple navbar with title."
          code={`import React from 'react'
import { Navbar } from '@edadma/petalui'

const App: React.FC = () => (
  <Navbar start={<span className="text-xl font-bold">MyApp</span>} />
)

export default App`}
        >
          <Navbar start={<span className="text-xl font-bold">MyApp</span>} />
        </ExampleSection>

        <ExampleSection
          title="With Start, Center, End"
          description="Using all three sections."
          code={`import React from 'react'
import { Navbar, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Navbar
    start={<span className="text-xl font-bold">MyApp</span>}
    center={
      <div className="flex gap-2">
        <a className="btn btn-ghost">Home</a>
        <a className="btn btn-ghost">About</a>
        <a className="btn btn-ghost">Contact</a>
      </div>
    }
    end={<Button type="primary">Sign In</Button>}
  />
)

export default App`}
        >
          <Navbar
            start={<span className="text-xl font-bold">MyApp</span>}
            center={
              <div className="flex gap-2">
                <a className="btn btn-ghost">Home</a>
                <a className="btn btn-ghost">About</a>
                <a className="btn btn-ghost">Contact</a>
              </div>
            }
            end={<Button type="primary">Sign In</Button>}
          />
        </ExampleSection>

        <ExampleSection
          title="With Logo"
          description="Brand logo with navigation."
          code={`import React from 'react'
import { Navbar } from '@edadma/petalui'

const App: React.FC = () => (
  <Navbar
    start={
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold">
          L
        </div>
        <span className="text-xl font-bold">Logo</span>
      </div>
    }
    end={
      <div className="flex gap-2">
        <a className="btn btn-ghost">Features</a>
        <a className="btn btn-ghost">Pricing</a>
      </div>
    }
  />
)

export default App`}
        >
          <Navbar
            start={
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold">
                  L
                </div>
                <span className="text-xl font-bold">Logo</span>
              </div>
            }
            end={
              <div className="flex gap-2">
                <a className="btn btn-ghost">Features</a>
                <a className="btn btn-ghost">Pricing</a>
              </div>
            }
          />
        </ExampleSection>

        <ExampleSection
          title="With Dropdown Menu"
          description="Using dropdown for user menu."
          code={`import React from 'react'
import { Navbar, Dropdown } from '@edadma/petalui'

const App: React.FC = () => (
  <Navbar
    start={<span className="text-xl font-bold">Dashboard</span>}
    end={
      <Dropdown position="bottom" align="end">
        <Dropdown.Trigger>
          <div className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full bg-neutral text-neutral-content flex items-center justify-center">
              U
            </div>
          </div>
        </Dropdown.Trigger>
        <Dropdown.Menu className="w-52">
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    }
  />
)

export default App`}
        >
          <Navbar
            start={<span className="text-xl font-bold">Dashboard</span>}
            end={
              <Dropdown position="bottom" align="end">
                <Dropdown.Trigger>
                  <div className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full bg-neutral text-neutral-content flex items-center justify-center">
                      U
                    </div>
                  </div>
                </Dropdown.Trigger>
                <Dropdown.Menu className="w-52">
                  <Dropdown.Item>Profile</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            }
          />
        </ExampleSection>

        <ExampleSection
          title="With Icons and Badge"
          description="Notification badge and icons."
          code={`import React from 'react'
import { Navbar, Badge } from '@edadma/petalui'

const App: React.FC = () => (
  <Navbar
    start={<span className="text-xl font-bold">MyApp</span>}
    end={
      <div className="flex gap-2">
        <button className="btn btn-ghost btn-circle">
          <Badge count={5} type="error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </Badge>
        </button>
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    }
  />
)

export default App`}
        >
          <Navbar
            start={<span className="text-xl font-bold">MyApp</span>}
            end={
              <div className="flex gap-2">
                <button className="btn btn-ghost btn-circle">
                  <Badge count={5} type="error">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </Badge>
                </button>
                <button className="btn btn-ghost btn-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            }
          />
        </ExampleSection>

        <ExampleSection
          title="Colored Background"
          description="Different background colors."
          code={`import React from 'react'
import { Navbar, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-4">
    <Navbar
      className="bg-primary text-primary-content"
      start={<span className="text-xl font-bold">Primary</span>}
      end={<Button type="neutral">Action</Button>}
    />
    <Navbar
      className="bg-neutral text-neutral-content"
      start={<span className="text-xl font-bold">Neutral</span>}
      end={<Button type="primary">Action</Button>}
    />
    <Navbar
      className="bg-base-300"
      start={<span className="text-xl font-bold">Base-300</span>}
      end={<Button type="primary">Action</Button>}
    />
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-4">
            <Navbar
              className="bg-primary text-primary-content"
              start={<span className="text-xl font-bold">Primary</span>}
              end={<Button type="neutral">Action</Button>}
            />
            <Navbar
              className="bg-neutral text-neutral-content"
              start={<span className="text-xl font-bold">Neutral</span>}
              end={<Button type="primary">Action</Button>}
            />
            <Navbar
              className="bg-base-300"
              start={<span className="text-xl font-bold">Base-300</span>}
              end={<Button type="primary">Action</Button>}
            />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Custom Layout"
          description="Using children for custom structure."
          code={`import React from 'react'
import { Navbar, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Navbar>
    <div className="flex-1">
      <span className="text-xl font-bold">Custom</span>
    </div>
    <div className="flex-none gap-2">
      <a className="btn btn-ghost">Link 1</a>
      <a className="btn btn-ghost">Link 2</a>
      <Button type="primary">Action</Button>
    </div>
  </Navbar>
)

export default App`}
        >
          <Navbar>
            <div className="flex-1">
              <span className="text-xl font-bold">Custom</span>
            </div>
            <div className="flex-none gap-2">
              <a className="btn btn-ghost">Link 1</a>
              <a className="btn btn-ghost">Link 2</a>
              <Button type="primary">Action</Button>
            </div>
          </Navbar>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Navbar" data={navbarApi} />
      </div>
    </div>
  )
}
