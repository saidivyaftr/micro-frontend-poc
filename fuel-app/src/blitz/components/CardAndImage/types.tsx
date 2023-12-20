import React from 'react'

export interface ICardAndImageProps extends React.HTMLProps<HTMLButtonElement> {
  heading: string
  copy?: string
  imageMobile?: string
  imageTablet?: string
  altText?: string
  className?: string
  tooltipContent?: string
  legalText?: string
  titleClassName?: string
}
