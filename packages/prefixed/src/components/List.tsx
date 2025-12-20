import React, { forwardRef } from 'react'
import { Pagination } from './Pagination'
import { Loading } from './Loading'
import { useConfig } from './ConfigProvider'

// DaisyUI classes
const dList = 'd-list'
const dListRow = 'd-list-row'

export interface ListPaginationConfig {
  current?: number
  pageSize?: number
  total?: number
  onChange?: (page: number, pageSize: number) => void
}

export interface ListGridConfig {
  gutter?: number
  column?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

export interface ListProps<T = unknown> extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'> {
  /** Data source array */
  dataSource?: T[]
  /** Function to render each item */
  renderItem?: (item: T, index: number) => React.ReactNode
  /** List header content */
  header?: React.ReactNode
  /** List footer content */
  footer?: React.ReactNode
  /** Show loading state */
  loading?: boolean
  /** Pagination configuration or false to disable */
  pagination?: ListPaginationConfig | false
  /** Grid layout configuration */
  grid?: ListGridConfig
  /** Show border around list */
  bordered?: boolean
  /** Show divider between items */
  split?: boolean
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Layout direction */
  itemLayout?: 'horizontal' | 'vertical'
  /** Empty state text */
  locale?: { emptyText?: React.ReactNode }
  /** Load more content (e.g., button) */
  loadMore?: React.ReactNode
  /** Custom key extraction function */
  rowKey?: keyof T | ((item: T) => React.Key)
  /** Compound pattern children */
  children?: React.ReactNode
  /** Accessible label for the list */
  'aria-label'?: string
  /** Test ID for the component */
  'data-testid'?: string
}

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /** Item content */
  children: React.ReactNode
  /** Action buttons */
  actions?: React.ReactNode[]
  /** Extra content on the right */
  extra?: React.ReactNode
  /** Test ID for this item */
  'data-testid'?: string
}

export interface ListItemMetaProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Avatar or icon */
  avatar?: React.ReactNode
  /** Title content */
  title?: React.ReactNode
  /** Description content */
  description?: React.ReactNode
}

// Also export as ListRowProps for backwards compatibility with DaisyUI pattern
export type ListRowProps = ListItemProps

const sizeClasses = {
  xs: 'py-1',
  sm: 'py-2',
  md: 'py-3',
  lg: 'py-4',
  xl: 'py-5',
}

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, actions, extra, className = '', 'data-testid': testId, ...rest }, ref) => {
    const classes = [dListRow, className].filter(Boolean).join(' ')

    return (
      <li ref={ref} className={classes} data-testid={testId} {...rest}>
        <div className="flex-1">{children}</div>
        {extra && <div className="flex-shrink-0">{extra}</div>}
        {actions && actions.length > 0 && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {actions.map((action, index) => (
              <span key={index}>{action}</span>
            ))}
          </div>
        )}
      </li>
    )
  }
)

ListItem.displayName = 'List.Item'

const ListItemMeta: React.FC<ListItemMetaProps> = ({
  avatar,
  title,
  description,
  className = '',
  ...rest
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`} {...rest}>
      {avatar && <div className="flex-shrink-0">{avatar}</div>}
      <div className="flex-1 min-w-0">
        {title && <div className="font-medium truncate">{title}</div>}
        {description && (
          <div className="text-sm text-base-content/70 truncate">{description}</div>
        )}
      </div>
    </div>
  )
}

ListItemMeta.displayName = 'List.Item.Meta'

const ListRoot = forwardRef<HTMLUListElement, ListProps>(
  (
    {
      dataSource,
      renderItem,
      header,
      footer,
      loading = false,
      pagination = false,
      grid,
      bordered = true,
      split = true,
      size,
      itemLayout = 'horizontal',
      locale,
      loadMore,
      rowKey,
      children,
      className = '',
      'aria-label': ariaLabel,
      'data-testid': testId = 'list',
      ...rest
    },
    ref
  ) => {
    const { componentSize } = useConfig()
    const effectiveSize = size ?? componentSize ?? 'md'

    const listClasses = [
      `${dList} bg-base-100 rounded-box`,
      bordered && 'border border-base-300',
      split && `[&_.${dListRow}]:border-b [&_.${dListRow}]:border-base-200 [&_.${dListRow}:last-child]:border-b-0`,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const itemClasses = sizeClasses[effectiveSize]

    // Grid styles
    const gridStyles: React.CSSProperties = grid
      ? {
          display: 'grid',
          gridTemplateColumns: `repeat(${grid.column || 1}, minmax(0, 1fr))`,
          gap: grid.gutter ? `${grid.gutter}px` : undefined,
        }
      : {}

    // Get key for item
    const getItemKey = (item: unknown, index: number): React.Key => {
      if (!rowKey) return index
      if (typeof rowKey === 'function') return rowKey(item as Parameters<typeof rowKey>[0])
      return String((item as Record<string, unknown>)[rowKey as string] ?? index)
    }

    // Layout class for vertical items
    const layoutClass = itemLayout === 'vertical' ? 'flex-col items-start' : ''

    // Render items from dataSource or children
    const renderContent = () => {
      if (loading) {
        return (
          <div className="flex justify-center py-8" data-testid={`${testId}-loading`} role="status">
            <Loading size="md" aria-label="Loading list" />
          </div>
        )
      }

      // Use dataSource + renderItem if provided
      if (dataSource && renderItem) {
        if (dataSource.length === 0) {
          return (
            <div className="text-center py-8 text-base-content/50" data-testid={`${testId}-empty`}>
              {locale?.emptyText ?? 'No data'}
            </div>
          )
        }

        return dataSource.map((item, index) => {
          const rendered = renderItem(item, index)
          const key = getItemKey(item, index)
          // Inject size and layout classes into list items
          if (React.isValidElement(rendered)) {
            const existingClassName = (rendered.props as { className?: string }).className || ''
            return React.cloneElement(rendered, {
              key,
              className: `${existingClassName} ${itemClasses} ${layoutClass}`.trim(),
              'data-testid': `${testId}-item-${index}`,
            } as React.Attributes & { className?: string; 'data-testid'?: string })
          }
          return rendered
        })
      }

      // Use compound children pattern
      if (children) {
        return React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            const existingClassName = (child.props as { className?: string }).className || ''
            return React.cloneElement(child, {
              className: `${existingClassName} ${itemClasses} ${layoutClass}`.trim(),
              'data-testid': `${testId}-item-${index}`,
            } as React.Attributes & { className?: string; 'data-testid'?: string })
          }
          return child
        })
      }

      return (
        <div className="text-center py-8 text-base-content/50" data-testid={`${testId}-empty`}>
          {locale?.emptyText ?? 'No data'}
        </div>
      )
    }

    return (
      <div data-testid={testId} aria-busy={loading}>
        {header && (
          <div className="px-4 py-3 border-b border-base-200 font-medium" data-testid={`${testId}-header`}>
            {header}
          </div>
        )}

        <ul
          ref={ref}
          role="list"
          aria-label={ariaLabel}
          className={listClasses}
          style={gridStyles}
          {...rest}
        >
          {renderContent()}
        </ul>

        {footer && (
          <div className="px-4 py-3 border-t border-base-200" data-testid={`${testId}-footer`}>
            {footer}
          </div>
        )}

        {loadMore && (
          <div className="py-4 text-center" data-testid={`${testId}-load-more`}>
            {loadMore}
          </div>
        )}

        {pagination && pagination.total !== undefined && (
          <div className="flex justify-end pt-4" data-testid={`${testId}-pagination`}>
            <Pagination
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={pagination.onChange}
            />
          </div>
        )}
      </div>
    )
  }
)

ListRoot.displayName = 'List'

// Compound component with Item and Item.Meta
const ItemWithMeta = Object.assign(ListItem, {
  Meta: ListItemMeta,
})

export const List = Object.assign(ListRoot, {
  Item: ItemWithMeta,
  Row: ListItem, // Backwards compatibility with DaisyUI pattern
})
