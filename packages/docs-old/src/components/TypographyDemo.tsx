import { Typography, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

const { Title, Paragraph, Text, Link } = Typography

// @example-imports: { Typography } from 'asterui'
export function TitlesDemo() {
  // @example-include
  const { Title } = Typography
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Title level={1}>h1. Heading</Title>
        <Title level={2}>h2. Heading</Title>
        <Title level={3}>h3. Heading</Title>
        <Title level={4}>h4. Heading</Title>
        <Title level={5}>h5. Heading</Title>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Typography } from 'asterui'
export function ParagraphDemo() {
  // @example-include
  const { Paragraph } = Typography
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Paragraph>
          Typography is the art and technique of arranging type to make written language legible,
          readable, and appealing when displayed. The arrangement of type involves selecting
          typefaces, point sizes, line lengths, line-spacing, and letter-spacing.
        </Paragraph>
        <Paragraph>
          Good typography creates a visual hierarchy, helps users navigate content, and improves the
          overall user experience. It's an essential element of web design that directly impacts
          readability and engagement.
        </Paragraph>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Typography, Space } from 'asterui'
export function TextDemo() {
  // @example-include
  const { Text } = Typography
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical">
        <Text>Default Text</Text>
        <Text type="secondary">Secondary Text</Text>
        <Text type="success">Success Text</Text>
        <Text type="warning">Warning Text</Text>
        <Text type="danger">Danger Text</Text>
        <Text disabled>Disabled Text</Text>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Typography, Space } from 'asterui'
export function TextStylesDemo() {
  // @example-include
  const { Text } = Typography
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical">
        <Text strong>Bold Text</Text>
        <Text italic>Italic Text</Text>
        <Text underline>Underlined Text</Text>
        <Text delete>Strikethrough Text</Text>
        <Text code>Code Text</Text>
        <Text mark>Marked Text</Text>
        <Text keyboard>Keyboard Text</Text>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Typography, Space } from 'asterui'
export function LinksDemo() {
  // @example-include
  const { Link } = Typography
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical">
        <Link href="#">Basic Link</Link>
        <Link href="#" type="secondary">
          Secondary Link
        </Link>
        <Link href="#" type="success">
          Success Link
        </Link>
        <Link href="#" type="warning">
          Warning Link
        </Link>
        <Link href="#" type="danger">
          Danger Link
        </Link>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Typography, Space } from 'asterui'
export function CopyableDemo() {
  // @example-include
  const { Paragraph } = Typography
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical">
        <Paragraph copyable>This is copyable text. Click the icon to copy.</Paragraph>
        <Paragraph copyable={{ text: 'Custom copied text!' }}>
          Copy different text than displayed.
        </Paragraph>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Typography } from 'asterui'
export function EllipsisDemo() {
  // @example-include
  const { Paragraph } = Typography
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div className="max-w-md">
        <Paragraph ellipsis>
          This is a very long paragraph that will be truncated with an ellipsis when it exceeds the
          available width. This helps maintain clean layouts when dealing with variable-length
          content.
        </Paragraph>
        <Paragraph ellipsis={{ rows: 2 }}>
          This paragraph will show two lines before truncating. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </Paragraph>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Typography, Space } from 'asterui'
export function EditableDemo() {
  // @example-include
  const { Title, Paragraph } = Typography
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical">
        <Paragraph editable>This text can be edited. Click to modify.</Paragraph>
        <Title level={4} editable>
          Editable Heading
        </Title>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}
