import React from 'react'

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  current?: number
  defaultCurrent?: number
  total: number
  pageSize?: number
  defaultPageSize?: number
  pageSizeOptions?: number[]
  onChange?: (page: number, pageSize: number) => void
  onShowSizeChange?: (current: number, size: number) => void
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  showTotal?: boolean | ((total: number, range: [number, number]) => React.ReactNode)
  simple?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export const Pagination: React.FC<PaginationProps> = ({
  current: controlledCurrent,
  defaultCurrent = 1,
  total,
  pageSize: controlledPageSize,
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  onChange,
  onShowSizeChange,
  showSizeChanger = false,
  showQuickJumper = false,
  showTotal = false,
  simple = false,
  size = 'md',
  disabled = false,
  className = '',
  ...rest
}) => {
  const [internalCurrent, setInternalCurrent] = React.useState(defaultCurrent)
  const [internalPageSize, setInternalPageSize] = React.useState(defaultPageSize)
  const [jumpPage, setJumpPage] = React.useState('')

  const current = controlledCurrent !== undefined ? controlledCurrent : internalCurrent
  const pageSize = controlledPageSize !== undefined ? controlledPageSize : internalPageSize
  const totalPages = Math.ceil(total / pageSize)

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || disabled) return

    if (controlledCurrent === undefined) {
      setInternalCurrent(page)
    }
    onChange?.(page, pageSize)
  }

  const handlePageSizeChange = (newSize: number) => {
    const newTotalPages = Math.ceil(total / newSize)
    const newCurrent = current > newTotalPages ? newTotalPages : current

    if (controlledPageSize === undefined) {
      setInternalPageSize(newSize)
    }
    if (controlledCurrent === undefined && newCurrent !== current) {
      setInternalCurrent(newCurrent)
    }

    onShowSizeChange?.(newCurrent, newSize)
    onChange?.(newCurrent, newSize)
  }

  const handleJumpPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const page = parseInt(jumpPage)
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        handlePageChange(page)
        setJumpPage('')
      }
    }
  }

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = []
    const showPages = 7

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (current <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (current >= totalPages - 2) {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      }
    }

    return pages
  }

  const sizeClass = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  }[size]

  const range: [number, number] = [
    (current - 1) * pageSize + 1,
    Math.min(current * pageSize, total),
  ]

  if (simple) {
    return (
      <div className={`flex items-center gap-2 ${className}`} {...rest}>
        <button
          className={`btn btn-ghost ${sizeClass}`}
          onClick={() => handlePageChange(current - 1)}
          disabled={disabled || current === 1}
        >
          ‹
        </button>
        <span className="text-sm">
          {current} / {totalPages}
        </span>
        <button
          className={`btn btn-ghost ${sizeClass}`}
          onClick={() => handlePageChange(current + 1)}
          disabled={disabled || current === totalPages}
        >
          ›
        </button>
      </div>
    )
  }

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`} {...rest}>
      {/* Total */}
      {showTotal && (
        <div className="text-sm text-base-content/70">
          {typeof showTotal === 'function'
            ? showTotal(total, range)
            : `Total ${total} items`}
        </div>
      )}

      {/* Page Size Changer */}
      {showSizeChanger && (
        <select
          className={`select select-bordered ${sizeClass}`}
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          disabled={disabled}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      )}

      {/* Pagination Controls */}
      <div className="join">
        {/* First */}
        <button
          className={`join-item btn ${sizeClass}`}
          onClick={() => handlePageChange(1)}
          disabled={disabled || current === 1}
          title="First page"
        >
          «
        </button>

        {/* Previous */}
        <button
          className={`join-item btn ${sizeClass}`}
          onClick={() => handlePageChange(current - 1)}
          disabled={disabled || current === 1}
          title="Previous page"
        >
          ‹
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <button key={`ellipsis-${index}`} className={`join-item btn btn-disabled ${sizeClass}`}>
                ...
              </button>
            )
          }

          return (
            <button
              key={page}
              className={`join-item btn ${sizeClass} ${current === page ? 'btn-active' : ''}`}
              onClick={() => handlePageChange(page)}
              disabled={disabled}
            >
              {page}
            </button>
          )
        })}

        {/* Next */}
        <button
          className={`join-item btn ${sizeClass}`}
          onClick={() => handlePageChange(current + 1)}
          disabled={disabled || current === totalPages}
          title="Next page"
        >
          ›
        </button>

        {/* Last */}
        <button
          className={`join-item btn ${sizeClass}`}
          onClick={() => handlePageChange(totalPages)}
          disabled={disabled || current === totalPages}
          title="Last page"
        >
          »
        </button>
      </div>

      {/* Quick Jumper */}
      {showQuickJumper && (
        <div className="flex items-center gap-2">
          <span className="text-sm">Go to</span>
          <input
            type="number"
            className={`input input-bordered w-16 ${sizeClass}`}
            min={1}
            max={totalPages}
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            onKeyDown={handleJumpPage}
            disabled={disabled}
            placeholder={String(current)}
          />
        </div>
      )}
    </div>
  )
}
