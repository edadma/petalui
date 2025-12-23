import React from 'react'

// DaisyUI classes
const dMockupPhone = 'd-mockup-phone'
const dMockupPhoneCamera = 'd-mockup-phone-camera'
const dMockupPhoneDisplay = 'd-mockup-phone-display'

export interface PhoneProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  color?: string
  displayClassName?: string
  /** Test ID for testing */
  'data-testid'?: string
}

export const Phone: React.FC<PhoneProps> = ({
  children,
  color,
  className = '',
  displayClassName = '',
  'data-testid': testId,
  ...rest
}) => {
  const style: React.CSSProperties = color ? { borderColor: color } : {}

  return (
    <div className={`${dMockupPhone} ${className}`} style={style} data-testid={testId} {...rest}>
      <div className={dMockupPhoneCamera}></div>
      <div className={`${dMockupPhoneDisplay} ${displayClassName}`}>
        {children}
      </div>
    </div>
  )
}
