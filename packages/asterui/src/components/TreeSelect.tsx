import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  forwardRef,
  useId,
} from 'react'
import type { TreeDataNode } from './Tree'

export type TreeSelectSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type TreeSelectColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
export type TreeSelectStatus = 'error' | 'warning'
export type TreeSelectVariant = 'outlined' | 'filled' | 'borderless'
export type ShowCheckedStrategy = 'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD'

// Static strategy constants
const SHOW_ALL: ShowCheckedStrategy = 'SHOW_ALL'
const SHOW_PARENT: ShowCheckedStrategy = 'SHOW_PARENT'
const SHOW_CHILD: ShowCheckedStrategy = 'SHOW_CHILD'

export interface TreeSelectFieldNames {
  label?: string
  value?: string
  children?: string
}

/** Value type when labelInValue is true */
export interface LabeledValue {
  value: string
  label: React.ReactNode
}

export interface TreeSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  treeData: TreeDataNode[]
  value?: string | string[] | LabeledValue | LabeledValue[]
  defaultValue?: string | string[] | LabeledValue | LabeledValue[]
  onChange?: (
    value: string | string[] | LabeledValue | LabeledValue[],
    labels: React.ReactNode[],
    extra?: { triggerValue: string; triggerNode: TreeDataNode }
  ) => void
  multiple?: boolean
  treeCheckable?: boolean
  treeCheckStrictly?: boolean
  showCheckedStrategy?: ShowCheckedStrategy
  showSearch?: boolean
  searchValue?: string
  onSearch?: (value: string) => void
  filterTreeNode?: (searchValue: string, node: TreeDataNode) => boolean
  placeholder?: string
  allowClear?: boolean
  disabled?: boolean
  treeDefaultExpandAll?: boolean
  treeDefaultExpandedKeys?: string[]
  treeExpandedKeys?: string[]
  onTreeExpand?: (expandedKeys: string[]) => void
  size?: TreeSelectSize
  color?: TreeSelectColor
  status?: TreeSelectStatus
  /** Visual variant style */
  variant?: TreeSelectVariant
  /** Ghost style with no background */
  ghost?: boolean
  /** Maximum number of tags to show (multiple/treeCheckable mode) */
  maxTagCount?: number | 'responsive'
  maxTagPlaceholder?: React.ReactNode | ((omittedValues: string[]) => React.ReactNode)
  /** Maximum number of selections allowed */
  maxCount?: number
  /** Return object with value and label instead of just value */
  labelInValue?: boolean
  /** Custom tag render function */
  tagRender?: (props: {
    label: React.ReactNode
    value: string
    closable: boolean
    onClose: () => void
  }) => React.ReactNode
  treeLine?: boolean
  /** Show tree node icon */
  treeIcon?: boolean
  loadData?: (node: TreeDataNode) => Promise<void>
  fieldNames?: TreeSelectFieldNames
  open?: boolean
  onDropdownVisibleChange?: (open: boolean) => void
  suffixIcon?: React.ReactNode
  switcherIcon?: React.ReactNode | ((props: { expanded: boolean }) => React.ReactNode)
  notFoundContent?: React.ReactNode
  dropdownRender?: (menu: React.ReactNode) => React.ReactNode
  popupClassName?: string
  'data-testid'?: string
}

// Helper to get field value based on fieldNames
function getFieldValue(
  node: TreeDataNode,
  field: 'title' | 'key' | 'children',
  fieldNames?: TreeSelectFieldNames
): unknown {
  if (field === 'title') {
    const labelField = fieldNames?.label || 'title'
    return (node as unknown as Record<string, unknown>)[labelField]
  }
  if (field === 'key') {
    const valueField = fieldNames?.value || 'key'
    return (node as unknown as Record<string, unknown>)[valueField]
  }
  if (field === 'children') {
    const childrenField = fieldNames?.children || 'children'
    return (node as unknown as Record<string, unknown>)[childrenField]
  }
  return undefined
}

// Helper to flatten tree data for search
function flattenTree(
  data: TreeDataNode[],
  parentPath: React.ReactNode[] = [],
  fieldNames?: TreeSelectFieldNames
): Array<{ node: TreeDataNode; path: React.ReactNode[] }> {
  const result: Array<{ node: TreeDataNode; path: React.ReactNode[] }> = []

  data.forEach((node) => {
    const title = getFieldValue(node, 'title', fieldNames) as React.ReactNode
    const children = getFieldValue(node, 'children', fieldNames) as TreeDataNode[] | undefined
    const currentPath = [...parentPath, title]
    result.push({ node, path: currentPath })
    if (children) {
      result.push(...flattenTree(children, currentPath, fieldNames))
    }
  })

  return result
}

// Helper to get all keys
function getAllKeys(data: TreeDataNode[], fieldNames?: TreeSelectFieldNames): string[] {
  const keys: string[] = []
  const traverse = (nodes: TreeDataNode[]) => {
    nodes.forEach((node) => {
      const key = getFieldValue(node, 'key', fieldNames) as string
      const children = getFieldValue(node, 'children', fieldNames) as TreeDataNode[] | undefined
      keys.push(key)
      if (children) traverse(children)
    })
  }
  traverse(data)
  return keys
}

// Helper to find node by key
function findNode(
  data: TreeDataNode[],
  key: string,
  fieldNames?: TreeSelectFieldNames
): TreeDataNode | null {
  for (const node of data) {
    const nodeKey = getFieldValue(node, 'key', fieldNames) as string
    const children = getFieldValue(node, 'children', fieldNames) as TreeDataNode[] | undefined
    if (nodeKey === key) return node
    if (children) {
      const found = findNode(children, key, fieldNames)
      if (found) return found
    }
  }
  return null
}

// Helper to get all descendant keys
function getDescendantKeys(node: TreeDataNode, fieldNames?: TreeSelectFieldNames): string[] {
  const keys: string[] = []
  const traverse = (n: TreeDataNode) => {
    const children = getFieldValue(n, 'children', fieldNames) as TreeDataNode[] | undefined
    if (children) {
      children.forEach((child) => {
        const childKey = getFieldValue(child, 'key', fieldNames) as string
        keys.push(childKey)
        traverse(child)
      })
    }
  }
  traverse(node)
  return keys
}

// Helper to get parent keys for a node
function getParentKeys(
  data: TreeDataNode[],
  targetKey: string,
  fieldNames?: TreeSelectFieldNames,
  parentKeys: string[] = []
): string[] | null {
  for (const node of data) {
    const nodeKey = getFieldValue(node, 'key', fieldNames) as string
    const children = getFieldValue(node, 'children', fieldNames) as TreeDataNode[] | undefined
    if (nodeKey === targetKey) return parentKeys
    if (children) {
      const found = getParentKeys(children, targetKey, fieldNames, [...parentKeys, nodeKey])
      if (found) return found
    }
  }
  return null
}

interface TreeSelectNodeProps {
  node: TreeDataNode
  level: number
  expanded: boolean
  selected: boolean
  checked: boolean
  indeterminate: boolean
  treeCheckable: boolean
  treeLine: boolean
  treeIcon: boolean
  focused: boolean
  loading: boolean
  baseTestId: string
  id: string
  fieldNames?: TreeSelectFieldNames
  switcherIcon?: React.ReactNode | ((props: { expanded: boolean }) => React.ReactNode)
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
  treeLine,
  treeIcon: showTreeIcon,
  focused,
  loading,
  baseTestId,
  id,
  fieldNames,
  switcherIcon,
  onToggle,
  onSelect,
  onCheck,
  renderChildren,
}: TreeSelectNodeProps) {
  const children = getFieldValue(node, 'children', fieldNames) as TreeDataNode[] | undefined
  const title = getFieldValue(node, 'title', fieldNames) as React.ReactNode
  const key = getFieldValue(node, 'key', fieldNames) as string
  const nodeIcon = node.icon
  const hasChildren = children && children.length > 0
  const isLeaf = node.isLeaf ?? !hasChildren

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isLeaf) {
      onToggle(key)
    }
  }

  const handleSelect = () => {
    if (!node.disabled) {
      if (treeCheckable) {
        onCheck(key, node)
      } else {
        onSelect(key, node)
      }
    }
  }

  const handleCheck = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!node.disabled) {
      onCheck(key, node)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleSelect()
    }
  }

  const renderSwitcherIcon = () => {
    if (loading) {
      return (
        <span className="loading loading-spinner loading-xs" />
      )
    }

    if (switcherIcon) {
      if (typeof switcherIcon === 'function') {
        return switcherIcon({ expanded })
      }
      return switcherIcon
    }

    return (
      <svg
        className={`w-3 h-3 transition-transform ${expanded ? 'rotate-90' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    )
  }

  return (
    <div
      className="tree-select-node"
      role="treeitem"
      id={id}
      aria-selected={selected || checked}
      aria-expanded={hasChildren ? expanded : undefined}
      data-testid={`${baseTestId}-option-${key}`}
      data-state={selected || checked ? 'selected' : 'unselected'}
      data-disabled={node.disabled || undefined}
    >
      <div
        className={[
          'flex items-center py-1.5 px-2 cursor-pointer hover:bg-base-200 transition-colors outline-none',
          (selected || checked) && 'bg-primary/10 text-primary',
          node.disabled && 'opacity-50 cursor-not-allowed',
          focused && 'ring-2 ring-primary ring-inset',
          treeLine && level > 0 && 'border-l border-base-300 ml-2',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleSelect}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
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
          aria-hidden="true"
        >
          {!isLeaf && renderSwitcherIcon()}
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
              onChange={handleSelect}
              aria-label={typeof title === 'string' ? title : undefined}
              tabIndex={-1}
            />
          </span>
        )}

        {/* Node icon */}
        {showTreeIcon && nodeIcon && (
          <span className="mr-1.5 flex-shrink-0 flex items-center">{nodeIcon}</span>
        )}

        {/* Title */}
        <span className="flex-1 truncate select-none text-sm">{title}</span>
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <div role="group">{renderChildren(children!, level + 1)}</div>
      )}
    </div>
  )
}

const sizeClasses: Record<TreeSelectSize, string> = {
  xs: 'min-h-6 text-xs',
  sm: 'min-h-8 text-sm',
  md: 'min-h-10 text-base',
  lg: 'min-h-12 text-lg',
  xl: 'min-h-14 text-xl',
}

const colorClasses: Record<TreeSelectColor, string> = {
  primary: 'border-primary focus-within:border-primary',
  secondary: 'border-secondary focus-within:border-secondary',
  accent: 'border-accent focus-within:border-accent',
  neutral: 'border-neutral focus-within:border-neutral',
  info: 'border-info focus-within:border-info',
  success: 'border-success focus-within:border-success',
  warning: 'border-warning focus-within:border-warning',
  error: 'border-error focus-within:border-error',
}

const statusClasses: Record<TreeSelectStatus, string> = {
  error: 'border-error focus-within:border-error',
  warning: 'border-warning focus-within:border-warning',
}

const variantClasses: Record<TreeSelectVariant, string> = {
  outlined: 'border border-base-300',
  filled: 'bg-base-200 border-transparent',
  borderless: 'border-transparent',
}

export const TreeSelect = forwardRef<HTMLDivElement, TreeSelectProps>(
  (
    {
      treeData,
      value: controlledValue,
      defaultValue = [],
      onChange,
      multiple = false,
      treeCheckable = false,
      treeCheckStrictly = false,
      showCheckedStrategy = 'SHOW_ALL',
      showSearch = false,
      searchValue: controlledSearchValue,
      onSearch,
      filterTreeNode,
      placeholder = 'Please select',
      allowClear = true,
      disabled = false,
      treeDefaultExpandAll = false,
      treeDefaultExpandedKeys = [],
      treeExpandedKeys: controlledExpandedKeys,
      onTreeExpand,
      size = 'md',
      color,
      status,
      variant = 'outlined',
      ghost = false,
      maxTagCount,
      maxTagPlaceholder,
      maxCount,
      labelInValue = false,
      tagRender,
      treeLine = false,
      treeIcon = false,
      loadData,
      fieldNames,
      open: controlledOpen,
      onDropdownVisibleChange,
      suffixIcon,
      switcherIcon,
      notFoundContent = 'No results found',
      dropdownRender,
      popupClassName = '',
      className = '',
      'data-testid': testId,
      ...rest
    },
    ref
  ) => {
    const baseTestId = testId ?? 'treeselect'
    const instanceId = useId()
    const listboxId = `${instanceId}-listbox`
    const [isOpen, setIsOpen] = useState(false)
    const [internalSearchValue, setInternalSearchValue] = useState('')
    const [focusedKey, setFocusedKey] = useState<string | null>(null)
    const [loadingKeys, setLoadingKeys] = useState<Set<string>>(new Set())
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const triggerRef = useRef<HTMLDivElement>(null)

    const searchValue = controlledSearchValue ?? internalSearchValue
    const open = controlledOpen ?? isOpen

    // Normalize value to array - handle labelInValue format
    const normalizeValue = (val: string | string[] | LabeledValue | LabeledValue[] | undefined): string[] => {
      if (val === undefined) return []
      if (Array.isArray(val)) {
        return val.map((v) => (typeof v === 'object' && v !== null ? v.value : v))
      }
      if (typeof val === 'object' && val !== null) {
        return [(val as LabeledValue).value]
      }
      return [val as string]
    }

    const initialValue = normalizeValue(defaultValue)
    const [internalValue, setInternalValue] = useState<string[]>(initialValue)

    const value = controlledValue !== undefined ? normalizeValue(controlledValue) : internalValue

    // Expanded keys
    const initialExpandedKeys = useMemo(() => {
      if (treeDefaultExpandAll) return getAllKeys(treeData, fieldNames)
      return treeDefaultExpandedKeys
    }, [treeData, treeDefaultExpandAll, treeDefaultExpandedKeys, fieldNames])

    const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>(initialExpandedKeys)
    const expandedKeys = controlledExpandedKeys ?? internalExpandedKeys

    // Get flattened visible nodes for keyboard navigation
    const visibleNodes = useMemo(() => {
      const nodes: { key: string; node: TreeDataNode }[] = []
      const traverse = (data: TreeDataNode[]) => {
        data.forEach((node) => {
          const key = getFieldValue(node, 'key', fieldNames) as string
          const children = getFieldValue(node, 'children', fieldNames) as
            | TreeDataNode[]
            | undefined
          nodes.push({ key, node })
          if (children && expandedKeys.includes(key)) {
            traverse(children)
          }
        })
      }
      traverse(treeData)
      return nodes
    }, [treeData, expandedKeys, fieldNames])

    const setOpen = useCallback(
      (newOpen: boolean) => {
        if (controlledOpen === undefined) {
          setIsOpen(newOpen)
        }
        onDropdownVisibleChange?.(newOpen)
      },
      [controlledOpen, onDropdownVisibleChange]
    )

    // Close on click outside
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false)
          if (controlledSearchValue === undefined) {
            setInternalSearchValue('')
          }
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [setOpen, controlledSearchValue])

    // Focus management
    useEffect(() => {
      if (open && showSearch && inputRef.current) {
        inputRef.current.focus()
      } else if (open && triggerRef.current) {
        triggerRef.current.focus()
      }
    }, [open, showSearch])

    // Initialize focused key when opening
    useEffect(() => {
      if (open && visibleNodes.length > 0) {
        if (value.length > 0) {
          setFocusedKey(value[0])
        } else {
          setFocusedKey(visibleNodes[0].key)
        }
      } else if (!open) {
        setFocusedKey(null)
      }
    }, [open, visibleNodes, value])

    // Filter tree data based on search
    const filteredData = useMemo(() => {
      if (!searchValue) return treeData

      const flatNodes = flattenTree(treeData, [], fieldNames)
      const matchingKeys = new Set<string>()

      flatNodes.forEach(({ node }) => {
        const title = getFieldValue(node, 'title', fieldNames)
        const key = getFieldValue(node, 'key', fieldNames) as string

        let isMatch = false
        if (filterTreeNode) {
          isMatch = filterTreeNode(searchValue, node)
        } else {
          const titleStr = typeof title === 'string' ? title : String(title)
          isMatch = titleStr.toLowerCase().includes(searchValue.toLowerCase())
        }

        if (isMatch) {
          matchingKeys.add(key)
        }
      })

      // Include parent keys of matching nodes
      const filterTree = (nodes: TreeDataNode[]): TreeDataNode[] => {
        return nodes
          .map((node) => {
            const children = getFieldValue(node, 'children', fieldNames) as
              | TreeDataNode[]
              | undefined
            const key = getFieldValue(node, 'key', fieldNames) as string
            const hasMatchingChildren = children && filterTree(children).length > 0
            const isMatch = matchingKeys.has(key)

            if (isMatch || hasMatchingChildren) {
              return {
                ...node,
                children: children ? filterTree(children) : undefined,
              }
            }
            return null
          })
          .filter(Boolean) as TreeDataNode[]
      }

      return filterTree(treeData)
    }, [treeData, searchValue, filterTreeNode, fieldNames])

    const handleToggle = useCallback(
      async (key: string) => {
        const node = findNode(treeData, key, fieldNames)

        // Handle async loading
        if (loadData && node) {
          const children = getFieldValue(node, 'children', fieldNames) as
            | TreeDataNode[]
            | undefined
          if (!children || children.length === 0) {
            setLoadingKeys((prev) => new Set(prev).add(key))
            try {
              await loadData(node)
            } finally {
              setLoadingKeys((prev) => {
                const next = new Set(prev)
                next.delete(key)
                return next
              })
            }
          }
        }

        const newKeys = expandedKeys.includes(key)
          ? expandedKeys.filter((k) => k !== key)
          : [...expandedKeys, key]

        if (controlledExpandedKeys === undefined) {
          setInternalExpandedKeys(newKeys)
        }
        onTreeExpand?.(newKeys)
      },
      [expandedKeys, controlledExpandedKeys, onTreeExpand, loadData, treeData, fieldNames]
    )

    const handleSelect = useCallback(
      (key: string, triggerNode: TreeDataNode) => {
        let newValue: string[]

        if (multiple) {
          if (value.includes(key)) {
            newValue = value.filter((k) => k !== key)
          } else {
            // Check maxCount limit
            if (maxCount !== undefined && value.length >= maxCount) {
              return // Don't add more if at limit
            }
            newValue = [...value, key]
          }
        } else {
          newValue = [key]
          setOpen(false)
          if (controlledSearchValue === undefined) {
            setInternalSearchValue('')
          }
        }

        if (controlledValue === undefined) {
          setInternalValue(newValue)
        }

        const labels = newValue.map((k) => {
          const node = findNode(treeData, k, fieldNames)
          return node ? getFieldValue(node, 'title', fieldNames) as React.ReactNode : k
        })

        // Build return value based on labelInValue setting
        if (labelInValue) {
          const labeledValues: LabeledValue[] = newValue.map((k) => {
            const node = findNode(treeData, k, fieldNames)
            return {
              value: k,
              label: node ? getFieldValue(node, 'title', fieldNames) as React.ReactNode : k,
            }
          })
          onChange?.(
            multiple ? labeledValues : labeledValues[0] || { value: '', label: '' },
            labels,
            { triggerValue: key, triggerNode }
          )
        } else {
          onChange?.(multiple ? newValue : newValue[0] || '', labels, { triggerValue: key, triggerNode })
        }
      },
      [
        value,
        multiple,
        maxCount,
        controlledValue,
        onChange,
        treeData,
        setOpen,
        controlledSearchValue,
        fieldNames,
        labelInValue,
      ]
    )

    const handleCheck = useCallback(
      (key: string, triggerNode: TreeDataNode) => {
        const isChecked = value.includes(key)
        let newValue = [...value]

        if (treeCheckStrictly) {
          // No parent-child association
          if (isChecked) {
            newValue = newValue.filter((k) => k !== key)
          } else {
            // Check maxCount limit
            if (maxCount !== undefined && value.length >= maxCount) {
              return // Don't add more if at limit
            }
            newValue.push(key)
          }
        } else {
          const descendantKeys = getDescendantKeys(triggerNode, fieldNames)

          if (isChecked) {
            newValue = newValue.filter((k) => k !== key && !descendantKeys.includes(k))
          } else {
            // Check maxCount limit for adding multiple
            const keysToAdd = [key, ...descendantKeys.filter((dk) => !newValue.includes(dk))]
            if (maxCount !== undefined && newValue.length + keysToAdd.length > maxCount) {
              // Add only up to maxCount
              const remainingSlots = maxCount - newValue.length
              if (remainingSlots <= 0) return
              keysToAdd.slice(0, remainingSlots).forEach((k) => newValue.push(k))
            } else {
              newValue.push(key)
              descendantKeys.forEach((dk) => {
                if (!newValue.includes(dk)) newValue.push(dk)
              })
            }
          }
        }

        if (controlledValue === undefined) {
          setInternalValue(newValue)
        }

        const labels = newValue.map((k) => {
          const n = findNode(treeData, k, fieldNames)
          return n ? getFieldValue(n, 'title', fieldNames) as React.ReactNode : k
        })

        // Build return value based on labelInValue setting
        if (labelInValue) {
          const labeledValues: LabeledValue[] = newValue.map((k) => {
            const node = findNode(treeData, k, fieldNames)
            return {
              value: k,
              label: node ? getFieldValue(node, 'title', fieldNames) as React.ReactNode : k,
            }
          })
          onChange?.(labeledValues, labels, { triggerValue: key, triggerNode })
        } else {
          onChange?.(newValue, labels, { triggerValue: key, triggerNode })
        }
      },
      [value, controlledValue, onChange, treeData, treeCheckStrictly, fieldNames, maxCount, labelInValue]
    )

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      const newValue: string[] = []

      if (controlledValue === undefined) {
        setInternalValue(newValue)
      }

      if (labelInValue) {
        onChange?.(multiple || treeCheckable ? [] : { value: '', label: '' }, [])
      } else {
        onChange?.(multiple || treeCheckable ? newValue : '', [])
      }
    }

    const removeTag = (key: string, e: React.MouseEvent) => {
      e.stopPropagation()
      const newValue = value.filter((k) => k !== key)

      if (controlledValue === undefined) {
        setInternalValue(newValue)
      }

      const labels = newValue.map((k) => {
        const n = findNode(treeData, k, fieldNames)
        return n ? getFieldValue(n, 'title', fieldNames) as React.ReactNode : k
      })

      if (labelInValue) {
        const labeledValues: LabeledValue[] = newValue.map((k) => {
          const node = findNode(treeData, k, fieldNames)
          return {
            value: k,
            label: node ? getFieldValue(node, 'title', fieldNames) as React.ReactNode : k,
          }
        })
        onChange?.(
          multiple || treeCheckable ? labeledValues : labeledValues[0] || { value: '', label: '' },
          labels
        )
      } else {
        onChange?.(multiple || treeCheckable ? newValue : newValue[0] || '', labels)
      }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      if (controlledSearchValue === undefined) {
        setInternalSearchValue(newValue)
      }
      onSearch?.(newValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return

      switch (e.key) {
        case 'Enter':
        case ' ':
          if (!open) {
            e.preventDefault()
            setOpen(true)
          } else if (focusedKey) {
            e.preventDefault()
            const node = findNode(treeData, focusedKey, fieldNames)
            if (node && !node.disabled) {
              if (treeCheckable) {
                handleCheck(focusedKey, node)
              } else {
                handleSelect(focusedKey, node)
              }
            }
          }
          break

        case 'Escape':
          e.preventDefault()
          setOpen(false)
          if (controlledSearchValue === undefined) {
            setInternalSearchValue('')
          }
          triggerRef.current?.focus()
          break

        case 'ArrowDown':
          e.preventDefault()
          if (!open) {
            setOpen(true)
          } else {
            const currentIndex = visibleNodes.findIndex((n) => n.key === focusedKey)
            const nextIndex = currentIndex < visibleNodes.length - 1 ? currentIndex + 1 : 0
            setFocusedKey(visibleNodes[nextIndex]?.key || null)
          }
          break

        case 'ArrowUp':
          e.preventDefault()
          if (open) {
            const currentIndex = visibleNodes.findIndex((n) => n.key === focusedKey)
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : visibleNodes.length - 1
            setFocusedKey(visibleNodes[prevIndex]?.key || null)
          }
          break

        case 'ArrowRight':
          if (open && focusedKey) {
            e.preventDefault()
            const node = findNode(treeData, focusedKey, fieldNames)
            const children = node
              ? (getFieldValue(node, 'children', fieldNames) as TreeDataNode[] | undefined)
              : undefined
            if (children && children.length > 0 && !expandedKeys.includes(focusedKey)) {
              handleToggle(focusedKey)
            }
          }
          break

        case 'ArrowLeft':
          if (open && focusedKey) {
            e.preventDefault()
            if (expandedKeys.includes(focusedKey)) {
              handleToggle(focusedKey)
            } else {
              // Move to parent
              const parentKeys = getParentKeys(treeData, focusedKey, fieldNames)
              if (parentKeys && parentKeys.length > 0) {
                setFocusedKey(parentKeys[parentKeys.length - 1])
              }
            }
          }
          break

        case 'Home':
          if (open) {
            e.preventDefault()
            setFocusedKey(visibleNodes[0]?.key || null)
          }
          break

        case 'End':
          if (open) {
            e.preventDefault()
            setFocusedKey(visibleNodes[visibleNodes.length - 1]?.key || null)
          }
          break
      }
    }

    const getCheckedState = useCallback(
      (node: TreeDataNode): { checked: boolean; indeterminate: boolean } => {
        const key = getFieldValue(node, 'key', fieldNames) as string
        const children = getFieldValue(node, 'children', fieldNames) as TreeDataNode[] | undefined

        if (treeCheckStrictly) {
          return { checked: value.includes(key), indeterminate: false }
        }

        if (!children || children.length === 0) {
          return { checked: value.includes(key), indeterminate: false }
        }

        const descendantKeys = getDescendantKeys(node, fieldNames)
        const checkedDescendants = descendantKeys.filter((k) => value.includes(k))

        if (checkedDescendants.length === 0) {
          return { checked: value.includes(key), indeterminate: false }
        }

        if (checkedDescendants.length === descendantKeys.length) {
          return { checked: true, indeterminate: false }
        }

        return { checked: false, indeterminate: true }
      },
      [value, treeCheckStrictly, fieldNames]
    )

    const renderNodes = useCallback(
      (nodes: TreeDataNode[], level: number): React.ReactNode => {
        return nodes.map((node) => {
          const key = getFieldValue(node, 'key', fieldNames) as string
          const { checked, indeterminate } = getCheckedState(node)

          return (
            <TreeSelectNode
              key={key}
              node={node}
              level={level}
              expanded={expandedKeys.includes(key)}
              selected={value.includes(key)}
              checked={checked}
              indeterminate={indeterminate}
              treeCheckable={treeCheckable}
              treeLine={treeLine}
              treeIcon={treeIcon}
              focused={focusedKey === key}
              loading={loadingKeys.has(key)}
              baseTestId={baseTestId}
              id={`${instanceId}-option-${key}`}
              fieldNames={fieldNames}
              switcherIcon={switcherIcon}
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
        value,
        treeCheckable,
        treeLine,
        treeIcon,
        focusedKey,
        loadingKeys,
        baseTestId,
        instanceId,
        fieldNames,
        switcherIcon,
        handleToggle,
        handleSelect,
        handleCheck,
        getCheckedState,
      ]
    )

    // Display value with showCheckedStrategy
    const displayValue = useMemo(() => {
      if (value.length === 0) return null

      let displayKeys = value

      if ((treeCheckable || multiple) && showCheckedStrategy !== 'SHOW_ALL') {
        if (showCheckedStrategy === 'SHOW_PARENT') {
          // Only show parent nodes when all children are selected
          displayKeys = value.filter((key) => {
            const parentKeys = getParentKeys(treeData, key, fieldNames)
            if (!parentKeys) return true
            // Check if any parent is fully selected
            return !parentKeys.some((pk) => value.includes(pk))
          })
        } else if (showCheckedStrategy === 'SHOW_CHILD') {
          // Only show leaf nodes
          displayKeys = value.filter((key) => {
            const node = findNode(treeData, key, fieldNames)
            if (!node) return true
            const children = getFieldValue(node, 'children', fieldNames) as
              | TreeDataNode[]
              | undefined
            return !children || children.length === 0
          })
        }
      }

      if (multiple || treeCheckable) {
        let keysToShow = displayKeys
        let hiddenCount = 0

        if (maxTagCount !== undefined && maxTagCount !== 'responsive') {
          if (displayKeys.length > maxTagCount) {
            keysToShow = displayKeys.slice(0, maxTagCount)
            hiddenCount = displayKeys.length - maxTagCount
          }
        }

        const tags = keysToShow.map((key) => {
          const node = findNode(treeData, key, fieldNames)
          const title = node ? getFieldValue(node, 'title', fieldNames) : key
          const label = title as React.ReactNode
          const closable = !disabled
          const onClose = () => {
            const fakeEvent = { stopPropagation: () => {} } as React.MouseEvent
            removeTag(key, fakeEvent)
          }

          // Use custom tagRender if provided
          if (tagRender) {
            return (
              <React.Fragment key={key}>
                {tagRender({ label, value: key, closable, onClose })}
              </React.Fragment>
            )
          }

          return (
            <span
              key={key}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-base-200 rounded text-sm mr-1 mb-1"
              data-testid={`${baseTestId}-tag-${key}`}
            >
              {label}
              {closable && (
                <button
                  type="button"
                  className="hover:text-error"
                  onClick={(e) => removeTag(key, e)}
                  aria-label={`Remove ${typeof title === 'string' ? title : key}`}
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </span>
          )
        })

        if (hiddenCount > 0) {
          const hiddenKeys = displayKeys.slice(maxTagCount as number)
          const placeholder =
            typeof maxTagPlaceholder === 'function'
              ? maxTagPlaceholder(hiddenKeys)
              : maxTagPlaceholder || `+${hiddenCount} more`

          tags.push(
            <span
              key="__more__"
              className="inline-flex items-center px-2 py-0.5 bg-base-200 rounded text-sm mr-1 mb-1"
            >
              {placeholder}
            </span>
          )
        }

        return tags
      }

      const node = findNode(treeData, value[0], fieldNames)
      const title = node ? getFieldValue(node, 'title', fieldNames) : value[0]
      return title as React.ReactNode
    }, [
      value,
      treeData,
      multiple,
      treeCheckable,
      showCheckedStrategy,
      maxTagCount,
      maxTagPlaceholder,
      baseTestId,
      fieldNames,
      disabled,
      tagRender,
    ])

    const borderClass = status ? statusClasses[status] : color ? colorClasses[color] : ''
    const variantClass = ghost ? 'bg-transparent border-transparent' : variantClasses[variant]

    const dropdownContent = (
      <div className="py-1" role="tree" aria-label="Tree options">
        {filteredData.length > 0 ? (
          renderNodes(filteredData, 0)
        ) : (
          <div
            className="px-4 py-2 text-base-content/50 text-sm text-center"
            data-testid={`${baseTestId}-empty`}
          >
            {notFoundContent}
          </div>
        )}
      </div>
    )

    return (
      <div
        ref={(node) => {
          containerRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={`relative ${className}`}
        data-testid={baseTestId}
        data-state={open ? 'open' : 'closed'}
        data-disabled={disabled || undefined}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {/* Trigger */}
        <div
          ref={triggerRef}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="tree"
          aria-owns={open ? listboxId : undefined}
          aria-activedescendant={open && focusedKey ? `${instanceId}-option-${focusedKey}` : undefined}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          className={[
            'input flex items-center gap-2 cursor-pointer flex-wrap',
            sizeClasses[size],
            variantClass,
            borderClass,
            disabled && 'input-disabled opacity-50 cursor-not-allowed',
            open && !borderClass && 'border-primary',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => !disabled && setOpen(!open)}
          data-testid={`${baseTestId}-trigger`}
        >
          <div className="flex-1 flex flex-wrap items-center gap-1 min-w-0">
            {displayValue || <span className="text-base-content/50">{placeholder}</span>}
          </div>

          {/* Clear button */}
          {allowClear && value.length > 0 && !disabled && (
            <button
              type="button"
              className="hover:text-error flex-shrink-0"
              onClick={handleClear}
              aria-label="Clear selection"
              data-testid={`${baseTestId}-clear`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* Suffix icon / Dropdown arrow */}
          {suffixIcon || (
            <svg
              className={`w-4 h-4 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>

        {/* Dropdown */}
        {open && (
          <div
            id={listboxId}
            className={`absolute z-50 mt-1 w-full bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-64 overflow-auto ${popupClassName}`}
            data-testid={`${baseTestId}-dropdown`}
          >
            {/* Search input */}
            {showSearch && (
              <div className="p-2 border-b border-base-300">
                <input
                  ref={inputRef}
                  type="text"
                  className="input input-sm w-full"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Search tree options"
                  data-testid={`${baseTestId}-search`}
                />
              </div>
            )}

            {/* Tree */}
            {dropdownRender ? dropdownRender(dropdownContent) : dropdownContent}
          </div>
        )}
      </div>
    )
  }
)

TreeSelect.displayName = 'TreeSelect'

// Attach static strategy constants to TreeSelect
export const TreeSelectComponent = Object.assign(TreeSelect, {
  SHOW_ALL,
  SHOW_PARENT,
  SHOW_CHILD,
})

export { TreeSelectComponent as default }
