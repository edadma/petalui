import React, { useId } from 'react'

// DaisyUI classes
const dChat = 'd-chat'
const dChatStart = 'd-chat-start'
const dChatEnd = 'd-chat-end'
const dChatImage = 'd-chat-image'
const dChatHeader = 'd-chat-header'
const dChatBubble = 'd-chat-bubble'
const dChatBubblePrimary = 'd-chat-bubble-primary'
const dChatBubbleSecondary = 'd-chat-bubble-secondary'
const dChatBubbleAccent = 'd-chat-bubble-accent'
const dChatBubbleNeutral = 'd-chat-bubble-neutral'
const dChatBubbleInfo = 'd-chat-bubble-info'
const dChatBubbleSuccess = 'd-chat-bubble-success'
const dChatBubbleWarning = 'd-chat-bubble-warning'
const dChatBubbleError = 'd-chat-bubble-error'
const dChatFooter = 'd-chat-footer'
const dAvatar = 'd-avatar'

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
