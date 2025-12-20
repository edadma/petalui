import React, { useState, forwardRef, useMemo, useCallback, useId } from 'react'

export interface FilterConfig {
  text: string
  value: string | number | boolean
}

export type TableSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface ColumnType<T> {
  key: string
  title: React.ReactNode
  dataIndex?: keyof T & string
  render?: (value: T[keyof T] | undefined, record: T, index: number) => React.ReactNode
  width?: string | number
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
  sorter?: boolean | ((a: T, b: T) => number)
  sortOrder?: 'ascend' | 'descend' | null
  filters?: FilterConfig[]
  filteredValue?: (string | number | boolean)[]
  onFilter?: (value: string | number | boolean, record: T) => boolean
  defaultSortOrder?: 'ascend' | 'descend'
  defaultFilteredValue?: (string | number | boolean)[]
  ellipsis?: boolean
  hidden?: boolean
}

export interface RowSelection<T> {
  type?: 'checkbox' | 'radio'
  selectedRowKeys?: React.Key[]
  onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void
  getCheckboxProps?: (record: T) => { disabled?: boolean; name?: string }
}

export interface ExpandableConfig<T> {
  expandedRowKeys?: React.Key[]
  defaultExpandedRowKeys?: React.Key[]
  expandedRowRender: (record: T, index: number, expanded: boolean) => React.ReactNode
  rowExpandable?: (record: T) => boolean
  onExpand?: (expanded: boolean, record: T) => void
  onExpandedRowsChange?: (expandedKeys: React.Key[]) => void
  expandRowByClick?: boolean
  expandIcon?: (props: { expanded: boolean; onExpand: () => void; record: T }) => React.ReactNode
}

export interface PaginationConfig {
  current?: number
  pageSize?: number
  total?: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  showTotal?: (total: number, range: [number, number]) => React.ReactNode
  pageSizeOptions?: number[]
  onChange?: (page: number, pageSize: number) => void
  onShowSizeChange?: (current: number, size: number) => void
  position?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'
}

export interface ScrollConfig {
  x?: number | string
  y?: number | string
}

export interface SorterResult<T> {
  column?: ColumnType<T>
  order?: 'ascend' | 'descend' | null
  field?: string
}

export interface TableChangeExtra<T> {
  currentDataSource: T[]
  action: 'paginate' | 'sort' | 'filter'
}

export interface TableProps<T> {
  columns: ColumnType<T>[]
  dataSource: T[]
  rowKey?: keyof T & string | ((record: T) => string)
  loading?: boolean
  size?: TableSize
  bordered?: boolean
  hoverable?: boolean
  striped?: boolean
  pinRows?: boolean
  pinCols?: boolean
  pagination?: false | PaginationConfig
  rowSelection?: RowSelection<T>
  expandable?: ExpandableConfig<T>
  scroll?: ScrollConfig
  className?: string
  onRow?: (record: T, index: number) => React.HTMLAttributes<HTMLTableRowElement>
  onChange?: (
    pagination: PaginationConfig,
    filters: Record<string, (string | number | boolean)[] | null>,
    sorter: SorterResult<T>,
    extra: TableChangeExtra<T>
  ) => void
  onSortChange?: (sorter: SorterResult<T>) => void
  onFilterChange?: (filters: Record<string, (string | number | boolean)[] | null>) => void
  locale?: {
    emptyText?: React.ReactNode
    filterConfirm?: string
    filterReset?: string
    selectAll?: string
    selectInvert?: string
  }
  'data-testid'?: string
  'aria-label'?: string
}

const sizeClasses: Record<TableSize, string> = {
  xs: 'd-table-xs',
  sm: 'd-table-sm',
  md: '',
  lg: 'd-table-lg',
  xl: 'd-table-xl',
}

function FilterDropdown({
  filters,
  selectedValues,
  onChange,
  locale,
  testId,
}: {
  filters: FilterConfig[]
  selectedValues: (string | number | boolean)[]
  onChange: (values: (string | number | boolean)[]) => void
  locale?: { filterConfirm?: string; filterReset?: string }
  testId: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownId = useId()

  const handleToggle = (value: string | number | boolean) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value]
    onChange(newValues)
  }

  const handleClear = () => {
    onChange([])
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className="d-dropdown d-dropdown-end" onKeyDown={handleKeyDown}>
      <button
        type="button"
        className={`d-btn d-btn-ghost d-btn-xs ${selectedValues.length > 0 ? 'text-primary' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Filter column"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={dropdownId}
        data-testid={`${testId}-filter-button`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      </button>
      {isOpen && (
        <div
          id={dropdownId}
          role="listbox"
          aria-multiselectable="true"
          className="d-dropdown-content z-[1] d-menu p-2 shadow bg-base-100 d-rounded-box w-52 border border-base-content/10"
          data-testid={`${testId}-filter-dropdown`}
        >
          <div className="space-y-2">
            {filters.map((filter) => (
              <label
                key={String(filter.value)}
                className="flex items-center gap-2 cursor-pointer p-2 hover:bg-base-200 rounded"
                role="option"
                aria-selected={selectedValues.includes(filter.value)}
              >
                <input
                  type="checkbox"
                  className="d-checkbox d-checkbox-xs d-checkbox-primary"
                  checked={selectedValues.includes(filter.value)}
                  onChange={() => handleToggle(filter.value)}
                  data-testid={`${testId}-filter-${String(filter.value)}`}
                />
                <span className="text-sm">{filter.text}</span>
              </label>
            ))}
          </div>
          <div className="d-divider my-1"></div>
          <button
            type="button"
            className="d-btn d-btn-ghost d-btn-xs w-full"
            onClick={handleClear}
            data-testid={`${testId}-filter-reset`}
          >
            {locale?.filterReset ?? 'Clear'}
          </button>
        </div>
      )}
    </div>
  )
}

function DefaultExpandIcon({ expanded, onExpand }: { expanded: boolean; onExpand: () => void }) {
  return (
    <button
      type="button"
      className="d-btn d-btn-ghost d-btn-xs d-btn-square"
      onClick={(e) => {
        e.stopPropagation()
        onExpand()
      }}
      aria-label={expanded ? 'Collapse row' : 'Expand row'}
      aria-expanded={expanded}
    >
      <svg
        className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )
}

function TableInner<T extends Record<string, unknown>>(
  {
    columns,
    dataSource,
    rowKey = 'id' as keyof T & string,
    loading = false,
    size = 'md',
    bordered = false,
    hoverable = true,
    striped = false,
    pinRows = false,
    pinCols = false,
    pagination,
    rowSelection,
    expandable,
    scroll,
    className = '',
    onRow,
    onChange,
    onSortChange,
    onFilterChange,
    locale,
    'data-testid': testId,
    'aria-label': ariaLabel,
    ...rest
  }: TableProps<T>,
  ref: React.ForwardedRef<HTMLTableElement>
) {
  const baseTestId = testId ?? 'table'
  const defaultPageSize = 10

  // Pagination state
  const [currentPage, setCurrentPage] = useState(
    pagination !== false && pagination?.current ? pagination.current : 1
  )
  const [internalPageSize, setInternalPageSize] = useState(
    pagination !== false && pagination?.pageSize ? pagination.pageSize : defaultPageSize
  )
  const pageSize = pagination !== false && pagination?.pageSize !== undefined ? pagination.pageSize : internalPageSize

  // Sorting state
  const [sortState, setSortState] = useState<{
    columnKey: string | null
    order: 'ascend' | 'descend' | null
  }>(() => {
    // Check for controlled sort
    const controlledSortColumn = columns.find((col) => col.sortOrder !== undefined)
    if (controlledSortColumn) {
      return {
        columnKey: controlledSortColumn.key,
        order: controlledSortColumn.sortOrder ?? null,
      }
    }
    // Fallback to default
    const defaultSortColumn = columns.find((col) => col.defaultSortOrder)
    return {
      columnKey: defaultSortColumn?.key || null,
      order: defaultSortColumn?.defaultSortOrder || null,
    }
  })

  // Filtering state
  const [filterState, setFilterState] = useState<Record<string, (string | number | boolean)[]>>(() => {
    const initial: Record<string, (string | number | boolean)[]> = {}
    columns.forEach((col) => {
      // Check for controlled filter
      if (col.filteredValue !== undefined) {
        initial[col.key] = col.filteredValue
      } else if (col.defaultFilteredValue) {
        initial[col.key] = col.defaultFilteredValue
      }
    })
    return initial
  })

  // Row selection state
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>(
    rowSelection?.selectedRowKeys || []
  )

  // Expandable state
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(
    expandable?.expandedRowKeys ?? expandable?.defaultExpandedRowKeys ?? []
  )

  // Sync controlled states
  const isControlledSort = columns.some((col) => col.sortOrder !== undefined)
  const isControlledFilter = columns.some((col) => col.filteredValue !== undefined)
  const isControlledExpand = expandable?.expandedRowKeys !== undefined
  const isControlledSelection = rowSelection?.selectedRowKeys !== undefined

  const effectiveSortState = useMemo(() => {
    if (isControlledSort) {
      const controlledCol = columns.find((col) => col.sortOrder !== undefined && col.sortOrder !== null)
      return {
        columnKey: controlledCol?.key ?? null,
        order: controlledCol?.sortOrder ?? null,
      }
    }
    return sortState
  }, [isControlledSort, columns, sortState])

  const effectiveFilterState = useMemo(() => {
    if (isControlledFilter) {
      const controlled: Record<string, (string | number | boolean)[]> = {}
      columns.forEach((col) => {
        if (col.filteredValue !== undefined) {
          controlled[col.key] = col.filteredValue
        }
      })
      return controlled
    }
    return filterState
  }, [isControlledFilter, columns, filterState])

  const effectiveSelectedKeys = isControlledSelection ? rowSelection!.selectedRowKeys! : selectedKeys
  const effectiveExpandedKeys = isControlledExpand ? expandable!.expandedRowKeys! : expandedKeys

  const isPaginationEnabled = pagination !== false

  // Visible columns (filter out hidden)
  const visibleColumns = useMemo(() => columns.filter((col) => !col.hidden), [columns])

  // Get row key helper
  const getRowKey = useCallback((record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record)
    }
    const keyValue = record[rowKey]
    return keyValue !== undefined ? String(keyValue) : String(index)
  }, [rowKey])

  // Apply filters
  const filteredData = useMemo(() => {
    let data = [...dataSource]
    Object.entries(effectiveFilterState).forEach(([columnKey, filterValues]) => {
      if (filterValues && filterValues.length > 0) {
        const column = columns.find((col) => col.key === columnKey)
        if (column?.onFilter) {
          data = data.filter((record) =>
            filterValues.some((value) => column.onFilter!(value, record))
          )
        }
      }
    })
    return data
  }, [dataSource, effectiveFilterState, columns])

  // Apply sorting
  const sortedData = useMemo(() => {
    if (!effectiveSortState.columnKey || !effectiveSortState.order) {
      return filteredData
    }
    const column = columns.find((col) => col.key === effectiveSortState.columnKey)
    if (!column?.sorter) {
      return filteredData
    }

    const sorted = [...filteredData]
    sorted.sort((a, b) => {
      let result = 0
      if (typeof column.sorter === 'function') {
        result = column.sorter(a, b)
      } else if (column.dataIndex) {
        const aVal = a[column.dataIndex]
        const bVal = b[column.dataIndex]
        if (aVal === undefined || aVal === null) return 1
        if (bVal === undefined || bVal === null) return -1
        if (aVal < bVal) result = -1
        if (aVal > bVal) result = 1
      }
      return effectiveSortState.order === 'ascend' ? result : -result
    })
    return sorted
  }, [filteredData, effectiveSortState, columns])

  const totalItems = pagination !== false && pagination?.total !== undefined ? pagination.total : sortedData.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = isPaginationEnabled ? sortedData.slice(startIndex, endIndex) : sortedData

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    if (pagination !== false && pagination?.onChange) {
      pagination.onChange(page, pageSize)
    }
    if (onChange) {
      const sorterResult: SorterResult<T> = {
        column: columns.find((col) => col.key === effectiveSortState.columnKey),
        order: effectiveSortState.order,
        field: effectiveSortState.columnKey ?? undefined,
      }
      onChange(
        { current: page, pageSize, total: totalItems },
        effectiveFilterState,
        sorterResult,
        { currentDataSource: sortedData, action: 'paginate' }
      )
    }
  }, [pagination, pageSize, onChange, columns, effectiveSortState, effectiveFilterState, sortedData, totalItems])

  const handlePageSizeChange = useCallback((newSize: number) => {
    setInternalPageSize(newSize)
    setCurrentPage(1)
    if (pagination !== false && pagination?.onShowSizeChange) {
      pagination.onShowSizeChange(1, newSize)
    }
    if (pagination !== false && pagination?.onChange) {
      pagination.onChange(1, newSize)
    }
  }, [pagination])

  const handleSort = useCallback((columnKey: string) => {
    const column = columns.find((col) => col.key === columnKey)
    let newOrder: 'ascend' | 'descend' | null = 'ascend'

    if (effectiveSortState.columnKey === columnKey) {
      if (effectiveSortState.order === 'ascend') newOrder = 'descend'
      else if (effectiveSortState.order === 'descend') newOrder = null
    }

    if (!isControlledSort) {
      setSortState({ columnKey: newOrder ? columnKey : null, order: newOrder })
    }
    setCurrentPage(1)

    const sorterResult: SorterResult<T> = {
      column,
      order: newOrder,
      field: columnKey,
    }

    onSortChange?.(sorterResult)

    if (onChange) {
      onChange(
        { current: 1, pageSize, total: totalItems },
        effectiveFilterState,
        sorterResult,
        { currentDataSource: sortedData, action: 'sort' }
      )
    }
  }, [columns, effectiveSortState, isControlledSort, pageSize, totalItems, effectiveFilterState, sortedData, onSortChange, onChange])

  const handleFilterChange = useCallback((columnKey: string, values: (string | number | boolean)[]) => {
    const newFilterState = {
      ...effectiveFilterState,
      [columnKey]: values,
    }

    if (!isControlledFilter) {
      setFilterState(newFilterState)
    }
    setCurrentPage(1)

    onFilterChange?.(newFilterState)

    if (onChange) {
      const sorterResult: SorterResult<T> = {
        column: columns.find((col) => col.key === effectiveSortState.columnKey),
        order: effectiveSortState.order,
        field: effectiveSortState.columnKey ?? undefined,
      }
      onChange(
        { current: 1, pageSize, total: totalItems },
        newFilterState,
        sorterResult,
        { currentDataSource: sortedData, action: 'filter' }
      )
    }
  }, [effectiveFilterState, isControlledFilter, columns, effectiveSortState, pageSize, totalItems, sortedData, onFilterChange, onChange])

  const handleSelectAll = useCallback((checked: boolean) => {
    const newSelectedKeys = checked
      ? paginatedData.map((record, index) => getRowKey(record, index))
      : []
    if (!isControlledSelection) {
      setSelectedKeys(newSelectedKeys)
    }
    if (rowSelection?.onChange) {
      const selectedRecords = checked ? paginatedData : []
      rowSelection.onChange(newSelectedKeys, selectedRecords)
    }
  }, [paginatedData, getRowKey, isControlledSelection, rowSelection])

  const handleSelectRow = useCallback((record: T, index: number, checked: boolean) => {
    const key = getRowKey(record, index)

    if (rowSelection?.type === 'radio') {
      const newSelectedKeys = checked ? [key] : []
      if (!isControlledSelection) {
        setSelectedKeys(newSelectedKeys)
      }
      if (rowSelection?.onChange) {
        rowSelection.onChange(newSelectedKeys, checked ? [record] : [])
      }
      return
    }

    const newSelectedKeys = checked
      ? [...effectiveSelectedKeys, key]
      : effectiveSelectedKeys.filter((k) => k !== key)

    if (!isControlledSelection) {
      setSelectedKeys(newSelectedKeys)
    }
    if (rowSelection?.onChange) {
      const selectedRecords = sortedData.filter((r, i) =>
        newSelectedKeys.includes(getRowKey(r, i))
      )
      rowSelection.onChange(newSelectedKeys, selectedRecords)
    }
  }, [getRowKey, rowSelection, isControlledSelection, effectiveSelectedKeys, sortedData])

  const handleExpand = useCallback((record: T, index: number) => {
    const key = getRowKey(record, index)
    const isExpanded = effectiveExpandedKeys.includes(key)
    const newExpandedKeys = isExpanded
      ? effectiveExpandedKeys.filter((k) => k !== key)
      : [...effectiveExpandedKeys, key]

    if (!isControlledExpand) {
      setExpandedKeys(newExpandedKeys)
    }
    expandable?.onExpand?.(!isExpanded, record)
    expandable?.onExpandedRowsChange?.(newExpandedKeys)
  }, [getRowKey, effectiveExpandedKeys, isControlledExpand, expandable])

  const getCellValue = useCallback((column: ColumnType<T>, record: T, index: number) => {
    if (column.render) {
      return column.render(
        column.dataIndex ? record[column.dataIndex] : undefined,
        record,
        index
      )
    }
    if (column.dataIndex) {
      const value = record[column.dataIndex]
      return value !== undefined && value !== null ? String(value) : ''
    }
    return ''
  }, [])

  const getAlignClass = (align?: 'left' | 'center' | 'right') => {
    if (align === 'center') return 'text-center'
    if (align === 'right') return 'text-right'
    return 'text-left'
  }

  // Calculate fixed column offsets
  const getFixedColumnStyle = useCallback((columnIndex: number, isHeader = false): { className: string; style?: React.CSSProperties } => {
    const column = visibleColumns[columnIndex]
    if (!column?.fixed) return { className: '' }

    const classes = ['sticky', 'bg-base-100']
    let offset = 0
    const style: React.CSSProperties = {
      boxSizing: 'border-box',
    }

    if (column.fixed === 'left') {
      for (let i = 0; i < columnIndex; i++) {
        if (visibleColumns[i].fixed === 'left' && visibleColumns[i].width) {
          const colWidth = visibleColumns[i].width!
          const width = typeof colWidth === 'number' ? colWidth : parseInt(String(colWidth))
          if (!isNaN(width)) offset += width
        }
      }
      if (offset === 0) {
        classes.push('left-0')
      } else {
        style.left = `${offset}px`
      }
      classes.push(isHeader ? 'z-30' : 'z-20')

      let lastLeftFixedIndex = -1
      for (let i = visibleColumns.length - 1; i >= 0; i--) {
        if (visibleColumns[i].fixed === 'left') {
          lastLeftFixedIndex = i
          break
        }
      }
      if (columnIndex === lastLeftFixedIndex) {
        style.boxShadow = '2px 0 4px rgba(0, 0, 0, 0.1)'
      }
    }

    if (column.fixed === 'right') {
      for (let i = columnIndex + 1; i < visibleColumns.length; i++) {
        if (visibleColumns[i].fixed === 'right' && visibleColumns[i].width) {
          const colWidth = visibleColumns[i].width!
          const width = typeof colWidth === 'number' ? colWidth : parseInt(String(colWidth))
          if (!isNaN(width)) offset += width
        }
      }
      if (offset === 0) {
        classes.push('right-0')
      } else {
        style.right = `${offset}px`
      }
      classes.push(isHeader ? 'z-30' : 'z-20')

      const isFirstRightFixed = columnIndex === visibleColumns.findIndex((col) => col.fixed === 'right')
      if (isFirstRightFixed) {
        style.boxShadow = '-2px 0 4px rgba(0, 0, 0, 0.1)'
      }
    }

    return {
      className: classes.filter(Boolean).join(' '),
      style: Object.keys(style).length > 0 ? style : undefined,
    }
  }, [visibleColumns])

  const tableClasses = [
    'd-table',
    'bg-base-100',
    sizeClasses[size],
    striped && 'd-table-zebra',
    pinRows && 'd-table-pin-rows',
    pinCols && 'd-table-pin-cols',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const hasFixedColumns = visibleColumns.some((col) => col.fixed)
  const hasExpandable = expandable !== undefined

  const wrapperStyle: React.CSSProperties = {}
  if (scroll?.x) {
    wrapperStyle.overflowX = 'auto'
    wrapperStyle.maxWidth = typeof scroll.x === 'number' ? `${scroll.x}px` : scroll.x
  }
  if (scroll?.y) {
    wrapperStyle.overflowY = 'auto'
    wrapperStyle.maxHeight = typeof scroll.y === 'number' ? `${scroll.y}px` : scroll.y
  }

  const wrapperClasses = [
    (!pinRows || hasFixedColumns || scroll?.x) && 'overflow-x-auto',
    bordered && 'd-rounded-box border border-base-content/5 bg-base-100',
  ]
    .filter(Boolean)
    .join(' ')

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8" data-testid={`${baseTestId}-loading`}>
        <span className="d-loading d-loading-spinner d-loading-lg" aria-label="Loading"></span>
      </div>
    )
  }

  const isAllSelected = paginatedData.length > 0 &&
    paginatedData.every((record, index) => effectiveSelectedKeys.includes(getRowKey(record, index)))
  const isSomeSelected = paginatedData.some((record, index) => effectiveSelectedKeys.includes(getRowKey(record, index)))

  const emptyText = locale?.emptyText ?? 'No data'

  // Calculate extra columns count (selection + expand)
  const extraColsCount = (rowSelection ? 1 : 0) + (hasExpandable ? 1 : 0)

  const renderPagination = () => {
    if (!isPaginationEnabled || totalPages <= 1) return null
    if (typeof pagination === 'boolean') return null

    const paginationConfig: PaginationConfig = pagination ?? {}
    const position = paginationConfig.position ?? 'bottomRight'
    const showSizeChanger = paginationConfig.showSizeChanger
    const showQuickJumper = paginationConfig.showQuickJumper
    const showTotal = paginationConfig.showTotal
    const pageSizeOptions = paginationConfig.pageSizeOptions ?? [10, 20, 50, 100]

    const justifyClass = position.includes('Left') ? 'justify-start' : position.includes('Center') ? 'justify-center' : 'justify-end'

    const paginationElement = (
      <div className={`flex items-center gap-4 ${justifyClass}`} data-testid={`${baseTestId}-pagination`}>
        {showTotal && (
          <span className="text-sm text-base-content/70">
            {showTotal(totalItems, [startIndex + 1, Math.min(endIndex, totalItems)])}
          </span>
        )}

        {showSizeChanger && (
          <select
            className="d-select d-select-sm d-select-bordered"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            aria-label="Page size"
            data-testid={`${baseTestId}-page-size`}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>{size} / page</option>
            ))}
          </select>
        )}

        <div className="d-join">
          <button
            type="button"
            className="d-join-item d-btn d-btn-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            data-testid={`${baseTestId}-prev`}
          >
            «
          </button>
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            let page: number
            if (totalPages <= 7) {
              page = i + 1
            } else if (currentPage <= 4) {
              page = i + 1
            } else if (currentPage >= totalPages - 3) {
              page = totalPages - 6 + i
            } else {
              page = currentPage - 3 + i
            }
            return (
              <button
                key={page}
                type="button"
                className={`d-join-item d-btn d-btn-sm ${currentPage === page ? 'd-btn-active' : ''}`}
                onClick={() => handlePageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
                data-testid={`${baseTestId}-page-${page}`}
              >
                {page}
              </button>
            )
          })}
          <button
            type="button"
            className="d-join-item d-btn d-btn-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            data-testid={`${baseTestId}-next`}
          >
            »
          </button>
        </div>

        {showQuickJumper && (
          <div className="flex items-center gap-2">
            <span className="text-sm">Go to</span>
            <input
              type="number"
              className="d-input d-input-sm d-input-bordered w-16"
              min={1}
              max={totalPages}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const value = parseInt((e.target as HTMLInputElement).value)
                  if (value >= 1 && value <= totalPages) {
                    handlePageChange(value)
                  }
                }
              }}
              aria-label="Go to page"
              data-testid={`${baseTestId}-jumper`}
            />
          </div>
        )}
      </div>
    )

    return paginationElement
  }

  const paginationPosition = pagination && typeof pagination !== 'boolean' ? pagination.position : undefined
  const topPagination = isPaginationEnabled && paginationPosition?.startsWith('top') ? renderPagination() : null
  const bottomPagination = isPaginationEnabled && (!paginationPosition || paginationPosition.startsWith('bottom')) ? renderPagination() : null

  return (
    <div className="space-y-4" data-testid={baseTestId} {...rest}>
      {topPagination}

      <div className={wrapperClasses} style={wrapperStyle}>
        <table
          ref={ref}
          className={tableClasses}
          style={{ borderCollapse: 'separate', borderSpacing: 0, tableLayout: 'fixed' }}
          role="grid"
          aria-label={ariaLabel}
          aria-rowcount={sortedData.length}
          data-testid={`${baseTestId}-table`}
        >
          <thead>
            <tr role="row">
              {hasExpandable && (
                <th style={{ width: 50 }} className="sticky left-0 z-20 bg-base-100" role="columnheader">
                  <span className="sr-only">Expand</span>
                </th>
              )}
              {rowSelection && (
                <th
                  style={{ width: 50 }}
                  className={`sticky ${hasExpandable ? '' : 'left-0'} z-20 bg-base-100`}
                  role="columnheader"
                >
                  {rowSelection.type !== 'radio' && (
                    <input
                      type="checkbox"
                      className="d-checkbox d-checkbox-sm d-checkbox-primary"
                      checked={isAllSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = isSomeSelected && !isAllSelected
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      aria-label={locale?.selectAll ?? 'Select all rows'}
                      data-testid={`${baseTestId}-select-all`}
                    />
                  )}
                </th>
              )}
              {visibleColumns.map((column, columnIndex) => {
                const fixedStyle = getFixedColumnStyle(columnIndex, true)
                const isSorted = effectiveSortState.columnKey === column.key
                const sortOrder = isSorted ? effectiveSortState.order : null

                return (
                  <th
                    key={column.key}
                    className={`${getAlignClass(column.align)} ${fixedStyle.className}`}
                    style={{
                      ...(column.width ? { width: column.width } : {}),
                      ...fixedStyle.style,
                    }}
                    role="columnheader"
                    aria-sort={sortOrder === 'ascend' ? 'ascending' : sortOrder === 'descend' ? 'descending' : undefined}
                    data-testid={`${baseTestId}-header-${column.key}`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={column.sorter ? 'cursor-pointer select-none hover:text-primary' : ''}
                        onClick={() => column.sorter && handleSort(column.key)}
                        onKeyDown={(e) => {
                          if (column.sorter && (e.key === 'Enter' || e.key === ' ')) {
                            e.preventDefault()
                            handleSort(column.key)
                          }
                        }}
                        tabIndex={column.sorter ? 0 : undefined}
                        role={column.sorter ? 'button' : undefined}
                        aria-label={column.sorter ? `Sort by ${column.title}` : undefined}
                      >
                        {column.title}
                      </span>
                      {column.sorter && (
                        <div className="flex flex-col" aria-hidden="true">
                          <svg
                            className={`w-3 h-3 ${sortOrder === 'ascend' ? 'text-primary' : 'text-base-content/30'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" />
                          </svg>
                          <svg
                            className={`w-3 h-3 -mt-1 ${sortOrder === 'descend' ? 'text-primary' : 'text-base-content/30'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" />
                          </svg>
                        </div>
                      )}
                      {column.filters && (
                        <FilterDropdown
                          filters={column.filters}
                          selectedValues={effectiveFilterState[column.key] || []}
                          onChange={(values) => handleFilterChange(column.key, values)}
                          locale={locale}
                          testId={`${baseTestId}-${column.key}`}
                        />
                      )}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr role="row">
                <td
                  colSpan={visibleColumns.length + extraColsCount}
                  className="text-center py-8 text-base-content/50"
                  role="gridcell"
                  data-testid={`${baseTestId}-empty`}
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              paginatedData.map((record, index) => {
                const rowProps = onRow?.(record, index) || {}
                const key = getRowKey(record, index)
                const isSelected = effectiveSelectedKeys.includes(key)
                const isExpanded = effectiveExpandedKeys.includes(key)
                const isExpandable = expandable?.rowExpandable ? expandable.rowExpandable(record) : true
                const rowClasses = [
                  hoverable && 'hover:bg-base-200',
                  isSelected && 'bg-primary/10',
                ]
                  .filter(Boolean)
                  .join(' ')

                const checkboxProps = rowSelection?.getCheckboxProps?.(record) || {}

                const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
                  rowProps.onClick?.(e)
                  if (expandable?.expandRowByClick && isExpandable) {
                    handleExpand(record, index)
                  }
                }

                return (
                  <React.Fragment key={key}>
                    <tr
                      className={rowClasses}
                      role="row"
                      aria-selected={isSelected}
                      data-testid={`${baseTestId}-row-${index}`}
                      data-state={isSelected ? 'selected' : undefined}
                      {...rowProps}
                      onClick={handleRowClick}
                    >
                      {hasExpandable && (
                        <td className="sticky left-0 z-10 bg-base-100" role="gridcell">
                          {isExpandable && (
                            expandable.expandIcon ? (
                              expandable.expandIcon({
                                expanded: isExpanded,
                                onExpand: () => handleExpand(record, index),
                                record,
                              })
                            ) : (
                              <DefaultExpandIcon
                                expanded={isExpanded}
                                onExpand={() => handleExpand(record, index)}
                              />
                            )
                          )}
                        </td>
                      )}
                      {rowSelection && (
                        <td
                          className={`sticky ${hasExpandable ? '' : 'left-0'} z-10 bg-base-100`}
                          role="gridcell"
                        >
                          <input
                            type={rowSelection.type === 'radio' ? 'radio' : 'checkbox'}
                            className={rowSelection.type === 'radio' ? 'd-radio d-radio-sm d-radio-primary' : 'd-checkbox d-checkbox-sm d-checkbox-primary'}
                            checked={isSelected}
                            onChange={(e) => handleSelectRow(record, index, e.target.checked)}
                            aria-label={`Select row ${index + 1}`}
                            data-testid={`${baseTestId}-row-${index}-select`}
                            {...checkboxProps}
                          />
                        </td>
                      )}
                      {visibleColumns.map((column, columnIndex) => {
                        const fixedStyle = getFixedColumnStyle(columnIndex, false)
                        const cellContent = getCellValue(column, record, index)

                        return (
                          <td
                            key={column.key}
                            className={`${getAlignClass(column.align)} ${fixedStyle.className} ${column.ellipsis ? 'truncate max-w-0' : ''}`}
                            style={fixedStyle.style}
                            role="gridcell"
                            title={column.ellipsis && typeof cellContent === 'string' ? cellContent : undefined}
                            data-testid={`${baseTestId}-row-${index}-${column.key}`}
                          >
                            {cellContent}
                          </td>
                        )
                      })}
                    </tr>
                    {hasExpandable && isExpanded && (
                      <tr
                        className="bg-base-200/50"
                        role="row"
                        data-testid={`${baseTestId}-row-${index}-expanded`}
                      >
                        <td
                          colSpan={visibleColumns.length + extraColsCount}
                          className="p-4"
                          role="gridcell"
                        >
                          {expandable.expandedRowRender(record, index, isExpanded)}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {bottomPagination}
    </div>
  )
}

export const Table = forwardRef(TableInner) as <T extends Record<string, unknown>>(
  props: TableProps<T> & { ref?: React.ForwardedRef<HTMLTableElement> }
) => React.ReactElement
