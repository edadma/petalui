import React from 'react'

// DaisyUI classes
const dHoverGallery = 'hover-gallery'

export interface HoverGalleryProps extends React.HTMLAttributes<HTMLElement> {
  /** Image sources (2-10 images) */
  images: string[]
  /** Alt text for images (optional, uses index if not provided) */
  alts?: string[]
  /** Test ID for testing */
  'data-testid'?: string
}

export const HoverGallery: React.FC<HoverGalleryProps> = ({
  images,
  alts = [],
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  // DaisyUI supports up to 10 images
  const limitedImages = images.slice(0, 10)

  return (
    <figure className={`${dHoverGallery} ${className}`.trim()} data-testid={testId} {...rest}>
      {limitedImages.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={alts[index] || `Image ${index + 1}`}
        />
      ))}
    </figure>
  )
}
