export interface IAwardCarousel {
  cards: ICard[]
  backgroundColor?: string
  paginationColor?: string
  cardTitleColor?: string
  cardSubTitleColor?: string
  cardLegalTextColor?: string
  cardTitleTagName?: string
  cardTitleStyleName?: string
  cardSubTitleTagName?: string
  cardSubTitleStyleName?: string
  cardContentClassName?: string
  contentStyles: any
}

export interface ICard {
  imageSrc: string
  title: string
  subTitle?: string
  legal?: string
}
