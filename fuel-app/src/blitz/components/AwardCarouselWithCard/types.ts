export interface IAwardCarousel {
  cards: any
  backgroundColor?: string
  paginationColor?: string
  cardTitleColor?: string
  cardSubTitleColor?: string
  cardLegalTextColor?: string
  cardTitleTagName?: string
  cardSubTitleTagName?: string
  title?: { value: string }
  rootClassName?: string
  titleClassName?: string
  tilesWrapperClassName?: string
}

export interface ICard {
  imageSrc: string
  title: string
  subTitle?: string
  legal?: string
  list?: any
}
