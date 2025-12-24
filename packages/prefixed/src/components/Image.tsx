import React, { useState, useEffect, forwardRef, useCallback } from 'react'

// DaisyUI classes
const dBtn = 'd-btn'
const dBtnCircle = 'd-btn-circle'
const dBtnSm = 'd-btn-sm'

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
  /** Image source URL */
  src: string
  /** Alternative text for the image */
  alt?: string
  /** Fallback image URL when source fails to load */
  fallback?: string
  /** Placeholder content shown while loading */
  placeholder?: React.ReactNode
  /** Enable click to preview image in lightbox */
  preview?: boolean
  /** Image width */
  width?: string | number
  /** Image height */
  height?: string | number
  /** Additional CSS classes */
  className?: string
  /** Callback when image loads successfully */
  onLoad?: () => void
  /** Callback when image fails to load */
  onError?: () => void
  /** Test ID for the component */
  'data-testid'?: string
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt = '',
      fallback,
      placeholder,
      preview = true,
      width,
      height,
      className = '',
      onLoad,
      onError,
      'data-testid': testId = 'image',
      ...props
    },
    ref
  ) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [showPreview, setShowPreview] = useState(false)
    const [currentSrc, setCurrentSrc] = useState(src)
    const [hasTriedFallback, setHasTriedFallback] = useState(false)

    useEffect(() => {
      setLoading(true)
      setError(false)
      setHasTriedFallback(false)
      setCurrentSrc(src)
    }, [src])

    const handleLoad = useCallback(() => {
      setLoading(false)
      setError(false)
      onLoad?.()
    }, [onLoad])

    const handleError = useCallback(() => {
      onError?.()
      if (fallback && !hasTriedFallback) {
        setHasTriedFallback(true)
        setCurrentSrc(fallback)
        setLoading(true)
        setError(false)
        return
      }
      setLoading(false)
      setError(true)
    }, [fallback, hasTriedFallback, onError])

    const handleImageClick = useCallback(() => {
      if (preview && !error && !loading) {
        setShowPreview(true)
      }
    }, [preview, error, loading])

    const handleClosePreview = useCallback(() => {
      setShowPreview(false)
    }, [])

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (preview && !error && !loading && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          setShowPreview(true)
        }
      },
      [preview, error, loading]
    )

    const handlePreviewKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowPreview(false)
      }
    }, [])

    const getStyle = (): React.CSSProperties => {
      const style: React.CSSProperties = {}
      if (width) {
        style.width = typeof width === 'number' ? `${width}px` : width
      }
      if (height) {
        style.height = typeof height === 'number' ? `${height}px` : height
      }
      return style
    }

    const isPreviewable = preview && !error && !loading
    const imageClasses = [
      className,
      isPreviewable ? 'cursor-pointer hover:opacity-80 transition-opacity' : '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <>
        <div
          className="relative inline-block"
          style={getStyle()}
          data-testid={testId}
          data-state={loading ? 'loading' : error ? 'error' : 'loaded'}
        >
          {loading && placeholder && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-base-200"
              data-testid={`${testId}-placeholder`}
            >
              {placeholder}
            </div>
          )}
          <img
            ref={ref}
            {...props}
            src={currentSrc}
            alt={alt}
            className={imageClasses}
            style={{
              ...getStyle(),
              opacity: loading ? 0 : 1,
              transition: 'opacity 150ms ease',
            }}
            onLoad={handleLoad}
            onError={handleError}
            onClick={handleImageClick}
            onKeyDown={handleKeyDown}
            tabIndex={isPreviewable ? 0 : undefined}
            role={isPreviewable ? 'button' : undefined}
            aria-label={isPreviewable ? `${alt || 'Image'} (click to preview)` : undefined}
            data-testid={`${testId}-img`}
          />
          {error && (
            <div
              className="flex items-center justify-center bg-base-200 text-base-content/50"
              style={getStyle()}
              data-testid={`${testId}-error`}
              role="img"
              aria-label={`Failed to load: ${alt || 'image'}`}
            >
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {showPreview && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
            onClick={handleClosePreview}
            onKeyDown={handlePreviewKeyDown}
            role="dialog"
            aria-modal="true"
            aria-label={`Preview: ${alt || 'Image'}`}
            data-testid={`${testId}-preview`}
          >
            <div className="relative max-w-full max-h-full">
              <button
                className={`absolute top-4 right-4 ${dBtn} ${dBtnCircle} ${dBtnSm}`}
                onClick={handleClosePreview}
                aria-label="Close preview"
                autoFocus
                data-testid={`${testId}-preview-close`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img
                src={src}
                alt={alt}
                className="max-w-full max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
                data-testid={`${testId}-preview-img`}
              />
            </div>
          </div>
        )}
      </>
    )
  }
)

Image.displayName = 'Image'
