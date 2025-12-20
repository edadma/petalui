import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

// DaisyUI classes
const dToast = 'toast'
const dToastTop = 'toast-top'
const dToastBottom = 'toast-bottom'
const dToastStart = 'toast-start'
const dToastEnd = 'toast-end'
const dToastCenter = 'toast-center'
const dAlert = 'alert'
const dAlertSuccess = 'alert-success'
const dAlertError = 'alert-error'
const dAlertInfo = 'alert-info'
const dAlertWarning = 'alert-warning'
const dBtn = 'btn'
const dBtnXs = 'btn-xs'
const dBtnGhost = 'btn-ghost'
const dBtnCircle = 'btn-circle'

export type NotificationType = 'success' | 'info' | 'warning' | 'error'
export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'topCenter' | 'bottomCenter'
export type NotificationVariant = 'default' | 'compact'

export interface NotificationConfig {
  message: React.ReactNode
  description?: React.ReactNode
  type?: NotificationType
  duration?: number // in seconds, 0 = no auto close
  placement?: NotificationPlacement
  variant?: NotificationVariant
  closable?: boolean
  icon?: React.ReactNode
  key?: string
  className?: string
  style?: React.CSSProperties
  'data-testid'?: string
  onClick?: () => void
  onClose?: () => void
}

interface NotificationItem extends NotificationConfig {
  id: string
  createdAt: number
}

type Listener = () => void

class NotificationManager {
  private notifications: NotificationItem[] = []
  private listeners: Listener[] = []
  private container: HTMLDivElement | null = null
  private root: ReactDOM.Root | null = null
  private idCounter = 0

  subscribe(listener: Listener) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  getNotifications() {
    return this.notifications
  }

  private emit() {
    this.listeners.forEach((listener) => listener())
  }

  private ensureContainer() {
    if (!this.container) {
      this.container = document.createElement('div')
      document.body.appendChild(this.container)
      this.root = ReactDOM.createRoot(this.container)
      this.root.render(<NotificationContainer manager={this} />)
    }
  }

  open(config: NotificationConfig) {
    this.ensureContainer()

    const id = config.key ?? `notification-${++this.idCounter}`
    const isCompact = config.variant === 'compact'
    const notificationItem: NotificationItem = {
      ...config,
      id,
      createdAt: Date.now(),
      duration: config.duration ?? (isCompact ? 3 : 4.5),
      placement: config.placement ?? (isCompact ? 'topCenter' : 'topRight'),
      variant: config.variant ?? 'default',
      closable: config.closable ?? !isCompact,
      type: config.type ?? 'info',
    }

    // If key exists, update the existing notification
    const existingIndex = this.notifications.findIndex((n) => n.id === id)
    if (existingIndex !== -1) {
      this.notifications[existingIndex] = notificationItem
    } else {
      this.notifications.push(notificationItem)
    }
    this.emit()

    // Auto-dismiss
    if (notificationItem.duration && notificationItem.duration > 0) {
      setTimeout(() => {
        this.close(id)
      }, notificationItem.duration * 1000)
    }

    return id
  }

  close(id: string) {
    const notification = this.notifications.find((n) => n.id === id)
    this.notifications = this.notifications.filter((n) => n.id !== id)
    this.emit()

    if (notification?.onClose) {
      notification.onClose()
    }
  }

  success(config: Omit<NotificationConfig, 'type'>) {
    return this.open({ ...config, type: 'success' })
  }

  error(config: Omit<NotificationConfig, 'type'>) {
    return this.open({ ...config, type: 'error' })
  }

  info(config: Omit<NotificationConfig, 'type'>) {
    return this.open({ ...config, type: 'info' })
  }

  warning(config: Omit<NotificationConfig, 'type'>) {
    return this.open({ ...config, type: 'warning' })
  }

  destroy() {
    this.notifications = []
    this.emit()
  }
}

interface NotificationContainerProps {
  manager: NotificationManager
}

function NotificationContainer({ manager }: NotificationContainerProps) {
  const [, forceUpdate] = useState({})

  useEffect(() => {
    const unsubscribe = manager.subscribe(() => {
      forceUpdate({})
    })
    return unsubscribe
  }, [manager])

  const notifications = manager.getNotifications()

  // Group by placement
  const grouped: Record<NotificationPlacement, NotificationItem[]> = {
    topLeft: [],
    topRight: [],
    topCenter: [],
    bottomLeft: [],
    bottomRight: [],
    bottomCenter: [],
  }

  notifications.forEach((notification) => {
    grouped[notification.placement!].push(notification)
  })

  const placementClasses: Record<NotificationPlacement, string> = {
    topRight: `${dToast} ${dToastTop} ${dToastEnd} z-[9999]`,
    topLeft: `${dToast} ${dToastTop} ${dToastStart} z-[9999]`,
    topCenter: `${dToast} ${dToastTop} ${dToastCenter} z-[9999]`,
    bottomRight: `${dToast} ${dToastBottom} ${dToastEnd} z-[9999]`,
    bottomLeft: `${dToast} ${dToastBottom} ${dToastStart} z-[9999]`,
    bottomCenter: `${dToast} ${dToastBottom} ${dToastCenter} z-[9999]`,
  }

  return (
    <>
      {Object.entries(grouped).map(([placement, items]) => {
        if (items.length === 0) return null

        return (
          <div key={placement} className={placementClasses[placement as NotificationPlacement]}>
            {items.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClose={() => manager.close(notification.id)}
              />
            ))}
          </div>
        )
      })}
    </>
  )
}

interface NotificationItemProps {
  notification: NotificationItem
  onClose: () => void
}

function NotificationItem({ notification, onClose }: NotificationItemProps) {
  const isCompact = notification.variant === 'compact'

  const alertTypeClasses: Record<NotificationType, string> = {
    success: dAlertSuccess,
    error: dAlertError,
    info: dAlertInfo,
    warning: dAlertWarning,
  }

  const typeIcons: Record<NotificationType, React.ReactNode> = {
    success: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>,
    error: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>,
    info: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>,
    warning: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>,
  }

  const handleClick = () => {
    if (notification.onClick) {
      notification.onClick()
    }
  }

  const icon = notification.icon ?? typeIcons[notification.type!]

  if (isCompact) {
    return (
      <div
        className={`${dAlert} ${alertTypeClasses[notification.type!]} shadow-md py-2 px-4 cursor-pointer${notification.className ? ` ${notification.className}` : ''}`}
        style={notification.style}
        data-testid={notification['data-testid']}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{notification.message}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${dAlert} ${alertTypeClasses[notification.type!]} shadow-lg cursor-pointer min-w-[300px] max-w-[400px] relative${notification.className ? ` ${notification.className}` : ''}`}
      style={notification.style}
      data-testid={notification['data-testid']}
      onClick={handleClick}
    >
      <div className={notification.closable ? 'pr-8' : ''}>
        {notification.message && <div className="font-bold">{notification.message}</div>}
        {notification.description && <div className="text-sm">{notification.description}</div>}
      </div>
      {notification.closable && (
        <button
          className={`${dBtn} ${dBtnXs} ${dBtnGhost} ${dBtnCircle} absolute top-2 right-2`}
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
        >
          ✕
        </button>
      )}
    </div>
  )
}

export const notification = new NotificationManager()
