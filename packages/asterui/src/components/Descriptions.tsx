import React, { forwardRef } from 'react'

export type DescriptionsSize = 'sm' | 'md' | 'lg'
export type DescriptionsLayout = 'horizontal' | 'vertical'

export interface DescriptionsItemProps {
  /** Label for the item */
  label?: React.ReactNode
  /** Number of columns to span */
  span?: number
  /** Content of the item */
  children?: React.ReactNode
  /** Custom label styles */
  labelStyle?: React.CSSProperties
  /** Custom content styles */
  contentStyle?: React.CSSProperties
}

/** Item configuration for the items prop */
export interface DescriptionsItemConfig {
  /** Label for the item */
  label: React.ReactNode
  /** Content of the item */
  children: React.ReactNode
  /** Number of columns to span */
  span?: number
  /** Custom label styles */
  labelStyle?: React.CSSProperties
  /** Custom content styles */
  contentStyle?: React.CSSProperties
}

export interface DescriptionsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Title of the descriptions block */
  title?: React.ReactNode
  /** Extra content in the top-right corner */
  extra?: React.ReactNode
  /** Show borders around cells */
  bordered?: boolean
  /** Number of columns (or responsive config) */
  column?: number | {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
  /** Size variant */
  size?: DescriptionsSize
  /** Layout direction */
  layout?: DescriptionsLayout
  /** Show colon after labels */
  colon?: boolean
  /** Default label styles */
  labelStyle?: React.CSSProperties
  /** Default content styles */
  contentStyle?: React.CSSProperties
  /** Item configurations (alternative to children) */
  items?: DescriptionsItemConfig[]
  /** Children (Descriptions.Item elements) */
  children?: React.ReactNode
  /** Test ID for the component */
  'data-testid'?: string
}

function DescriptionsItem(_props: DescriptionsItemProps) {
  return null
}

const sizeClasses: Record<DescriptionsSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

const DescriptionsRoot = forwardRef<HTMLDivElement, DescriptionsProps>(
  (
    {
      title,
      extra,
      bordered = false,
      column = 3,
      size = 'md',
      layout = 'horizontal',
      colon = true,
      labelStyle,
      contentStyle,
      items: itemsProp,
      className = '',
      style,
      children,
      'data-testid': testId = 'descriptions',
      ...rest
    },
    ref
  ) => {
    // Convert children to item configs, or use items prop
    const itemConfigs: DescriptionsItemConfig[] = itemsProp
      ? itemsProp
      : React.Children.toArray(children)
          .filter((child): child is React.ReactElement<DescriptionsItemProps> =>
            React.isValidElement(child)
          )
          .map((child) => ({
            label: child.props.label,
            children: child.props.children,
            span: child.props.span,
            labelStyle: child.props.labelStyle,
            contentStyle: child.props.contentStyle,
          }))

    const getColumnCount = () => {
      if (typeof column === 'number') {
        return column
      }
      return column.md || column.sm || column.xs || 3
    }

    const columnCount = getColumnCount()

    const renderVerticalLayout = () => {
      const rows: DescriptionsItemConfig[][] = []
      let currentRow: DescriptionsItemConfig[] = []
      let currentSpan = 0

      itemConfigs.forEach((item) => {
        const span = item.span || 1
        const effectiveSpan = Math.min(span, columnCount)

        if (currentSpan + effectiveSpan > columnCount) {
          rows.push(currentRow)
          currentRow = [item]
          currentSpan = effectiveSpan
        } else {
          currentRow.push(item)
          currentSpan += effectiveSpan
        }
      })

      if (currentRow.length > 0) {
        rows.push(currentRow)
      }

      return rows.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <tr>
            {row.map((item, cellIndex) => {
              const span = item.span || 1
              const effectiveSpan = Math.min(span, columnCount)
              const itemLabelStyle = item.labelStyle || labelStyle

              return (
                <th
                  key={cellIndex}
                  className={`${bordered ? 'border border-base-content/10' : ''} bg-base-200/50 font-semibold text-left px-4 py-2`}
                  style={itemLabelStyle}
                  colSpan={effectiveSpan}
                  scope="col"
                >
                  {item.label}
                  {colon && item.label && ':'}
                </th>
              )
            })}
          </tr>
          <tr>
            {row.map((item, cellIndex) => {
              const span = item.span || 1
              const effectiveSpan = Math.min(span, columnCount)
              const itemContentStyle = item.contentStyle || contentStyle

              return (
                <td
                  key={cellIndex}
                  className={`${bordered ? 'border border-base-content/10' : ''} bg-base-100 px-4 py-2`}
                  style={itemContentStyle}
                  colSpan={effectiveSpan}
                >
                  {item.children}
                </td>
              )
            })}
          </tr>
        </React.Fragment>
      ))
    }

    const renderHorizontalLayout = () => {
      const rows: DescriptionsItemConfig[][] = []
      let currentRow: DescriptionsItemConfig[] = []
      let currentSpan = 0

      itemConfigs.forEach((item) => {
        const span = item.span || 1
        const effectiveSpan = Math.min(span, columnCount)

        if (currentSpan + effectiveSpan > columnCount) {
          rows.push(currentRow)
          currentRow = [item]
          currentSpan = effectiveSpan
        } else {
          currentRow.push(item)
          currentSpan += effectiveSpan
        }
      })

      if (currentRow.length > 0) {
        rows.push(currentRow)
      }

      return rows.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((item, cellIndex) => {
            const span = item.span || 1
            const effectiveSpan = Math.min(span, columnCount)
            const itemLabelStyle = item.labelStyle || labelStyle
            const itemContentStyle = item.contentStyle || contentStyle

            return (
              <React.Fragment key={cellIndex}>
                <th
                  className={`${bordered ? 'border border-base-content/10' : ''} bg-base-200/50 font-semibold text-left px-4 py-2 whitespace-nowrap`}
                  style={itemLabelStyle}
                  scope="row"
                >
                  {item.label}
                  {colon && item.label && ':'}
                </th>
                <td
                  className={`${bordered ? 'border border-base-content/10' : ''} bg-base-100 px-4 py-2`}
                  style={itemContentStyle}
                  colSpan={effectiveSpan > 1 ? effectiveSpan * 2 - 1 : 1}
                >
                  {item.children}
                </td>
              </React.Fragment>
            )
          })}
        </tr>
      ))
    }

    const containerClasses = [
      'w-full',
      bordered && 'border-collapse',
      sizeClasses[size],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div
        ref={ref}
        style={style}
        data-testid={testId}
        {...rest}
      >
        {(title || extra) && (
          <div className="flex items-center justify-between mb-4" data-testid={`${testId}-header`}>
            {title && (
              <div className="text-lg font-semibold">{title}</div>
            )}
            {extra && (
              <div data-testid={`${testId}-extra`}>{extra}</div>
            )}
          </div>
        )}
        <table
          className={containerClasses}
          role="table"
          aria-label={typeof title === 'string' ? title : undefined}
          data-testid={`${testId}-table`}
        >
          <tbody>
            {layout === 'vertical' ? renderVerticalLayout() : renderHorizontalLayout()}
          </tbody>
        </table>
      </div>
    )
  }
)

DescriptionsRoot.displayName = 'Descriptions'

export const Descriptions = Object.assign(DescriptionsRoot, {
  Item: DescriptionsItem,
})

export default Descriptions
