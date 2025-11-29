import React from 'react'

export type DescriptionsSize = 'small' | 'default' | 'large'
export type DescriptionsLayout = 'horizontal' | 'vertical'

export interface DescriptionsItemProps {
  label?: React.ReactNode
  span?: number
  children?: React.ReactNode
  labelStyle?: React.CSSProperties
  contentStyle?: React.CSSProperties
}

export interface DescriptionsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode
  bordered?: boolean
  column?: number | {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
  size?: DescriptionsSize
  layout?: DescriptionsLayout
  colon?: boolean
  labelStyle?: React.CSSProperties
  contentStyle?: React.CSSProperties
  children?: React.ReactNode
}

function DescriptionsItem(_props: DescriptionsItemProps) {
  return null
}

function DescriptionsRoot({
  title,
  bordered = false,
  column = 3,
  size = 'default',
  layout = 'horizontal',
  colon = true,
  labelStyle,
  contentStyle,
  className = '',
  style,
  children,
  ...rest
}: DescriptionsProps) {
  const sizeClasses: Record<DescriptionsSize, string> = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg',
  }

  const items = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<DescriptionsItemProps> =>
      React.isValidElement(child)
  )

  const getColumnCount = () => {
    if (typeof column === 'number') {
      return column
    }
    // For responsive columns, default to md value or 3
    return column.md || column.sm || column.xs || 3
  }

  const columnCount = getColumnCount()

  const renderItems = () => {
    if (layout === 'vertical') {
      return items.map((item, index) => {
        const span = item.props.span || 1
        const effectiveSpan = Math.min(span, columnCount)
        const itemLabelStyle = item.props.labelStyle || labelStyle

        return (
          <React.Fragment key={index}>
            <th
              className={`${bordered ? 'border border-base-content/10' : ''} bg-base-200/50 font-semibold text-left px-4 py-2`}
              style={itemLabelStyle}
              colSpan={effectiveSpan}
            >
              {item.props.label}
              {colon && item.props.label && ':'}
            </th>
            {index % columnCount === columnCount - 1 && (
              <>
                {Array.from({ length: columnCount - ((index + 1) % columnCount || columnCount) }).map((_, i) => (
                  <th key={`empty-${i}`} className={`${bordered ? 'border border-base-content/10' : ''}`} />
                ))}
              </>
            )}
            {(index + 1) % columnCount === 0 && (
              <tr key={`content-row-${index}`}>
                {items.slice(index - columnCount + 1, index + 1).map((contentItem, ci) => {
                  const contentSpan = contentItem.props.span || 1
                  const effectiveContentSpan = Math.min(contentSpan, columnCount)
                  const itemContentStyle2 = contentItem.props.contentStyle || contentStyle

                  return (
                    <td
                      key={ci}
                      className={`${bordered ? 'border border-base-content/10' : ''} px-4 py-2`}
                      style={itemContentStyle2}
                      colSpan={effectiveContentSpan}
                    >
                      {contentItem.props.children}
                    </td>
                  )
                })}
              </tr>
            )}
          </React.Fragment>
        )
      })
    }

    // Horizontal layout
    const rows: React.ReactElement<DescriptionsItemProps>[][] = []
    let currentRow: React.ReactElement<DescriptionsItemProps>[] = []
    let currentSpan = 0

    items.forEach((item) => {
      const span = item.props.span || 1
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

    return rows.map((row, rowIndex) => {
      let usedSpan = 0
      const cells = row.map((item, cellIndex) => {
        const span = item.props.span || 1
        const effectiveSpan = Math.min(span, columnCount)
        const itemLabelStyle = item.props.labelStyle || labelStyle
        const itemContentStyle = item.props.contentStyle || contentStyle
        usedSpan += effectiveSpan

        return (
          <React.Fragment key={cellIndex}>
            <th
              className={`${bordered ? 'border border-base-content/10' : ''} bg-base-200/50 font-semibold text-left px-4 py-2 whitespace-nowrap`}
              style={itemLabelStyle}
            >
              {item.props.label}
              {colon && item.props.label && ':'}
            </th>
            <td
              className={`${bordered ? 'border border-base-content/10' : ''} px-4 py-2`}
              style={itemContentStyle}
              colSpan={effectiveSpan * 2 - 1}
            >
              {item.props.children}
            </td>
          </React.Fragment>
        )
      })

      // Fill remaining columns
      const remainingSpan = columnCount - usedSpan
      if (remainingSpan > 0) {
        cells.push(
          <React.Fragment key="empty">
            <th className={`${bordered ? 'border border-base-content/10' : ''}`} colSpan={remainingSpan * 2} />
          </React.Fragment>
        )
      }

      return <tr key={rowIndex}>{cells}</tr>
    })
  }

  const containerClasses = [
    'w-full',
    bordered && 'border-collapse',
    sizeClasses[size],
    className,
  ].filter(Boolean).join(' ')

  return (
    <div style={style} {...rest}>
      {title && (
        <div className="text-lg font-semibold mb-4">
          {title}
        </div>
      )}
      <table className={containerClasses}>
        <tbody>
          {renderItems()}
        </tbody>
      </table>
    </div>
  )
}

export const Descriptions = Object.assign(DescriptionsRoot, {
  Item: DescriptionsItem,
})

export default Descriptions
