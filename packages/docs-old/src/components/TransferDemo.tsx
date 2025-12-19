import React, { useState } from 'react'
import { Transfer } from '@aster-ui/prefixed'
import { Demo } from './Demo'

interface TransferItem {
  key: string
  title: string
  description?: string
  disabled?: boolean
}

const basicData: TransferItem[] = Array.from({ length: 10 }, (_, i) => ({
  key: `item-${i + 1}`,
  title: `Item ${i + 1}`,
  description: `Description of item ${i + 1}`,
}))

// @example-imports: { Transfer } from 'asterui'
// @example-imports: { useState } from 'react'
export function BasicTransferDemo() {
  // @example-include
  const basicData: TransferItem[] = Array.from({ length: 10 }, (_, i) => ({
    key: `item-${i + 1}`,
    title: `Item ${i + 1}`,
    description: `Description of item ${i + 1}`,
  }))

  const [targetKeys, setTargetKeys] = useState<string[]>(['item-3', 'item-5'])
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Transfer
        dataSource={basicData}
        targetKeys={targetKeys}
        onChange={setTargetKeys}
        render={(item) => item.title}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Transfer } from 'asterui'
// @example-imports: { useState } from 'react'
export function SearchTransferDemo() {
  // @example-include
  const basicData: TransferItem[] = Array.from({ length: 10 }, (_, i) => ({
    key: `item-${i + 1}`,
    title: `Item ${i + 1}`,
    description: `Description of item ${i + 1}`,
  }))

  const [targetKeys, setTargetKeys] = useState<string[]>([])
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Transfer
        dataSource={basicData}
        targetKeys={targetKeys}
        onChange={setTargetKeys}
        render={(item) => item.title}
        showSearch
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Transfer } from 'asterui'
// @example-imports: { useState } from 'react'
export function CustomRenderTransferDemo() {
  // @example-include
  const [targetKeys, setTargetKeys] = useState<string[]>([])

  const data: TransferItem[] = [
    { key: '1', title: 'React', description: 'A JavaScript library for building user interfaces' },
    { key: '2', title: 'Vue', description: 'The Progressive JavaScript Framework' },
    {
      key: '3',
      title: 'Angular',
      description: 'Platform for building mobile and desktop web apps',
    },
    { key: '4', title: 'Svelte', description: 'Cybernetically enhanced web apps' },
    { key: '5', title: 'Solid', description: 'Simple and performant reactivity' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Transfer
        dataSource={data}
        targetKeys={targetKeys}
        onChange={setTargetKeys}
        render={(item) => (
          <div>
            <div className="font-medium">{item.title}</div>
            <div className="text-xs opacity-60">{item.description}</div>
          </div>
        )}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Transfer } from 'asterui'
// @example-imports: { useState } from 'react'
export function DisabledItemsTransferDemo() {
  // @example-include
  const [targetKeys, setTargetKeys] = useState<string[]>([])

  const data: TransferItem[] = [
    { key: '1', title: 'Available Item 1' },
    { key: '2', title: 'Disabled Item', disabled: true },
    { key: '3', title: 'Available Item 2' },
    { key: '4', title: 'Another Disabled', disabled: true },
    { key: '5', title: 'Available Item 3' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Transfer
        dataSource={data}
        targetKeys={targetKeys}
        onChange={setTargetKeys}
        render={(item) => item.title}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Transfer } from 'asterui'
// @example-imports: { useState } from 'react'
export function TitlesTransferDemo() {
  // @example-include
  const basicData: TransferItem[] = Array.from({ length: 10 }, (_, i) => ({
    key: `item-${i + 1}`,
    title: `Item ${i + 1}`,
    description: `Description of item ${i + 1}`,
  }))

  const [targetKeys, setTargetKeys] = useState<string[]>([])
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Transfer
        dataSource={basicData}
        targetKeys={targetKeys}
        onChange={setTargetKeys}
        render={(item) => item.title}
        titles={['Available', 'Selected']}
        showSearch
      />
      {/* @example-return-end */}
    </Demo>
  )
}
