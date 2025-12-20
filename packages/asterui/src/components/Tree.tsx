import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useContext,
  createContext,
  forwardRef,
  useEffect,
} from 'react'

// DaisyUI classes
const dCheckbox = 'checkbox'
const dCheckboxXs = 'checkbox-xs'
const dCheckboxSm = 'checkbox-sm'
const dCheckboxLg = 'checkbox-lg'
const dCheckboxXl = 'checkbox-xl'
const dCheckboxPrimary = 'checkbox-primary'
const dCheckboxSecondary = 'checkbox-secondary'
const dCheckboxAccent = 'checkbox-accent'
const dCheckboxNeutral = 'checkbox-neutral'
const dCheckboxInfo = 'checkbox-info'
const dCheckboxSuccess = 'checkbox-success'
const dCheckboxWarning = 'checkbox-warning'
const dCheckboxError = 'checkbox-error'
const dLoading = 'loading'
const dLoadingSpinner = 'loading-spinner'
const dLoadingXs = 'loading-xs'

// ============================================================================
// Types
// ============================================================================

export type TreeColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'

export type TreeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

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
  /** Tree data structure (alternative to compound pattern) */
  treeData?: TreeDataNode[] | undefined
  /** Children for compound pattern */
  children?: React.ReactNode
  /** Show checkbox for each node */
  checkable?: boolean
  /** Checkbox color (DaisyUI) */
  checkboxColor?: TreeColor
  /** Checkbox size (DaisyUI) */
  checkboxSize?: TreeSize
  /** Enable node selection */
  selectable?: boolean
  /** Allow multiple selection */
  multiple?: boolean
  /** Expand all nodes by default */
  defaultExpandAll?: boolean
  /** Default expanded keys */
  defaultExpandedKeys?: string[]
  /** Controlled expanded keys */
  expandedKeys?: string[]
  /** Default selected keys */
  defaultSelectedKeys?: string[]
  /** Controlled selected keys */
  selectedKeys?: string[]
  /** Default checked keys */
  defaultCheckedKeys?: string[]
  /** Controlled checked keys */
  checkedKeys?: string[]
  /** Callback when node is expanded */
  onExpand?: (expandedKeys: string[], info: { node: TreeDataNode; expanded: boolean }) => void
  /** Callback when node is selected */
  onSelect?: (selectedKeys: string[], info: { node: TreeDataNode; selected: boolean }) => void
  /** Callback when node is checked */
  onCheck?: (checkedKeys: string[], info: { node: TreeDataNode; checked: boolean }) => void
  /** Show connecting lines */
  showLine?: boolean
  /** Show node icons */
  showIcon?: boolean
  /** Decouple parent-child checkbox relationship */
  checkStrictly?: boolean
  /** Auto expand parent nodes when expandedKeys change */
  autoExpandParent?: boolean
  /** Make node fill remaining horizontal space */
  blockNode?: boolean
  /** Custom expand/collapse icon */
  switcherIcon?: React.ReactNode | ((expanded: boolean) => React.ReactNode)
  /** Custom title render function */
  titleRender?: (node: TreeDataNode) => React.ReactNode
  /** Filter function for highlighting nodes */
  filterTreeNode?: (node: TreeDataNode) => boolean
  /** Async data loading */
  loadData?: (node: TreeDataNode) => Promise<void>
  /** Right click handler */
  onRightClick?: (info: { event: React.MouseEvent; node: TreeDataNode }) => void
  /** Custom field names for data mapping */
  fieldNames?: { key?: string; title?: string; children?: string }
  /** Test ID for the component */
  'data-testid'?: string
}

// ============================================================================
// Context
// ============================================================================

interface TreeContextValue {
  checkable: boolean
  checkboxColor: TreeColor
  checkboxSize: TreeSize
  selectable: boolean
  multiple: boolean
  showLine: boolean
  showIcon: boolean
  blockNode: boolean
  checkStrictly: boolean
  expandedKeys: string[]
  selectedKeys: string[]
  checkedKeys: string[]
  loadingKeys: string[]
  switcherIcon?: React.ReactNode | ((expanded: boolean) => React.ReactNode)
  titleRender?: (node: TreeDataNode) => React.ReactNode
  filterTreeNode?: (node: TreeDataNode) => boolean
  onToggle: (key: string, node: TreeDataNode) => void
  onSelect: (key: string, node: TreeDataNode) => void
  onCheck: (key: string, node: TreeDataNode) => void
  onRightClick?: (info: { event: React.MouseEvent; node: TreeDataNode }) => void
  getCheckedState: (node: TreeDataNode) => { checked: boolean; indeterminate: boolean }
  focusedKey: string | null
  setFocusedKey: (key: string | null) => void
  flattenedNodes: TreeDataNode[]
  registerNode: (key: string, node: TreeDataNode, level: number) => void
  baseTestId: string
}

const TreeContext = createContext<TreeContextValue | null>(null)

function useTreeContext() {
  const context = useContext(TreeContext)
  if (!context) {
    throw new Error('Tree components must be used within a Tree')
  }
  return context
}

// ============================================================================
// Helpers
// ============================================================================

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

function flattenTree(data: TreeDataNode[], expandedKeys: string[]): TreeDataNode[] {
  const result: TreeDataNode[] = []
  const traverse = (nodes: TreeDataNode[]) => {
    nodes.forEach((node) => {
      result.push(node)
      if (node.children && expandedKeys.includes(node.key)) {
        traverse(node.children)
      }
    })
  }
  traverse(data)
  return result
}

function getAncestorKeys(data: TreeDataNode[], key: string): string[] {
  const parentMap = getParentMap(data)
  const ancestors: string[] = []
  let currentKey: string | null | undefined = parentMap.get(key)
  while (currentKey) {
    ancestors.push(currentKey)
    currentKey = parentMap.get(currentKey)
  }
  return ancestors
}

// ============================================================================
// TreeNode Component
// ============================================================================

interface TreeNodeInternalProps {
  node: TreeDataNode
  level: number
}

function TreeNodeInternal({ node, level }: TreeNodeInternalProps) {
  const {
    checkable,
    checkboxColor,
    checkboxSize,
    selectable,
    showLine,
    showIcon,
    blockNode,
    expandedKeys,
    selectedKeys,
    loadingKeys,
    switcherIcon,
    titleRender,
    filterTreeNode,
    onToggle,
    onSelect,
    onCheck,
    onRightClick,
    getCheckedState,
    focusedKey,
    setFocusedKey,
    flattenedNodes,
    baseTestId,
  } = useTreeContext()

  const nodeRef = useRef<HTMLDivElement>(null)
  const hasChildren = node.children && node.children.length > 0
  const isLeaf = node.isLeaf ?? !hasChildren
  const isExpanded = expandedKeys.includes(node.key)
  const isSelected = selectedKeys.includes(node.key)
  const isLoading = loadingKeys.includes(node.key)
  const isFocused = focusedKey === node.key
  const { checked, indeterminate } = getCheckedState(node)
  const isFiltered = filterTreeNode ? filterTreeNode(node) : false
  const isDisabled = node.disabled

  // Focus management
  useEffect(() => {
    if (isFocused && nodeRef.current) {
      nodeRef.current.focus()
    }
  }, [isFocused])

  const handleToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation()
    if (!isLeaf && !isDisabled) {
      onToggle(node.key, node)
    }
  }

  const handleSelect = (_e: React.MouseEvent | React.KeyboardEvent) => {
    if (selectable && node.selectable !== false && !isDisabled) {
      onSelect(node.key, node)
    }
  }

  const handleCheck = (e: React.MouseEvent | React.ChangeEvent) => {
    e.stopPropagation()
    if (!isDisabled && !node.disableCheckbox) {
      onCheck(node.key, node)
    }
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    if (onRightClick) {
      e.preventDefault()
      onRightClick({ event: e, node })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = flattenedNodes.findIndex((n) => n.key === node.key)

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault()
        const nextNode = flattenedNodes[currentIndex + 1]
        if (nextNode) {
          setFocusedKey(nextNode.key)
        }
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        const prevNode = flattenedNodes[currentIndex - 1]
        if (prevNode) {
          setFocusedKey(prevNode.key)
        }
        break
      }
      case 'ArrowRight': {
        e.preventDefault()
        if (!isLeaf && !isExpanded) {
          onToggle(node.key, node)
        } else if (hasChildren && isExpanded) {
          const firstChild = node.children![0]
          setFocusedKey(firstChild.key)
        }
        break
      }
      case 'ArrowLeft': {
        e.preventDefault()
        if (!isLeaf && isExpanded) {
          onToggle(node.key, node)
        }
        break
      }
      case 'Enter':
      case ' ': {
        e.preventDefault()
        if (checkable && node.checkable !== false) {
          onCheck(node.key, node)
        } else if (selectable && node.selectable !== false) {
          onSelect(node.key, node)
        } else if (!isLeaf) {
          onToggle(node.key, node)
        }
        break
      }
      case 'Home': {
        e.preventDefault()
        const firstNode = flattenedNodes[0]
        if (firstNode) {
          setFocusedKey(firstNode.key)
        }
        break
      }
      case 'End': {
        e.preventDefault()
        const lastNode = flattenedNodes[flattenedNodes.length - 1]
        if (lastNode) {
          setFocusedKey(lastNode.key)
        }
        break
      }
    }
  }

  // Checkbox classes - must use static strings for Tailwind JIT
  const checkboxSizeClasses: Record<TreeSize, string> = {
    xs: dCheckboxXs,
    sm: dCheckboxSm,
    md: '',
    lg: dCheckboxLg,
    xl: dCheckboxXl,
  }
  const checkboxColorClasses: Record<TreeColor, string> = {
    primary: dCheckboxPrimary,
    secondary: dCheckboxSecondary,
    accent: dCheckboxAccent,
    neutral: dCheckboxNeutral,
    info: dCheckboxInfo,
    success: dCheckboxSuccess,
    warning: dCheckboxWarning,
    error: dCheckboxError,
  }
  const checkboxSizeClass = checkboxSizeClasses[checkboxSize]
  const checkboxColorClass = checkboxColorClasses[checkboxColor]

  // Render switcher icon
  const renderSwitcher = () => {
    if (isLoading) {
      return <span className={`${dLoading} ${dLoadingSpinner} ${dLoadingXs}`} />
    }

    if (isLeaf) {
      return <span className="w-4 h-4" />
    }

    if (switcherIcon) {
      return typeof switcherIcon === 'function' ? switcherIcon(isExpanded) : switcherIcon
    }

    return (
      <svg
        className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    )
  }

  // Render title
  const renderTitle = () => {
    if (titleRender) {
      return titleRender(node)
    }
    return node.title
  }

  const nodeState = isSelected ? 'selected' : isExpanded ? 'expanded' : 'collapsed'

  return (
    <div
      className="tree-node"
      role="treeitem"
      aria-expanded={!isLeaf ? isExpanded : undefined}
      aria-selected={isSelected}
      aria-checked={checkable ? (indeterminate ? 'mixed' : checked) : undefined}
      aria-disabled={isDisabled}
      aria-level={level + 1}
      data-testid={`${baseTestId}-node-${node.key}`}
      data-state={nodeState}
      data-key={node.key}
    >
      <div
        ref={nodeRef}
        className={[
          'flex items-center py-1 px-1 rounded transition-colors outline-none',
          'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
          selectable && !isDisabled && 'cursor-pointer hover:bg-base-200',
          isSelected && 'bg-primary/10 text-primary',
          isDisabled && 'opacity-50 cursor-not-allowed',
          isFiltered && 'bg-warning/20',
          blockNode && 'w-full',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ paddingLeft: `${level * 20}px` }}
        tabIndex={isFocused ? 0 : -1}
        onClick={handleSelect}
        onContextMenu={handleContextMenu}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocusedKey(node.key)}
      >
        {/* Expand/Collapse icon */}
        <span
          className={[
            'w-5 h-5 flex items-center justify-center flex-shrink-0',
            !isLeaf && !isDisabled && 'cursor-pointer hover:bg-base-300 rounded',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={handleToggle}
          aria-hidden="true"
        >
          {renderSwitcher()}
        </span>

        {/* Checkbox */}
        {checkable && node.checkable !== false && (
          <span className="mr-1 flex-shrink-0" onClick={handleCheck}>
            <input
              type="checkbox"
              className={`${dCheckbox} ${checkboxSizeClass} ${checkboxColorClass}`}
              checked={checked}
              ref={(el) => {
                if (el) el.indeterminate = indeterminate
              }}
              disabled={isDisabled || node.disableCheckbox}
              onChange={handleCheck}
              tabIndex={-1}
              aria-hidden="true"
              data-state={indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'}
            />
          </span>
        )}

        {/* Custom icon */}
        {showIcon && node.icon && (
          <span className="mr-1 flex-shrink-0" aria-hidden="true">
            {node.icon}
          </span>
        )}

        {/* Title */}
        <span className="flex-1 truncate select-none">{renderTitle()}</span>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div
          className={showLine ? 'border-l border-base-300 ml-2.5' : ''}
          role="group"
          aria-label={`${node.title} children`}
        >
          {node.children!.map((child) => (
            <TreeNodeInternal key={child.key} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// Tree.Node Component (Compound Pattern)
// ============================================================================

export interface TreeNodeProps {
  /** Unique key for the node (uses React's key prop) */
  key: string
  /** Display title */
  title: React.ReactNode
  /** Custom icon */
  icon?: React.ReactNode
  /** Disable the node */
  disabled?: boolean
  /** Disable checkbox for this node */
  disableCheckbox?: boolean
  /** Whether node can be selected */
  selectable?: boolean
  /** Whether node shows checkbox */
  checkable?: boolean
  /** Force node to be a leaf */
  isLeaf?: boolean
  /** Child nodes */
  children?: React.ReactNode
}

function TreeNode(_props: TreeNodeProps): null {
  // The actual rendering is handled by the Tree component via buildTree
  return null
}

// Mark the component for identification after bundling
TreeNode.displayName = 'Tree.Node'

function isTreeNode(element: React.ReactElement): boolean {
  return (
    element.type === TreeNode ||
    (typeof element.type === 'function' &&
      (element.type as { displayName?: string }).displayName === 'Tree.Node')
  )
}

// ============================================================================
// Main Tree Component
// ============================================================================

export const Tree = Object.assign(
  forwardRef<HTMLDivElement, TreeProps>(function Tree(
    {
      treeData: treeDataProp,
      children,
      checkable = false,
      checkboxColor = 'primary',
      checkboxSize = 'sm',
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
      checkStrictly = false,
      autoExpandParent = true,
      blockNode = false,
      switcherIcon,
      titleRender,
      filterTreeNode,
      loadData,
      onRightClick,
      fieldNames,
      className = '',
      'data-testid': testId,
      ...rest
    },
    ref
  ) {
    const baseTestId = testId ?? 'tree'
    // Handle compound pattern: collect nodes from children
    const registerNode = useCallback((_key: string, _node: TreeDataNode, _level: number) => {
      // Registration is handled by the buildTree function parsing children
    }, [])

    // Build tree data from compound children or use treeData prop
    const treeData = useMemo(() => {
      if (treeDataProp) {
        // Apply fieldNames mapping if provided
        if (fieldNames) {
          const mapNode = (node: Record<string, unknown>): TreeDataNode => {
            const key = fieldNames.key ? (node[fieldNames.key] as string) : (node.key as string)
            const title = fieldNames.title ? node[fieldNames.title] : node.title
            const children = fieldNames.children ? node[fieldNames.children] : node.children

            return {
              ...node,
              key,
              title: title as React.ReactNode,
              children: Array.isArray(children)
                ? children.map((child) => mapNode(child as Record<string, unknown>))
                : undefined,
            } as TreeDataNode
          }
          return (treeDataProp as unknown as Record<string, unknown>[]).map(mapNode)
        }
        return treeDataProp
      }

      // Build from compound pattern
      const buildTree = (nodes: React.ReactNode): TreeDataNode[] => {
        const result: TreeDataNode[] = []
        React.Children.forEach(nodes, (child) => {
          if (React.isValidElement(child) && isTreeNode(child)) {
            const props = child.props as Omit<TreeNodeProps, 'key'>
            // React's key is accessed via child.key, not child.props.key
            const key = child.key as string
            if (!key) {
              console.warn('Tree.Node requires a key prop')
              return
            }
            const node: TreeDataNode = {
              key,
              title: props.title,
              icon: props.icon,
              disabled: props.disabled,
              disableCheckbox: props.disableCheckbox,
              selectable: props.selectable,
              checkable: props.checkable,
              isLeaf: props.isLeaf,
              children: props.children ? buildTree(props.children) : undefined,
            }
            result.push(node)
          }
        })
        return result
      }

      return buildTree(children)
    }, [treeDataProp, children, fieldNames])

    // Loading state for async data
    const [loadingKeys, setLoadingKeys] = useState<string[]>([])

    // Initialize expanded keys
    const initialExpandedKeys = useMemo(() => {
      if (defaultExpandAll) {
        return getAllKeys(treeData)
      }
      if (autoExpandParent && defaultExpandedKeys.length > 0) {
        const allKeys = new Set(defaultExpandedKeys)
        defaultExpandedKeys.forEach((key) => {
          getAncestorKeys(treeData, key).forEach((k) => allKeys.add(k))
        })
        return Array.from(allKeys)
      }
      return defaultExpandedKeys
    }, [])

    const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>(initialExpandedKeys)
    const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(defaultSelectedKeys)
    const [internalCheckedKeys, setInternalCheckedKeys] = useState<string[]>(defaultCheckedKeys)
    const [focusedKey, setFocusedKey] = useState<string | null>(null)

    const expandedKeys = controlledExpandedKeys ?? internalExpandedKeys
    const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys
    const checkedKeys = controlledCheckedKeys ?? internalCheckedKeys

    const parentMap = useMemo(() => getParentMap(treeData), [treeData])

    // Flatten visible nodes for keyboard navigation
    const flattenedNodes = useMemo(() => flattenTree(treeData, expandedKeys), [treeData, expandedKeys])

    // Calculate checked state for each node
    const getCheckedState = useCallback(
      (node: TreeDataNode): { checked: boolean; indeterminate: boolean } => {
        if (checkStrictly) {
          return { checked: checkedKeys.includes(node.key), indeterminate: false }
        }

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
      [checkedKeys, checkStrictly]
    )

    const handleToggle = useCallback(
      async (key: string, node: TreeDataNode) => {
        const isExpanded = expandedKeys.includes(key)

        // Handle async loading
        if (loadData && !isExpanded && !node.isLeaf && (!node.children || node.children.length === 0)) {
          setLoadingKeys((prev) => [...prev, key])
          try {
            await loadData(node)
          } finally {
            setLoadingKeys((prev) => prev.filter((k) => k !== key))
          }
        }

        const newExpandedKeys = isExpanded
          ? expandedKeys.filter((k) => k !== key)
          : [...expandedKeys, key]

        if (controlledExpandedKeys === undefined) {
          setInternalExpandedKeys(newExpandedKeys)
        }

        onExpand?.(newExpandedKeys, { node, expanded: !isExpanded })
      },
      [expandedKeys, controlledExpandedKeys, onExpand, loadData]
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

        if (checkStrictly) {
          // Simple toggle without parent-child relationship
          if (isChecked) {
            newCheckedKeys = newCheckedKeys.filter((k) => k !== key)
          } else {
            newCheckedKeys.push(key)
          }
        } else {
          // Get all descendant keys
          const descendantKeys = getDescendantKeys(node)

          if (isChecked) {
            // Uncheck this node and all descendants
            newCheckedKeys = newCheckedKeys.filter((k) => k !== key && !descendantKeys.includes(k))
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
        }

        if (controlledCheckedKeys === undefined) {
          setInternalCheckedKeys(newCheckedKeys)
        }

        onCheck?.(newCheckedKeys, { node, checked: !isChecked })
      },
      [checkedKeys, controlledCheckedKeys, onCheck, parentMap, treeData, checkStrictly]
    )

    // Handle initial focus
    const handleTreeFocus = useCallback(() => {
      if (!focusedKey && flattenedNodes.length > 0) {
        setFocusedKey(flattenedNodes[0].key)
      }
    }, [focusedKey, flattenedNodes])

    const contextValue: TreeContextValue = {
      checkable,
      checkboxColor,
      checkboxSize,
      selectable,
      multiple,
      showLine,
      showIcon,
      blockNode,
      checkStrictly,
      expandedKeys,
      selectedKeys,
      checkedKeys,
      loadingKeys,
      switcherIcon,
      titleRender,
      filterTreeNode,
      onToggle: handleToggle,
      onSelect: handleSelect,
      onCheck: handleCheck,
      onRightClick,
      getCheckedState,
      focusedKey,
      setFocusedKey,
      flattenedNodes,
      registerNode,
      baseTestId,
    }

    return (
      <TreeContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={`tree ${className}`}
          role="tree"
          aria-multiselectable={multiple}
          data-testid={baseTestId}
          onFocus={handleTreeFocus}
          {...rest}
        >
          {treeData.map((node) => (
            <TreeNodeInternal key={node.key} node={node} level={0} />
          ))}
        </div>
      </TreeContext.Provider>
    )
  }),
  {
    Node: TreeNode,
  }
)
