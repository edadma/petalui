import { useState } from 'react'
import { Mention, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

const users = [
  { value: 'john', label: 'John Doe' },
  { value: 'jane', label: 'Jane Smith' },
  { value: 'bob', label: 'Bob Johnson' },
  { value: 'alice', label: 'Alice Williams' },
]

const tags = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'webdev', label: 'Web Development' },
]

// @example-imports: { Mention } from 'asterui'
// @example-imports: { useState } from 'react'
export function BasicDemo() {
  // @example-include
  const users = [
    { value: 'john', label: 'John Doe' },
    { value: 'jane', label: 'Jane Smith' },
    { value: 'bob', label: 'Bob Johnson' },
    { value: 'alice', label: 'Alice Williams' },
  ]

  const [text, setText] = useState('')
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Mention
          options={users}
          value={text}
          onChange={setText}
          placeholder="Type @ to mention someone"
        />
        <div className="mt-2 text-sm text-base-content/70">
          Text: {text || '(empty)'}
        </div>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Mention } from 'asterui'
// @example-imports: { useState } from 'react'
export function CustomPrefixDemo() {
  // @example-include
  const tags = [
    { value: 'react', label: 'React' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'webdev', label: 'Web Development' },
  ]

  const [text, setText] = useState('')
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Mention
          options={tags}
          value={text}
          onChange={setText}
          prefix="#"
          placeholder="Type # to add hashtag"
        />
        <div className="mt-2 text-sm text-base-content/70">
          Text: {text || '(empty)'}
        </div>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Mention, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function MultiTriggerDemo() {
  // @example-include
  const users = [
    { value: 'john', label: 'John Doe' },
    { value: 'jane', label: 'Jane Smith' },
    { value: 'bob', label: 'Bob Johnson' },
    { value: 'alice', label: 'Alice Williams' },
  ]

  const tags = [
    { value: 'react', label: 'React' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'webdev', label: 'Web Development' },
  ]

  const [userText, setUserText] = useState('')
  const [tagText, setTagText] = useState('')
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="md">
        <div>
          <label className="block mb-2 text-sm font-medium">
            Mention Users (@)
          </label>
          <Mention
            options={users}
            value={userText}
            onChange={setUserText}
            prefix="@"
            placeholder="Type @ to mention users"
          />
          <div className="mt-1 text-xs text-base-content/70">
            {userText || '(empty)'}
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Add Tags (#)
          </label>
          <Mention
            options={tags}
            value={tagText}
            onChange={setTagText}
            prefix="#"
            placeholder="Type # to add tags"
          />
          <div className="mt-1 text-xs text-base-content/70">
            {tagText || '(empty)'}
          </div>
        </div>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}
