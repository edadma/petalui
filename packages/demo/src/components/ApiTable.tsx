export interface ApiProperty {
  property: string
  description: string
  type: string
  default?: string
}

export interface ApiTableProps {
  data: ApiProperty[]
  title?: string
  className?: string
}

export function ApiTable({ data, title, className = '' }: ApiTableProps) {
  return (
    <div className={className}>
      {title && (
        <h3 className="text-xl font-bold font-mono mb-4">{title}</h3>
      )}
      <div className="overflow-x-auto border border-base-content/10 rounded-lg">
        <table className="table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Description</th>
              <th>Type</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            {data.map((prop) => (
              <tr key={prop.property}>
                <td>
                  <code className="text-sm bg-base-200 px-2 py-1 rounded">
                    {prop.property}
                  </code>
                </td>
                <td>{prop.description}</td>
                <td>
                  <code className="text-sm text-primary">{prop.type}</code>
                </td>
                <td>
                  {prop.default ? (
                    <code className="text-sm">{prop.default}</code>
                  ) : (
                    <span className="text-base-content/50">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
