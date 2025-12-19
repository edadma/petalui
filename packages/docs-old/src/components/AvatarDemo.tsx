import { Avatar, Space } from '@aster-ui/prefixed'
import { UserIcon, UserCircleIcon } from '@aster-ui/icons-prefixed'
import { Demo } from './Demo'

// @example-imports: { Avatar } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Avatar
        src="/avatar-1.png"
        alt="User avatar"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Avatar, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="sm" align="center">
        <Avatar size="xs" src="/avatar-1.png" />
        <Avatar size="sm" src="/avatar-1.png" />
        <Avatar size="md" src="/avatar-1.png" />
        <Avatar size="lg" src="/avatar-1.png" />
        <Avatar size="xl" src="/avatar-1.png" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Avatar, Space } from 'asterui'
export function ShapesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="sm">
        <Avatar shape="circle" src="/avatar-1.png" />
        <Avatar shape="square" src="/avatar-1.png" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Avatar, Space } from 'asterui'
export function StatusDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="sm">
        <Avatar status="online" src="/avatar-1.png" />
        <Avatar status="offline" src="/avatar-1.png" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Avatar, Space } from 'asterui'
export function TextDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="sm" align="center">
        <Avatar size="xl">
          <span className="text-3xl">AI</span>
        </Avatar>
        <Avatar size="lg">
          <span className="text-xl">JD</span>
        </Avatar>
        <Avatar size="md">
          <span>MX</span>
        </Avatar>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Avatar, Space } from 'asterui'
// @example-imports: { UserIcon, UserCircleIcon } from '@aster-ui/icons'
export function IconDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="sm">
        <Avatar icon={<UserIcon size={32} />} />
        <Avatar size="lg" icon={<UserCircleIcon size={40} />} />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Avatar } from 'asterui'
export function GroupDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Avatar.Group>
        <Avatar src="/avatar-1.png" />
        <Avatar src="/avatar-1.png" />
        <Avatar src="/avatar-1.png" />
        <Avatar src="/avatar-1.png" />
      </Avatar.Group>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Avatar } from 'asterui'
export function GroupMaxDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Avatar.Group max={3}>
        <Avatar src="/avatar-1.png" />
        <Avatar src="/avatar-1.png" />
        <Avatar src="/avatar-1.png" />
        <Avatar src="/avatar-1.png" />
        <Avatar src="/avatar-1.png" />
        <Avatar src="/avatar-1.png" />
      </Avatar.Group>
      {/* @example-return-end */}
    </Demo>
  )
}
