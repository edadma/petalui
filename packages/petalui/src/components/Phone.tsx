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
    <div className={`mockup-phone ${className}`} style={style}>
      <div className="mockup-phone-camera"></div>
      <div className={`mockup-phone-display ${displayClassName}`}>
        {children}
      </div>
    </div>
  )
}
