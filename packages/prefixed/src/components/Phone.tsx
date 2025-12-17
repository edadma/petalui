import React from 'react'

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
    <div className={`d-mockup-phone ${className}`} style={style}>
      <div className="d-mockup-phone-camera"></div>
      <div className={`d-mockup-phone-display ${displayClassName}`}>
        {children}
      </div>
    </div>
  )
}
