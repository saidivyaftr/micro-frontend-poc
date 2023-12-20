export type IHoverReveal = {
  titleBackground: string
  title: string
  alignTitle: 'left' | 'center' | 'right'
  color: IColor
  imageSrc: string
  contentTitle: string
  contentIntro: string
  contentDescription: string
  contentTextColor: IColor
}

export type IColor = 'primary' | 'secondary' | 'tertiary' | 'default'
