import { Typography, Space } from 'asterui'
import { Demo } from './Demo'

const { Title, Paragraph, Text, Link } = Typography

export function TitlesDemo() {
  return (
    <Demo>
      <div>
        <Title level={1}>h1. Heading</Title>
        <Title level={2}>h2. Heading</Title>
        <Title level={3}>h3. Heading</Title>
        <Title level={4}>h4. Heading</Title>
        <Title level={5}>h5. Heading</Title>
      </div>
    </Demo>
  )
}

export function ParagraphDemo() {
  return (
    <Demo>
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
    </Demo>
  )
}

export function TextDemo() {
  return (
    <Demo>
      <Space direction="vertical">
        <Text>Default Text</Text>
        <Text type="secondary">Secondary Text</Text>
        <Text type="success">Success Text</Text>
        <Text type="warning">Warning Text</Text>
        <Text type="danger">Danger Text</Text>
        <Text disabled>Disabled Text</Text>
      </Space>
    </Demo>
  )
}

export function TextStylesDemo() {
  return (
    <Demo>
      <Space direction="vertical">
        <Text strong>Bold Text</Text>
        <Text italic>Italic Text</Text>
        <Text underline>Underlined Text</Text>
        <Text delete>Strikethrough Text</Text>
        <Text code>Code Text</Text>
        <Text mark>Marked Text</Text>
        <Text keyboard>Keyboard Text</Text>
      </Space>
    </Demo>
  )
}

export function LinksDemo() {
  return (
    <Demo>
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
    </Demo>
  )
}

export function CopyableDemo() {
  return (
    <Demo>
      <Space direction="vertical">
        <Paragraph copyable>This is copyable text. Click the icon to copy.</Paragraph>
        <Paragraph copyable={{ text: 'Custom copied text!' }}>
          Copy different text than displayed.
        </Paragraph>
      </Space>
    </Demo>
  )
}

export function EllipsisDemo() {
  return (
    <Demo>
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
    </Demo>
  )
}

export function EditableDemo() {
  return (
    <Demo>
      <Space direction="vertical">
        <Paragraph editable>This text can be edited. Click to modify.</Paragraph>
        <Title level={4} editable>
          Editable Heading
        </Title>
      </Space>
    </Demo>
  )
}
