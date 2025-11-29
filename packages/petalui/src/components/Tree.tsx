import React, { useState, useCallback, useMemo } from 'react'

export interface TreeDataNode {
  key: string
  title: React.ReactNode
  children?: TreeDataNode[]
  disabled?: boolean
  disableCheckbox?: boolean
  selectable?: boolean
  checkable?: boolean
  icon?: React.ReactNode
  isLeaf?: boolean
}

export interface TreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  treeData: TreeDataNode[]
  checkable?: boolean
  selectable?: boolean
  multiple?: boolean
  defaultExpandAll?: boolean
  defaultExpandedKeys?: string[]
  expandedKeys?: string[]
  defaultSelectedKeys?: string[]
  selectedKeys?: string[]
  defaultCheckedKeys?: string[]
  checkedKeys?: string[]
  onExpand?: (expandedKeys: string[], info: { node: TreeDataNode; expanded: boolean }) => void
  onSelect?: (selectedKeys: string[], info: { node: TreeDataNode; selected: boolean }) => void
  onCheck?: (checkedKeys: string[], info: { node: TreeDataNode; checked: boolean }) => void
  showLine?: boolean
  showIcon?: boolean
}

// Helper to get all keys from tree data
function getAllKeys(data: TreeDataNode[]): string[] {
  const keys: string[] = []
  const traverse = (nodes: TreeDataNode[]) => {
    nodes.forEach((node) => {
      keys.push(node.key)
      if (node.children) {
        traverse(node.children)
      }
    })
  }
  traverse(data)
  return keys
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

// Helper to get parent map
function getParentMap(data: TreeDataNode[]): Map<string, string | null> {
  const map = new Map<string, string | null>()
  const traverse = (nodes: TreeDataNode[], parentKey: string | null) => {
    nodes.forEach((node) => {
      map.set(node.key, parentKey)
      if (node.children) {
        traverse(node.children, node.key)
      }
    })
  }
  traverse(data, null)
  return map
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

interface TreeNodeProps {
  node: TreeDataNode
  level: number
  expanded: boolean
  selected: boolean
  checked: boolean
  indeterminate: boolean
  checkable: boolean
  selectable: boolean
  showLine: boolean
  showIcon: boolean
  onToggle: (key: string) => void
  onSelect: (key: string, node: TreeDataNode) => void
  onCheck: (key: string, node: TreeDataNode) => void
  renderChildren: (children: TreeDataNode[], level: number) => React.ReactNode
}

function TreeNode({
  node,
  level,
  expanded,
  selected,
  checked,
  indeterminate,
  checkable,
  selectable,
  showLine,
  showIcon,
  onToggle,
  onSelect,
  onCheck,
  renderChildren,
}: TreeNodeProps) {
  const hasChildren = node.children && node.children.length > 0
  const isLeaf = node.isLeaf ?? !hasChildren

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isLeaf) {
      onToggle(node.key)
    }
  }

  const handleSelect = () => {
    if (selectable && node.selectable !== false && !node.disabled) {
      onSelect(node.key, node)
    }
  }

  const handleCheck = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!node.disabled && !node.disableCheckbox) {
      onCheck(node.key, node)
    }
  }

  return (
    <div className="tree-node">
      <div
        className={[
          'flex items-center py-1 px-1 rounded cursor-pointer hover:bg-base-200 transition-colors',
          selected && 'bg-primary/10 text-primary',
          node.disabled && 'opacity-50 cursor-not-allowed',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ paddingLeft: `${level * 20}px` }}
        onClick={handleSelect}
      >
        {/* Expand/Collapse icon */}
        <span
          className={[
            'w-5 h-5 flex items-center justify-center flex-shrink-0',
            !isLeaf && 'cursor-pointer hover:bg-base-300 rounded',
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

        {/* Checkbox */}
        {checkable && node.checkable !== false && (
          <span className="mr-1 flex-shrink-0" onClick={handleCheck}>
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-primary"
              checked={checked}
              ref={(el) => {
                if (el) el.indeterminate = indeterminate
              }}
              disabled={node.disabled || node.disableCheckbox}
              onChange={() => {}}
            />
          </span>
        )}

        {/* Custom icon */}
        {showIcon && node.icon && <span className="mr-1 flex-shrink-0">{node.icon}</span>}

        {/* Title */}
        <span className="flex-1 truncate select-none">{node.title}</span>
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <div className={showLine ? 'border-l border-base-300 ml-2.5' : ''}>
          {renderChildren(node.children!, level + 1)}
        </div>
      )}
    </div>
  )
}

export function Tree({
  treeData,
  checkable = false,
  selectable = true,
  multiple = false,
  defaultExpandAll = false,
  defaultExpandedKeys = [],
  expandedKeys: controlledExpandedKeys,
  defaultSelectedKeys = [],
  selectedKeys: controlledSelectedKeys,
  defaultCheckedKeys = [],
  checkedKeys: controlledCheckedKeys,
  onExpand,
  onSelect,
  onCheck,
  showLine = false,
  showIcon = false,
  className = '',
  ...rest
}: TreeProps) {
  // Initialize expanded keys
  const initialExpandedKeys = useMemo(() => {
    if (defaultExpandAll) {
      return getAllKeys(treeData)
    }
    return defaultExpandedKeys
  }, [])

  const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>(initialExpandedKeys)
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(defaultSelectedKeys)
  const [internalCheckedKeys, setInternalCheckedKeys] = useState<string[]>(defaultCheckedKeys)

  const expandedKeys = controlledExpandedKeys ?? internalExpandedKeys
  const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys
  const checkedKeys = controlledCheckedKeys ?? internalCheckedKeys

  const parentMap = useMemo(() => getParentMap(treeData), [treeData])

  // Calculate indeterminate state for each node
  const getCheckedState = useCallback(
    (node: TreeDataNode): { checked: boolean; indeterminate: boolean } => {
      if (!node.children || node.children.length === 0) {
        return { checked: checkedKeys.includes(node.key), indeterminate: false }
      }

      const descendantKeys = getDescendantKeys(node)
      const checkedDescendants = descendantKeys.filter((k) => checkedKeys.includes(k))

      if (checkedDescendants.length === 0) {
        return { checked: checkedKeys.includes(node.key), indeterminate: false }
      }

      if (checkedDescendants.length === descendantKeys.length) {
        return { checked: true, indeterminate: false }
      }

      return { checked: false, indeterminate: true }
    },
    [checkedKeys]
  )

  const handleToggle = useCallback(
    (key: string) => {
      const node = findNode(treeData, key)
      const isExpanded = expandedKeys.includes(key)
      const newExpandedKeys = isExpanded
        ? expandedKeys.filter((k) => k !== key)
        : [...expandedKeys, key]

      if (controlledExpandedKeys === undefined) {
        setInternalExpandedKeys(newExpandedKeys)
      }

      onExpand?.(newExpandedKeys, { node: node!, expanded: !isExpanded })
    },
    [expandedKeys, controlledExpandedKeys, onExpand, treeData]
  )

  const handleSelect = useCallback(
    (key: string, node: TreeDataNode) => {
      let newSelectedKeys: string[]

      if (multiple) {
        if (selectedKeys.includes(key)) {
          newSelectedKeys = selectedKeys.filter((k) => k !== key)
        } else {
          newSelectedKeys = [...selectedKeys, key]
        }
      } else {
        newSelectedKeys = selectedKeys.includes(key) ? [] : [key]
      }

      if (controlledSelectedKeys === undefined) {
        setInternalSelectedKeys(newSelectedKeys)
      }

      onSelect?.(newSelectedKeys, { node, selected: newSelectedKeys.includes(key) })
    },
    [selectedKeys, multiple, controlledSelectedKeys, onSelect]
  )

  const handleCheck = useCallback(
    (key: string, node: TreeDataNode) => {
      const isChecked = checkedKeys.includes(key)
      let newCheckedKeys = [...checkedKeys]

      // Get all descendant keys
      const descendantKeys = getDescendantKeys(node)

      if (isChecked) {
        // Uncheck this node and all descendants
        newCheckedKeys = newCheckedKeys.filter(
          (k) => k !== key && !descendantKeys.includes(k)
        )
      } else {
        // Check this node and all descendants
        newCheckedKeys.push(key)
        descendantKeys.forEach((dk) => {
          if (!newCheckedKeys.includes(dk)) {
            newCheckedKeys.push(dk)
          }
        })
      }

      // Update parent states
      let currentKey: string | null = parentMap.get(key) ?? null
      while (currentKey) {
        const parentNode = findNode(treeData, currentKey)
        if (parentNode && parentNode.children) {
          const allChildrenChecked = parentNode.children.every(
            (child) =>
              newCheckedKeys.includes(child.key) ||
              getDescendantKeys(child).every((dk) => newCheckedKeys.includes(dk))
          )

          if (allChildrenChecked) {
            if (!newCheckedKeys.includes(currentKey)) {
              newCheckedKeys.push(currentKey)
            }
          } else {
            newCheckedKeys = newCheckedKeys.filter((k) => k !== currentKey)
          }
        }
        currentKey = parentMap.get(currentKey) ?? null
      }

      if (controlledCheckedKeys === undefined) {
        setInternalCheckedKeys(newCheckedKeys)
      }

      onCheck?.(newCheckedKeys, { node, checked: !isChecked })
    },
    [checkedKeys, controlledCheckedKeys, onCheck, parentMap, treeData]
  )

  const renderNodes = useCallback(
    (nodes: TreeDataNode[], level: number): React.ReactNode => {
      return nodes.map((node) => {
        const { checked, indeterminate } = getCheckedState(node)

        return (
          <TreeNode
            key={node.key}
            node={node}
            level={level}
            expanded={expandedKeys.includes(node.key)}
            selected={selectedKeys.includes(node.key)}
            checked={checked}
            indeterminate={indeterminate}
            checkable={checkable}
            selectable={selectable}
            showLine={showLine}
            showIcon={showIcon}
            onToggle={handleToggle}
            onSelect={handleSelect}
            onCheck={handleCheck}
            renderChildren={renderNodes}
          />
        )
      })
    },
    [
      expandedKeys,
      selectedKeys,
      checkable,
      selectable,
      showLine,
      showIcon,
      handleToggle,
      handleSelect,
      handleCheck,
      getCheckedState,
    ]
  )

  return <div className={`tree ${className}`} {...rest}>{renderNodes(treeData, 0)}</div>
}
