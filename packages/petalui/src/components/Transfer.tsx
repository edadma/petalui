import React, { useState, useCallback, useMemo } from 'react'

export interface TransferItem {
  key: string
  title: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
}

export interface TransferProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  dataSource: TransferItem[]
  targetKeys?: string[]
  defaultTargetKeys?: string[]
  onChange?: (targetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => void
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void
  titles?: [React.ReactNode, React.ReactNode]
  render?: (item: TransferItem) => React.ReactNode
  showSearch?: boolean
  filterOption?: (inputValue: string, item: TransferItem) => boolean
  showSelectAll?: boolean
  disabled?: boolean
  listStyle?: React.CSSProperties
}

interface TransferListProps {
  items: TransferItem[]
  selectedKeys: string[]
  onSelectChange: (keys: string[]) => void
  title: React.ReactNode
  showSearch: boolean
  filterOption: (inputValue: string, item: TransferItem) => boolean
  render: (item: TransferItem) => React.ReactNode
  showSelectAll: boolean
  disabled: boolean
  listStyle?: React.CSSProperties
  direction: 'left' | 'right'
}

function TransferList({
  items,
  selectedKeys,
  onSelectChange,
  title,
  showSearch,
  filterOption,
  render,
  showSelectAll,
  disabled,
  listStyle,
}: TransferListProps) {
  const [searchValue, setSearchValue] = useState('')

  const filteredItems = useMemo(() => {
    if (!searchValue) return items
    return items.filter((item) => filterOption(searchValue, item))
  }, [items, searchValue, filterOption])

  const enabledItems = filteredItems.filter((item) => !item.disabled)
  const allSelected = enabledItems.length > 0 && enabledItems.every((item) => selectedKeys.includes(item.key))
  const someSelected = enabledItems.some((item) => selectedKeys.includes(item.key))

  const handleSelectAll = () => {
    if (disabled) return

    if (allSelected) {
      // Deselect all enabled items
      onSelectChange(selectedKeys.filter((key) => !enabledItems.some((item) => item.key === key)))
    } else {
      // Select all enabled items
      const enabledKeys = enabledItems.map((item) => item.key)
      const newKeys = [...new Set([...selectedKeys, ...enabledKeys])]
      onSelectChange(newKeys)
    }
  }

  const handleSelectItem = (key: string, itemDisabled: boolean) => {
    if (disabled || itemDisabled) return

    if (selectedKeys.includes(key)) {
      onSelectChange(selectedKeys.filter((k) => k !== key))
    } else {
      onSelectChange([...selectedKeys, key])
    }
  }

  return (
    <div
      className="flex flex-col border border-base-300 rounded-lg bg-base-100 overflow-hidden"
      style={{ width: 200, height: 300, ...listStyle }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-base-300 bg-base-200">
        {showSelectAll && (
          <input
            type="checkbox"
            className="checkbox checkbox-sm checkbox-primary"
            checked={allSelected}
            ref={(el) => {
              if (el) el.indeterminate = someSelected && !allSelected
            }}
            onChange={handleSelectAll}
            disabled={disabled || enabledItems.length === 0}
          />
        )}
        <span className="flex-1 font-medium text-sm truncate">{title}</span>
        <span className="text-xs text-base-content/50">
          {selectedKeys.filter((k) => filteredItems.some((item) => item.key === k)).length}/
          {filteredItems.length}
        </span>
      </div>

      {/* Search */}
      {showSearch && (
        <div className="px-2 py-2 border-b border-base-300">
          <input
            type="text"
            className="input input-bordered input-sm w-full"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            disabled={disabled}
          />
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-auto">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.key}
              className={[
                'flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-base-200 transition-colors',
                selectedKeys.includes(item.key) && 'bg-primary/10',
                (disabled || item.disabled) && 'opacity-50 cursor-not-allowed',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleSelectItem(item.key, !!item.disabled)}
            >
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-primary"
                checked={selectedKeys.includes(item.key)}
                disabled={disabled || item.disabled}
                onChange={() => {}}
              />
              <span className="flex-1 truncate text-sm">{render(item)}</span>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-base-content/50 text-sm">
            No data
          </div>
        )}
      </div>
    </div>
  )
}

export function Transfer({
  dataSource,
  targetKeys: controlledTargetKeys,
  defaultTargetKeys = [],
  onChange,
  onSelectChange,
  titles = ['Source', 'Target'],
  render = (item) => item.title,
  showSearch = false,
  filterOption = (inputValue, item) => {
    const title = typeof item.title === 'string' ? item.title : String(item.title)
    return title.toLowerCase().includes(inputValue.toLowerCase())
  },
  showSelectAll = true,
  disabled = false,
  listStyle,
  className = '',
  ...rest
}: TransferProps) {
  const [internalTargetKeys, setInternalTargetKeys] = useState<string[]>(defaultTargetKeys)
  const [sourceSelectedKeys, setSourceSelectedKeys] = useState<string[]>([])
  const [targetSelectedKeys, setTargetSelectedKeys] = useState<string[]>([])

  const targetKeys = controlledTargetKeys ?? internalTargetKeys

  // Split items into source and target
  const sourceItems = useMemo(
    () => dataSource.filter((item) => !targetKeys.includes(item.key)),
    [dataSource, targetKeys]
  )

  const targetItems = useMemo(
    () => dataSource.filter((item) => targetKeys.includes(item.key)),
    [dataSource, targetKeys]
  )

  const handleSourceSelectChange = useCallback(
    (keys: string[]) => {
      setSourceSelectedKeys(keys)
      onSelectChange?.(keys, targetSelectedKeys)
    },
    [targetSelectedKeys, onSelectChange]
  )

  const handleTargetSelectChange = useCallback(
    (keys: string[]) => {
      setTargetSelectedKeys(keys)
      onSelectChange?.(sourceSelectedKeys, keys)
    },
    [sourceSelectedKeys, onSelectChange]
  )

  const moveToTarget = useCallback(() => {
    if (disabled || sourceSelectedKeys.length === 0) return

    // Filter out disabled items
    const movableKeys = sourceSelectedKeys.filter((key) => {
      const item = dataSource.find((i) => i.key === key)
      return item && !item.disabled
    })

    if (movableKeys.length === 0) return

    const newTargetKeys = [...targetKeys, ...movableKeys]

    if (controlledTargetKeys === undefined) {
      setInternalTargetKeys(newTargetKeys)
    }

    setSourceSelectedKeys([])
    onChange?.(newTargetKeys, 'right', movableKeys)
  }, [disabled, sourceSelectedKeys, targetKeys, controlledTargetKeys, onChange, dataSource])

  const moveToSource = useCallback(() => {
    if (disabled || targetSelectedKeys.length === 0) return

    // Filter out disabled items
    const movableKeys = targetSelectedKeys.filter((key) => {
      const item = dataSource.find((i) => i.key === key)
      return item && !item.disabled
    })

    if (movableKeys.length === 0) return

    const newTargetKeys = targetKeys.filter((key) => !movableKeys.includes(key))

    if (controlledTargetKeys === undefined) {
      setInternalTargetKeys(newTargetKeys)
    }

    setTargetSelectedKeys([])
    onChange?.(newTargetKeys, 'left', movableKeys)
  }, [disabled, targetSelectedKeys, targetKeys, controlledTargetKeys, onChange, dataSource])

  const canMoveToTarget = sourceSelectedKeys.some((key) => {
    const item = dataSource.find((i) => i.key === key)
    return item && !item.disabled
  })

  const canMoveToSource = targetSelectedKeys.some((key) => {
    const item = dataSource.find((i) => i.key === key)
    return item && !item.disabled
  })

  return (
    <div className={`flex items-center gap-4 ${className}`} {...rest}>
      {/* Source list */}
      <TransferList
        items={sourceItems}
        selectedKeys={sourceSelectedKeys}
        onSelectChange={handleSourceSelectChange}
        title={titles[0]}
        showSearch={showSearch}
        filterOption={filterOption}
        render={render}
        showSelectAll={showSelectAll}
        disabled={disabled}
        listStyle={listStyle}
        direction="left"
      />

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          className="btn btn-sm btn-outline"
          onClick={moveToTarget}
          disabled={disabled || !canMoveToTarget}
          aria-label="Move to target"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline"
          onClick={moveToSource}
          disabled={disabled || !canMoveToSource}
          aria-label="Move to source"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Target list */}
      <TransferList
        items={targetItems}
        selectedKeys={targetSelectedKeys}
        onSelectChange={handleTargetSelectChange}
        title={titles[1]}
        showSearch={showSearch}
        filterOption={filterOption}
        render={render}
        showSelectAll={showSelectAll}
        disabled={disabled}
        listStyle={listStyle}
        direction="right"
      />
    </div>
  )
}
