import { useState } from 'react'
import { Filter, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Filter, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function BasicDemo() {
  // @example-include
  const [value, setValue] = useState<string | undefined>()
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="md">
        <Filter
          options={['Svelte', 'Vue', 'React', 'Angular']}
          value={value}
          onChange={setValue}
        />
        <p className="text-sm text-base-content/70">
          Selected: {value || 'None'}
        </p>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Filter, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="lg">
        <Filter options={['Small', 'Medium', 'Large']} size="xs" />
        <Filter options={['Small', 'Medium', 'Large']} size="sm" />
        <Filter options={['Small', 'Medium', 'Large']} size="md" />
        <Filter options={['Small', 'Medium', 'Large']} size="lg" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Filter, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function ObjectOptionsDemo() {
  // @example-include
  const [value, setValue] = useState<string | undefined>()
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="md">
        <Filter
          options={[
            { label: 'JavaScript', value: 'js' },
            { label: 'TypeScript', value: 'ts' },
            { label: 'Python', value: 'py' },
            { label: 'Rust', value: 'rust', disabled: true },
          ]}
          value={value}
          onChange={setValue}
        />
        <p className="text-sm text-base-content/70">
          Selected value: {value || 'None'}
        </p>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Filter } from 'asterui'
export function NoResetDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Filter
        options={['Option A', 'Option B', 'Option C']}
        showReset={false}
        defaultValue="Option A"
      />
      {/* @example-return-end */}
    </Demo>
  )
}
