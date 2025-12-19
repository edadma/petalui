import { useState } from 'react'
import { Dock, Space } from '@aster-ui/prefixed'
import { HomeIcon, MagnifyingGlassIcon, HeartIcon, UserIcon, Cog6ToothIcon, BellIcon, PlusCircleIcon } from '@aster-ui/icons-prefixed'
import { Demo } from './Demo'

// @example-imports: { Dock } from 'asterui'
// @example-imports: { useState } from 'react'
// @example-imports: { HomeIcon, MagnifyingGlassIcon, HeartIcon, UserIcon } from '@aster-ui/icons'
export function BasicDemo() {
  // @example-include
  const [active, setActive] = useState(0)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Dock, Space } from 'asterui'
// @example-imports: { useState } from 'react'
// @example-imports: { HomeIcon, Cog6ToothIcon, BellIcon } from '@aster-ui/icons'
export function SizesDemo() {
  // @example-include
  const [active, setActive] = useState(0)
  const items = [
    { icon: <HomeIcon />, label: 'Home' },
    { icon: <Cog6ToothIcon />, label: 'Settings' },
    { icon: <BellIcon />, label: 'Alerts' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="lg" className="w-full">
        <Dock size="xs" items={items} activeIndex={active} onChange={setActive} />
        <Dock size="sm" items={items} activeIndex={active} onChange={setActive} />
        <Dock size="md" items={items} activeIndex={active} onChange={setActive} />
        <Dock size="lg" items={items} activeIndex={active} onChange={setActive} />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Dock } from 'asterui'
// @example-imports: { useState } from 'react'
// @example-imports: { HomeIcon, MagnifyingGlassIcon, PlusCircleIcon, HeartIcon, UserIcon } from '@aster-ui/icons'
export function IconsOnlyDemo() {
  // @example-include
  const [active, setActive] = useState(2)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Dock } from 'asterui'
// @example-imports: { useState } from 'react'
// @example-imports: { HomeIcon, Cog6ToothIcon, BellIcon } from '@aster-ui/icons'
export function CustomStyleDemo() {
  // @example-include
  const [active, setActive] = useState(0)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Dock } from 'asterui'
// @example-imports: { useState } from 'react'
// @example-imports: { HomeIcon, Cog6ToothIcon } from '@aster-ui/icons'
export function ChildrenDemo() {
  // @example-include
  const [active, setActive] = useState(0)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}
