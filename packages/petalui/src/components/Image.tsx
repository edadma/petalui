import React, { useState, useEffect } from 'react'

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
  src: string
  alt?: string
  fallback?: string
  placeholder?: React.ReactNode
  preview?: boolean
  width?: string | number
  height?: string | number
  className?: string
  onLoad?: () => void
  onError?: () => void
}

export const Image: React.FC<ImageProps> = ({
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
  ...props
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  useEffect(() => {
    setLoading(true)
    setError(false)
    setCurrentSrc(src)
  }, [src])

  const handleLoad = () => {
    setLoading(false)
    setError(false)
    onLoad?.()
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
    if (fallback) {
      setCurrentSrc(fallback)
    }
    onError?.()
  }

  const handleImageClick = () => {
    if (preview && !error && !loading) {
      setShowPreview(true)
    }
  }

  const handleClosePreview = () => {
    setShowPreview(false)
  }

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

  const imageClasses = [
    className,
    preview && !error && !loading ? 'cursor-pointer hover:opacity-80 transition-opacity' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <div className="relative inline-block" style={getStyle()}>
        {loading && placeholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-base-200">
            {placeholder}
          </div>
        )}
        <img
          {...props}
          src={currentSrc}
          alt={alt}
          className={imageClasses}
          style={{ ...getStyle(), display: loading ? 'none' : 'block' }}
          onLoad={handleLoad}
          onError={handleError}
          onClick={handleImageClick}
        />
        {error && !fallback && (
          <div
            className="flex items-center justify-center bg-base-200 text-base-content/50"
            style={getStyle()}
          >
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
        >
          <div className="relative max-w-full max-h-full">
            <button
              className="absolute top-4 right-4 btn btn-circle btn-sm"
              onClick={handleClosePreview}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
            />
          </div>
        </div>
      )}
    </>
  )
}
