import { useState } from 'react'
import { Mention, Space } from 'asterui'
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

export function BasicDemo() {
  const [text, setText] = useState('')

  return (
    <Demo>
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
    </Demo>
  )
}

export function CustomPrefixDemo() {
  const [text, setText] = useState('')

  return (
    <Demo>
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
    </Demo>
  )
}

export function MultiTriggerDemo() {
  const [userText, setUserText] = useState('')
  const [tagText, setTagText] = useState('')

  return (
    <Demo>
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
    </Demo>
  )
}
