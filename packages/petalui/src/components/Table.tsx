import React, { useState } from 'react'

export interface ColumnType<T = any> {
  key: string
  title: string
  dataIndex?: string
  render?: (value: any, record: T, index: number) => React.ReactNode
  width?: string | number
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
  sorter?: boolean | ((a: T, b: T) => number)
}

export interface PaginationConfig {
  current?: number
  pageSize?: number
  total?: number
  onChange?: (page: number, pageSize: number) => void
}

export interface TableProps<T = any> {
  columns: ColumnType<T>[]
  dataSource: T[]
  rowKey?: string | ((record: T) => string)
  loading?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  bordered?: boolean
  hoverable?: boolean
  striped?: boolean
  pinRows?: boolean
  pinCols?: boolean
  pagination?: false | PaginationConfig
  className?: string
  onRow?: (record: T, index: number) => React.HTMLAttributes<HTMLTableRowElement>
}

export function Table<T extends Record<string, any>>({
  columns,
  dataSource,
  rowKey = 'id',
  loading = false,
  size = 'md',
  bordered = false,
  hoverable = true,
  striped = false,
  pinRows = false,
  pinCols = false,
  pagination,
  className = '',
  onRow,
}: TableProps<T>) {
  const defaultPageSize = 10
  const [currentPage, setCurrentPage] = useState(
    pagination !== false && pagination?.current ? pagination.current : 1
  )
  const pageSize = pagination !== false && pagination?.pageSize ? pagination.pageSize : defaultPageSize

  const isPaginationEnabled = pagination !== false
  const total = pagination !== false && pagination?.total !== undefined
    ? pagination.total
    : dataSource.length

  const totalPages = Math.ceil(total / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = isPaginationEnabled ? dataSource.slice(startIndex, endIndex) : dataSource

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    if (pagination !== false && pagination?.onChange) {
      pagination.onChange(page, pageSize)
    }
  }
  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record)
    }
    return record[rowKey] ?? index.toString()
  }

  const getCellValue = (column: ColumnType<T>, record: T, index: number) => {
    if (column.render) {
      return column.render(
        column.dataIndex ? record[column.dataIndex] : undefined,
        record,
        index
      )
    }
    return column.dataIndex ? record[column.dataIndex] : ''
  }

  const getAlignClass = (align?: 'left' | 'center' | 'right') => {
    if (align === 'center') return 'text-center'
    if (align === 'right') return 'text-right'
    return 'text-left'
  }

  const tableClasses = [
    'table',
    'bg-base-100',
    size === 'xs' && 'table-xs',
    size === 'sm' && 'table-sm',
    size === 'lg' && 'table-lg',
    striped && 'table-zebra',
    pinRows && 'table-pin-rows',
    pinCols && 'table-pin-cols',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const wrapperClasses = [
    !pinRows && 'overflow-x-auto',
    bordered && 'rounded-box border border-base-content/5 bg-base-100',
  ]
    .filter(Boolean)
    .join(' ')

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className={wrapperClasses}>
        <table className={tableClasses}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={getAlignClass(column.align)}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((record, index) => {
              const rowProps = onRow?.(record, index) || {}
              const rowClasses = hoverable ? 'hover:bg-base-300' : ''
              return (
                <tr
                  key={getRowKey(record, index)}
                  className={rowClasses}
                  {...rowProps}
                >
                  {columns.map((column) => (
                    <td key={column.key} className={getAlignClass(column.align)}>
                      {getCellValue(column, record, index)}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {isPaginationEnabled && totalPages > 1 && (
        <div className="flex justify-end">
          <div className="join">
            <button
              className="join-item btn btn-sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`join-item btn btn-sm ${currentPage === page ? 'btn-active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="join-item btn btn-sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
