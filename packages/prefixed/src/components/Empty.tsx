import React, { forwardRef } from 'react'

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Extra content like buttons or actions */
  children?: React.ReactNode
  /** Text or node to display as description */
  description?: React.ReactNode
  /** Custom image or icon; set to null to hide */
  image?: React.ReactNode
  /** Styling applied to the image container */
  imageStyle?: React.CSSProperties
  /** Test ID for the component */
  'data-testid'?: string
}

const DefaultEmptyImage: React.FC = () => (
  <svg
    width="184"
    height="152"
    viewBox="0 0 184 152"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto"
    aria-hidden="true"
  >
    <g fill="none" fillRule="evenodd">
      <g transform="translate(24 31.67)">
        <ellipse
          className="fill-base-300"
          cx="67.797"
          cy="106.89"
          rx="67.797"
          ry="12.668"
        />
        <path
          className="fill-base-200"
          d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
        />
        <path
          className="fill-base-100"
          d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z"
          transform="translate(13.56)"
        />
        <ellipse
          className="fill-base-300"
          cx="67.797"
          cy="106.89"
          rx="67.797"
          ry="12.668"
        />
        <path
          className="fill-base-200"
          d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
        />
        <path
          className="fill-base-content opacity-10"
          d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
        />
        <path
          className="fill-base-100"
          d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
        />
      </g>
      <path
        className="fill-base-content opacity-10"
        d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
      />
      <g className="fill-base-100" transform="translate(149.65 15.383)">
        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
      </g>
    </g>
  </svg>
)

// Simple/minimal empty image (matches Ant Design's PRESENTED_IMAGE_SIMPLE)
const SimpleEmptyImage: React.FC = () => (
  <svg
    width="64"
    height="41"
    viewBox="0 0 64 41"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto"
    aria-hidden="true"
  >
    <g transform="translate(0 1)" fill="none" fillRule="evenodd">
      <ellipse className="fill-base-300" cx="32" cy="33" rx="32" ry="7" />
      <g fillRule="nonzero" className="stroke-base-content/20">
        <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
        <path
          d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
          className="fill-base-200"
        />
      </g>
    </g>
  </svg>
)

const EmptyRoot = forwardRef<HTMLDivElement, EmptyProps>(
  (
    {
      children,
      className = '',
      description = 'No Data',
      image,
      imageStyle,
      'data-testid': testId = 'empty',
      ...rest
    },
    ref
  ) => {
    const classes = ['flex flex-col items-center justify-center py-8 px-4', className]
      .filter(Boolean)
      .join(' ')

    return (
      <div
        ref={ref}
        className={classes}
        role="status"
        aria-label={typeof description === 'string' ? description : 'Empty'}
        data-testid={testId}
        {...rest}
      >
        {image !== null && (
          <div className="mb-2" style={imageStyle} data-testid={`${testId}-image`}>
            {image === undefined ? <DefaultEmptyImage /> : image}
          </div>
        )}
        {description && (
          <div className="text-base-content/60 text-sm mb-4" data-testid={`${testId}-description`}>
            {description}
          </div>
        )}
        {children && (
          <div className="mt-2" data-testid={`${testId}-footer`}>
            {children}
          </div>
        )}
      </div>
    )
  }
)

EmptyRoot.displayName = 'Empty'

// Export with static image constants (like Ant Design)
export const Empty = Object.assign(EmptyRoot, {
  PRESENTED_IMAGE_DEFAULT: <DefaultEmptyImage />,
  PRESENTED_IMAGE_SIMPLE: <SimpleEmptyImage />,
})
