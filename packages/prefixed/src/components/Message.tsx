import React from 'react'
import { notification } from './Notification'

// DaisyUI classes
const dLoading = 'd-loading'
const dLoadingSpinner = 'd-loading-spinner'
const dLoadingSm = 'd-loading-sm'

export interface MessageConfig {
  duration?: number
  key?: string
  icon?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  'data-testid'?: string
  onClick?: () => void
  onClose?: () => void
}

export class MessageManager {
  success(content: React.ReactNode, config?: MessageConfig) {
    return notification.open({
      message: content,
      type: 'success',
      variant: 'compact',
      ...config,
    })
  }

  error(content: React.ReactNode, config?: MessageConfig) {
    return notification.open({
      message: content,
      type: 'error',
      variant: 'compact',
      ...config,
    })
  }

  info(content: React.ReactNode, config?: MessageConfig) {
    return notification.open({
      message: content,
      type: 'info',
      variant: 'compact',
      ...config,
    })
  }

  warning(content: React.ReactNode, config?: MessageConfig) {
    return notification.open({
      message: content,
      type: 'warning',
      variant: 'compact',
      ...config,
    })
  }

  loading(content: React.ReactNode, config?: MessageConfig) {
    const loadingIcon = (
      <span className={`${dLoading} ${dLoadingSpinner} ${dLoadingSm}`} />
    )
    return notification.open({
      message: content,
      type: 'info',
      variant: 'compact',
      duration: 0,
      icon: loadingIcon,
      ...config,
    })
  }

  destroy(id?: string) {
    if (id) {
      notification.close(id)
    } else {
      notification.destroy()
    }
  }
}

export const message = new MessageManager()
