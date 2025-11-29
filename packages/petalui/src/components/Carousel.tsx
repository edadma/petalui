import React from 'react'

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string
  children: React.ReactNode
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ id, children, className = '', ...rest }) => {
  return (
    <div id={id} className={`carousel-item ${className}`} {...rest}>
      {children}
    </div>
  )
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  snap?: 'start' | 'center' | 'end'
  vertical?: boolean
}

export const Carousel: React.FC<CarouselProps> & {
  Item: typeof CarouselItem
} = ({ children, snap = 'start', vertical = false, className = '', ...rest }) => {
  const snapClass = snap === 'center' ? 'carousel-center' : snap === 'end' ? 'carousel-end' : ''
  const directionClass = vertical ? 'carousel-vertical' : ''

  return (
    <div className={`carousel ${snapClass} ${directionClass} ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
}

Carousel.Item = CarouselItem
