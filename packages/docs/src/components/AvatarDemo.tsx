import { Avatar, Space } from 'asterui'
import { UserIcon, UserCircleIcon } from '@aster-ui/icons'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <Avatar
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        alt="User avatar"
      />
    </Demo>
  )
}

export function SizesDemo() {
  return (
    <Demo>
      <Space direction="horizontal" size="sm" align="center">
        <Avatar size="xs" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        <Avatar size="sm" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        <Avatar size="md" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        <Avatar size="lg" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        <Avatar size="xl" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </Space>
    </Demo>
  )
}

export function ShapesDemo() {
  return (
    <Demo>
      <Space direction="horizontal" size="sm">
        <Avatar shape="circle" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        <Avatar shape="square" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </Space>
    </Demo>
  )
}

export function StatusDemo() {
  return (
    <Demo>
      <Space direction="horizontal" size="sm">
        <Avatar status="online" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        <Avatar status="offline" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </Space>
    </Demo>
  )
}

export function TextDemo() {
  return (
    <Demo>
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
    </Demo>
  )
}

export function IconDemo() {
  return (
    <Demo>
      <Space direction="horizontal" size="sm">
        <Avatar icon={<UserIcon size={32} />} />
        <Avatar size="lg" icon={<UserCircleIcon size={40} />} />
      </Space>
    </Demo>
  )
}

export function GroupDemo() {
  return (
    <Demo>
      <Avatar.Group>
        <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </Avatar.Group>
    </Demo>
  )
}

export function GroupMaxDemo() {
  return (
    <Demo>
      <Avatar.Group max={3}>
        <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        <Avatar src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </Avatar.Group>
    </Demo>
  )
}
