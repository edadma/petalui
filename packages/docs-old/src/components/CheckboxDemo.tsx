import { useState } from 'react'
import { Checkbox, Space, Modal } from '@aster-ui/prefixed'
import { SpeakerWaveIcon, SpeakerXMarkIcon, SunIcon, MoonIcon } from '@aster-ui/icons-prefixed/solid'
import { Demo } from './Demo'

// @example-imports: { Checkbox } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Checkbox>Accept terms and conditions</Checkbox>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Checkbox, Space } from 'asterui'
export function ColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <Checkbox color="primary" defaultChecked>Primary</Checkbox>
        <Checkbox color="secondary" defaultChecked>Secondary</Checkbox>
        <Checkbox color="accent" defaultChecked>Accent</Checkbox>
        <Checkbox color="success" defaultChecked>Success</Checkbox>
        <Checkbox color="warning" defaultChecked>Warning</Checkbox>
        <Checkbox color="info" defaultChecked>Info</Checkbox>
        <Checkbox color="error" defaultChecked>Error</Checkbox>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Checkbox, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="md" align="center">
        <Checkbox size="xs" defaultChecked>XS</Checkbox>
        <Checkbox size="sm" defaultChecked>SM</Checkbox>
        <Checkbox size="md" defaultChecked>MD</Checkbox>
        <Checkbox size="lg" defaultChecked>LG</Checkbox>
        <Checkbox size="xl" defaultChecked>XL</Checkbox>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Checkbox, Space } from 'asterui'
export function DisabledDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="md">
        <Checkbox disabled>Disabled</Checkbox>
        <Checkbox disabled defaultChecked>Disabled Checked</Checkbox>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Checkbox, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function IndeterminateDemo() {
  // @example-include
  const [items, setItems] = useState([true, false, true])
  const allChecked = items.every(Boolean)
  const someChecked = items.some(Boolean) && !allChecked

  const handleSelectAll = () => {
    setItems(allChecked ? [false, false, false] : [true, true, true])
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <Checkbox
          checked={allChecked}
          indeterminate={someChecked}
          onChange={handleSelectAll}
          className="font-medium"
        >
          Select All
        </Checkbox>
        <div className="ml-6">
          <Space direction="vertical" size="xs">
            {['Item 1', 'Item 2', 'Item 3'].map((item, i) => (
              <Checkbox
                key={i}
                checked={items[i]}
                onChange={() => {
                  const newItems = [...items]
                  newItems[i] = !newItems[i]
                  setItems(newItems)
                }}
              >
                {item}
              </Checkbox>
            ))}
          </Space>
        </div>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Checkbox, Modal } from 'asterui'
export function GroupDemo() {
  // @example-include
  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Mango', value: 'mango' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Checkbox.Group
        options={options}
        defaultValue={['apple', 'orange']}
        onChange={(values) => Modal.info({ title: 'Selected', content: values.join(', ') })}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Checkbox } from 'asterui'
export function GroupOptionsDemo() {
  // @example-include
  const options = [
    { label: 'Read', value: 'read' },
    { label: 'Write', value: 'write' },
    { label: 'Delete', value: 'delete', disabled: true },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Checkbox.Group
        options={options}
        defaultValue={['read']}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Checkbox, Space } from 'asterui'
export function GroupDirectionDemo() {
  // @example-include
  const options = ['Option A', 'Option B', 'Option C']
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="lg">
        <div>
          <p className="text-sm font-medium mb-2">Horizontal (default)</p>
          <Checkbox.Group options={options} direction="horizontal" defaultValue={['Option A']} />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Vertical</p>
          <Checkbox.Group options={options} direction="vertical" defaultValue={['Option B']} />
        </div>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Checkbox, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function ControlledDemo() {
  // @example-include
  const [checked, setChecked] = useState(false)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        >
          Controlled checkbox
        </Checkbox>
        <p className="text-sm text-base-content/70">
          Checked: {checked ? 'Yes' : 'No'}
        </p>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Checkbox, Space } from 'asterui'
// @example-imports: { SpeakerWaveIcon, SpeakerXMarkIcon } from '@aster-ui/icons/solid'
// @example-imports: { useState } from 'react'
export function SwapDemo() {
  // @example-include
  const [volume, setVolume] = useState(true)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Checkbox } from 'asterui'
// @example-imports: { SunIcon, MoonIcon } from '@aster-ui/icons/solid'
// @example-imports: { useState } from 'react'
export function SwapIconsDemo() {
  // @example-include
  const [isDark, setIsDark] = useState(false)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Checkbox
        checked={isDark}
        onChange={(e) => setIsDark(e.target.checked)}
        swap={{
          on: <MoonIcon size={32} />,
          off: <SunIcon size={32} />,
          effect: 'rotate',
        }}
      />
      {/* @example-return-end */}
    </Demo>
  )
}
