import React from 'react'

export interface CarouselItemProps {
  id?: string
  children: React.ReactNode
  className?: string
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ id, children, className = '' }) => {
  return (
    <div id={id} className={`carousel-item ${className}`}>
      {children}
    </div>
  )
}

export interface CarouselProps {
  children: React.ReactNode
  snap?: 'start' | 'center' | 'end'
  vertical?: boolean
  className?: string
}

export const Carousel: React.FC<CarouselProps> & {
  Item: typeof CarouselItem
} = ({ children, snap = 'start', vertical = false, className = '' }) => {
  const snapClass = snap === 'center' ? 'carousel-center' : snap === 'end' ? 'carousel-end' : ''
  const directionClass = vertical ? 'carousel-vertical' : ''

  return (
    <div className={`carousel ${snapClass} ${directionClass} ${className}`.trim()}>
      {children}
    </div>
  )
}

Carousel.Item = CarouselItem
