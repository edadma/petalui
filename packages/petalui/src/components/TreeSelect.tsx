import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import type { TreeDataNode } from './Tree'

export interface TreeSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  treeData: TreeDataNode[]
  value?: string | string[]
  defaultValue?: string | string[]
  onChange?: (value: string | string[], labels: React.ReactNode[]) => void
  multiple?: boolean
  treeCheckable?: boolean
  showSearch?: boolean
  placeholder?: string
  allowClear?: boolean
  disabled?: boolean
  treeDefaultExpandAll?: boolean
  treeDefaultExpandedKeys?: string[]
  treeExpandedKeys?: string[]
  onTreeExpand?: (expandedKeys: string[]) => void
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

// Helper to flatten tree data for search
function flattenTree(
  data: TreeDataNode[],
  parentPath: React.ReactNode[] = []
): Array<{ node: TreeDataNode; path: React.ReactNode[] }> {
  const result: Array<{ node: TreeDataNode; path: React.ReactNode[] }> = []

  data.forEach((node) => {
    const currentPath = [...parentPath, node.title]
    result.push({ node, path: currentPath })
    if (node.children) {
      result.push(...flattenTree(node.children, currentPath))
    }
  })

  return result
}

// Helper to get all keys
function getAllKeys(data: TreeDataNode[]): string[] {
  const keys: string[] = []
  const traverse = (nodes: TreeDataNode[]) => {
    nodes.forEach((node) => {
      keys.push(node.key)
      if (node.children) traverse(node.children)
    })
  }
  traverse(data)
  return keys
}

// Helper to find node by key
function findNode(data: TreeDataNode[], key: string): TreeDataNode | null {
  for (const node of data) {
    if (node.key === key) return node
    if (node.children) {
      const found = findNode(node.children, key)
      if (found) return found
    }
  }
  return null
}

// Helper to get all descendant keys
function getDescendantKeys(node: TreeDataNode): string[] {
  const keys: string[] = []
  const traverse = (n: TreeDataNode) => {
    if (n.children) {
      n.children.forEach((child) => {
        keys.push(child.key)
        traverse(child)
      })
    }
  }
  traverse(node)
  return keys
}

interface TreeSelectNodeProps {
  node: TreeDataNode
  level: number
  expanded: boolean
  selected: boolean
  checked: boolean
  indeterminate: boolean
  treeCheckable: boolean
  onToggle: (key: string) => void
  onSelect: (key: string, node: TreeDataNode) => void
  onCheck: (key: string, node: TreeDataNode) => void
  renderChildren: (children: TreeDataNode[], level: number) => React.ReactNode
}

function TreeSelectNode({
  node,
  level,
  expanded,
  selected,
  checked,
  indeterminate,
  treeCheckable,
  onToggle,
  onSelect,
  onCheck,
  renderChildren,
}: TreeSelectNodeProps) {
  const hasChildren = node.children && node.children.length > 0
  const isLeaf = node.isLeaf ?? !hasChildren

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isLeaf) {
      onToggle(node.key)
    }
  }

  const handleSelect = () => {
    if (!node.disabled) {
      if (treeCheckable) {
        onCheck(node.key, node)
      } else {
        onSelect(node.key, node)
      }
    }
  }

  const handleCheck = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!node.disabled) {
      onCheck(node.key, node)
    }
  }

  return (
    <div className="tree-select-node">
      <div
        className={[
          'flex items-center py-1.5 px-2 cursor-pointer hover:bg-base-200 transition-colors',
          (selected || checked) && 'bg-primary/10 text-primary',
          node.disabled && 'opacity-50 cursor-not-allowed',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleSelect}
      >
        {/* Expand/Collapse icon */}
        <span
          className={[
            'w-4 h-4 flex items-center justify-center flex-shrink-0 mr-1',
            !isLeaf && 'cursor-pointer',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={handleToggle}
        >
          {!isLeaf && (
            <svg
              className={`w-3 h-3 transition-transform ${expanded ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </span>

        {/* Checkbox for treeCheckable mode */}
        {treeCheckable && (
          <span className="mr-2 flex-shrink-0" onClick={handleCheck}>
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-primary"
              checked={checked}
              ref={(el) => {
                if (el) el.indeterminate = indeterminate
              }}
              disabled={node.disabled}
              onChange={() => {}}
            />
          </span>
        )}

        {/* Title */}
        <span className="flex-1 truncate select-none text-sm">{node.title}</span>
      </div>

      {/* Children */}
      {hasChildren && expanded && renderChildren(node.children!, level + 1)}
    </div>
  )
}

export function TreeSelect({
  treeData,
  value: controlledValue,
  defaultValue = [],
  onChange,
  multiple = false,
  treeCheckable = false,
  showSearch = false,
  placeholder = 'Please select',
  allowClear = true,
  disabled = false,
  treeDefaultExpandAll = false,
  treeDefaultExpandedKeys = [],
  treeExpandedKeys: controlledExpandedKeys,
  onTreeExpand,
  size = 'md',
  className = '',
  ...rest
}: TreeSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Normalize value to array
  const normalizeValue = (val: string | string[] | undefined): string[] => {
    if (val === undefined) return []
    return Array.isArray(val) ? val : [val]
  }

  const initialValue = normalizeValue(defaultValue)
  const [internalValue, setInternalValue] = useState<string[]>(initialValue)

  const value = controlledValue !== undefined ? normalizeValue(controlledValue) : internalValue

  // Expanded keys
  const initialExpandedKeys = useMemo(() => {
    if (treeDefaultExpandAll) return getAllKeys(treeData)
    return treeDefaultExpandedKeys
  }, [])

  const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>(initialExpandedKeys)
  const expandedKeys = controlledExpandedKeys ?? internalExpandedKeys

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setSearchValue('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter tree data based on search
  const filteredData = useMemo(() => {
    if (!searchValue) return treeData

    const flatNodes = flattenTree(treeData)
    const matchingKeys = new Set<string>()

    flatNodes.forEach(({ node }) => {
      const titleStr =
        typeof node.title === 'string' ? node.title : String(node.title)
      if (titleStr.toLowerCase().includes(searchValue.toLowerCase())) {
        matchingKeys.add(node.key)
      }
    })

    // Include parent keys of matching nodes
    const filterTree = (nodes: TreeDataNode[]): TreeDataNode[] => {
      return nodes
        .map((node) => {
          const hasMatchingChildren =
            node.children && filterTree(node.children).length > 0
          const isMatch = matchingKeys.has(node.key)

          if (isMatch || hasMatchingChildren) {
            return {
              ...node,
              children: node.children ? filterTree(node.children) : undefined,
            }
          }
          return null
        })
        .filter(Boolean) as TreeDataNode[]
    }

    return filterTree(treeData)
  }, [treeData, searchValue])

  const handleToggle = useCallback(
    (key: string) => {
      const newKeys = expandedKeys.includes(key)
        ? expandedKeys.filter((k) => k !== key)
        : [...expandedKeys, key]

      if (controlledExpandedKeys === undefined) {
        setInternalExpandedKeys(newKeys)
      }
      onTreeExpand?.(newKeys)
    },
    [expandedKeys, controlledExpandedKeys, onTreeExpand]
  )

  const handleSelect = useCallback(
    (key: string, _node: TreeDataNode) => {
      let newValue: string[]

      if (multiple) {
        if (value.includes(key)) {
          newValue = value.filter((k) => k !== key)
        } else {
          newValue = [...value, key]
        }
      } else {
        newValue = [key]
        setIsOpen(false)
        setSearchValue('')
      }

      if (controlledValue === undefined) {
        setInternalValue(newValue)
      }

      const labels = newValue.map((k) => findNode(treeData, k)?.title || k)
      onChange?.(multiple ? newValue : newValue[0] || '', labels)
    },
    [value, multiple, controlledValue, onChange, treeData]
  )

  const handleCheck = useCallback(
    (key: string, node: TreeDataNode) => {
      const isChecked = value.includes(key)
      let newValue = [...value]
      const descendantKeys = getDescendantKeys(node)

      if (isChecked) {
        newValue = newValue.filter((k) => k !== key && !descendantKeys.includes(k))
      } else {
        newValue.push(key)
        descendantKeys.forEach((dk) => {
          if (!newValue.includes(dk)) newValue.push(dk)
        })
      }

      if (controlledValue === undefined) {
        setInternalValue(newValue)
      }

      const labels = newValue.map((k) => findNode(treeData, k)?.title || k)
      onChange?.(newValue, labels)
    },
    [value, controlledValue, onChange, treeData]
  )

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newValue: string[] = []

    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }

    onChange?.(multiple ? newValue : '', [])
  }

  const removeTag = (key: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newValue = value.filter((k) => k !== key)

    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }

    const labels = newValue.map((k) => findNode(treeData, k)?.title || k)
    onChange?.(multiple ? newValue : newValue[0] || '', labels)
  }

  const getCheckedState = useCallback(
    (node: TreeDataNode): { checked: boolean; indeterminate: boolean } => {
      if (!node.children || node.children.length === 0) {
        return { checked: value.includes(node.key), indeterminate: false }
      }

      const descendantKeys = getDescendantKeys(node)
      const checkedDescendants = descendantKeys.filter((k) => value.includes(k))

      if (checkedDescendants.length === 0) {
        return { checked: value.includes(node.key), indeterminate: false }
      }

      if (checkedDescendants.length === descendantKeys.length) {
        return { checked: true, indeterminate: false }
      }

      return { checked: false, indeterminate: true }
    },
    [value]
  )

  const renderNodes = useCallback(
    (nodes: TreeDataNode[], level: number): React.ReactNode => {
      return nodes.map((node) => {
        const { checked, indeterminate } = getCheckedState(node)

        return (
          <TreeSelectNode
            key={node.key}
            node={node}
            level={level}
            expanded={expandedKeys.includes(node.key)}
            selected={value.includes(node.key)}
            checked={checked}
            indeterminate={indeterminate}
            treeCheckable={treeCheckable}
            onToggle={handleToggle}
            onSelect={handleSelect}
            onCheck={handleCheck}
            renderChildren={renderNodes}
          />
        )
      })
    },
    [expandedKeys, value, treeCheckable, handleToggle, handleSelect, handleCheck, getCheckedState]
  )

  // Display value
  const displayValue = useMemo(() => {
    if (value.length === 0) return null

    if (multiple || treeCheckable) {
      return value.map((key) => {
        const node = findNode(treeData, key)
        return (
          <span
            key={key}
            className="inline-flex items-center gap-1 px-2 py-0.5 bg-base-200 rounded text-sm mr-1 mb-1"
          >
            {node?.title || key}
            <button
              type="button"
              className="hover:text-error"
              onClick={(e) => removeTag(key, e)}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        )
      })
    }

    const node = findNode(treeData, value[0])
    return node?.title || value[0]
  }, [value, treeData, multiple, treeCheckable])

  const sizeClasses = {
    xs: 'min-h-6 text-xs',
    sm: 'min-h-8 text-sm',
    md: 'min-h-10 text-base',
    lg: 'min-h-12 text-lg',
  }

  return (
    <div ref={containerRef} className={`relative ${className}`} data-state={isOpen ? 'open' : 'closed'} {...rest}>
      {/* Trigger */}
      <div
        className={[
          'input input-bordered flex items-center gap-2 cursor-pointer flex-wrap',
          sizeClasses[size],
          disabled && 'input-disabled opacity-50 cursor-not-allowed',
          isOpen && 'input-primary',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex-1 flex flex-wrap items-center gap-1 min-w-0">
          {displayValue || (
            <span className="text-base-content/50">{placeholder}</span>
          )}
        </div>

        {/* Clear button */}
        {allowClear && value.length > 0 && !disabled && (
          <button
            type="button"
            className="hover:text-error flex-shrink-0"
            onClick={handleClear}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Dropdown arrow */}
        <svg
          className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-64 overflow-auto">
          {/* Search input */}
          {showSearch && (
            <div className="p-2 border-b border-base-300">
              <input
                ref={inputRef}
                type="text"
                className="input input-bordered input-sm w-full"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          )}

          {/* Tree */}
          <div className="py-1">
            {filteredData.length > 0 ? (
              renderNodes(filteredData, 0)
            ) : (
              <div className="px-4 py-2 text-base-content/50 text-sm text-center">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
