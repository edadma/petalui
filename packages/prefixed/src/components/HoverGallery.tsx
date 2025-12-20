import React from 'react'

// DaisyUI classes
const dHoverGallery = 'd-hover-gallery'

export interface HoverGalleryProps {
  /** Image sources (2-10 images) */
  images: string[]
  /** Alt text for images (optional, uses index if not provided) */
  alts?: string[]
  /** Additional CSS classes */
  className?: string
}

export const HoverGallery: React.FC<HoverGalleryProps> = ({
  images,
  alts = [],
  className = '',
}) => {
  // DaisyUI supports up to 10 images
  const limitedImages = images.slice(0, 10)

  return (
    <figure className={`${dHoverGallery} ${className}`.trim()}>
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
