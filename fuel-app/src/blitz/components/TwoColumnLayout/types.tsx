export interface TwoColumnLayoutProps {
  image: string
  webpImage?: string
  title: string
  content: string | JSX.Element
  reverse?: boolean
  roundedBorders?: boolean
  mobileReverse?: boolean
  className?: string
  gridClassName?: string
  imageWrapperClassName?: string
  innerWrapperClassName?: string
  gridItemClassName?: string
  testId?: string
  mobileImage?: string
  mobileWebpImage?: string
  tabletImage?: string
  tabletWebpImage?: string
  gridItemImageClassName?: string
  imageClassName?: string
}
