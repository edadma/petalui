import React, { useId } from 'react'

// DaisyUI classes
const dChat = 'chat'
const dChatStart = 'chat-start'
const dChatEnd = 'chat-end'
const dChatImage = 'chat-image'
const dChatHeader = 'chat-header'
const dChatBubble = 'chat-bubble'
const dChatBubblePrimary = 'chat-bubble-primary'
const dChatBubbleSecondary = 'chat-bubble-secondary'
const dChatBubbleAccent = 'chat-bubble-accent'
const dChatBubbleNeutral = 'chat-bubble-neutral'
const dChatBubbleInfo = 'chat-bubble-info'
const dChatBubbleSuccess = 'chat-bubble-success'
const dChatBubbleWarning = 'chat-bubble-warning'
const dChatBubbleError = 'chat-bubble-error'
const dChatFooter = 'chat-footer'
const dAvatar = 'avatar'

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
  const headerId = useId()
  const positionClass = position === 'start' ? dChatStart : dChatEnd

  const colorClasses: Record<string, string> = {
    primary: dChatBubblePrimary,
    secondary: dChatBubbleSecondary,
    accent: dChatBubbleAccent,
    neutral: dChatBubbleNeutral,
    info: dChatBubbleInfo,
    success: dChatBubbleSuccess,
    warning: dChatBubbleWarning,
    error: dChatBubbleError,
  }

  const bubbleClasses = [dChatBubble]
  if (color && colorClasses[color]) {
    bubbleClasses.push(colorClasses[color])
  }

  return (
    <article
      className={`${dChat} ${positionClass} ${className}`}
      aria-labelledby={header ? headerId : undefined}
      {...rest}
    >
      {avatar && (
        <div className={`${dChatImage} ${dAvatar}`}>
          <div className="w-10 rounded-full">
            <img alt={avatarAlt} src={avatar} />
          </div>
        </div>
      )}
      {header && <div id={headerId} className={dChatHeader}>{header}</div>}
      <div className={bubbleClasses.join(' ')}>{message}</div>
      {footer && <div className={dChatFooter}>{footer}</div>}
    </article>
  )
}
