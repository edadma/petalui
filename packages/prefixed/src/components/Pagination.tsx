import React, { forwardRef } from 'react'
import { useConfig } from './ConfigProvider'

// DaisyUI classes
const dBtn = 'd-btn'
const dBtnGhost = 'd-btn-ghost'
const dBtnActive = 'd-btn-active'
const dBtnDisabled = 'd-btn-disabled'
const dBtnXs = 'd-btn-xs'
const dBtnSm = 'd-btn-sm'
const dBtnLg = 'd-btn-lg'
const dBtnXl = 'd-btn-xl'
const dSelect = 'd-select'
const dSelectBordered = 'd-select-bordered'
const dJoin = 'd-join'
const dJoinItem = 'd-join-item'
const dInput = 'd-input'

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
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  /** Test ID prefix for child elements */
  'data-testid'?: string
}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(function Pagination(
  {
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
    size,
    disabled = false,
    'data-testid': testId,
    className = '',
    ...rest
  },
  ref
) {
  const { componentSize, locale } = useConfig()
  const effectiveSize = size ?? componentSize ?? 'md'

  // Helper for test IDs
  const getTestId = (suffix: string) => (testId ? `${testId}-${suffix}` : undefined)

  // Locale strings with fallbacks
  const l = locale.Pagination ?? {}
  const itemsPerPageText = l.itemsPerPage ?? '/ page'
  const goToText = l.goTo ?? 'Go to'
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
    xs: dBtnXs,
    sm: dBtnSm,
    md: '',
    lg: dBtnLg,
    xl: dBtnXl,
  }[effectiveSize]

  const range: [number, number] = [
    (current - 1) * pageSize + 1,
    Math.min(current * pageSize, total),
  ]

  if (simple) {
    return (
      <div ref={ref} className={`flex items-center gap-2 ${className}`} data-testid={testId} {...rest}>
        <button
          className={`${dBtn} ${dBtnGhost} ${sizeClass}`}
          onClick={() => handlePageChange(current - 1)}
          disabled={disabled || current === 1}
          data-testid={getTestId('prev')}
          aria-label={l.prev ?? 'Previous'}
        >
          ‹
        </button>
        <span className="text-sm">
          {current} / {totalPages}
        </span>
        <button
          className={`${dBtn} ${dBtnGhost} ${sizeClass}`}
          onClick={() => handlePageChange(current + 1)}
          disabled={disabled || current === totalPages}
          data-testid={getTestId('next')}
          aria-label={l.next ?? 'Next'}
        >
          ›
        </button>
      </div>
    )
  }

  return (
    <div ref={ref} className={`flex flex-wrap items-center gap-4 ${className}`} data-testid={testId} {...rest}>
      {/* Total */}
      {showTotal && (
        <div className="text-sm text-base-content/70" data-testid={getTestId('total')}>
          {typeof showTotal === 'function'
            ? showTotal(total, range)
            : `Total ${total} ${l.items ?? 'items'}`}
        </div>
      )}

      {/* Page Size Changer */}
      {showSizeChanger && (
        <select
          className={`${dSelect} ${dSelectBordered} ${sizeClass}`}
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          disabled={disabled}
          data-testid={getTestId('size-changer')}
        >
          {pageSizeOptions.map((sz) => (
            <option key={sz} value={sz}>
              {sz} {itemsPerPageText}
            </option>
          ))}
        </select>
      )}

      {/* Pagination Controls */}
      <div className={dJoin} data-testid={getTestId('controls')}>
        {/* First */}
        <button
          className={`${dJoinItem} ${dBtn} ${sizeClass}`}
          onClick={() => handlePageChange(1)}
          disabled={disabled || current === 1}
          aria-label="First page"
          data-testid={getTestId('first')}
        >
          «
        </button>

        {/* Previous */}
        <button
          className={`${dJoinItem} ${dBtn} ${sizeClass}`}
          onClick={() => handlePageChange(current - 1)}
          disabled={disabled || current === 1}
          aria-label={l.prev ?? 'Previous'}
          data-testid={getTestId('prev')}
        >
          ‹
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <button key={`ellipsis-${index}`} className={`${dJoinItem} ${dBtn} ${dBtnDisabled} ${sizeClass}`}>
                ...
              </button>
            )
          }

          return (
            <button
              key={page}
              className={`${dJoinItem} ${dBtn} ${sizeClass} ${current === page ? dBtnActive : ''}`}
              onClick={() => handlePageChange(page)}
              disabled={disabled}
              data-testid={getTestId(`page-${page}`)}
              aria-current={current === page ? 'page' : undefined}
            >
              {page}
            </button>
          )
        })}

        {/* Next */}
        <button
          className={`${dJoinItem} ${dBtn} ${sizeClass}`}
          onClick={() => handlePageChange(current + 1)}
          disabled={disabled || current === totalPages}
          aria-label={l.next ?? 'Next'}
          data-testid={getTestId('next')}
        >
          ›
        </button>

        {/* Last */}
        <button
          className={`${dJoinItem} ${dBtn} ${sizeClass}`}
          onClick={() => handlePageChange(totalPages)}
          disabled={disabled || current === totalPages}
          aria-label="Last page"
          data-testid={getTestId('last')}
        >
          »
        </button>
      </div>

      {/* Quick Jumper */}
      {showQuickJumper && (
        <div className="flex items-center gap-2">
          <span className="text-sm">{goToText}</span>
          <input
            type="number"
            className={`${dInput} w-16 ${sizeClass}`}
            min={1}
            max={totalPages}
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            onKeyDown={handleJumpPage}
            disabled={disabled}
            placeholder={String(current)}
            data-testid={getTestId('jumper')}
          />
        </div>
      )}
    </div>
  )
})
