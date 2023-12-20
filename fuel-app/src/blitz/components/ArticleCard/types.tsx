import { IColorsName } from '@/shared-ui/theme/colors.types'
export interface IArticleCardProps extends React.HTMLAttributes<HTMLElement> {
  cards: {
    title: string
    subtitle: string
    href: string
    type: string
  }[]
  title?: string
  subtext?: string
  backgroundColor?: IColorsName
  titleFontColor?: IColorsName
  maxCap?: number
  shouldTruncate?: boolean
  showLessText?: string
  showMoreText?: string
  cardsPerRow?: number
  itemsPerView?: number
  cardsContainerClassName?: string
}
