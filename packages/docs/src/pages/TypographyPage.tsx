import { Typography, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const typographyRootApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Content to render',
    type: 'React.ReactNode',
  },
  {
    property: 'size',
    description: 'Typography size preset',
    type: "'sm' | 'base' | 'lg' | 'xl' | '2xl'",
    default: "'base'",
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const titleApi: ApiProperty[] = [
  {
    property: 'level',
    description: 'Heading level (h1-h5)',
    type: '1 | 2 | 3 | 4 | 5',
    default: '1',
  },
  {
    property: 'children',
    description: 'Content to render',
    type: 'React.ReactNode',
  },
  {
    property: 'copyable',
    description: 'Show copy button on hover',
    type: 'boolean',
  },
  {
    property: 'ellipsis',
    description: 'Truncate with ellipsis',
    type: 'boolean',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
  {
    property: 'id',
    description: 'Element ID (auto-generated from text if not provided)',
    type: 'string',
  },
]

const paragraphApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Content to render',
    type: 'React.ReactNode',
  },
  {
    property: 'ellipsis',
    description: 'Enable ellipsis with optional configuration',
    type: 'boolean | { rows?: number; expandable?: boolean; onExpand?: () => void }',
  },
  {
    property: 'copyable',
    description: 'Show copy button on hover',
    type: 'boolean',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const textApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Content to render',
    type: 'React.ReactNode',
  },
  {
    property: 'code',
    description: 'Render as inline code',
    type: 'boolean',
  },
  {
    property: 'mark',
    description: 'Highlighted/marked text',
    type: 'boolean',
  },
  {
    property: 'strong',
    description: 'Bold text',
    type: 'boolean',
  },
  {
    property: 'italic',
    description: 'Italic text',
    type: 'boolean',
  },
  {
    property: 'underline',
    description: 'Underlined text',
    type: 'boolean',
  },
  {
    property: 'delete',
    description: 'Strikethrough text',
    type: 'boolean',
  },
  {
    property: 'type',
    description: 'Semantic color type',
    type: "'default' | 'secondary' | 'success' | 'warning' | 'error'",
    default: "'default'",
  },
  {
    property: 'copyable',
    description: 'Show copy button on hover',
    type: 'boolean',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const linkApi: ApiProperty[] = [
  {
    property: 'href',
    description: 'Link destination',
    type: 'string',
  },
  {
    property: 'children',
    description: 'Content to render',
    type: 'React.ReactNode',
  },
  {
    property: 'target',
    description: 'Link target attribute',
    type: 'string',
  },
  {
    property: 'external',
    description: 'Force external link behavior (opens in new tab)',
    type: 'boolean',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function TypographyPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Typography</h1>
        <p className="text-base-content/70">
          Display text content with semantic styling and optional Tailwind Typography plugin support.
        </p>
      </div>

      <div className="mb-8 p-6 bg-warning/10 rounded-lg border border-warning/20">
        <h2 className="text-xl font-bold mb-3 text-warning">Tailwind Typography Plugin (Optional)</h2>
        <p className="text-base-content/70 mb-4">
          The Typography component works out of the box with fallback styles. For enhanced prose styling,
          install the <span className="font-mono text-sm">@tailwindcss/typography</span> plugin:
        </p>
        <div className="bg-base-100 p-4 rounded-lg border border-base-content/10 mb-4">
          <div className="font-mono text-sm mb-3">
            <div className="text-base-content/50"># Install the plugin</div>
            <div>npm install -D @tailwindcss/typography</div>
          </div>
          <div className="font-mono text-sm">
            <div className="text-base-content/50 mb-1"># Add to tailwind.config.js</div>
            <div className="text-base-content/70">export default {'{'}</div>
            <div className="text-base-content/70 ml-4">plugins: [</div>
            <div className="ml-8">require('@tailwindcss/typography'),</div>
            <div className="text-base-content/70 ml-4">],</div>
            <div className="text-base-content/70">{'}'}</div>
          </div>
        </div>
        <p className="text-sm text-base-content/60">
          Without the plugin, the component uses daisyUI theme colors and basic Tailwind utilities.
          With the plugin, you get beautiful prose defaults including optimized line heights, font sizes, and spacing.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Typography Container"
          description="Wrap content in Typography component for prose styling."
          code={`import React from 'react'
import { Typography, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <Typography>
    <h1>Heading 1</h1>
    <p>
      This is a paragraph with some text. The Typography component applies
      prose classes for beautiful typography.
    </p>
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
    </ul>
  </Typography>
)

export default App`}
        >
          <Typography>
            <h1>Heading 1</h1>
            <p>
              This is a paragraph with some text. The Typography component applies
              prose classes for beautiful typography.
            </p>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
          </Typography>
        </ExampleSection>

        <ExampleSection
          title="Typography Sizes"
          description="Control the overall typography scale."
          code={`import React from 'react'
import { Typography, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <>
    <Typography size="sm">
      <p>Small typography size</p>
    </Typography>
    <Typography size="base">
      <p>Base typography size (default)</p>
    </Typography>
    <Typography size="lg">
      <p>Large typography size</p>
    </Typography>
  </>
)

export default App`}
        >
          <div className="space-y-4">
            <Typography size="sm">
              <p>Small typography size</p>
            </Typography>
            <Typography size="base">
              <p>Base typography size (default)</p>
            </Typography>
            <Typography size="lg">
              <p>Large typography size</p>
            </Typography>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Title Component"
          description="Semantic headings with automatic ID generation."
          code={`import React from 'react'
import { Typography, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <div>
    <Typography.Title level={1}>Heading 1</Typography.Title>
    <Typography.Title level={2}>Heading 2</Typography.Title>
    <Typography.Title level={3}>Heading 3</Typography.Title>
    <Typography.Title level={4}>Heading 4</Typography.Title>
    <Typography.Title level={5}>Heading 5</Typography.Title>
  </div>
)

export default App`}
        >
          <div>
            <Typography.Title level={1}>Heading 1</Typography.Title>
            <Typography.Title level={2}>Heading 2</Typography.Title>
            <Typography.Title level={3}>Heading 3</Typography.Title>
            <Typography.Title level={4}>Heading 4</Typography.Title>
            <Typography.Title level={5}>Heading 5</Typography.Title>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Copyable Title"
          description="Hover to reveal copy button."
          code={`import React from 'react'
import { Typography, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <Typography.Title level={2} copyable>
    Hover to copy this title
  </Typography.Title>
)

export default App`}
        >
          <Typography.Title level={2} copyable>
            Hover to copy this title
          </Typography.Title>
        </ExampleSection>

        <ExampleSection
          title="Title with Ellipsis"
          description="Truncate long titles with ellipsis."
          code={`import React from 'react'
import { Typography, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="max-w-xs">
    <Typography.Title level={3} ellipsis>
      This is a very long title that will be truncated with ellipsis
    </Typography.Title>
  </div>
)

export default App`}
        >
          <div className="max-w-xs">
            <Typography.Title level={3} ellipsis>
              This is a very long title that will be truncated with ellipsis
            </Typography.Title>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Paragraph Component"
          description="Styled paragraphs with copyable functionality."
          code={`import React from 'react'
import { Typography, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <>
    <Typography.Paragraph>
      This is a regular paragraph with proper spacing and styling.
    </Typography.Paragraph>
    <Typography.Paragraph copyable>
      This paragraph has a copy button. Hover to see it.
    </Typography.Paragraph>
  </>
)

export default App`}
        >
          <div>
            <Typography.Paragraph>
              This is a regular paragraph with proper spacing and styling.
            </Typography.Paragraph>
            <Typography.Paragraph copyable>
              This paragraph has a copy button. Hover to see it.
            </Typography.Paragraph>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Paragraph Ellipsis"
          description="Truncate paragraphs with optional expand functionality."
          code={`import React from 'react'
import { Typography, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <>
    <Typography.Paragraph ellipsis={{ rows: 2 }}>
      This is a long paragraph that will be clamped to 2 rows.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Typography.Paragraph>
    <Typography.Paragraph ellipsis={{ rows: 2, expandable: true }}>
      This paragraph can be expanded! Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua. Click 'Show more' to expand.
    </Typography.Paragraph>
  </>
)

export default App`}
        >
          <div className="space-y-4">
            <Typography.Paragraph ellipsis={{ rows: 2 }}>
              This is a long paragraph that will be clamped to 2 rows.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography.Paragraph>
            <Typography.Paragraph ellipsis={{ rows: 2, expandable: true }}>
              This paragraph can be expanded! Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Click 'Show more' to expand.
            </Typography.Paragraph>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Text Component - Code"
          description="Inline code styling."
          code={`import React from 'react'
import { Typography, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <Typography.Text code>
    const message = 'Hello World'
  </Typography.Text>
)

export default App`}
        >
          <Typography.Text code>
            const message = 'Hello World'
          </Typography.Text>
        </ExampleSection>

        <ExampleSection
          title="Text Component - Mark"
          description="Highlighted text."
          code={`import React from 'react'
import { Typography, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <p>
    This is <Typography.Text mark>highlighted text</Typography.Text> in a sentence.
  </p>
)

export default App`}
        >
          <p>
            This is <Typography.Text mark>highlighted text</Typography.Text> in a sentence.
          </p>
        </ExampleSection>

        <ExampleSection
          title="Text Component - Strong"
          description="Bold text emphasis."
          code={`import React from 'react'
import { Typography, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <p>
    This is <Typography.Text strong>strong text</Typography.Text> in a sentence.
  </p>
)

export default App`}
        >
          <p>
            This is <Typography.Text strong>strong text</Typography.Text> in a sentence.
          </p>
        </ExampleSection>

        <ExampleSection
          title="Text Component - Italic"
          description="Italic text style."
          code={`import React from 'react'
import { Typography, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <p>
    This is <Typography.Text italic>italic text</Typography.Text> in a sentence.
  </p>
)

export default App`}
        >
          <p>
            This is <Typography.Text italic>italic text</Typography.Text> in a sentence.
          </p>
        </ExampleSection>

        <ExampleSection
          title="Text Component - Underline"
          description="Underlined text."
          code={`import React from 'react'
import { Typography, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <p>
    This is <Typography.Text underline>underlined text</Typography.Text> in a sentence.
  </p>
)

export default App`}
        >
          <p>
            This is <Typography.Text underline>underlined text</Typography.Text> in a sentence.
          </p>
        </ExampleSection>

        <ExampleSection
          title="Text Component - Delete"
          description="Strikethrough text."
          code={`import React from 'react'
import { Typography, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <p>
    This is <Typography.Text delete>deleted text</Typography.Text> in a sentence.
  </p>
)

export default App`}
        >
          <p>
            This is <Typography.Text delete>deleted text</Typography.Text> in a sentence.
          </p>
        </ExampleSection>

        <ExampleSection
          title="Text Component - Types"
          description="Semantic color types."
          code={`import React from 'react'
import { Typography, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="space-y-2">
    <div><Typography.Text type="default">Default text</Typography.Text></div>
    <div><Typography.Text type="secondary">Secondary text</Typography.Text></div>
    <div><Typography.Text type="success">Success text</Typography.Text></div>
    <div><Typography.Text type="warning">Warning text</Typography.Text></div>
    <div><Typography.Text type="error">Error text</Typography.Text></div>
  </div>
)

export default App`}
        >
          <div className="space-y-2">
            <div><Typography.Text type="default">Default text</Typography.Text></div>
            <div><Typography.Text type="secondary">Secondary text</Typography.Text></div>
            <div><Typography.Text type="success">Success text</Typography.Text></div>
            <div><Typography.Text type="warning">Warning text</Typography.Text></div>
            <div><Typography.Text type="error">Error text</Typography.Text></div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Text Component - Combined"
          description="Combine multiple text styles."
          code={`import React from 'react'
import { Typography, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="space-y-2">
    <div>
      <Typography.Text strong italic>
        Strong and italic
      </Typography.Text>
    </div>
    <div>
      <Typography.Text code type="error">
        Error code
      </Typography.Text>
    </div>
    <div>
      <Typography.Text mark strong>
        Highlighted and bold
      </Typography.Text>
    </div>
  </div>
)

export default App`}
        >
          <div className="space-y-2">
            <div>
              <Typography.Text strong italic>
                Strong and italic
              </Typography.Text>
            </div>
            <div>
              <Typography.Text code type="error">
                Error code
              </Typography.Text>
            </div>
            <div>
              <Typography.Text mark strong>
                Highlighted and bold
              </Typography.Text>
            </div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Link Component"
          description="Internal and external links with automatic icon."
          code={`import React from 'react'
import { Typography, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="space-y-2">
    <div>
      <Typography.Link href="/about">
        Internal link
      </Typography.Link>
    </div>
    <div>
      <Typography.Link href="https://github.com">
        External link (auto-detected)
      </Typography.Link>
    </div>
    <div>
      <Typography.Link href="/page" external>
        Forced external behavior
      </Typography.Link>
    </div>
  </div>
)

export default App`}
        >
          <div className="space-y-2">
            <div>
              <Typography.Link href="/about">
                Internal link
              </Typography.Link>
            </div>
            <div>
              <Typography.Link href="https://github.com">
                External link (auto-detected)
              </Typography.Link>
            </div>
            <div>
              <Typography.Link href="/page" external>
                Forced external behavior
              </Typography.Link>
            </div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Complete Example"
          description="Combining all typography components."
          code={`import React from 'react'
import { Typography, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <Typography>
    <Typography.Title level={1} copyable>
      Article Title
    </Typography.Title>

    <Typography.Paragraph>
      This is the introduction paragraph with some{' '}
      <Typography.Text strong>important text</Typography.Text> and{' '}
      <Typography.Text code>code snippets</Typography.Text>.
    </Typography.Paragraph>

    <Typography.Title level={2}>Section Heading</Typography.Title>

    <Typography.Paragraph>
      Learn more at{' '}
      <Typography.Link href="https://example.com">
        our documentation
      </Typography.Link>.
    </Typography.Paragraph>

    <Typography.Paragraph ellipsis={{ rows: 2, expandable: true }}>
      This is a long paragraph that will be truncated...
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Typography.Paragraph>
  </Typography>
)

export default App`}
        >
          <Typography>
            <Typography.Title level={1} copyable>
              Article Title
            </Typography.Title>

            <Typography.Paragraph>
              This is the introduction paragraph with some{' '}
              <Typography.Text strong>important text</Typography.Text> and{' '}
              <Typography.Text code>code snippets</Typography.Text>.
            </Typography.Paragraph>

            <Typography.Title level={2}>Section Heading</Typography.Title>

            <Typography.Paragraph>
              Learn more at{' '}
              <Typography.Link href="https://example.com">
                our documentation
              </Typography.Link>.
            </Typography.Paragraph>

            <Typography.Paragraph ellipsis={{ rows: 2, expandable: true }}>
              This is a long paragraph that will be truncated...
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography.Paragraph>
          </Typography>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <div className="mb-8">
          <ApiTable title="Typography" data={typographyRootApi} />
        </div>

        <div className="mb-8">
          <ApiTable title="Typography.Title" data={titleApi} />
        </div>

        <div className="mb-8">
          <ApiTable title="Typography.Paragraph" data={paragraphApi} />
        </div>

        <div className="mb-8">
          <ApiTable title="Typography.Text" data={textApi} />
        </div>

        <div className="mb-8">
          <ApiTable title="Typography.Link" data={linkApi} />
        </div>

        <div className="mt-6 p-4 bg-info/10 rounded-lg border border-info/20">
          <h3 className="text-lg font-bold mb-2 text-info">Progressive Enhancement</h3>
          <p className="text-sm text-base-content/70 mb-3">
            The Typography component is designed to work with or without the Tailwind Typography plugin:
          </p>
          <ul className="list-disc list-inside text-sm text-base-content/70 space-y-1">
            <li>
              <strong>Without plugin:</strong> Uses daisyUI theme colors and standard Tailwind utilities for basic typography styling
            </li>
            <li>
              <strong>With plugin:</strong> Adds prose classes for beautiful, optimized typography including better line heights, font sizes, and spacing
            </li>
            <li>
              <strong>Dark mode:</strong> Automatically adapts to theme changes with <span className="font-mono text-xs">prose-invert</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
