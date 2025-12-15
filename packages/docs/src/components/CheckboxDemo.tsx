import { useState } from 'react'
import { Checkbox, Space, Modal } from 'asterui'
import { SpeakerWaveIcon, SpeakerXMarkIcon, SunIcon, MoonIcon } from '@aster-ui/icons/solid'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox />
        <span>Accept terms and conditions</span>
      </label>
    </Demo>
  )
}

export function ColorsDemo() {
  return (
    <Demo>
      <Space direction="vertical" size="sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox color="primary" defaultChecked />
          <span>Primary</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox color="secondary" defaultChecked />
          <span>Secondary</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox color="accent" defaultChecked />
          <span>Accent</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox color="success" defaultChecked />
          <span>Success</span>
        </label>
      </Space>
    </Demo>
  )
}

export function SizesDemo() {
  return (
    <Demo>
      <Space direction="horizontal" size="md" align="center">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox size="xs" defaultChecked />
          <span className="text-xs">XS</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox size="sm" defaultChecked />
          <span className="text-sm">SM</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox size="md" defaultChecked />
          <span>MD</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox size="lg" defaultChecked />
          <span className="text-lg">LG</span>
        </label>
      </Space>
    </Demo>
  )
}

export function DisabledDemo() {
  return (
    <Demo>
      <Space direction="horizontal" size="md">
        <label className="flex items-center gap-2 cursor-not-allowed opacity-50">
          <Checkbox disabled />
          <span>Disabled</span>
        </label>
        <label className="flex items-center gap-2 cursor-not-allowed opacity-50">
          <Checkbox disabled defaultChecked />
          <span>Disabled Checked</span>
        </label>
      </Space>
    </Demo>
  )
}

export function IndeterminateDemo() {
  const [items, setItems] = useState([true, false, true])
  const allChecked = items.every(Boolean)
  const someChecked = items.some(Boolean) && !allChecked

  const handleSelectAll = () => {
    setItems(allChecked ? [false, false, false] : [true, true, true])
  }

  return (
    <Demo>
      <Space direction="vertical" size="sm">
        <label className="flex items-center gap-2 cursor-pointer font-medium">
          <Checkbox
            checked={allChecked}
            indeterminate={someChecked}
            onChange={handleSelectAll}
          />
          <span>Select All</span>
        </label>
        <div className="ml-6">
          <Space direction="vertical" size="xs">
            {['Item 1', 'Item 2', 'Item 3'].map((item, i) => (
              <label key={i} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={items[i]}
                  onChange={() => {
                    const newItems = [...items]
                    newItems[i] = !newItems[i]
                    setItems(newItems)
                  }}
                />
                <span>{item}</span>
              </label>
            ))}
          </Space>
        </div>
      </Space>
    </Demo>
  )
}

export function GroupDemo() {
  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Mango', value: 'mango' },
  ]

  return (
    <Demo>
      <Checkbox.Group
        options={options}
        defaultValue={['apple', 'orange']}
        onChange={(values) => Modal.info({ title: 'Selected', content: values.join(', ') })}
      />
    </Demo>
  )
}

export function SwapDemo() {
  const [volume, setVolume] = useState(true)

  return (
    <Demo>
      <Space size="lg">
        <Checkbox
          checked={volume}
          onChange={(e) => setVolume(e.target.checked)}
          swap={{
            on: <SpeakerWaveIcon size={32} />,
            off: <SpeakerXMarkIcon size={32} />,
          }}
        />
        <Checkbox
          swap={{
            on: <span className="text-2xl">😀</span>,
            off: <span className="text-2xl">😴</span>,
            effect: 'rotate',
          }}
        />
        <Checkbox
          swap={{
            on: <span className="text-xl font-bold text-success">ON</span>,
            off: <span className="text-xl font-bold text-error">OFF</span>,
            effect: 'flip',
          }}
        />
      </Space>
    </Demo>
  )
}

export function SwapIconsDemo() {
  const [isDark, setIsDark] = useState(false)

  return (
    <Demo>
      <Checkbox
        checked={isDark}
        onChange={(e) => setIsDark(e.target.checked)}
        swap={{
          on: <MoonIcon size={32} />,
          off: <SunIcon size={32} />,
          effect: 'rotate',
        }}
      />
    </Demo>
  )
}
