export type IColorName =
  | 'initial'
  | 'primary'
  | 'secondary'
  | 'white'
  | 'black'
  | 'gray'
  | 'none'

export interface IStripes {
  content?: string | JSX.Element
  className?: string
  stripeColor?: IColorName
}
