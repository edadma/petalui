import React from 'react'

// DaisyUI classes
const dMockupPhone = 'mockup-phone'
const dMockupPhoneCamera = 'mockup-phone-camera'
const dMockupPhoneDisplay = 'mockup-phone-display'

export interface PhoneProps {
  children: React.ReactNode
  color?: string
  className?: string
  displayClassName?: string
}

export const Phone: React.FC<PhoneProps> = ({
  children,
  color,
  className = '',
  displayClassName = '',
}) => {
  const style: React.CSSProperties = color ? { borderColor: color } : {}

  return (
    <div className={`${dMockupPhone} ${className}`} style={style}>
      <div className={dMockupPhoneCamera}></div>
      <div className={`${dMockupPhoneDisplay} ${displayClassName}`}>
        {children}
      </div>
    </div>
  )
}
