import React from 'react'

// DaisyUI classes
const dAvatar = 'd-avatar'
const dAvatarOnline = 'd-avatar-online'
const dAvatarOffline = 'd-avatar-offline'
const dAvatarPlaceholder = 'd-avatar-placeholder'
const dAvatarGroup = 'd-avatar-group'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarShape = 'circle' | 'square'
export type AvatarStatus = 'online' | 'offline'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  icon?: React.ReactNode
  children?: React.ReactNode
  size?: AvatarSize
  shape?: AvatarShape
  status?: AvatarStatus
  // Legacy props for backwards compatibility
  online?: boolean
  offline?: boolean
  placeholder?: boolean
  /** Test ID for testing */
  'data-testid'?: string
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  max?: number
  size?: AvatarSize
  /** Test ID for testing */
  'data-testid'?: string
}

function AvatarRoot({
  src,
  alt = 'avatar',
  icon,
  children,
  size = 'md',
  shape = 'circle',
  status,
  className = '',
  style,
  // Legacy props
  online,
  offline,
  placeholder,
  ...rest
}: AvatarProps) {
  const sizeClasses: Record<AvatarSize, string> = {
    xs: 'w-8',
    sm: 'w-12',
    md: 'w-16',
    lg: 'w-20',
    xl: 'w-24',
  }

  const shapeClasses: Record<AvatarShape, string> = {
    circle: 'rounded-full',
    square: 'rounded',
  }

  // Handle legacy boolean props
  const resolvedStatus = status || (online ? 'online' : offline ? 'offline' : undefined)
  const isPlaceholder = placeholder || (!src && (icon || children))

  const avatarClasses = [
    dAvatar,
    resolvedStatus === 'online' && dAvatarOnline,
    resolvedStatus === 'offline' && dAvatarOffline,
    isPlaceholder && dAvatarPlaceholder,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const innerClasses = [sizeClasses[size], shapeClasses[shape]].filter(Boolean).join(' ')

  // Image avatar
  if (src) {
    return (
      <div className={avatarClasses} style={style} {...rest}>
        <div className={innerClasses}>
          <img src={src} alt={alt} />
        </div>
      </div>
    )
  }

  // Icon or text avatar (placeholder)
  const content = icon || children

  if (content) {
    return (
      <div className={avatarClasses} style={style} {...rest}>
        <div className={innerClasses}>
          <div className="bg-neutral text-neutral-content flex items-center justify-center w-full h-full">
            {content}
          </div>
        </div>
      </div>
    )
  }

  // Empty avatar
  return (
    <div className={avatarClasses} style={style} {...rest}>
      <div className={innerClasses}>
        <div className="bg-neutral-focus text-neutral-content w-full h-full" />
      </div>
    </div>
  )
}

function AvatarGroup({ children, max, size, className = '', style, ...rest }: AvatarGroupProps) {
  const avatars = React.Children.toArray(children)
  const displayAvatars = max ? avatars.slice(0, max) : avatars
  const remainingCount = max && avatars.length > max ? avatars.length - max : 0

  const sizeClasses: Record<AvatarSize, string> = {
    xs: 'w-8',
    sm: 'w-12',
    md: 'w-16',
    lg: 'w-20',
    xl: 'w-24',
  }

  return (
    <div className={`${dAvatarGroup} -space-x-6 rtl:space-x-reverse ${className}`} style={style} {...rest}>
      {displayAvatars}
      {remainingCount > 0 && (
        <div className={`${dAvatar} ${dAvatarPlaceholder}`}>
          <div className={`bg-neutral text-neutral-content rounded-full ${size ? sizeClasses[size] : 'w-12'}`}>
            <span>+{remainingCount}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export const Avatar = Object.assign(AvatarRoot, {
  Group: AvatarGroup,
})

export { AvatarGroup }

export default Avatar
