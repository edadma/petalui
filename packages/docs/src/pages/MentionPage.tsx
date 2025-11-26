import { useState } from 'react'
import { Mention, Masonry } from '@edadma/petalui'
import type { MentionOption } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const mentionApi: ApiProperty[] = [
  {
    property: 'value',
    description: 'Controlled input value',
    type: 'string',
  },
  {
    property: 'defaultValue',
    description: 'Default input value',
    type: 'string',
    default: "''",
  },
  {
    property: 'onChange',
    description: 'Callback when value changes',
    type: '(value: string) => void',
  },
  {
    property: 'onSelect',
    description: 'Callback when an option is selected',
    type: '(option: MentionOption, prefix: string) => void',
  },
  {
    property: 'onSearch',
    description: 'Callback when searching (for async loading)',
    type: '(text: string, prefix: string) => void',
  },
  {
    property: 'options',
    description: 'Suggestion options',
    type: 'MentionOption[]',
    default: '[]',
  },
  {
    property: 'loading',
    description: 'Show loading spinner in dropdown',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'prefix',
    description: 'Trigger character(s) for mentions',
    type: "string | string[]",
    default: "'@'",
  },
  {
    property: 'split',
    description: 'Character to insert after mention',
    type: 'string',
    default: "' '",
  },
  {
    property: 'placeholder',
    description: 'Placeholder text',
    type: 'string',
  },
  {
    property: 'disabled',
    description: 'Disable the input',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'readOnly',
    description: 'Make input read-only',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'rows',
    description: 'Number of visible text rows',
    type: 'number',
    default: '3',
  },
  {
    property: 'autoSize',
    description: 'Auto-adjust height based on content',
    type: 'boolean | { minRows?: number; maxRows?: number }',
    default: 'false',
  },
  {
    property: 'notFoundContent',
    description: 'Content when no options match',
    type: 'React.ReactNode',
    default: "'No matches found'",
  },
  {
    property: 'filterOption',
    description: 'Filter options locally (false for async)',
    type: 'boolean | ((input: string, option: MentionOption) => boolean)',
    default: 'true',
  },
  {
    property: 'className',
    description: 'Additional CSS classes for container',
    type: 'string',
  },
  {
    property: 'dropdownClassName',
    description: 'Additional CSS classes for dropdown',
    type: 'string',
  },
]

const optionApi: ApiProperty[] = [
  {
    property: 'value',
    description: 'Option value (inserted into text)',
    type: 'string',
  },
  {
    property: 'label',
    description: 'Display label (defaults to value)',
    type: 'string',
  },
  {
    property: 'avatar',
    description: 'Avatar image URL',
    type: 'string',
  },
  {
    property: 'disabled',
    description: 'Disable this option',
    type: 'boolean',
  },
]

const users: MentionOption[] = [
  { value: 'john', label: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john' },
  { value: 'jane', label: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane' },
  { value: 'bob', label: 'Bob Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob' },
  { value: 'alice', label: 'Alice Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice' },
  { value: 'charlie', label: 'Charlie Davis', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie' },
]

const tags: MentionOption[] = [
  { value: 'bug', label: 'bug' },
  { value: 'feature', label: 'feature' },
  { value: 'enhancement', label: 'enhancement' },
  { value: 'documentation', label: 'documentation' },
  { value: 'help-wanted', label: 'help-wanted' },
]

export function MentionPage() {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [asyncOptions, setAsyncOptions] = useState<MentionOption[]>([])
  const [loading, setLoading] = useState(false)

  const handleAsyncSearch = (text: string) => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const filtered = users.filter((u) =>
        u.label?.toLowerCase().includes(text.toLowerCase())
      )
      setAsyncOptions(filtered)
      setLoading(false)
    }, 500)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Mention</h1>
        <p className="text-base-content/70">
          Input field with @mention support for tagging users, topics, or other entities.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Mention"
          description="Type @ to trigger the mention dropdown."
          code={`import React from 'react'
import { Mention } from '@edadma/petalui'

const users = [
  { value: 'john', label: 'John Doe' },
  { value: 'jane', label: 'Jane Smith' },
  { value: 'bob', label: 'Bob Wilson' },
]

const App: React.FC = () => (
  <Mention
    options={users}
    placeholder="Type @ to mention someone..."
  />
)

export default App`}
        >
          <Mention
            options={users}
            placeholder="Type @ to mention someone..."
          />
        </ExampleSection>

        <ExampleSection
          title="With Avatars"
          description="Options can include avatar images."
          code={`import React from 'react'
import { Mention } from '@edadma/petalui'

const users = [
  { value: 'john', label: 'John Doe', avatar: 'https://...' },
  { value: 'jane', label: 'Jane Smith', avatar: 'https://...' },
]

const App: React.FC = () => (
  <Mention
    options={users}
    placeholder="Mention a team member..."
  />
)

export default App`}
        >
          <Mention
            options={users}
            placeholder="Mention a team member..."
          />
        </ExampleSection>

        <ExampleSection
          title="Controlled Value"
          description="Control the input value externally."
          code={`import React, { useState } from 'react'
import { Mention } from '@edadma/petalui'

const App: React.FC = () => {
  const [value, setValue] = useState('')

  return (
    <div>
      <Mention
        value={value}
        onChange={setValue}
        options={users}
        placeholder="Type your message..."
      />
      <p className="mt-2 text-sm">
        Value: {value || '(empty)'}
      </p>
    </div>
  )
}

export default App`}
        >
          <div>
            <Mention
              value={value1}
              onChange={setValue1}
              options={users}
              placeholder="Type your message..."
            />
            <p className="mt-2 text-sm text-base-content/70">
              Value: {value1 || '(empty)'}
            </p>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Multiple Prefixes"
          description="Support different triggers for different types of mentions."
          code={`import React from 'react'
import { Mention } from '@edadma/petalui'

const users = [
  { value: 'john', label: 'John Doe' },
  { value: 'jane', label: 'Jane Smith' },
]

const tags = [
  { value: 'bug', label: 'bug' },
  { value: 'feature', label: 'feature' },
]

const App: React.FC = () => {
  const [options, setOptions] = useState([])

  const handleSearch = (text, prefix) => {
    if (prefix === '@') {
      setOptions(users)
    } else if (prefix === '#') {
      setOptions(tags)
    }
  }

  return (
    <Mention
      prefix={['@', '#']}
      options={options}
      onSearch={handleSearch}
      placeholder="Use @ for users, # for tags..."
    />
  )
}

export default App`}
        >
          <Mention
            prefix={['@', '#']}
            options={value2.includes('#') ? tags : users}
            onSearch={(_, prefix) => {
              setValue2(prefix)
            }}
            placeholder="Use @ for users, # for tags..."
          />
        </ExampleSection>

        <ExampleSection
          title="Async Loading"
          description="Load suggestions asynchronously from an API."
          code={`import React, { useState } from 'react'
import { Mention } from '@edadma/petalui'

const App: React.FC = () => {
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (text) => {
    setLoading(true)
    // Simulate API call
    const response = await fetch(\`/api/users?q=\${text}\`)
    const data = await response.json()
    setOptions(data)
    setLoading(false)
  }

  return (
    <Mention
      options={options}
      loading={loading}
      onSearch={handleSearch}
      filterOption={false}
      placeholder="Search for users..."
    />
  )
}

export default App`}
        >
          <Mention
            options={asyncOptions}
            loading={loading}
            onSearch={handleAsyncSearch}
            filterOption={false}
            placeholder="Search for users (async)..."
          />
        </ExampleSection>

        <ExampleSection
          title="Auto Size"
          description="Automatically adjust height based on content."
          code={`import React from 'react'
import { Mention } from '@edadma/petalui'

const App: React.FC = () => (
  <Mention
    options={users}
    autoSize={{ minRows: 2, maxRows: 6 }}
    placeholder="This input grows as you type..."
  />
)

export default App`}
        >
          <Mention
            options={users}
            autoSize={{ minRows: 2, maxRows: 6 }}
            placeholder="This input grows as you type..."
          />
        </ExampleSection>

        <ExampleSection
          title="Disabled Options"
          description="Individual options can be disabled."
          code={`import React from 'react'
import { Mention } from '@edadma/petalui'

const users = [
  { value: 'john', label: 'John Doe' },
  { value: 'jane', label: 'Jane Smith (unavailable)', disabled: true },
  { value: 'bob', label: 'Bob Wilson' },
]

const App: React.FC = () => (
  <Mention
    options={users}
    placeholder="Some users are unavailable..."
  />
)

export default App`}
        >
          <Mention
            options={[
              { value: 'john', label: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john' },
              { value: 'jane', label: 'Jane Smith (unavailable)', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane', disabled: true },
              { value: 'bob', label: 'Bob Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob' },
            ]}
            placeholder="Some users are unavailable..."
          />
        </ExampleSection>

        <ExampleSection
          title="Disabled Input"
          description="Disable the entire mention input."
          code={`import React from 'react'
import { Mention } from '@edadma/petalui'

const App: React.FC = () => (
  <Mention
    options={users}
    disabled
    defaultValue="Hey @john, check this out!"
  />
)

export default App`}
        >
          <Mention
            options={users}
            disabled
            defaultValue="Hey @john, check this out!"
          />
        </ExampleSection>

        <ExampleSection
          title="Custom Not Found"
          description="Customize the empty state message."
          code={`import React from 'react'
import { Mention } from '@edadma/petalui'

const App: React.FC = () => (
  <Mention
    options={[]}
    notFoundContent={
      <div className="text-center py-4">
        <span className="text-2xl">🔍</span>
        <p className="mt-2">No users found</p>
      </div>
    }
    placeholder="Type @ to search..."
  />
)

export default App`}
        >
          <Mention
            options={[]}
            notFoundContent={
              <div className="text-center py-4">
                <span className="text-2xl">🔍</span>
                <p className="mt-2">No users found</p>
              </div>
            }
            placeholder="Type @ to search..."
          />
        </ExampleSection>

        <ExampleSection
          title="Comment Box Example"
          description="Real-world example of a comment input."
          code={`import React, { useState } from 'react'
import { Mention } from '@edadma/petalui'

const App: React.FC = () => {
  const [comment, setComment] = useState('')

  return (
    <div className="border border-base-300 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=me" />
          </div>
        </div>
        <span className="font-medium">Add a comment</span>
      </div>
      <Mention
        value={comment}
        onChange={setComment}
        options={users}
        autoSize={{ minRows: 2, maxRows: 4 }}
        placeholder="Write a comment... Use @ to mention"
      />
      <div className="flex justify-end mt-3">
        <button className="btn btn-primary btn-sm">
          Post Comment
        </button>
      </div>
    </div>
  )
}

export default App`}
        >
          <div className="border border-base-300 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=me" alt="" />
                </div>
              </div>
              <span className="font-medium">Add a comment</span>
            </div>
            <Mention
              options={users}
              autoSize={{ minRows: 2, maxRows: 4 }}
              placeholder="Write a comment... Use @ to mention"
            />
            <div className="flex justify-end mt-3">
              <button className="btn btn-primary btn-sm">
                Post Comment
              </button>
            </div>
          </div>
        </ExampleSection>
      </Masonry>

      <div className="mt-12 space-y-8">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Mention" data={mentionApi} />
        <ApiTable title="MentionOption" data={optionApi} />
      </div>
    </div>
  )
}
