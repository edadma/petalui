import { List, Avatar, Button, Badge, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const listApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'List.Row components',
    type: 'React.ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const listRowApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Row content (by default, second child grows to fill space)',
    type: 'React.ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes (use list-col-grow, list-col-wrap modifiers)',
    type: 'string',
  },
]

export function ListPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">List</h1>
        <p className="text-base-content/70">
          Vertical layout for displaying organized rows of information.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic List"
          description="Simple list with rows."
          code={`import React from 'react'
import { List } from '@edadma/bloomui'

const App: React.FC = () => (
  <List className="bg-base-100 rounded-box shadow-md">
    <List.Row>
      <span>Item 1</span>
      <span>Description 1</span>
    </List.Row>
    <List.Row>
      <span>Item 2</span>
      <span>Description 2</span>
    </List.Row>
    <List.Row>
      <span>Item 3</span>
      <span>Description 3</span>
    </List.Row>
  </List>
)

export default App`}
        >
          <List className="bg-base-100 rounded-box shadow-md">
            <List.Row>
              <span>Item 1</span>
              <span>Description 1</span>
            </List.Row>
            <List.Row>
              <span>Item 2</span>
              <span>Description 2</span>
            </List.Row>
            <List.Row>
              <span>Item 3</span>
              <span>Description 3</span>
            </List.Row>
          </List>
        </ExampleSection>

        <ExampleSection
          title="With Icons and Actions"
          description="List with icons and action buttons."
          code={`import React from 'react'
import { List, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <List className="bg-base-100 rounded-box shadow-md">
    <List.Row>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div>
        <div className="font-bold">Task Completed</div>
        <div className="text-sm opacity-70">Successfully finished</div>
      </div>
      <Button size="sm">View</Button>
    </List.Row>
    <List.Row>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div>
        <div className="font-bold">In Progress</div>
        <div className="text-sm opacity-70">Working on it</div>
      </div>
      <Button size="sm">View</Button>
    </List.Row>
  </List>
)

export default App`}
        >
          <List className="bg-base-100 rounded-box shadow-md">
            <List.Row>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="font-bold">Task Completed</div>
                <div className="text-sm opacity-70">Successfully finished</div>
              </div>
              <Button size="sm">View</Button>
            </List.Row>
            <List.Row>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="font-bold">In Progress</div>
                <div className="text-sm opacity-70">Working on it</div>
              </div>
              <Button size="sm">View</Button>
            </List.Row>
          </List>
        </ExampleSection>

        <ExampleSection
          title="With Avatars"
          description="List with user avatars."
          code={`import React from 'react'
import { List, Avatar } from '@edadma/bloomui'

const App: React.FC = () => (
  <List className="bg-base-100 rounded-box shadow-md">
    <List.Row>
      <Avatar>
        <div className="w-10 rounded-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="Jane Smith"
          />
        </div>
      </Avatar>
      <div>
        <div className="font-bold">Jane Smith</div>
        <div className="text-sm opacity-70">jane@example.com</div>
      </div>
    </List.Row>
    <List.Row>
      <Avatar>
        <div className="w-10 rounded-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="John Doe"
          />
        </div>
      </Avatar>
      <div>
        <div className="font-bold">John Doe</div>
        <div className="text-sm opacity-70">john@example.com</div>
      </div>
    </List.Row>
  </List>
)

export default App`}
        >
          <List className="bg-base-100 rounded-box shadow-md">
            <List.Row>
              <Avatar>
                <div className="w-10 rounded-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="Jane Smith"
                  />
                </div>
              </Avatar>
              <div>
                <div className="font-bold">Jane Smith</div>
                <div className="text-sm opacity-70">jane@example.com</div>
              </div>
            </List.Row>
            <List.Row>
              <Avatar>
                <div className="w-10 rounded-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="John Doe"
                  />
                </div>
              </Avatar>
              <div>
                <div className="font-bold">John Doe</div>
                <div className="text-sm opacity-70">john@example.com</div>
              </div>
            </List.Row>
          </List>
        </ExampleSection>

        <ExampleSection
          title="With Badges"
          description="List rows with status badges."
          code={`import React from 'react'
import { List, Badge } from '@edadma/bloomui'

const App: React.FC = () => (
  <List className="bg-base-100 rounded-box shadow-md">
    <List.Row>
      <span>Project Alpha</span>
      <Badge type="success">Active</Badge>
    </List.Row>
    <List.Row>
      <span>Project Beta</span>
      <Badge type="warning">Pending</Badge>
    </List.Row>
    <List.Row>
      <span>Project Gamma</span>
      <Badge type="error">Inactive</Badge>
    </List.Row>
  </List>
)

export default App`}
        >
          <List className="bg-base-100 rounded-box shadow-md">
            <List.Row>
              <span>Project Alpha</span>
              <Badge type="success">Active</Badge>
            </List.Row>
            <List.Row>
              <span>Project Beta</span>
              <Badge type="warning">Pending</Badge>
            </List.Row>
            <List.Row>
              <span>Project Gamma</span>
              <Badge type="error">Inactive</Badge>
            </List.Row>
          </List>
        </ExampleSection>

        <ExampleSection
          title="Custom Growing Column"
          description="Use list-col-grow to control which column expands."
          code={`import React from 'react'
import { List } from '@edadma/bloomui'

const App: React.FC = () => (
  <List className="bg-base-100 rounded-box shadow-md">
    <List.Row>
      <span className="list-col-grow">Expanding first column</span>
      <span className="font-bold">Fixed</span>
    </List.Row>
    <List.Row>
      <span>Fixed</span>
      <span className="list-col-grow">Expanding third column</span>
      <span className="font-bold">Fixed</span>
    </List.Row>
  </List>
)

export default App`}
        >
          <List className="bg-base-100 rounded-box shadow-md">
            <List.Row>
              <span className="list-col-grow">Expanding first column</span>
              <span className="font-bold">Fixed</span>
            </List.Row>
            <List.Row>
              <span>Fixed</span>
              <span className="list-col-grow">Expanding third column</span>
              <span className="font-bold">Fixed</span>
            </List.Row>
          </List>
        </ExampleSection>

        <ExampleSection
          title="Wrapped Content"
          description="Use list-col-wrap to force content to next line."
          code={`import React from 'react'
import { List } from '@edadma/bloomui'

const App: React.FC = () => (
  <List className="bg-base-100 rounded-box shadow-md">
    <List.Row>
      <div>
        <div className="font-bold">Song Title</div>
        <div className="text-sm opacity-70 list-col-wrap">
          This is a longer description that wraps to the next line
        </div>
      </div>
      <button className="btn btn-ghost btn-xs">Play</button>
    </List.Row>
  </List>
)

export default App`}
        >
          <List className="bg-base-100 rounded-box shadow-md">
            <List.Row>
              <div>
                <div className="font-bold">Song Title</div>
                <div className="text-sm opacity-70 list-col-wrap">
                  This is a longer description that wraps to the next line
                </div>
              </div>
              <button className="btn btn-ghost btn-xs">Play</button>
            </List.Row>
          </List>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="List" data={listApi} />

        <ApiTable title="List.Row" data={listRowApi} className="mt-8" />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>By default, the second child of List.Row expands to fill available space</li>
              <li>Use list-col-grow class to make a different column expand instead</li>
              <li>Use list-col-wrap class to force content to wrap to the next line</li>
              <li>Combine with other components like Avatar, Badge, and Button for rich list items</li>
              <li>Apply bg-base-100, rounded-box, and shadow-md for styled containers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
