import { Tag, CheckableTag, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const tagApi: ApiProperty[] = [
  {
    property: 'closable',
    description: 'Show close icon and enable closing',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'closeIcon',
    description: 'Custom close icon element',
    type: 'ReactNode',
  },
  {
    property: 'onClose',
    description: 'Callback when tag is closed',
    type: '() => void',
  },
  {
    property: 'color',
    description: 'Tag color (preset or custom hex)',
    type: "'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error' | 'ghost' | string",
  },
  {
    property: 'icon',
    description: 'Icon element to display before text',
    type: 'ReactNode',
  },
  {
    property: 'size',
    description: 'Tag size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
  },
  {
    property: 'children',
    description: 'Tag content',
    type: 'ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const checkableTagApi: ApiProperty[] = [
  {
    property: 'checked',
    description: 'Whether tag is checked',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'onChange',
    description: 'Callback when checked state changes',
    type: '(checked: boolean) => void',
  },
  {
    property: 'icon',
    description: 'Icon element to display before text',
    type: 'ReactNode',
  },
  {
    property: 'children',
    description: 'Tag content',
    type: 'ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function TagPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Tag</h1>
        <p className="text-base-content/70">
          Labels for categorizing, marking, and organizing content.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Tags"
          description="Simple tags with preset colors."
          code={`import React from 'react'
import { Tag, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    <Tag>Default</Tag>
    <Tag color="primary">Primary</Tag>
    <Tag color="secondary">Secondary</Tag>
    <Tag color="accent">Accent</Tag>
    <Tag color="info">Info</Tag>
    <Tag color="success">Success</Tag>
    <Tag color="warning">Warning</Tag>
    <Tag color="error">Error</Tag>
  </div>
)

export default App`}
        >
          <div className="flex gap-2 flex-wrap">
            <Tag>Default</Tag>
            <Tag color="primary">Primary</Tag>
            <Tag color="secondary">Secondary</Tag>
            <Tag color="accent">Accent</Tag>
            <Tag color="info">Info</Tag>
            <Tag color="success">Success</Tag>
            <Tag color="warning">Warning</Tag>
            <Tag color="error">Error</Tag>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Closable Tags"
          description="Tags that can be closed by the user."
          code={`import React, { useState } from 'react'
import { Tag, Masonry } from '@edadma/bloomui'

const App: React.FC = () => {
  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3'])

  const handleClose = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <Tag
          key={tag}
          closable
          color="primary"
          onClose={() => handleClose(tag)}
        >
          {tag}
        </Tag>
      ))}
    </div>
  )
}

export default App`}
        >
          <div className="flex gap-2 flex-wrap">
            <Tag closable color="primary">
              Closable
            </Tag>
            <Tag closable color="success">
              Close Me
            </Tag>
            <Tag closable color="warning">
              Removable
            </Tag>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Tags with Icons"
          description="Add icons to tags for better visual communication."
          code={`import React from 'react'
import { Tag, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    <Tag
      color="primary"
      icon={
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
            clipRule="evenodd"
          />
        </svg>
      }
    >
      Document
    </Tag>
    <Tag
      color="success"
      icon={
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      }
    >
      Done
    </Tag>
    <Tag
      color="error"
      icon={
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      }
    >
      Failed
    </Tag>
  </div>
)

export default App`}
        >
          <div className="flex gap-2 flex-wrap">
            <Tag
              color="primary"
              icon={
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              Document
            </Tag>
            <Tag
              color="success"
              icon={
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              Done
            </Tag>
            <Tag
              color="error"
              icon={
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              Failed
            </Tag>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Tag Sizes"
          description="Four sizes available for tags."
          code={`import React from 'react'
import { Tag, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-2 items-center flex-wrap">
    <Tag color="primary" size="xs">
      Extra Small
    </Tag>
    <Tag color="primary" size="sm">
      Small
    </Tag>
    <Tag color="primary" size="md">
      Medium
    </Tag>
    <Tag color="primary" size="lg">
      Large
    </Tag>
  </div>
)

export default App`}
        >
          <div className="flex gap-2 items-center flex-wrap">
            <Tag color="primary" size="xs">
              Extra Small
            </Tag>
            <Tag color="primary" size="sm">
              Small
            </Tag>
            <Tag color="primary" size="md">
              Medium
            </Tag>
            <Tag color="primary" size="lg">
              Large
            </Tag>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Custom Colors"
          description="Use custom hex colors for unique styling."
          code={`import React from 'react'
import { Tag, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    <Tag color="#f50">Red</Tag>
    <Tag color="#2db7f5">Blue</Tag>
    <Tag color="#87d068">Green</Tag>
    <Tag color="#108ee9">Cyan</Tag>
    <Tag color="#f5222d">Crimson</Tag>
  </div>
)

export default App`}
        >
          <div className="flex gap-2 flex-wrap">
            <Tag color="#f50">Red</Tag>
            <Tag color="#2db7f5">Blue</Tag>
            <Tag color="#87d068">Green</Tag>
            <Tag color="#108ee9">Cyan</Tag>
            <Tag color="#f5222d">Crimson</Tag>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Checkable Tags"
          description="Tags that can be toggled on and off."
          code={`import React, { useState } from 'react'
import { CheckableTag, Masonry } from '@edadma/bloomui'

const App: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(['React'])

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag)
    setSelectedTags(nextSelectedTags)
  }

  const tags = ['React', 'Vue', 'Angular', 'Svelte']

  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <CheckableTag
          key={tag}
          checked={selectedTags.includes(tag)}
          onChange={(checked) => handleChange(tag, checked)}
        >
          {tag}
        </CheckableTag>
      ))}
    </div>
  )
}

export default App`}
        >
          <div className="flex gap-2 flex-wrap">
            <CheckableTag checked>React</CheckableTag>
            <CheckableTag>Vue</CheckableTag>
            <CheckableTag>Angular</CheckableTag>
            <CheckableTag>Svelte</CheckableTag>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Checkable Tags with Icons"
          description="Add icons to checkable tags."
          code={`import React, { useState } from 'react'
import { CheckableTag, Masonry } from '@edadma/bloomui'

const App: React.FC = () => {
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(true)
  const [checked3, setChecked3] = useState(false)

  return (
    <div className="flex gap-2 flex-wrap">
      <CheckableTag
        checked={checked1}
        onChange={setChecked1}
        icon={
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
        }
      >
        Education
      </CheckableTag>
      <CheckableTag
        checked={checked2}
        onChange={setChecked2}
        icon={
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
              clipRule="evenodd"
            />
          </svg>
        }
      >
        Finance
      </CheckableTag>
      <CheckableTag
        checked={checked3}
        onChange={setChecked3}
        icon={
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
              clipRule="evenodd"
            />
          </svg>
        }
      >
        Trending
      </CheckableTag>
    </div>
  )
}

export default App`}
        >
          <div className="flex gap-2 flex-wrap">
            <CheckableTag
              icon={
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              }
            >
              Education
            </CheckableTag>
            <CheckableTag
              checked
              icon={
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              Finance
            </CheckableTag>
            <CheckableTag
              icon={
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              Trending
            </CheckableTag>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Use Cases"
          description="Practical examples of tag usage."
          code={`import React from 'react'
import { Tag, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="space-y-4">
    <div>
      <div className="text-sm font-semibold mb-2">Categories:</div>
      <div className="flex gap-2 flex-wrap">
        <Tag color="primary">Technology</Tag>
        <Tag color="secondary">Design</Tag>
        <Tag color="accent">Marketing</Tag>
      </div>
    </div>

    <div>
      <div className="text-sm font-semibold mb-2">Status:</div>
      <div className="flex gap-2 flex-wrap">
        <Tag color="success">Active</Tag>
        <Tag color="warning">Pending</Tag>
        <Tag color="error">Inactive</Tag>
      </div>
    </div>

    <div>
      <div className="text-sm font-semibold mb-2">Skills:</div>
      <div className="flex gap-2 flex-wrap">
        <Tag closable color="info">
          React
        </Tag>
        <Tag closable color="info">
          TypeScript
        </Tag>
        <Tag closable color="info">
          Node.js
        </Tag>
      </div>
    </div>
  </div>
)

export default App`}
        >
          <div className="space-y-4">
            <div>
              <div className="text-sm font-semibold mb-2">Categories:</div>
              <div className="flex gap-2 flex-wrap">
                <Tag color="primary">Technology</Tag>
                <Tag color="secondary">Design</Tag>
                <Tag color="accent">Marketing</Tag>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold mb-2">Status:</div>
              <div className="flex gap-2 flex-wrap">
                <Tag color="success">Active</Tag>
                <Tag color="warning">Pending</Tag>
                <Tag color="error">Inactive</Tag>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold mb-2">Skills:</div>
              <div className="flex gap-2 flex-wrap">
                <Tag closable color="info">
                  React
                </Tag>
                <Tag closable color="info">
                  TypeScript
                </Tag>
                <Tag closable color="info">
                  Node.js
                </Tag>
              </div>
            </div>
          </div>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>
        <ApiTable title="Tag" data={tagApi} />
        <div className="mt-8">
          <ApiTable title="CheckableTag" data={checkableTagApi} />
        </div>
      </div>
    </div>
  )
}
