import React, { useEffect, useRef, useState } from 'react'
import QRCodeLib from 'qrcode'

export type QRCodeErrorLevel = 'L' | 'M' | 'Q' | 'H'
export type QRCodeType = 'canvas' | 'svg'
export type QRCodeStatus = 'active' | 'loading' | 'expired'

export interface QRCodeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  value: string
  size?: number
  errorLevel?: QRCodeErrorLevel
  icon?: string
  iconSize?: number
  type?: QRCodeType
  color?: string
  bgColor?: string
  bordered?: boolean
  status?: QRCodeStatus
  onRefresh?: () => void
}

export const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 160,
  errorLevel = 'M',
  icon,
  iconSize = 40,
  type = 'canvas',
  color = '#000000',
  bgColor = '#FFFFFF',
  bordered = true,
  status = 'active',
  onRefresh,
  className = '',
  ...rest
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(status === 'loading')

  useEffect(() => {
    setLoading(status === 'loading')
  }, [status])

  useEffect(() => {
    if (status !== 'active' || !value) return

    const generateQRCode = async () => {
      try {
        setLoading(true)

        if (type === 'canvas' && canvasRef.current) {
          await QRCodeLib.toCanvas(canvasRef.current, value, {
            width: size,
            margin: 1,
            color: {
              dark: color,
              light: bgColor,
            },
            errorCorrectionLevel: errorLevel,
          })

          if (icon) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            if (ctx) {
              const img = new Image()
              img.crossOrigin = 'anonymous'
              img.onload = () => {
                const iconX = (size - iconSize) / 2
                const iconY = (size - iconSize) / 2
                ctx.fillStyle = bgColor
                ctx.fillRect(iconX - 4, iconY - 4, iconSize + 8, iconSize + 8)
                ctx.drawImage(img, iconX, iconY, iconSize, iconSize)
              }
              img.src = icon
            }
          }
        }

        setLoading(false)
      } catch (error) {
        console.error('QR Code generation error:', error)
        setLoading(false)
      }
    }

    generateQRCode()
  }, [value, size, errorLevel, icon, iconSize, type, color, bgColor, status])

  // Download functionality can be implemented by consumers
  // by accessing the canvas ref and converting to data URL

  const containerClasses = [
    'inline-flex items-center justify-center',
    bordered && 'border border-base-content/20 p-3',
    'bg-base-100',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (status === 'loading' || loading) {
    return (
      <div className={containerClasses} style={{ width: size + (bordered ? 24 : 0), height: size + (bordered ? 24 : 0) }} data-state="loading" {...rest}>
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="loading loading-spinner loading-lg"></span>
          <span className="text-sm text-base-content/70">Loading...</span>
        </div>
      </div>
    )
  }

  if (status === 'expired') {
    return (
      <div className={containerClasses} style={{ width: size + (bordered ? 24 : 0), height: size + (bordered ? 24 : 0) }} data-state="expired" {...rest}>
        <div className="flex flex-col items-center justify-center gap-2">
          <svg className="w-12 h-12 text-base-content/30" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm text-base-content/70">QR Code Expired</span>
          {onRefresh && (
            <button className="btn btn-sm btn-primary" onClick={onRefresh}>
              Refresh
            </button>
          )}
        </div>
      </div>
    )
  }

  if (type === 'canvas') {
    return (
      <div className="inline-block" data-state="active" {...rest}>
        <div className={containerClasses}>
          <canvas ref={canvasRef} style={{ display: 'block' }} />
        </div>
      </div>
    )
  }

  return (
    <div className="inline-block" data-state="active" {...rest}>
      <div className={containerClasses}>
        <div style={{ width: size, height: size }} className="bg-base-content/5">
          <span className="text-xs text-base-content/50">SVG mode placeholder</span>
        </div>
      </div>
    </div>
  )
}

QRCode.displayName = 'QRCode'

export default QRCode
