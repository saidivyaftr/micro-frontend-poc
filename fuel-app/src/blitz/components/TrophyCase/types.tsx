export interface ITrophyCase {
  title: string
  titleStyleName?: string
  titleTagName?: string
  cards: ICard[]
  legal?: string
  backgroundColor?: string
  paginationColor?: string
  titleColor?: string
  legalTextColor?: string
  cardTitleColor?: string
  cardBackgroundColor?: string
  cardTitleTagName?: string
  cardTitleClassName?: string
  cardTitleStyleName?: string
  cardTitleFontName?: string
}

export interface ICard {
  imageSrc: string
  title: string
  toolTipText?: string
}
