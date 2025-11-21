import React from 'react'

export interface ChatProps {
  message: React.ReactNode
  position?: 'start' | 'end'
  avatar?: string
  avatarAlt?: string
  header?: React.ReactNode
  footer?: React.ReactNode
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'
  className?: string
}

export const Chat: React.FC<ChatProps> = ({
  message,
  position = 'start',
  avatar,
  avatarAlt = '',
  header,
  footer,
  color,
  className = '',
}) => {
  const positionClass = position === 'start' ? 'chat-start' : 'chat-end'

  const colorClasses: Record<string, string> = {
    primary: 'chat-bubble-primary',
    secondary: 'chat-bubble-secondary',
    accent: 'chat-bubble-accent',
    neutral: 'chat-bubble-neutral',
    info: 'chat-bubble-info',
    success: 'chat-bubble-success',
    warning: 'chat-bubble-warning',
    error: 'chat-bubble-error',
  }

  const bubbleClasses = ['chat-bubble']
  if (color && colorClasses[color]) {
    bubbleClasses.push(colorClasses[color])
  }

  return (
    <div className={`chat ${positionClass} ${className}`}>
      {avatar && (
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt={avatarAlt} src={avatar} />
          </div>
        </div>
      )}
      {header && <div className="chat-header">{header}</div>}
      <div className={bubbleClasses.join(' ')}>{message}</div>
      {footer && <div className="chat-footer">{footer}</div>}
    </div>
  )
}
