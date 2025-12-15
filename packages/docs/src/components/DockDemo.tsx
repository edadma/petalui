import { useState } from 'react'
import { Dock, Space } from 'asterui'
import { HomeIcon, MagnifyingGlassIcon, HeartIcon, UserIcon, Cog6ToothIcon, BellIcon, PlusCircleIcon } from '@aster-ui/icons'
import { Demo } from './Demo'

export function BasicDemo() {
  const [active, setActive] = useState(0)

  return (
    <Demo>
      <Dock
        items={[
          { icon: <HomeIcon size="lg" />, label: 'Home' },
          { icon: <MagnifyingGlassIcon size="lg" />, label: 'Search' },
          { icon: <HeartIcon size="lg" />, label: 'Favorites' },
          { icon: <UserIcon size="lg" />, label: 'Profile' },
        ]}
        activeIndex={active}
        onChange={setActive}
      />
    </Demo>
  )
}

export function SizesDemo() {
  const [active, setActive] = useState(0)
  const items = [
    { icon: <HomeIcon />, label: 'Home' },
    { icon: <Cog6ToothIcon />, label: 'Settings' },
    { icon: <BellIcon />, label: 'Alerts' },
  ]

  return (
    <Demo>
      <Space direction="vertical" size="lg" className="w-full">
        <Dock size="xs" items={items} activeIndex={active} onChange={setActive} />
        <Dock size="sm" items={items} activeIndex={active} onChange={setActive} />
        <Dock size="md" items={items} activeIndex={active} onChange={setActive} />
        <Dock size="lg" items={items} activeIndex={active} onChange={setActive} />
      </Space>
    </Demo>
  )
}

export function IconsOnlyDemo() {
  const [active, setActive] = useState(2)

  return (
    <Demo>
      <Dock
        items={[
          { icon: <HomeIcon size="lg" /> },
          { icon: <MagnifyingGlassIcon size="lg" /> },
          { icon: <PlusCircleIcon size={32} /> },
          { icon: <HeartIcon size="lg" /> },
          { icon: <UserIcon size="lg" /> },
        ]}
        activeIndex={active}
        onChange={setActive}
      />
    </Demo>
  )
}

export function CustomStyleDemo() {
  const [active, setActive] = useState(0)

  return (
    <Demo>
      <Dock
        className="bg-neutral text-neutral-content"
        items={[
          { icon: <HomeIcon size="lg" />, label: 'Home' },
          { icon: <Cog6ToothIcon size="lg" />, label: 'Settings' },
          { icon: <BellIcon size="lg" />, label: 'Alerts' },
        ]}
        activeIndex={active}
        onChange={setActive}
      />
    </Demo>
  )
}

export function ChildrenDemo() {
  const [active, setActive] = useState(0)

  return (
    <Demo>
      <Dock>
        <Dock.Item active={active === 0} onClick={() => setActive(0)}>
          <HomeIcon size="lg" />
          <span className="dock-label">Home</span>
        </Dock.Item>
        <Dock.Item active={active === 1} onClick={() => setActive(1)}>
          <Cog6ToothIcon size="lg" />
          <span className="dock-label">Settings</span>
        </Dock.Item>
      </Dock>
    </Demo>
  )
}
