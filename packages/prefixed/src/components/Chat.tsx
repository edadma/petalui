import React from 'react'

export interface ChatProps extends React.HTMLAttributes<HTMLDivElement> {
  message: React.ReactNode
  position?: 'start' | 'end'
  avatar?: string
  avatarAlt?: string
  header?: React.ReactNode
  footer?: React.ReactNode
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'
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
  ...rest
}) => {
  const positionClass = position === 'start' ? 'd-chat-start' : 'd-chat-end'

  const colorClasses: Record<string, string> = {
    primary: 'd-chat-bubble-primary',
    secondary: 'd-chat-bubble-secondary',
    accent: 'd-chat-bubble-accent',
    neutral: 'd-chat-bubble-neutral',
    info: 'd-chat-bubble-info',
    success: 'd-chat-bubble-success',
    warning: 'd-chat-bubble-warning',
    error: 'd-chat-bubble-error',
  }

  const bubbleClasses = ['d-chat-bubble']
  if (color && colorClasses[color]) {
    bubbleClasses.push(colorClasses[color])
  }

  return (
    <div className={`d-chat ${positionClass} ${className}`} {...rest}>
      {avatar && (
        <div className="d-chat-image d-avatar">
          <div className="w-10 rounded-full">
            <img alt={avatarAlt} src={avatar} />
          </div>
        </div>
      )}
      {header && <div className="d-chat-header">{header}</div>}
      <div className={bubbleClasses.join(' ')}>{message}</div>
      {footer && <div className="d-chat-footer">{footer}</div>}
    </div>
  )
}
