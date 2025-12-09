import React, { useEffect, useMemo, useState } from 'react'

export type WatermarkGap = [number, number]
export type WatermarkOffset = [number, number]

export interface WatermarkFontOptions {
  /** Text color for watermark content */
  color?: string
  /** Font size in pixels */
  fontSize?: number
  /** Font weight for watermark text */
  fontWeight?: number | 'normal' | 'bold' | 'bolder' | 'lighter'
  /** Font style for watermark text */
  fontStyle?: 'normal' | 'italic' | 'oblique'
  /** Font family for watermark text */
  fontFamily?: string
  /** Line height in pixels for multi-line content */
  lineHeight?: number
}

export interface WatermarkProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Text to render inside the watermark; falls back to "asterui" */
  content?: string | string[]
  /** Image source (URL or base64) to render instead of text */
  image?: string
  /** Width of a single watermark tile in pixels */
  width?: number
  /** Height of a single watermark tile in pixels */
  height?: number
  /** Horizontal/vertical gap between watermarks in pixels */
  gap?: WatermarkGap
  /** Offset for the first watermark tile from the top-left corner */
  offset?: WatermarkOffset
  /** Rotation angle in degrees */
  rotate?: number
  /** z-index for the overlay layer */
  zIndex?: number
  /** Font settings for text watermarks */
  font?: WatermarkFontOptions
  /** Content to protect with the watermark */
  children?: React.ReactNode
}

type WatermarkImage = {
  url: string
  width: number
  height: number
}

const DEFAULT_CONTENT = 'asterui'
const DEFAULT_OPACITY = 0.22

const resolveThemeColor = (requested?: string, opacity = DEFAULT_OPACITY) => {
  const fallback = `rgba(0,0,0,${opacity})`

  if (requested && requested.includes('var(--bc')) {
    if (typeof window !== 'undefined') {
      const docBase = getComputedStyle(document.documentElement).getPropertyValue('--bc').trim()
      const bodyBase = getComputedStyle(document.body).getPropertyValue('--bc').trim()
      const base = docBase || bodyBase
      if (base) {
        return requested.replace(/var\(--bc\)/g, base)
      }
    }
    return fallback
  }

  if (requested) return requested

  if (typeof window === 'undefined') return fallback

  const docBase = getComputedStyle(document.documentElement).getPropertyValue('--bc').trim()
  const bodyBase = getComputedStyle(document.body).getPropertyValue('--bc').trim()
  const base = docBase || bodyBase

  return base ? `hsl(${base} / ${opacity})` : fallback
}

const getFontSettings = (font: WatermarkFontOptions | undefined, resolvedColor: string) => {
  const fontSize = font?.fontSize ?? 16

  return {
    color: resolvedColor,
    fontSize,
    fontWeight: font?.fontWeight ?? 600,
    fontStyle: font?.fontStyle ?? 'normal',
    fontFamily: font?.fontFamily ?? 'sans-serif',
    lineHeight: font?.lineHeight ?? fontSize * 1.2,
  }
}

export const Watermark: React.FC<WatermarkProps> = ({
  children,
  className = '',
  style,
  content,
  image,
  width = 120,
  height = 64,
  gap,
  offset,
  rotate = -22,
  zIndex = 1000,
  font,
  ...rest
}) => {
  const [watermark, setWatermark] = useState<WatermarkImage | null>(null)

  const gapX = gap?.[0] ?? 120
  const gapY = gap?.[1] ?? 120
  const offsetX = offset?.[0] ?? gapX / 2
  const offsetY = offset?.[1] ?? gapY / 2
  const textLines = useMemo(
    () =>
      typeof content === 'string'
        ? [content]
        : Array.isArray(content)
          ? content
          : [DEFAULT_CONTENT],
    [content]
  )
  const resolvedColor = resolveThemeColor(font?.color)
  const fontSettings = useMemo(
    () => getFontSettings(font, resolvedColor),
    [font, resolvedColor]
  )
  const rotationInRadians = (Math.PI / 180) * rotate
  const textKey = textLines.join('|')

  useEffect(() => {
    if (typeof window === 'undefined') return

    let cancelled = false
    const ratio = window.devicePixelRatio || 1
    const tileWidth = width + gapX
    const tileHeight = height + gapY
    const canvas = document.createElement('canvas')
    canvas.width = tileWidth * ratio
    canvas.height = tileHeight * ratio
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    const commitWatermark = () => {
      const url = canvas.toDataURL()
      if (!cancelled) {
        setWatermark({ url, width: tileWidth, height: tileHeight })
      }
    }

    const drawText = () => {
      ctx.save()
      ctx.translate((gapX / 2 + width / 2) * ratio, (gapY / 2 + height / 2) * ratio)
      ctx.rotate(rotationInRadians)
      ctx.fillStyle = fontSettings.color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `${fontSettings.fontStyle} normal ${fontSettings.fontWeight} ${fontSettings.fontSize * ratio}px ${fontSettings.fontFamily}`

      const lineHeight = fontSettings.lineHeight * ratio
      const startY = -((textLines.length - 1) * lineHeight) / 2

      textLines.forEach((line, index) => {
        ctx.fillText(line, 0, startY + index * lineHeight)
      })

      ctx.restore()
    }

    if (image) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.referrerPolicy = 'no-referrer'

      const handleLoad = () => {
        ctx.save()
        ctx.translate((gapX / 2 + width / 2) * ratio, (gapY / 2 + height / 2) * ratio)
        ctx.rotate(rotationInRadians)
        ctx.drawImage(
          img,
          (-width / 2) * ratio,
          (-height / 2) * ratio,
          width * ratio,
          height * ratio
        )
        ctx.restore()
        commitWatermark()
      }

      const handleError = () => {
        if (!cancelled) setWatermark(null)
      }

      img.addEventListener('load', handleLoad)
      img.addEventListener('error', handleError)
      img.src = image

      return () => {
        cancelled = true
        img.removeEventListener('load', handleLoad)
        img.removeEventListener('error', handleError)
      }
    } else {
      drawText()
      commitWatermark()
    }

    return () => {
      cancelled = true
    }
  }, [
    fontSettings,
    gapX,
    gapY,
    height,
    image,
    rotationInRadians,
    textKey,
    width,
  ])

  const classes = ['relative', className].filter(Boolean).join(' ')

  return (
    <div
      className={classes}
      style={{ position: style?.position ?? 'relative', ...style }}
      {...rest}
    >
      {children}
      {watermark && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex,
            backgroundImage: `url(${watermark.url})`,
            backgroundRepeat: 'repeat',
            backgroundSize: `${watermark.width}px ${watermark.height}px`,
            backgroundPosition: `${offsetX}px ${offsetY}px`,
          }}
        />
      )}
    </div>
  )
}

Watermark.displayName = 'Watermark'
